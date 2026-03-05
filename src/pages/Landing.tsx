import LandingNav from "@/components/landing/LandingNav";
import PartnerCarouselSection from "@/components/landing/PartnerCarouselSection";
import HeroSection from "@/components/landing/HeroSection";

import FeaturesSection from "@/components/landing/FeaturesSection";

import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CtaSection from "@/components/landing/CtaSection";
import FooterSection from "@/components/landing/FooterSection";
import PromotionsSection from "@/components/landing/PromotionsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

import PartnerEcosystemSection from "@/components/landing/PartnerEcosystemSection";




import SolutionsGallerySection from "@/components/landing/SolutionsGallerySection";

/*
  Background rhythm rule:
  DARK → LIGHT → DARK → LIGHT → DARK → LIGHT → DARK
  ───────────────────────────────────────────────────
  1. Hero              → DARK  (image-based, dark overlay)
  2. Solutions + Partners → LIGHT (krem→lavanta)
  3. HowItWorks        → DARK  (koyu mor)
  4. Promotions + Features → LIGHT (lavanta→krem→lavanta)
  5. CTA               → DARK  (koyu mor)
  6. Testimonials       → LIGHT (lavanta→krem)
  7. Footer             → DARK  (bg-secondary)
*/

const LIGHT_A = "linear-gradient(180deg, hsl(38,55%,98%) 0%, hsl(260,30%,96%) 100%)";
const LIGHT_B = "linear-gradient(180deg, hsl(260,30%,96%) 0%, hsl(38,55%,97%) 100%)";
const DARK = "hsl(260, 45%, 10%)";

const Landing = () => (
  <div className="min-h-screen bg-background">

    {/* ██ DARK — Hero + Solutions ██ */}
    <div className="relative" style={{ background: DARK }}>
      <div className="relative z-10">
        <LandingNav />
        <HeroSection />
      </div>
      <SolutionsGallerySection />
    </div>

    {/* ██ LIGHT — Partners ██ */}
    <div style={{ background: LIGHT_A }}>
      <PartnerCarouselSection />
    </div>

    {/* ██ DARK — How It Works ██ */}
    <div style={{ background: DARK }}>
      <HowItWorksSection />
    </div>

    {/* ██ LIGHT — Promotions + Features ██ */}
    <div style={{ background: LIGHT_B }}>
      <PromotionsSection />
    </div>
    <div style={{ background: LIGHT_A }}>
      <FeaturesSection />
    </div>

    {/* ██ DARK — CTA ██ */}
    <div style={{ background: DARK }}>
      <CtaSection />
    </div>

    {/* ██ LIGHT — Testimonials ██ */}
    <div style={{ background: LIGHT_B }}>
      <TestimonialsSection />
    </div>

    {/* ██ DARK — Footer ██ */}
    <FooterSection />
  </div>
);

export default Landing;
