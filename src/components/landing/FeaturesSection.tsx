import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Store, ShoppingCart, BadgeDollarSign, MessageCircle, ClipboardList, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

const features = [
  {
    icon: Store,
    title: "50+ Çözüm Tek Platformda",
    desc: "Muhasebeden e-ticarete, ödemeden İK'ya kadar tüm ihtiyaçlarınız için çözüm ortaklarını tek yerden bulun, karşılaştırın.",
    labels: ["Muhasebe", "E-Ticaret", "İK", "Ödeme"],
    iconBg: "rgba(109,40,217,0.08)",
    iconColor: "text-primary",
    glow: "rgba(109,40,217,0.18)",
    labelStyle: { background: "rgba(109,40,217,0.08)", color: "#6D28D9" },
  },
  {
    icon: ShoppingCart,
    title: "Sepet ile Hızlı Planlama",
    desc: "İhtiyacınız olan çözümleri sepete ekleyin, tek seferde teklif alın. Zaman kaybetmeyin.",
    labels: ["Toplu Teklif", "Hızlı Başvuru", "Karşılaştırma"],
    iconBg: "rgba(124,58,237,0.08)",
    iconColor: "text-primary",
    glow: "rgba(124,58,237,0.18)",
    labelStyle: { background: "rgba(124,58,237,0.08)", color: "#7C3AED" },
  },
  {
    icon: BadgeDollarSign,
    title: "Size Özel Teklif Sistemi",
    desc: "İhtiyaçlarınıza göre özel fiyatlandırma alın. Uzman ekibimiz veya bayilerimiz sizinle görüşerek en uygun paketi oluşturur.",
    labels: ["Özel Fiyat", "Uzman Destek", "Paket Oluşturma"],
    iconBg: "rgba(147,51,234,0.08)",
    iconColor: "text-primary",
    glow: "rgba(147,51,234,0.18)",
    labelStyle: { background: "rgba(147,51,234,0.08)", color: "#9333EA" },
  },
  {
    icon: MessageCircle,
    title: "Anlık Görüşme & Destek",
    desc: "Bayiniz veya destek ekibimizle chat üzerinden anında görüşün. Sorularınız hemen yanıtlansın.",
    labels: ["Canlı Chat", "Bayi Görüşme"],
    iconBg: "rgba(168,85,247,0.08)",
    iconColor: "text-primary",
    glow: "rgba(168,85,247,0.18)",
    labelStyle: { background: "rgba(168,85,247,0.08)", color: "#A855F7" },
  },
  {
    icon: ClipboardList,
    title: "Kolay Proje Takibi",
    desc: "Aldığınız hizmetleri tek ekrandan takip edin. Hangi aşamada, ne zaman tamamlanacak — hep bilgileriniz olsun.",
    labels: ["Durum Takibi", "Zaman Çizelgesi", "Tek Ekran"],
    iconBg: "rgba(109,40,217,0.08)",
    iconColor: "text-primary",
    glow: "rgba(109,40,217,0.18)",
    labelStyle: { background: "rgba(109,40,217,0.08)", color: "#6D28D9" },
  },
  {
    icon: FileText,
    title: "Dijital Döküman Merkezi",
    desc: "Tüm sözleşme, fatura ve belgeleriniz güvenle saklanır. 5 yıl boyunca istediğiniz zaman erişin, paylaşın.",
    labels: ["Sözleşmeler", "Faturalar", "5 Yıl Arşiv"],
    iconBg: "rgba(124,58,237,0.08)",
    iconColor: "text-primary",
    glow: "rgba(124,58,237,0.18)",
    labelStyle: { background: "rgba(124,58,237,0.08)", color: "#7C3AED" },
  },
];

const FeaturesSection = () => (
  <section id="features" className="section-gap bg-background">
    <div className="max-w-7xl mx-auto px-6">
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
        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          50+ Çözüm Tek Platformda
        </h2>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto font-normal" style={{ lineHeight: "1.75" }}>
          İşletmenizi Türkiye'den globale taşıyacak
          <br className="hidden md:block" /> ölçeklenebilir dijital altyapı.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            className="rounded-2xl border border-white/25 transition-all duration-300 flex flex-col group"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 2px 24px -4px rgba(109,40,217,0.07), 0 1px 0 rgba(255,255,255,0.8) inset",
              padding: "2.5rem",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 48px -8px ${f.glow}, 0 1px 0 rgba(255,255,255,0.8) inset`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 24px -4px rgba(109,40,217,0.07), 0 1px 0 rgba(255,255,255,0.8) inset";
            }}
          >
            {/* Icon with large translucent circle behind */}
            <div className="relative mb-7 w-fit">
              {/* Large faded circle behind icon */}
              <div
                className="absolute -inset-3 rounded-full"
                style={{ background: f.iconBg }}
              />
              <motion.div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center border border-white/40"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "0 4px 16px -4px rgba(109,40,217,0.10)",
                }}
                whileHover={{ scale: 1.1, rotate: 8 }}
                transition={{ type: "spring", stiffness: 280 }}
              >
                <f.icon className={`w-5 h-5 ${f.iconColor}`} strokeWidth={1.75} />
              </motion.div>
            </div>

            <h3 className="text-base font-bold text-foreground mb-3 leading-snug">{f.title}</h3>
            <p className="text-muted-foreground text-sm font-normal flex-1" style={{ lineHeight: "1.7" }}>{f.desc}</p>

            <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-border/40">
              {f.labels.map((label) => (
                <span
                  key={label}
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                  style={f.labelStyle}
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
        <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Dijital Dönüşümünüz Burada Başlıyor
        </h3>
        <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto" style={{ lineHeight: "1.75" }}>
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
