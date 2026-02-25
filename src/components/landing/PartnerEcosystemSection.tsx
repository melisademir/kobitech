import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { pieces } from "./partner-ecosystem/partner-data";
import PuzzleBoard from "./partner-ecosystem/PuzzleBoard";
import PartnerPanel from "./partner-ecosystem/PartnerPanel";

const PRIMARY_HEX = "#6B21A8";

const PartnerEcosystemSection = () => {
  const [selectedId, setSelectedId] = useState<string | null>("paramtech");
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
      className="py-12 md:py-20 lg:py-28 overflow-hidden"
      style={{ background: "hsl(38,30%,97%)" }}
    >
      <div className="max-w-[1340px] mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-10"
        >
          <h2
            className="text-3xl md:text-5xl font-extrabold text-gradient-heading mx-auto"
            style={{ letterSpacing: "-0.04em", lineHeight: 1.05, maxWidth: "640px" }}
          >
            Güçlü Partner Ekosistemi
          </h2>
          <p
            className="text-muted-foreground mt-2 md:mt-3 mx-auto text-sm md:text-base whitespace-nowrap"
            style={{ lineHeight: 1.7 }}
          >
            Sektör lideri sağlayıcılar tek platformda; inceleme ve teklif süreci tek merkezden.
          </p>
        </motion.div>

        {/* Unified container card */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="p-4 md:p-6 lg:p-10"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "16px",
            boxShadow: "0 2px 8px hsl(268 30% 20% / 0.04), 0 8px 32px hsl(268 72% 38% / 0.07), inset 0 1px 0 rgba(255,255,255,0.6)",
            border: "1.5px solid rgba(255,255,255,0.35)",
            maxWidth: "1400px",
            margin: "0 auto"
          }}
        >
          <div className="flex flex-col lg:flex-row items-stretch gap-6 md:gap-8 xl:gap-10 h-full">
            {/* LEFT: SVG Puzzle */}
            <motion.div
              className="w-full lg:w-[46%] flex-shrink-0 flex flex-col pb-2 md:pb-3 lg:pb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex-1 flex items-center justify-center lg:mt-[-92px]">
                <div className="w-full max-w-[280px] md:max-w-[360px] lg:max-w-none mx-auto">
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
            <div className="w-full lg:flex-1 flex flex-col mt-2 md:mt-3 lg:mt-0">
              <motion.div
                className="flex-1 rounded-xl md:rounded-2xl p-4 md:p-7 flex flex-col justify-start relative overflow-hidden"
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
