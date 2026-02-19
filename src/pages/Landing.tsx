import LandingNav from "@/components/landing/LandingNav";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PartnersSection from "@/components/landing/PartnersSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CtaSection from "@/components/landing/CtaSection";
import FooterSection from "@/components/landing/FooterSection";

const Landing = () => (
  <div className="min-h-screen bg-background">
    <LandingNav />
    <HeroSection />
    <StatsSection />
    <FeaturesSection />
    <PartnersSection />
    <HowItWorksSection />
    <CtaSection />
    <FooterSection />
  </div>
);

export default Landing;
