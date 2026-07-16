<?php
// Bu dosyayı sunucuda /home/KULLANICI/datahouse-config/contact.php olarak kopyalayın.
// public_html dışında tutulmalı ve web kullanıcısı dışında okunamamalıdır (chmod 600).
return [
    'allowed_origin' => 'https://datahouse.com.tr',
    'turnstile_secret' => 'TURNSTILE_SECRET_KEY',
    'rate_limit_salt' => 'UZUN_RASTGELE_BIR_DEGER',
    'rate_limit_dir' => '/home/KULLANICI/datahouse-contact-rate',
    'smtp_host' => 'smtp.example.com',
    'smtp_port' => 587,
    'smtp_secure' => 'tls', // tls veya ssl
    'smtp_username' => 'info@datahouse.com.tr',
    'smtp_password' => 'SMTP_PAROLASI',
    'from_email' => 'info@datahouse.com.tr',
    'to_email' => 'info@datahouse.com.tr',
];
