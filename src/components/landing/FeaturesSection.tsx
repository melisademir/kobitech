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
      className="group relative flex flex-col transition-shadow duration-300"
      style={{
        background: "white",
        borderRadius: "16px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 8px rgba(72,11,135,0.11), 0 8px 32px rgba(72,11,135,0.11)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(72,11,135,0.14), 0 12px 40px rgba(72,11,135,0.16)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(72,11,135,0.11), 0 8px 32px rgba(72,11,135,0.11)";
      }}
    >
      <div className="p-3.5 md:p-8 flex flex-col flex-1">
        {/* Icon + Title — stacked on mobile, row on md+ */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2.5 md:mb-4">
          <div
            className="flex-shrink-0 flex items-center justify-center w-9 h-9 md:w-[52px] md:h-[52px]"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, hsl(268,72%,60%), hsl(268,72%,38%))",
              boxShadow: "0 4px 12px rgba(109,40,217,0.15)",
            }}
          >
            <f.icon className="w-4 h-4 md:w-6 md:h-6 text-white" strokeWidth={1.75} />
          </div>

          <h3
            className="text-foreground font-bold leading-snug text-[13px] md:text-xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            {f.title}
          </h3>
        </div>

        <p
          className="text-muted-foreground flex-1 text-[11px] md:text-base leading-relaxed"
          style={{ marginBottom: "12px" }}
        >
          {f.desc}
        </p>

        {/* Pills */}
        <div className="flex flex-wrap gap-1 md:gap-2.5 pt-3 md:pt-5 border-t" style={{ borderColor: "hsl(38,30%,88%)" }}>
          {f.labels.map((label) => (
            <span
              key={label}
              className="cursor-default text-[10px] md:text-[13px]"
              style={{
                display: "inline-block",
                padding: "4px 8px",
                borderRadius: "16px",
                background: "rgba(109,40,217,0.06)",
                color: "hsl(268,72%,38%)",
                fontWeight: 600,
                border: "1.5px solid rgba(109,40,217,0.12)",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => (
  <section
    id="features"
    className="relative overflow-hidden py-12 md:py-20 lg:py-24"
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
          className="text-5xl md:text-7xl font-extrabold text-gradient-heading"
          style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
        >
          Tüm Çözümlere Tek Platformdan Ulaşın
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
