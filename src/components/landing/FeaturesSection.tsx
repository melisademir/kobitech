import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } }),
};

const features = [
  { icon: "🤖", title: "Yapay Zeka ile Hızlı Başlangıç", desc: "AI asistanımız işletmenizi analiz eder, size özel dijital dönüşüm planı hazırlar. Form doldurmaya gerek yok, sadece derdini anlat." },
  { icon: "🎯", title: "Hedef Odaklı Aksiyon Planları", desc: "İhracat, e-ticaret, maliyet düşürme — hangi hedefiniz varsa size özel yapılacaklar listesi ve yol haritası oluşturuyoruz." },
  { icon: "📊", title: "Dijital Olgunluk Ölçümü", desc: "Global Readiness Level ile işletmenizin dijital seviyesini ölçün, sektör ortalamasıyla karşılaştırın, eksiklerinizi görün." },
  { icon: "🛍️", title: "50+ Çözüm Tek Platformda", desc: "Muhasebeden e-ticarete, ödemeden İK'ya kadar tüm ihtiyaçlarınız için çözüm ortaklarını tek yerden bulun, karşılaştırın." },
  { icon: "🛒", title: "Sepet ile Hızlı Planlama", desc: "İhtiyacınız olan çözümleri sepete ekleyin, tek seferde teklif alın. Zaman kaybetmeyin." },
  { icon: "💰", title: "Size Özel Teklif Sistemi", desc: "İhtiyaçlarınıza göre özel fiyatlandırma alın. Uzman ekibimiz veya bayilerimiz sizinle görüşerek en uygun paketi oluşturur." },
  { icon: "💬", title: "Anlık Görüşme & Destek", desc: "Bayiniz veya destek ekibimizle chat üzerinden anında görüşün. Sorularınız hemen yanıtlansın, pazarlık yapın." },
  { icon: "📋", title: "Kolay Proje Takibi", desc: "Aldığınız hizmetleri tek ekrandan takip edin. Hangi aşamada, ne zaman tamamlanacak — hep bilgileriniz olsun." },
  { icon: "📄", title: "Dijital Döküman Merkezi", desc: "Tüm sözleşme, fatura ve belgeleriniz güvenle saklanır. 5 yıl boyunca istediğiniz zaman erişin, paylaşın." },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 bg-background">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 tracking-wide uppercase">Neden Dijital Esnaf?</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
          Bankacılık ve Dijital Çözümler,<br />İşletmeniz İçin Tek Platformda
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          KOBİ'nizi Türkiye'den globale taşıyacak ölçeklenebilir dijital altyapı.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
            className="bg-card rounded-2xl p-7 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-2xl">
              {f.icon}
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mt-14">
        <p className="text-muted-foreground mb-6">Dijital dönüşüm yolculuğunuza bugün başlayın</p>
        <Button asChild variant="hero" size="lg">
          <Link to="/kobi/signup">Ücretsiz Deneyin <ArrowRight className="h-5 w-5 ml-1" /></Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default FeaturesSection;
