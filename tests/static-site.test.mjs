import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("static export contains every public route", () => {
  const routes = [
    "out/index.html",
    "out/hizmetler/ag-cozumleri/index.html",
    "out/hizmetler/fortigate-firewall-cozumleri/index.html",
    "out/hizmetler/sunucu-cozumleri/index.html",
    "out/hizmetler/kurumsal-yapay-zeka-cozumleri/index.html",
    "out/hizmetler/sunucu-bakim/index.html",
    "out/hizmetler/yedekleme/index.html",
    "out/kvkk/index.html",
    "out/sitemap.xml",
    "out/robots.txt",
    "out/api/contact.php",
    "out/.htaccess",
  ];
  for (const route of routes) assert.ok(existsSync(new URL(`../${route}`, import.meta.url)), `${route} missing`);
});

test("homepage keeps the seven cinematic chapters and contact fields", () => {
  const html = read("out/index.html");
  for (const text of ["Bilgi,", "Ağ Çözümleri", "Firewall Çözümleri", "Sunucu Çözümleri", "Kurumsal Yapay Zekâ", "Sunucu Bakım Hizmetleri", "Yedekleme Çözümleri", "ISO 27001", "info@datahouse.com.tr"]) {
    assert.match(html, new RegExp(text));
  }
  for (const field of ["name=\"name\"", "name=\"company\"", "name=\"email\"", "name=\"phone\"", "name=\"message\"", "name=\"kvkk\""]) {
    assert.match(html, new RegExp(field));
  }
  assert.match(html, /Talebiniz doğrudan teknik ekibimize iletilir/);
  assert.match(html, /solution-index/);
  const solutionIndex = html.match(/<div class="solution-index">([\s\S]*?)<\/div><\/section>/)?.[1] ?? "";
  const expectedSolutions = [
    ["01", "Sunucu Çözümleri", "sunucu-cozumleri"],
    ["02", "Firewall Çözümleri", "fortigate-firewall-cozumleri"],
    ["03", "Ağ Çözümleri", "ag-cozumleri"],
    ["04", "Kurumsal Yapay Zekâ Çözümleri", "kurumsal-yapay-zeka-cozumleri"],
    ["05", "Sunucu Bakım Hizmetleri", "sunucu-bakim"],
    ["06", "Yedekleme Çözümleri", "yedekleme"],
  ];
  let previousSolutionPosition = -1;
  for (const [number, title, slug] of expectedSolutions) {
    const position = solutionIndex.indexOf(`>${title}<`);
    assert.ok(position > previousSolutionPosition, `${title} is out of order`);
    assert.match(solutionIndex, new RegExp(`href="/hizmetler/${slug}/"[^>]*>[\\s\\S]*?solution-card-number">${number}<`));
    previousSolutionPosition = position;
  }
  assert.equal((solutionIndex.match(/class="solution-card"/g) ?? []).length, 6);
  assert.equal((html.match(/class="partner-card"/g) ?? []).length, 16);
  assert.equal((html.match(/class="partner-logo-frame"/g) ?? []).length, 16);
  for (const text of ["Bilginin güvenliği,", "sistemin temelidir.", "RİSK YÖNETİMİ", "ERİŞİM KONTROLÜ", "SÜREKLİ İYİLEŞTİRME", "GİZLİLİK / BÜTÜNLÜK / ERİŞİLEBİLİRLİK", "bilgi varlıklarının gizlilik, bütünlük ve erişilebilirlik ilkeleriyle yönetilmesi"]) {
    assert.match(html, new RegExp(text));
  }
  for (const text of ["Güvenli ve ölçeklenebilir bağlantı", "Kurum içinde çalışan bilgi katmanı", "Doğrulanabilir koruma ve geri dönüş"]) {
    assert.match(html, new RegExp(text));
  }
  for (const text of ["Teknolojiyi değil,", "işleyen sistemi", "kurarız.", "MÜHENDİSLİK", "DANIŞMANLIK", "EĞİTİM", "OPERASYON"]) {
    assert.match(html, new RegExp(text));
  }
  assert.equal((html.match(/id="hakkimizda"/g) ?? []).length, 1);
  assert.equal((html.match(/id="hizmetler"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /about-section/);
  for (const text of ["NVMe STORAGE", "SCALABLE ARCHITECTURE", "INTELLIGENT DATA LAYER", "DATA EFFICIENCY", "RESILIENCY LAYER"]) {
    assert.match(html, new RegExp(text));
  }
  assert.doesNotMatch(html, /hero-data-wave/);
});

test("homepage includes the session-scoped Data Pulse preloader", () => {
  const home = read("out/index.html");
  const service = read("out/hizmetler/ag-cozumleri/index.html");
  const preloader = read("components/site-preloader.tsx");
  const cinematic = read("components/cinematic-experience.tsx");

  for (const text of ["site-preloader", "DATA PULSE", "SYSTEM INITIALIZING", "INFRASTRUCTURE / READY SEQUENCE"]) {
    assert.match(home, new RegExp(text));
  }
  assert.doesNotMatch(service, /class="site-preloader/);
  assert.match(home, /datahouse_preloader_seen/);
  assert.match(preloader, /4000 - exitDuration/);
  assert.match(preloader, /minimumDuration = reducedMotion \? 300 : 900/);
  assert.match(preloader, /datahouse:preloader-complete/);
  assert.match(cinematic, /datahouse:preloader-complete/);
});

test("AI service includes the local RAG scene and transparent product asset", () => {
  const home = read("out/index.html");
  const service = read("out/hizmetler/kurumsal-yapay-zeka-cozumleri/index.html");
  for (const text of ["LOCAL MODEL / ACTIVE", "KNOWLEDGE INDEX / READY", "DATA BOUNDARY / ON-PREMISE", "RAG PIPELINE / SECURED"]) assert.match(home, new RegExp(text));
  for (const text of ["Kurumsal Yapay Zekâ Çözümleri", "Kurumsal bilgi katmanı", "harici model servislerine gönderilmeden işlenir"]) assert.match(service, new RegExp(text));
  const asset = "out/images/ai/rtx-spark-device.webp";
  assert.ok(existsSync(new URL(`../${asset}`, import.meta.url)), `${asset} missing`);
  assert.doesNotMatch(home, /rtx-spark-onprem-(desktop|mobile)\.webp/);
  assert.match(home, /ai-data-stage-cinematic/);
  assert.match(service, /ai-data-stage-service/);
});

test("firewall pages use the code-based security gateway", () => {
  const home = read("out/index.html");
  const service = read("out/hizmetler/fortigate-firewall-cozumleri/index.html");
  for (const text of ["Trafik aksın.", "Tehditler geçemesin.", "TRAFFIC INSPECTION / ACTIVE", "POLICY MATCH / ENFORCED", "SECURITY GATEWAY / READY", "WAN / SFP", "SECURE LAN"]) {
    assert.match(home, new RegExp(text));
  }
  assert.match(home, /firewall-gateway-cinematic/);
  assert.match(service, /firewall-gateway-service/);
  assert.match(service, /FortiGate esintili güvenlik ağ geçidi ve aktif ağ trafiği görselleştirmesi/);
  assert.doesNotMatch(home, /fortigate-firewall\.webp|FG-2600F/);
  assert.doesNotMatch(service, /fortigate-firewall\.webp|FG-2600F/);
});

test("backup chapter and service hero include the scroll-controlled Veeam recovery workflow", () => {
  const html = read("out/index.html");
  const serviceHtml = read("out/hizmetler/yedekleme/index.html");
  for (const text of ["VEEAM TABANLI YEDEKLEME", "SOURCE DISCOVERY", "BACKUP JOB", "RECOVERY POINTS / STORED", "TEST RESTORE / READY", "KAYNAKLARI KEŞFET", "GERİ DÖNÜŞ NOKTASINI DOĞRULA"]) {
    assert.match(html, new RegExp(text));
  }
  for (const asset of ["out/images/backup/backup-source-systems.webp", "out/images/backup/backup-repository.webp", "out/images/partners/veeam.png"]) {
    assert.ok(existsSync(new URL(`../${asset}`, import.meta.url)), `${asset} missing`);
  }
  assert.match(html, /backup-recovery-cinematic/);
  assert.match(serviceHtml, /backup-recovery-service/);
  assert.match(serviceHtml, /images\/partners\/veeam\.png/);
  assert.doesNotMatch(html, /98%|VM_CLUSTER_01/);
});

test("about editorial expertise and maintenance chapters use dedicated code-based stages", () => {
  const html = read("out/index.html");
  for (const text of ["KNOWLEDGE SYSTEMS", "Datahouse, kurumsal teknoloji altyapılarını uçtan uca tasarlar", "İhtiyacı doğru okur; mühendislik, danışmanlık, eğitim ve operasyonu tek bir sistem yaklaşımında buluşturur.", "Altyapı tasarımı ve uygulama", "İhtiyaç ve karar mimarisi", "Bilgi ve yetkinlik aktarımı", "İzleme ve süreklilik", "Kesintiyi beklemeyiz.", "Riski önceden görürüz.", "ALTYAPI KONTROLÜ", "SAĞLIK TARAMASI", "RİSKİ ÖNCELİKLENDİR", "MÜDAHALE PLANI", "BAKIM PLANI / HAZIR"]) {
    assert.match(html, new RegExp(text));
  }
  assert.match(html, /about-editorial-stage/);
  assert.match(html, /about-expertise-rail/);
  assert.match(html, /aria-label="Datahouse uzmanlık alanları"/);
  assert.match(html, /maintenance-stage/);
  assert.doesNotMatch(html, /99\.8|HEALTH TELEMETRY/);
  assert.doesNotMatch(html, /expertise-stage|expertise-node|network-stage|SWITCH FABRIC|VLAN SEGMENTATION/);
  assert.doesNotMatch(html, /diagnostic-overlay/);
});

test("Apache redirects preserve the four legacy service URLs", () => {
  const htaccess = read("out/.htaccess");
  for (const target of ["ag-cozumleri", "sunucu-cozumleri", "sunucu-bakim", "yedekleme"]) assert.match(htaccess, new RegExp(`/hizmetler/${target}/`));
});

test("contact endpoint includes abuse controls and SMTP delivery", () => {
  const endpoint = read("public/api/contact.php");
  for (const control of ["verify_turnstile", "enforce_rate_limit", "startedAt", "kvkkAccepted", "AUTH LOGIN", "STARTTLS"]) assert.match(endpoint, new RegExp(control));
});
