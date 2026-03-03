import LandingNav from "@/components/landing/LandingNav";
import PartnerCarouselSection from "@/components/landing/PartnerCarouselSection";
import HeroSection from "@/components/landing/HeroSection";

import FeaturesSection from "@/components/landing/FeaturesSection";
import PartnersSection from "@/components/landing/PartnersSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CtaSection from "@/components/landing/CtaSection";
import FooterSection from "@/components/landing/FooterSection";
import PromotionsSection from "@/components/landing/PromotionsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

import PartnerEcosystemSection from "@/components/landing/PartnerEcosystemSection";

import JourneyLoopSection2 from "@/components/landing/JourneyLoopSection2";

import TicaretiniBuyutCember from "@/components/landing/TicaretiniBuyutCember";
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
  { common: "E-Ticarete Açıl", binomial: "Online Satış Altyapısı", description: "Online satışın gücüyle dükkanınızın sınırlarını aşın ve satışlarınızı artırın. Türkiye'nin önde gelen e-ticaret altyapı sağlayıcıları T-Soft, Ticimax ve İkas'ın sunduğu en uygun paketleri keşfedin.", tags: ["Ticimax", "İkas", "T-Soft"], photo: { url: tabEticaret, text: "E-ticaret çözümleri", by: "Ticimax / İkas / T-Soft" } },
  { common: "Paranı Yönet", binomial: "Nakit Akış Yönetimi", description: "Finrota'nın sunduğu Netahsilat, Netekstre, Nap360 ve Posrapor çözümleriyle nakit akışınızı düzenleyin, tüm para trafiğinizi güvenle yönetin. Kredim Business ile işletmenize uygun finansman imkanlarına ulaşın.", tags: ["Netahsilat", "Netekstre", "Nap360", "Posrapor", "Kredim Business"], photo: { url: tabPara, text: "Para yönetimi", by: "Finrota" } },
  { common: "Stoğunu Kontrol Et", binomial: "Depo & Stok Yönetimi", description: "Univera Stokbar ve Nebim V3 çözümleriyle depo yönetiminizi modernleştirin, ürün giriş çıkışlarını anlık verilerle izleyin. Akıllı stok planlama yöntemleriyle depo seviyelerinizi en ideal noktada tutun.", tags: ["Univera Stokbar", "Nebim V3"], photo: { url: tabStok, text: "Stok yönetimi", by: "Univera / Nebim" } },
  { common: "Ürünlerini Gönder", binomial: "Lojistik & Kargo", description: "Aras Kargo'nun geniş lojistik ağıyla ürünlerinizi Türkiye'nin her yerine hızlıca ulaştırın. E-ticaret entegrasyonu ile siparişlerinizi anında kargoya hazırlayın.", tags: ["Aras Kargo"], photo: { url: tabKargo, text: "Kargo çözümleri", by: "Aras Kargo" } },
  { common: "Ekibine Yön Ver", binomial: "İnsan Kaynakları", description: "Çalışanlarınızın işe başladığı günden emekli olacağı güne kadar tüm süreçlerini tek bir çatı altında toplayın. Workcube HR ile güvenle yönetin.", tags: ["Workcube HR"], photo: { url: tabEkip, text: "HR çözümleri", by: "Workcube" } },
  { common: "Sahayı Yönet", binomial: "Saha Satış Yönetimi", description: "Saha satış ekiplerinizin rotalarını optimize edin, ziyaret planlarını oluşturun ve mobil operasyonlarınızı anlık verilerle yönetin.", tags: ["Univera EnRoute"], photo: { url: tabSaha, text: "Saha yönetimi", by: "Univera" } },
  { common: "İş Akışını Takip Et", binomial: "Süreç Otomasyonu", description: "Sipariş girişinden teslimata kadar tüm süreci Univera Uni-Dox'un e-Dönüşüm ekosistemiyle yönetin. Paramtech Flows ile ekibinizin verimliliğini artırın.", tags: ["Uni-Dox", "Paramtech Flows"], photo: { url: tabAkis, text: "İş akışı", by: "Paramtech" } },
  { common: "Teşviklerden Yararlan", binomial: "Hibe & Destek", description: "İşletmenize en uygun hibe ve teşvik programlarını uzman danışmanlarımızla birlikte saptayın. Doğrudan ilgili kurumlarla bir araya getiriyoruz.", tags: ["KOSGEB", "TÜBİTAK", "Ticaret Bakanlığı"], photo: { url: tabTesvik, text: "Teşvikler", by: "KOSGEB / TÜBİTAK" } },
  { common: "Globale Açıl", binomial: "Uluslararası Ticaret", description: "Türkiye'nin en güçlü iş dünyası kuruluşlarının vizyonuyla ticaretinizi sınırların ötesine taşıyın. KobiTech ile doğru pazara, doğru strateji ve tam dijital bir ekosistemle adım atın.", tags: ["TÜSİAD", "MÜSİAD", "TOBB", "Ticimax", "Mükellef"], photo: { url: tabGlobal, text: "Global ticaret", by: "KobiTech" } },
];

