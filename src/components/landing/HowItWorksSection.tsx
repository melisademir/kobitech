import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { num: "1", title: "Ücretsiz Kayıt Olun", desc: "Sadece ad-soyad ve telefon numaranızla hemen kayıt olun.", color: "from-violet-500 to-purple-600" },
  { num: "2", title: "İşletmenizi Tanımlayın", desc: "Sektörünüzü ve ihtiyaçlarınızı belirleyin, size özel çözümler sunalım.", color: "from-cyan-500 to-teal-600" },
  { num: "3", title: "Dijitalleşmeye Başlayın", desc: "Yol haritanızı takip edin, partnerlerimizle büyümeye başlayın.", color: "from-emerald-500 to-green-600" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const HowItWorksSection = () => (
  <section id="how" className="py-20">
    <div className="max-w-5xl mx-auto px-6">
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
          className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 tracking-wide uppercase"
        >
          Nasıl Çalışır?
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Dijitalleşmeye 3 Adımda Başlayın</h2>
      </motion.div>

      {/* 3 Column Layout */}
      <div className="relative">
        {/* Gradient connector line */}
        <div className="hidden md:block absolute top-10 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 z-0" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6"
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              variants={stepVariants}
              className="flex flex-col items-center text-center relative z-10"
            >
              {/* Pulse circle */}
              <div className="relative mb-6">
                {/* Pulse rings */}
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${s.color} opacity-20`}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                />
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${s.color} opacity-15`}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.15, 0, 0.15] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 + 0.3 }}
                />
                {/* Main circle */}
                <motion.div
                  className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${s.color} text-white font-extrabold text-2xl flex items-center justify-center shadow-premium`}
                  whileHover={{ scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {s.num}
                </motion.div>
              </div>

              {/* Card */}
              <motion.div
                className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 w-full"
                whileHover={{ y: -4, transition: { duration: 0.22 } }}
              >
                <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-14"
      >
        <Button asChild variant="hero" size="lg">
          <Link to="/kobi/signup">Hemen Başla <ArrowRight className="h-5 w-5 ml-1" /></Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default HowItWorksSection;
