import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useEmblaCarousel from "embla-carousel-react";

import { cn } from "@/lib/utils";

const testimonials = [
  {
    headline: "Param TECH ile ilk 3 ayda online satışlarımız %60 arttı",
    quote: "Dijital Esnaf sayesinde ilk kez yurt dışına satış yapmaya başladık. Platform bizi adım adım yönlendirdi.",
    name: "Ahmet Yılmaz",
    role: "Tekstil İhracatçısı",
    company: "Yılmaz Tekstil",
    stars: 5,
  },
  {
    headline: "Param TECH ile ilk 3 ayda online satışlarımız %60 arttı",
    quote: "Muhasebe ve e-fatura entegrasyonu hayatımı kurtardı. Artık kağıt işleriyle uğraşmıyorum.",
    name: "Fatma Demir",
    role: "Gıda Üreticisi",
    company: "Demir Gıda",
    stars: 5,
  },
  {
    headline: "Param TECH ile ilk 3 ayda online satışlarımız %60 arttı",
    quote: "E-ticaret mağazamı kurdum, siparişlerim %200 arttı. Tek platformda her şey var.",
    name: "Mehmet Kaya",
    role: "Mobilya Atölyesi",
    company: "Kaya Mobilya",
    stars: 5,
  },
  {
    headline: "Param TECH ile ilk 3 ayda online satışlarımız %60 arttı",
    quote: "Sosyal medya yönetimi ve online satış kanallarını birlikte yürütebiliyorum artık.",
    name: "Zeynep Arslan",
    role: "Kozmetik Markası",
    company: "Arslan Kozmetik",
    stars: 5,
  },
  {
    headline: "Param TECH ile ilk 3 ayda online satışlarımız %60 arttı",
    quote: "Stok takibi ve kargo entegrasyonu mükemmel çalışıyor. Zamandan büyük tasarruf.",
    name: "Can Öztürk",
    role: "Elektronik Perakende",
    company: "Öztürk Elektronik",
    stars: 5,
  },
  {
    headline: "Param TECH ile ilk 3 ayda online satışlarımız %60 arttı",
    quote: "Global pazara açılmak istiyorduk, Dijital Esnaf tam da bunu sağladı.",
    name: "Elif Şahin",
    role: "El Sanatları İhracatı",
    company: "Şahin Craft",
    stars: 5,
  },
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

const TestimonialCard = ({ t }: { t: typeof testimonials[0] }) => (
  <div
    className={cn(
      "relative flex flex-col p-5 md:p-7 h-full",
      "transition-shadow duration-300 hover:shadow-lg"
    )}
    style={{
      background: "#FFFFFF",
      border: "1px solid #E2E8F0",
      borderRadius: "12px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    }}
  >
    {/* Quote mark */}
    <div
      className="absolute top-4 right-5 text-4xl md:text-5xl font-serif leading-none select-none pointer-events-none"
      style={{ color: "rgba(74,29,181,0.08)" }}
    >
      "
    </div>

    {/* Stars */}
    {t.stars > 0 && (
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < t.stars ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"
            )}
          />
        ))}
      </div>
    )}

    {/* Headline */}
    {t.headline && (
      <h3 className="font-bold text-sm md:text-base leading-snug mb-2" style={{ color: "#1A0A4A" }}>
        "{t.headline}"
      </h3>
    )}

    {/* Testimonial text */}
    <p className="flex-1 text-sm md:text-[15px] leading-relaxed mb-5" style={{ color: "#64748B" }}>
      {t.quote}
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid #E2E8F0" }}>
      <Avatar className="h-9 w-9">
        <AvatarFallback
          className="text-xs font-bold text-white"
          style={{ background: "#4A1DB5" }}
        >
          {t.name[0]}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-sm leading-tight" style={{ color: "#1A0A4A" }}>{t.name}</p>
        <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
          {t.role}{t.company && ` @ ${t.company}`}
        </p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
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
              background: "rgba(74,29,181,0.06)",
              color: "#4A1DB5",
              border: "1.5px solid rgba(74,29,181,0.15)",
            }}
          >
            <Star className="w-3 h-3 fill-current" />
            Başarı Hikayeleri
          </span>
          <h2
            className="text-3xl md:text-5xl font-extrabold mb-3 md:mb-4"
            style={{ letterSpacing: "-0.04em", lineHeight: 1.05, color: "#1A0A4A" }}
          >
            İşletmelerden <span className="text-gradient-primary">Geri Bildirimler</span>
          </h2>
          <p className="max-w-md mx-auto text-base md:text-lg" style={{ lineHeight: "1.7", color: "#64748B" }}>
            DigitalHub ile dönüşen işletme sahiplerinin deneyimleri
          </p>
        </motion.div>

        {/* Swipeable single-row carousel for all screen sizes */}
        <div>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 md:gap-6" style={{ touchAction: "pan-y pinch-zoom" }}>
              {testimonials.map((t) => (
                <div key={t.name} className="flex-shrink-0 w-[75%] md:w-[38%] lg:w-[30%]">
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === selectedIndex ? "#4A1DB5" : "rgba(74,29,181,0.2)",
                transform: i === selectedIndex ? "scale(1.3)" : "scale(1)",
                }}
                onClick={() => emblaApi?.scrollTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default TestimonialsSection;
