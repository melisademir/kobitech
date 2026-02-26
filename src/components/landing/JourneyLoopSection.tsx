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
  Rocket,
} from "lucide-react";

/* ── Logo imports ── */
import logoParam from "@/assets/logo-param.png";
import logoParamtech from "@/assets/logo-paramtech.svg";
import logoFinrota from "@/assets/logo-finrota-new.svg";
import logoKredim from "@/assets/logo-kredim.svg";
import logoIkas from "@/assets/logo-ikas.png";
import logoTsoft from "@/assets/logo-tsoft.svg";
import logoTicimax from "@/assets/logo-ticimax.png";
import logoUnivera from "@/assets/logo-univera.svg";
import logoNebim from "@/assets/logo-nebim.svg";
import logoAras from "@/assets/logo-aras.png";
import logoWorkcube from "@/assets/logo-workcube.png";
import logoMukellef from "@/assets/logo-mukellef.png";

/* ── Tag → Logo mapping ── */
const TAG_LOGO_MAP: Record<string, string> = {
  "Param Fiziki POS": logoParam,
  "Param Sanal POS": logoParam,
  "Param Cep POS": logoParam,
  "Ticimax": logoTicimax,
  "İkas": logoIkas,
  "T-Soft": logoTsoft,
  "Netahsilat": logoFinrota,
  "Netekstre": logoFinrota,
  "Kredim Business": logoKredim,
  "Univera Stokbar": logoUnivera,
  "Nebim V3": logoNebim,
  "Aras Kargo": logoAras,
  "Workcube HR": logoWorkcube,
  "Univera EnRoute": logoUnivera,
  "Uni-Dox": logoUnivera,
  "Paramtech Flows": logoParamtech,
  "Mükellef": logoMukellef,
};

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

/* Top 5 and Bottom 5 */
const topItems = journeySteps.slice(0, 5);
const bottomItems = journeySteps.slice(5, 10);

/* Which color segment does each step belong to? */
const getSegmentColor = (id: number): string => {
  if (id <= 3) return "hsl(268,55%,75%)";
  if (id <= 7) return "hsl(174,52%,55%)";
  return "hsl(268,76%,35%)";
};

/* ── Step Chip ── */
interface StepChipProps {
  step: (typeof journeySteps)[0];
  isActive: boolean;
  onClick: () => void;
}

const StepChip = ({ step, isActive, onClick }: StepChipProps) => {
  const Icon = step.icon;
  const segColor = getSegmentColor(step.id);

  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2.5 cursor-pointer transition-all duration-300 whitespace-nowrap"
      style={{
        padding: isActive ? "14px 28px" : "12px 22px",
        borderRadius: "18px",
        fontSize: isActive ? "15px" : "14px",
        fontWeight: 800,
        transform: isActive ? "scale(1.12)" : "scale(1)",
        background: isActive
          ? "rgba(255,255,255,0.95)"
          : "rgba(255,255,255,0.6)",
        color: isActive ? "hsl(268,72%,38%)" : "white",
        border: isActive
          ? "3px solid rgba(255,255,255,1)"
          : "3px solid rgba(255,255,255,0.9)",
        boxShadow: isActive
          ? `0 8px 32px -4px rgba(109,40,217,0.45), 0 0 48px -8px rgba(109,40,217,0.25)`
          : "0 4px 12px rgba(0,0,0,0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        textShadow: isActive ? "none" : "0 1px 3px rgba(0,0,0,0.2)",
      }}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{step.title}</span>
    </button>
  );
};

