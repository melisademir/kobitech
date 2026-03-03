import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useEmblaCarousel from "embla-carousel-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "Dijital Esnaf sayesinde ilk kez yurt dışına satış yapmaya başladık. Platform bizi adım adım yönlendirdi.",
    name: "Ahmet Yılmaz",
    role: "Tekstil İhracatçısı",
    company: "Yılmaz Tekstil",
    stars: 5,
  },
  {
    quote: "Muhasebe ve e-fatura entegrasyonu hayatımı kurtardı. Artık kağıt işleriyle uğraşmıyorum.",
    name: "Fatma Demir",
    role: "Gıda Üreticisi",
    company: "Demir Gıda",
    stars: 5,
  },
  {
    quote: "E-ticaret mağazamı kurdum, siparişlerim %200 arttı. Tek platformda her şey var.",
    name: "Mehmet Kaya",
    role: "Mobilya Atölyesi",
    company: "Kaya Mobilya",
    stars: 5,
  },
  {
    quote: "Sosyal medya yönetimi ve online satış kanallarını birlikte yürütebiliyorum artık.",
    name: "Zeynep Arslan",
    role: "Kozmetik Markası",
    company: "Arslan Kozmetik",
    stars: 5,
  },
  {
    quote: "Stok takibi ve kargo entegrasyonu mükemmel çalışıyor. Zamandan büyük tasarruf.",
    name: "Can Öztürk",
    role: "Elektronik Perakende",
    company: "Öztürk Elektronik",
    stars: 5,
  },
  {
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
      "relative flex flex-col rounded-2xl border border-border/50 bg-card p-5 md:p-7 h-full",
      "transition-shadow duration-300 hover:shadow-lg"
    )}
  >
    {/* Quote mark */}
    <div
      className="absolute top-4 right-5 text-4xl md:text-5xl font-serif leading-none select-none pointer-events-none"
      style={{ color: "hsl(var(--primary) / 0.08)" }}
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

    {/* Testimonial text */}
    <p className="text-muted-foreground flex-1 text-sm md:text-[15px] leading-relaxed mb-5">
      {t.quote}
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
      <Avatar className="h-9 w-9">
        <AvatarFallback
          className="text-xs font-bold text-primary-foreground"
          style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(268 72% 55%))" }}
        >
          {t.name[0]}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-foreground text-sm leading-tight">{t.name}</p>
        <p className="text-muted-foreground text-xs mt-0.5">
          {t.role}{t.company && ` @ ${t.company}`}
        </p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 md:py-24">
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
              background: "hsl(var(--primary) / 0.06)",
              color: "hsl(var(--primary))",
              border: "1.5px solid hsl(var(--primary) / 0.15)",
            }}
          >
            <Star className="w-3 h-3 fill-current" />
            Başarı Hikayeleri
          </span>
          <h2
            className="text-3xl md:text-5xl font-extrabold text-foreground mb-3 md:mb-4"
            style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
          >
            İşletmelerden
            <br />
            <span className="text-gradient-primary">Geri Bildirimler</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-lg" style={{ lineHeight: "1.7" }}>
            KobiTECH ile dönüşen işletme sahiplerinin deneyimleri
          </p>
        </motion.div>

        {/* Mobile: Swipeable carousel */}
        {isMobile ? (
          <div>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-3" style={{ touchAction: "pan-y pinch-zoom" }}>
                {testimonials.map((t, i) => (
                  <div key={t.name} className="flex-shrink-0" style={{ width: "75%" }}>
                    <TestimonialCard t={t} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: i === selectedIndex ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.2)",
                    transform: i === selectedIndex ? "scale(1.3)" : "scale(1)",
                  }}
                  onClick={() => emblaApi?.scrollTo(i)}
                />
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={cardVariants}>
                <TestimonialCard t={t} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
