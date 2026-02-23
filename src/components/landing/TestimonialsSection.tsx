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

const TestimonialsSection = () => (
  <section className="py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16"
      >
        <span
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase cursor-default"
          style={{
            background: "rgba(109,40,217,0.06)",
            color: "hsl(268,72%,38%)",
            border: "1.5px solid rgba(109,40,217,0.15)",
          }}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          Başarı Hikayeleri
        </span>
        <h2
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}
        >
          İşletmelerden Geri Bildirimler
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto" style={{ fontSize: "19px", lineHeight: "1.7" }}>
          KobiTECH ile dönüşen işletme sahiplerinin deneyimleri
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            variants={cardVariants}
            className="rounded-[20px] flex flex-col relative overflow-hidden cursor-default transition-shadow duration-300"
            style={{
              background: "white",
              border: "1px solid rgba(0,0,0,0.06)",
              padding: "2.5rem",
              boxShadow: "0 2px 8px rgba(72,11,135,0.11), 0 8px 32px rgba(72,11,135,0.11)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(72,11,135,0.14), 0 12px 40px rgba(72,11,135,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(72,11,135,0.11), 0 8px 32px rgba(72,11,135,0.11)";
            }}
          >
            {/* Decorative quote mark */}
            <Quote className="absolute top-5 right-5 w-8 h-8" style={{ color: "rgba(109,40,217,0.08)" }} />

            {/* Stars */}
            <div className="flex gap-0.5 mb-5">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star key={si} className="w-4 h-4 text-primary fill-primary" />
              ))}
            </div>

            <p className="text-foreground flex-1" style={{ fontSize: "16px", lineHeight: "1.75", opacity: 0.82 }}>
              "{t.quote}"
            </p>

            <div className="flex items-center gap-3 mt-6 pt-5 border-t" style={{ borderColor: "hsl(38,30%,88%)" }}>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ background: avatarGradients[i] }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TestimonialsSection;
