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

/* Edges: Top 1-2-3, Right 4-5, Bottom 8-7-6, Left 10-9 */
const topItems = journeySteps.slice(0, 3);
const rightItems = journeySteps.slice(3, 5);
const bottomItems = journeySteps.slice(5, 8).reverse();
const leftItems = journeySteps.slice(8, 10).reverse();

/* Which color segment does each step belong to? */
const getSegment = (id: number): "purple-light" | "teal" | "purple-deep" => {
  if (id <= 3) return "purple-light";
  if (id <= 7) return "teal";
  return "purple-deep";
};

interface StepChipProps {
  step: (typeof journeySteps)[0];
  isActive: boolean;
  onClick: () => void;
}

const StepChip = ({ step, isActive, onClick }: StepChipProps) => {
  const Icon = step.icon;
  const seg = getSegment(step.id);

  const activeGlow: Record<string, string> = {
    "purple-light": "0 4px 24px -4px rgba(168,85,247,0.55), 0 0 40px -8px rgba(168,85,247,0.3)",
    teal: "0 4px 24px -4px rgba(20,184,166,0.55), 0 0 40px -8px rgba(20,184,166,0.3)",
    "purple-deep": "0 4px 24px -4px rgba(107,33,168,0.6), 0 0 40px -8px rgba(107,33,168,0.35)",
  };

  const activeBg: Record<string, string> = {
    "purple-light": "linear-gradient(135deg, hsl(268,60%,72%), hsl(280,65%,62%))",
    teal: "linear-gradient(135deg, hsl(174,60%,42%), hsl(168,55%,38%))",
    "purple-deep": "linear-gradient(135deg, hsl(268,76%,33%), hsl(280,72%,42%))",
  };

  const activeBorder: Record<string, string> = {
    "purple-light": "hsl(268,60%,72%)",
    teal: "hsl(174,55%,42%)",
    "purple-deep": "hsl(268,76%,33%)",
  };

  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2 cursor-pointer transition-all duration-300 whitespace-nowrap"
      style={{
        padding: isActive ? "12px 24px" : "10px 18px",
        borderRadius: "16px",
        fontSize: isActive ? "14px" : "13px",
        fontWeight: isActive ? 700 : 600,
        transform: isActive ? "scale(1.08)" : "scale(1)",
        background: isActive
          ? activeBg[seg]
          : "rgba(255,255,255,0.3)",
        color: "white",
        border: isActive
          ? `2px solid ${activeBorder[seg]}`
          : "2px solid rgba(255,255,255,0.35)",
        boxShadow: isActive
          ? activeGlow[seg]
          : "0 2px 8px rgba(0,0,0,0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        textShadow: isActive ? "0 1px 4px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.15)",
      }}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{step.title}</span>
    </button>
  );
};

