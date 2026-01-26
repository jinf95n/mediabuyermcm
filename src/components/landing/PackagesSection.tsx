import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, MessageCircle, Mail } from 'lucide-react';

const WHATSAPP_NUMBER = '543517311760';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const PackagesSection = () => {
  const { t } = useLanguage();
  
  const scrollToContact = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const packages = [
    {
      titleKey: 'packages.starter.title',
      originalPriceKey: 'packages.starter.originalPrice', // <--- AGREGAR ESTO
      priceKey: 'packages.starter.price',
      periodKey: 'packages.starter.period',
      forKey: 'packages.starter.for',
      features: [
        'packages.starter.1',
        'packages.starter.2',
        'packages.starter.3',
        'packages.starter.4',
        'packages.starter.5',
      ],
      commitmentKey: 'packages.starter.commitment',
      popular: false,
      isPartner: false,
      hasDiscount: true, // <--- AGREGAR ESTO
    },
    {
      titleKey: 'packages.growth.title',
      originalPriceKey: 'packages.growth.originalPrice', // <--- AGREGAR ESTO
      priceKey: 'packages.growth.price',
      periodKey: 'packages.growth.period',
      forKey: 'packages.growth.for',
      features: [
        'packages.growth.1',
        'packages.growth.2',
        'packages.growth.3',
        'packages.growth.4',
        'packages.growth.5',
      ],
      commitmentKey: 'packages.growth.commitment',
      popular: true,
      popularKey: 'packages.growth.popular',
      isPartner: false,
      hasDiscount: true, // <--- AGREGAR ESTO
    },
    {
      titleKey: 'packages.partner.title',
      priceKey: 'packages.partner.price',
      periodKey: 'packages.partner.period',
      forKey: 'packages.partner.for',
      features: [
        'packages.partner.1',
        'packages.partner.2',
        'packages.partner.3',
        'packages.partner.4',
        'packages.partner.5',
      ],
      commitmentKey: 'packages.partner.commitment',
      popular: false,
      ctaKey: 'packages.partner.cta',
      isPartner: true,
      hasDiscount: false, // <--- AGREGAR ESTO (opcional, por claridad)
    },
  ];
  
  return (
    <section className="py-20 bg-card" id="packages">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header del componente (sin cambios) */}
          <div 
            className="text-center mb-12 py-8 px-4 rounded-2xl"
            style={{ background: 'var(--gradient-pricing)' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              {t('packages.title')}
            </h2>
            <p className="text-primary-foreground/80">
              {t('packages.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`relative bg-background rounded-xl p-6 shadow-lg border ${
                  pkg.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                }`}
              >
                {pkg.popular && pkg.popularKey && (
                  <div 
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium text-primary-foreground"
                    style={{ background: 'var(--gradient-cta)' }}
                  >
                    {t(pkg.popularKey)}
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(pkg.titleKey)}
                  </h3>

                  {/* --- INICIO DE CAMBIOS VISUALES --- */}
                  <div className="flex flex-col items-center justify-center gap-1">
                    
                    {/* Precio Original Tachado */}
                    {pkg.hasDiscount && pkg.originalPriceKey && (
                      <span className="text-lg font-semibold text-muted-foreground/70 line-through">
                        {t(pkg.originalPriceKey)}
                      </span>
                    )}

                    {/* Precio Actual */}
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        {t(pkg.priceKey)}
                      </span>
                      {pkg.periodKey && t(pkg.periodKey) !== '' && t(pkg.periodKey) !== pkg.periodKey && (
                        <span className="text-muted-foreground">
                          {t(pkg.periodKey)}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* --- FIN DE CAMBIOS VISUALES --- */}

                  <p className="text-sm text-muted-foreground mt-2">
                    {t(pkg.forKey)}
                  </p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((featureKey, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{t(featureKey)}</span>
                    </li>
                  ))}
                </ul>
                
                <p className="text-xs text-muted-foreground text-center mb-4 italic">
                  {t(pkg.commitmentKey)}
                </p>
                
                {pkg.isPartner ? (
                  <Button 
                    variant="outline"
                    className="w-full gap-2"
                    onClick={scrollToContact}
                  >
                    <Mail className="h-4 w-4" />
                    {t(pkg.ctaKey!)}
                  </Button>
                ) : (
                  <Button 
                    variant="whatsapp"
                    className="w-full gap-2"
                    asChild
                  >
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      {t('hero.cta.secondary')}
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;