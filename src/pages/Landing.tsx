import LandingNav from "@/components/landing/LandingNav";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PartnersSection from "@/components/landing/PartnersSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CtaSection from "@/components/landing/CtaSection";
import FooterSection from "@/components/landing/FooterSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import TrustBand from "@/components/landing/TrustBand";
import heroBg from "@/assets/hero-bg.png";

const Landing = () => (
  <div className="min-h-screen bg-background">
    {/* Unified bg wrapper for nav + hero — pure white */}
    <div className="relative bg-white">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60" />
      <div className="relative z-10">
        <LandingNav />
        <HeroSection />
      </div>
    </div>

    {/* Section 2 — very light slate, trust band */}
    <div className="bg-[#F9FAFB]">
      <StatsSection />
    </div>

    {/* Section 3 — Grayscale trust band, pure white */}
    <div className="bg-white">
      <TrustBand />
    </div>

    {/* Section 4 — Partners/Solutions, lightest lila */}
    <div className="bg-[#F5F3FF]">
      <PartnersSection />
    </div>

    {/* Section 5 — Features/Hub, white */}
    <div className="bg-white">
      <FeaturesSection />
    </div>

    {/* Section 6 — How it works, light slate */}
    <div className="bg-[#F9FAFB]">
      <HowItWorksSection />
    </div>

    {/* Section 7 — CTA, white */}
    <div className="bg-white">
      <CtaSection />
    </div>

    {/* Section 8 — Testimonials, lightest lila */}
    <div className="bg-[#F5F3FF]">
      <TestimonialsSection />
    </div>

    <FooterSection />
  </div>
);

export default Landing;
