import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, Check, ShoppingCart, CreditCard, Globe,
  BarChart3, Package, Users, Building2, Star,
} from "lucide-react";

// ─── Partner data ─────────────────────────────────────────────────────────────
const partners = [
  {
    id: "tsoft", name: "T-SOFT", short: "TS", color: "#7D1F3E",
    category: "E-Ticaret Çözümü",
    description: "T-SOFT ile profesyonel e-ticaret sitenizi kurun. Ödeme, kargo, stok entegrasyonları hazır. Siparişlerinizi, ürünlerinizi, müşterilerinizi tek panelden yönetin. Mobil uyumlu, SEO optimize.",
    features: ["Hazır e-ticaret altyapısı", "Ödeme gateway entegrasyonu (Param, iyzico)", "Kargo entegrasyonu (Aras, Yurtiçi, MNG)", "Stok senkronizasyonu", "SEO ve performans optimize", "Mobil responsive tasarım"],
    sectors: [{ name: "E-ticaret", stars: 5, pct: 95 }, { name: "Perakende", stars: 4, pct: 80 }],
    badge: "Platform İndirimi Mevcut",
    size: 82,
  },
  {
    id: "qnb", name: "QNB", short: "QNB", color: "#0891B2",
    category: "Finansal Çözümler",
    description: "Kurumsal bankacılık, dijital ödeme altyapısı ve işletmelere özel finansal ürünler ile nakit akışınızı optimize edin. KOBİ'lere özel paketler ve ayrıcalıklı faiz oranları.",
    features: ["İşletme hesabı açılışı", "Dijital bankacılık paneli", "Kredi çözümleri", "Döviz işlemleri"],
    sectors: [{ name: "Finans", stars: 5, pct: 98 }, { name: "Ticaret", stars: 4, pct: 82 }],
    badge: "Özel Faiz Oranları",
    size: 74,
  },
  {
    id: "ikas", name: "ikas", short: "İKAS", color: "#3B82F6",
    category: "E-Ticaret Altyapısı",
    description: "Çok kanallı satış, otomatik stok yönetimi ve entegre pazaryeri çözümleriyle satışlarınızı büyütün. Trendyol, Hepsiburada, Amazon entegrasyonları dahil.",
    features: ["Çok kanallı satış yönetimi", "Pazaryeri entegrasyonu", "Otomatik stok takibi", "Analitik dashboard"],
    sectors: [{ name: "E-ticaret", stars: 5, pct: 97 }, { name: "Toptancı", stars: 4, pct: 75 }],
    badge: "İlk 3 Ay Ücretsiz",
    size: 70,
  },
  {
    id: "param", name: "Param", short: "P", color: "#FF6B35",
    category: "Ödeme Sistemleri",
    description: "Fiziksel POS, sanal POS, mobil ödeme — tüm ödeme altyapınızı tek çözümde. Güvenli, hızlı, entegre. Taksit kampanyaları ve sadakat programı desteğiyle satışlarınızı artırın.",
    features: ["Param POS (Fiziksel satış noktası)", "Param Kart (Online ödemeler)", "Param Mobil (Mobil ödeme)", "Taksit ve kampanya yönetimi"],
    sectors: [{ name: "Perakende", stars: 5, pct: 98 }, { name: "Restoran", stars: 5, pct: 95 }],
    badge: "Kurulum Ücretsiz",
    size: 84,
  },
  {
    id: "kredim", name: "Kredim", short: "K", color: "#F97316",
    category: "Finansman Çözümleri",
    description: "KOBİ'lere özel esnek kredi imkânları, hızlı onay süreci ve rekabetçi faiz oranlarıyla büyümenizi destekler. Başvurudan onaya 24 saatte tamamlayın.",
    features: ["Hızlı kredi onayı (24 saat)", "Esnek vade seçenekleri", "KOBİ'ye özel oranlar", "Online başvuru"],
    sectors: [{ name: "Üretim", stars: 5, pct: 90 }, { name: "Ticaret", stars: 4, pct: 85 }],
    badge: "%0 Komisyon",
    size: 68,
  },
  {
    id: "qf", name: "QF", short: "QF", color: "#7C3AED",
    category: "Dijital Finans",
    description: "Dijital finans yönetimi, otomatik muhasebe ve gerçek zamanlı nakit akışı takibi ile finansal kontrolü ele alın. Banka entegrasyonuyla anlık mutabakat.",
    features: ["Gerçek zamanlı nakit takibi", "Otomatik muhasebe", "Finansal raporlar", "Banka mutabakatı"],
    sectors: [{ name: "Finans", stars: 5, pct: 95 }, { name: "Hizmet", stars: 4, pct: 80 }],
    badge: "Ücretsiz Demo",
    size: 74,
  },
  {
    id: "azalt", name: "Azalt", short: "AZ", color: "#EF4444",
    category: "Maliyet Yönetimi",
    description: "Operasyonel giderlerinizi analiz edin, israfı önleyin ve işletme maliyetlerinizi akıllı önerilerle azaltın. Ortalama %23 maliyet tasarrufu sağlıyoruz.",
    features: ["Gider analizi & optimizasyon", "Tasarruf önerileri", "Bütçe planlama", "Maliyet raporları"],
    sectors: [{ name: "Üretim", stars: 5, pct: 92 }, { name: "Hizmet", stars: 4, pct: 78 }],
    badge: "Ortalama %23 Tasarruf",
    size: 70,
  },
  {
    id: "qes", name: "QeS", short: "QeS", color: "#6B21A8",
    category: "E-Fatura Sistemi",
    description: "GİB onaylı e-fatura, e-arşiv ve e-irsaliye çözümleriyle faturalaşma süreçlerinizi tamamen otomatikleştirin. Yasal uyumluluk garantisi.",
    features: ["E-fatura & e-arşiv", "GİB entegrasyonu", "Otomatik gönderim", "Yasal uyum garantisi"],
    sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 99 }, { name: "Üretim", stars: 5, pct: 95 }],
    badge: "Mevzuat Uyumlu",
    size: 66,
  },
  {
    id: "aras", name: "Aras", short: "AR", color: "#10B981",
    category: "Kargo & Lojistik",
    description: "Türkiye'nin en geniş kargo ağıyla gönderi takibi, toplu sevkiyat ve e-ticaret entegrasyonu tek panelde. Günlük, haftalık anlaşmalı tarifelerle tasarruf edin.",
    features: ["Gönderi takibi (anlık)", "Toplu sevkiyat yönetimi", "E-ticaret entegrasyonu", "İndirimli tarifeler"],
    sectors: [{ name: "E-ticaret", stars: 5, pct: 96 }, { name: "Perakende", stars: 4, pct: 82 }],
    badge: "İndirimli Kargo Tarifeleri",
    size: 76,
  },
  {
    id: "google", name: "Google", short: "G", color: "#4285F4",
    category: "Bulut & İşbirliği",
    description: "Google Workspace ile ekip iletişimini güçlendirin, belgelerinizi bulutta tutun ve verimliliğinizi artırın. Gmail, Drive, Meet, Docs hepsi birlikte.",
    features: ["Gmail & Google Drive", "Meet video konferans", "Docs, Sheets, Slides", "Kurumsal güvenlik"],
    sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 95 }, { name: "Hizmet", stars: 5, pct: 95 }],
    badge: "KOBİ'ye Özel Fiyat",
    size: 72,
  },
  {
    id: "univera", name: "Univera", short: "UV", color: "#2563EB",
    category: "ERP Yazılımı",
    description: "Üretim, satış, muhasebe ve İK modüllerini tek çatı altında toplayan entegre ERP çözümü. Stokbar stok yönetimi ve Finrota finansal takip ile güçlendirilmiş.",
    features: ["Üretim & stok takibi", "Muhasebe modülü", "İK ve bordro yönetimi", "Raporlama & analitik"],
    sectors: [{ name: "Üretim", stars: 5, pct: 93 }, { name: "Ticaret", stars: 4, pct: 80 }],
    badge: "Ücretsiz Kurulum",
    size: 70,
  },
  {
    id: "nebim", name: "Nebim", short: "NB", color: "#1E3A8A",
    category: "Perakende ERP",
    description: "İşletmenizi tek platformdan yönetin. Üretim, finans, stok, satış, İK — tüm modüller entegre. Nebim V3 (KOBİ) ve Nebim Era (Kurumsal) seçenekleri.",
    features: ["Entegre ERP modülleri", "Sektöre özel çözümler (Tekstil, Gıda, Perakende)", "Gerçek zamanlı raporlama", "Çoklu şube/depo yönetimi"],
    sectors: [{ name: "Üretim", stars: 5, pct: 97 }, { name: "Tekstil", stars: 5, pct: 97 }],
    badge: "Sektör Lideri",
    size: 68,
  },
  {
    id: "kariyer", name: "Kariyer.net", short: "KR", color: "#EA580C",
    category: "İK & İstihdam",
    description: "Türkiye'nin en büyük iş ilanı platformunda doğru yetenekleri işe alın, işveren markanızı güçlendirin. CV havuzuna anında erişim.",
    features: ["İş ilanı yayınlama", "CV havuzu erişimi", "İşveren markası yönetimi", "Aday takip sistemi"],
    sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 95 }, { name: "Hizmet", stars: 5, pct: 92 }],
    badge: "Öncelikli İlan Görünürlüğü",
    size: 74,
  },
  {
    id: "mukellef", name: "Mükellef", short: "MK", color: "#1E40AF",
    category: "Muhasebe & Vergi",
    description: "Bulut tabanlı muhasebe, otomatik vergi hesaplama ve e-beyanname ile vergi süreçlerinizi kolaylaştırın. Mali müşavirlik desteği dahil.",
    features: ["Bulut muhasebe sistemi", "Otomatik vergi hesaplama", "E-beyanname gönderimi", "Mali müşavirlik desteği"],
    sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 99 }, { name: "Hizmet", stars: 5, pct: 97 }],
    badge: "Mali Müşavirlik Desteği",
    size: 70,
  },
  {
    id: "ticimax", name: "Ticimax", short: "TC", color: "#0EA5E9",
    category: "E-Ticaret Çözümleri",
    description: "Hazır e-ticaret altyapısı, mobil uygulama ve çok kanallı satış araçlarıyla online mağazanızı büyütün. SEO araçları ve pazaryeri entegrasyonları dahil.",
    features: ["Mobil uygulama dahil", "SEO optimizasyon araçları", "Çok kanallı satış yönetimi", "30 gün ücretsiz deneme"],
    sectors: [{ name: "E-ticaret", stars: 5, pct: 94 }, { name: "Perakende", stars: 4, pct: 80 }],
    badge: "30 Gün Ücretsiz",
    size: 68,
  },
  {
    id: "kolaybi", name: "KolayBi", short: "KB", color: "#14B8A6",
    category: "Ön Muhasebe",
    description: "Fatura, gider, stok ve kasa yönetimini tek uygulamadan kolayca takip edin. Teknik bilgi gerekmez, dakikalar içinde başlayın.",
    features: ["Fatura yönetimi", "Gider takibi & raporlama", "Stok sayımı & yönetimi", "Kasa takibi"],
    sectors: [{ name: "Küçük İşletme", stars: 5, pct: 98 }, { name: "Hizmet", stars: 5, pct: 94 }],
    badge: "Başlangıç Ücretsiz",
    size: 66,
  },
  {
    id: "webplus", name: "Web Plus", short: "WP", color: "#9333EA",
    category: "Web Çözümleri",
    description: "Kurumsal web sitesi, dijital pazarlama ve SEO hizmetleriyle online varlığınızı profesyonel bir seviyeye taşıyın. Google Analytics entegrasyonu dahil.",
    features: ["Kurumsal web sitesi tasarımı", "Dijital pazarlama", "SEO & Analytics", "Ücretsiz domain"],
    sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 90 }, { name: "Hizmet", stars: 5, pct: 92 }],
    badge: "Ücretsiz Domain",
    size: 70,
  },
  {
    id: "stokbar", name: "Stokbar", short: "SB", color: "#059669",
    category: "Stok Yönetimi",
    description: "Barkodlu stok takibi, min-max uyarıları ve tedarikçi yönetimiyle depo süreçlerinizi dijitalleştirin. Mobil uygulama ile her yerden kontrol.",
    features: ["Barkodlu stok takibi", "Min-max uyarı sistemi", "Tedarikçi yönetimi", "Mobil uygulama dahil"],
    sectors: [{ name: "Perakende", stars: 5, pct: 95 }, { name: "Üretim", stars: 4, pct: 82 }],
    badge: "Mobil Uygulama Dahil",
    size: 68,
  },
  {
    id: "finrota", name: "Finrota", short: "FR", color: "#D946EF",
    category: "Finansal Yönetim",
    description: "Nakit akışı, çek/senet takibi ve banka mutabakasını otomatikleştiren akıllı finansal yönetim platformu. Otomatik raporlarla anında içgörü.",
    features: ["Nakit akışı takibi", "Çek/senet yönetimi", "Banka mutabakatı", "Otomatik finansal raporlar"],
    sectors: [{ name: "Finans", stars: 5, pct: 94 }, { name: "Üretim", stars: 4, pct: 80 }],
    badge: "Otomatik Raporlar",
    size: 72,
  },
  {
    id: "unidox", name: "UniDOX", short: "UD", color: "#0F766E",
    category: "Dijital Arşiv",
    description: "Kurumsal belge yönetimi, dijital arşiv ve iş akışı otomasyonuyla evrak süreçlerinizi sıfır kağıtla yönetin. KVKK uyumlu altyapı.",
    features: ["Belge yönetimi sistemi", "Dijital arşiv çözümleri", "İş akışı otomasyonu", "KVKK uyumlu"],
    sectors: [{ name: "Kamu & Kurumsal", stars: 5, pct: 96 }, { name: "Hizmet", stars: 4, pct: 82 }],
    badge: "KVKK Uyumlu",
    size: 66,
  },
  {
    id: "varuna", name: "Varuna", short: "VR", color: "#DC2626",
    category: "Lojistik Yazılımı",
    description: "Filo yönetimi, rota optimizasyonu ve teslimat takibiyle lojistik operasyonlarınızı verimli hale getirin. Yakıt ve zaman tasarrufu sağlayın.",
    features: ["Filo yönetimi sistemi", "Rota optimizasyonu", "Gerçek zamanlı teslimat takibi", "Yakıt tasarruf raporu"],
    sectors: [{ name: "Lojistik", stars: 5, pct: 97 }, { name: "E-ticaret", stars: 4, pct: 78 }],
    badge: "Yakıt Tasarrufu",
    size: 68,
  },
  {
    id: "enroute", name: "Enroute", short: "EN", color: "#7C3AED",
    category: "Dağıtım Optimizasyonu",
    description: "Akıllı dağıtım planlaması ve gerçek zamanlı görev yönetimiyle saha ekiplerinizin verimliliğini maksimize edin. %40 daha verimli operasyon.",
    features: ["Akıllı dağıtım planlaması", "Saha ekip yönetimi", "Gerçek zamanlı takip", "Performans analitiği"],
    sectors: [{ name: "Lojistik", stars: 5, pct: 95 }, { name: "Hizmet", stars: 4, pct: 80 }],
    badge: "%40 Daha Verimli",
    size: 66,
  },
];