/* Shared section divider — horizontal gradient line */
const SectionDivider = () => (
  <div className="flex justify-center">
    <div
      style={{
        width: "80%",
        height: "2px",
        background: "linear-gradient(90deg, transparent 0%, rgba(109,40,217,0.18) 30%, rgba(109,40,217,0.18) 70%, transparent 100%)",
      }}
    />
  </div>
);

const Landing = () => (
  <div className="min-h-screen bg-background">
    {/* 1 — HERO */}
    <div
      className="relative"
      style={{
        background: "linear-gradient(145deg, hsl(38,60%,98%) 0%, hsl(265,50%,96%) 55%, hsl(38,50%,97%) 100%)",
      }}
    >
      <div className="relative z-10">
        <LandingNav />
        <HeroSection />
      </div>
    </div>

    {/* CIRCULAR GALLERY — top of Ticaretini Büyüt */}
    <div style={{ background: "linear-gradient(180deg, hsl(265,35%,96%) 0%, hsl(38,50%,97%) 100%)" }}>
      <div className="overflow-hidden" style={{ height: "600px" }}>
        <CircularGallery items={galleryItems} radius={350} autoRotateSpeed={0.15} />
      </div>
    </div>

    {/* TICARETINI BÜYÜT ÇEMBER */}
    <TicaretiniBuyutCember />

    {/* PARTNER CAROUSEL */}
    <div style={{ background: "linear-gradient(180deg, hsl(265,35%,96%) 0%, hsl(38,50%,97%) 100%)", marginTop: "-120px", position: "relative", zIndex: 10 }}>
      <PartnerCarouselSection />
    </div>


    <SectionDivider />

    {/* 4 — HOW IT WORKS */}
    <div style={{ background: "hsl(258, 45%, 10%)" }}>
      <HowItWorksSection />
    </div>


    {/* 5b — PROMOTIONS */}
    <div style={{ background: "linear-gradient(180deg, hsl(38,60%,98%) 0%, hsl(252,25%,97%) 100%)" }}>
      <PromotionsSection />
    </div>

    {/* 5 — FEATURES */}
    <div style={{ background: "linear-gradient(180deg, hsl(252,25%,97%) 0%, hsl(38,50%,97%) 100%)" }}>
      <FeaturesSection />
    </div>
    {/* 6 — CTA */}
    <div style={{ background: "linear-gradient(160deg, hsl(265,40%,96%) 0%, hsl(38,55%,97%) 100%)" }}>
      <CtaSection />
    </div>

    {/* 7 — TESTIMONIALS */}
    <div style={{ background: "linear-gradient(180deg, hsl(38,60%,98%) 0%, hsl(252,20%,97%) 100%)" }}>
      <TestimonialsSection />
    </div>

    {/* PARTNER LOOP */}
    <div style={{ background: "linear-gradient(180deg, hsl(265,35%,96%) 0%, hsl(38,50%,97%) 100%)" }}>
      <JourneyLoopSection2 />
    </div>

    {/* PARTNER ECOSYSTEM */}
    <div style={{ background: "linear-gradient(180deg, hsl(38,30%,97%) 0%, hsl(252,30%,97%) 100%)" }}>
      <PartnerEcosystemSection />
    </div>

    {/* PARTNERS / SOLUTIONS */}
    <div style={{ background: "linear-gradient(160deg, hsl(38,55%,97%) 0%, hsl(265,40%,96%) 100%)" }}>
      <PartnersSection />
    </div>


    <FooterSection />
  </div>
);

export default Landing;
