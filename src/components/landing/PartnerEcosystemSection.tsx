import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, Check, ShoppingCart, CreditCard, Globe,
  BarChart3, Package, Users, Building2, Star,
} from "lucide-react";

// ─── Partner data ──────────────────────────────────────────────────────────────
const partners = [
  {
    id: "tsoft", name: "T-SOFT", short: "TS", color: "#7D1F3E",
    category: "E-Ticaret Çözümü",
    description: "T-SOFT ile profesyonel e-ticaret sitenizi kurun. Ödeme, kargo, stok entegrasyonları hazır. Siparişlerinizi, ürünlerinizi, müşterilerinizi tek panelden yönetin.",
    features: ["Hazır e-ticaret altyapısı", "Ödeme gateway entegrasyonu (Param, iyzico)", "Kargo entegrasyonu (Aras, Yurtiçi)", "Stok senkronizasyonu", "SEO & performans optimize"],
    sectors: [{ name: "E-ticaret", stars: 5, pct: 95 }, { name: "Perakende", stars: 4, pct: 80 }],
    badge: "Platform İndirimi Mevcut",
    // grid span: col × row
    cs: 2, rs: 2,
    // per-corner border-radius: tl tr br bl
    rad: "18px 6px 20px 8px",
  },
  {
    id: "qnb", name: "QNB", short: "QNB", color: "#0891B2",
    category: "Finansal Çözümler",
    description: "Kurumsal bankacılık, dijital ödeme altyapısı ve işletmelere özel finansal ürünler ile nakit akışınızı optimize edin. KOBİ paketleri ve ayrıcalıklı faiz oranları.",
    features: ["İşletme hesabı açılışı", "Dijital bankacılık paneli", "Kredi çözümleri", "Döviz işlemleri"],
    sectors: [{ name: "Finans", stars: 5, pct: 98 }, { name: "Ticaret", stars: 4, pct: 82 }],
    badge: "Özel Faiz Oranları",
    cs: 1, rs: 1, rad: "8px 20px 8px 18px",
  },
  {
    id: "ikas", name: "ikas", short: "İKAS", color: "#3B82F6",
    category: "E-Ticaret Altyapısı",
    description: "Çok kanallı satış, otomatik stok yönetimi ve entegre pazaryeri çözümleriyle satışlarınızı büyütün. Trendyol, Hepsiburada, Amazon entegrasyonları dahil.",
    features: ["Çok kanallı satış yönetimi", "Pazaryeri entegrasyonu", "Otomatik stok takibi", "Analitik dashboard"],
    sectors: [{ name: "E-ticaret", stars: 5, pct: 97 }, { name: "Toptancı", stars: 4, pct: 75 }],
    badge: "İlk 3 Ay Ücretsiz",
    cs: 2, rs: 1, rad: "6px 14px 20px 10px",
  },
  {
    id: "param", name: "Param", short: "P", color: "#FF6B35",
    category: "Ödeme Sistemleri",
    description: "Fiziksel POS, sanal POS, mobil ödeme — tüm ödeme altyapınızı tek çözümde. Güvenli, hızlı, entegre. Taksit kampanyaları ve sadakat programı desteğiyle satışlarınızı artırın.",
    features: ["Param POS (Fiziksel satış noktası)", "Param Kart (Online ödemeler)", "Param Mobil (QR ödeme)", "Taksit ve kampanya yönetimi", "Ödeme raporlama"],
    sectors: [{ name: "Perakende", stars: 5, pct: 98 }, { name: "Restoran", stars: 5, pct: 95 }],
    badge: "Kurulum Ücretsiz",
    cs: 1, rs: 2, rad: "20px 8px 6px 16px",
  },
  {
    id: "kredim", name: "Kredim", short: "K", color: "#F97316",
    category: "Finansman Çözümleri",
    description: "KOBİ'lere özel esnek kredi imkânları, hızlı onay süreci ve rekabetçi faiz oranlarıyla büyümenizi destekler. Başvurudan onaya 24 saatte tamamlayın.",
    features: ["Hızlı kredi onayı (24 saat)", "Esnek vade seçenekleri", "KOBİ'ye özel oranlar", "Online başvuru"],
    sectors: [{ name: "Üretim", stars: 5, pct: 90 }, { name: "Ticaret", stars: 4, pct: 85 }],
    badge: "%0 Komisyon",
    cs: 1, rs: 1, rad: "14px 6px 18px 10px",
  },
  {
    id: "qf", name: "QF", short: "QF", color: "#7C3AED",
    category: "Dijital Finans",
    description: "Dijital finans yönetimi, otomatik muhasebe ve gerçek zamanlı nakit akışı takibi ile finansal kontrolü ele alın. Banka entegrasyonuyla anlık mutabakat.",
    features: ["Gerçek zamanlı nakit takibi", "Otomatik muhasebe", "Finansal raporlar", "Banka mutabakatı"],
    sectors: [{ name: "Finans", stars: 5, pct: 95 }, { name: "Hizmet", stars: 4, pct: 80 }],
    badge: "Ücretsiz Demo",
    cs: 1, rs: 1, rad: "10px 18px 8px 20px",
  },
  {
    id: "azalt", name: "Azalt", short: "AZ", color: "#EF4444",
    category: "Maliyet Yönetimi",
    description: "Operasyonel giderlerinizi analiz edin, israfı önleyin ve işletme maliyetlerinizi akıllı önerilerle azaltın. Ortalama %23 maliyet tasarrufu sağlıyoruz.",
    features: ["Gider analizi & optimizasyon", "Tasarruf önerileri", "Bütçe planlama", "Maliyet raporları"],
    sectors: [{ name: "Üretim", stars: 5, pct: 92 }, { name: "Hizmet", stars: 4, pct: 78 }],
    badge: "Ortalama %23 Tasarruf",
    cs: 2, rs: 1, rad: "8px 16px 6px 18px",
  },
  {
    id: "qes", name: "QeS", short: "QeS", color: "#6B21A8",
    category: "E-Fatura Sistemi",
    description: "GİB onaylı e-fatura, e-arşiv ve e-irsaliye çözümleriyle faturalaşma süreçlerinizi tamamen otomatikleştirin. Yasal uyumluluk garantisi.",
    features: ["E-fatura & e-arşiv", "GİB entegrasyonu", "Otomatik gönderim", "Yasal uyum garantisi"],
    sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 99 }, { name: "Üretim", stars: 5, pct: 95 }],
    badge: "Mevzuat Uyumlu",
    cs: 1, rs: 1, rad: "18px 10px 16px 6px",
  },
  {
    id: "aras", name: "Aras", short: "AR", color: "#10B981",
    category: "Kargo & Lojistik",
    description: "Türkiye'nin en geniş kargo ağıyla gönderi takibi, toplu sevkiyat ve e-ticaret entegrasyonu tek panelde. Günlük, haftalık anlaşmalı tarifelerle tasarruf edin.",
    features: ["Gönderi takibi (anlık)", "Toplu sevkiyat yönetimi", "E-ticaret entegrasyonu", "İndirimli tarifeler"],
    sectors: [{ name: "E-ticaret", stars: 5, pct: 96 }, { name: "Perakende", stars: 4, pct: 82 }],
    badge: "İndirimli Kargo Tarifeleri",
    cs: 1, rs: 2, rad: "6px 20px 10px 16px",
  },
  {
    id: "google", name: "Google", short: "G", color: "#4285F4",
    category: "Bulut & İşbirliği",
    description: "Google Workspace ile ekip iletişimini güçlendirin, belgelerinizi bulutta tutun ve verimliliğinizi artırın. Gmail, Drive, Meet, Docs hepsi birlikte.",
    features: ["Gmail & Google Drive", "Meet video konferans", "Docs, Sheets, Slides", "Kurumsal güvenlik"],
    sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 95 }, { name: "Hizmet", stars: 5, pct: 95 }],
    badge: "KOBİ'ye Özel Fiyat",
    cs: 1, rs: 1, rad: "16px 8px 20px 12px",
  },
  {
    id: "univera", name: "Univera", short: "UV", color: "#2563EB",
    category: "ERP Yazılımı",
    description: "Üretim, satış, muhasebe ve İK modüllerini tek çatı altında toplayan entegre ERP çözümü. Stokbar stok yönetimi ve finansal takip ile güçlendirilmiş.",
    features: ["Üretim & stok takibi", "Muhasebe modülü", "İK ve bordro yönetimi", "Raporlama & analitik"],
    sectors: [{ name: "Üretim", stars: 5, pct: 93 }, { name: "Ticaret", stars: 4, pct: 80 }],
    badge: "Ücretsiz Kurulum",
    cs: 2, rs: 1, rad: "10px 18px 14px 8px",
  },
  {
    id: "nebim", name: "Nebim", short: "NB", color: "#1E3A8A",
    category: "Perakende ERP",
    description: "İşletmenizi tek platformdan yönetin. Üretim, finans, stok, satış, İK — tüm modüller entegre. Nebim V3 (KOBİ) ve Nebim Era (Kurumsal) seçenekleri.",
    features: ["Entegre ERP modülleri", "Sektöre özel çözümler (Tekstil, Gıda, Perakende)", "Gerçek zamanlı raporlama", "Çoklu şube/depo yönetimi"],
    sectors: [{ name: "Üretim", stars: 5, pct: 97 }, { name: "Tekstil", stars: 5, pct: 97 }],
    badge: "Sektör Lideri",
    cs: 1, rs: 1, rad: "20px 12px 8px 18px",
  },
  {
    id: "kariyer", name: "Kariyer.net", short: "KR", color: "#EA580C",
    category: "İK & İstihdam",
    description: "Türkiye'nin en büyük iş ilanı platformunda doğru yetenekleri işe alın, işveren markanızı güçlendirin. CV havuzuna anında erişim.",
    features: ["İş ilanı yayınlama", "CV havuzu erişimi", "İşveren markası yönetimi", "Aday takip sistemi"],
    sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 95 }, { name: "Hizmet", stars: 5, pct: 92 }],
    badge: "Öncelikli İlan Görünürlüğü",
    cs: 1, rs: 1, rad: "8px 16px 20px 6px",
  },
  {
    id: "mukellef", name: "Mükellef", short: "MK", color: "#1E40AF",
    category: "Muhasebe & Vergi",
    description: "Bulut tabanlı muhasebe, otomatik vergi hesaplama ve e-beyanname ile vergi süreçlerinizi kolaylaştırın. Mali müşavirlik desteği dahil.",
    features: ["Bulut muhasebe sistemi", "Otomatik vergi hesaplama", "E-beyanname gönderimi", "Mali müşavirlik desteği"],
    sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 99 }, { name: "Hizmet", stars: 5, pct: 97 }],
    badge: "Mali Müşavirlik Desteği",
    cs: 2, rs: 1, rad: "12px 8px 18px 14px",
  },
  {
    id: "ticimax", name: "Ticimax", short: "TC", color: "#0EA5E9",
    category: "E-Ticaret Çözümleri",
    description: "Hazır e-ticaret altyapısı, mobil uygulama ve çok kanallı satış araçlarıyla online mağazanızı büyütün. SEO araçları ve pazaryeri entegrasyonları dahil.",
    features: ["Mobil uygulama dahil", "SEO optimizasyon araçları", "Çok kanallı satış yönetimi", "30 gün ücretsiz deneme"],
    sectors: [{ name: "E-ticaret", stars: 5, pct: 94 }, { name: "Perakende", stars: 4, pct: 80 }],
    badge: "30 Gün Ücretsiz",
    cs: 1, rs: 1, rad: "18px 14px 6px 20px",
  },
  {
    id: "kolaybi", name: "KolayBi", short: "KB", color: "#14B8A6",
    category: "Ön Muhasebe",
    description: "Fatura, gider, stok ve kasa yönetimini tek uygulamadan kolayca takip edin. Teknik bilgi gerekmez, dakikalar içinde başlayın.",
    features: ["Fatura yönetimi", "Gider takibi & raporlama", "Stok sayımı & yönetimi", "Kasa takibi"],
    sectors: [{ name: "Küçük İşletme", stars: 5, pct: 98 }, { name: "Hizmet", stars: 5, pct: 94 }],
    badge: "Başlangıç Ücretsiz",
    cs: 1, rs: 1, rad: "6px 18px 12px 16px",
  },
  {
    id: "webplus", name: "Web Plus", short: "WP", color: "#9333EA",
    category: "Web Çözümleri",
    description: "Kurumsal web sitesi, dijital pazarlama ve SEO hizmetleriyle online varlığınızı profesyonel bir seviyeye taşıyın. Google Analytics entegrasyonu dahil.",
    features: ["Kurumsal web sitesi tasarımı", "Dijital pazarlama", "SEO & Analytics", "Ücretsiz domain"],
    sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 90 }, { name: "Hizmet", stars: 5, pct: 92 }],
    badge: "Ücretsiz Domain",
    cs: 1, rs: 1, rad: "14px 20px 8px 10px",
  },
  {
    id: "stokbar", name: "Stokbar", short: "SB", color: "#059669",
    category: "Stok Yönetimi",
    description: "Barkodlu stok takibi, min-max uyarıları ve tedarikçi yönetimiyle depo süreçlerinizi dijitalleştirin. Mobil uygulama ile her yerden kontrol.",
    features: ["Barkodlu stok takibi", "Min-max uyarı sistemi", "Tedarikçi yönetimi", "Mobil uygulama dahil"],
    sectors: [{ name: "Perakende", stars: 5, pct: 95 }, { name: "Üretim", stars: 4, pct: 82 }],
    badge: "Mobil Uygulama Dahil",
    cs: 2, rs: 1, rad: "16px 10px 18px 8px",
  },
  {
    id: "finrota", name: "Finrota", short: "FR", color: "#D946EF",
    category: "Finansal Yönetim",
    description: "Nakit akışı, çek/senet takibi ve banka mutabakasını otomatikleştiren akıllı finansal yönetim platformu. Otomatik raporlarla anında içgörü.",
    features: ["Nakit akışı takibi", "Çek/senet yönetimi", "Banka mutabakatı", "Otomatik finansal raporlar"],
    sectors: [{ name: "Finans", stars: 5, pct: 94 }, { name: "Üretim", stars: 4, pct: 80 }],
    badge: "Otomatik Raporlar",
    cs: 1, rs: 1, rad: "20px 6px 14px 18px",
  },
  {
    id: "unidox", name: "UniDOX", short: "UD", color: "#0F766E",
    category: "Dijital Arşiv",
    description: "Kurumsal belge yönetimi, dijital arşiv ve iş akışı otomasyonuyla evrak süreçlerinizi sıfır kağıtla yönetin. KVKK uyumlu altyapı.",
    features: ["Belge yönetimi sistemi", "Dijital arşiv çözümleri", "İş akışı otomasyonu", "KVKK uyumlu"],
    sectors: [{ name: "Kamu & Kurumsal", stars: 5, pct: 96 }, { name: "Hizmet", stars: 4, pct: 82 }],
    badge: "KVKK Uyumlu",
    cs: 1, rs: 1, rad: "10px 16px 20px 8px",
  },
  {
    id: "varuna", name: "Varuna", short: "VR", color: "#DC2626",
    category: "Lojistik Yazılımı",
    description: "Filo yönetimi, rota optimizasyonu ve teslimat takibiyle lojistik operasyonlarınızı verimli hale getirin. Yakıt ve zaman tasarrufu sağlayın.",
    features: ["Filo yönetimi sistemi", "Rota optimizasyonu", "Gerçek zamanlı teslimat takibi", "Yakıt tasarruf raporu"],
    sectors: [{ name: "Lojistik", stars: 5, pct: 97 }, { name: "E-ticaret", stars: 4, pct: 78 }],
    badge: "Yakıt Tasarrufu",
    cs: 1, rs: 2, rad: "8px 20px 14px 6px",
  },
  {
    id: "enroute", name: "Enroute", short: "EN", color: "#7C3AED",
    category: "Dağıtım Optimizasyonu",
    description: "Akıllı dağıtım planlaması ve gerçek zamanlı görev yönetimiyle saha ekiplerinizin verimliliğini maksimize edin. %40 daha verimli operasyon.",
    features: ["Akıllı dağıtım planlaması", "Saha ekip yönetimi", "Gerçek zamanlı takip", "Performans analitiği"],
    sectors: [{ name: "Lojistik", stars: 5, pct: 95 }, { name: "Hizmet", stars: 4, pct: 80 }],
    badge: "%40 Daha Verimli",
    cs: 2, rs: 1, rad: "18px 12px 10px 20px",
  },
];

