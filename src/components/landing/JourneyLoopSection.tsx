import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CreditCard,
  ShoppingCart,
  Wallet,
  Package,
  Truck,
  Users,
  MapPin,
  ClipboardCheck,
  BadgePercent,
  Globe2,
  ArrowRight,
} from "lucide-react";

const journeySteps = [
  { id: 1, title: "Ödeme Al", description: "Türkiye'nin lider finansal teknoloji ekosistemi Param ile tanışın; ticaretinize güç katın. İster mağazanızda ister dijital kanallarda; Param Fiziki POS, Param Sanal POS ve Param Cep POS çözümlerimizle tüm tahsilat süreçlerinizi tek platformda birleştirin. Siz sadece işinizi büyütmeye odaklanın, ödemeleriniz Param güvencesiyle tıkır tıkır hesabınıza gelsin.", tags: ["Param Fiziki POS", "Param Sanal POS", "Param Cep POS"], icon: CreditCard },
  { id: 2, title: "E-Ticarete Açıl", description: "Online satışın gücüyle dükkanınızın sınırlarını aşın ve satışlarınızı artırın. Türkiye'nin önde gelen e-ticaret altyapı sağlayıcıları T-Soft, Ticimax ve İkas'ın sunduğu en uygun paketleri keşfedin. Online mağazanızı hızla kurarak satışa başlayın; çoklu kanal satış imkanlarıyla dijital dünyada büyümenin keyfini sürün.", tags: ["Ticimax", "İkas", "T-Soft"], icon: ShoppingCart },
  { id: 3, title: "Paranı Yönet", description: "Finrota'nın sunduğu Netahsilat, Netekstre, Nap360 ve Posrapor çözümleriyle nakit akışınızı düzenleyin, tüm para trafiğinizi güvenle yönetin. Kredim Business ile işletmenize uygun finansman imkanlarına ulaşarak ticaretinize güç katın. İşletmenize özel dijital çözümlerle finansal süreçlerinizde kontrolü her an elinizde tutun.", tags: ["Netahsilat", "Netekstre", "Nap360", "Posrapor", "Kredim Business"], icon: Wallet },
  { id: 4, title: "Stoğunu Kontrol Et", description: "Univera Stokbar ve Nebim V3 çözümleriyle depo yönetiminizi modernleştirin, ürün giriş çıkışlarını anlık verilerle izleyin. Akıllı stok planlama yöntemleriyle depo seviyelerinizi en ideal noktada tutun, fazla veya eksik stok riskini ortadan kaldırın. Tüm tedarik zincirinizi iyileştirerek operasyonel hataları ve fireleri en aza indirin; işletmenize özel dijital çözümlerle kârlılığınızı koruyun.", tags: ["Univera Stokbar", "Nebim V3"], icon: Package },
  { id: 5, title: "Ürünlerini Gönder", description: "Aras Kargo'nun geniş lojistik ağıyla ürünlerinizi Türkiye'nin her yerine hızlıca ulaştırın. E-ticaret entegrasyonu ile siparişlerinizi anında kargoya hazırlayın ve operasyonel iş yükünüzü hafifletin. Kurumsal indirimlerle gönderim maliyetlerinizi düşürürken, anlık takip sistemiyle müşterilerinize her adımda güven verin.", tags: ["Aras Kargo"], icon: Truck },
  { id: 6, title: "Ekibine Yön Ver", description: "Çalışanlarınızın işe başladığı günden emekli olacağı güne kadar tüm süreçlerini tek bir çatı altında toplayın. Özlük bilgilerini; maaş planlarını, izinlerini, mesailerini ve bordro hesaplarını Workcube HR ile güvenle yönetin.", tags: ["Workcube HR"], icon: Users },
  { id: 7, title: "Sahayı Yönet", description: "Saha satış ekiplerinizin rotalarını optimize edin, ziyaret planlarını oluşturun ve mobil operasyonlarınızı anlık verilerle yönetin. Univera EnRoute ile sahadan gelen verileri anında analiz ederek ekibinizin verimliliğini artırın.", tags: ["Univera EnRoute"], icon: MapPin },
  { id: 8, title: "İş Akışını Takip Et", description: "Sipariş girişinden teslimata kadar tüm süreci Univera Uni-Dox'un e-Dönüşüm ekosistemiyle yönetin; e-Arşiv, e-Fatura ve mutabakat işlemlerinizi yasal güvenceyle tek merkezde birleştirin. Paramtech Flows'un yapay zeka destekli akıllı altyapısıyla görev atama, süre takibi ve otomatik bildirimler üzerinden ekibinizin verimliliğini artırın. Tüm departmanlar arasındaki iş akışlarını tek bir panelden yöneterek operasyonel mükemmelliğe ulaşın.", tags: ["Uni-Dox", "Paramtech Flows"], icon: ClipboardCheck },
  { id: 9, title: "Teşviklerden Yararlan", description: "İşletmenize en uygun hibe ve teşvik programlarını uzman danışmanlarımızla birlikte saptayın. Sizi karmaşık başvuru dosyalarıyla uğraştırmıyor, her adımda profesyonel rehberlik sunarak doğrudan ilgili kurumlarla bir araya getiriyoruz. Böylece sunulan imkanlardan tam kapasiteyle faydalanın; ticaretinizi size özel hibe ve vergi avantajlarıyla büyütün.", tags: ["KOSGEB", "TÜBİTAK", "Ticaret Bakanlığı"], icon: BadgePercent },
  { id: 10, title: "Globale Açıl", description: "TÜSİAD, MÜSİAD, TOBB, İTO, HİB ve KAGİDER gibi Türkiye'nin en güçlü iş dünyası kuruluşlarının vizyonunu; Ticimax'ın e-ticaret altyapısını, Mükellef'in global şirketleşme gücünü ve profesyonel hukuki danışmanlık desteğini arkanıza alarak ticaretinizi sınırların ötesine taşıyın. KobiTech ile doğru pazara, doğru strateji ve tam dijital bir ekosistemle adım atın.", tags: ["TÜSİAD", "MÜSİAD", "TOBB", "İTO", "HİB", "KAGİDER", "Ticimax", "Mükellef"], icon: Globe2 },
];

