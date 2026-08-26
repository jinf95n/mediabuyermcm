import TopBar from '@/components/landing/TopBar';
import HeroSection from '@/components/landing/HeroSection';
import PathFork from '@/components/landing/PathFork';
import ValueSection from '@/components/landing/ValueSection';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <HeroSection />
      <PathFork />
      <ValueSection />
      <Footer />
    </div>
  );
};

export default Index;
