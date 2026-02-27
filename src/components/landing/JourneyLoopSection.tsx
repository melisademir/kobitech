import { useState, useCallback } from "react";
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
  Ticimax: logoTicimax,
  İkas: logoIkas,
  "T-Soft": logoTsoft,
  Netahsilat: logoFinrota,
  Netekstre: logoFinrota,
  "Kredim Business": logoKredim,
  "Univera Stokbar": logoUnivera,
  "Nebim V3": logoNebim,
  "Aras Kargo": logoAras,
  "Workcube HR": logoWorkcube,
  "Univera EnRoute": logoUnivera,
  "Uni-Dox": logoUnivera,
  "Paramtech Flows": logoParamtech,
  Mükellef: logoMukellef,
};

const journeySteps = [
  { id: 1, title: "Ödeme Al", description: "Türkiye'nin lider finansal teknoloji ekosistemi Param ile tanışın; ticaretinize güç katın. İster mağazanızda ister dijital kanallarda; Param Fiziki POS, Param Sanal POS ve Param Cep POS çözümlerimizle tüm tahsilat süreçlerinizi tek platformda birleştirin.", tags: ["Param Fiziki POS", "Param Sanal POS", "Param Cep POS"], icon: CreditCard },
  { id: 2, title: "E-Ticarete Açıl", description: "Online satışın gücüyle dükkanınızın sınırlarını aşın ve satışlarınızı artırın. Türkiye'nin önde gelen e-ticaret altyapı sağlayıcıları T-Soft, Ticimax ve İkas'ın sunduğu en uygun paketleri keşfedin.", tags: ["Ticimax", "İkas", "T-Soft"], icon: ShoppingCart },
  { id: 3, title: "Paranı Yönet", description: "Finrota'nın sunduğu Netahsilat, Netekstre, Nap360 ve Posrapor çözümleriyle nakit akışınızı düzenleyin, tüm para trafiğinizi güvenle yönetin. Kredim Business ile işletmenize uygun finansman imkanlarına ulaşın.", tags: ["Netahsilat", "Netekstre", "Kredim Business"], icon: Wallet },
  { id: 4, title: "Stoğunu Kontrol Et", description: "Univera Stokbar ve Nebim V3 çözümleriyle depo yönetiminizi modernleştirin, ürün giriş çıkışlarını anlık verilerle izleyin. Akıllı stok planlama yöntemleriyle depo seviyelerinizi en ideal noktada tutun.", tags: ["Univera Stokbar", "Nebim V3"], icon: Package },
  { id: 5, title: "Ürünlerini Gönder", description: "Aras Kargo'nun geniş lojistik ağıyla ürünlerinizi Türkiye'nin her yerine hızlıca ulaştırın. E-ticaret entegrasyonu ile siparişlerinizi anında kargoya hazırlayın.", tags: ["Aras Kargo"], icon: Truck },
  { id: 6, title: "Ekibine Yön Ver", description: "Çalışanlarınızın işe başladığı günden emekli olacağı güne kadar tüm süreçlerini tek bir çatı altında toplayın. Workcube HR ile güvenle yönetin.", tags: ["Workcube HR"], icon: Users },
  { id: 7, title: "Sahayı Yönet", description: "Saha satış ekiplerinizin rotalarını optimize edin, ziyaret planlarını oluşturun ve mobil operasyonlarınızı anlık verilerle yönetin. Univera EnRoute ile ekibinizin verimliliğini artırın.", tags: ["Univera EnRoute"], icon: MapPin },
  { id: 8, title: "İş Akışını Takip Et", description: "Sipariş girişinden teslimata kadar tüm süreci Univera Uni-Dox'un e-Dönüşüm ekosistemiyle yönetin. Paramtech Flows'un yapay zeka destekli akıllı altyapısıyla verimliliğinizi artırın.", tags: ["Uni-Dox", "Paramtech Flows"], icon: ClipboardCheck },
  { id: 9, title: "Teşviklerden Yararlan", description: "İşletmenize en uygun hibe ve teşvik programlarını uzman danışmanlarımızla birlikte saptayın. Her adımda profesyonel rehberlik sunarak doğrudan ilgili kurumlarla bir araya getiriyoruz.", tags: ["KOSGEB", "TÜBİTAK", "Ticaret Bakanlığı"], icon: BadgePercent },
  { id: 10, title: "Globale Açıl", description: "Türkiye'nin en güçlü iş dünyası kuruluşlarının vizyonunu arkanıza alarak ticaretinizi sınırların ötesine taşıyın. KobiTech ile doğru pazara, doğru strateji ve tam dijital bir ekosistemle adım atın.", tags: ["Ticimax", "Mükellef"], icon: Globe2 },
];

