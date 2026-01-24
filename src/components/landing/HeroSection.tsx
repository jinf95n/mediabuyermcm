import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MessageCircle, CheckCircle, Mail } from 'lucide-react';

const WHATSAPP_NUMBER = '5491156355495';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const HeroSection = () => {
  const { t } = useLanguage();
  
  const scrollToContact = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative overflow-hidden py-20 lg:py-32" style={{ background: 'var(--gradient-hero-soft)' }}>
      {/* Gradient orb decoration */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/4"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Brand name */}
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            MCM Digital
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            {t('hero.headline')}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('hero.subheadline')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="gap-2"
              onClick={scrollToContact}
            >
              <Mail className="h-5 w-5" />
              {t('hero.cta.primary')}
            </Button>
            <Button 
              variant="heroOutline" 
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
          
          <p className="text-sm text-muted-foreground mb-12">
            {t('hero.microcopy')}
          </p>
          
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {['hero.trust.1', 'hero.trust.2', 'hero.trust.3'].map((key, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 bg-card rounded-lg px-4 py-3 shadow-sm border border-border"
              >
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;