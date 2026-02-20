import { motion } from "framer-motion";
import { UserPlus, Building2, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: UserPlus,
    title: "Ücretsiz Kayıt Olun",
    desc: "Sadece ad-soyad ve telefon numaranızla hemen kayıt olun.",
    color: "from-violet-500 to-primary",
    glow: "hsl(268, 72%, 38% / 0.25)",
  },
  {
    num: "02",
    icon: Building2,
    title: "İşletmenizi Tanımlayın",
    desc: "Sektörünüzü ve ihtiyaçlarınızı belirleyin, size özel çözümler sunalım.",
    color: "from-accent to-emerald-500",
    glow: "hsl(168, 76%, 42% / 0.25)",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Dijitalleşmeye Başlayın",
    desc: "Yol haritanızı takip edin, partnerlerimizle büyümeye başlayın.",
    color: "from-primary to-violet-700",
    glow: "hsl(268, 72%, 38% / 0.25)",
  },
];

const HowItWorksSection = () => (
  <section id="how" className="py-24 relative overflow-hidden">
    {/* Subtle bg */}
    <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background pointer-events-none" />

    <div className="max-w-6xl mx-auto px-6 relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-5 tracking-wide uppercase"
        >
          Nasıl Çalışır?
        </motion.span>
        <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-foreground tracking-tight">
          Dijitalleşmeye <span className="text-gradient-primary">3 Adımda</span> Başlayın
        </h2>
      </motion.div>

      {/* Steps — horizontal on md+ */}
      <div className="relative">
        {/* Connector line on desktop */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="hidden md:block absolute top-[3.25rem] left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20 origin-left"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              {/* Step circle */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative w-[6.5rem] h-[6.5rem] rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center mb-6 shadow-premium`}
                style={{ boxShadow: `0 8px 32px -8px ${s.glow}` }}
              >
                {/* Pulse ring */}
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${s.color} opacity-30`}
                  animate={{ scale: [1, 1.18, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                />
                <s.icon className="w-8 h-8 text-white relative z-10" />
                {/* Step number badge */}
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center shadow-sm">
                  <span className="text-[10px] font-black text-primary">{s.num}</span>
                </div>
              </motion.div>

              <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px] mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
