<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $ok, string $message): void
{
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function value(array $payload, string $key): string
{
    $candidate = $payload[$key] ?? '';
    return is_string($candidate) ? trim($candidate) : '';
}

function environment_value(string $key, string $default = ''): string
{
    $value = getenv($key);
    return is_string($value) && $value !== '' ? $value : $default;
}

function environment_config(): array
{
    return [
        'allowed_origin' => environment_value('CONTACT_ALLOWED_ORIGIN', 'https://datahouse.com.tr'),
        'turnstile_secret' => environment_value('CONTACT_TURNSTILE_SECRET'),
        'rate_limit_salt' => environment_value('CONTACT_RATE_LIMIT_SALT'),
        'rate_limit_dir' => environment_value('CONTACT_RATE_LIMIT_DIR', '/var/www/datahouse-contact-rate'),
        'smtp_host' => environment_value('CONTACT_SMTP_HOST'),
        'smtp_port' => (int)environment_value('CONTACT_SMTP_PORT', '587'),
        'smtp_secure' => environment_value('CONTACT_SMTP_SECURE', 'tls'),
        'smtp_username' => environment_value('CONTACT_SMTP_USERNAME'),
        'smtp_password' => environment_value('CONTACT_SMTP_PASSWORD'),
        'from_email' => environment_value('CONTACT_FROM_EMAIL', 'info@datahouse.com.tr'),
        'to_email' => environment_value('CONTACT_TO_EMAIL', 'info@datahouse.com.tr'),
    ];
}

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function verify_turnstile(string $secret, string $token, string $ip): bool
{
    if ($secret === '' || $token === '') {
        return false;
    }
    $post = http_build_query(['secret' => $secret, 'response' => $token, 'remoteip' => $ip]);
    $response = false;
    if (function_exists('curl_init')) {
        $curl = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
        curl_setopt_array($curl, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $post,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 8,
            CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
        ]);
        $response = curl_exec($curl);
        curl_close($curl);
    } else {
        $context = stream_context_create(['http' => [
            'method' => 'POST', 'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $post, 'timeout' => 8, 'ignore_errors' => true,
        ]]);
        $response = @file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $context);
    }
    if (!is_string($response)) return false;
    $result = json_decode($response, true);
    return is_array($result) && ($result['success'] ?? false) === true;
}

function enforce_rate_limit(string $directory, string $identity, int $limit = 3, int $window = 600): bool
{
    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) return false;
    $path = $directory . DIRECTORY_SEPARATOR . hash('sha256', $identity) . '.json';
    $handle = @fopen($path, 'c+');
    if (!$handle || !flock($handle, LOCK_EX)) return false;
    $raw = stream_get_contents($handle);
    $timestamps = $raw ? json_decode($raw, true) : [];
    if (!is_array($timestamps)) $timestamps = [];
    $cutoff = time() - $window;
    $timestamps = array_values(array_filter($timestamps, static fn($time) => is_int($time) && $time >= $cutoff));
    $allowed = count($timestamps) < $limit;
    if ($allowed) $timestamps[] = time();
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($timestamps));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    return $allowed;
}

function smtp_read($socket): array
{
    $message = '';
    $code = 0;
    while (($line = fgets($socket, 515)) !== false) {
        $message .= $line;
        $code = (int)substr($line, 0, 3);
        if (strlen($line) < 4 || $line[3] === ' ') break;
    }
    return [$code, trim($message)];
}

function smtp_expect($socket, array $expected): void
{
    [$code, $message] = smtp_read($socket);
    if (!in_array($code, $expected, true)) throw new RuntimeException('SMTP response: ' . $message);
}

function smtp_command($socket, string $command, array $expected): void
{
    if (fwrite($socket, $command . "\r\n") === false) throw new RuntimeException('SMTP write failed');
    smtp_expect($socket, $expected);
}

function send_smtp(array $config, string $subject, string $body, string $replyTo): void
{
    $host = (string)$config['smtp_host'];
    $port = (int)($config['smtp_port'] ?? 587);
    $secure = (string)($config['smtp_secure'] ?? 'tls');
    $transport = $secure === 'ssl' ? 'ssl://' : 'tcp://';
    $socket = @stream_socket_client($transport . $host . ':' . $port, $errorNumber, $errorMessage, 12, STREAM_CLIENT_CONNECT);
    if (!$socket) throw new RuntimeException('SMTP connection failed: ' . $errorNumber . ' ' . $errorMessage);
    stream_set_timeout($socket, 12);
    smtp_expect($socket, [220]);
    smtp_command($socket, 'EHLO datahouse.com.tr', [250]);
    if ($secure === 'tls') {
        smtp_command($socket, 'STARTTLS', [220]);
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) throw new RuntimeException('SMTP TLS failed');
        smtp_command($socket, 'EHLO datahouse.com.tr', [250]);
    }
    smtp_command($socket, 'AUTH LOGIN', [334]);
    smtp_command($socket, base64_encode((string)$config['smtp_username']), [334]);
    smtp_command($socket, base64_encode((string)$config['smtp_password']), [235]);

    $from = str_replace(["\r", "\n"], '', (string)$config['from_email']);
    $to = str_replace(["\r", "\n"], '', (string)$config['to_email']);
    $replyTo = str_replace(["\r", "\n"], '', $replyTo);
    smtp_command($socket, 'MAIL FROM:<' . $from . '>', [250]);
    smtp_command($socket, 'RCPT TO:<' . $to . '>', [250, 251]);
    smtp_command($socket, 'DATA', [354]);

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'From: Datahouse Website <' . $from . '>',
        'To: <' . $to . '>',
        'Reply-To: <' . $replyTo . '>',
        'Subject: ' . $encodedSubject,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: Datahouse Contact Endpoint',
    ];
    $safeBody = preg_replace('/^\./m', '..', str_replace(["\r\n", "\r"], "\n", $body));
    fwrite($socket, implode("\r\n", $headers) . "\r\n\r\n" . str_replace("\n", "\r\n", $safeBody) . "\r\n.\r\n");
    smtp_expect($socket, [250]);
    smtp_command($socket, 'QUIT', [221]);
    fclose($socket);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Yalnızca POST istekleri kabul edilir.');
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (strpos($contentType, 'application/json') !== 0) respond(415, false, 'Geçersiz içerik türü.');
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 24000) respond(413, false, 'İstek çok büyük.');