/* Edges: Top 1-2-3, Right 4-5, Bottom 6-7-8, Left 9-10 */
const topItems = journeySteps.slice(0, 3);
const rightItems = journeySteps.slice(3, 5);
const bottomItems = journeySteps.slice(5, 8).reverse(); // right-to-left
const leftItems = journeySteps.slice(8, 10).reverse(); // bottom-to-top

interface StepChipProps {
  step: (typeof journeySteps)[0];
  isActive: boolean;
  onClick: () => void;
}

const StepChip = ({ step, isActive, onClick }: StepChipProps) => {
  const Icon = step.icon;
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2 cursor-pointer transition-all duration-300 whitespace-nowrap"
      style={{
        padding: isActive ? "12px 22px" : "10px 18px",
        borderRadius: "16px",
        fontSize: isActive ? "14px" : "13px",
        fontWeight: isActive ? 700 : 500,
        background: isActive
          ? "linear-gradient(135deg, hsl(268,72%,34%), hsl(268,80%,44%))"
          : "rgba(255,255,255,0.85)",
        color: isActive ? "white" : "hsl(260,12%,42%)",
        border: isActive ? "2px solid hsl(268,72%,34%)" : "2px solid rgba(109,40,217,0.12)",
        boxShadow: isActive
          ? "0 4px 20px -4px rgba(109,40,217,0.5), 0 0 30px -8px rgba(109,40,217,0.25)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{step.title}</span>
      {isActive && (
        <motion.span
          layoutId="journey-active-dot"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: "hsl(268,80%,60%)" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
};

const JourneyLoopSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = journeySteps[activeStep];

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-extrabold text-foreground"
            style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
          >
            İşletme Yolculuğun
            <br />
            <span className="text-gradient-primary">Tek Platformda</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto" style={{ fontSize: "18px", lineHeight: 1.7 }}>
            Adım adım büyüme döngüsüyle tüm ihtiyaçlarınızı karşılayın.
          </p>
        </motion.div>

        {/* The Loop layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* ── Top edge ── */}
          <div className="flex justify-center gap-3 mb-4">
            {topItems.map((s) => (
              <StepChip
                key={s.id}
                step={s}
                isActive={activeStep === s.id - 1}
                onClick={() => setActiveStep(s.id - 1)}
              />
            ))}
          </div>

          <div className="flex">
            {/* ── Left edge ── */}
            <div className="flex flex-col justify-center gap-3 mr-4">
              {leftItems.map((s) => (
                <StepChip
                  key={s.id}
                  step={s}
                  isActive={activeStep === s.id - 1}
                  onClick={() => setActiveStep(s.id - 1)}
                />
              ))}
            </div>

            {/* ── Central display ── */}
            <div
              className="flex-1 relative overflow-hidden flex items-center justify-center"
              style={{
                minHeight: "380px",
                borderRadius: "24px",
                border: "1.5px solid rgba(109,40,217,0.1)",
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Glow blob */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: "400px",
                  height: "400px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(109,40,217,0.06) 0%, transparent 70%)",
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 px-8 md:px-14 py-10 text-center max-w-3xl mx-auto"
                >
                  <h3
                    className="text-3xl md:text-4xl font-extrabold text-foreground mb-4"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {current.title}
                  </h3>
                  <p
                    className="text-muted-foreground leading-relaxed mb-8"
                    style={{ fontSize: "17px", lineHeight: 1.75 }}
                  >
                    {current.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2.5 mb-8">
                    {current.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block"
                        style={{
                          padding: "8px 20px",
                          borderRadius: "24px",
                          fontSize: "13px",
                          fontWeight: 600,
                          background: "rgba(109,40,217,0.06)",
                          color: "hsl(268,72%,38%)",
                          border: "1.5px solid rgba(109,40,217,0.12)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link to="/kobi/step-1" className="inline-block">
                    <button
                      className="inline-flex items-center gap-2 text-white font-bold transition-all duration-200 cursor-pointer"
                      style={{
                        height: "50px",
                        padding: "0 36px",
                        borderRadius: "24px",
                        fontSize: "15px",
                        background: "hsl(268,72%,38%)",
                        boxShadow: "0 4px 16px -4px rgba(109,40,217,0.35)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "hsl(268,72%,32%)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "hsl(268,72%,38%)";
                      }}
                    >
                      Çözümleri Keşfet <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Right edge ── */}
            <div className="flex flex-col justify-center gap-3 ml-4">
              {rightItems.map((s) => (
                <StepChip
                  key={s.id}
                  step={s}
                  isActive={activeStep === s.id - 1}
                  onClick={() => setActiveStep(s.id - 1)}
                />
              ))}
            </div>
          </div>

          {/* ── Bottom edge ── */}
          <div className="flex justify-center gap-3 mt-4">
            {bottomItems.map((s) => (
              <StepChip
                key={s.id}
                step={s}
                isActive={activeStep === s.id - 1}
                onClick={() => setActiveStep(s.id - 1)}
              />
            ))}
          </div>

          {/* Connecting line decoration */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              border: "2px dashed rgba(109,40,217,0.08)",
              borderRadius: "24px",
              margin: "28px 90px",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default JourneyLoopSection;
