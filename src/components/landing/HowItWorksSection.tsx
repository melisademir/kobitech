import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.15 } }),
};

const steps = [
  { num: "1", title: "Ücretsiz Kayıt Olun", desc: "Sadece ad-soyad ve telefon numaranızla 2 dakikada kayıt olun." },
  { num: "2", title: "İşletmenizi Tanımlayın", desc: "Sektörünüzü ve ihtiyaçlarınızı belirleyin, size özel çözümler sunalım." },
  { num: "3", title: "Dijitalleşmeye Başlayın", desc: "Yol haritanızı takip edin, partnerlerimizle büyümeye başlayın." },
];

const HowItWorksSection = () => (
  <section id="how" className="py-20">
    <div className="max-w-3xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 tracking-wide uppercase">Nasıl Çalışır?</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Dijitalleşmeye 3 Adımda Başlayın</h2>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

        <div className="space-y-12">
          {steps.map((s, i) => (
            <motion.div key={s.num} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:text-${i % 2 === 0 ? 'right' : 'left'}`}>
              
              {/* Content */}
              <div className={`flex-1 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <h3 className="text-lg font-bold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>

              {/* Number circle */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full gradient-primary text-primary-foreground font-extrabold text-lg flex items-center justify-center shadow-premium z-10">
                {s.num}
              </div>

              {/* Spacer for other side */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
