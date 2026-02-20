import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgePercent,
  ShoppingCart,
  CreditCard,
  Wallet,
  Factory,
  Package,
  Globe2,
  Users,
} from "lucide-react";
import tabEticaret from "@/assets/tab-eticaret-new.png";
import tabOdeme from "@/assets/tab-odeme-new.png";
import tabPara from "@/assets/tab-para-new.png";
import tabStok from "@/assets/tab-stok-new.png";
import tabGlobal from "@/assets/tab-global-new.png";
import tabEkip from "@/assets/tab-ekip-new.png";
import tabTesvik from "@/assets/tab-tesvik.png";
import tabUretim from "@/assets/tab-uretim.png";


const categories = [
  {
    label: "Teşviklerden Yararlan",
    description:
      "Devlet teşvikleri, hibe programları ve vergi avantajlarından yararlanarak maliyetlerinizi düşürün. Size uygun destekleri keşfedin ve başvuru süreçlerinizi kolaylaştırın.",
    tags: ["Hibe Programları", "Vergi Avantajları", "Başvuru Desteği"],
    icon: BadgePercent,
    image: tabTesvik,
    accent: "#7C3AED",
    accentBg: "rgba(124,58,237,0.08)",
    decorColor: "#A78BFA",
    gradient: "from-violet-500/20 via-purple-500/10 to-fuchsia-400/10",
  },
  {
    label: "E-Ticarete Açıl",
    description:
      "Online satış kanallarınızı oluşturun, e-ticaret altyapınızı kurun ve dijital pazarlama stratejileriyle müşteri kitlenizi genişletin.",
    tags: ["E-Ticaret Altyapısı", "Çoklu Kanal Satış", "Mağaza Çözümleri"],
    icon: ShoppingCart,
    image: tabEticaret,
    accent: "#2563EB",
    accentBg: "rgba(37,99,235,0.08)",
    decorColor: "#93C5FD",
    gradient: "from-blue-500/20 via-blue-400/10 to-cyan-300/10",
  },
  {
    label: "Ödeme Al",
    description:
      "Fiziksel ve online ödeme çözümleriyle tahsilat süreçlerinizi hızlandırın. POS, sanal POS ve mobil ödeme seçenekleriyle her kanaldan ödeme alın.",
    tags: ["Ödeme Çözümleri", "Dijital Finansal Yönetim", "Finansman Desteği"],
    icon: CreditCard,
    image: tabOdeme,
    accent: "#059669",
    accentBg: "rgba(5,150,105,0.08)",
    decorColor: "#6EE7B7",
    gradient: "from-emerald-500/20 via-green-400/10 to-teal-300/10",
  },
  {
    label: "Paranı Yönet",
    description:
      "Nakit akışınızı optimize edin, muhasebe süreçlerinizi otomatikleştirin ve finansal raporlarınızla işletmenizin mali sağlığını takip edin.",
    tags: ["Muhasebe Çözümleri", "ERP Yazılımı", "Fatura Yönetimi"],
    icon: Wallet,
    image: tabPara,
    accent: "#D97706",
    accentBg: "rgba(217,119,6,0.08)",
    decorColor: "#FCD34D",
    gradient: "from-amber-500/20 via-yellow-400/10 to-orange-300/10",
  },
  {
    label: "Üretimini Optimize Et",
    description:
      "Üretim süreçlerinizi dijitalleştirin, verimlilik analizi yapın ve operasyonel maliyetlerinizi minimize edin.",
    tags: ["Üretim Takibi", "Verimlilik Analizi", "Otomasyon"],
    icon: Factory,
    image: tabUretim,
    accent: "#DC2626",
    accentBg: "rgba(220,38,38,0.08)",
    decorColor: "#FCA5A5",
    gradient: "from-red-500/20 via-rose-400/10 to-pink-300/10",
  },
  {
    label: "Stoğunu Kontrol Et",
    description:
      "Stok ve depo yönetiminizi dijitalleştirin. Min-max takibi, FIFO/LIFO ve tedarik zinciri optimizasyonu ile fire oranlarınızı düşürün.",
    tags: ["Kargo & Lojistik", "Depo Yönetimi", "Sipariş Takibi"],
    icon: Package,
    image: tabStok,
    accent: "#0891B2",
    accentBg: "rgba(8,145,178,0.08)",
    decorColor: "#67E8F9",
    gradient: "from-cyan-500/20 via-sky-400/10 to-blue-300/10",
  },
  {
    label: "Globale Açıl",
    description:
      "Yurt dışı pazarlara açılın. İhracat süreçleri, uluslararası ödeme altyapısı ve lojistik çözümleriyle globalleşme yolculuğunuza başlayın.",
    tags: ["Kurumsal Çözümler", "Global Şirket Kurulumu", "Bulut Altyapısı"],
    icon: Globe2,
    image: tabGlobal,
    accent: "#7C3AED",
    accentBg: "rgba(124,58,237,0.08)",
    decorColor: "#C4B5FD",
    gradient: "from-violet-600/20 via-indigo-500/10 to-purple-400/10",
  },
  {
    label: "Ekibini Güçlendir",
    description:
      "İK yönetimi, işe alım, eğitim programları ve performans takip sistemleriyle ekibinizi büyütün ve güçlendirin.",
    tags: ["İK Yönetimi", "Bordro Çözümleri", "Yetenek Arama"],
    icon: Users,
    image: tabEkip,
    accent: "#DB2777",
    accentBg: "rgba(219,39,119,0.08)",
    decorColor: "#F9A8D4",
    gradient: "from-pink-500/20 via-rose-400/10 to-fuchsia-300/10",
  },
];


