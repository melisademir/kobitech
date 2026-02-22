import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CtaSection = () => (
  <section className="py-24 md:py-32">
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center rounded-[24px]"
        style={{
          padding: "64px 48px",
          background: "linear-gradient(145deg, hsl(258,45%,10%) 0%, hsl(268,50%,18%) 100%)",
          boxShadow: "0 2px 8px rgba(72,11,135,0.11), 0 16px 48px rgba(72,11,135,0.18)",
        }}
      >
        <h2
          className="text-white font-bold mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.03em", lineHeight: 1.15 }}
        >
          İşletmenizi Dijitalde Büyütmeye
          <br />
          Hazır mısınız?
        </h2>
        <p
          className="mb-8 mx-auto"
          style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(196,181,253,0.8)", maxWidth: "480px" }}
        >
          50+ dijital çözüm, 30+ çözüm ortağı. Tek platformda tüm ihtiyaçlarınıza yanıt bulun.
        </p>
        <Link to="/kobi/step-1">
          <button
            className="inline-flex items-center gap-2 text-white font-bold transition-all duration-200"
            style={{
              height: "56px",
              padding: "0 48px",
              borderRadius: "24px",
              fontSize: "16px",
              background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
              boxShadow: "0 4px 16px rgba(124,58,237,0.45)",
              minWidth: "260px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #6D28D9, #7C3AED)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(124,58,237,0.60)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #7C3AED, #8B5CF6)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,58,237,0.45)";
            }}
          >
            Hemen Başvur <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
