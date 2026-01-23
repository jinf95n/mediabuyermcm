import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const StickyMobileCTA = () => {
  const { t } = useLanguage();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden z-50">
      <Button variant="hero" size="lg" className="w-full gap-2">
        <Calendar className="h-5 w-5" />
        {t('hero.cta.primary')}
      </Button>
    </div>
  );
};

export default StickyMobileCTA;