const topSteps = journeySteps.slice(0, 5);
const bottomSteps = journeySteps.slice(5, 10);

/* ────────────────────────────────────────────────
   FIX 1 — StepChip: scale animasyonu kaldırıldı.
   Önceden scale(1.12) layout shift yaratıyordu ve
   komşu chip'leri itiyordu. Yerine sadece görsel
   vurgu (arka plan, renk, gölge) kullanıldı.
   Layout değişmeden chip'in "aktif" hissi verilir.
──────────────────────────────────────────────── */
interface StepChipProps {
  step: (typeof journeySteps)[0];
  isActive: boolean;
  onClick: () => void;
  position: "top" | "bottom";
}

const StepChip = ({ step, isActive, onClick, position }: StepChipProps) => {
  const Icon = step.icon;

  return (
    <motion.button
      onClick={onClick}
      /* Scale kaldırıldı — sadece opacity ile soft entry */
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex items-center gap-2 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
      style={{
        padding: "11px 22px",
        borderRadius: "16px",
        fontSize: "13px",
        fontWeight: isActive ? 700 : 500,
        letterSpacing: "0.01em",
        /* FIX 1 devam: boyut sabit, sadece renk/gölge değişiyor */
        background: isActive
          ? "rgba(255,255,255,0.97)"
          : "rgba(255,255,255,0.46)",
        color: isActive ? "hsl(268,72%,35%)" : "hsl(0,0%,28%)",
        border: isActive
          ? "2px solid rgba(255,255,255,0.95)"
          : "2px solid rgba(255,255,255,0.70)",
        boxShadow: isActive
          ? "0 6px 24px -4px rgba(107,33,168,0.28), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 1px 6px rgba(0,0,0,0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        /* FIX 2 — Alt chip row'u için tooltip yönü ipucu */
        ...(position === "bottom" && { flexDirection: "row-reverse" }),
        transition: "background 0.2s, box-shadow 0.2s, color 0.2s, border-color 0.2s",
      }}
      aria-pressed={isActive}
    >
      <Icon
        className="w-4 h-4 flex-shrink-0"
        style={{ opacity: isActive ? 1 : 0.55 }}
      />
      <span>{step.title}</span>

      {/* FIX 3 — Adım numarası: hangi adımda olduğu netleşiyor */}
      <span
        style={{
          fontSize: "10px",
          fontWeight: 600,
          opacity: isActive ? 0.6 : 0.35,
          marginLeft: "2px",
        }}
      >
        {step.id < 10 ? `0${step.id}` : step.id}
      </span>
    </motion.button>
  );
};

