import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";

import tabOdeme from "@/assets/tab-odeme-corp.png";
import tabEticaret from "@/assets/tab-eticaret-corp.png";
import tabPara from "@/assets/tab-para-corp.png";
import tabStok from "@/assets/tab-stok-corp.png";
import tabKargo from "@/assets/tab-kargo-ai.png";
import tabEkip from "@/assets/tab-ekip-corp.png";
import tabSaha from "@/assets/tab-saha-ai.png";
import tabAkis from "@/assets/tab-uretim-corp.png";
import tabTesvik from "@/assets/tab-tesvik-corp.png";
import tabGlobal from "@/assets/tab-global-corp.png";

const galleryItems: GalleryItem[] = [
  { common: "Ödeme Al", binomial: "Param POS Çözümleri", description: "Türkiye'nin lider finansal teknoloji ekosistemi Param ile tanışın; ticaretinize güç katın. Param Fiziki POS, Param Sanal POS ve Param Cep POS çözümlerimizle tüm tahsilat süreçlerinizi tek platformda birleştirin.", tags: ["Param Fiziki POS", "Param Sanal POS", "Param Cep POS"], photo: { url: tabOdeme, text: "Ödeme çözümleri", by: "Param" } },
  { common: "E-Ticarete Açıl", binomial: "Online Satış Altyapısı", description: "Online satışın gücüyle dükkanınızın sınırlarını aşın ve satışlarınızı artırın. Türkiye'nin önde gelen e-ticaret altyapı sağlayıcılarının sunduğu en uygun paketleri keşfedin.", tags: ["E-Ticaret Paketleri", "Pazaryeri Entegrasyonu"], photo: { url: tabEticaret, text: "E-ticaret çözümleri", by: "DigitalHub" } },
  { common: "Paranı Yönet", binomial: "Nakit Akış Yönetimi", description: "Finrota'nın sunduğu Netahsilat, Netekstre, Nap360 ve Posrapor çözümleriyle nakit akışınızı düzenleyin, tüm para trafiğinizi güvenle yönetin. Kredim Business ile işletmenize uygun finansman imkanlarına ulaşın.", tags: ["Netahsilat", "Netekstre", "Nap360", "Posrapor", "Kredim Business"], photo: { url: tabPara, text: "Para yönetimi", by: "Finrota" } },
  { common: "Stoğunu Kontrol Et", binomial: "Depo & Stok Yönetimi", description: "Univera Stokbar ve Nebim V3 çözümleriyle depo yönetiminizi modernleştirin, ürün giriş çıkışlarını anlık verilerle izleyin. Akıllı stok planlama yöntemleriyle depo seviyelerinizi en ideal noktada tutun.", tags: ["Univera Stokbar", "Nebim V3"], photo: { url: tabStok, text: "Stok yönetimi", by: "Univera / Nebim" } },
  { common: "Ürünlerini Gönder", binomial: "Lojistik & Kargo", description: "Geniş lojistik ağıyla ürünlerinizi Türkiye'nin her yerine hızlıca ulaştırın. E-ticaret entegrasyonu ile siparişlerinizi anında kargoya hazırlayın.", tags: ["Kargo Entegrasyonu", "Lojistik Yönetimi"], photo: { url: tabKargo, text: "Kargo çözümleri", by: "DigitalHub" } },
  { common: "Ekibine Yön Ver", binomial: "İnsan Kaynakları", description: "Çalışanlarınızın işe başladığı günden emekli olacağı güne kadar tüm süreçlerini tek bir çatı altında toplayın. İK çözümleriyle güvenle yönetin.", tags: ["Bordro Yönetimi", "İzin Takibi"], photo: { url: tabEkip, text: "HR çözümleri", by: "DigitalHub" } },
  { common: "Sahayı Yönet", binomial: "Saha Satış Yönetimi", description: "Saha satış ekiplerinizin rotalarını optimize edin, ziyaret planlarını oluşturun ve mobil operasyonlarınızı anlık verilerle yönetin.", tags: ["Univera EnRoute"], photo: { url: tabSaha, text: "Saha yönetimi", by: "Univera" } },
  { common: "İş Akışını Takip Et", binomial: "Süreç Otomasyonu", description: "Sipariş girişinden teslimata kadar tüm süreci Univera Uni-Dox'un e-Dönüşüm ekosistemiyle yönetin. Paramtech Flows ile ekibinizin verimliliğini artırın.", tags: ["Uni-Dox", "Paramtech Flows"], photo: { url: tabAkis, text: "İş akışı", by: "Paramtech" } },
  { common: "Teşviklerden Yararlan", binomial: "Hibe & Destek", description: "İşletmenize en uygun hibe ve teşvik programlarını uzman danışmanlarımızla birlikte saptayın. Doğrudan ilgili kurumlarla bir araya getiriyoruz.", tags: ["KOSGEB", "TÜBİTAK", "Ticaret Bakanlığı"], photo: { url: tabTesvik, text: "Teşvikler", by: "KOSGEB / TÜBİTAK" } },
  { common: "Globale Açıl", binomial: "Uluslararası Ticaret", description: "Türkiye'nin en güçlü iş dünyası kuruluşlarının vizyonuyla ticaretinizi sınırların ötesine taşıyın. DigitalHub ile doğru pazara, doğru strateji ve tam dijital bir ekosistemle adım atın.", tags: ["TÜSİAD", "MÜSİAD", "TOBB"], photo: { url: tabGlobal, text: "Global ticaret", by: "DigitalHub" } },
];

const SolutionsGallerySection = () => (
  <div>
    <div className="flex flex-col items-center text-center pt-16 md:pt-24 pb-4 px-4" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h2
        className="text-3xl md:text-5xl lg:text-7xl font-extrabold"
        style={{ letterSpacing: "-0.04em", lineHeight: 1.05, color: "#1A0A4A" }}
      >
        Ticaretini Büyüt
        <br />
        <span className="text-gradient-primary">Maliyetlerini Düşür</span>
      </h2>
      <p className="mt-4 max-w-lg text-base md:text-lg" style={{ lineHeight: 1.7, color: "#64748B" }}>
        İşletmenize özel 50+ dijital çözümü tek platformda keşfedin.
      </p>
    </div>
    <div className="overflow-hidden" style={{ height: "580px" }}>
      <CircularGallery items={galleryItems} radius={480} autoRotateSpeed={0.02} />
    </div>
  </div>
);

export default SolutionsGallerySection;
