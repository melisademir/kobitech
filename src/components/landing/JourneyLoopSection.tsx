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
  MoveUpRight,
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
  { id: 3, title: "Paranı Yönet", description: "Finrota'nın sunduğu Netahsilat, Netekstre, Nap360 ve Posrapor çözümleriyle nakit akışınızı düzenleyin, tüm para trafiğinizi güvenle yönetin. Kredim Business ile işletmenize uygun finansman imkanlarına ulaşarak ticaretinize güç katın.", tags: ["Netahsilat", "Netekstre", "Nap360", "Posrapor", "Kredim Business"], icon: Wallet },
  { id: 4, title: "Stoğunu Kontrol Et", description: "Univera Stokbar ve Nebim V3 çözümleriyle depo yönetiminizi modernleştirin, ürün giriş çıkışlarını anlık verilerle izleyin. Akıllı stok planlama yöntemleriyle depo seviyelerinizi en ideal noktada tutun.", tags: ["Univera Stokbar", "Nebim V3"], icon: Package },
  { id: 5, title: "Ürünlerini Gönder", description: "Aras Kargo'nun geniş lojistik ağıyla ürünlerinizi Türkiye'nin her yerine hızlıca ulaştırın. E-ticaret entegrasyonu ile siparişlerinizi anında kargoya hazırlayın ve operasyonel iş yükünüzü hafifletin.", tags: ["Aras Kargo"], icon: Truck },
  { id: 6, title: "Ekibine Yön Ver", description: "Çalışanlarınızın işe başladığı günden emekli olacağı güne kadar tüm süreçlerini tek bir çatı altında toplayın. Özlük bilgilerini; maaş planlarını, izinlerini, mesailerini ve bordro hesaplarını Workcube HR ile güvenle yönetin.", tags: ["Workcube HR"], icon: Users },
  { id: 7, title: "Sahayı Yönet", description: "Saha satış ekiplerinizin rotalarını optimize edin, ziyaret planlarını oluşturun ve mobil operasyonlarınızı anlık verilerle yönetin. Univera EnRoute ile sahadan gelen verileri anında analiz ederek ekibinizin verimliliğini artırın.", tags: ["Univera EnRoute"], icon: MapPin },
  { id: 8, title: "İş Akışını Takip Et", description: "Sipariş girişinden teslimata kadar tüm süreci Univera Uni-Dox'un e-Dönüşüm ekosistemiyle yönetin. Paramtech Flows'un yapay zeka destekli akıllı altyapısıyla görev atama, süre takibi ve otomatik bildirimler üzerinden ekibinizin verimliliğini artırın.", tags: ["Uni-Dox", "Paramtech Flows"], icon: ClipboardCheck },
  { id: 9, title: "Teşviklerden Yararlan", description: "İşletmenize en uygun hibe ve teşvik programlarını uzman danışmanlarımızla birlikte saptayın. Sizi karmaşık başvuru dosyalarıyla uğraştırmıyor, her adımda profesyonel rehberlik sunarak doğrudan ilgili kurumlarla bir araya getiriyoruz.", tags: ["KOSGEB", "TÜBİTAK", "Ticaret Bakanlığı"], icon: BadgePercent },
  { id: 10, title: "Globale Açıl", description: "TÜSİAD, MÜSİAD, TOBB, İTO, HİB ve KAGİDER gibi Türkiye'nin en güçlü iş dünyası kuruluşlarının vizyonunu arkanıza alarak ticaretinizi sınırların ötesine taşıyın. KobiTech ile doğru pazara, doğru strateji ve tam dijital bir ekosistemle adım atın.", tags: ["TÜSİAD", "MÜSİAD", "TOBB", "İTO", "HİB", "KAGİDER", "Ticimax", "Mükellef"], icon: Globe2 },
];

const topSteps = journeySteps.slice(0, 5);
const bottomSteps = journeySteps.slice(5, 10);

/* ── Step Chip ── */
interface StepChipProps {
  step: (typeof journeySteps)[0];
  isActive: boolean;
  onClick: () => void;
}

