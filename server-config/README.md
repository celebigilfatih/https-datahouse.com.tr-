# İletişim formu sunucu yapılandırması

1. `contact.example.php` dosyasını hosting hesabında web kökünün dışındaki `datahouse-config/contact.php` konumuna kopyalayın.
2. Turnstile secret ve SMTP bilgilerini doldurun; dosya iznini `600` yapın.
3. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` değeriyle siteyi yeniden build edin.
4. `out/` içeriğini `public_html/` dizinine yükleyin. `api/contact.php` ve `.htaccess` dosyalarının aktarıldığını doğrulayın.

PHP 7.4+, OpenSSL ve dış SMTP bağlantısı gerekir.
