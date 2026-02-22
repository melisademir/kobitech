import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import type { PuzzlePiece } from "./partner-data";
import { partnerDetails } from "./partner-data";

// Design system primary: hsl(268,72%,38%) = #6B21A8
const BRAND = "hsl(268,72%,38%)";
const BRAND_HEX = "#6B21A8";

const PartnerPanel = ({ piece }: { piece: PuzzlePiece }) => {
  const d = partnerDetails[piece.id];
  if (!d) return null;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } }
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" as const } }
  };

  return (
    <motion.div
      className="flex flex-col"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Category badge */}
      <motion.div variants={item} className="mb-5">
        <span
          className="inline-flex items-center px-4 py-1.5 rounded-full font-semibold tracking-widest uppercase"
          style={{
            fontSize: "11px",
            background: `${BRAND_HEX}12`,
            color: BRAND,
            border: `1.5px solid ${BRAND_HEX}30`,
            letterSpacing: "0.1em"
          }}
        >
          {d.category}
        </span>
      </motion.div>

      {/* Partner logo with accent glow */}
      <motion.div variants={item} className="flex justify-center mb-5 relative">
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: "none" }}>
          <div style={{
            width: 120, height: 60, borderRadius: "50%",
            background: `radial-gradient(ellipse, ${BRAND_HEX}18 0%, transparent 70%)`,
            filter: "blur(8px)"
          }} />
        </div>
        <div
          className="relative flex items-center justify-center overflow-hidden bg-white"
          style={{
            width: 100, height: 60,
            borderRadius: "16px",
            boxShadow: `0 2px 8px hsl(268 30% 20% / 0.08), 0 0 0 1px ${BRAND_HEX}15`,
            border: `1.5px solid ${BRAND_HEX}25`,
            padding: "10px 14px"
          }}
        >
          {piece.logo ? (
            <img src={piece.logo} alt={piece.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          ) : (
            <span className="font-black text-center" style={{ color: BRAND, fontSize: "18px", letterSpacing: "-0.02em" }}>
              {piece.name}
            </span>
          )}
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div variants={item} className="text-center mb-1">
        <h3
          className="font-black text-foreground"
          style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
        >
          {d.headline}
        </h3>
      </motion.div>

      {/* Gold accent band under heading */}
      <motion.div variants={item} className="flex justify-center mb-6">
        <div style={{
          width: 60, height: 3, borderRadius: 2,
          background: "linear-gradient(90deg, transparent, hsl(43,65%,52%), transparent)",
          opacity: 0.7
        }} />
      </motion.div>

      {/* Leadership statement */}
      <motion.div
        variants={item}
        className="mb-5 rounded-xl"
        style={{
          background: `${BRAND_HEX}08`,
          borderLeft: `4px solid ${BRAND}`,
          padding: "16px 20px"
        }}
      >
        <p className="font-semibold" style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", lineHeight: 1.4, color: BRAND }}>
          {d.leadership}
        </p>
      </motion.div>

      {/* Description */}
      <motion.div variants={item} className="mb-6">
        <p className="text-muted-foreground" style={{ fontSize: "15px", fontWeight: 400, lineHeight: 1.65, letterSpacing: "0.01em", maxWidth: "520px" }}>
          {d.description}
        </p>
      </motion.div>

      {/* Features */}
      <motion.div variants={item} className="mb-6">
        <p className="uppercase tracking-widest font-semibold mb-3 text-muted-foreground" style={{ fontSize: "11px" }}>
          Özellikler
        </p>
        <div className="flex flex-col gap-2.5">
          {d.features.map((f) => (
            <div key={f} className="flex items-center gap-2.5">
              <Check style={{ width: 15, height: 15, color: BRAND, strokeWidth: 2.8, flexShrink: 0 }} />
              <span className="text-foreground" style={{ fontSize: "15px", fontWeight: 500 }}>{f}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Platform badge */}
      {d.badge && (
        <motion.div variants={item} className="mb-5">
          <span
            className="inline-flex items-center px-4 py-2 rounded-full font-semibold"
            style={{
              fontSize: "13px",
              background: `${BRAND_HEX}10`,
              color: BRAND,
              border: `1px solid ${BRAND_HEX}20`
            }}
          >
            {d.badge}
          </span>
        </motion.div>
      )}

      {/* CTA button — design system: 54px height, 260px minWidth, 24px radius */}
      <motion.div variants={item}>
        <Link to="/kobi/urunler" className="block">
          <button
            className="inline-flex items-center justify-center gap-2 w-full font-bold text-white transition-all duration-200"
            style={{
              height: "54px",
              padding: "0 40px",
              borderRadius: "24px",
              fontSize: "16px",
              letterSpacing: "0.01em",
              minWidth: "260px",
              background: BRAND,
              boxShadow: `0 4px 16px ${BRAND_HEX}40`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 6px 24px ${BRAND_HEX}55`;
              e.currentTarget.style.filter = "brightness(0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 4px 16px ${BRAND_HEX}40`;
              e.currentTarget.style.filter = "brightness(1)";
            }}
          >
            {piece.name} Çözümünü İncele
            <ArrowRight style={{ width: 18, height: 18 }} />
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default PartnerPanel;
