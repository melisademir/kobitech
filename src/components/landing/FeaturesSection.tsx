import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

import iconPlatform from "@/assets/icon-platform.png";
import iconCart from "@/assets/icon-cart.png";
import iconOffer from "@/assets/icon-offer.png";
import iconChat from "@/assets/icon-chat.png";
import iconTracking from "@/assets/icon-tracking.png";
import iconDocuments from "@/assets/icon-documents.png";

const features = [
  {
    image: iconPlatform,
    title: "Tüm Çözümlere Tek Platformdan Ulaşın",
    desc: "Muhasebeden e-ticarete, ödemeden İK'ya kadar tüm ihtiyaçlarınız için çözüm ortaklarını tek yerden bulun, karşılaştırın.",
    labels: ["Muhasebe", "E-Ticaret", "İK", "Ödeme"],
  },
  {
    image: iconCart,
    title: "Sepet ile Hızlı Planlama",
    desc: "İhtiyacınız olan çözümleri sepete ekleyin, tek seferde teklif alın. Zaman kaybetmeyin.",
    labels: ["Toplu Teklif", "Hızlı Başvuru", "Karşılaştırma"],
  },
  {
    image: iconOffer,
    title: "Size Özel Teklif Sistemi",
    desc: "İhtiyaçlarınıza göre özel fiyatlandırma alın. Uzman ekibimiz veya bayilerimiz sizinle görüşerek en uygun paketi oluşturur.",
    labels: ["Özel Fiyat", "Uzman Destek", "Paket Oluşturma"],
  },
  {
    image: iconChat,
    title: "Anlık Görüşme & Destek",
    desc: "Bayiniz veya destek ekibimizle chat üzerinden anında görüşün. Sorularınız hemen yanıtlansın.",
    labels: ["Canlı Chat", "Bayi Görüşme"],
  },
  {
    image: iconTracking,
    title: "Kolay Proje Takibi",
    desc: "Aldığınız hizmetleri tek ekrandan takip edin. Hangi aşamada, ne zaman tamamlanacak — hep bilgileriniz olsun.",
    labels: ["Durum Takibi", "Zaman Çizelgesi", "Tek Ekran"],
  },
  {
    image: iconDocuments,
    title: "Dijital Döküman Merkezi",
    desc: "Tüm sözleşme, fatura ve belgeleriniz güvenle saklanır. 5 yıl boyunca istediğiniz zaman erişin, paylaşın.",
    labels: ["Sözleşmeler", "Faturalar", "5 Yıl Arşiv"],
  },
];

const FeatureCard = ({ f, index }: { f: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden"
      style={{
        background: "hsl(var(--card))",
        borderRadius: "20px",
        border: "1.5px solid hsl(var(--border) / 0.5)",
        minHeight: "320px",
      }}
      whileHover={{
        scale: 1.03,
        y: -5,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
    >
      <div className="p-5 md:p-8 flex flex-col flex-1 relative">
        {/* Title */}
        <h3
          className="text-foreground font-bold leading-snug text-base md:text-[22px] mb-2 md:mb-3"
          style={{ letterSpacing: "-0.02em", maxWidth: "75%" }}
        >
          {f.title}
        </h3>

        {/* Description */}
        <p
          className="text-muted-foreground text-xs md:text-[15px] leading-relaxed"
          style={{ maxWidth: "70%" }}
        >
          {f.desc}
        </p>

        {/* Icon — bottom right, large */}
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
          <div
            className="flex items-center justify-center w-20 h-20 md:w-28 md:h-28 transition-transform duration-300 group-hover:scale-110"
          >
            <img
              src={f.image}
              alt={f.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MobileFeatureCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < features.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  return (
    <div className="md:hidden">
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {features.map((f, i) => (
            <div key={f.title} className="w-full flex-shrink-0 px-2">
              <FeatureCard f={f} index={i} />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: i === currentIndex ? "hsl(268,72%,38%)" : "hsl(268,72%,38%,0.2)",
              transform: i === currentIndex ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const FeaturesSection = () => (
  <section
    id="features"
    className="relative overflow-hidden py-20 md:py-[120px]"
  >
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-8 md:mb-20"
      >
        <h2
          className="text-5xl md:text-7xl font-extrabold text-foreground"
          style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
        >
          Tüm Çözümlere
          <br />
          <span className="text-gradient-primary">Tek Platformdan Ulaşın</span>
        </h2>

        <p className="text-muted-foreground text-base md:text-lg whitespace-nowrap" style={{ lineHeight: 1.7, margin: "0 auto" }}>
          KOBİ'lerin dijital dönüşümünü kolaylaştıran, tek çatı altında eksiksiz bir ekosistem.
        </p>
      </motion.div>

      {/* Card Grid — swipeable on mobile, 3 cols desktop */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
        {features.map((f, i) => (
          <FeatureCard key={f.title} f={f} index={i} />
        ))}
      </div>

      {/* Mobile swipeable carousel */}
      <MobileFeatureCarousel />
    </div>
  </section>
);

export default FeaturesSection;
