# İletişim formu sunucu yapılandırması

1. `contact.example.php` dosyasını hosting hesabında web kökünün dışındaki `datahouse-config/contact.php` konumuna kopyalayın.
2. Turnstile secret ve SMTP bilgilerini doldurun; dosya iznini `600` yapın.
3. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` değeriyle siteyi yeniden build edin.
4. `out/` içeriğini `public_html/` dizinine yükleyin. `api/contact.php` ve `.htaccess` dosyalarının aktarıldığını doğrulayın.

PHP 7.4+, OpenSSL ve dış SMTP bağlantısı gerekir.

## Coolify / Docker dağıtımı

Docker container içinde yapılandırma dosyası yerine aşağıdaki runtime environment değişkenleri kullanılabilir:

`CONTACT_ALLOWED_ORIGIN`, `CONTACT_TURNSTILE_SECRET`, `CONTACT_RATE_LIMIT_SALT`, `CONTACT_RATE_LIMIT_DIR`, `CONTACT_SMTP_HOST`, `CONTACT_SMTP_PORT`, `CONTACT_SMTP_SECURE`, `CONTACT_SMTP_USERNAME`, `CONTACT_SMTP_PASSWORD`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`.

`NEXT_PUBLIC_TURNSTILE_SITE_KEY` yalnızca build-time değişkenidir. Coolify'da rate-limit dizinini `/var/www/datahouse-contact-rate` hedefine kalıcı storage olarak bağlayın.
