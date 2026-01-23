import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Search, FileText, Rocket } from 'lucide-react';

const HowWeWorkSection = () => {
  const { t } = useLanguage();
  
  const steps = [
    { icon: MessageSquare, titleKey: 'how.step1.title', descKey: 'how.step1.desc' },
    { icon: Search, titleKey: 'how.step2.title', descKey: 'how.step2.desc' },
    { icon: FileText, titleKey: 'how.step3.title', descKey: 'how.step3.desc' },
    { icon: Rocket, titleKey: 'how.step4.title', descKey: 'how.step4.desc' },
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t('how.title')}
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card rounded-xl p-6 shadow-sm border border-border h-full">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: 'var(--gradient-cta)' }}
                  >
                    <step.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-sm font-medium text-primary mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(step.descKey)}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
