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

        




















































































      </motion.div>
    </div>
  </section>;


export default CtaSection;