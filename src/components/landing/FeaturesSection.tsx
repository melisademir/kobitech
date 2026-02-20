import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Store, ShoppingCart, BadgeDollarSign, MessageCircle, ClipboardList, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

const features = [
  {
    icon: Store,
    title: "50+ Çözüm Tek Platformda",
    desc: "Muhasebeden e-ticarete, ödemeden İK'ya kadar tüm ihtiyaçlarınız için çözüm ortaklarını tek yerden bulun, karşılaştırın.",
    labels: ["Muhasebe", "E-Ticaret", "İK", "Ödeme"],
    gradient: "from-violet-500/10 to-primary/5",
    iconBg: "from-violet-500 to-primary",
  },
  {
    icon: ShoppingCart,
    title: "Sepet ile Hızlı Planlama",
    desc: "İhtiyacınız olan çözümleri sepete ekleyin, tek seferde teklif alın. Zaman kaybetmeyin.",
    labels: ["Toplu Teklif", "Hızlı Başvuru", "Karşılaştırma"],
    gradient: "from-accent/10 to-emerald-500/5",
    iconBg: "from-accent to-emerald-500",
  },
  {
    icon: BadgeDollarSign,
    title: "Size Özel Teklif Sistemi",
    desc: "İhtiyaçlarınıza göre özel fiyatlandırma alın. Uzman ekibimiz veya bayilerimiz sizinle görüşerek en uygun paketi oluşturur.",
    labels: ["Özel Fiyat", "Uzman Destek", "Paket Oluşturma"],
    gradient: "from-amber-500/10 to-orange-500/5",
    iconBg: "from-amber-500 to-orange-500",
  },
  {
    icon: MessageCircle,
    title: "Anlık Görüşme & Destek",
    desc: "Bayiniz veya destek ekibimizle chat üzerinden anında görüşün. Sorularınız hemen yanıtlansın.",
    labels: ["Canlı Chat", "Bayi Görüşme"],
    gradient: "from-blue-500/10 to-cyan-500/5",
    iconBg: "from-blue-500 to-cyan-500",
  },
  {
    icon: ClipboardList,
    title: "Kolay Proje Takibi",
    desc: "Aldığınız hizmetleri tek ekrandan takip edin. Hangi aşamada, ne zaman tamamlanacak — hep bilgileriniz olsun.",
    labels: ["Durum Takibi", "Zaman Çizelgesi", "Tek Ekran"],
    gradient: "from-pink-500/10 to-rose-500/5",
    iconBg: "from-pink-500 to-rose-500",
  },
  {
    icon: FileText,
    title: "Dijital Döküman Merkezi",
    desc: "Tüm sözleşme, fatura ve belgeleriniz güvenle saklanır. 5 yıl boyunca istediğiniz zaman erişin, paylaşın.",
    labels: ["Sözleşmeler", "Faturalar", "5 Yıl Arşiv"],
    gradient: "from-indigo-500/10 to-violet-500/5",
    iconBg: "from-indigo-500 to-violet-500",
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 bg-background relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      {/* Header */}
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-5 tracking-wide uppercase"
        >
          Neden Kobi Dijital?
        </motion.span>
        <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-foreground mb-4 tracking-tight leading-tight">
          50+ Çözüm <span className="text-gradient-primary">Tek Platformda</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
          İşletmenizi Türkiye'den globale taşıyacak ölçeklenebilir dijital altyapı.
        </p>
      </motion.div>

      {/* Grid */}
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
            className="feature-card rounded-2xl p-7 flex flex-col relative overflow-hidden group cursor-default"
          >
            {/* Card bg gradient on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

            <div className="relative z-10">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.iconBg} flex items-center justify-center mb-5 shadow-sm`}>
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2 leading-snug">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{f.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-border/60">
                {f.labels.map((label) => (
                  <span
                    key={label}
                    className="inline-block px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-[11px] font-medium group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mt-16"
      >
        <div className="inline-block p-px rounded-2xl bg-gradient-to-r from-primary/30 via-accent/20 to-primary/20 mb-0">
          <div className="bg-muted/60 rounded-2xl px-10 py-8">
            <h3 className="text-xl md:text-2xl font-extrabold text-foreground mb-2">
              Dijital Dönüşümünüz<br />Burada Başlıyor
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
              3 kısa adımda işletmenizi tanıyalım ve size özel dijital dönüşüm yol haritanızı oluşturalım.
            </p>
            <Button asChild variant="default" size="lg" className="rounded-full px-8 shadow-premium hover:shadow-premium-hover gap-2">
              <Link to="/kobi/signup">Hemen Başla <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FeaturesSection;
