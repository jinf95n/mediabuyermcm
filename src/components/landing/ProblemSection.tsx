import { useLanguage } from '@/contexts/LanguageContext';
import { AlertCircle } from 'lucide-react';

const ProblemSection = () => {
  const { t } = useLanguage();
  
  const problems = [
    'problem.1',
    'problem.2',
    'problem.3',
    'problem.4',
    'problem.5',
    'problem.6',
  ];
  
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            {t('problem.title')}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            {t('problem.subtitle')}
          </p>
          
          <div className="space-y-4">
            {problems.map((key, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 bg-background rounded-lg p-4 border border-border"
              >
                <AlertCircle className="h-5 w-5 text-muted flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
