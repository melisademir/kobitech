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
      className="group relative flex flex-col"
      style={{
        background: "white",
        borderRadius: "24px",
        padding: "40px",
        border: "2px solid rgba(109,40,217,0.08)",
        boxShadow:
          "0 2px 4px rgba(109,40,217,0.04), 0 8px 16px rgba(109,40,217,0.05), 0 16px 32px rgba(109,40,217,0.03)",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 12px 24px rgba(109,40,217,0.10), 0 24px 48px rgba(109,40,217,0.10)",
        borderColor: "rgba(109,40,217,0.6)",
        backgroundColor: "rgba(245,243,255,0.5)",
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Icon */}
      <div className="mb-7 w-fit">
        <motion.div
          initial={{ scale: 0.8, rotate: -5 }}
          animate={inView ? { scale: 1, rotate: 0 } : { scale: 0.8, rotate: -5 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: index * 0.1 + 0.2 }}
          whileHover={{ scale: 1.1, rotate: 4, transition: { type: "spring", stiffness: 350, damping: 18 } }}
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, hsl(268,72%,60%), hsl(268,72%,38%))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 20px rgba(109,40,217,0.15)",
          }}
        >
          <f.icon className="w-8 h-8 text-white" strokeWidth={1.75} />
        </motion.div>
      </div>

      {/* Text */}
      <h3
        className="text-foreground font-bold mb-4 leading-snug"
        style={{ fontSize: "22px", letterSpacing: "-0.02em" }}
      >
        {f.title}
      </h3>
      <p
        className="text-slate-500 flex-1"
        style={{ fontSize: "16px", lineHeight: "1.7", marginBottom: "28px" }}
      >
        {f.desc}
      </p>

      {/* Pills */}
      <div className="flex flex-wrap gap-2 pt-5 border-t border-slate-100">
        {f.labels.map((label) => (
          <motion.span
            key={label}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(109,40,217,0.12)", transition: { duration: 0.2 } }}
            style={{
              display: "inline-block",
              padding: "6px 14px",
              borderRadius: "9999px",
              background: "rgba(109,40,217,0.08)",
              color: "hsl(268,72%,38%)",
              fontSize: "13px",
              fontWeight: 600,
              border: "1px solid rgba(109,40,217,0.15)",
              cursor: "default",
              transition: "background 0.2s",
            }}
          >
            {label}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => (
  <section
    id="features"
    className="relative overflow-hidden"
    style={{ paddingTop: "100px", paddingBottom: "80px", background: "linear-gradient(135deg, #F5F3FF 0%, #ffffff 60%)" }}
  >
    {/* Decorative orbs */}
    <div
      className="absolute pointer-events-none"
      style={{ top: "-100px", left: "-120px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)", filter: "blur(40px)" }}
    />
    <div
      className="absolute pointer-events-none"
      style={{ top: "40%", right: "-100px", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)", filter: "blur(40px)" }}
    />
    <div
      className="absolute pointer-events-none"
      style={{ bottom: "-80px", left: "35%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)", filter: "blur(40px)" }}
    />

    {/* Dot pattern */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(109,40,217,0.04) 2px, transparent 2px)",
        backgroundSize: "32px 32px",
      }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-20"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            display: "inline-block",
            padding: "10px 24px",
            borderRadius: "9999px",
            background: "linear-gradient(135deg, hsl(268,72%,44%), hsl(268,72%,38%))",
            color: "white",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "24px",
            boxShadow: "0 4px 16px rgba(109,40,217,0.25)",
          }}
        >
          Neden Kobi Dijital?
        </motion.span>

        <h2
          style={{
            fontSize: "clamp(42px, 6vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "20px",
            background: "linear-gradient(135deg, hsl(260,25%,11%) 0%, hsl(268,72%,38%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Tüm Çözümlere Tek Platformdan Ulaşın
        </h2>

        <p style={{ fontSize: "20px", color: "#4B5563", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto" }}>
          KOBİ'lerin dijital dönüşümünü kolaylaştıran, tek çatı altında eksiksiz bir ekosistem.
        </p>
      </motion.div>

      {/* Card Grid */}
      <div
        className="grid md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: "32px" }}
      >
        {features.map((f, i) => (
          <FeatureCard key={f.title} f={f} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
