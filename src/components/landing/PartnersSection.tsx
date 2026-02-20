import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import tabTesvik from "@/assets/tab-tesvik.png";
import tabEticaret from "@/assets/tab-eticaret.png";
import tabOdeme from "@/assets/tab-odeme.png";
import tabPara from "@/assets/tab-para.png";
import tabUretim from "@/assets/tab-uretim.png";
import tabStok from "@/assets/tab-stok.png";
import tabGlobal from "@/assets/tab-global.png";
import tabEkip from "@/assets/tab-ekip.png";

const categories = [
  {
    label: "Teşviklerden Yararlan",
    description:
      "Devlet teşvikleri, hibe programları ve vergi avantajlarından yararlanarak maliyetlerinizi düşürün. Size uygun destekleri keşfedin ve başvuru süreçlerinizi kolaylaştırın.",
    tags: ["Hibe Programları", "Vergi Avantajları", "Başvuru Desteği"],
    image: tabTesvik,
  },
  {
    label: "E-Ticarete Açıl",
    description:
      "Online satış kanallarınızı oluşturun, e-ticaret altyapınızı kurun ve dijital pazarlama stratejileriyle müşteri kitlenizi genişletin.",
    tags: ["E-Ticaret Altyapısı", "Çoklu Kanal Satış", "Mağaza Çözümleri"],
    image: tabEticaret,
  },
  {
    label: "Ödeme Al",
    description:
      "Fiziksel ve online ödeme çözümleriyle tahsilat süreçlerinizi hızlandırın. POS, sanal POS ve mobil ödeme seçenekleriyle her kanaldan ödeme alın.",
    tags: ["Ödeme Çözümleri", "Dijital Finansal Yönetim", "Finansman Desteği"],
    image: tabOdeme,
  },
  {
    label: "Paranı Yönet",
    description:
      "Nakit akışınızı optimize edin, muhasebe süreçlerinizi otomatikleştirin ve finansal raporlarınızla işletmenizin mali sağlığını takip edin.",
    tags: ["Muhasebe Çözümleri", "ERP Yazılımı", "Fatura Yönetimi"],
    image: tabPara,
  },
  {
    label: "Üretimini Optimize Et",
    description:
      "Üretim süreçlerinizi dijitalleştirin, verimlilik analizi yapın ve operasyonel maliyetlerinizi minimize edin.",
    tags: ["Üretim Takibi", "Verimlilik Analizi", "Otomasyon"],
    image: tabUretim,
  },
  {
    label: "Stoğunu Kontrol Et",
    description:
      "Stok ve depo yönetiminizi dijitalleştirin. Min-max takibi, FIFO/LIFO ve tedarik zinciri optimizasyonu ile fire oranlarınızı düşürün.",
    tags: ["Kargo & Lojistik", "Depo Yönetimi", "Sipariş Takibi"],
    image: tabStok,
  },
  {
    label: "Global Aç",
    description:
      "Yurt dışı pazarlara açılın. İhracat süreçleri, uluslararası ödeme altyapısı ve lojistik çözümleriyle globalleşme yolculuğunuza başlayın.",
    tags: ["Kurumsal Çözümler", "Global Şirket Kurulumu", "Bulut Altyapısı"],
    image: tabGlobal,
  },
  {
    label: "Ekibini Güçlendir",
    description:
      "İK yönetimi, işe alım, eğitim programları ve performans takip sistemleriyle ekibinizi büyütün ve güçlendirin.",
    tags: ["İK Yönetimi", "Bordro Çözümleri", "Yetenek Arama"],
    image: tabEkip,
  },
];

const PartnersSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cat = categories[activeIndex];

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
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 tracking-widest uppercase border border-primary/15"
          >
            Çözümler
          </motion.span>
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
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/15"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <Link to="/kobi/signup" className="inline-block mt-2">
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

              {/* Right — Dashboard with overflow depth effect */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex-1 max-w-md relative"
              >
                {/* Glow blob behind */}
                <div
                  className="absolute inset-[-20px] rounded-3xl blur-3xl pointer-events-none"
                  style={{ background: "rgba(109,40,217,0.10)", zIndex: 0 }}
                />
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(255,255,255,0.9)",
                    outline: "1px solid hsl(252,20%,90%)",
                    outlineOffset: "0",
                    boxShadow:
                      "0 0 0 1px rgba(255,255,255,0.8) inset, 0 24px 64px -12px rgba(109,40,217,0.2)",
                    zIndex: 1,
                  }}
                >
                  <img
                    src={cat.image}
                    alt={`${cat.label} ekran görüntüsü`}
                    className="w-full h-auto"
                  />
                </div>
                {/* Overflow floating badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 280, damping: 18 }}
                  className="absolute -bottom-4 -right-4 rounded-xl px-4 py-3 z-10"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    outline: "1px solid hsl(252,20%,90%)",
                    boxShadow:
                      "0 0 0 1px rgba(255,255,255,0.8) inset, 0 8px 24px -4px rgba(109,40,217,0.15)",
                  }}
                >
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
                    Aktif Çözüm
                  </p>
                  <p className="text-sm font-bold text-primary">
                    {cat.tags[0]}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
