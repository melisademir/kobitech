import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgePercent,
  ShoppingCart,
  CreditCard,
  Wallet,
  Factory,
  Package,
  Globe2,
  Users,
  ArrowRight,
} from "lucide-react";
import tabEticaret from "@/assets/tab-eticaret-ai.png";
import tabOdeme from "@/assets/tab-odeme-ai.png";
import tabPara from "@/assets/tab-para-ai.png";
import tabStok from "@/assets/tab-stok-ai.png";
import tabGlobal from "@/assets/tab-global-ai.png";
import tabEkip from "@/assets/tab-ekip-ai.png";
import tabTesvik from "@/assets/tab-tesvik-ai.png";
import tabUretim from "@/assets/tab-uretim-ai.png";

const categories = [
  {
    label: "Ödeme Al",
    description:
      "Türkiye'nin lider finansal teknoloji ekosistemi Param ile tanışın; ticaretinize güç katın. İster mağazanızda ister dijital kanallarda; Param Fiziki POS, Param Sanal POS ve Param Cep POS çözümlerimizle tüm tahsilat süreçlerinizi tek platformda birleştirin. Siz sadece işinizi büyütmeye odaklanın, ödemeleriniz Param güvencesiyle tıkır tıkır hesabınıza gelsin.",
    tags: ["Param Fiziki POS", "Param Sanal POS", "Param Cep POS"],
    icon: CreditCard,
    image: tabOdeme,
    accent: "#059669",
  },
  {
    label: "E-Ticarete Açıl",
    description:
      "Online satışın gücüyle dükkanınızın sınırlarını aşın ve müşteri ağınızı genişletin. Türkiye'nin önde gelen e-ticaret sistemleri T-Soft, Ticimax ve İkas arasından işletmenize en uygun olanı ParamTECH uzmanlığıyla belirleyin. İnternet mağazanızı hızla kurarak satışa başlayın; çoklu kanal satış imkanlarıyla dijital dünyada büyümenin avantajını yaşayın.",
    tags: ["E-Ticaret Altyapısı", "Çoklu Kanal Satış", "Mağaza Çözümleri"],
    icon: ShoppingCart,
    image: tabEticaret,
    accent: "#2563EB",
  },
  {
    label: "Paranı Yönet",
    description:
      "Finrota'nın sunduğu akıllı çözümlerle nakit akışınızı düzenleyin, tüm para trafiğinizi güvenle yönetin. Kredim üzerinden işletmenize uygun finansman imkanlarına ulaşarak ticaretinize güç katın. İşletmenize özel dijital çözümlerle finansal süreçlerinizi daha düzenli hale getirin ve kontrolü her an elinizde tutun.",
    tags: ["Muhasebe Çözümleri", "ERP Yazılımı", "Fatura Yönetimi"],
    icon: Wallet,
    image: tabPara,
    accent: "#D97706",
  },
  {
    label: "Stoğunu Kontrol Et",
    description:
      "Univera ve Nebim çözümleriyle depo yönetiminizi modernleştirin, ürün giriş çıkışlarını anlık verilerle izleyin. Akıllı stok planlama yöntemleriyle depo seviyelerinizi en ideal noktada tutun, fazla veya eksik stok riskini ortadan kaldırın. Tüm tedarik zincirinizi iyileştirerek operasyonel hataları ve fireleri en aza indirin; işletmenize özel dijital çözümlerle kârlılığınızı koruyun.",
    tags: ["Kargo & Lojistik", "Depo Yönetimi", "Sipariş Takibi"],
    icon: Package,
    image: tabStok,
    accent: "#0891B2",
  },
  {
    label: "Üretimini Optimize Et",
    description:
      "Üretim süreçlerinizi dijitalleştirerek verimliliğinizi artırabilir ve operasyonel maliyetlerinizi düşürebilirsiniz. Univera ve Nebim çözümleriyle üretim, stok ve finans süreçlerinizi entegre şekilde yöneterek operasyonlarınızı optimize edebilirsiniz.",
    tags: ["Üretim Takibi", "Verimlilik Analizi", "Otomasyon"],
    icon: Factory,
    image: tabUretim,
    accent: "#DC2626",
  },
  {
    label: "Ekibini Güçlendir",
    description:
      "İK süreçlerinizi daha etkin yönetmek için Türkiye'nin en büyük iş ilanı platformu Kariyer.net üzerinden iş ilanı yayınlayabilir, milyonlarca özgeçmiş arasından işletmenize uygun adaylara ulaşabilirsiniz. Böylece ekibinizi doğru yeteneklerle büyütebilirsiniz.",
    tags: ["İK Yönetimi", "Bordro Çözümleri", "Yetenek Arama"],
    icon: Users,
    image: tabEkip,
    accent: "#DB2777",
  },
  {
    label: "Teşviklerden Yararlan",
    description:
      "İşletmenize en uygun hibe ve teşvik fırsatlarını uzman danışmanlarımızla birlikte saptayın. Sizi karmaşık başvuru dosyalarıyla uğraştırmıyor, her adımda profesyonel rehberlik sunarak doğrudan ilgili kurumlarla bir araya getiriyoruz. Böylece sunulan imkanlardan tam kapasiteyle faydalanın; ticaretinizi size özel hibe ve vergi avantajlarıyla büyütün.",
    tags: ["KOSGEB", "TÜBİTAK", "Ticaret Bakanlığı"],
    icon: BadgePercent,
    image: tabTesvik,
    accent: "#7C3AED",
  },
  {
    label: "Globale Açıl",
    description:
      "Yurt dışı pazarlara açılmak için Mükellef çözümleri ile yurt dışında şirket kurabilir, vergi ve yasal süreçlerinizi yönetebilirsiniz. İhracat, uluslararası ödeme altyapısı ve lojistik süreçlerinizi oluşturarak global satış kanallarına açılabilirsiniz.",
    tags: ["Kurumsal Çözümler", "Global Şirket Kurulumu", "Bulut Altyapısı"],
    icon: Globe2,
    image: tabGlobal,
    accent: "#7C3AED",
  },
];

const PartnersSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cat = categories[activeIndex];

  return (
    <section id="solutions" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <h2
            className="text-5xl md:text-7xl font-extrabold text-foreground"
            style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
          >
            Ticaretini Büyüt
            <br />
            <span className="text-gradient-primary">Maliyetlerini Düşür</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto whitespace-nowrap" style={{ fontSize: "19px", lineHeight: "1.7" }}>
            İşletmenize özel 50+ dijital çözümü tek platformda keşfedin.
          </p>
        </motion.div>

        {/* Category Pills — corporate, no bounce */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center flex-wrap gap-2 mb-16"
        >
          {categories.map((c, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={c.label}
                onClick={() => setActiveIndex(i)}
                className="relative transition-all duration-250 cursor-pointer whitespace-nowrap flex-shrink-0"
                style={{
                  padding: isActive ? "10px 22px" : "8px 16px",
                  borderRadius: "24px",
                  fontSize: isActive ? "13.5px" : "12.5px",
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: isActive ? "0.04em" : "0.01em",
                  border: isActive ? "2px solid hsl(268,72%,34%)" : "2px solid rgba(109,40,217,0.15)",
                  background: isActive
                    ? "linear-gradient(135deg, hsl(268,72%,34%), hsl(268,80%,42%))"
                    : "white",
                  color: isActive ? "white" : "hsl(260,12%,48%)",
                  boxShadow: isActive
                    ? "0 4px 16px -4px rgba(109,40,217,0.45), 0 2px 6px rgba(72,11,135,0.15)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(109,40,217,0.4)";
                    e.currentTarget.style.color = "hsl(268,72%,38%)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(109,40,217,0.15)";
                    e.currentTarget.style.color = "hsl(260,12%,48%)";
                  }
                }}
              >
                {c.label}
                {/* Active indicator bar */}
                {isActive && (
                  <motion.span
                    layoutId="active-tab-indicator"
                    className="absolute bottom-[-2px] left-[20%] right-[20%] h-[4px] rounded-full"
                    style={{ background: "hsl(268,80%,55%)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col md:flex-row items-center gap-12"
            >
              {/* Left — Text */}
              <div className="flex-1 space-y-6">
                <h3
                  className="text-3xl font-bold text-foreground"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {cat.label}
                </h3>
                <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.75" }}>
                  {cat.description}
                </p>

                {/* Tags — corporate, sade */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block cursor-default"
                      style={{
                        padding: "8px 20px",
                        borderRadius: "24px",
                        fontSize: "13px",
                        fontWeight: 600,
                        letterSpacing: "0.01em",
                        background: "rgba(109,40,217,0.06)",
                        color: "hsl(268,72%,38%)",
                        border: "1.5px solid rgba(109,40,217,0.15)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA — large corporate button */}
                <Link to="/kobi/step-1" className="inline-block mt-3">
                  <button
                    className="inline-flex items-center gap-2 text-white font-bold transition-all duration-200"
                    style={{
                      height: "54px",
                      padding: "0 40px",
                      borderRadius: "24px",
                      fontSize: "15px",
                      background: "hsl(268,72%,38%)",
                      boxShadow: "0 4px 16px -4px rgba(109,40,217,0.35)",
                      minWidth: "220px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "hsl(268,72%,32%)";
                      e.currentTarget.style.boxShadow = "0 6px 24px -4px rgba(109,40,217,0.50)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "hsl(268,72%,38%)";
                      e.currentTarget.style.boxShadow = "0 4px 16px -4px rgba(109,40,217,0.35)";
                    }}
                  >
                    Çözümleri Keşfet <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>

              {/* Right — Image card with corporate shadow */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex-1 max-w-md relative"
              >
                <div
                  className="relative rounded-[20px] overflow-hidden"
                  style={{
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 2px 8px rgba(72,11,135,0.11), 0 8px 32px rgba(72,11,135,0.11)",
                    background: "white",
                    minHeight: "280px",
                  }}
                >
                  <img
                    key={activeIndex}
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover"
                    style={{ minHeight: "280px", maxHeight: "340px" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