/* ── SVG Track — U-shape: top → right → bottom, with 3 color segments ── */
const LoopTrackSVG = () => {
  /* Dimensions */
  const W = 1200;
  const H = 520;
  const T = 56; /* track thickness */
  const R = 48; /* corner radius */
  const arrowW = 36; /* chevron arrow width */

  /* Color definitions */
  const purple1 = "hsl(268,55%,78%)";
  const purple2 = "hsl(275,50%,68%)";
  const teal1 = "hsl(174,52%,60%)";
  const teal2 = "hsl(168,48%,45%)";
  const deep1 = "hsl(268,76%,32%)";
  const deep2 = "hsl(280,68%,50%)";

  /* Segment boundaries on the top edge (x positions) */
  const seg1End = W * 0.38; /* end of Phase 1 (3 tabs) */
  const seg2End = W * 0.78; /* end of Phase 2 (4 tabs) */

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="jl-g1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={purple1} />
          <stop offset="100%" stopColor={purple2} />
        </linearGradient>
        <linearGradient id="jl-g2" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor={teal1} />
          <stop offset="100%" stopColor={teal2} />
        </linearGradient>
        <linearGradient id="jl-g3" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={deep1} />
          <stop offset="100%" stopColor={deep2} />
        </linearGradient>
      </defs>

      {/* Phase 1 — Light Purple: top-left to seg1End, including left side going down partially */}
      <path
        d={`
          M ${R},0
          L ${seg1End},0
          L ${seg1End - arrowW},${T / 2}
          L ${seg1End},${T}
          L ${R},${T}
          Q 0,${T} 0,${T + R}
          L 0,${H - T - R}
          Q 0,${H - T} ${R},${H - T}
          L ${W * 0.22},${H - T}
          L ${W * 0.22},${H}
          L ${R},${H}
          Q 0,${H} 0,${H - R}
          L 0,${R}
          Q 0,0 ${R},0
          Z
        `}
        fill="url(#jl-g1)"
        opacity="0.92"
      />

      {/* Phase 2 — Teal: from seg1End across top-right, down right side, back along bottom to middle */}
      <path
        d={`
          M ${seg1End},0
          L ${seg2End},0
          L ${seg2End - arrowW},${T / 2}
          L ${seg2End},${T}
          L ${seg1End},${T}
          L ${seg1End - arrowW},${T / 2}
          Z
        `}
        fill="url(#jl-g2)"
        opacity="0.92"
      />
      {/* Teal right side + bottom portion */}
      <path
        d={`
          M ${seg2End},0
          L ${W - R},0
          Q ${W},0 ${W},${R}
          L ${W},${H - R}
          Q ${W},${H} ${W - R},${H}
          L ${W * 0.22},${H}
          L ${W * 0.22},${H - T}
          L ${W - R},${H - T}
          Q ${W - T},${H - T} ${W - T},${H - T - R}
          L ${W - T},${T + R}
          Q ${W - T},${T} ${W - R},${T}
          L ${seg2End},${T}
          L ${seg2End - arrowW},${T / 2}
          Z
        `}
        fill="url(#jl-g2)"
        opacity="0.92"
      />

      {/* Phase 3 — Deep Purple: bottom portion from W*0.22 leftward (already covered by phase 1 left side) */}
      {/* Actually Phase 3 is the bottom bar from right side going left */}
      <path
        d={`
          M ${W * 0.22},${H - T}
          L ${W * 0.22 + arrowW},${H - T / 2}
          L ${W * 0.22},${H}
          L ${R},${H}
          Q 0,${H} 0,${H - R}
          L 0,${H - T - R}
          Q 0,${H - T} ${R},${H - T}
          Z
        `}
        fill="url(#jl-g3)"
        opacity="0.95"
      />

      {/* Directional arrow inside track — bottom-right corner pointing to rocket */}
      <path
        d={`
          M ${W - T - 30},${H - T / 2 - 10}
          L ${W - T - 10},${H - T / 2}
          L ${W - T - 30},${H - T / 2 + 10}
        `}
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

/* ── Tag Badge (logo or text) ── */
const TagBadge = ({ tag }: { tag: string }) => {
  const logoSrc = TAG_LOGO_MAP[tag];

  if (logoSrc) {
    return (
      <span
        className="inline-flex items-center justify-center"
        style={{
          padding: "8px 20px",
          borderRadius: "24px",
          border: "2px solid rgba(109,40,217,0.15)",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <img
          src={logoSrc}
          alt={tag}
          className="object-contain mix-blend-multiply"
          style={{ height: "28px", maxWidth: "120px" }}
        />
      </span>
    );
  }

  return (
    <span
      className="inline-block"
      style={{
        padding: "10px 22px",
        borderRadius: "24px",
        fontSize: "13px",
        fontWeight: 700,
        background: "rgba(109,40,217,0.06)",
        color: "hsl(268,72%,38%)",
        border: "2px solid rgba(109,40,217,0.15)",
      }}
    >
      {tag}
    </span>
  );
};

/* ── Main Section ── */
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

        {/* The Loop layout — Top & Bottom only */}
        <div className="relative max-w-6xl mx-auto">
          {/* ── Thick 3-color track ── */}
          <div className="absolute inset-0 pointer-events-none" style={{ margin: "-12px -40px" }}>
            <LoopTrackSVG />
          </div>

          {/* ── Top edge — 5 tabs ── */}
          <div className="relative z-10 flex justify-center gap-10 md:gap-14 mb-4 py-7 flex-wrap">
            {topItems.map((s) => (
              <StepChip
                key={s.id}
                step={s}
                isActive={activeStep === s.id - 1}
                onClick={() => setActiveStep(s.id - 1)}
              />
            ))}
          </div>

          {/* ── Central display ── */}
          <div className="relative z-10 mx-8 md:mx-16">
            <div
              className="relative overflow-hidden flex items-center justify-center"
              style={{
                minHeight: "420px",
                borderRadius: "28px",
                border: "2px solid rgba(109,40,217,0.1)",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Glow blob */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: "500px",
                  height: "500px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(109,40,217,0.07) 0%, transparent 70%)",
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
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {current.tags.map((tag) => (
                      <TagBadge key={tag} tag={tag} />
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
          </div>

          {/* ── Bottom edge — 5 tabs ── */}
          <div className="relative z-10 flex justify-center gap-10 md:gap-14 mt-4 py-7 flex-wrap">
            {bottomItems.map((s) => (
              <StepChip
                key={s.id}
                step={s}
                isActive={activeStep === s.id - 1}
                onClick={() => setActiveStep(s.id - 1)}
              />
            ))}
          </div>

          {/* ── Rocket — bottom-right corner ── */}
          <div
            className="absolute z-20 flex items-center justify-center"
            style={{
              bottom: "-8px",
              right: "-48px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, hsl(268,72%,38%) 0%, hsl(280,68%,50%) 100%)",
              boxShadow: "0 8px 32px -4px rgba(109,40,217,0.5), 0 0 60px -10px rgba(109,40,217,0.3)",
              border: "3px solid rgba(255,255,255,0.9)",
            }}
          >
            <Rocket
              className="text-white"
              style={{
                width: "32px",
                height: "32px",
                transform: "rotate(-45deg)",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyLoopSection;
