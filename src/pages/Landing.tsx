import LandingNav from "@/components/landing/LandingNav";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PartnersSection from "@/components/landing/PartnersSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CtaSection from "@/components/landing/CtaSection";
import FooterSection from "@/components/landing/FooterSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import heroBg from "@/assets/hero-bg.png";

const Landing = () => (
  <div className="min-h-screen bg-background">
    {/* Unified bg wrapper for nav + hero */}
    <div className="relative">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      <div className="relative z-10">
        <LandingNav />
        <HeroSection />
      </div>
    </div>
    <StatsSection />
    <PartnersSection />
    <FeaturesSection />
    <TestimonialsSection />
    <HowItWorksSection />
    <CtaSection />
    <FooterSection />
  </div>
);

export default Landing;
