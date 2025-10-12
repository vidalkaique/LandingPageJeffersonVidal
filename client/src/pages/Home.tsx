import HeroSection from "@/components/HeroSection";
import BenefitsGrid from "@/components/BenefitsGrid";
import ProblemSection from "@/components/ProblemSection";
import ResultsCarousel from "@/components/ResultsCarousel";
import ProcessSteps from "@/components/ProcessSteps";
import TargetAudience from "@/components/TargetAudience";
import PricingCards from "@/components/PricingCards";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <BenefitsGrid />
      <ProblemSection />
      <ResultsCarousel />
      <ProcessSteps />
      <TargetAudience />
      <PricingCards />
      <AboutSection />
      <FAQSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
