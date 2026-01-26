import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '543517311760';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const CALENDAR_LINK = 'https://api.leadconnectorhq.com/widget/booking/u7oCyCflFG3ajShYVJUw';


const FinalCTASection = () => {
  const { t } = useLanguage();
  
  const scrollToContact = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {t('final.title')}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            {t('final.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Button 
              variant="heroInverse" 
              size="lg" 
              className="gap-2"
              onClick={scrollToContact}

            >
              <Mail className="h-5 w-5" />
              <a href={CALENDAR_LINK} target="_blank" rel="noopener noreferrer">
              {t('hero.cta.primary')}
              </a>
            </Button>
            <Button 
              variant="whatsapp" 
              size="lg" 
              className="gap-2"
              asChild
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                {t('hero.cta.secondary')}
              </a>
            </Button>
          </div>
          
          <p className="text-sm text-primary-foreground/80">
            {t('final.microcopy')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;