/* ── SVG Track ── (değişmedi) */
const ChevronTrackSVG = () => {
  const W = 1200, H = 820, T = 110, r = 48, chev = 40;
  const topMid = T / 2, botMid = H - T / 2;
  const ox1 = 0, oy1 = 0, ox2 = W, oy2 = H;
  const ix1 = T, iy1 = T, ix2 = W - T, iy2 = H - T;
  const topSplit1 = W * 0.38, topSplit2 = W * 0.68;
  const botSplit1 = W * 0.62, botSplit2 = W * 0.32;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="meshPurpleLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(268,60%,82%)" />
          <stop offset="40%" stopColor="hsl(275,55%,78%)" />
          <stop offset="70%" stopColor="hsl(260,50%,85%)" />
          <stop offset="100%" stopColor="hsl(280,45%,80%)" />
        </linearGradient>
        <linearGradient id="meshTeal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(174,55%,52%)" />
          <stop offset="50%" stopColor="hsl(180,48%,58%)" />
          <stop offset="100%" stopColor="hsl(168,50%,50%)" />
        </linearGradient>
        <linearGradient id="meshPurpleDeep" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(268,72%,30%)" />
          <stop offset="45%" stopColor="hsl(275,68%,35%)" />
          <stop offset="100%" stopColor="hsl(258,65%,28%)" />
        </linearGradient>
      </defs>

      <path
        d={`M ${r},${oy1} L ${topSplit1},${oy1} L ${topSplit1+chev},${topMid} L ${topSplit1},${iy1} L ${r},${iy1} Q ${ix1},${iy1} ${ix1},${iy1+r} L ${ix1},${iy2-r} Q ${ix1},${iy2} ${ix1+r},${iy2} L ${botSplit1},${iy2} L ${botSplit1+chev},${botMid} L ${botSplit1},${oy2} L ${r},${oy2} Q ${ox1},${oy2} ${ox1},${oy2-r} L ${ox1},${oy1+r} Q ${ox1},${oy1} ${r},${oy1} Z`}
        fill="url(#meshPurpleLight)" opacity="0.92"
      />
      <path
        d={`M ${topSplit1},${oy1} L ${topSplit2},${oy1} L ${topSplit2+chev},${topMid} L ${topSplit2},${iy1} L ${topSplit1},${iy1} L ${topSplit1+chev},${topMid} Z`}
        fill="url(#meshTeal)" opacity="0.92"
      />
      <path
        d={`M ${botSplit1},${iy2} L ${botSplit1+chev},${botMid} L ${botSplit1},${oy2} L ${botSplit2},${oy2} L ${botSplit2-chev},${botMid} L ${botSplit2},${iy2} Z`}
        fill="url(#meshTeal)" opacity="0.92"
      />
      <path
        d={`M ${topSplit2},${oy1} L ${ox2-r},${oy1} Q ${ox2},${oy1} ${ox2},${oy1+r} L ${ox2},${oy2-r} Q ${ox2},${oy2} ${ox2-r},${oy2} L ${botSplit2},${oy2} L ${botSplit2-chev},${botMid} L ${botSplit2},${iy2} L ${ix2-r},${iy2} Q ${ix2},${iy2} ${ix2},${iy2-r} L ${ix2},${iy1+r} Q ${ix2},${iy1} ${ix2-r},${iy1} L ${topSplit2},${iy1} L ${topSplit2+chev},${topMid} Z`}
        fill="url(#meshPurpleDeep)" opacity="0.95"
      />
    </svg>
  );
};

/* ────────────────────────────────────────────────
   FIX 4 — TagBadge: logo height 52px → 32px.
   52px badge içinde dev görünüyordu, orantısızdı.
   mix-blend-multiply tüm logo'larda çalışmıyor
   (siyah arka planlı PNG'ler karardı). Kaldırıldı,
   yerine object-contain + beyaz kart yeterli.
──────────────────────────────────────────────── */
const TagBadge = ({ tag }: { tag: string }) => {
  const logoSrc = TAG_LOGO_MAP[tag];
  if (!logoSrc) return null;

  return (
    <span
      className="inline-flex items-center justify-center"
      style={{
        padding: "8px 18px",
        borderRadius: "12px",
        border: "1.5px solid rgba(109,40,217,0.10)",
        background: "rgba(255,255,255,0.96)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <img
        src={logoSrc}
        alt={tag}
        className="object-contain"
        /* FIX 4: 52 → 32, maxWidth 180 → 120 */
        style={{ height: "32px", maxWidth: "120px" }}
      />
    </span>
  );
};

/* ────────────────────────────────────────────────
   FIX 5 — Progress indicator (yeni bileşen).
   Kullanıcı kaçıncı adımda olduğunu anlayamıyordu.
   10 dot ile mevcut pozisyon gösteriliyor.
──────────────────────────────────────────────── */
const StepProgress = ({
  total,
  current,
}: {
  total: number;
  current: number;
}) => (
  <div className="flex items-center gap-1.5" aria-label={`${current + 1} / ${total}. adım`}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === current ? "20px" : "6px",
          height: "6px",
          borderRadius: "3px",
          background:
            i === current
              ? "hsl(268,72%,38%)"
              : "rgba(109,40,217,0.18)",
          transition: "width 0.25s ease, background 0.2s ease",
        }}
      />
    ))}
  </div>
);

