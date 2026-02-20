import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";

const CtaSection = () =>
<section className="py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

        <div
        className="rounded-3xl overflow-visible relative"
        style={{
          background: "linear-gradient(135deg, hsl(258, 45%, 14%) 0%, hsl(268, 72%, 22%) 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 32px 80px -16px rgba(109,40,217,0.35), 0 0 0 1px rgba(255,255,255,0.05) inset"
        }}>

          {/* Inner light sheen */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
          {/* Dot grid */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />

          


































































        </div>
      </motion.div>
    </div>
  </section>;


export default CtaSection;