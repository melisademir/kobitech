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
  <div className="min-h-screen bg-background overflow-x-hidden">
    {/* Hero area with mesh gradient + bg image */}
    <div className="relative gradient-mesh">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-30 mix-blend-luminosity"
      />
      <div className="relative z-10">
        <LandingNav />
        <HeroSection />
      </div>
    </div>
    <StatsSection />
    <PartnersSection />
    <FeaturesSection />
    <HowItWorksSection />
    <CtaSection />
    <TestimonialsSection />
    <FooterSection />
  </div>
);


export default Landing;
