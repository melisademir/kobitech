import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Check } from "lucide-react";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { pieces, partnerDetails } from "./partner-ecosystem/partner-data";
import type { PuzzlePiece } from "./partner-ecosystem/partner-data";
import partnerCloudImg from "@/assets/partner-cloud.png";
import partnerParamImg from "@/assets/partner-param.png";
import partnerArasImg from "@/assets/partner-aras.png";
import partnerIkasImg from "@/assets/partner-ikas.png";
import partnerTsoftImg from "@/assets/partner-tsoft.png";
import partnerMukellefImg from "@/assets/partner-mukellef.png";
import partnerWorkcubeImg from "@/assets/partner-workcube.png";
import partnerGoogleImg from "@/assets/partner-google.png";
import partnerKredimImg from "@/assets/partner-kredim.png";
import partnerNebimImg from "@/assets/partner-nebim.png";
import partnerFinrotaImg from "@/assets/partner-finrota.png";
import partnerUniveraImg from "@/assets/partner-univera.png";
import partnerTicimaxImg from "@/assets/partner-ticimax.png";

/* Partner list for track — use pieces order */
const partners = pieces;
const topPartners = partners.slice(0, 7);
const bottomPartners = partners.slice(7);

/* Partner images map */
const partnerImages: Record<string, string> = {
  paramtech: partnerCloudImg,
  param: partnerParamImg,
  aras: partnerArasImg,
  ikas: partnerIkasImg,
  tsoft: partnerTsoftImg,
  mukellef: partnerMukellefImg,
  workcube: partnerWorkcubeImg,
  google: partnerGoogleImg,
  kredim: partnerKredimImg,
  nebim: partnerNebimImg,
  finrota: partnerFinrotaImg,
  univera: partnerUniveraImg,
  ticimax: partnerTicimaxImg,
};

/* ── Logo Chip ── */
interface LogoChipProps {
  piece: PuzzlePiece;
  isActive: boolean;
  onClick: () => void;
}

const LogoChip = ({ piece, isActive, onClick }: LogoChipProps) => (
  <button
    onClick={onClick}
    className="relative flex items-center justify-center cursor-pointer rounded-2xl"
    style={{
      padding: "8px 18px",
      backdropFilter: "blur(12px)",
      background: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.70)",
      border: isActive ? "2px solid rgba(109,40,217,0.25)" : "2px solid rgba(255,255,255,0.60)",
      boxShadow: isActive ? "0 4px 16px rgba(109,40,217,0.15)" : "none",
      transform: isActive ? "scale(1.08)" : "scale(1)",
      transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
    }}
  >
    <img
      src={piece.logo}
      alt={piece.name}
      className="relative z-10 object-contain"
      style={{
        height: isActive ? "32px" : "28px",
        maxWidth: isActive ? "100px" : "90px",
        transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        filter: isActive ? "none" : "grayscale(0.2)",
        opacity: 1,
      }}
    />
  </button>
);

/* ── Main Section ── */
const JourneyLoopSection2 = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentPiece = partners[activeIdx];
  const detail = partnerDetails[currentPiece.id];

  return (
    <section className="section-gap">
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
            Güçlü Partner
            <br />
            <span className="text-gradient-primary">Ekosistemi</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            Sektör lideri sağlayıcılar tek platformda; inceleme ve teklif süreci tek merkezden.
          </p>
        </motion.div>

        {/* Track Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* CSS Mask Track — clean purple-to-teal */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              margin: "-10px -24px",
              borderRadius: "calc(2rem + 90px)",
              border: "90px solid transparent",
              background:
                "linear-gradient(to right, hsl(271 76% 53%), hsl(271 60% 72%), hsl(168 76% 52%)) border-box",
              WebkitMask:
                "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* ── Top Edge: first 7 partners ── */}
          <div className="relative z-10 flex justify-center items-center py-5 flex-wrap gap-5" style={{ minHeight: "80px" }}>
            {topPartners.map((p, i) => (
              <LogoChip
                key={p.id}
                piece={p}
                isActive={activeIdx === i}
                onClick={() => setActiveIdx(i)}
              />
            ))}
          </div>

          {/* ── Central Display ── */}
          <div className="relative z-10" style={{ margin: "-10px 66px" }}>
            <div className="relative overflow-hidden rounded-[2rem]"
              style={{
                minHeight: "440px",
                background: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 32px -8px rgba(0,0,0,0.08)",
              }}
            >

              <AnimatePresence mode="wait">
                {detail && (
                  <motion.div
                    key={currentPiece.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-row gap-6 w-full"
                    style={{ alignItems: "stretch", minHeight: "320px" }}
                  >
                    {/* Left column */}
                    <div className="flex flex-col justify-between" style={{ flex: "0 0 50%", padding: "2rem 1.5rem 2rem 2.5rem" }}>
                      {/* Headline */}
                      <h3 className="text-xl md:text-2xl font-black text-foreground mb-3" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                        {detail.headline}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground mb-5 text-[15px] leading-relaxed max-w-[560px]">
                        {detail.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-col gap-3 mb-6">
                        {detail.features.slice(0, 4).map((f) => (
                          <div key={f} className="flex items-start gap-3">
                            <Check className="text-emerald-500 shrink-0 mt-0.5 w-5 h-5" strokeWidth={2.8} />
                            <span className="text-foreground/80 text-sm font-medium">{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Link to="/digitalhub/products">
                        <ButtonColorful label="Çözümleri İncele" />
                      </Link>
                    </div>

                    {/* Right column — image panel */}
                    <div className="hidden md:flex items-stretch" style={{ flex: "1", padding: "1.5rem 1.5rem 1.5rem 0" }}>
                      <div className="relative rounded-2xl overflow-hidden" style={{ flex: "1", minHeight: "100%", maxHeight: "320px" }}>
                        <img
                          src={partnerImages[currentPiece.id] ?? partnerImages.paramtech}
                          alt={currentPiece.name}
                          className="w-full h-full object-cover"
                          style={{ borderRadius: "1rem", display: "block" }}
                        />
                        <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: "1rem", background: "linear-gradient(135deg, hsla(268,72%,38%,0.15) 0%, hsla(174,55%,52%,0.1) 100%)" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Bottom Edge: remaining partners ── */}
          <div className="relative z-10 flex justify-center items-center py-5 flex-wrap gap-5" style={{ minHeight: "80px" }}>
            {bottomPartners.map((p, i) => (
              <LogoChip
                key={p.id}
                piece={p}
                isActive={activeIdx === topPartners.length + i}
                onClick={() => setActiveIdx(topPartners.length + i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyLoopSection2;
