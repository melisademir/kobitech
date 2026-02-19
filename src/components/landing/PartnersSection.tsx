import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroDashboard from "@/assets/hero-dashboard.png";

const categories = [
  {
    label: "Teşviklerden Yararlan",
    color: "hsl(160, 84%, 39%)",
    description: "Devlet teşvikleri, hibe programları ve vergi avantajlarından yararlanarak maliyetlerinizi düşürün. Size uygun destekleri keşfedin ve başvuru süreçlerinizi kolaylaştırın.",
  },
  {
    label: "E-Ticarete Açıl",
    color: "hsl(268, 70%, 35%)",
    description: "Online satış kanallarınızı oluşturun, e-ticaret altyapınızı kurun ve dijital pazarlama stratejileriyle müşteri kitlenizi genişletin.",
  },
  {
    label: "Ödeme Al",
    color: "hsl(0, 84%, 60%)",
    description: "Fiziksel ve online ödeme çözümleriyle tahsilat süreçlerinizi hızlandırın. POS, sanal POS ve mobil ödeme seçenekleriyle her kanaldan ödeme alın.",
  },
  {
    label: "Paranı Yönet",
    color: "hsl(33, 100%, 57%)",
    description: "Nakit akışınızı optimize edin, muhasebe süreçlerinizi otomatikleştirin ve finansal raporlarınızla işletmenizin mali sağlığını takip edin.",
  },
  {
    label: "Üretimini Optimize Et",
    color: "hsl(200, 70%, 50%)",
    description: "Üretim süreçlerinizi dijitalleştirin, verimlilik analizi yapın ve operasyonel maliyetlerinizi minimize edin.",
  },
  {
    label: "Stoğunu Kontrol Et",
    color: "hsl(200, 70%, 50%)",
    description: "Stok ve depo yönetiminizi dijitalleştirin. Min-max takibi, FIFO/LIFO ve tedarik zinciri optimizasyonu ile fire oranlarınızı düşürün.",
  },
  {
    label: "Global Aç",
    color: "hsl(217, 91%, 60%)",
    description: "Yurt dışı pazarlara açılın. İhracat süreçleri, uluslararası ödeme altyapısı ve lojistik çözümleriyle globalleşme yolculuğunuza başlayın.",
  },
  {
    label: "Ekibini Güçlendir",
    color: "hsl(280, 60%, 50%)",
    description: "İK yönetimi, işe alım, eğitim programları ve performans takip sistemleriyle ekibinizi büyütün ve güçlendirin.",
  },
  {
    label: "İşlerini Yönet",
    color: "hsl(33, 100%, 57%)",
    description: "ERP, fatura otomasyonu ve raporlama araçlarıyla tüm iş süreçlerinizi tek platformdan yönetin.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const PartnersSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cat = categories[activeIndex];

  return (
    <section id="solutions" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
          <span className="inline-block px-5 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold mb-5 tracking-wide">
            Ekosistem
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Globalleşirken Yalnız Değilsin
          </h2>
        </motion.div>

        {/* Category Tags */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((c, i) => (
            <button
              key={c.label}
              onClick={() => setActiveIndex(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                activeIndex === i
                  ? "text-primary-foreground shadow-md scale-105"
                  : "text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground bg-transparent"
              }`}
              style={
                activeIndex === i
                  ? { backgroundColor: c.color, borderColor: c.color }
                  : undefined
              }
            >
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Content Card */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row items-center gap-10"
            >
              {/* Left: Info */}
              <div className="flex-1 space-y-5">
                <h3 className="text-2xl font-bold text-foreground">{cat.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>
                <button
                  className="inline-flex items-center px-7 py-3 rounded-full text-sm font-semibold text-primary-foreground transition-colors"
                  style={{ backgroundColor: cat.color }}
                >
                  Çözümleri Keşfet
                </button>
              </div>

              {/* Right: Screenshot */}
              <div className="flex-1 max-w-md">
                <div className="rounded-2xl overflow-hidden border border-border shadow-card">
                  <img
                    src={heroDashboard}
                    alt={`${cat.label} ekran görüntüsü`}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
