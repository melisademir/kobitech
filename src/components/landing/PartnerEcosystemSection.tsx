import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { pieces } from "./partner-ecosystem/partner-data";
import PuzzleBoard from "./partner-ecosystem/PuzzleBoard";
import PartnerPanel from "./partner-ecosystem/PartnerPanel";

// Design system primary hex for inline styles
const PRIMARY_HEX = "#6B21A8";

const PartnerEcosystemSection = () => {
  const [selectedId, setSelectedId] = useState<string | null>("param");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.06 });

  useEffect(() => {
    if (inView) setTimeout(() => setVisible(true), 80);
  }, [inView]);

  const selectedPiece = selectedId ? pieces.find((p) => p.id === selectedId) ?? null : null;

  return (
    <section
      id="partner-ecosystem"
      className="py-20 md:py-28 overflow-hidden"
      style={{ background: "hsl(38,30%,97%)" }}
    >
      <div className="max-w-[1340px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2
            className="font-black text-foreground mx-auto"
            style={{ fontSize: "clamp(1.8rem,3.5vw,2.75rem)", lineHeight: 1.1, letterSpacing: "-0.035em", maxWidth: "640px" }}
          >
            Güçlü Partner Ekosistemi
          </h2>
          <p
            className="text-muted-foreground mt-3 mx-auto"
            style={{ maxWidth: "460px", fontSize: "19px", lineHeight: 1.7 }}
          >
            Sektör lideri sağlayıcılar tek platformda; inceleme ve teklif süreci tek merkezden.
          </p>
        </motion.div>

        {/* Unified container card — 24px radius, corporate shadow */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 2px 8px hsl(268 30% 20% / 0.04), 0 8px 32px hsl(268 72% 38% / 0.07)",
            border: "1px solid hsl(38,30%,88%)",
            maxWidth: "1400px",
            margin: "0 auto"
          }}
        >
          <div className="flex flex-col lg:flex-row items-stretch gap-8 xl:gap-10 h-full">
            {/* LEFT: SVG Puzzle */}
            <motion.div
              className="w-full lg:w-[46%] flex-shrink-0 flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex-1 flex items-center justify-center lg:mt-[-92px]">
                <div className="w-full max-w-[400px] lg:max-w-none mx-auto">
                  <PuzzleBoard selectedId={selectedId} onSelect={setSelectedId} visible={visible} />
                </div>
              </div>
            </motion.div>

            {/* Connector — gradient line */}
            <div className="hidden lg:flex flex-col items-center self-stretch" style={{ width: "20px" }}>
              <motion.div
                className="flex-1"
                style={{
                  width: "2px",
                  background: selectedPiece
                    ? `linear-gradient(to bottom, transparent 10%, ${PRIMARY_HEX}40 30%, ${PRIMARY_HEX}60 50%, ${PRIMARY_HEX}40 70%, transparent 90%)`
                    : "linear-gradient(to bottom, transparent, hsl(260,30%,14%,0.06) 20%, hsl(260,30%,14%,0.06) 80%, transparent)",
                  transition: "background 0.4s ease",
                  borderRadius: "1px",
                  boxShadow: selectedPiece ? `0 0 8px ${PRIMARY_HEX}20` : "none"
                }}
              />
            </div>

            {/* RIGHT: Dynamic content panel */}
            <div className="w-full lg:flex-1 flex flex-col">
              <motion.div
                className="flex-1 rounded-2xl p-7 flex flex-col justify-start relative overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, hsl(0,0%,100%) 0%, hsl(252,60%,98%) 100%)",
                  border: "1px solid hsl(38,30%,88%)",
                  borderLeft: selectedPiece ? `3px solid ${PRIMARY_HEX}50` : "1px solid hsl(38,30%,88%)",
                  transition: "border-left-color 0.4s ease"
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              >
                {/* Top accent glow band */}
                {selectedPiece && (
                  <motion.div
                    key={`glow-${selectedPiece.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: "3px",
                      background: `linear-gradient(90deg, ${PRIMARY_HEX}60, ${PRIMARY_HEX}30, transparent)`,
                      borderRadius: "0 0 4px 4px"
                    }}
                  />
                )}

                <AnimatePresence mode="wait">
                  {selectedPiece && (
                    <motion.div
                      key={selectedPiece.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <PartnerPanel piece={selectedPiece} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerEcosystemSection;
