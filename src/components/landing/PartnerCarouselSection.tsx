import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { pieces, partnerDetails } from "./partner-ecosystem/partner-data";

interface PartnerSlide {
  id: string;
  name: string;
  logo: string;
  color: string;
  category: string;
  description: string;
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
    description: detail?.description ?? "",
    features: detail?.features ?? [],
  };
});

const getStackIndices = (current: number, total: number) => {
  const wrap = (i: number) => ((i % total) + total) % total;
  return [wrap(current - 2), wrap(current - 1), current, wrap(current + 1), wrap(current + 2)];
};

const stackPositions = [
  { y: 24, scale: 0.88, opacity: 0.3, z: 1 },
  { y: 12, scale: 0.94, opacity: 0.5, z: 2 },
  { y: 0, scale: 1, opacity: 1, z: 5 },
  { y: 12, scale: 0.94, opacity: 0.5, z: 2 },
  { y: 24, scale: 0.88, opacity: 0.3, z: 1 },
];

const PartnerCarouselSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((i) => (i + 1) % partners.length);
  const handlePrevious = () => setCurrentIndex((i) => (i - 1 + partners.length) % partners.length);

  const stackIndices = getStackIndices(currentIndex, partners.length);

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

        <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
          {/* Desktop stacked cards */}
          <div className="hidden md:block w-full relative" style={{ minHeight: "400px" }}>
            {stackIndices.map((partnerIdx, posIdx) => {
              const p = partners[partnerIdx];
              const pos = stackPositions[posIdx];
              const isActive = posIdx === 2;
              return (
                <motion.div
                  key={p.id}
                  className="absolute inset-x-0 mx-auto w-full"
                  style={{ zIndex: pos.z }}
                  animate={{ y: pos.y, scale: pos.scale, opacity: pos.opacity }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="grid w-full" style={{ gridTemplateColumns: "380px 1fr", minHeight: "360px" }}>
                    {/* Logo panel */}
                    <div
                      className="relative rounded-2xl overflow-hidden"
                      style={{
                        background: isActive
                          ? `linear-gradient(145deg, ${p.color}18, ${p.color}08)`
                          : "hsl(var(--muted) / 0.5)",
                        border: "1px solid hsl(var(--border))",
                      }}
                    >
                      {isActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img src={p.logo} alt={p.name} className="w-64 h-64 object-contain mix-blend-multiply" />
                        </div>
                      )}
                    </div>

                    {/* Content card */}
                    <div className="flex items-center" style={{ marginLeft: "-32px", zIndex: 10 }}>
                      <div
                        className="rounded-2xl p-8 lg:p-10 w-full"
                        style={{
                          background: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          boxShadow: isActive ? "0 8px 40px rgba(0,0,0,0.10)" : "0 2px 12px rgba(0,0,0,0.04)",
                        }}
                      >
                        {isActive ? (
                          <>
                            <h3 className="text-2xl font-extrabold text-foreground mb-1" style={{ letterSpacing: "-0.02em" }}>
                              {p.name}
                            </h3>
                            <p className="text-sm text-muted-foreground italic mb-4">{p.category}</p>
                            <p className="text-foreground/80 text-base leading-relaxed mb-5">{p.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {p.features.slice(0, 4).map((f) => (
                                <span
                                  key={f}
                                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                                  style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div style={{ minHeight: "200px" }} />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile stacked cards */}
          <div className="md:hidden w-full relative" style={{ minHeight: "420px" }}>
            {stackIndices.map((partnerIdx, posIdx) => {
              const p = partners[partnerIdx];
              const pos = stackPositions[posIdx];
              const isActive = posIdx === 2;
              return (
                <motion.div
                  key={p.id}
                  className="absolute inset-x-0 mx-auto w-full"
                  style={{ zIndex: pos.z }}
                  animate={{ y: pos.y, scale: pos.scale, opacity: pos.opacity }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="flex flex-col">
                    <div
                      className="w-full rounded-2xl rounded-b-none flex items-center justify-center"
                      style={{
                        height: "200px",
                        background: isActive
                          ? `linear-gradient(145deg, ${p.color}18, ${p.color}08)`
                          : "hsl(var(--muted) / 0.5)",
                        border: "1px solid hsl(var(--border))",
                        borderBottom: "none",
                      }}
                    >
                      {isActive && (
                        <img src={p.logo} alt={p.name} className="w-44 h-44 object-contain mix-blend-multiply" />
                      )}
                    </div>
                    <div
                      className="rounded-2xl rounded-t-none p-6 w-full"
                      style={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderTop: "none",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                      }}
                    >
                      {isActive ? (
                        <>
                          <h3 className="text-lg font-extrabold text-foreground mb-1">{p.name}</h3>
                          <p className="text-xs text-muted-foreground italic mb-3">{p.category}</p>
                          <p className="text-foreground/80 text-sm leading-relaxed">{p.description}</p>
                        </>
                      ) : (
                        <div style={{ minHeight: "120px" }} />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevious}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}
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
                    i === currentIndex ? "bg-foreground" : "bg-muted-foreground/30"
                  )}
                  aria-label={`Partner ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}
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
