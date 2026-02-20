import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Check, ShoppingCart, CreditCard, Globe, BarChart3, Package, Building2, Layers } from "lucide-react";

// ─── Full partner data with interactive content ──────────────────────────────
const partners = [
  {
    name: "T-SOFT",
    short: "TS",
    color: "#7D1F3E",
    category: "E-Ticaret Çözümü",
    description: "E-ticaret platformu, online mağaza kurulumu, ödeme ve kargo entegrasyonu. Siparişlerinizi tek panelden yönetin.",
    features: ["Hazır e-ticaret sitesi", "Ödeme entegrasyonu", "Stok senkronizasyonu"],
    badge: "Platform indirimi mevcut",
    size: 76,
  },
  {
    name: "QNB",
    short: "QNB",
    color: "#0891B2",
    category: "Finansal Çözümler",
    description: "Kurumsal bankacılık, dijital ödeme altyapısı ve işletmelere özel finansal ürünler ile nakit akışınızı optimize edin.",
    features: ["İşletme hesabı", "Dijital bankacılık", "Kredi çözümleri"],
    badge: "Özel faiz oranları",
    size: 72,
  },
  {
    name: "ikas",
    short: "İKAS",
    color: "#3B82F6",
    category: "E-Ticaret Altyapısı",
    description: "Çok kanallı satış, otomatik stok yönetimi ve entegre pazaryeri çözümleriyle satışlarınızı büyütün.",
    features: ["Çok kanallı satış", "Pazaryeri entegrasyonu", "Otomatik stok takibi"],
    badge: "İlk 3 ay ücretsiz",
    size: 68,
  },
  {
    name: "Param",
    short: "P",
    color: "#FF6B35",
    category: "Ödeme Sistemleri",
    description: "Fiziksel ve dijital POS, sanal pos ve mobil ödeme çözümleriyle her kanaldan anlık ödeme alın.",
    features: ["Fiziksel & sanal POS", "Mobil ödeme", "Taksit seçenekleri"],
    badge: "Kurulum ücretsiz",
    size: 80,
  },
  {
    name: "Kredim",
    short: "K",
    color: "#F97316",
    category: "Finansman Çözümleri",
    description: "KOBİ'lere özel esnek kredi imkânları, hızlı onay süreci ve rekabetçi faiz oranlarıyla büyümenizi destekler.",
    features: ["Hızlı kredi onayı", "Esnek vade seçenekleri", "KOBİ'ye özel oranlar"],
    badge: "%0 komisyon",
    size: 66,
  },
  {
    name: "QF",
    short: "QF",
    color: "#7C3AED",
    category: "Dijital Finans",
    description: "Dijital finans yönetimi, otomatik muhasebe ve gerçek zamanlı nakit akışı takibi ile finansal kontrolü ele alın.",
    features: ["Gerçek zamanlı takip", "Otomatik muhasebe", "Finansal raporlar"],
    badge: "Ücretsiz demo",
    size: 72,
  },
  {
    name: "Azalt",
    short: "AZ",
    color: "#EF4444",
    category: "Maliyet Yönetimi",
    description: "Operasyonel giderlerinizi analiz edin, israfı önleyin ve işletme maliyetlerinizi akıllı önerilerle azaltın.",
    features: ["Gider analizi", "Tasarruf önerileri", "Bütçe planlama"],
    badge: "Ortalama %23 tasarruf",
    size: 68,
  },
  {
    name: "QeS",
    short: "QeS",
    color: "#6B21A8",
    category: "E-Fatura Sistemi",
    description: "GİB onaylı e-fatura, e-arşiv ve e-irsaliye çözümleriyle faturalaşma süreçlerinizi tamamen otomatikleştirin.",
    features: ["E-fatura & e-arşiv", "GİB entegrasyonu", "Otomatik gönderim"],
    badge: "Mevzuat uyumlu",
    size: 64,
  },
  {
    name: "Aras",
    short: "AR",
    color: "#10B981",
    category: "Kargo & Lojistik",
    description: "Türkiye'nin en geniş kargo ağıyla gönderi takibi, toplu sevkiyat ve e-ticaret entegrasyonu tek panelde.",
    features: ["Gönderi takibi", "Toplu sevkiyat", "E-ticaret entegrasyonu"],
    badge: "İndirimli kargo tarifeleri",
    size: 74,
  },
  {
    name: "Google",
    short: "G",
    color: "#4285F4",
    category: "Bulut & İşbirliği",
    description: "Google Workspace ile ekip iletişimini güçlendirin, belgelerinizi bulutta tutun ve verimliliğinizi artırın.",
    features: ["Gmail & Drive", "Meet & Docs", "Kurumsal güvenlik"],
    badge: "KOBİ'ye özel fiyat",
    size: 70,
  },
  {
    name: "Univera",
    short: "UV",
    color: "#2563EB",
    category: "ERP Yazılımı",
    description: "Üretim, satış, muhasebe ve İK modüllerini tek çatı altında toplayan entegre ERP çözümü.",
    features: ["Üretim takibi", "Muhasebe modülü", "İK yönetimi"],
    badge: "Ücretsiz kurulum",
    size: 68,
  },
  {
    name: "Nebim",
    short: "NB",
    color: "#1E3A8A",
    category: "Perakende ERP",
    description: "Perakende, mağaza zinciri ve e-ticaret için geliştirilmiş kapsamlı yönetim ve analitik platformu.",
    features: ["Mağaza yönetimi", "Stok optimizasyonu", "Satış analitiği"],
    badge: "Sektör lideri",
    size: 66,
  },
  {
    name: "Kariyer.net",
    short: "KR",
    color: "#EA580C",
    category: "İK & İstihdam",
    description: "Türkiye'nin en büyük iş ilanı platformunda doğru yetenekleri işe alın, işveren markanızı güçlendirin.",
    features: ["İş ilanı yayınlama", "CV havuzu erişimi", "İşveren markası"],
    badge: "Öncelikli ilan görünürlüğü",
    size: 72,
  },
  {
    name: "Mükellef",
    short: "MK",
    color: "#1E40AF",
    category: "Muhasebe & Vergi",
    description: "Bulut tabanlı muhasebe, otomatik vergi hesaplama ve e-beyanname ile vergi süreçlerinizi kolaylaştırın.",
    features: ["Bulut muhasebe", "Otomatik vergi", "E-beyanname"],
    badge: "Mali müşavirlik desteği",
    size: 68,
  },
  {
    name: "Ticimax",
    short: "TC",
    color: "#0EA5E9",
    category: "E-Ticaret Çözümleri",
    description: "Hazır e-ticaret altyapısı, mobil uygulama ve çok kanallı satış araçlarıyla online mağazanızı büyütün.",
    features: ["Mobil uygulama", "SEO araçları", "Çok kanallı yönetim"],
    badge: "30 gün ücretsiz",
    size: 66,
  },
  {
    name: "KolayBi",
    short: "KB",
    color: "#14B8A6",
    category: "Ön Muhasebe",
    description: "Fatura, gider, stok ve kasa yönetimini tek uygulamadan kolayca takip edin. Teknik bilgi gerekmez.",
    features: ["Fatura yönetimi", "Gider takibi", "Stok sayımı"],
    badge: "Başlangıç ücretsiz",
    size: 64,
  },
  {
    name: "Web Plus",
    short: "WP",
    color: "#9333EA",
    category: "Web Çözümleri",
    description: "Kurumsal web sitesi, dijital pazarlama ve SEO hizmetleriyle online varlığınızı profesyonel bir seviyeye taşıyın.",
    features: ["Kurumsal web sitesi", "Dijital pazarlama", "SEO & Analytics"],
    badge: "Ücretsiz domain",
    size: 68,
  },
  {
    name: "Stokbar",
    short: "SB",
    color: "#059669",
    category: "Stok Yönetimi",
    description: "Barkodlu stok takibi, min-max uyarıları ve tedarikçi yönetimiyle depo süreçlerinizi dijitalleştirin.",
    features: ["Barkodlu takip", "Min-max uyarıları", "Tedarikçi yönetimi"],
    badge: "Mobil uygulama dahil",
    size: 66,
  },
  {
    name: "Finrota",
    short: "FR",
    color: "#D946EF",
    category: "Finansal Yönetim",
    description: "Nakit akışı, çek/senet takibi ve banka mutabakasını otomatikleştiren akıllı finansal yönetim platformu.",
    features: ["Nakit akışı takibi", "Çek/senet yönetimi", "Banka mutabakatı"],
    badge: "Otomatik raporlar",
    size: 70,
  },
  {
    name: "UniDOX",
    short: "UD",
    color: "#0F766E",
    category: "Dijital Dönüşüm",
    description: "Kurumsal belge yönetimi, dijital arşiv ve iş akışı otomasyonuyla evrak süreçlerinizi sıfır kağıtla yönetin.",
    features: ["Belge yönetimi", "Dijital arşiv", "İş akışı otomasyonu"],
    badge: "KVKK uyumlu",
    size: 64,
  },
  {
    name: "Varuna",
    short: "VR",
    color: "#DC2626",
    category: "Lojistik Yazılımı",
    description: "Filo yönetimi, rota optimizasyonu ve teslimat takibiyle lojistik operasyonlarınızı verimli hale getirin.",
    features: ["Filo yönetimi", "Rota optimizasyonu", "Teslimat takibi"],
    badge: "Yakıt tasarrufu",
    size: 66,
  },
  {
    name: "Enroute",
    short: "EN",
    color: "#7C3AED",
    category: "Dağıtım Optimizasyonu",
    description: "Akıllı dağıtım planlaması ve gerçek zamanlı görev yönetimiyle saha ekiplerinizin verimliliğini maksimize edin.",
    features: ["Akıllı planlama", "Saha yönetimi", "Gerçek zamanlı takip"],
    badge: "%40 daha verimli",
    size: 64,
  },
];

