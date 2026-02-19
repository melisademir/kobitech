import { motion } from "framer-motion";
import { LayoutDashboard, Brain, Globe, Shield, Zap, BarChart3 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1 } }),
};

const features = [
  { icon: LayoutDashboard, title: "Tek Panelde Yönetim", desc: "Lojistik, ödeme, e-ticaret, muhasebe — tüm iş süreçlerinizi tek ekrandan takip edin." },
  { icon: Brain, title: "Akıllı Yol Haritası", desc: "İşletmenize özel dijital dönüşüm planı oluşturuyor, adım adım yönlendiriyoruz." },
  { icon: Globe, title: "Globalleşme Desteği", desc: "Türkiye'den dünya pazarlarına açılmanız için altyapı ve partner ağı sunuyoruz." },
  { icon: Shield, title: "Güvenli Altyapı", desc: "Verileriniz şifreli, KVKK uyumlu altyapımızla güvende." },
  { icon: Zap, title: "Hızlı Entegrasyon", desc: "Mevcut sistemlerinize dakikalar içinde entegre olun, iş kaybı yaşamayın." },
  { icon: BarChart3, title: "Performans Analizi", desc: "Gerçek zamanlı raporlarla işletmenizin dijital performansını ölçün." },
];

const FeaturesSection = () => (
  <section id="features" className="py-20">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 tracking-wide uppercase">Neden Dijital Esnaf?</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
          Bankacılık ve Dijital Çözümler,<br />İşletmeniz İçin Tek Platformda
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Sadece dijitalleştirmiyoruz; KOBİ'nizi Türkiye'den alıp globale taşıyacak ölçeklenebilir altyapı kuruyoruz.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
            className="bg-card rounded-2xl p-7 border border-border shadow-card hover:shadow-card-hover transition-all group">
            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
