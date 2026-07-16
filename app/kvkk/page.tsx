import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "KVKK Aydınlatma Metni | Datahouse", description: "Datahouse iletişim formu kişisel veri aydınlatma metni." };

export default function KvkkPage() {
  return (
    <main className="legal-page">
      <Link href="/" className="legal-logo"><img src="/images/datahouse-logo.png" alt="Datahouse" width="643" height="117" /></Link>
      <article>
        <Link href="/#iletisim" className="back-link"><ArrowLeft size={15} /> İletişime dön</Link>
        <p className="eyebrow"><span>LEGAL</span> KVKK</p>
        <h1>Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni</h1>
        <p>Datahouse, iletişim formu aracılığıyla paylaştığınız ad-soyad, firma, e-posta adresi, telefon numarası ve mesaj bilgilerini talebinizi değerlendirmek ve sizinle iletişime geçmek amacıyla işler.</p>
        <h2>İşleme amacı ve hukuki sebep</h2>
        <p>Kişisel verileriniz; talebinizin alınması, yanıtlanması, hizmet ihtiyaçlarınızın değerlendirilmesi ve iletişim faaliyetlerinin yürütülmesi amaçlarıyla, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında açık rızanız ve ilgili hukuki sebepler doğrultusunda işlenir.</p>
        <h2>Aktarım ve saklama</h2>
        <p>Verileriniz yalnızca talebin yerine getirilmesi için gerekli hizmet sağlayıcılarla, hukuki ve teknik güvenlik önlemleri altında paylaşılabilir. Bilgileriniz işleme amacı için gerekli süre ve yasal saklama yükümlülükleri boyunca korunur.</p>
        <h2>Haklarınız</h2>
        <p>KVKK’nın 11. maddesi kapsamındaki haklarınıza ilişkin taleplerinizi <a href="mailto:info@datahouse.com.tr">info@datahouse.com.tr</a> adresi üzerinden Datahouse’a iletebilirsiniz.</p>
        <p className="legal-note">Bu metin mevcut iletişim sürecini açıklayan ilk sürümdür; yayın öncesinde şirketin hukuk danışmanı tarafından onaylanmalıdır.</p>
      </article>
    </main>
  );
}
