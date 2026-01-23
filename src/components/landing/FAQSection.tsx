import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQSection = () => {
  const { t } = useLanguage();
  
  const faqs = [
    { q: 'faq.q1', a: 'faq.a1' },
    { q: 'faq.q2', a: 'faq.a2' },
    { q: 'faq.q3', a: 'faq.a3' },
    { q: 'faq.q4', a: 'faq.a4' },
    { q: 'faq.q5', a: 'faq.a5' },
    { q: 'faq.q6', a: 'faq.a6' },
    { q: 'faq.q7', a: 'faq.a7' },
  ];
  
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t('faq.title')}
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline">
                  {t(faq.q)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t(faq.a)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