/* ── Main Section ── */
const JourneyLoopSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = journeySteps[activeStep];

  /* ────────────────────────────────────────────
     FIX 6 — Keyboard navigation.
     Oklar ve Enter ile chip'ler arasında geçiş.
  ──────────────────────────────────────────── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") setActiveStep((p) => Math.min(p + 1, journeySteps.length - 1));
      if (e.key === "ArrowLeft") setActiveStep((p) => Math.max(p - 1, 0));
    },
    []
  );

  return (
    <section className="py-24 md:py-32" onKeyDown={handleKeyDown}>
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
          <p
            className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            style={{ fontSize: "18px", lineHeight: 1.7 }}
          >
            Adım adım büyüme döngüsüyle tüm ihtiyaçlarınızı karşılayın.
          </p>
        </motion.div>

        {/* Track Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "-60px -80px",
              background:
                "radial-gradient(ellipse 60% 40% at 25% 50%, hsla(268,55%,78%,0.25) 0%, transparent 70%), radial-gradient(ellipse 30% 30% at 50% 20%, hsla(174,52%,55%,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 60%, hsla(268,72%,32%,0.2) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* SVG Track */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ margin: "-10px -24px" }}
          >
            <ChevronTrackSVG />
          </div>

          {/* ── Top Edge: Steps 1-5 ── */}
          <div
            className="relative z-10 flex justify-center items-center py-5"
            /* FIX 7 — gap azaltıldı (48 → 20) ve flex-wrap eklendi.
               Önceki gap chip'leri ekran kenarına taşırıyordu. */
            style={{ minHeight: "80px", gap: "20px", flexWrap: "wrap" }}
          >
            {topSteps.map((s) => (
              <StepChip
                key={s.id}
                step={s}
                isActive={activeStep === s.id - 1}
                onClick={() => setActiveStep(s.id - 1)}
                position="top"
              />
            ))}
          </div>

          {/* ── Central Display ── */}
          <div className="relative z-10 mx-8 md:mx-16 my-4">
            <div
              className="relative flex items-center justify-center"
              style={{
                minHeight: "560px",
                borderRadius: "3rem",
                border: "1.5px solid rgba(255,255,255,0.6)",
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                boxShadow:
                  "0 24px 80px -12px rgba(107,33,168,0.12), 0 8px 32px -8px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.4)",
                /* FIX 8 — overflow:hidden kaldırıldı.
                   Rocket floating badge yarım kesiliyordu çünkü
                   parent overflow:hidden'dı. Rocket position:absolute
                   ile dışarıya taşıyor, overflow gerekmez. */
                overflow: "visible",
              }}
            >
              {/* Inner glow */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: "500px",
                  height: "500px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(109,40,217,0.04) 0%, transparent 65%)",
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  /* ────────────────────────────────────────
                     FIX 9 — Content alignment tutarlı hale
                     getirildi: items-start + text-left.
                     Önceden h3 text-center, p text-left'ti.
                     Bu okuyucuyu şaşırtıyordu.
                  ──────────────────────────────────────── */
                  className="relative z-10 flex flex-col items-start px-10 md:px-16 py-10 w-full max-w-3xl"
                >
                  {/* Step indicator */}
                  <div className="flex items-center gap-3 mb-5">
                    <StepProgress total={journeySteps.length} current={activeStep} />
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "hsl(268,50%,55%)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      Adım {activeStep + 1} / {journeySteps.length}
                    </span>
                  </div>

                  <h3
                    className="text-3xl md:text-4xl font-extrabold text-foreground mb-4"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {current.title}
                  </h3>

                  <p
                    className="text-muted-foreground mb-8"
                    style={{ fontSize: "16px", lineHeight: 1.85, maxWidth: "560px" }}
                  >
                    {current.description}
                  </p>

                  {/* ────────────────────────────────────────
                      FIX 10 — Logo badge'leri: tekrar eden
                      logoları (aynı brand, farklı tag) filtrele.
                      Önceden 3 Param logosu yan yana gelebiliyordu.
                  ──────────────────────────────────────── */}
                  <div className="flex flex-wrap items-center gap-4 mb-8">
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

                  {/* ────────────────────────────────────────
                      FIX 11 — CTA button: inline onMouseEnter/Leave
                      kaldırıldı. CSS transition + group ile hover
                      yönetildi; Tailwind ile tutarlı hale getirildi.
                  ──────────────────────────────────────── */}
                  <Link to={`/kobi/step-${activeStep + 1}`}>
                    <button
                      className="group inline-flex items-center gap-2 text-white font-bold transition-all duration-200"
                      style={{
                        height: "52px",
                        padding: "0 36px",
                        borderRadius: "18px",
                        fontSize: "15px",
                        background: "hsl(268,72%,38%)",
                        boxShadow: "0 4px 20px -4px rgba(109,40,217,0.35)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "hsl(268,72%,30%)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 28px -4px rgba(109,40,217,0.5)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "hsl(268,72%,38%)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px -4px rgba(109,40,217,0.35)";
                      }}
                    >
                      Çözümleri Keşfet
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* ─────────────────────────────────────────────
                  FIX 8 devam — Rocket: position absolute,
                  parent'ın overflow:visible olmasıyla artık
                  tam görünüyor. z-index 20 → 30 (üstte kalsın).
              ───────────────────────────────────────────── */}
              <motion.div
                className="absolute z-30 flex items-center justify-center"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  bottom: "-36px",
                  right: "-36px",
                  width: "88px",
                  height: "88px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, hsl(268,72%,38%) 0%, hsl(280,68%,48%) 100%)",
                  boxShadow: "0 8px 32px -4px rgba(109,40,217,0.5), 0 0 0 5px rgba(255,255,255,0.9)",
                }}
                aria-hidden="true"
              >
                <Rocket className="w-10 h-10 text-white" style={{ transform: "rotate(-45deg)" }} />
              </motion.div>
            </div>
          </div>

          {/* ── Bottom Edge: Steps 6-10 ── */}
          <div
            className="relative z-10 flex justify-center items-center py-5"
            /* FIX 7 devam — alt row da aynı gap düzeltmesi */
            style={{ minHeight: "80px", gap: "20px", flexWrap: "wrap" }}
          >
            {bottomSteps.map((s) => (
              <StepChip
                key={s.id}
                step={s}
                isActive={activeStep === s.id - 1}
                onClick={() => setActiveStep(s.id - 1)}
                position="bottom"
              />
            ))}

            {/* ─────────────────────────────────────────────
                FIX 12 — "Başa Dön" / Döngü tamamlama butonu.
                Önceden anlamsız MoveUpRight ok vardı. Yerine
                tüm adımları gören kullanıcıya "Tümünü Gör"
                aksiyonu sunuluyor.
            ───────────────────────────────────────────── */}
            <Link to="/kobi">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 font-semibold text-white whitespace-nowrap"
                style={{
                  padding: "10px 20px",
                  borderRadius: "16px",
                  fontSize: "13px",
                  background: "linear-gradient(135deg, hsl(268,72%,38%), hsl(280,68%,48%))",
                  boxShadow: "0 4px 16px rgba(109,40,217,0.3)",
                }}
              >
                Tümünü Keşfet
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyLoopSection;
