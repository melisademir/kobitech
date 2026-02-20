import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Store, ShoppingCart, BadgeDollarSign, MessageCircle, ClipboardList, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any } },
};

const features = [
  {
    icon: Store,
    title: "50+ Çözüm Tek Platformda",
    desc: "Muhasebeden e-ticarete, ödemeden İK'ya kadar tüm ihtiyaçlarınız için çözüm ortaklarını tek yerden bulun, karşılaştırın.",
    labels: ["Muhasebe", "E-Ticaret", "İK", "Ödeme"],
    iconColor: "#6D28D9",
    iconBg: "rgba(109,40,217,0.08)",
  },
  {
    icon: ShoppingCart,
    title: "Sepet ile Hızlı Planlama",
    desc: "İhtiyacınız olan çözümleri sepete ekleyin, tek seferde teklif alın. Zaman kaybetmeyin.",
    labels: ["Toplu Teklif", "Hızlı Başvuru", "Karşılaştırma"],
    iconColor: "#7C3AED",
    iconBg: "rgba(124,58,237,0.08)",
  },
  {
    icon: BadgeDollarSign,
    title: "Size Özel Teklif Sistemi",
    desc: "İhtiyaçlarınıza göre özel fiyatlandırma alın. Uzman ekibimiz veya bayilerimiz sizinle görüşerek en uygun paketi oluşturur.",
    labels: ["Özel Fiyat", "Uzman Destek", "Paket Oluşturma"],
    iconColor: "#8B5CF6",
    iconBg: "rgba(139,92,246,0.08)",
  },
  {
    icon: MessageCircle,
    title: "Anlık Görüşme & Destek",
    desc: "Bayiniz veya destek ekibimizle chat üzerinden anında görüşün. Sorularınız hemen yanıtlansın.",
    labels: ["Canlı Chat", "Bayi Görüşme"],
    iconColor: "#6D28D9",
    iconBg: "rgba(109,40,217,0.08)",
  },
  {
    icon: ClipboardList,
    title: "Kolay Proje Takibi",
    desc: "Aldığınız hizmetleri tek ekrandan takip edin. Hangi aşamada, ne zaman tamamlanacak — hep bilgileriniz olsun.",
    labels: ["Durum Takibi", "Zaman Çizelgesi", "Tek Ekran"],
    iconColor: "#7C3AED",
    iconBg: "rgba(124,58,237,0.08)",
  },
  {
    icon: FileText,
    title: "Dijital Döküman Merkezi",
    desc: "Tüm sözleşme, fatura ve belgeleriniz güvenle saklanır. 5 yıl boyunca istediğiniz zaman erişin, paylaşın.",
    labels: ["Sözleşmeler", "Faturalar", "5 Yıl Arşiv"],
    iconColor: "#8B5CF6",
    iconBg: "rgba(139,92,246,0.08)",
  },
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
          className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 tracking-widest uppercase border border-primary/15"
        >
          Neden Kobi Dijital?
        </motion.span>
        <h2
          className="text-4xl md:text-5xl font-bold text-foreground mb-5"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}
        >
          50+ Çözüm Tek Platformda
        </h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto" style={{ lineHeight: "1.7" }}>
          İşletmenizi Türkiye'den globale taşıyacak
          <br className="hidden md:block" /> ölçeklenebilir dijital altyapı.
        </p>
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
              background: "rgba(255,255,255,0.9)",
              border: "1px solid rgba(255,255,255,0.95)",
              outline: "1px solid hsl(252,20%,91%)",
              outlineOffset: "0px",
              padding: "2.5rem",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.85) inset, 0 2px 20px -4px rgba(109,40,217,0.06)",
            }}
            whileHover={{
              y: -8,
              boxShadow: `0 0 0 1px rgba(255,255,255,0.85) inset, 0 20px 48px -8px rgba(109,40,217,0.14)`,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
          >
            {/* Icon with translucent circle */}
            <div className="relative mb-7 w-fit">
              <div
                className="absolute -inset-3 rounded-full"
                style={{ background: f.iconBg }}
              />
              <motion.div
                className="relative w-11 h-11 rounded-xl flex items-center justify-center bg-white border border-white/80"
                style={{ boxShadow: "0 4px 12px -4px rgba(109,40,217,0.10)" }}
                whileHover={{ y: -5, scale: 1.1, transition: { type: "spring", stiffness: 350, damping: 18 } }}
              >
                <f.icon className="w-5 h-5" style={{ color: f.iconColor }} strokeWidth={1.75} />
              </motion.div>
            </div>

            <h3
              className="text-sm font-semibold text-foreground mb-3 leading-snug"
              style={{ letterSpacing: "-0.01em" }}
            >
              {f.title}
            </h3>
            <p className="text-slate-500 text-sm flex-1" style={{ lineHeight: "1.7" }}>
              {f.desc}
            </p>

            <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-100">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mt-20"
      >
        <h3
          className="text-2xl md:text-3xl font-bold text-foreground mb-4"
          style={{ letterSpacing: "-0.025em" }}
        >
          Dijital Dönüşümünüz Burada Başlıyor
        </h3>
        <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto" style={{ lineHeight: "1.7" }}>
          3 kısa adımda işletmenizi tanıyalım ve size özel dijital dönüşüm yol haritanızı oluşturalım.
        </p>
        <Button asChild variant="hero" size="lg">
          <Link to="/kobi/signup">Hemen Başla <ArrowRight className="h-5 w-5 ml-1" /></Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default FeaturesSection;