// ─── Default center categories ────────────────────────────────────────────────
const defaultCategories = ["E-ticaret", "Ödeme", "Muhasebe", "Stok", "Global Açılım", "Finansman", "İK Çözümleri", "ERP"];

// ─── Stats ───────────────────────────────────────────────────────────────────
const stats = [
  { value: "50+", label: "Çözüm Ortağı" },
  { value: "21", label: "Param Ürünü" },
  { value: "10", label: "Kategori" },
];

// ─── Puzzle grid positions (organic, asymmetric, absolute within 640x640 box) ─
// Center is at (320, 320). Logos scattered around, none overlapping.
const logoPositions = [
  { x: 55,  y: 80  }, // T-SOFT      top-left cluster
  { x: 150, y: 32  }, // QNB         top center-left
  { x: 260, y: 12  }, // ikas        top center
  { x: 385, y: 28  }, // Param       top center-right
  { x: 490, y: 72  }, // Kredim      top-right
  { x: 555, y: 175 }, // QF          right-top
  { x: 570, y: 295 }, // Azalt       right-mid
  { x: 555, y: 415 }, // QeS         right-bottom
  { x: 490, y: 520 }, // Aras        bottom-right
  { x: 375, y: 572 }, // Google      bottom center-right
  { x: 255, y: 585 }, // Univera     bottom center
  { x: 140, y: 562 }, // Nebim       bottom center-left
  { x: 50,  y: 505 }, // Kariyer.net bottom-left
  { x: 18,  y: 390 }, // Mükellef    left-bottom
  { x: 22,  y: 268 }, // Ticimax     left-mid
  { x: 50,  y: 155 }, // KolayBi     left-top
  { x: 168, y: 108 }, // Web Plus    inner top-left
  { x: 450, y: 118 }, // Stokbar     inner top-right
  { x: 475, y: 455 }, // Finrota     inner bottom-right
  { x: 152, y: 462 }, // UniDOX      inner bottom-left
  { x: 108, y: 285 }, // Varuna      inner left
  { x: 465, y: 298 }, // Enroute     inner right
];

