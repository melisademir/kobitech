import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Target, BarChart3, Store, ShoppingCart, BadgeDollarSign, MessageCircle, ClipboardList, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

const features = [
{ icon: Bot, title: "Yapay Zeka ile Hızlı Başlangıç", desc: "AI asistanımız işletmenizi analiz eder, size özel dijital dönüşüm planı hazırlar. Form doldurmaya gerek yok, sadece derdini anlat.", labels: ["AI Analiz", "Otomatik Plan", "Sektör Eşleştirme"] },
{ icon: Target, title: "Hedef Odaklı Aksiyon Planları", desc: "İhracat, e-ticaret, maliyet düşürme — hangi hedefiniz varsa size özel yapılacaklar listesi ve yol haritası oluşturuyoruz.", labels: ["İhracat", "E-Ticaret", "Maliyet Azaltma"] },
{ icon: BarChart3, title: "Dijital Olgunluk Ölçümü", desc: "Global Readiness Level ile işletmenizin dijital seviyesini ölçün, sektör ortalamasıyla karşılaştırın, eksiklerinizi görün.", labels: ["Readiness Level", "Sektör Karşılaştırma", "İlerleme Takibi"] },
{ icon: Store, title: "50+ Çözüm Tek Platformda", desc: "Muhasebeden e-ticarete, ödemeden İK'ya kadar tüm ihtiyaçlarınız için çözüm ortaklarını tek yerden bulun, karşılaştırın.", labels: ["Muhasebe", "E-Ticaret", "İK", "Ödeme"] },
{ icon: ShoppingCart, title: "Sepet ile Hızlı Planlama", desc: "İhtiyacınız olan çözümleri sepete ekleyin, tek seferde teklif alın. Zaman kaybetmeyin.", labels: ["Toplu Teklif", "Hızlı Başvuru", "Karşılaştırma"] },
{ icon: BadgeDollarSign, title: "Size Özel Teklif Sistemi", desc: "İhtiyaçlarınıza göre özel fiyatlandırma alın. Uzman ekibimiz veya bayilerimiz sizinle görüşerek en uygun paketi oluşturur.", labels: ["Özel Fiyat", "Uzman Destek", "Paket Oluşturma"] },
{ icon: MessageCircle, title: "Anlık Görüşme & Destek", desc: "Bayiniz veya destek ekibimizle chat üzerinden anında görüşün. Sorularınız hemen yanıtlansın, pazarlık yapın.", labels: ["Canlı Chat", "Bayi Görüşme", "Pazarlık"] },
{ icon: ClipboardList, title: "Kolay Proje Takibi", desc: "Aldığınız hizmetleri tek ekrandan takip edin. Hangi aşamada, ne zaman tamamlanacak — hep bilgileriniz olsun.", labels: ["Durum Takibi", "Zaman Çizelgesi", "Tek Ekran"] },
{ icon: FileText, title: "Dijital Döküman Merkezi", desc: "Tüm sözleşme, fatura ve belgeleriniz güvenle saklanır. 5 yıl boyunca istediğiniz zaman erişin, paylaşın.", labels: ["Sözleşmeler", "Faturalar", "5 Yıl Arşiv"] }];


const FeaturesSection = () =>
<section id="features" className="py-20 bg-background">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-14">

        <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 tracking-wide uppercase">

          Neden Kobi Dijital?
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
          50+ Çözüm Tek Platformda
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">İşletmenizi Türkiye'den globale taşıyacak ölçeklenebilir dijital altyapı.

      </p>
      </motion.div>

      <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {features.map((f) =>
      <motion.div
        key={f.title}
        variants={cardVariants}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        className="bg-card rounded-2xl p-7 border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col">

            <motion.div
          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5"
          whileHover={{ scale: 1.1, rotate: 8 }}
          transition={{ type: "spring", stiffness: 300 }}>

              <f.icon className="w-6 h-6 text-primary" />
            </motion.div>
            <h3 className="text-base font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1">{f.desc}</p>
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              {f.labels.map((label) =>
          <span key={label} className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{label}</span>
          )}
            </div>
          </motion.div>
      )}
      </motion.div>

      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-center mt-14">

        <h3 className="text-xl md:text-2xl font-extrabold text-foreground mb-2">Dijital Dönüşümünüz<br />Burada Başlıyor</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">3 kısa adımda işletmenizi tanıyalım ve size özel dijital dönüşüm yol haritanızı oluşturalım.</p>
        <Button asChild variant="hero" size="lg">
          <Link to="/kobi/signup">Hemen Başla <ArrowRight className="h-5 w-5 ml-1" /></Link>
        </Button>
      </motion.div>
    </div>
  </section>;


export default FeaturesSection;