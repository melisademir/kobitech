import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useIsMobile } from "@/hooks/use-mobile";

const testimonials = [
  {
    quote: "Dijital Esnaf sayesinde ilk kez yurt dışına satış yapmaya başladık. Platform bizi adım adım yönlendirdi.",
    name: "Ahmet Yılmaz",
    role: "Tekstil İhracatçısı",
    stars: 5,
  },
  {
    quote: "Muhasebe ve e-fatura entegrasyonu hayatımı kurtardı. Artık kağıt işleriyle uğraşmıyorum.",
    name: "Fatma Demir",
    role: "Gıda Üreticisi",
    stars: 5,
  },
  {
    quote: "E-ticaret mağazamı kurdum, siparişlerim %200 arttı. Tek platformda her şey var.",
    name: "Mehmet Kaya",
    role: "Mobilya Atölyesi",
    stars: 5,
  },
  {
    quote: "Sosyal medya yönetimi ve online satış kanallarını birlikte yürütebiliyorum artık.",
    name: "Zeynep Arslan",
    role: "Kozmetik Markası",
    stars: 5,
  },
  {
    quote: "Stok takibi ve kargo entegrasyonu mükemmel çalışıyor. Zamandan büyük tasarruf.",
    name: "Can Öztürk",
    role: "Elektronik Perakende",
    stars: 5,
  },
  {
    quote: "Global pazara açılmak istiyorduk, Dijital Esnaf tam da bunu sağladı.",
    name: "Elif Şahin",
    role: "El Sanatları İhracatı",
    stars: 5,
  },
];

const avatarGradients = [
  "linear-gradient(135deg, #6D28D9, #7C3AED)",
  "linear-gradient(135deg, #7C3AED, #8B5CF6)",
  "linear-gradient(135deg, #8B5CF6, #A78BFA)",
  "linear-gradient(135deg, #6D28D9, #8B5CF6)",
  "linear-gradient(135deg, #7C3AED, #A78BFA)",
  "linear-gradient(135deg, #5B21B6, #7C3AED)",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const TestimonialCard = ({ t, i }: { t: typeof testimonials[0]; i: number }) => (
  <div
    className="rounded-[16px] flex flex-col relative overflow-hidden cursor-default transition-shadow duration-300 h-full"
    style={{
      background: "white",
      border: "1px solid rgba(0,0,0,0.06)",
      padding: "1.5rem",
      boxShadow: "0 2px 8px rgba(72,11,135,0.11), 0 8px 32px rgba(72,11,135,0.11)",
    }}
  >
    <Quote className="absolute top-4 right-4 w-6 h-6" style={{ color: "rgba(109,40,217,0.08)" }} />

    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, si) => (
        <Star key={si} className="w-3.5 h-3.5 text-primary fill-primary" />
      ))}
    </div>

    <p className="text-foreground flex-1 text-sm" style={{ lineHeight: "1.7", opacity: 0.82 }}>
      "{t.quote}"
    </p>

    <div className="flex items-center gap-2.5 mt-4 pt-3 border-t" style={{ borderColor: "hsl(38,30%,88%)" }}>
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
        style={{ background: avatarGradients[i] }}
      >
        {t.name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-foreground text-xs">{t.name}</p>
        <p className="text-muted-foreground text-[11px] mt-0.5">{t.role}</p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false, dragFree: true });

  return (
    <section className="py-14 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 md:mb-16"
        >
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold mb-4 md:mb-6 tracking-widest uppercase cursor-default"
            style={{
              background: "rgba(109,40,217,0.06)",
              color: "hsl(268,72%,38%)",
              border: "1.5px solid rgba(109,40,217,0.15)",
            }}
          >
            <Star className="w-3 h-3 fill-current" />
            Başarı Hikayeleri
          </span>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}
          >
            İşletmelerden Geri Bildirimler
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-lg" style={{ lineHeight: "1.7" }}>
            KobiTECH ile dönüşen işletme sahiplerinin deneyimleri
          </p>
        </motion.div>

        {/* Mobile: Swipeable carousel */}
        {isMobile ? (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3" style={{ touchAction: "pan-y pinch-zoom" }}>
              {testimonials.map((t, i) => (
                <div key={t.name} className="flex-shrink-0" style={{ width: "75%" }}>
                  <TestimonialCard t={t} i={i} />
                </div>
              ))}
            </div>
            {/* Dots indicator */}
            <div className="flex justify-center gap-1.5 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-colors"
                  style={{ background: "hsl(268,72%,38%,0.2)" }}
                  onClick={() => emblaApi?.scrollTo(i)}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop: Grid */
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={cardVariants}>
                <TestimonialCard t={t} i={i} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