const StepChip = ({ step, isActive, onClick }: StepChipProps) => {
  const Icon = step.icon;
  return (
    <motion.button
      onClick={onClick}
      animate={isActive ? { scale: 1.18 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex items-center gap-2.5 cursor-pointer whitespace-nowrap"
      style={{
        padding: isActive ? "16px 36px" : "14px 26px",
        borderRadius: "20px",
        fontSize: isActive ? "14px" : "12px",
        fontWeight: isActive ? 800 : 700,
        letterSpacing: "0.01em",
        background: isActive
          ? "hsl(268,72%,38%)"
          : "rgba(255,255,255,0.88)",
        color: isActive ? "#fff" : "#111",
        border: isActive
          ? "3px solid hsl(268,72%,48%)"
          : "3px solid rgba(255,255,255,0.85)",
        boxShadow: isActive
          ? "0 0 20px 4px rgba(109,40,217,0.45), 0 0 48px 8px rgba(109,40,217,0.18)"
          : "0 4px 16px rgba(0,0,0,0.12)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        textShadow: "none",
      }}
    >
      {isActive && (
        <motion.span
          className="absolute inset-0 rounded-[20px]"
          animate={{ boxShadow: ["0 0 12px 2px rgba(109,40,217,0.4)", "0 0 24px 6px rgba(109,40,217,0.15)", "0 0 12px 2px rgba(109,40,217,0.4)"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ pointerEvents: "none" }}
        />
      )}
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{step.title}</span>
    </motion.button>
  );
};

/* ── Chevron-Interlocking Track SVG ── */
const ChevronTrackSVG = () => {
  const W = 1200;
  const H = 820;
  const T = 110; // track thickness
  const r = 48;  // corner radius
  const chev = 40; // chevron depth

  const purpleLight = "hsl(268,55%,78%)";
  const teal = "hsl(174,52%,55%)";
  const purpleDeep = "hsl(268,72%,32%)";

  // Outer bounds
  const ox1 = 0, oy1 = 0, ox2 = W, oy2 = H;
  // Inner bounds
  const ix1 = T, iy1 = T, ix2 = W - T, iy2 = H - T;

  // Split points on top and bottom edges for 3 segments
  const topSplit1 = W * 0.38;
  const topSplit2 = W * 0.68;
  const botSplit1 = W * 0.62;
  const botSplit2 = W * 0.32;

  // Chevron midpoints (vertical center of track thickness)
  const topMid = T / 2;
  const botMid = H - T / 2;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      fill="none"
    >
      {/* Segment 1: Light Purple — Top-left → chevron + Left side + Bottom-right ← chevron */}
      <path
        d={`
          M ${r},${oy1}
          L ${topSplit1},${oy1}
          L ${topSplit1 + chev},${topMid}
          L ${topSplit1},${iy1}
          L ${r},${iy1}
          Q ${ix1},${iy1} ${ix1},${iy1 + r}
          L ${ix1},${iy2 - r}
          Q ${ix1},${iy2} ${ix1 + r},${iy2}
          L ${botSplit1},${iy2}
          L ${botSplit1 + chev},${botMid}
          L ${botSplit1},${oy2}
          L ${r},${oy2}
          Q ${ox1},${oy2} ${ox1},${oy2 - r}
          L ${ox1},${oy1 + r}
          Q ${ox1},${oy1} ${r},${oy1}
          Z
        `}
        fill={purpleLight}
        opacity="0.92"
      />

      {/* Segment 2: Teal — Top-middle chevron ←→ chevron */}
      <path
        d={`
          M ${topSplit1},${oy1}
          L ${topSplit2},${oy1}
          L ${topSplit2 + chev},${topMid}
          L ${topSplit2},${iy1}
          L ${topSplit1},${iy1}
          L ${topSplit1 + chev},${topMid}
          Z
        `}
        fill={teal}
        opacity="0.92"
      />
      {/* Segment 2: Teal — Bottom-middle chevron ←→ chevron */}
      <path
        d={`
          M ${botSplit1},${iy2}
          L ${botSplit1 + chev},${botMid}
          L ${botSplit1},${oy2}
          L ${botSplit2},${oy2}
          L ${botSplit2 - chev},${botMid}
          L ${botSplit2},${iy2}
          Z
        `}
        fill={teal}
        opacity="0.92"
      />

      {/* Segment 3: Deep Purple — Top-right from chevron + Right side + Bottom-left to chevron */}
      <path
        d={`
          M ${topSplit2},${oy1}
          L ${ox2 - r},${oy1}
          Q ${ox2},${oy1} ${ox2},${oy1 + r}
          L ${ox2},${oy2 - r}
          Q ${ox2},${oy2} ${ox2 - r},${oy2}
          L ${botSplit2},${oy2}
          L ${botSplit2 - chev},${botMid}
          L ${botSplit2},${iy2}
          L ${ix2 - r},${iy2}
          Q ${ix2},${iy2} ${ix2},${iy2 - r}
          L ${ix2},${iy1 + r}
          Q ${ix2},${iy1} ${ix2 - r},${iy1}
          L ${topSplit2},${iy1}
          L ${topSplit2 + chev},${topMid}
          Z
        `}
        fill={purpleDeep}
        opacity="0.95"
      />
    </svg>
  );
};

/* ── Tag Badge (logo only) ── */
const TagBadge = ({ tag }: { tag: string }) => {
  const logoSrc = TAG_LOGO_MAP[tag];
  if (!logoSrc) return null;

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
        style={{ height: "52px", maxWidth: "180px" }}
      />
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

        {/* Track Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* SVG Track */}
          <div className="absolute inset-0 pointer-events-none" style={{ margin: "-10px -24px" }}>
            <ChevronTrackSVG />
          </div>

          {/* ── Top Edge: Steps 1-5 ── */}
          <div className="relative z-10 flex justify-center items-center gap-12 py-5" style={{ minHeight: "80px" }}>
            {topSteps.map((s) => (
              <StepChip
                key={s.id}
                step={s}
                isActive={activeStep === s.id - 1}
                onClick={() => setActiveStep(s.id - 1)}
              />
            ))}
          </div>

          {/* ── Central Display ── */}
          <div className="relative z-10 mx-16 my-4">
            <div
              className="relative overflow-hidden flex items-center justify-center"
              style={{
                minHeight: "580px",
                borderRadius: "2.5rem",
                border: "2px solid rgba(109,40,217,0.1)",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
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
                  className="relative z-10 flex flex-col items-center px-8 md:px-14 py-8 w-full max-w-3xl mx-auto"
                >
                  <h3
                    className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 text-center"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {current.title}
                  </h3>
                  <p
                    className="text-muted-foreground leading-relaxed mb-6 text-center"
                    style={{ fontSize: "16px", lineHeight: 1.75 }}
                  >
                    {current.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {current.tags
                      .filter((tag, i, arr) => {
                        const logo = TAG_LOGO_MAP[tag];
                        if (!logo) return true;
                        return arr.findIndex((t) => TAG_LOGO_MAP[t] === logo) === i;
                      })
                      .map((tag) => (
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

            {/* Rocket icon — bottom right */}
            <div
              className="absolute z-20 flex items-center justify-center"
              style={{
                bottom: "-40px",
                right: "-40px",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, hsl(268,72%,38%) 0%, hsl(280,68%,48%) 100%)",
                boxShadow: "0 8px 32px -4px rgba(109,40,217,0.5), 0 0 0 5px rgba(255,255,255,0.9)",
              }}
            >
              <Rocket className="w-12 h-12 text-white" style={{ transform: "rotate(-45deg)" }} />
            </div>
          </div>

          {/* ── Bottom Edge: Steps 6-10 + directional arrow ── */}
          <div className="relative z-10 flex justify-center items-center gap-12 py-5" style={{ minHeight: "80px" }}>
            {bottomSteps.map((s) => (
              <StepChip
                key={s.id}
                step={s}
                isActive={activeStep === s.id - 1}
                onClick={() => setActiveStep(s.id - 1)}
              />
            ))}
            {/* Directional arrow pointing toward Rocket */}
            <motion.div
              animate={{ x: [0, 6, 0], y: [0, -6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, hsl(268,72%,38%), hsl(280,68%,48%))",
                boxShadow: "0 4px 16px rgba(109,40,217,0.3)",
              }}
            >
              <MoveUpRight className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyLoopSection;
