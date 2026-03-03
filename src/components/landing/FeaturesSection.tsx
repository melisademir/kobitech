import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Store, ShoppingCart, BadgeDollarSign, MessageCircle, ClipboardList, FileText } from "lucide-react";

const features = [
  {
    icon: Store,
    title: "Tüm Çözümlere Tek Platformdan Ulaşın",
    desc: "Muhasebeden e-ticarete, ödemeden İK'ya kadar tüm ihtiyaçlarınız için çözüm ortaklarını tek yerden bulun, karşılaştırın.",
    labels: ["Muhasebe", "E-Ticaret", "İK", "Ödeme"],
  },
  {
    icon: ShoppingCart,
    title: "Sepet ile Hızlı Planlama",
    desc: "İhtiyacınız olan çözümleri sepete ekleyin, tek seferde teklif alın. Zaman kaybetmeyin.",
    labels: ["Toplu Teklif", "Hızlı Başvuru", "Karşılaştırma"],
  },
  {
    icon: BadgeDollarSign,
    title: "Size Özel Teklif Sistemi",
    desc: "İhtiyaçlarınıza göre özel fiyatlandırma alın. Uzman ekibimiz veya bayilerimiz sizinle görüşerek en uygun paketi oluşturur.",
    labels: ["Özel Fiyat", "Uzman Destek", "Paket Oluşturma"],
  },
  {
    icon: MessageCircle,
    title: "Anlık Görüşme & Destek",
    desc: "Bayiniz veya destek ekibimizle chat üzerinden anında görüşün. Sorularınız hemen yanıtlansın.",
    labels: ["Canlı Chat", "Bayi Görüşme"],
  },
  {
    icon: ClipboardList,
    title: "Kolay Proje Takibi",
    desc: "Aldığınız hizmetleri tek ekrandan takip edin. Hangi aşamada, ne zaman tamamlanacak — hep bilgileriniz olsun.",
    labels: ["Durum Takibi", "Zaman Çizelgesi", "Tek Ekran"],
  },
  {
    icon: FileText,
    title: "Dijital Döküman Merkezi",
    desc: "Tüm sözleşme, fatura ve belgeleriniz güvenle saklanır. 5 yıl boyunca istediğiniz zaman erişin, paylaşın.",
    labels: ["Sözleşmeler", "Faturalar", "5 Yıl Arşiv"],
  },
];

const FeatureCard = ({ f, index }: { f: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden"
      style={{
        background: "hsl(var(--card))",
        borderRadius: "20px",
        border: "1.5px solid hsl(var(--border) / 0.5)",
        minHeight: "320px",
      }}
      whileHover={{
        scale: 1.03,
        y: -5,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
    >
      <div className="p-5 md:p-8 flex flex-col flex-1 relative">
        {/* Title */}
        <h3
          className="text-foreground font-bold leading-snug text-base md:text-[22px] mb-2 md:mb-3"
          style={{ letterSpacing: "-0.02em", maxWidth: "75%" }}
        >
          {f.title}
        </h3>

        {/* Description */}
        <p
          className="text-muted-foreground text-xs md:text-[15px] leading-relaxed"
          style={{ maxWidth: "70%" }}
        >
          {f.desc}
        </p>

        {/* Icon — bottom right, large */}
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
          <div
            className="flex items-center justify-center w-16 h-16 md:w-24 md:h-24 transition-transform duration-300 group-hover:scale-110"
            style={{
              borderRadius: "16px",
              background: "linear-gradient(135deg, hsl(268 72% 60% / 0.12), hsl(268 72% 38% / 0.08))",
            }}
          >
            <f.icon
              className="w-8 h-8 md:w-12 md:h-12"
              style={{ color: "hsl(268,72%,38%)" }}
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => (
  <section
    id="features"
    className="relative overflow-hidden py-12 md:py-20"
  >
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-8 md:mb-20"
      >
        <h2
          className="text-5xl md:text-7xl font-extrabold text-foreground"
          style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
        >
          Tüm Çözümlere
          <br />
          <span className="text-gradient-primary">Tek Platformdan Ulaşın</span>
        </h2>

        <p className="text-muted-foreground text-sm md:text-lg whitespace-nowrap" style={{ lineHeight: 1.7, margin: "0 auto" }}>
          KOBİ'lerin dijital dönüşümünü kolaylaştıran, tek çatı altında eksiksiz bir ekosistem.
        </p>
      </motion.div>

      {/* Card Grid — 2 cols mobile, 3 cols desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
        {features.map((f, i) => (
          <FeatureCard key={f.title} f={f} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
