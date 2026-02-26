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

/* ── Step Chip ── */
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
          ? "0 8px 32px -4px rgba(109,40,217,0.45), 0 0 48px -8px rgba(109,40,217,0.25)"
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

/* ── SVG Track ── */
const LoopTrackSVG = () => {
  const t = 220;
  const r = 64;
  const arrow = 56;
  const x1 = 0, y1 = 0, x2 = 1000, y2 = 700;

  const purpleLight1 = "hsl(268,55%,82%)";
  const purpleLight2 = "hsl(275,50%,72%)";
  const teal1 = "hsl(174,52%,65%)";
  const teal2 = "hsl(168,48%,50%)";
  const purpleDeep1 = "hsl(268,76%,30%)";
  const purpleDeep2 = "hsl(280,68%,48%)";

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

      {/* Segment 1 — Light Purple */}
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
        opacity="0.9"
      />

      {/* Segment 2 — Teal */}
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
        opacity="0.9"
      />

      {/* Segment 3 — Deep Purple */}
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
        opacity="0.95"
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

        {/* The Loop layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* ── Thick 3-color track ── */}
          <div className="absolute inset-0 pointer-events-none" style={{ margin: "-20px -32px" }}>
            <LoopTrackSVG />
          </div>

          {/* ── Top edge ── */}
          <div className="relative z-10 flex justify-center gap-16 mb-8 py-6">
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
            <div className="flex flex-col justify-center gap-20 px-6 py-2" style={{ minWidth: "230px" }}>
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
                minHeight: "480px",
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

            {/* ── Right edge ── */}
            <div className="flex flex-col justify-center gap-20 px-6 py-2" style={{ minWidth: "230px" }}>
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
          <div className="relative z-10 flex justify-center gap-16 mt-8 py-6">
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
