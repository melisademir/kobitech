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
  Background rhythm:
  1. Hero              → DARK  (#0A0F1E)
  2. Solutions         → LIGHT (#F5F5F7)
  3. Partners          → LIGHT (#F5F5F7) + border-bottom
  4. HowItWorks        → DARK  (#0A0F1E)
  5. Promotions        → LIGHT (#F5F5F7)
  6. Features          → SOFT  (#EFEFEF)
  7. CTA               → GRADIENT (violet)
  8. Testimonials      → LIGHT (#F5F5F7)
  9. Footer            → DARK  (#0A0F1E)
*/

const DARK = "#1A0A4A";
const LIGHT = "#F5F5F7";
const SOFT = "#EFEFEF";

const Landing = () => (
  <div className="min-h-screen" style={{ background: LIGHT }}>

    {/* 1. DARK — Hero */}
    <div className="relative" style={{ background: DARK }}>
      <div className="relative">
        <LandingNav />
        <HeroSection />
      </div>
    </div>

    {/* 2. LIGHT — Solutions */}
    <div style={{ background: LIGHT }}>
      <SolutionsGallerySection />
    </div>

    {/* 3. LIGHT — Partners (with border-bottom) */}
    <div style={{ background: LIGHT, borderBottom: "1px solid rgba(0,212,170,0.12)" }}>
      <PartnerCarouselSection />
    </div>

    {/* 4. DARK — How It Works */}
    <div style={{ background: DARK }}>
      <HowItWorksSection />
    </div>

    {/* 5. LIGHT — Promotions */}
    <div style={{ background: LIGHT }}>
      <PromotionsSection />
    </div>

    {/* 6. SOFT GRAY — Features */}
    <div style={{ background: SOFT }}>
      <FeaturesSection />
    </div>

    {/* 7. GRADIENT — CTA */}
    <div
      style={{
        background: "linear-gradient(135deg, #2D1070 0%, #4A1DB5 100%)",
      }}
    >
      <CtaSection />
    </div>

    {/* 8. LIGHT — Testimonials */}
    <div style={{ background: LIGHT }}>
      <TestimonialsSection />
    </div>

    {/* 9. DARK — Footer */}
    <div style={{ background: DARK }}>
      <FooterSection />
    </div>
  </div>
);

export default Landing;
