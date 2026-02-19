import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

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
    stars: 4,
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

const avatarColors = [
  "bg-primary",
  "bg-accent",
  "bg-warning",
  "bg-info",
  "bg-primary/80",
  "bg-accent/80",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const TestimonialsSection = () => (
  <section className="py-20 bg-muted/30">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-14"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-warning/15 text-warning text-xs font-semibold mb-4 tracking-wide uppercase"
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          Başarı Hikayeleri
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
          KOBİ'lerden Geri Bildirimler
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Dijital Esnaf ile dönüşen işletme sahiplerinin deneyimleri
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bg-card rounded-2xl p-7 border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col relative overflow-hidden"
          >
            {/* Decorative quote */}
            <Quote className="absolute top-4 right-4 w-10 h-10 text-muted-foreground/10" />

            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star
                  key={si}
                  className={`w-5 h-5 ${
                    si < t.stars
                      ? "text-warning fill-warning"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            {/* Quote */}
            <p className="text-foreground text-sm leading-relaxed italic flex-1">
              "{t.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-5 pt-5 border-t border-border">
              <div
                className={`w-11 h-11 rounded-full ${avatarColors[i]} flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0`}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TestimonialsSection;
