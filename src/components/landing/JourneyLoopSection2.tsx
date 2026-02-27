import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Check } from "lucide-react";
import { pieces, partnerDetails } from "./partner-ecosystem/partner-data";
import type { PuzzlePiece } from "./partner-ecosystem/partner-data";

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
    whileHover={!isActive ? { scale: 1.06 } : undefined}
    whileTap={{ scale: 0.96 }}
    transition={{ type: "spring", stiffness: 300, damping: 22 }}
    className={`
      relative flex items-center justify-center cursor-pointer rounded-2xl transition-all duration-300
      ${isActive
        ? "bg-primary/[0.06] ring-2 ring-primary/20 shadow-md"
        : "hover:bg-muted/60"
      }
    `}
    style={{
      padding: isActive ? "10px 24px" : "8px 20px",
    }}
  >
    {/* Active glow */}
    {isActive && (
      <motion.div
        layoutId="chip-glow"
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.08), transparent 70%)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
    <img
      src={piece.logo}
      alt={piece.name}
      className="relative z-10 object-contain"
      style={{
        height: isActive ? "34px" : "28px",
        maxWidth: isActive ? "100px" : "80px",
        transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
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
          {/* Glow behind track */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "-60px -80px",
              background:
                "radial-gradient(ellipse 60% 40% at 25% 50%, hsl(var(--primary) / 0.15) 0%, transparent 70%), radial-gradient(ellipse 30% 30% at 50% 20%, hsl(var(--accent) / 0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 60%, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
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
                "linear-gradient(135deg, hsl(268 60% 82%), hsl(168 76% 52%), hsl(268 72% 30%)) border-box",
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
            <div className="relative overflow-hidden flex items-center justify-center glass-card rounded-[2rem] shadow-card"
              style={{ minHeight: "440px" }}
            >
              {/* Inner glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 50% 50% at 50% 50%, hsl(var(--primary) / 0.04), transparent 65%)",
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
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full font-semibold tracking-widest uppercase text-[11px] mb-4 bg-primary/[0.06] text-primary border border-primary/10 backdrop-blur-sm shadow-sm">
                      {detail.category}
                    </span>

                    {/* Partner logo */}
                    <div className="flex items-center justify-start mb-4">
                      <img
                        src={currentPiece.logo}
                        alt={currentPiece.name}
                        className="object-contain"
                        style={{ height: "40px", maxWidth: "180px" }}
                      />
                    </div>

                    {/* Headline */}
                    <h3 className="text-2xl md:text-3xl font-black text-foreground mb-2" style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                      {detail.headline}
                    </h3>

                    {/* Leadership */}
                    <div className="mb-4 rounded-xl w-full bg-primary/[0.04] border-l-4 border-primary px-4 py-3">
                      <p className="font-semibold text-sm leading-snug text-primary">
                        {detail.leadership}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-5 text-[15px] leading-relaxed max-w-[560px]">
                      {detail.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-col gap-3 mb-5">
                      {detail.features.slice(0, 4).map((f) => (
                        <div key={f} className="flex items-start gap-3">
                          <Check className="text-primary shrink-0 mt-0.5 w-[15px] h-[15px]" strokeWidth={2.8} />
                          <span className="text-foreground/80 text-sm font-medium">{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* Badge */}
                    {detail.badge && (
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full font-semibold text-xs bg-primary/[0.06] text-primary border border-primary/10">
                        {detail.badge}
                      </span>
                    )}

                    {/* Rocket CTA — bottom right inside card */}
                    <div className="absolute bottom-6 right-6">
                      <Link to="/kobi/urunler">
                        <motion.div
                          className="flex items-center gap-3 cursor-pointer rounded-full text-primary-foreground font-bold text-sm shadow-premium"
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 300, damping: 22 }}
                          style={{
                            height: "48px",
                            padding: "0 24px 0 18px",
                            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                          }}
                        >
                          <Rocket className="w-4 h-4" style={{ transform: "rotate(-45deg)" }} />
                          <span className="whitespace-nowrap">Çözümleri İncele</span>
                          <ArrowRight className="w-4 h-4 opacity-80" />
                        </motion.div>
                      </Link>
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