// ─── Floating animation params ────────────────────────────────────────────────
const floatData = partners.map((_, i) => ({
  yAmt:     6 + (i % 4) * 1.5,
  duration: 4.2 + (i % 5) * 0.45,
  delay:    (i * 0.37) % 2.2,
}));

// ─── Center circle content ────────────────────────────────────────────────────
const CenterDefault = () => (
  <div className="flex flex-col items-center justify-center text-center h-full px-5 py-6 gap-2">
    <span
      className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-1"
      style={{ background: "hsl(268,72%,92%)", color: "hsl(268,72%,38%)" }}
    >
      EKOSİSTEM
    </span>
    <div className="flex gap-2.5 justify-center mb-1">
      {[ShoppingCart, CreditCard, Globe, BarChart3, Package].map((Icon, i) => (
        <div
          key={i}
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "hsl(268,72%,93%)" }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: "hsl(268,72%,40%)" }} strokeWidth={2} />
        </div>
      ))}
    </div>
    <h3 className="font-black" style={{ fontSize: "1.35rem", letterSpacing: "-0.025em", color: "hsl(268,72%,28%)", lineHeight: 1.1 }}>
      Dijital<br />Ekosistem
    </h3>
    <p className="text-slate-500" style={{ fontSize: "11px", lineHeight: 1.5 }}>
      E-ticaret, Ödeme, Muhasebe,<br />Lojistik, İK, ERP — Tümü burada!
    </p>
    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mt-1">
      {defaultCategories.map((cat) => (
        <div key={cat} className="flex items-center gap-1">
          <Check className="w-2.5 h-2.5 flex-shrink-0" style={{ color: "hsl(268,72%,42%)" }} strokeWidth={3} />
          <span style={{ fontSize: "9px", color: "hsl(260,15%,42%)", fontWeight: 600 }}>{cat}</span>
        </div>
      ))}
    </div>
    <Link to="/kobi/signup" className="mt-2">
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-white font-bold"
        style={{ background: "hsl(268,72%,40%)", fontSize: "10px", boxShadow: "0 2px 8px rgba(109,40,217,0.3)" }}
      >
        Keşfet <ArrowRight className="w-2.5 h-2.5" />
      </motion.button>
    </Link>
  </div>
);

