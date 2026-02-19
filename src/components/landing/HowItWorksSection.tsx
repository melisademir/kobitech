import { motion } from "framer-motion";

const steps = [
  { num: "1", title: "Ücretsiz Kayıt Olun", desc: "Sadece ad-soyad ve telefon numaranızla hemen kayıt olun." },
  { num: "2", title: "İşletmenizi Tanımlayın", desc: "Sektörünüzü ve ihtiyaçlarınızı belirleyin, size özel çözümler sunalım." },
  { num: "3", title: "Dijitalleşmeye Başlayın", desc: "Yol haritanızı takip edin, partnerlerimizle büyümeye başlayın." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const HowItWorksSection = () => (
  <section id="how" className="py-20">
    <div className="max-w-3xl mx-auto px-6">
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
          className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 tracking-wide uppercase"
        >
          Nasıl Çalışır?
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Dijitalleşmeye 3 Adımda Başlayın</h2>
      </motion.div>

      <div className="relative">
        {/* Animated vertical line */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={lineVariants}
          className="absolute left-[1.375rem] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px origin-top"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="space-y-12"
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              variants={stepVariants}
              className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:text-${i % 2 === 0 ? 'right' : 'left'}`}
            >
              {/* Content */}
              <div className={`flex-1 pl-[4.5rem] md:pl-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <h3 className="text-lg font-bold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>

              {/* Number circle */}
              <motion.div
                className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full gradient-primary text-primary-foreground font-extrabold text-lg flex items-center justify-center shrink-0 shadow-premium z-10"
                whileHover={{ scale: 1.15 }}
                whileInView={{
                  boxShadow: [
                    "0 0 0 0px hsl(268, 72%, 38% / 0.3)",
                    "0 0 0 12px hsl(268, 72%, 38% / 0)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 1.2, delay: 0.3 + i * 0.2, ease: "easeOut" },
                }}
                viewport={{ once: true }}
              >
                {s.num}
              </motion.div>

              {/* Spacer for other side */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