/* ── SVG Track: thick 3-color interlocking arrow loop ── */
const LoopTrackSVG = () => {
  // Track parameters
  const t = 48; // track thickness
  const r = 40; // corner radius
  const arrow = 32; // arrow point size

  // Outer bounds of the track rectangle
  const x1 = 0, y1 = 0, x2 = 1000, y2 = 520;

  // Colors
  const purpleLight1 = "hsl(268,55%,85%)";
  const purpleLight2 = "hsl(275,50%,78%)";
  const teal1 = "hsl(174,52%,72%)";
  const teal2 = "hsl(168,48%,58%)";
  const purpleDeep1 = "hsl(268,76%,33%)";
  const purpleDeep2 = "hsl(280,68%,52%)";

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`${x1 - 10} ${y1 - 10} ${x2 - x1 + 20} ${y2 - y1 + 20}`}
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="jl-grad1" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor={purpleLight1} />
          <stop offset="100%" stopColor={purpleLight2} />
        </linearGradient>
        <linearGradient id="jl-grad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={teal1} />
          <stop offset="100%" stopColor={teal2} />
        </linearGradient>
        <linearGradient id="jl-grad3" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor={purpleDeep1} />
          <stop offset="100%" stopColor={purpleDeep2} />
        </linearGradient>
      </defs>

      {/* Segment 1 — Light Purple: Top edge + top-right corner 
          Covers steps 1,2,3. Goes from top-left → across top → down to ~40% of right side */}
      <path
        d={`
          M ${x1 + r},${y1}
          L ${x2 - r},${y1}
          Q ${x2},${y1} ${x2},${y1 + r}
          L ${x2},${y2 * 0.35}
          L ${x2 - arrow},${y2 * 0.35 + arrow}
          L ${x2 - t},${y2 * 0.35}
          L ${x2 - t},${y1 + r}
          Q ${x2 - t},${y1 + t} ${x2 - r},${y1 + t}
          L ${x1 + r},${y1 + t}
          Q ${x1 + t},${y1 + t} ${x1 + t},${y1 + r}
          L ${x1 + t},${y1}
          Q ${x1},${y1} ${x1},${y1}
          Z
        `}
        fill="url(#jl-grad1)"
        opacity="0.85"
      />

      {/* Segment 2 — Teal: Rest of right side + bottom-right corner + bottom edge
          Covers steps 4,5,6,7. From ~40% right → down → across bottom → up to ~60% of left */}
      <path
        d={`
          M ${x2},${y2 * 0.35}
          L ${x2},${y2 - r}
          Q ${x2},${y2} ${x2 - r},${y2}
          L ${x1 + r},${y2}
          Q ${x1},${y2} ${x1},${y2 - r}
          L ${x1},${y2 * 0.65}
          L ${x1 + arrow},${y2 * 0.65 - arrow}
          L ${x1 + t},${y2 * 0.65}
          L ${x1 + t},${y2 - r}
          Q ${x1 + t},${y2 - t} ${x1 + r},${y2 - t}
          L ${x2 - r},${y2 - t}
          Q ${x2 - t},${y2 - t} ${x2 - t},${y2 - r}
          L ${x2 - t},${y2 * 0.35 + arrow}
          L ${x2 - arrow},${y2 * 0.35 + arrow}
          Z
        `}
        fill="url(#jl-grad2)"
        opacity="0.85"
      />

      {/* Segment 3 — Deep Purple: Left side going up
          Covers steps 8,9,10. From ~60% left → up → connects back to top-left */}
      <path
        d={`
          M ${x1},${y2 * 0.65}
          L ${x1},${y1 + r}
          Q ${x1},${y1} ${x1 + r},${y1}
          L ${x1 + t},${y1}
          Q ${x1 + t},${y1 + t} ${x1 + r},${y1 + t}
          L ${x1 + t},${y1 + t}
          L ${x1 + t},${y2 * 0.65 - arrow}
          L ${x1 + arrow},${y2 * 0.65 - arrow}
          Z
        `}
        fill="url(#jl-grad3)"
        opacity="0.9"
      />
    </svg>
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
          {/* ── Thick 3-color track ── */}
          <div className="absolute inset-0 pointer-events-none" style={{ margin: "-8px -16px" }}>
            <LoopTrackSVG />
          </div>

          {/* ── Top edge ── */}
          <div className="relative z-10 flex justify-center gap-3 mb-4 py-3">
            {topItems.map((s) => (
              <StepChip
                key={s.id}
                step={s}
                isActive={activeStep === s.id - 1}
                onClick={() => setActiveStep(s.id - 1)}
              />
            ))}
          </div>

          <div className="flex relative z-10">
            {/* ── Left edge ── */}
            <div className="flex flex-col justify-center gap-3 px-3 py-2" style={{ minWidth: "180px" }}>
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
                background: "rgba(255,255,255,0.85)",
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
            <div className="flex flex-col justify-center gap-3 px-3 py-2" style={{ minWidth: "180px" }}>
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
          <div className="relative z-10 flex justify-center gap-3 mt-4 py-3">
            {bottomItems.map((s) => (
              <StepChip
                key={s.id}
                step={s}
                isActive={activeStep === s.id - 1}
                onClick={() => setActiveStep(s.id - 1)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyLoopSection;