interface PartnerCenterProps {
  partner: typeof partners[0];
}
const CenterPartner = ({ partner }: PartnerCenterProps) => (
  <div className="flex flex-col items-center justify-center text-center h-full px-5 py-4 gap-2">
    <span
      className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
      style={{ background: `${partner.color}22`, color: partner.color }}
    >
      {partner.category}
    </span>
    {/* Large logo circle */}
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center my-1"
      style={{
        background: partner.color,
        boxShadow: `0 8px 24px -4px ${partner.color}55`,
      }}
    >
      <span
        className="font-black text-white"
        style={{ fontSize: partner.short.length > 2 ? "11px" : partner.short.length > 1 ? "13px" : "18px" }}
      >
        {partner.short}
      </span>
    </div>
    <h3 className="font-black text-foreground" style={{ fontSize: "1.1rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
      {partner.name}
    </h3>
    <p className="text-slate-500" style={{ fontSize: "10.5px", lineHeight: 1.5, maxWidth: "230px" }}>
      {partner.description}
    </p>
    <div className="flex flex-col gap-0.5 w-full px-2">
      {partner.features.map((f) => (
        <div key={f} className="flex items-center gap-1.5">
          <Check className="w-2.5 h-2.5 flex-shrink-0" style={{ color: partner.color }} strokeWidth={3} />
          <span style={{ fontSize: "9.5px", color: "hsl(260,15%,38%)", fontWeight: 600 }}>{f}</span>
        </div>
      ))}
    </div>
    <span
      className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold mt-0.5"
      style={{ background: "#DCFCE7", color: "#15803D" }}
    >
      ✓ {partner.badge}
    </span>
    <Link to="/kobi/urunler" className="mt-1">
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-white font-bold"
        style={{ background: partner.color, fontSize: "10px", boxShadow: `0 2px 8px ${partner.color}44` }}
      >
        Detaylı Bilgi <ArrowRight className="w-2.5 h-2.5" />
      </motion.button>
    </Link>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const PartnerEcosystemSection = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered]   = useState<number | null>(null);
  const [visible, setVisible]   = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-deselect after 10s inactivity
  useEffect(() => {
    if (selected !== null) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setSelected(null), 10000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [selected]);

  // Trigger entrance animation
  useEffect(() => {
    if (inView) setTimeout(() => setVisible(true), 100);
  }, [inView]);

  const handleClick = (idx: number) => {
    setSelected((prev) => (prev === idx ? null : idx));
  };

  // Grid visual box size
  const BOX = 640;
  const CENTER = BOX / 2; // 320

  const selectedPartner = selected !== null ? partners[selected] : null;

  return (
    <section id="partner-ecosystem" className="py-24 md:py-36 overflow-hidden" style={{ background: "#F9FAFB" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase border border-primary/15">
            Çözüm Ortakları
          </span>
        </motion.div>

        {/* Two-column */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── LEFT ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 w-full lg:w-[40%] max-w-lg"
          >
            <h2
              className="font-black text-foreground mb-5"
              style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)", lineHeight: 1.08, letterSpacing: "-0.035em" }}
            >
              Dijital Dönüşüm Ekosistemi:{" "}
              <span className="text-gradient-primary">Tek Platformda</span>{" "}
              Tüm Çözümler
            </h2>

            <p
              className="text-slate-500 mb-9"
              style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)", lineHeight: 1.78, maxWidth: "520px" }}
            >
              E-ticaretten ödeme sistemlerine, muhasebeden global açılıma, stok yönetiminden
              finansmana — işletmenizin tüm dijital ihtiyaçlarını karşılayan{" "}
              <strong className="text-foreground font-semibold">50+ çözüm ortağıyla</strong>{" "}
              çalışıyoruz. Hepsi tek platformda, size özel!
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-9">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="flex flex-col"
                >
                  <span
                    className="font-black text-primary"
                    style={{ fontSize: "clamp(1.6rem, 2.4vw, 2rem)", lineHeight: 1, letterSpacing: "-0.03em" }}
                  >
                    {s.value}
                  </span>
                  <span className="text-xs text-slate-400 mt-1 font-medium">{s.label}</span>
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
                  background: "linear-gradient(135deg, hsl(268,72%,38%), hsl(268,72%,52%))",
                  boxShadow: "0 6px 24px -4px rgba(109,40,217,0.38)",
                }}
              >
                Çözüm Ortaklarını Keşfet <ArrowRight className="h-4 w-4" />
              </motion.button>
            </Link>

            {/* Hint when a logo is selected */}
            <AnimatePresence>
              {selected !== null && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 text-xs text-slate-400 font-medium flex items-center gap-1.5"
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ background: partners[selected].color }}
                  />
                  <strong style={{ color: partners[selected].color }}>{partners[selected].name}</strong>{" "}
                  seçildi — 10 saniye sonra sıfırlanır.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: Puzzle grid ────────────────────────────────── */}
          <div
            ref={sectionRef}
            className="flex-1 flex items-center justify-center"
            style={{ minHeight: "640px" }}
          >
            {/* Outer wrapper — fixed aspect */}
            <div
              className="relative"
              style={{ width: `${BOX}px`, height: `${BOX}px`, maxWidth: "100%" }}
            >

              {/* ── Center circle ── */}
              <motion.div
                className="absolute z-20 rounded-full overflow-hidden"
                style={{
                  width:  "310px",
                  height: "310px",
                  left:   `${CENTER - 155}px`,
                  top:    `${CENTER - 155}px`,
                  background: "radial-gradient(circle at 40% 35%, hsl(268,72%,97%), hsl(252,60%,93%))",
                  border: "6px solid hsl(268,72%,38%)",
                  boxShadow: "0 0 0 1.5px rgba(255,255,255,0.85) inset, 0 0 70px -12px rgba(109,40,217,0.28), 0 24px 80px -20px rgba(109,40,217,0.16)",
                }}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatePresence mode="wait">
                  {selectedPartner ? (
                    <motion.div
                      key={selectedPartner.name}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="w-full h-full"
                    >
                      <CenterPartner partner={selectedPartner} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="w-full h-full"
                    >
                      <CenterDefault />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* ── Partner logo squares ── */}
              {partners.map((partner, i) => {
                const pos  = logoPositions[i];
                if (!pos) return null;

                const sz   = partner.size;
                const fp   = floatData[i];
                const isSel = selected === i;
                const isAnySelected = selected !== null;
                const opacity = isAnySelected ? (isSel ? 1 : 0.55) : 1;
                const tooltipVisible = hovered === i;

                return (
                  <motion.div
                    key={partner.name}
                    className="absolute"
                    style={{
                      left:     `${pos.x}px`,
                      top:      `${pos.y}px`,
                      width:    `${sz}px`,
                      height:   `${sz}px`,
                      position: "absolute",
                      zIndex:   isSel ? 30 : (hovered === i ? 25 : 10),
                      cursor:   "pointer",
                    }}
                    initial={{ opacity: 0, scale: 0.65 }}
                    animate={visible ? { opacity, scale: 1 } : { opacity: 0, scale: 0.65 }}
                    transition={{
                      opacity: { duration: 0.25 },
                      scale: { duration: 0.45, delay: 0.2 + i * 0.045, ease: [0.22, 1, 0.36, 1] },
                    }}
                    onClick={() => handleClick(i)}
                    onHoverStart={() => setHovered(i)}
                    onHoverEnd={() => setHovered(null)}
                  >
                    {/* Gentle float */}
                    <motion.div
                      animate={{ y: [0, -fp.yAmt, 0] }}
                      transition={{ duration: fp.duration, delay: fp.delay, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full h-full relative"
                    >
                      {/* Logo square */}
                      <motion.div
                        className="w-full h-full rounded-2xl flex items-center justify-center select-none"
                        style={{
                          background:  partner.color,
                          boxShadow:   isSel
                            ? `0 0 0 3px white, 0 0 0 5px ${partner.color}, 0 8px 28px -4px ${partner.color}88`
                            : `0 4px 14px -4px ${partner.color}55, 0 1px 4px rgba(0,0,0,0.10)`,
                          border:      isSel ? `2px solid ${partner.color}` : "2px solid rgba(255,255,255,0.85)",
                          transition:  "box-shadow 0.25s, border 0.25s",
                        }}
                        whileHover={{
                          scale:     1.1,
                          boxShadow: `0 0 0 2.5px white, 0 0 0 4px ${partner.color}, 0 10px 28px -4px ${partner.color}77`,
                          transition: { type: "spring", stiffness: 350, damping: 20 },
                        }}
                        whileTap={{ scale: 0.94 }}
                      >
                        <span
                          className="font-black text-white select-none"
                          style={{
                            fontSize: partner.short.length > 3 ? "8px" : partner.short.length > 2 ? "10px" : partner.short.length > 1 ? "12px" : "16px",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {partner.short}
                        </span>
                      </motion.div>

                      {/* Tooltip */}
                      <AnimatePresence>
                        {tooltipVisible && (
                          <motion.div
                            initial={{ opacity: 0, y: 4, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.9 }}
                            transition={{ duration: 0.18 }}
                            className="absolute pointer-events-none"
                            style={{
                              bottom: "calc(100% + 8px)",
                              left:   "50%",
                              transform: "translateX(-50%)",
                              whiteSpace: "nowrap",
                              background: "white",
                              borderRadius: "10px",
                              padding: "5px 11px",
                              boxShadow: "0 4px 18px -4px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.06)",
                              zIndex: 40,
                            }}
                          >
                            <p className="text-xs font-bold text-foreground">{partner.name}</p>
                            {/* Arrow */}
                            <div
                              className="absolute left-1/2 -translate-x-1/2"
                              style={{
                                bottom: "-5px",
                                borderLeft: "5px solid transparent",
                                borderRight: "5px solid transparent",
                                borderTop: "5px solid white",
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
        </div>
      </div>
    </section>
  );
};

export default PartnerEcosystemSection;
