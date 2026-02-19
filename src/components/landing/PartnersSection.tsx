import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";

const brands = [
  {
    name: "Param",
    color: "#FF6B00",
    bgColor: "rgba(255, 107, 0, 0.12)",
    icon: "₱",
    description:
      "Dijital ödeme altyapısıyla işletmenizi geleceğe taşıyın. Param'ın yenilikçi POS, ödeme ve finans çözümleriyle tahsilat süreçlerinizi kolaylaştırın, nakit akışınızı optimize edin.",
  },
  {
    name: "Finrota",
    color: "#E8344E",
    bgColor: "rgba(232, 52, 78, 0.12)",
    icon: "≋",
    description:
      "Karmaşık finansal süreçlerinizi basit, güvenli ve akıllı dijital platformlara taşıyın. Finrota'nın yenilikçi online tahsilat ve açık bankacılık çözümleriyle operasyonel verimliliğinizi katlayın, zamandan ve maliyetten tasarruf edin.",
  },
  {
    name: "Univera",
    color: "#2DB84B",
    bgColor: "rgba(45, 184, 75, 0.12)",
    icon: "✕",
    description:
      "İş süreçlerinizi uçtan uca dijitalleştirin. Univera'nın ERP ve iş yönetimi çözümleriyle stok, satış ve müşteri yönetimini tek platformda birleştirin.",
  },
  {
    name: "Kredim",
    color: "#E5B800",
    bgColor: "rgba(229, 184, 0, 0.12)",
    icon: "⚡",
    description:
      "KOBİ'lerin finansmana erişimini kolaylaştıran dijital kredi platformu. Kredim ile hızlı başvuru, uygun faiz ve esnek ödeme seçenekleriyle işletmenizi büyütün.",
  },
  {
    name: "Koru Sigorta",
    color: "#0A7B7B",
    bgColor: "rgba(10, 123, 123, 0.12)",
    icon: "✎",
    description:
      "İşletmenizi risklere karşı koruyun. Koru Sigorta'nın dijital sigorta çözümleriyle kolay teklif alın, poliçelerinizi tek ekranda yönetin ve güvencede olun.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const PartnersSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const brand = brands[activeIndex];

  const prev = () => setActiveIndex((i) => (i === 0 ? brands.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === brands.length - 1 ? 0 : i + 1));

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

        {/* Brand Icons Row */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-14">
          {brands.map((b, i) => (
            <button
              key={b.name}
              onClick={() => setActiveIndex(i)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 border-2 ${
                activeIndex === i ? "scale-110 shadow-lg" : "opacity-60 hover:opacity-100"
              }`}
              style={{
                backgroundColor: activeIndex === i ? b.bgColor : "transparent",
                borderColor: activeIndex === i ? b.color : "hsl(var(--border))",
                color: b.color,
              }}
              aria-label={b.name}
            >
              {b.icon}
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
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{brand.name}</h3>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">
                    a <span className="font-bold tracking-wide">PARAM</span> company
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {brand.description}
                </p>
                <button
                  className="inline-flex items-center px-7 py-3 rounded-full text-sm font-semibold text-primary-foreground transition-colors"
                  style={{ backgroundColor: "hsl(var(--primary))" }}
                >
                  Hemen Başla
                </button>
              </div>

              {/* Right: Screenshot */}
              <div className="flex-1 max-w-md">
                <div className="rounded-2xl overflow-hidden border border-border shadow-card">
                  <img
                    src={heroDashboard}
                    alt={`${brand.name} ekran görüntüsü`}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Önceki"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium text-muted-foreground min-w-[40px] text-center">
              {activeIndex + 1} / {brands.length}
            </span>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Sonraki"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
