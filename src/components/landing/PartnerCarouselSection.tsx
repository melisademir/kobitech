import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { pieces, partnerDetails } from "./partner-ecosystem/partner-data";

interface PartnerSlide {
  id: string;
  name: string;
  logo: string;
  color: string;
  category: string;
  headline: string;
  description: string;
  badge: string;
  features: string[];
}

const partners: PartnerSlide[] = pieces.map((p) => {
  const detail = partnerDetails[p.id];
  return {
    id: p.id,
    name: p.name,
    logo: p.logo,
    color: p.color,
    category: detail?.category ?? "",
    headline: detail?.headline ?? p.name,
    description: detail?.description ?? "",
    badge: detail?.badge ?? "",
    features: detail?.features ?? [],
  };
});

const PartnerCarouselSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((i) => (i + 1) % partners.length);
  const handlePrevious = () =>
    setCurrentIndex((i) => (i - 1 + partners.length) % partners.length);

  const current = partners[currentIndex];

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <h2
            className="text-3xl md:text-5xl font-extrabold text-foreground"
            style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
          >
            Güçlü Partner
            <br />
            <span className="text-gradient-primary">Ekosistemi</span>
          </h2>
          <p
            className="text-muted-foreground mt-3 mx-auto text-sm md:text-base"
            style={{ lineHeight: 1.7, maxWidth: "480px" }}
          >
            Sektör lideri sağlayıcılar tek platformda; inceleme ve teklif süreci tek merkezden.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">

          {/* Desktop layout */}
          <div className="hidden md:grid w-full" style={{ gridTemplateColumns: "380px 1fr", minHeight: "380px" }}>
            {/* Left — full-height logo panel */}
            <div className="relative" style={{ gridRow: "1", gridColumn: "1" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 rounded-2xl flex items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(145deg, ${current.color}18, ${current.color}08)`,
                    border: "1px solid hsl(var(--border))",
                  }}
                >
                  <img
                    src={current.logo}
                    alt={current.name}
                    className="w-64 h-64 object-contain mix-blend-multiply"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — card overlapping the logo panel */}
            <div
              className="relative z-10 flex items-center"
              style={{ gridRow: "1", gridColumn: "2", marginLeft: "-32px" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl p-8 lg:p-10 w-full"
                  style={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
                  }}
                >
                  <h3
                    className="text-2xl font-extrabold text-foreground mb-1"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {current.name}
                  </h3>
                  <p className="text-sm text-muted-foreground italic mb-4">
                    {current.category}
                  </p>
                  <p className="text-foreground/80 text-base leading-relaxed mb-5">
                    {current.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {current.features.slice(0, 4).map((f) => (
                      <span
                        key={f}
                        className="text-xs px-3 py-1.5 rounded-full font-medium"
                        style={{
                          background: "hsl(var(--muted))",
                          color: "hsl(var(--muted-foreground))",
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden w-full flex flex-col items-center gap-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mob-logo-${current.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full rounded-2xl rounded-b-none flex items-center justify-center"
                style={{
                  height: "220px",
                  background: `linear-gradient(145deg, ${current.color}18, ${current.color}08)`,
                  border: "1px solid hsl(var(--border))",
                  borderBottom: "none",
                }}
              >
                <img
                  src={current.logo}
                  alt={current.name}
                  className="w-44 h-44 object-contain mix-blend-multiply"
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`mob-card-${current.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl rounded-t-none p-6 w-full"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderTop: "none",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <h3 className="text-lg font-extrabold text-foreground mb-1">{current.name}</h3>
                <p className="text-xs text-muted-foreground italic mb-3">{current.category}</p>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevious}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: "hsl(var(--muted))",
                color: "hsl(var(--foreground))",
              }}
              aria-label="Önceki partner"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {partners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-colors",
                    i === currentIndex
                      ? "bg-foreground"
                      : "bg-muted-foreground/30"
                  )}
                  aria-label={`Partner ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: "hsl(var(--muted))",
                color: "hsl(var(--foreground))",
              }}
              aria-label="Sonraki partner"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerCarouselSection;
