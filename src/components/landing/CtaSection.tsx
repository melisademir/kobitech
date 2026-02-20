import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const perks = [
  "Kredi kartı gerekmez",
  "Ücretsiz başlangıç paketi",
  "7/24 destek",
];

const CtaSection = () => (
  <section className="py-12 md:py-20">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 gradient-primary-dark" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-primary/20 blur-[60px]" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 p-10 md:p-16">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-4 tracking-wide uppercase backdrop-blur-sm"
            >
              Hemen Başlayın
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight"
            >
              Dijital Dönüşümünüz<br />
              <span className="text-accent">Burada Başlıyor</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="text-white/65 text-sm mb-7 max-w-md leading-relaxed"
            >
              3 kısa adımda işletmenizi tanıyalım ve size özel dijital dönüşüm yol haritanızı oluşturalım.
            </motion.p>

            {/* Perks */}
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 mb-8 justify-center md:justify-start">
              {perks.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-1.5 text-xs text-white/75"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  {p}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
            >
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-accent hover:bg-accent/90 text-white shadow-premium gap-2 font-semibold"
              >
                <Link to="/kobi/step-1">
                  Hemen Başla <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Stats side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-row md:flex-col gap-5 shrink-0"
          >
            {[
              { val: "10.000+", label: "İşletme güveniyor" },
              { val: "5 dk", label: "Ortalama başlangıç süresi" },
              { val: "%98", label: "Müşteri memnuniyeti" },
            ].map((item, i) => (
              <div
                key={item.val}
                className="flex flex-col items-center justify-center w-36 h-24 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 text-center px-3"
              >
                <span className="text-2xl font-extrabold text-white">{item.val}</span>
                <span className="text-[11px] text-white/55 mt-0.5 leading-tight">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
