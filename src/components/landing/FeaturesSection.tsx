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
    iconBg: "bg-gradient-to-br from-violet-500/20 to-purple-600/10",
    iconColor: "text-violet-600",
    glow: "hover:shadow-[0_16px_48px_-12px_hsl(268,72%,38%/0.18)]",
    labelBg: "bg-violet-500/10 text-violet-700",
  },
  {
    icon: ShoppingCart,
    title: "Sepet ile Hızlı Planlama",
    desc: "İhtiyacınız olan çözümleri sepete ekleyin, tek seferde teklif alın. Zaman kaybetmeyin.",
    labels: ["Toplu Teklif", "Hızlı Başvuru", "Karşılaştırma"],
    iconBg: "bg-gradient-to-br from-cyan-500/20 to-teal-600/10",
    iconColor: "text-cyan-600",
    glow: "hover:shadow-[0_16px_48px_-12px_hsl(168,76%,42%/0.18)]",
    labelBg: "bg-cyan-500/10 text-cyan-700",
  },
  {
    icon: BadgeDollarSign,
    title: "Size Özel Teklif Sistemi",
    desc: "İhtiyaçlarınıza göre özel fiyatlandırma alın. Uzman ekibimiz veya bayilerimiz sizinle görüşerek en uygun paketi oluşturur.",
    labels: ["Özel Fiyat", "Uzman Destek", "Paket Oluşturma"],
    iconBg: "bg-gradient-to-br from-emerald-500/20 to-green-600/10",
    iconColor: "text-emerald-600",
    glow: "hover:shadow-[0_16px_48px_-12px_hsl(160,84%,39%/0.18)]",
    labelBg: "bg-emerald-500/10 text-emerald-700",
  },
  {
    icon: MessageCircle,
    title: "Anlık Görüşme & Destek",
    desc: "Bayiniz veya destek ekibimizle chat üzerinden anında görüşün. Sorularınız hemen yanıtlansın.",
    labels: ["Canlı Chat", "Bayi Görüşme"],
    iconBg: "bg-gradient-to-br from-orange-500/20 to-amber-600/10",
    iconColor: "text-orange-600",
    glow: "hover:shadow-[0_16px_48px_-12px_hsl(33,100%,57%/0.18)]",
    labelBg: "bg-orange-500/10 text-orange-700",
  },
  {
    icon: ClipboardList,
    title: "Kolay Proje Takibi",
    desc: "Aldığınız hizmetleri tek ekrandan takip edin. Hangi aşamada, ne zaman tamamlanacak — hep bilgileriniz olsun.",
    labels: ["Durum Takibi", "Zaman Çizelgesi", "Tek Ekran"],
    iconBg: "bg-gradient-to-br from-pink-500/20 to-rose-600/10",
    iconColor: "text-pink-600",
    glow: "hover:shadow-[0_16px_48px_-12px_hsl(330,80%,50%/0.18)]",
    labelBg: "bg-pink-500/10 text-pink-700",
  },
  {
    icon: FileText,
    title: "Dijital Döküman Merkezi",
    desc: "Tüm sözleşme, fatura ve belgeleriniz güvenle saklanır. 5 yıl boyunca istediğiniz zaman erişin, paylaşın.",
    labels: ["Sözleşmeler", "Faturalar", "5 Yıl Arşiv"],
    iconBg: "bg-gradient-to-br from-indigo-500/20 to-blue-600/10",
    iconColor: "text-indigo-600",
    glow: "hover:shadow-[0_16px_48px_-12px_hsl(217,91%,60%/0.18)]",
    labelBg: "bg-indigo-500/10 text-indigo-700",
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
        className="text-center mb-16"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-5 tracking-wide uppercase"
        >
          Neden Kobi Dijital?
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
          50+ Çözüm Tek Platformda
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed font-normal">
          İşletmenizi Türkiye'den globale taşıyacak<br className="hidden md:block" /> ölçeklenebilir dijital altyapı.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className={`glass-card rounded-2xl p-10 border border-white/30 shadow-card ${f.glow} transition-all duration-300 flex flex-col`}
          >
            <motion.div
              className={`w-13 h-13 w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center mb-6 border border-white/20`}
              whileHover={{ scale: 1.1, rotate: 8 }}
              transition={{ type: "spring", stiffness: 280 }}
            >
              <f.icon className={`w-5 h-5 ${f.iconColor}`} strokeWidth={1.75} />
            </motion.div>
            <h3 className="text-base font-bold text-foreground mb-3 leading-snug">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-normal">{f.desc}</p>
            <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-border/50">
              {f.labels.map((label) => (
                <span key={label} className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${f.labelBg}`}>
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
        className="text-center mt-16"
      >
        <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3 tracking-tight">
          Dijital Dönüşümünüz Burada Başlıyor
        </h3>
        <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto leading-relaxed">
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
