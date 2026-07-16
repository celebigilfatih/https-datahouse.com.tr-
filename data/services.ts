export type Service = {
  slug: "ag-cozumleri" | "fortigate-firewall-cozumleri" | "sunucu-cozumleri" | "kurumsal-yapay-zeka-cozumleri" | "sunucu-bakim" | "yedekleme";
  number: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  indexSummary: string;
  summary: string;
  statement: string;
  capabilities: Array<{ title: string; description: string }>;
  useCases: string[];
  process: Array<{ number: string; title: string; description: string }>;
  visual: "network" | "firewall" | "server" | "ai" | "maintenance" | "backup";
  seo: { title: string; description: string };
};

export const services: Service[] = [
  {
    slug: "ag-cozumleri",
    number: "01",
    eyebrow: "BAĞLANTI / GÜVENLİK / SÜREKLİLİK",
    title: "Ağ Çözümleri",
    shortTitle: "Ağ",
    indexSummary: "Güvenli ve ölçeklenebilir bağlantı",
    summary: "Kurumunuzun iletişim omurgasını güvenli, ölçülebilir ve büyümeye hazır bir mimariye dönüştürüyoruz.",
    statement: "Doğru ağ; yalnızca cihazları değil, işin bütün ritmini birbirine bağlar.",
    capabilities: [
      { title: "Ağ mimarisi", description: "Mevcut altyapıyı analiz eder, lokasyonlar ve kullanıcı ihtiyaçları için doğru topolojiyi tasarlarız." },
      { title: "Güvenli erişim", description: "Yetkilendirme, segmentasyon ve güvenlik politikalarını ağın doğal bir parçası hâline getiririz." },
      { title: "Kablosuz altyapı", description: "Kapsama, kapasite ve kullanıcı yoğunluğunu gözeten kurumsal kablosuz çözümler kurarız." },
      { title: "İzleme ve optimizasyon", description: "Ağ sağlığını görünür kılar; darboğazları performans kaybına dönüşmeden ele alırız." },
    ],
    useCases: ["Merkez ve şube bağlantıları", "Kampüs ağı tasarımı", "Güvenli uzaktan erişim", "Ağ segmentasyonu", "Kablosuz ağ yenileme", "Performans analizi"],
    process: [
      { number: "01", title: "Keşif", description: "Topolojiyi, kullanıcı davranışını ve kritik iş akışlarını birlikte inceleriz." },
      { number: "02", title: "Mimari", description: "Güvenlik, performans ve büyüme hedeflerini tek bir teknik tasarımda birleştiririz." },
      { number: "03", title: "Devreye alma", description: "Geçişi kesintiyi azaltacak şekilde planlar, test eder ve dokümante ederiz." },
    ],
    visual: "network",
    seo: { title: "Kurumsal Ağ Çözümleri | Datahouse", description: "Güvenli, yüksek performanslı ve ölçeklenebilir kurumsal ağ altyapıları." },
  },
  {
    slug: "fortigate-firewall-cozumleri",
    number: "02",
    eyebrow: "ÇEVRE GÜVENLİĞİ / POLİTİKA / GÖRÜNÜRLÜK",
    title: "FortiGate Firewall Çözümleri",
    shortTitle: "Firewall",
    indexSummary: "Çevre güvenliği ve politika yönetimi",
    summary: "Ağınızın giriş ve çıkış noktalarını, iş akışınızı destekleyen görünür ve yönetilebilir güvenlik politikalarıyla koruyoruz.",
    statement: "Güvenlik, işinizi yavaşlatan bir sınır değil; güvenle hareket etmenizi sağlayan bir çerçevedir.",
    capabilities: [
      { title: "Güvenlik duvarı mimarisi", description: "Kurumunuzun bağlantı noktalarını, trafiğini ve önceliklerini değerlendirerek doğru güvenlik duvarı kurgusunu tasarlarız." },
      { title: "Ağ segmentasyonu", description: "Kritik sistemleri, kullanıcıları ve servisleri ihtiyaca uygun erişim katmanlarıyla birbirinden ayırırız." },
      { title: "Güvenli uzaktan erişim", description: "Uzak ekiplerin ve şubelerin kurum kaynaklarına tanımlı politikalarla erişmesini sağlayan senaryolar kurarız." },
      { title: "Politika ve görünürlük", description: "Güvenlik politikalarını anlaşılır hâle getirir, ağ hareketlerini izlenebilir bir çerçevede ele alırız." },
    ],
    useCases: ["Merkez ve şube güvenliği", "İnternet çıkışı", "Güvenli uzaktan erişim", "Ağ segmentasyonu", "Politika yönetimi", "Tehditlere karşı koruma"],
    process: [
      { number: "01", title: "Keşif", description: "Mevcut trafik akışlarını, erişim ihtiyaçlarını ve korunacak kritik noktaları birlikte değerlendiririz." },
      { number: "02", title: "Politika ve mimari", description: "Erişim kurallarını ve güvenlik katmanlarını iş akışlarını gözeten net bir tasarımda toplarız." },
      { number: "03", title: "Kontrollü devreye alma", description: "Geçişi test eder, politikaları doğrular ve işletim için görünür bir başlangıç noktası oluştururuz." },
    ],
    visual: "firewall",
    seo: { title: "FortiGate Firewall Çözümleri | Datahouse", description: "Kurumsal ağlar için FortiGate firewall mimarisi, segmentasyon, güvenli uzaktan erişim ve politika yönetimi." },
  },
  {
    slug: "sunucu-cozumleri",
    number: "03",
    eyebrow: "PERFORMANS / SANALLAŞTIRMA / ÖLÇEK",
    title: "Sunucu Çözümleri",
    shortTitle: "Sunucu",
    indexSummary: "İş yüküne uygun performans mimarisi",
    summary: "İş yüklerinizi doğru işlem, bellek ve depolama mimarisiyle buluşturan yeni nesil sunucu altyapıları kuruyoruz.",
    statement: "İşiniz hızlandıkça altyapınız sınır değil, güç çarpanı olmalı.",
    capabilities: [
      { title: "İhtiyaca özel boyutlandırma", description: "Kaynak tüketimini ve büyüme projeksiyonunu analiz ederek doğru kapasiteyi belirleriz." },
      { title: "Sanallaştırma", description: "Kaynakları daha verimli kullanan, yönetilebilir ve esnek sanal altyapılar tasarlarız." },
      { title: "Depolama entegrasyonu", description: "Sunucu ve kurumsal depolama katmanını performans ile süreklilik odağında birleştiririz." },
      { title: "Geçiş ve konsolidasyon", description: "Dağınık iş yüklerini kontrollü bir geçiş planıyla sadeleştirir ve merkezileştiririz." },
    ],
    useCases: ["Web ve uygulama sunucuları", "Veritabanı sunucuları", "Etki alanı servisleri", "Dosya paylaşımı", "E-posta altyapıları", "Sanal sunucu kümeleri"],
    process: [
      { number: "01", title: "İş yükü analizi", description: "Uygulamaları, bağımlılıkları ve performans beklentilerini haritalarız." },
      { number: "02", title: "Boyutlandırma", description: "Maliyet ve performans dengesini koruyan donanım ve sanallaştırma mimarisini seçeriz." },
      { number: "03", title: "Geçiş", description: "Test, veri taşıma ve devreye alma adımlarını kontrollü biçimde tamamlarız." },
    ],
    visual: "server",
    seo: { title: "Kurumsal Sunucu Çözümleri | Datahouse", description: "Kurumsal iş yükleri için performanslı, ölçeklenebilir sunucu ve sanallaştırma çözümleri." },
  },
  {
    slug: "kurumsal-yapay-zeka-cozumleri",
    number: "04",
    eyebrow: "YEREL AI / KURUMSAL BİLGİ / VERİ MAHREMİYETİ",
    title: "Kurumsal Yapay Zekâ Çözümleri",
    shortTitle: "Yapay Zekâ",
    indexSummary: "Kurum içinde çalışan bilgi katmanı",
    summary: "Şirketinizin bilgi kaynaklarını, kurum içinde çalışan yerel yapay zekâ modelleriyle güvenli ve erişilebilir bir bilgi katmanına dönüştürüyoruz.",
    statement: "Yapay zekâ şirketinizi tanısın; veriniz şirketinizde kalsın.",
    capabilities: [
      { title: "Yerel AI altyapısı", description: "İhtiyacınıza göre boyutlandırılan RTX Spark tabanlı altyapıyı müşteri ortamında kurarız. Çözüm tamamen yerel yapılandırıldığında kurumsal içerikler harici model servislerine gönderilmeden işlenir." },
      { title: "Kurumsal bilgi katmanı", description: "Dokümanları kurum içinde indeksler, yerel modelin yanıtlarını yetkili ve güncel kaynaklara dayandıran RAG mimarisini oluştururuz." },
      { title: "Kimlik ve erişim kontrolü", description: "Kullanıcıların yalnızca yetkili oldukları bilgi kaynaklarına ulaşmasını sağlayan erişim sınırlarını çözümün parçası hâline getiririz." },
      { title: "İş süreçlerine özel asistanlar", description: "Arama, soru-cevap, özetleme ve kurumsal bilgiye erişim senaryolarını ekiplerin günlük çalışma biçimine uyarlarız." },
    ],
    useCases: ["Kurum içi bilgi asistanı", "Doküman soru-cevap", "Prosedür ve sözleşme arama", "Teknik destek asistanı", "Rapor özetleme", "Departman asistanları"],
    process: [
      { number: "01", title: "Veri ve ihtiyaç keşfi", description: "Bilgi kaynaklarını, kullanıcı gruplarını, güvenlik sınırlarını ve hedef iş senaryolarını birlikte belirleriz." },
      { number: "02", title: "Kontrollü pilot", description: "Yerel model ve RAG yapısını sınırlı bir veri kümesinde kurar; yanıt kalitesini, kaynak doğruluğunu ve kullanım deneyimini değerlendiririz." },
      { number: "03", title: "Yetkilendirilmiş devreye alma", description: "Erişim politikalarını, izlemeyi ve geri bildirim sürecini tamamlayarak çözümü kontrollü biçimde kullanıma açarız." },
    ],
    visual: "ai",
    seo: { title: "Kurumsal Yapay Zekâ Çözümleri | Datahouse", description: "RTX Spark tabanlı yerel yapay zekâ, kurumsal RAG bilgi katmanı ve şirket içi AI asistanı çözümleri." },
  },
  {
    slug: "sunucu-bakim",
    number: "05",
    eyebrow: "İZLEME / MÜDAHALE / DEVAMLILIK",
    title: "Sunucu Bakım Hizmetleri",
    shortTitle: "Bakım",
    indexSummary: "Proaktif izleme ve uzman müdahalesi",
    summary: "Sunucu altyapınızı düzenli kontroller, proaktif bakım ve uzman müdahalesiyle sağlıklı tutuyoruz.",
    statement: "En iyi müdahale, kesinti daha oluşmadan yapılan müdahaledir.",
    capabilities: [
      { title: "Periyodik bakım", description: "Donanım ve yazılım sağlığını planlı kontrollerle izler, riskleri önceliklendiririz." },
      { title: "İşletim sistemi desteği", description: "Linux, BSD ve Microsoft Windows sunucular için yönetim ve destek sağlarız." },
      { title: "Veritabanı ve servisler", description: "SQL Server, Oracle, MySQL ve kurumsal servislerin sürekliliğini destekleriz." },
      { title: "Uzman müdahalesi", description: "Karşılaşılan sorunları kapsamı belirlenmiş destek modeliyle analiz eder ve çözeriz." },
    ],
    useCases: ["Exchange ve posta servisleri", "Linux / Windows yönetimi", "SQL ve Oracle sistemleri", "Web servisleri", "Güvenlik cihazları", "Kontrol paneli yönetimi"],
    process: [
      { number: "01", title: "Sağlık taraması", description: "Altyapının mevcut durumunu, güncelliğini ve kritik risklerini belirleriz." },
      { number: "02", title: "Bakım planı", description: "Kontrol sıklığını, sorumlulukları ve müdahale yöntemini netleştiririz." },
      { number: "03", title: "Sürekli iyileştirme", description: "Bulguları raporlar, tekrar eden sorunları kalıcı olarak azaltacak adımlar öneririz." },
    ],
    visual: "maintenance",
    seo: { title: "Sunucu Bakım ve Destek Hizmetleri | Datahouse", description: "Linux, BSD ve Windows sunucular için proaktif bakım, yönetim ve uzman destek hizmetleri." },
  },
  {
    slug: "yedekleme",
    number: "06",
    eyebrow: "KORUMA / KURTARMA / DAYANIKLILIK",
    title: "Yedekleme Çözümleri",
    shortTitle: "Yedekleme",
    indexSummary: "Doğrulanabilir koruma ve geri dönüş",
    summary: "Kritik verilerinizi doğru sıklık, saklama ve geri dönüş senaryolarıyla güvence altına alıyoruz.",
    statement: "Yedek, yalnızca saklanan veri değil; geri dönebileceğiniz doğrulanmış bir zamandır.",
    capabilities: [
      { title: "Yedekleme mimarisi", description: "Veri önemine göre yerel, uzak ve hibrit yedekleme katmanlarını tasarlarız." },
      { title: "Kurtarma senaryoları", description: "Sistem, dosya ve uygulama bazında geri dönüş hedeflerini netleştiririz." },
      { title: "Otomasyon ve izleme", description: "İşlerin düzenli çalışmasını izler, başarısız yedekleri görünür hâle getiririz." },
      { title: "Geri dönüş testleri", description: "Yedeklerin gerçekten kullanılabilir olduğunu periyodik testlerle doğrularız." },
    ],
    useCases: ["Sunucu yedekleme", "Sanal makine koruması", "Veritabanı yedekleme", "Uzak lokasyon kopyası", "Dosya kurtarma", "Felaket kurtarma hazırlığı"],
    process: [
      { number: "01", title: "Veri sınıflandırma", description: "Kritik sistemleri, veri hacmini ve kabul edilebilir kesinti süresini belirleriz." },
      { number: "02", title: "Koruma politikası", description: "Yedek sıklığı, saklama süresi ve kopya konumlarını tanımlarız." },
      { number: "03", title: "Doğrulama", description: "Geri dönüş testleri ve düzenli raporlarla korumanın çalıştığını kanıtlarız." },
    ],
    visual: "backup",
    seo: { title: "Kurumsal Yedekleme Çözümleri | Datahouse", description: "Kritik veriler için güvenli yedekleme, geri dönüş ve felaket kurtarma hazırlığı." },
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