/* Decorative orbiting circles for visual depth */
const OrbitRings = ({ color }: { color: string }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 400 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="200" cy="160" r="90" stroke={color} strokeWidth="1" strokeOpacity="0.18" strokeDasharray="6 6" />
    <circle cx="200" cy="160" r="130" stroke={color} strokeWidth="1" strokeOpacity="0.10" strokeDasharray="4 8" />
    <circle cx="200" cy="160" r="170" stroke={color} strokeWidth="0.75" strokeOpacity="0.07" strokeDasharray="3 10" />
    {/* Small accent dots */}
    <circle cx="200" cy="70" r="5" fill={color} fillOpacity="0.35" />
    <circle cx="290" cy="160" r="4" fill={color} fillOpacity="0.25" />
    <circle cx="110" cy="200" r="3" fill={color} fillOpacity="0.20" />
    <circle cx="240" cy="250" r="6" fill={color} fillOpacity="0.15" />
  </svg>
);

const PartnersSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cat = categories[activeIndex];
  const Icon = cat.icon;

  return (
    <section id="solutions" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}
          >
            Maliyetlerini Düşür
            <br />
            <span className="text-gradient-primary">Ticaretini Büyüt</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4 max-w-md mx-auto" style={{ lineHeight: "1.7" }}>
            İşletmenize özel 50+ dijital çözümü tek platformda keşfedin.
          </p>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2.5 mb-16"
        >
          {categories.map((c, i) => (
            <motion.button
              key={c.label}
              onClick={() => setActiveIndex(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 20 } }}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeIndex === i
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_4px_16px_-4px_rgba(109,40,217,0.4)]"
                  : "text-slate-500 border-slate-200 hover:border-primary/30 hover:text-primary bg-white"
              }`}
            >
              {c.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col md:flex-row items-center gap-12"
            >
              {/* Left */}
              <div className="flex-1 space-y-5">
                <h3
                  className="text-2xl font-semibold text-foreground"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {cat.label}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed" style={{ lineHeight: "1.7" }}>
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.tags.map((tag, idx) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.08 + idx * 0.05 }}
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold border"
                      style={{
                        background: cat.accentBg,
                        color: cat.accent,
                        borderColor: `${cat.accent}22`,
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <Link to="/kobi/step-1" className="inline-block mt-2">
                  <motion.button
                    whileHover={{
                      scale: 1.04,
                      boxShadow: "0 8px 28px -4px rgba(109,40,217,0.45)",
                      transition: { type: "spring", stiffness: 320, damping: 18 },
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center px-7 py-3 rounded-full text-sm font-semibold text-white bg-primary"
                    style={{ boxShadow: "0 4px 16px -4px rgba(109,40,217,0.35)" }}
                  >
                    Çözümleri Keşfet
                  </motion.button>
                </Link>
              </div>

              {/* Right — Icon illustration */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex-1 max-w-md relative"
              >
                {/* Glow blob */}
                <div
                  className="absolute inset-[-20px] rounded-3xl blur-3xl pointer-events-none"
                  style={{ background: `${cat.accent}18`, zIndex: 0 }}
                />

                {/* Card */}
                <div
                  className="relative rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{
                    border: "1px solid rgba(255,255,255,0.9)",
                    outline: "1px solid hsl(252,20%,90%)",
                    outlineOffset: "0",
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.8) inset, 0 24px 64px -12px ${cat.accent}33`,
                    background: "rgba(255,255,255,0.97)",
                    minHeight: "280px",
                    zIndex: 1,
                  }}
                >
                  {cat.image ? (
                    /* Photo illustration */
                    <>
                      <motion.img
                        key={activeIndex}
                        src={cat.image}
                        alt={cat.label}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full h-full object-cover"
                        style={{ minHeight: "280px", maxHeight: "340px" }}
                      />
                      {/* Overlay gradient for readability */}
                      <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to top, ${cat.accent}44 0%, transparent 60%)` }} />
                      {/* Corner floating badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.28, type: "spring", stiffness: 280 }}
                        className="absolute top-4 right-4 rounded-xl px-3 py-2 z-10"
                        style={{
                          background: "rgba(255,255,255,0.92)",
                          backdropFilter: "blur(12px)",
                          border: `1px solid ${cat.accent}20`,
                          boxShadow: `0 4px 16px -4px ${cat.accent}22`,
                        }}
                      >
                        <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
                          Çözüm Sayısı
                        </p>
                        <p className="text-sm font-black" style={{ color: cat.accent }}>50+</p>
                      </motion.div>
                      {/* Bottom tag pill */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="absolute bottom-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold z-10"
                        style={{
                          background: "rgba(255,255,255,0.92)",
                          backdropFilter: "blur(12px)",
                          color: cat.accent,
                          border: `1px solid ${cat.accent}25`,
                        }}
                      >
                        {cat.tags[0]}
                      </motion.div>
                    </>
                  ) : (
                    /* Icon illustration fallback */
                    <>
                      {/* Gradient fill */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />
                      {/* Orbit rings */}
                      <OrbitRings color={cat.decorColor} />
                      {/* Center icon */}
                      <motion.div
                        key={activeIndex}
                        initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.05 }}
                        className="relative z-10 flex flex-col items-center gap-5"
                      >
                        <div
                          className="w-28 h-28 rounded-3xl flex items-center justify-center"
                          style={{
                            background: "rgba(255,255,255,0.9)",
                            border: `1.5px solid ${cat.accent}30`,
                            boxShadow: `0 8px 40px -8px ${cat.accent}55, 0 0 0 1px rgba(255,255,255,0.9) inset`,
                            backdropFilter: "blur(12px)",
                          }}
                        >
                          <Icon strokeWidth={1.4} style={{ color: cat.accent, width: 52, height: 52 }} />
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.18 }}
                          className="px-5 py-2 rounded-full text-xs font-bold tracking-wide"
                          style={{ background: cat.accentBg, color: cat.accent, border: `1px solid ${cat.accent}25` }}
                        >
                          {cat.tags[0]}
                        </motion.div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25, type: "spring", stiffness: 280 }}
                        className="absolute top-4 right-4 rounded-xl px-3 py-2 z-10"
                        style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", border: `1px solid ${cat.accent}20`, boxShadow: `0 4px 16px -4px ${cat.accent}22` }}
                      >
                        <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Çözüm Sayısı</p>
                        <p className="text-sm font-black" style={{ color: cat.accent }}>50+</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.32, type: "spring", stiffness: 280 }}
                        className="absolute bottom-4 left-4 rounded-xl px-3 py-2 z-10"
                        style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", border: `1px solid ${cat.accent}20`, boxShadow: `0 4px 16px -4px ${cat.accent}22` }}
                      >
                        <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Aktif Partner</p>
                        <p className="text-sm font-black" style={{ color: cat.accent }}>{cat.tags[1]}</p>
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
