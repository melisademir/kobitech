import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Store, ShoppingCart, BadgeDollarSign, MessageCircle, ClipboardList, FileText } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } }
};

const features = [
  {
    icon: Store,
    title: "Tüm Çözümlere Tek Platformdan Ulaşın",
    desc: "Muhasebeden e-ticarete, ödemeden İK'ya kadar tüm ihtiyaçlarınız için çözüm ortaklarını tek yerden bulun, karşılaştırın.",
    labels: ["Muhasebe", "E-Ticaret", "İK", "Ödeme"],
    iconColor: "#A0722A",
    iconBg: "rgba(160,114,42,0.10)"
  },
  {
    icon: ShoppingCart,
    title: "Sepet ile Hızlı Planlama",
    desc: "İhtiyacınız olan çözümleri sepete ekleyin, tek seferde teklif alın. Zaman kaybetmeyin.",
    labels: ["Toplu Teklif", "Hızlı Başvuru", "Karşılaştırma"],
    iconColor: "#C9963C",
    iconBg: "rgba(201,150,60,0.10)"
  },
  {
    icon: BadgeDollarSign,
    title: "Size Özel Teklif Sistemi",
    desc: "İhtiyaçlarınıza göre özel fiyatlandırma alın. Uzman ekibimiz veya bayilerimiz sizinle görüşerek en uygun paketi oluşturur.",
    labels: ["Özel Fiyat", "Uzman Destek", "Paket Oluşturma"],
    iconColor: "#B8832E",
    iconBg: "rgba(184,131,46,0.10)"
  },
  {
    icon: MessageCircle,
    title: "Anlık Görüşme & Destek",
    desc: "Bayiniz veya destek ekibimizle chat üzerinden anında görüşün. Sorularınız hemen yanıtlansın.",
    labels: ["Canlı Chat", "Bayi Görüşme"],
    iconColor: "#A0722A",
    iconBg: "rgba(160,114,42,0.10)"
  },
  {
    icon: ClipboardList,
    title: "Kolay Proje Takibi",
    desc: "Aldığınız hizmetleri tek ekrandan takip edin. Hangi aşamada, ne zaman tamamlanacak — hep bilgileriniz olsun.",
    labels: ["Durum Takibi", "Zaman Çizelgesi", "Tek Ekran"],
    iconColor: "#C9963C",
    iconBg: "rgba(201,150,60,0.10)"
  },
  {
    icon: FileText,
    title: "Dijital Döküman Merkezi",
    desc: "Tüm sözleşme, fatura ve belgeleriniz güvenle saklanır. 5 yıl boyunca istediğiniz zaman erişin, paylaşın.",
    labels: ["Sözleşmeler", "Faturalar", "5 Yıl Arşiv"],
    iconColor: "#B8832E",
    iconBg: "rgba(184,131,46,0.10)"
  }
];

const FeaturesSection = () => (
  <section id="features" className="py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-6">
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
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
          style={{
            background: "rgba(201,150,60,0.12)",
            color: "#A0722A",
            border: "1px solid rgba(201,150,60,0.25)"
          }}
        >
          Neden Kobi Dijital?
        </motion.span>
        <h2
          className="text-4xl md:text-5xl font-bold mb-5"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.15, color: "hsl(25,35%,12%)" }}
        >
          Tüm Çözümlere Tek Platformdan Ulaşın
        </h2>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={cardVariants}
            className="rounded-2xl flex flex-col group cursor-default"
            style={{
              background: "rgba(255,252,245,0.95)",
              border: "1px solid rgba(201,150,60,0.12)",
              outline: "1px solid hsl(38,20%,92%)",
              outlineOffset: "0px",
              padding: "2.5rem",
              boxShadow: "0 0 0 1px rgba(255,248,235,0.9) inset, 0 2px 20px -4px rgba(160,114,42,0.07)"
            }}
            whileHover={{
              y: -8,
              boxShadow: `0 0 0 1px rgba(255,248,235,0.9) inset, 0 20px 48px -8px rgba(201,150,60,0.18)`,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
          >
            <div className="relative mb-7 w-fit">
              <div className="absolute -inset-3 rounded-full" style={{ background: f.iconBg }} />
              <motion.div
                className="relative w-11 h-11 rounded-xl flex items-center justify-center bg-white"
                style={{
                  border: "1px solid rgba(201,150,60,0.18)",
                  boxShadow: "0 4px 12px -4px rgba(160,114,42,0.12)"
                }}
                whileHover={{ y: -5, scale: 1.1, transition: { type: "spring", stiffness: 350, damping: 18 } }}
              >
                <f.icon className="w-5 h-5" style={{ color: f.iconColor }} strokeWidth={1.75} />
              </motion.div>
            </div>
            <h3
              className="text-sm font-semibold mb-3 leading-snug"
              style={{ letterSpacing: "-0.01em", color: "hsl(25,35%,12%)" }}
            >
              {f.title}
            </h3>
            <p className="text-sm flex-1" style={{ color: "hsl(25,15%,48%)", lineHeight: "1.7" }}>
              {f.desc}
            </p>
            <div className="flex flex-wrap gap-2 mt-6 pt-5" style={{ borderTop: "1px solid hsl(38,20%,92%)" }}>
              {f.labels.map((label) => (
                <span
                  key={label}
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: f.iconBg, color: f.iconColor }}
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default FeaturesSection;
