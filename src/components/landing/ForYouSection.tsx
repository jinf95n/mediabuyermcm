import { useLanguage } from '@/contexts/LanguageContext';
import { Check, X } from 'lucide-react';

const ForYouSection = () => {
  const { t } = useLanguage();
  
  const yesItems = ['foryou.yes.1', 'foryou.yes.2', 'foryou.yes.3', 'foryou.yes.4'];
  const noItems = ['foryou.no.1', 'foryou.no.2', 'foryou.no.3', 'foryou.no.4'];
  
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-xl p-6 border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {t('foryou.title')}
              </h3>
              <ul className="space-y-4">
                {yesItems.map((key, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-primary/10 flex-shrink-0">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-background rounded-xl p-6 border border-muted/50">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {t('foryou.nottitle')}
              </h3>
              <ul className="space-y-4">
                {noItems.map((key, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-muted/20 flex-shrink-0">
                      <X className="h-4 w-4 text-muted" />
                    </div>
                    <span className="text-muted-foreground">{t(key)}</span>
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

export default ForYouSection;
