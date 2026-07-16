import { ArrowLeft, ArrowRight, ArrowUpRight, BrainCircuit, Check, Cpu, DatabaseBackup, Network, ScanLine, Shield } from "lucide-react";
import Link from "next/link";
import type { Service } from "@/data/services";
import AiDataStage from "./ai-data-stage";
import SiteHeader from "./site-header";

const icons = { network: Network, firewall: Shield, server: Cpu, ai: BrainCircuit, maintenance: ScanLine, backup: DatabaseBackup };

export default function ServicePage({ service }: { service: Service }) {
  const Icon = icons[service.visual];

  return (
    <main className={`service-page service-${service.visual}`}>
      <SiteHeader />
      <section className="service-hero">
        <div className="service-hero-grid" aria-hidden="true" />
        <div className="service-orbit" aria-hidden="true"><i /><span><Icon /></span></div>
        {service.visual === "server" && <img className="service-product" src="/images/powerstore.avif" alt="Dell PowerStore" width="2998" height="1400" />}
        {service.visual === "firewall" && <img className="service-product service-firewall-product" src="/images/fortigate-firewall.webp" alt="FortiGate Firewall cihazı" width="1000" height="300" />}
        {service.visual === "ai" && <AiDataStage variant="service" />}
        {service.visual === "ai" && <img className="service-product service-ai-product" src="/images/ai/rtx-spark-device.webp" alt="NVIDIA RTX Spark tabanlı kompakt yapay zekâ sistemi" width="1738" height="905" fetchPriority="high" />}
        <div className="service-hero-copy">
          <Link className="back-link" href="/#hizmetler"><ArrowLeft size={15} /> Tüm hizmetler</Link>
          <p className="eyebrow"><span>{service.number}</span> {service.eyebrow}</p>
          <h1>{service.title}</h1>
          <p>{service.summary}</p>
          <Link className="primary-action" href="#teklif">Çözümü konuşalım <ArrowRight size={17} /></Link>
        </div>
        <div className="service-hero-index">{service.number}<span>DATAHOUSE / SERVICES</span></div>
      </section>

      <section className="service-statement">
        <p>YAKLAŞIM</p>
        <h2>“{service.statement}”</h2>
      </section>

      <section className="capabilities-section">
        <div className="service-section-heading">
          <p className="eyebrow dark"><span>CAPABILITIES</span> YETKİNLİKLER</p>
          <h2>Altyapınızın ihtiyaç duyduğu<br />doğru katmanlar.</h2>
        </div>
        <div className="capability-grid">
          {service.capabilities.map((capability, index) => (
            <article key={capability.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <Icon aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="use-cases-section">
        <div>
          <p className="eyebrow"><span>USE CASES</span> KULLANIM ALANLARI</p>
          <h2>Teknik ihtiyaçtan<br />iş sonucuna.</h2>
        </div>
        <ul>
          {service.useCases.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}<Check /></li>)}
        </ul>
      </section>

      <section className="process-section">
        <div className="service-section-heading">
          <p className="eyebrow dark"><span>PROCESS</span> ÇALIŞMA MODELİ</p>
          <h2>Net adımlar.<br />Kontrollü sonuç.</h2>
        </div>
        <div className="process-grid">
          {service.process.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span><i />
              <h3>{step.title}</h3><p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="service-cta" id="teklif">
        <p className="eyebrow"><span>NEXT STEP</span> BİRLİKTE BAŞLAYALIM</p>
        <h2>Altyapınızı bir sonraki<br />seviyeye taşıyalım.</h2>
        <p>İhtiyacınızı anlatın; mevcut durumu ve doğru çözüm çerçevesini birlikte değerlendirelim.</p>
        <Link href="/#iletisim">Teklif alın <ArrowUpRight /></Link>
      </section>

      <footer className="service-footer">
        <Link href="/"><img src="/images/datahouse-logo.png" alt="Datahouse" width="643" height="117" /></Link>
        <span>© {new Date().getFullYear()} DATAHOUSE</span>
        <Link href="/#hizmetler">DİĞER HİZMETLER <ArrowRight size={14} /></Link>
      </footer>
    </main>
  );
}