// ─── Default categories ───────────────────────────────────────────────────────
const defaultCategories = [
  { icon: ShoppingCart, label: "E-ticaret" },
  { icon: CreditCard,   label: "Ödeme" },
  { icon: BarChart3,    label: "Muhasebe" },
  { icon: Package,      label: "Stok" },
  { icon: Globe,        label: "Global" },
  { icon: Building2,    label: "Finansman" },
  { icon: Users,        label: "İK" },
  { icon: Building2,    label: "ERP" },
];

// ─── Organic puzzle positions inside a 700×680 box ───────────────────────────
// Deliberately asymmetric — clusters in some areas, gaps in others
const logoPositions = [
  { x: 18,  y: 44  }, // T-SOFT
  { x: 116, y: 8   }, // QNB
  { x: 226, y: 30  }, // ikas
  { x: 338, y: 4   }, // Param
  { x: 450, y: 34  }, // Kredim
  { x: 552, y: 12  }, // QF
  { x: 600, y: 116 }, // Azalt
  { x: 614, y: 228 }, // QeS
  { x: 598, y: 338 }, // Aras
  { x: 560, y: 444 }, // Google
  { x: 486, y: 540 }, // Univera
  { x: 370, y: 590 }, // Nebim
  { x: 250, y: 612 }, // Kariyer.net
  { x: 134, y: 582 }, // Mükellef
  { x: 34,  y: 536 }, // Ticimax
  { x: 4,   y: 428 }, // KolayBi
  { x: 12,  y: 316 }, // Web Plus
  { x: 28,  y: 202 }, // Stokbar
  { x: 108, y: 118 }, // Finrota
  { x: 490, y: 138 }, // UniDOX
  { x: 504, y: 466 }, // Varuna
  { x: 136, y: 478 }, // Enroute
];

