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

/* ── Step Chip (Glass Pill) ── */
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
      animate={isActive ? { scale: 1.12 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative flex items-center gap-2.5 cursor-pointer whitespace-nowrap"
      style={{
        padding: isActive ? "14px 32px" : "12px 24px",
        borderRadius: "2rem",
        fontSize: isActive ? "14px" : "12px",
        fontWeight: isActive ? 800 : 600,
        letterSpacing: "0.01em",
        background: isActive
          ? "rgba(255,255,255,0.97)"
          : "rgba(255,255,255,0.50)",
        color: isActive ? "hsl(268,72%,38%)" : "hsl(0,0%,25%)",
        border: isActive
          ? "2.5px solid rgba(255,255,255,0.95)"
          : "2.5px solid rgba(255,255,255,0.80)",
        boxShadow: isActive
          ? "0 8px 32px -4px rgba(107,33,168,0.28), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <Icon className="w-4 h-4 flex-shrink-0" style={{ opacity: isActive ? 1 : 0.7 }} />
      <span>{step.title}</span>
    </motion.button>
  );
};


/* ── Tag Badge (logo only) ── */
const TagBadge = ({ tag }: { tag: string }) => {
  const logoSrc = TAG_LOGO_MAP[tag];
  if (!logoSrc) return null;

  return (
    <img
      src={logoSrc}
      alt={tag}
      className="object-contain mix-blend-multiply"
      style={{ height: "36px", width: "120px" }}
    />
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
          <p
            className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            style={{ fontSize: "18px", lineHeight: 1.7 }}
          >
            Adım adım büyüme döngüsüyle tüm ihtiyaçlarınızı karşılayın.
          </p>
        </motion.div>

        {/* Track Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Glow behind track */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "-60px -80px",
              background:
                "radial-gradient(ellipse 60% 40% at 25% 50%, hsla(268,55%,78%,0.25) 0%, transparent 70%), radial-gradient(ellipse 30% 30% at 50% 20%, hsla(174,52%,55%,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 60%, hsla(268,72%,32%,0.2) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* CSS Mask Track */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              margin: "-10px -24px",
              borderRadius: "calc(2rem + 90px)",
              border: "90px solid transparent",
              background: "linear-gradient(135deg, hsl(268,60%,82%), hsl(174,55%,52%), hsl(268,72%,30%)) border-box",
              WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* ── Top Edge: Steps 1-5 ── */}
          <div
            className="relative z-10 flex justify-center items-center py-5"
            style={{ minHeight: "80px", gap: "48px" }}
          >
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
          <div className="relative z-10" style={{ margin: "0 66px" }}>
            <div
              className="relative overflow-hidden flex items-center justify-center"
              style={{
                minHeight: "380px",
                borderRadius: "2rem",
                border: "1.5px solid rgba(255,255,255,0.6)",
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                boxShadow:
                  "0 24px 80px -12px rgba(107,33,168,0.12), 0 8px 32px -8px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.4)",
              }}
            >
              {/* Inner glow */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: "600px",
                  height: "600px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(109,40,217,0.04) 0%, transparent 65%)",
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative z-10 flex flex-col items-center px-8 md:px-14 py-8 w-full max-w-3xl mx-auto"
                >
                  <h3
                    className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 text-center w-full"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {current.title}
                  </h3>
                  <p
                    className="text-muted-foreground mb-8 text-left w-full"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.85,
                      maxWidth: "600px",
                    }}
                  >
                    {current.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-start gap-5 mb-8 w-full">
                    {current.tags
                      .filter((tag, i, arr) => {
                        const logo = TAG_LOGO_MAP[tag];
                        if (!logo) return true;
                        return (
                          arr.findIndex((t) => TAG_LOGO_MAP[t] === logo) === i
                        );
                      })
                      .map((tag) => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                  </div>
                  <Link to="/kobi/step-1" className="inline-block">
                    <button
                      className="inline-flex items-center gap-2 text-white font-bold transition-colors duration-200 cursor-pointer"
                      style={{
                        height: "54px",
                        padding: "0 40px",
                        borderRadius: "20px",
                        fontSize: "15px",
                        background: "hsl(268,72%,38%)",
                        boxShadow:
                          "0 4px 20px -4px rgba(109,40,217,0.35)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "hsl(268,72%,30%)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "hsl(268,72%,38%)";
                      }}
                    >
                      Çözümleri Keşfet{" "}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Rocket icon — bottom right, floating animation */}
            <motion.div
              className="absolute z-20 flex items-center justify-center"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                bottom: "-40px",
                right: "-40px",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, hsl(268,72%,38%) 0%, hsl(280,68%,48%) 100%)",
                boxShadow:
                  "0 8px 32px -4px rgba(109,40,217,0.5), 0 0 0 5px rgba(255,255,255,0.9)",
              }}
            >
              <Rocket
                className="w-12 h-12 text-white"
                style={{ transform: "rotate(-45deg)" }}
              />
            </motion.div>
          </div>

          {/* ── Bottom Edge: Steps 6-10 + directional arrow ── */}
          <div
            className="relative z-10 flex justify-center items-center py-5"
            style={{ minHeight: "80px", gap: "48px" }}
          >
            {bottomSteps.map((s) => (
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
