import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '5491156355495';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const StickyMobileCTA = () => {
  const { t } = useLanguage();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden z-50">
      <Button variant="hero" size="lg" className="w-full gap-2" asChild>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="h-5 w-5" />
          {t('hero.cta.secondary')}
        </a>
      </Button>
    </div>
  );
};

export default StickyMobileCTA;