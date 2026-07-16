import { ArrowDown, ArrowRight, ArrowUpRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import CinematicExperience from "@/components/cinematic-experience";
import ContactForm from "@/components/contact-form";
import SiteHeader from "@/components/site-header";
import SitePreloader from "@/components/site-preloader";
import { services } from "@/data/services";

const partners = [
  { name: "Dell Technologies", src: "/images/partners/dell.png", width: 1650, height: 500, opticalScale: 1 },
  { name: "ESET", src: "/images/partners/eset.png", width: 512, height: 203, opticalScale: .94 },
  { name: "Microsoft", src: "/images/partners/microsoft.png", width: 2560, height: 545, opticalScale: 1.04 },
  { name: "Sophos", src: "/images/partners/sophos.png", width: 1200, height: 212, opticalScale: 1 },
  { name: "VMware", src: "/images/partners/vmware.png", width: 1920, height: 485, opticalScale: 1 },
  { name: "Huawei", src: "/images/partners/huawei.webp", width: 266, height: 60, opticalScale: 1 },
  { name: "Hewlett Packard Enterprise", src: "/images/partners/hpe.png", width: 1200, height: 503, opticalScale: .86 },
  { name: "Veeam", src: "/images/partners/veeam.png", width: 500, height: 148, opticalScale: 1.04 },
  { name: "Cisco", src: "/images/partners/cisco.png", width: 1280, height: 676, opticalScale: .8 },
  { name: "IBM", src: "/images/partners/ibm.png", width: 4096, height: 1648, opticalScale: .88 },
  { name: "CA Technologies", src: "/images/partners/ca.png", width: 1280, height: 979, opticalScale: .72 },
  { name: "APC", src: "/images/partners/partner-12.png", width: 1920, height: 1081, opticalScale: 1.08 },
  { name: "Synology", src: "/images/partners/partner-13.png", width: 1265, height: 325, opticalScale: 1 },
  { name: "Fortinet", src: "/images/partners/fortinet.svg", width: 300, height: 34, opticalScale: 1 },
  { name: "Lenovo", src: "/images/partners/lenovo.png", width: 2560, height: 538, opticalScale: 1 },
  { name: "Samsung", src: "/images/partners/samsung.png", width: 1920, height: 1080, opticalScale: 1.08 },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "Datahouse",
  url: "https://datahouse.com.tr",
  logo: "https://datahouse.com.tr/images/datahouse-logo.png",
  email: "info@datahouse.com.tr",
  telephone: "+90-224-272-9390",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Odunluk Mah. Liman Cad. Kumova Plaza Kat:4",
    addressLocality: "Nilüfer",
    addressRegion: "Bursa",
    addressCountry: "TR",
  },
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <SitePreloader />
      <CinematicExperience />
      <SiteHeader />

      <aside className="story-rail" aria-hidden="true">
        <span>01</span><i><b /></i><span>07</span>
      </aside>

      <div className="cinematic-story" data-cinematic-story>
        <section className="story-section hero-section" data-chapter="hero" data-header-tone="dark" id="baslangic">
          <div className="section-microcopy top-left">DATAHOUSE / INFRASTRUCTURE<br />BURSA · TR</div>
          <div className="hero-copy copy-block">
            <p className="eyebrow"><span>DATAHOUSE</span> BİLGİ GÜÇTÜR</p>
            <h1>Bilgi,<br /><span>harekete</span><br />geçtiğinde güçtür.</h1>
            <p className="hero-lede">Kritik teknoloji altyapınızı tasarlıyor, devreye alıyor ve işinizle birlikte çalışır durumda tutuyoruz.</p>
            <div className="hero-actions">
              <Link className="primary-action" href="#hizmetler">Çözümleri keşfet <ArrowDown size={17} aria-hidden="true" /></Link>
              <Link className="quiet-action" href="#iletisim">Projenizi konuşalım <ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="hero-data-wave" aria-hidden="true">
            <svg viewBox="0 0 1600 180" preserveAspectRatio="none" role="presentation">
              <defs>
                <linearGradient id="hero-wave-red" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#e42b20" stopOpacity="0" />
                  <stop offset="0.14" stopColor="#e42b20" stopOpacity="0.72" />
                  <stop offset="0.58" stopColor="#ff3b2f" />
                  <stop offset="1" stopColor="#e42b20" stopOpacity="0.12" />
                </linearGradient>
                <linearGradient id="hero-wave-hot" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ff3b2f" stopOpacity="0" />
                  <stop offset="0.45" stopColor="#fff" />
                  <stop offset="0.58" stopColor="#ff3b2f" />
                  <stop offset="1" stopColor="#e42b20" stopOpacity="0" />
                </linearGradient>
                <filter id="hero-wave-glow" x="-20%" y="-100%" width="140%" height="300%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <g className="hero-wave-field">
                <path className="hero-wave-line hero-wave-line-a" pathLength="1" d="M0 100 C130 57 225 139 350 91 S560 59 700 98 S930 139 1085 87 S1360 64 1600 96" />
                <path className="hero-wave-line hero-wave-line-b" pathLength="1" d="M0 91 C170 132 238 46 405 94 S642 126 798 84 S1047 64 1190 101 S1440 120 1600 89" />
                <path className="hero-wave-line hero-wave-line-c" pathLength="1" d="M0 109 C115 79 235 111 345 103 S561 77 690 99 S906 111 1045 93 S1338 82 1600 101" />
                <path className="hero-wave-dots" pathLength="1" d="M0 100 C130 57 225 139 350 91 S560 59 700 98 S930 139 1085 87 S1360 64 1600 96" />
              </g>
              <path className="hero-wave-spine" d="M0 99 C285 96 475 103 705 98 S1165 96 1600 98" />
              <path className="hero-wave-pulse" pathLength="1" d="M0 99 C285 96 475 103 705 98 S1165 96 1600 98" />
            </svg>
          </div>
          <div className="hero-status" aria-hidden="true">
            <span>SYSTEM STATUS</span><b><i /> OPERATIONAL</b>
          </div>
          <p className="scene-number">01 <span>BAŞLANGIÇ</span></p>
        </section>

        <section className="story-section network-section" data-chapter="network" data-header-tone="dark" id="hizmetler">
          <div className="copy-block right-copy">
            <p className="eyebrow"><span>01</span> AĞ ÇÖZÜMLERİ</p>
            <h2>Her bağlantı,<br /><em>işinize güç verir.</em></h2>
            <p>Merkezden şubeye, kullanıcıdan kritik servise kadar her noktayı güvenli ve ölçülebilir tek bir mimaride buluşturuyoruz.</p>
            <Link className="story-link" href="/hizmetler/ag-cozumleri/">Ağ çözümlerini incele <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="chapter-data left-data" aria-hidden="true">
            <span>LATENCY</span><strong>08<small>ms</small></strong><i /><span>PACKET FLOW / STABLE</span>
          </div>
          <p className="scene-number">02 <span>BAĞLANTI</span></p>
        </section>

        <section className="story-section firewall-section" data-chapter="firewall" data-header-tone="dark">
          <div className="copy-block left-copy">
            <p className="eyebrow"><span>02</span> FORTIGATE FIREWALL</p>
            <h2>Güvenlik,<br /><em>hareketi korur.</em></h2>
            <p>Ağınızın giriş ve çıkış noktalarını görünür politikalar, doğru segmentasyon ve güvenli erişim katmanlarıyla koruyoruz.</p>
            <Link className="story-link" href="/hizmetler/fortigate-firewall-cozumleri/">Firewall çözümlerini incele <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="chapter-data firewall-data" aria-hidden="true">
            <span>POLICY ENGINE</span><strong>24<small>/7</small></strong><i /><span>PERIMETER / OBSERVED</span>
          </div>
          <p className="scene-number">03 <span>ÇEVRE GÜVENLİĞİ</span></p>
        </section>

        <section className="story-section server-section" data-chapter="server" data-header-tone="dark">
          <div className="copy-block left-copy">
            <p className="eyebrow"><span>03</span> SUNUCU ÇÖZÜMLERİ</p>
            <h2>Performans,<br /><em>doğru mimariyle başlar.</em></h2>
            <p>İş yükünüzü doğru işlem, bellek ve depolama katmanlarıyla buluşturuyor; büyümeye hazır sistemler kuruyoruz.</p>
            <Link className="story-link" href="/hizmetler/sunucu-cozumleri/">Sunucu çözümlerini incele <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="product-specs" aria-hidden="true">
            <span>POWERSTORE / ACTIVE</span><span>NVMe ARCHITECTURE</span><span>DATA LAYER / READY</span>
          </div>
          <p className="scene-number">04 <span>PERFORMANS</span></p>
        </section>

        <section className="story-section ai-section" data-chapter="ai" data-header-tone="dark">
          <div className="copy-block left-copy">
            <p className="eyebrow"><span>04</span> KURUMSAL YAPAY ZEKÂ</p>
            <h2>Veriniz içeride.<br /><em>Zekâ işinizin içinde.</em></h2>
            <p>RTX Spark tabanlı yerel yapay zekâ altyapısını kurum dokümanlarınızla buluşturuyor; güvenli arama, soru-cevap ve üretkenlik çözümleri geliştiriyoruz.</p>
            <Link className="story-link" href="/hizmetler/kurumsal-yapay-zeka-cozumleri/">Yapay zekâ çözümlerini incele <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="ai-scene-labels" aria-hidden="true">
            <span>LOCAL AI / RTX SPARK</span><i /><span>RAG PIPELINE / SECURED</span>
          </div>
          <p className="scene-number">05 <span>YEREL ZEKÂ</span></p>
        </section>

        <section className="story-section maintenance-section" data-chapter="maintenance" data-header-tone="dark">
          <div className="copy-block right-copy">
            <p className="eyebrow"><span>05</span> BAKIM HİZMETLERİ</p>
            <h2>Kesintiyi değil,<br /><em>sürekliliği yönet.</em></h2>
            <p>Sunucu sağlığını düzenli izliyor, riskleri önceliklendiriyor ve sorunlar işinizi durdurmadan müdahale ediyoruz.</p>
            <Link className="story-link" href="/hizmetler/sunucu-bakim/">Bakım yaklaşımını incele <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <p className="scene-number">06 <span>SÜREKLİLİK</span></p>
        </section>

        <section className="story-section backup-section" data-chapter="backup" data-header-tone="dark">
          <div className="backup-copy">
            <p className="eyebrow"><span>06</span> YEDEKLEME ÇÖZÜMLERİ</p>
            <h2>Veriniz geri<br /><em>dönebilsin.</em></h2>
            <p>Kritik verileri doğru sıklıkta koruyor, geri dönüş senaryolarını tasarlıyor ve yedeklerin gerçekten çalıştığını doğruluyoruz.</p>
            <Link className="story-link" href="/hizmetler/yedekleme/">Yedekleme çözümlerini incele <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="backup-job-stage" aria-hidden="true">
            <div className="backup-source-node">
              <span><i /> 01 / SOURCE SYSTEMS</span>
              <img src="/images/backup/backup-source-systems.png" alt="" width="1536" height="1024" loading="lazy" decoding="async" />
              <b>03 VM / ONLINE</b>
            </div>
            <div className="backup-pipeline">
              <i />
              {Array.from({ length: 8 }, (_, index) => <span key={index} style={{ "--block": index } as React.CSSProperties} />)}
            </div>
            <div className="backup-repository-node">
              <span><i /> 03 / REPOSITORY</span>
              <img src="/images/backup/backup-repository.png" alt="" width="1536" height="1024" loading="lazy" decoding="async" />
              <b>RESTORE POINT / READY</b>
            </div>
            <div className="backup-job-panel">
              <header><span><i /> BACKUP JOB / ACTIVE</span><b>98%</b></header>
              <div className="backup-job-progress"><i /></div>
              <dl>
                <div><dt>SOURCE</dt><dd>VM_CLUSTER_01</dd></div>
                <div><dt>PROCESSING</dt><dd>ACTIVE</dd></div>
                <div><dt>VERIFY</dt><dd>SUCCESS</dd></div>
              </dl>
            </div>
          </div>
          <p className="scene-number">07 <span>KORUMA</span></p>
        </section>
      </div>

      <section className="services-overview section-surface" data-header-tone="light">
        <div className="section-heading">
          <p className="eyebrow dark"><span>SOLUTIONS</span> ÇÖZÜM İNDEKSİ</p>
          <h2>Tek bir sistem gibi<br />çalışan çözümler.</h2>
          <p>Ağdan veriye, kurulumdan sürekliliğe kadar altyapınızın bütün katmanlarını birlikte ele alıyoruz.</p>
        </div>
        <div className="solution-index">
          {services.map((service) => (
            <Link href={`/hizmetler/${service.slug}/`} className="solution-card" key={service.slug}>
              <span className="solution-card-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.indexSummary}</p>
              <span className="solution-card-action" aria-hidden="true"><ArrowUpRight /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="about-section section-surface" data-header-tone="light" id="hakkimizda">
        <div className="about-marker" aria-hidden="true">DH<br /><span>KNOWLEDGE<br />SYSTEMS</span></div>
        <div className="about-copy">
          <p className="eyebrow dark"><span>ABOUT</span> DATAHOUSE</p>
          <h2>Teknolojiyi değil,<br />işleyen sistemi kurarız.</h2>
          <p className="about-lede">Datahouse; kurumların teknoloji altyapısını tasarlayan, geliştiren ve sürdürülebilir hâle getiren bir teknoloji şirketidir.</p>
          <div className="about-columns">
            <p>Profesyonel eğitmen ve danışman kadromuzla kurumsal ve bireysel eğitimler veriyor; gerçek hayat deneyimini teknik bilgiyle birleştiriyoruz.</p>
            <p>Amacımız, hızla gelişen bilgi teknolojileri sektöründe ihtiyaç duyulan uzmanlığa erişimi kolaylaştırmak ve kurumlara güvenilir bir bilgi kaynağı olmaktır.</p>
          </div>
        </div>
      </section>

      <section className="certificate-section" data-header-tone="red" id="sertifika">
        <div className="certificate-icon"><ShieldCheck strokeWidth={1.2} aria-hidden="true" /></div>
        <div className="certificate-heading">
          <p className="eyebrow"><span>SECURITY</span> ISO 27001</p>
          <h2><span>Bilginin güvenliği,</span><span>sistemin temelidir.</span></h2>
        </div>
        <div className="certificate-copy">
          <div className="certificate-burst" aria-hidden="true">
            {["RİSK YÖNETİMİ", "ERİŞİM KONTROLÜ", "SÜREKLİ İYİLEŞTİRME", "GİZLİLİK / BÜTÜNLÜK / ERİŞİLEBİLİRLİK"].map((label, index) => (
              <span key={label} style={{ "--burst-index": index } as CSSProperties}>{label}</span>
            ))}
          </div>
          <div className="certificate-copy-body">
            <p>ISO 27001, bilgi varlıklarının gizlilik, bütünlük ve erişilebilirlik ilkeleriyle yönetilmesi için sistematik bir çerçeve sunar. Kurumun risklerini belirlemeyi, uygun kontrolleri seçmeyi ve uygulamaların sürekliliğini izlemeyi esas alır.</p>
            <p>Bu yaklaşım; süreçlerin, sorumlulukların ve erişim kurallarının tanımlanmasına, olaylara hazırlığın güçlendirilmesine ve bilgi güvenliğinin sürekli iyileştirilmesine yardımcı olur.</p>
          </div>
        </div>
        <span className="certificate-code">CERT / 27001<br />INFORMATION SECURITY</span>
      </section>

      <section className="partners-section section-surface" data-header-tone="light" id="partnerler">
        <div className="section-heading compact">
          <p className="eyebrow dark"><span>ECOSYSTEM</span> PARTNERLERİMİZ</p>
          <h2>Güçlü teknoloji,<br />doğru iş ortaklığı.</h2>
        </div>
        <div className="partner-grid">
          {partners.map((partner, index) => (
            <div className="partner-card" key={partner.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div className="partner-logo-frame" style={{ "--partner-scale": partner.opticalScale } as CSSProperties}>
                <img src={partner.src} alt={partner.name} width={partner.width} height={partner.height} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" data-header-tone="dark" id="iletisim">
        <div className="contact-intro">
          <p className="eyebrow"><span>CONTACT</span> BİRLİKTE BAŞLAYALIM</p>
          <h2>Altyapınızı<br /><em>konuşalım.</em></h2>
          <p>İhtiyacınızı anlatın. Doğru sorularla başlayalım, size uygun teknik çerçeveyi birlikte oluşturalım.</p>
        </div>
        <ContactForm />
        <div className="contact-details">
          <a href="https://www.google.com/maps/search/?api=1&query=Odunluk%20Mahallesi%20Liman%20Caddesi%20Kumova%20Plaza%20Nil%C3%BCfer%20Bursa" target="_blank" rel="noreferrer">
            <MapPin aria-hidden="true" /><span><small>ADRES</small>Odunluk Mah. Liman Cad.<br />Kumova Plaza Kat:4 Nilüfer / Bursa</span>
          </a>
          <a href="tel:+902242729390"><Phone aria-hidden="true" /><span><small>TELEFON</small>0 (224) 272 93 90</span></a>
          <a href="mailto:info@datahouse.com.tr"><Mail aria-hidden="true" /><span><small>E-POSTA</small>info@datahouse.com.tr</span></a>
        </div>
      </section>

      <footer className="site-footer">
        <img src="/images/datahouse-logo.png" alt="Datahouse" width="643" height="117" />
        <p>BİLGİ GÜÇTÜR · KNOWLEDGE IS POWER</p>
        <div><span>© {new Date().getFullYear()} DATAHOUSE</span><Link href="/kvkk/">KVKK</Link><a href="#baslangic">YUKARI ↑</a></div>
      </footer>
    </main>
  );
}
