import { useLanguage } from '@/contexts/LanguageContext';
import { Info } from 'lucide-react';

const LimitedSpotsSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            {t('limited.title')}
          </h2>
          
          <div className="space-y-4 mb-8">
            <p className="text-foreground text-center">
              {t('limited.text1')}
            </p>
            <p className="text-foreground text-center">
              {t('limited.text2')}
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-muted/20 flex-shrink-0">
                <Info className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground italic">
                {t('limited.honest')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedSpotsSection;
