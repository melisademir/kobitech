import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Dijital Esnaf sayesinde ilk kez yurt dışına satış yapmaya başladık. Platform bizi adım adım yönlendirdi.",
    name: "Ahmet Yılmaz",
    role: "Tekstil İhracatçısı",
    stars: 5
  },
  {
    quote: "Muhasebe ve e-fatura entegrasyonu hayatımı kurtardı. Artık kağıt işleriyle uğraşmıyorum.",
    name: "Fatma Demir",
    role: "Gıda Üreticisi",
    stars: 5
  },
  {
    quote: "E-ticaret mağazamı kurdum, siparişlerim %200 arttı. Tek platformda her şey var.",
    name: "Mehmet Kaya",
    role: "Mobilya Atölyesi",
    stars: 5
  },
  {
    quote: "Sosyal medya yönetimi ve online satış kanallarını birlikte yürütebiliyorum artık.",
    name: "Zeynep Arslan",
    role: "Kozmetik Markası",
    stars: 5
  },
  {
    quote: "Stok takibi ve kargo entegrasyonu mükemmel çalışıyor. Zamandan büyük tasarruf.",
    name: "Can Öztürk",
    role: "Elektronik Perakende",
    stars: 5
  },
  {
    quote: "Global pazara açılmak istiyorduk, Dijital Esnaf tam da bunu sağladı.",
    name: "Elif Şahin",
    role: "El Sanatları İhracatı",
    stars: 5
  }
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
  visible: { transition: { staggerChildren: 0.08 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

const TestimonialsSection = () => (
  <section className="section-gap bg-muted/20">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16">

        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 tracking-widest uppercase border border-primary/15">
          <Star className="w-3.5 h-3.5 fill-current" />
          Başarı Hikayeleri
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4" style={{ letterSpacing: "-0.03em" }}>
          İşletmelerden Geri Bildirimler
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto" style={{ lineHeight: "1.6", opacity: 0.7 }}>
          Kobi Dijital ile dönüşen işletme sahiplerinin deneyimleri
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="rounded-3xl border border-white/25 flex flex-col relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              padding: "2.5rem",
              boxShadow: "0 2px 24px -4px rgba(109,40,217,0.07), 0 1px 0 rgba(255,255,255,0.8) inset",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px -8px rgba(109,40,217,0.18), 0 1px 0 rgba(255,255,255,0.8) inset";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 24px -4px rgba(109,40,217,0.07), 0 1px 0 rgba(255,255,255,0.8) inset";
            }}
          >
            {/* Decorative quote */}
            <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/8" />

            {/* Stars — all primary colored */}
            <div className="flex gap-0.5 mb-5">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star
                  key={si}
                  className={`w-4 h-4 ${si < t.stars ? "text-primary fill-primary" : "text-muted-foreground/20"}`}
                />
              ))}
            </div>

            {/* Quote */}
            <p className="text-foreground text-sm leading-relaxed flex-1" style={{ lineHeight: "1.7", opacity: 0.85 }}>
              "{t.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border/30">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ background: avatarGradients[i] }}>
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs" style={{ opacity: 0.7 }}>{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TestimonialsSection;
