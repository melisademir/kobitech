import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Check } from "lucide-react";
import { pieces, partnerDetails } from "./partner-ecosystem/partner-data";
import type { PuzzlePiece } from "./partner-ecosystem/partner-data";

const BRAND = "hsl(268,72%,38%)";
const BRAND_HEX = "#6B21A8";

/* Partner list for track — use pieces order */
const partners = pieces;
const topPartners = partners.slice(0, 7);
const bottomPartners = partners.slice(7);

/* ── Logo Chip ── */
interface LogoChipProps {
  piece: PuzzlePiece;
  isActive: boolean;
  onClick: () => void;
}

const LogoChip = ({ piece, isActive, onClick }: LogoChipProps) => (
  <motion.button
    onClick={onClick}
    animate={isActive ? { scale: 1.12 } : { scale: 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 22 }}
    className="relative flex items-center justify-center cursor-pointer"
    style={{
      padding: isActive ? "10px 24px" : "8px 20px",
    }}
  >
    <img
      src={piece.logo}
      alt={piece.name}
      className="object-contain mix-blend-multiply"
      style={{
        height: isActive ? "32px" : "26px",
        maxWidth: isActive ? "100px" : "80px",
        transition: "all 0.2s ease",
      }}
    />
  </motion.button>
);

/* ── Main Section ── */
const JourneyLoopSection2 = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentPiece = partners[activeIdx];
  const detail = partnerDetails[currentPiece.id];

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
            Güçlü Partner
            <br />
            <span className="text-gradient-primary">Ekosistemi</span>
          </h2>
          <p
            className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            style={{ fontSize: "18px", lineHeight: 1.7 }}
          >
            Sektör lideri sağlayıcılar tek platformda; inceleme ve teklif süreci tek merkezden.
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
              background:
                "linear-gradient(135deg, hsl(268,60%,82%), hsl(174,55%,52%), hsl(268,72%,30%)) border-box",
              WebkitMask:
                "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* ── Top Edge: first 7 partners ── */}
          <div
            className="relative z-10 flex justify-center items-center py-5 flex-wrap"
            style={{ minHeight: "80px", gap: "20px" }}
          >
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
            <div
              className="relative overflow-hidden flex items-center justify-center"
              style={{
                minHeight: "440px",
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
                {detail && (
                  <motion.div
                    key={currentPiece.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 flex flex-col items-start px-8 md:px-14 py-10 w-full max-w-3xl mx-auto"
                  >
                    {/* Category badge */}
                    <span
                      className="inline-flex items-center px-4 py-1.5 rounded-full font-semibold tracking-wide uppercase backdrop-blur-sm shadow-sm mb-4"
                      style={{
                        fontSize: "11px",
                        background: "hsla(268,60%,96%,0.8)",
                        color: BRAND,
                        border: "1px solid hsla(268,72%,60%,0.2)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {detail.category}
                    </span>

                    {/* Partner logo */}
                    <div className="flex items-center justify-start mb-4">
                      <img
                        src={currentPiece.logo}
                        alt={currentPiece.name}
                        className="object-contain mix-blend-multiply"
                        style={{ height: "60px", maxWidth: "180px" }}
                      />
                    </div>

                    {/* Headline */}
                    <h3
                      className="text-2xl md:text-3xl font-black text-foreground mb-2"
                      style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
                    >
                      {detail.headline}
                    </h3>

                    {/* Leadership */}
                    <div
                      className="mb-4 rounded-xl w-full"
                      style={{
                        background: `${BRAND_HEX}08`,
                        borderLeft: `4px solid ${BRAND}`,
                        padding: "10px 14px",
                      }}
                    >
                      <p
                        className="font-semibold"
                        style={{ fontSize: "14px", lineHeight: 1.4, color: BRAND }}
                      >
                        {detail.leadership}
                      </p>
                    </div>

                    {/* Description */}
                    <p
                      className="text-muted-foreground mb-5"
                      style={{ fontSize: "15px", lineHeight: 1.75, maxWidth: "560px" }}
                    >
                      {detail.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-col gap-3 mb-5">
                      {detail.features.slice(0, 4).map((f) => (
                        <div key={f} className="flex items-start gap-3">
                          <Check
                            className="text-purple-600 shrink-0 mt-0.5"
                            style={{ width: 15, height: 15, strokeWidth: 2.8 }}
                          />
                          <span className="text-slate-700 text-sm font-medium">{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* Badge */}
                    {detail.badge && (
                      <span
                        className="inline-flex items-center px-4 py-1.5 rounded-full font-semibold text-xs"
                        style={{
                          background: `${BRAND_HEX}10`,
                          color: BRAND,
                          border: `1px solid ${BRAND_HEX}20`,
                        }}
                      >
                        {detail.badge}
                      </span>
                    )}

                    {/* Rocket CTA — bottom right inside card */}
                    <div className="flex w-full justify-end mt-2">
                      <Link to="/kobi/urunler">
                        <motion.div
                          className="flex items-center gap-3 cursor-pointer"
                          whileHover={{ scale: 1.06 }}
                          transition={{ type: "spring", stiffness: 300, damping: 22 }}
                          style={{
                            height: "48px",
                            padding: "0 24px 0 18px",
                            borderRadius: "2rem",
                            background:
                              "linear-gradient(135deg, hsl(268,72%,38%) 0%, hsl(280,68%,48%) 100%)",
                            boxShadow:
                              "0 8px 32px -4px rgba(109,40,217,0.4)",
                          }}
                        >
                          <Rocket
                            className="w-4 h-4 text-white"
                            style={{ transform: "rotate(-45deg)" }}
                          />
                          <span className="text-white font-bold text-sm whitespace-nowrap">
                            Çözümleri İncele
                          </span>
                          <ArrowRight className="w-4 h-4 text-white/80" />
                        </motion.div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Bottom Edge: remaining partners ── */}
          <div
            className="relative z-10 flex justify-center items-center py-5 flex-wrap"
            style={{ minHeight: "80px", gap: "20px" }}
          >
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