$configPath = dirname(__DIR__, 2) . '/datahouse-config/contact.php';
$config = is_file($configPath) ? require $configPath : environment_config();
if (!is_array($config)) respond(503, false, 'İletişim servisi yapılandırılamadı.');

if ((string)($config['turnstile_secret'] ?? '') === '' || (string)($config['rate_limit_salt'] ?? '') === '' || (string)($config['smtp_host'] ?? '') === '' || (string)($config['smtp_username'] ?? '') === '' || (string)($config['smtp_password'] ?? '') === '') {
    error_log('Datahouse contact configuration is incomplete.');
    respond(503, false, 'İletişim servisi şu anda kullanılamıyor. Lütfen info@datahouse.com.tr adresine yazın.');
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigin = rtrim((string)($config['allowed_origin'] ?? 'https://datahouse.com.tr'), '/');
if ($origin !== '' && rtrim($origin, '/') !== $allowedOrigin) respond(403, false, 'İstek kaynağı doğrulanamadı.');

$payload = json_decode((string)file_get_contents('php://input'), true);
if (!is_array($payload)) respond(400, false, 'Form verisi okunamadı.');

if (value($payload, 'website') !== '') respond(200, true, 'Talebiniz alındı.');
$startedAt = $payload['startedAt'] ?? 0;
$elapsed = is_numeric($startedAt) ? (int)round(microtime(true) * 1000) - (int)$startedAt : 0;
if ($elapsed < 3000 || $elapsed > 7200000) respond(400, false, 'Form süresi doğrulanamadı. Lütfen sayfayı yenileyin.');

$name = value($payload, 'name');
$company = value($payload, 'company');
$email = value($payload, 'email');
$phone = value($payload, 'phone');
$message = value($payload, 'message');
$kvkkAccepted = ($payload['kvkkAccepted'] ?? false) === true;

if (text_length($name) < 2 || text_length($name) > 100) respond(422, false, 'Lütfen adınızı ve soyadınızı kontrol edin.');
if (text_length($company) < 2 || text_length($company) > 120) respond(422, false, 'Lütfen firma adını kontrol edin.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || text_length($email) > 160) respond(422, false, 'Lütfen geçerli bir e-posta adresi girin.');
if (!preg_match('/^\+?[0-9\s()\-]{10,24}$/', $phone)) respond(422, false, 'Lütfen telefon numarasını kontrol edin.');
if (text_length($message) < 10 || text_length($message) > 2000) respond(422, false, 'Mesajınız 10–2000 karakter arasında olmalıdır.');
if (!$kvkkAccepted) respond(422, false, 'KVKK aydınlatma metnini kabul etmeniz gerekiyor.');

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$salt = (string)$config['rate_limit_salt'];
$identity = hash_hmac('sha256', $ip . '|' . strtolower($email), $salt);
$rateDirectory = (string)($config['rate_limit_dir'] ?? (sys_get_temp_dir() . '/datahouse-contact-rate'));
if (!enforce_rate_limit($rateDirectory, $identity)) respond(429, false, 'Çok sayıda talep gönderildi. Lütfen birkaç dakika sonra tekrar deneyin.');

$turnstileToken = value($payload, 'turnstileToken');
if (!verify_turnstile((string)($config['turnstile_secret'] ?? ''), $turnstileToken, $ip)) {
    respond(422, false, 'Güvenlik doğrulaması tamamlanamadı. Lütfen tekrar deneyin.');
}

$mailBody = "Yeni web sitesi talebi\n\n"
    . "Ad Soyad: {$name}\n"
    . "Firma: {$company}\n"
    . "E-posta: {$email}\n"
    . "Telefon: {$phone}\n"
    . "IP: {$ip}\n\n"
    . "Mesaj:\n{$message}\n";

try {
    send_smtp($config, 'Datahouse web sitesi talebi — ' . $company, $mailBody, $email);
    respond(200, true, 'Talebiniz bize ulaştı. En kısa sürede sizinle iletişime geçeceğiz.');
} catch (Throwable $error) {
    error_log('Datahouse contact SMTP failure: ' . $error->getMessage());
    respond(502, false, 'Mesajınız gönderilemedi. Lütfen info@datahouse.com.tr adresine yazın.');
}
