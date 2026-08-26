import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';

interface FAQSectionProps {
  prefix: string;
  count: number;
}

const FAQSection = ({ prefix, count }: FAQSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-10 tracking-tight leading-[1.05]"
          >
            {t('section.faq')}
          </motion.h2>

          <motion.div variants={fadeInUp}>
            <Accordion type="single" collapsible className="w-full">
              {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
                <AccordionItem key={n} value={`item-${n}`} className="border-border">
                  <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                    {t(`${prefix}.q${n}`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {t(`${prefix}.a${n}`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
