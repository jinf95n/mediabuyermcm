import { LanguageProvider } from '@/contexts/LanguageContext';
import TopBar from '@/components/landing/TopBar';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import ValueSection from '@/components/landing/ValueSection';
import ForYouSection from '@/components/landing/ForYouSection';
import HowWeWorkSection from '@/components/landing/HowWeWorkSection';
import PackagesSection from '@/components/landing/PackagesSection';
import LimitedSpotsSection from '@/components/landing/LimitedSpotsSection';
import FAQSection from '@/components/landing/FAQSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import Footer from '@/components/landing/Footer';
import StickyMobileCTA from '@/components/landing/StickyMobileCTA';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <TopBar />
        <HeroSection />
        <ProblemSection />
        <ValueSection />
        <ForYouSection />
        <HowWeWorkSection />
        <PackagesSection />
        <LimitedSpotsSection />
        <FAQSection />
        <FinalCTASection />
        <Footer />
        <StickyMobileCTA />
      </div>
    </LanguageProvider>
  );
};

export default Index;