// ─── Default categories ────────────────────────────────────────────────────────
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

// ─── Float offsets per logo ───────────────────────────────────────────────────
const floatData = partners.map((_, i) => ({
  yAmt:     2 + (i % 4) * 1.1,
  duration: 4.5 + (i % 5) * 0.6,
  delay:    (i * 0.37) % 2.8,
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

// ─── Default right panel ───────────────────────────────────────────────────────
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
      Sol taraftaki puzzle parçalarından birini seçin, size nasıl değer kattıklarını keşfedin.
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
      <span>Bir puzzle parçasına tıklayın</span>
    </div>
  </div>
);

// ─── Partner right panel ───────────────────────────────────────────────────────
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
        style={{ background: partner.color, boxShadow: `0 8px 28px -6px ${partner.color}66`, borderRadius: partner.rad }}
      >
        <span
          className="font-black text-white"
          style={{
            fontSize:
              partner.short.length > 3 ? "11px" :
              partner.short.length > 2 ? "14px" :
              partner.short.length > 1 ? "17px" : "24px",
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
    <div className="flex items-center gap-3 flex-wrap mb-4">
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
        style={{ background: "#DCFCE7", color: "#15803D" }}
      >
        <Check className="w-3 h-3" strokeWidth={3} />
        {partner.badge}
      </span>
    </div>

    <Link to="/kobi/urunler" className="block">
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

// ─── Jigsaw Puzzle Grid Layout ────────────────────────────────────────────────
// 6-column grid; each partner has cs (col-span) and rs (row-span)
// The grid fills top-to-bottom, left-to-right automatically via CSS Grid auto-placement
const PuzzleGrid = ({
  selected,
  onSelect,
  visible,
}: {
  selected: number | null;
  onSelect: (i: number) => void;
  visible: boolean;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const isAnySelected = selected !== null;

  return (
    <div
      className="w-full"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "3px",
      }}
    >
      {partners.map((partner, i) => {
        const isSel    = selected === i;
        const isHov    = hovered === i;
        const opVal    = isAnySelected ? (isSel ? 1 : 0.55) : 1;
        const fp       = floatData[i];

        // font size scaling based on initials length
        const fontSize =
          partner.short.length > 3 ? "9px"  :
          partner.short.length > 2 ? "11px" :
          partner.short.length > 1 ? "14px" : "20px";

        return (
          <motion.div
            key={partner.id}
            style={{
              gridColumn: `span ${partner.cs}`,
              gridRow:    `span ${partner.rs}`,
              minHeight:  partner.rs === 2 ? "160px" : "80px",
              cursor:     "pointer",
              zIndex:     isSel ? 20 : isHov ? 15 : 1,
              position:   "relative",
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={
              visible
                ? { opacity: opVal, scale: isSel ? 1.04 : 1 }
                : { opacity: 0, scale: 0.7 }
            }
            transition={{
              opacity: { duration: 0.2 },
              scale:   { duration: 0.4, delay: 0.05 + i * 0.03, ease: [0.22, 1, 0.36, 1] },
            }}
            onClick={() => onSelect(i)}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
          >
            {/* Float wrapper */}
            <motion.div
              animate={{ y: [0, -fp.yAmt, 0] }}
              transition={{
                duration: fp.duration,
                delay:    fp.delay,
                repeat:   Infinity,
                ease:     "easeInOut",
              }}
              className="w-full h-full"
            >
              {/* The puzzle piece tile */}
              <motion.div
                className="w-full h-full flex flex-col items-center justify-center select-none relative overflow-hidden"
                style={{
                  background:   partner.color,
                  borderRadius: partner.rad,
                  boxShadow:    isSel
                    ? `inset 0 0 0 3px rgba(255,255,255,0.9), 0 0 0 3px hsl(268,72%,38%), 0 8px 24px -4px ${partner.color}88`
                    : `inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 8px -2px ${partner.color}50`,
                  transition:   "box-shadow 0.2s, opacity 0.2s",
                }}
                whileHover={{
                  scale:      1.06,
                  y:          -3,
                  boxShadow:  `inset 0 1px 0 rgba(255,255,255,0.28), 0 8px 20px -4px ${partner.color}70`,
                  transition: { type: "spring", stiffness: 400, damping: 24 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Subtle shine overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
                    borderRadius: "inherit",
                  }}
                />

                {/* Initials */}
                <span
                  className="font-black text-white relative z-10 tracking-tight"
                  style={{ fontSize, letterSpacing: "-0.02em", textShadow: "0 1px 4px rgba(0,0,0,0.25)" }}
                >
                  {partner.short}
                </span>

                {/* Partner name (shown when selected) */}
                <AnimatePresence>
                  {isSel && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-2 left-0 right-0 text-center text-white font-semibold"
                      style={{ fontSize: "8px", letterSpacing: "0.03em", opacity: 0.85 }}
                    >
                      {partner.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Tooltip on hover */}
            <AnimatePresence>
              {isHov && !isSel && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.88 }}
                  transition={{ duration: 0.16 }}
                  className="absolute pointer-events-none"
                  style={{
                    bottom:      "calc(100% + 8px)",
                    left:        "50%",
                    transform:   "translateX(-50%)",
                    whiteSpace:  "nowrap",
                    background:  "white",
                    borderRadius: "10px",
                    padding:     "5px 11px",
                    boxShadow:   "0 4px 18px -4px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)",
                    zIndex:      50,
                  }}
                >
                  <p className="text-xs font-bold text-foreground">{partner.name}</p>
                  <p className="text-[10px] text-muted-foreground">{partner.category}</p>
                  {/* Arrow */}
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
        );
      })}
    </div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────────
const PartnerEcosystemSection = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [visible,  setVisible]  = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.06 });
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-deselect after 10s inactivity
  useEffect(() => {
    if (selected !== null) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setSelected(null), 10000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [selected]);

  useEffect(() => {
    if (inView) setTimeout(() => setVisible(true), 100);
  }, [inView]);

  const handleSelect = (idx: number) => {
    setSelected((prev) => (prev === idx ? null : idx));
  };

  const selectedPartner = selected !== null ? partners[selected] : null;

  return (
    <section
      id="partner-ecosystem"
      className="py-20 md:py-28 overflow-hidden"
      style={{ background: "#F8F9FF" }}
    >
      <div className="max-w-[1340px] mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase border border-primary/15 mb-4">
            Çözüm Ortakları
          </span>
          <h2
            className="font-black text-foreground mx-auto"
            style={{
              fontSize: "clamp(1.8rem,3.5vw,2.75rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              maxWidth: "640px",
            }}
          >
            Çözüm Ortaklarımız
          </h2>
          <p className="text-muted-foreground mt-3 mx-auto" style={{ maxWidth: "480px", fontSize: "1rem", lineHeight: 1.7 }}>
            Parçaya tıklayın, partnerinizi keşfedin
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div
          ref={sectionRef}
          className="flex flex-col-reverse lg:flex-row items-start gap-8 xl:gap-12"
        >
          {/* ── LEFT: Jigsaw Puzzle Grid (45%) ── */}
          <motion.div
            className="w-full lg:w-[48%] flex-shrink-0"
            initial={{ opacity: 0, x: -24 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <PuzzleGrid selected={selected} onSelect={handleSelect} visible={visible} />

            {/* Stats below puzzle */}
            <div className="flex justify-center gap-8 md:gap-12 mt-8">
              {[
                { value: "50+", label: "Çözüm Ortağı" },
                { value: "21",  label: "Param Ürünü"  },
                { value: "10",  label: "Kategori"     },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <span
                    className="font-black text-primary"
                    style={{ fontSize: "clamp(1.5rem,2.2vw,1.9rem)", lineHeight: 1, letterSpacing: "-0.03em" }}
                  >
                    {s.value}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA below stats */}
            <motion.div
              className="mt-6 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <Link to="/kobi/urunler">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 12px 40px -6px rgba(109,40,217,0.52)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-sm"
                  style={{
                    background: "linear-gradient(135deg, hsl(268,72%,38%), hsl(268,72%,52%))",
                    boxShadow:  "0 6px 24px -4px rgba(109,40,217,0.38)",
                  }}
                >
                  Çözüm Ortaklarını Keşfet <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Dynamic Content (55%) ── */}
          <div className="w-full lg:w-[52%] lg:sticky lg:top-24">
            <motion.div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: "white",
                boxShadow:  "0 4px 40px -8px rgba(109,40,217,0.10), 0 1px 4px rgba(0,0,0,0.04)",
                border:     "1px solid hsl(252,20%,92%)",
                minHeight:  "540px",
              }}
              initial={{ opacity: 0, x: 24 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
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
            </motion.div>

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
                  &nbsp;seçildi — 10 saniye sonra sıfırlanır.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PartnerEcosystemSection;
