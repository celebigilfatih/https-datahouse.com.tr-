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
  for (const text of ["Bilgi,", "Ağ Çözümleri", "FortiGate Firewall", "Sunucu Çözümleri", "Kurumsal Yapay Zekâ", "Sunucu Bakım Hizmetleri", "Yedekleme Çözümleri", "ISO 27001", "info@datahouse.com.tr"]) {
    assert.match(html, new RegExp(text));
  }
  for (const field of ["name=\"name\"", "name=\"company\"", "name=\"email\"", "name=\"phone\"", "name=\"message\"", "name=\"kvkk\""]) {
    assert.match(html, new RegExp(field));
  }
  assert.match(html, /Talebiniz doğrudan teknik ekibimize iletilir/);
  assert.match(html, /solution-index/);
  assert.equal((html.match(/class="partner-card"/g) ?? []).length, 16);
  assert.equal((html.match(/class="partner-logo-frame"/g) ?? []).length, 16);
  for (const text of ["Bilginin güvenliği,", "sistemin temelidir.", "RİSK YÖNETİMİ", "ERİŞİM KONTROLÜ", "SÜREKLİ İYİLEŞTİRME", "GİZLİLİK / BÜTÜNLÜK / ERİŞİLEBİLİRLİK", "bilgi varlıklarının gizlilik, bütünlük ve erişilebilirlik ilkeleriyle yönetilmesi"]) {
    assert.match(html, new RegExp(text));
  }
  for (const text of ["Güvenli ve ölçeklenebilir bağlantı", "Kurum içinde çalışan bilgi katmanı", "Doğrulanabilir koruma ve geri dönüş"]) {
    assert.match(html, new RegExp(text));
  }
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

test("backup chapter includes the lazy cinematic job workflow", () => {
  const html = read("out/index.html");
  for (const text of ["BACKUP JOB / ACTIVE", "SOURCE SYSTEMS", "RESTORE POINT / READY", "VM_CLUSTER_01", "VERIFY", "SUCCESS"]) {
    assert.match(html, new RegExp(text));
  }
  for (const asset of ["out/images/backup/backup-source-systems.png", "out/images/backup/backup-repository.png"]) {
    assert.ok(existsSync(new URL(`../${asset}`, import.meta.url)), `${asset} missing`);
  }
  assert.match(html, /backup-source-systems\.png[^>]+loading="lazy"/);
  assert.match(html, /backup-repository\.png[^>]+loading="lazy"/);
});

test("network and maintenance chapters use dedicated code-based stages", () => {
  const html = read("out/index.html");
  for (const text of ["SWITCH FABRIC / ACTIVE", "VLAN SEGMENTATION / READY", "RACK HEALTH / LIVE", "HEALTH TELEMETRY", "THERMAL", "MONITORED"]) {
    assert.match(html, new RegExp(text));
  }
  assert.match(html, /network-stage/);
  assert.match(html, /maintenance-stage/);
  assert.doesNotMatch(html, /network-map/);
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