// ─── Float animation per logo ─────────────────────────────────────────────────
const floatData = partners.map((_, i) => ({
  yAmt:     3 + (i % 5) * 1.2,
  duration: 4.0 + (i % 6) * 0.5,
  delay:    (i * 0.41) % 2.5,
}));

// ─── Star rating helper ───────────────────────────────────────────────────────
const StarRow = ({ name, stars, pct }: { name: string; stars: number; pct: number }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs text-muted-foreground w-28 truncate font-medium">{name}</span>
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-3 h-3"
          fill={i < stars ? "#FBBF24" : "none"}
          stroke={i < stars ? "#FBBF24" : "#D1D5DB"}
          strokeWidth={1.5}
        />
      ))}
    </div>
    <span className="text-xs font-bold text-muted-foreground">%{pct}</span>
  </div>
);

// ─── Default right panel ──────────────────────────────────────────────────────
const DefaultPanel = () => (
  <div className="flex flex-col h-full justify-center">
    <span
      className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
      style={{ background: "hsl(268,72%,92%)", color: "hsl(268,72%,38%)" }}
    >
      DİJİTAL EKOSİSTEM
    </span>

    <h3
      className="font-black text-foreground mb-3"
      style={{ fontSize: "clamp(1.9rem,3vw,2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
    >
      50+ Çözüm Ortağımız
    </h3>

    <p className="text-muted-foreground mb-8" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
      Sol taraftaki partnerlerimizden birini seçin, size nasıl değer kattıklarını keşfedin.
    </p>

    <div className="grid grid-cols-2 gap-3 mb-8">
      {defaultCategories.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
          style={{ background: "hsl(268,72%,97%)", border: "1px solid hsl(268,72%,90%)" }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(268,72%,92%)" }}
          >
            <Icon className="w-3.5 h-3.5" style={{ color: "hsl(268,72%,40%)" }} />
          </div>
          <span className="text-sm font-semibold text-foreground">{label}</span>
        </div>
      ))}
    </div>

    <div className="flex items-center gap-2 text-muted-foreground text-sm">
      <span className="text-base">←</span>
      <span>Bir partner logosuna tıklayın</span>
    </div>
  </div>
);

// ─── Partner right panel ──────────────────────────────────────────────────────
const PartnerPanel = ({
  partner,
  onDeselect,
}: {
  partner: typeof partners[0];
  onDeselect: () => void;
}) => (
  <div className="flex flex-col h-full justify-center">
    {/* Category badge */}
    <span
      className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
      style={{ background: `${partner.color}22`, color: partner.color }}
    >
      {partner.category.toUpperCase()}
    </span>

    {/* Partner logo + name row */}
    <div className="flex items-center gap-4 mb-4">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: partner.color, boxShadow: `0 8px 28px -6px ${partner.color}66` }}
      >
        <span
          className="font-black text-white"
          style={{
            fontSize: partner.short.length > 3 ? "11px" : partner.short.length > 2 ? "14px" : partner.short.length > 1 ? "17px" : "24px",
            letterSpacing: "-0.02em",
          }}
        >
          {partner.short}
        </span>
      </div>
      <div>
        <h3
          className="font-black text-foreground"
          style={{ fontSize: "clamp(1.8rem,2.8vw,2.4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
        >
          {partner.name}
        </h3>
        <p className="text-muted-foreground font-medium text-sm mt-0.5">{partner.category}</p>
      </div>
    </div>

    {/* Description */}
    <p
      className="text-foreground mb-5"
      style={{ fontSize: "0.975rem", lineHeight: 1.72, borderLeft: `3px solid ${partner.color}`, paddingLeft: "14px" }}
    >
      {partner.description}
    </p>

    {/* Features */}
    <div className="grid grid-cols-1 gap-1.5 mb-5">
      {partner.features.map((f) => (
        <div key={f} className="flex items-start gap-2.5">
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: `${partner.color}20` }}
          >
            <Check className="w-2.5 h-2.5" style={{ color: partner.color }} strokeWidth={3} />
          </div>
          <span className="text-sm text-foreground font-medium">{f}</span>
        </div>
      ))}
    </div>

    {/* Sector affinity */}
    {partner.sectors.length > 0 && (
      <div
        className="rounded-xl p-4 mb-5"
        style={{ background: "hsl(250,30%,98%)", border: "1px solid hsl(252,20%,90%)" }}
      >
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2.5">
          En Uygun Sektörler
        </p>
        <div className="flex flex-col gap-1.5">
          {partner.sectors.map((s) => (
            <StarRow key={s.name} {...s} />
          ))}
        </div>
      </div>
    )}

    {/* Discount badge + CTA */}
    <div className="flex items-center gap-3 flex-wrap">
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
        style={{ background: "#DCFCE7", color: "#15803D" }}>
        <Check className="w-3 h-3" strokeWidth={3} />
        {partner.badge}
      </span>
    </div>

    <Link to="/kobi/urunler" className="mt-4 inline-block">
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: `0 12px 32px -8px ${partner.color}77` }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm w-full justify-center"
        style={{ background: partner.color, boxShadow: `0 4px 18px -6px ${partner.color}55` }}
      >
        {partner.name} Çözümünü İncele <ArrowRight className="w-4 h-4" />
      </motion.button>
    </Link>

    <button
      onClick={onDeselect}
      className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
    >
      ← Başka partner seç
    </button>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const PartnerEcosystemSection = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered]   = useState<number | null>(null);
  const [visible, setVisible]   = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.08 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-deselect after 10s inactivity
  useEffect(() => {
    if (selected !== null) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setSelected(null), 10000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [selected]);

  useEffect(() => {
    if (inView) setTimeout(() => setVisible(true), 120);
  }, [inView]);

  const handleClick = (idx: number) => {
    setSelected((prev) => (prev === idx ? null : idx));
  };

  const BOX_W = 700;
  const BOX_H = 680;

  const selectedPartner = selected !== null ? partners[selected] : null;
  const isAnySelected = selected !== null;

  return (
    <section
      id="partner-ecosystem"
      className="py-20 md:py-32 overflow-hidden"
      style={{ background: "#F8F9FF" }}
    >
      <div className="max-w-[1380px] mx-auto px-6">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase border border-primary/15">
            Çözüm Ortakları
          </span>
        </motion.div>

        {/* Two-column: puzzle LEFT | content RIGHT */}
        <div className="flex flex-col lg:flex-row items-start gap-12 xl:gap-20">

          {/* ──────────────────── LEFT: Puzzle grid ──────────────────── */}
          <div
            ref={sectionRef}
            className="w-full lg:w-[54%] flex-shrink-0 flex items-center justify-center"
          >
            <div
              className="relative mx-auto"
              style={{ width: `${BOX_W}px`, height: `${BOX_H}px`, maxWidth: "100%" }}
            >
              {partners.map((partner, i) => {
                const pos = logoPositions[i];
                if (!pos) return null;

                const sz  = partner.size;
                const fp  = floatData[i];
                const isSel = selected === i;
                const opacityVal = isAnySelected ? (isSel ? 1 : 0.45) : 1;

                return (
                  <motion.div
                    key={partner.name}
                    className="absolute"
                    style={{
                      left:   `${pos.x}px`,
                      top:    `${pos.y}px`,
                      width:  `${sz}px`,
                      height: `${sz}px`,
                      zIndex: isSel ? 30 : hovered === i ? 25 : 10,
                      cursor: "pointer",
                    }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={
                      visible
                        ? { opacity: opacityVal, scale: isSel ? 1.06 : 1 }
                        : { opacity: 0, scale: 0.6 }
                    }
                    transition={{
                      opacity: { duration: 0.22 },
                      scale:   { duration: 0.45, delay: 0.18 + i * 0.04, ease: [0.22, 1, 0.36, 1] },
                    }}
                    onClick={() => handleClick(i)}
                    onHoverStart={() => setHovered(i)}
                    onHoverEnd={() => setHovered(null)}
                  >
                    {/* Float wrapper */}
                    <motion.div
                      animate={{ y: [0, -fp.yAmt, 0] }}
                      transition={{ duration: fp.duration, delay: fp.delay, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full h-full relative"
                    >
                      {/* Logo square */}
                      <motion.div
                        className="w-full h-full flex items-center justify-center select-none"
                        style={{
                          background:    partner.color,
                          borderRadius:  "16px",
                          boxShadow:     isSel
                            ? `0 0 0 3px white, 0 0 0 5.5px ${partner.color}, 0 10px 32px -6px ${partner.color}99`
                            : `0 3px 12px -3px ${partner.color}60, 0 1px 4px rgba(0,0,0,0.09)`,
                          border:        `2px solid ${isSel ? partner.color : "rgba(255,255,255,0.8)"}`,
                          transition:    "box-shadow 0.22s, border 0.22s",
                        }}
                        whileHover={{
                          scale:      1.12,
                          y:          -4,
                          boxShadow:  `0 0 0 2.5px white, 0 0 0 4.5px ${partner.color}, 0 12px 30px -6px ${partner.color}80`,
                          transition: { type: "spring", stiffness: 380, damping: 22 },
                        }}
                        whileTap={{ scale: 0.93 }}
                      >
                        <span
                          className="font-black text-white select-none"
                          style={{
                            fontSize:
                              partner.short.length > 3 ? "8px" :
                              partner.short.length > 2 ? "10px" :
                              partner.short.length > 1 ? "13px" : "18px",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {partner.short}
                        </span>
                      </motion.div>

                      {/* Tooltip */}
                      <AnimatePresence>
                        {hovered === i && (
                          <motion.div
                            initial={{ opacity: 0, y: 4, scale: 0.88 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.88 }}
                            transition={{ duration: 0.16 }}
                            className="absolute pointer-events-none"
                            style={{
                              bottom:      "calc(100% + 9px)",
                              left:        "50%",
                              transform:   "translateX(-50%)",
                              whiteSpace:  "nowrap",
                              background:  "white",
                              borderRadius:"10px",
                              padding:     "5px 12px",
                              boxShadow:   "0 4px 18px -4px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)",
                              zIndex:      50,
                            }}
                          >
                            <p className="text-xs font-bold text-foreground">{partner.name}</p>
                            <p className="text-[10px] text-muted-foreground">{partner.category}</p>
                            <div
                              className="absolute left-1/2 -translate-x-1/2"
                              style={{
                                bottom:      "-5px",
                                borderLeft:  "5px solid transparent",
                                borderRight: "5px solid transparent",
                                borderTop:   "5px solid white",
                              }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ──────────────────── RIGHT: Dynamic content ──────────────────── */}
          <div className="w-full lg:w-[46%] lg:sticky lg:top-24">
            <div
              className="rounded-3xl p-10"
              style={{
                background:  "white",
                boxShadow:   "0 4px 40px -8px rgba(109,40,217,0.10), 0 1px 4px rgba(0,0,0,0.04)",
                border:      "1px solid hsl(252,20%,92%)",
                minHeight:   "560px",
              }}
            >
              <AnimatePresence mode="wait">
                {selectedPartner ? (
                  <motion.div
                    key={selectedPartner.id}
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1,    y: 0  }}
                    exit={{    opacity: 0, scale: 0.96, y: -10 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="h-full"
                  >
                    <PartnerPanel partner={selectedPartner} onDeselect={() => setSelected(null)} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1,    y: 0  }}
                    exit={{    opacity: 0, scale: 0.96, y: -10 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="h-full"
                  >
                    <DefaultPanel />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auto-reset hint */}
            <AnimatePresence>
              {selected !== null && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{    opacity: 0, y: 5 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 text-xs text-muted-foreground font-medium flex items-center gap-1.5 px-1"
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: partners[selected].color }}
                  />
                  <strong style={{ color: partners[selected].color }}>{partners[selected].name}</strong>
                  seçildi &mdash; 10 saniye sonra sıfırlanır.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Bottom left: Heading + stats + CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 lg:mt-20 text-center"
        >
          <h2
            className="font-black text-foreground mb-4 mx-auto"
            style={{ fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.1, letterSpacing: "-0.035em", maxWidth: "720px" }}
          >
            Dijital Dönüşüm Ekosistemi:{" "}
            <span className="text-gradient-primary">Tek Platformda</span>{" "}
            Tüm Çözümler
          </h2>

          <p
            className="text-muted-foreground mb-9 mx-auto"
            style={{ fontSize: "clamp(0.95rem,1.4vw,1.1rem)", lineHeight: 1.78, maxWidth: "560px" }}
          >
            E-ticaretten ödeme sistemlerine, muhasebeden global açılıma, stok yönetiminden
            finansmana — işletmenizin tüm dijital ihtiyaçlarını karşılayan{" "}
            <strong className="text-foreground font-semibold">50+ çözüm ortağıyla</strong>{" "}
            çalışıyoruz. Hepsi tek platformda, size özel!
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-10 md:gap-16 mb-10">
            {[
              { value: "50+", label: "Çözüm Ortağı" },
              { value: "21",  label: "Param Ürünü"  },
              { value: "10",  label: "Kategori"     },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.1 }}
                className="flex flex-col items-center"
              >
                <span
                  className="font-black text-primary"
                  style={{ fontSize: "clamp(1.6rem,2.4vw,2rem)", lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  {s.value}
                </span>
                <span className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <Link to="/kobi/signup">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 12px 40px -6px rgba(109,40,217,0.52)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white font-bold text-sm"
              style={{
                background:  "linear-gradient(135deg, hsl(268,72%,38%), hsl(268,72%,52%))",
                boxShadow:   "0 6px 24px -4px rgba(109,40,217,0.38)",
              }}
            >
              Çözüm Ortaklarını Keşfet <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default PartnerEcosystemSection;
