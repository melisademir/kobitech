import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import heroDashboard from "@/assets/hero-dashboard.png";

const categories = [
{
  label: "Teşviklerden Yararlan",
  color: "hsl(160, 84%, 39%)",
  description: "Devlet teşvikleri, hibe programları ve vergi avantajlarından yararlanarak maliyetlerinizi düşürün. Size uygun destekleri keşfedin ve başvuru süreçlerinizi kolaylaştırın.",
  tags: ["Hibe Programları", "Vergi Avantajları", "Başvuru Desteği"]
},
{
  label: "E-Ticarete Açıl",
  color: "hsl(268, 70%, 35%)",
  description: "Online satış kanallarınızı oluşturun, e-ticaret altyapınızı kurun ve dijital pazarlama stratejileriyle müşteri kitlenizi genişletin.",
  tags: ["E-Ticaret Altyapısı", "Çoklu Kanal Satış", "Mağaza Çözümleri"]
},
{
  label: "Ödeme Al",
  color: "hsl(0, 84%, 60%)",
  description: "Fiziksel ve online ödeme çözümleriyle tahsilat süreçlerinizi hızlandırın. POS, sanal POS ve mobil ödeme seçenekleriyle her kanaldan ödeme alın.",
  tags: ["Ödeme Çözümleri", "Dijital Finansal Yönetim", "Finansman Desteği"]
},
{
  label: "Paranı Yönet",
  color: "hsl(33, 100%, 57%)",
  description: "Nakit akışınızı optimize edin, muhasebe süreçlerinizi otomatikleştirin ve finansal raporlarınızla işletmenizin mali sağlığını takip edin.",
  tags: ["Muhasebe Çözümleri", "ERP Yazılımı", "Fatura Yönetimi"]
},
{
  label: "Üretimini Optimize Et",
  color: "hsl(200, 70%, 50%)",
  description: "Üretim süreçlerinizi dijitalleştirin, verimlilik analizi yapın ve operasyonel maliyetlerinizi minimize edin.",
  tags: ["Üretim Takibi", "Verimlilik Analizi", "Otomasyon"]
},
{
  label: "Stoğunu Kontrol Et",
  color: "hsl(200, 70%, 50%)",
  description: "Stok ve depo yönetiminizi dijitalleştirin. Min-max takibi, FIFO/LIFO ve tedarik zinciri optimizasyonu ile fire oranlarınızı düşürün.",
  tags: ["Kargo & Lojistik", "Depo Yönetimi", "Sipariş Takibi"]
},
{
  label: "Global Aç",
  color: "hsl(217, 91%, 60%)",
  description: "Yurt dışı pazarlara açılın. İhracat süreçleri, uluslararası ödeme altyapısı ve lojistik çözümleriyle globalleşme yolculuğunuza başlayın.",
  tags: ["Kurumsal Çözümler", "Global Şirket Kurulumu", "Bulut Altyapısı"]
},
{
  label: "Ekibini Güçlendir",
  color: "hsl(280, 60%, 50%)",
  description: "İK yönetimi, işe alım, eğitim programları ve performans takip sistemleriyle ekibinizi büyütün ve güçlendirin.",
  tags: ["İK Yönetimi", "Bordro Çözümleri", "Yetenek Arama"]
},
{
  label: "İşlerini Yönet",
  color: "hsl(33, 100%, 57%)",
  description: "ERP, fatura otomasyonu ve raporlama araçlarıyla tüm iş süreçlerinizi tek platformdan yönetin.",
  tags: ["ERP Çözümleri", "Fatura Otomasyonu", "Raporlama"]
}];


const PartnersSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cat = categories[activeIndex];

  return (
    <section id="solutions" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10">

          








          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Maliyetlerini Düşür
Ticaretini Büyüt
Dünyaya Açıl
          </h2>
        </motion.div>

        {/* Category Tags */}
        <motion.div initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-wrap justify-center gap-3 mb-14 items-center">

          {categories.map((c, i) =>
          <motion.button
            key={c.label}
            onClick={() => setActiveIndex(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
            activeIndex === i ?
            "text-primary-foreground shadow-md" :
            "text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground bg-transparent"}`
            }
            style={
            activeIndex === i ?
            { backgroundColor: c.color, borderColor: c.color } :
            undefined
            }>

              {c.label}
            </motion.button>
          )}
        </motion.div>

        {/* Content Card */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col md:flex-row items-center gap-10">

              {/* Left: Info */}
              <div className="flex-1 space-y-5">
                <h3 className="text-2xl font-bold text-foreground">{cat.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap gap-2">

                  {cat.tags.map((tag, idx) =>
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + idx * 0.06 }}
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium border"
                    style={{ color: cat.color, borderColor: cat.color, backgroundColor: `${cat.color}`.replace(')', ', 0.1)').replace('hsl(', 'hsla(') }}>

                      {tag}
                    </motion.span>
                  )}
                </motion.div>
                <Link to="/kobi/signup">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center px-7 py-3 rounded-full text-sm font-semibold text-primary-foreground transition-colors"
                    style={{ backgroundColor: cat.color }}>
                    Çözümleri Keşfet
                  </motion.button>
                </Link>
              </div>

              {/* Right: Screenshot */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex-1 max-w-md">

                <div className="rounded-2xl overflow-hidden border border-border shadow-[0_16px_48px_-12px_hsl(268,72%,38%/0.18)] bg-card">
                  <img
                    src={heroDashboard}
                    alt={`${cat.label} ekran görüntüsü`}
                    className="w-full h-auto" />

                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>);

};

export default PartnersSection;