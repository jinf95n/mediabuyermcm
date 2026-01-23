import { useLanguage } from '@/contexts/LanguageContext';
import { Wrench, Gift } from 'lucide-react';

const ValueSection = () => {
  const { t } = useLanguage();
  
  const whatIDo = ['value.what.1', 'value.what.2', 'value.what.3', 'value.what.4'];
  const whatYouGet = ['value.get.1', 'value.get.2', 'value.get.3', 'value.get.4'];
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            {t('value.title')}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            {t('value.subtitle')}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{ background: 'var(--gradient-cta)' }}>
                  <Wrench className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {t('value.what.title')}
                </h3>
              </div>
              <ul className="space-y-3">
                {whatIDo.map((key, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{ background: 'var(--gradient-cta)' }}>
                  <Gift className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {t('value.get.title')}
                </h3>
              </div>
              <ul className="space-y-3">
                {whatYouGet.map((key, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
