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

/* Shared section divider — horizontal gradient line */
const SectionDivider = () => (
  <div className="flex justify-center">
    <div
      style={{
        width: "80%",
        height: "2px",
        background: "linear-gradient(90deg, transparent 0%, rgba(109,40,217,0.18) 30%, rgba(109,40,217,0.18) 70%, transparent 100%)",
      }}
    />
  </div>
);

const Landing = () => (
  <div className="min-h-screen bg-background">
    {/* 1 — HERO */}
    <div
      className="relative"
      style={{
        background: "linear-gradient(180deg, hsl(38,55%,98%) 0%, hsl(260,30%,96%) 55%, hsl(38,55%,97%) 100%)",
      }}
    >
      <div className="relative z-10">
        <LandingNav />
        <HeroSection />
      </div>
    </div>

    {/* SOLUTIONS GALLERY */}
    <SolutionsGallerySection />


    {/* PARTNER CAROUSEL */}
    <div style={{ background: "linear-gradient(180deg, hsl(260,30%,96%) 0%, hsl(38,55%,97%) 100%)" }}>
      <PartnerCarouselSection />
    </div>


    <SectionDivider />

    {/* 4 — HOW IT WORKS */}
    <div style={{ background: "hsl(260, 45%, 10%)" }}>
      <HowItWorksSection />
    </div>


    {/* 5b — PROMOTIONS */}
    <div style={{ background: "linear-gradient(180deg, hsl(38,55%,98%) 0%, hsl(260,30%,96%) 100%)" }}>
      <PromotionsSection />
    </div>

    {/* 5 — FEATURES */}
    <div style={{ background: "linear-gradient(180deg, hsl(260,30%,96%) 0%, hsl(38,55%,97%) 100%)" }}>
      <FeaturesSection />
    </div>
    {/* 6 — CTA */}
    <div style={{ background: "linear-gradient(180deg, hsl(38,55%,97%) 0%, hsl(260,30%,96%) 100%)" }}>
      <CtaSection />
    </div>

    {/* 7 — TESTIMONIALS */}
    <div style={{ background: "linear-gradient(180deg, hsl(260,30%,96%) 0%, hsl(38,55%,97%) 100%)" }}>
      <TestimonialsSection />
    </div>


    {/* PARTNER ECOSYSTEM — temporarily hidden
    <div className="py-16 md:py-24" style={{ background: "linear-gradient(180deg, hsl(38,30%,97%) 0%, hsl(252,30%,97%) 100%)" }}>
      <PartnerEcosystemSection />
    </div>
    */}



    <FooterSection />
  </div>
);

export default Landing;
