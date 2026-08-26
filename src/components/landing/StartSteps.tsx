import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';

interface StartStepsProps {
  prefix: string;
  count?: number;
}

const gridColsByCount: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

const StartSteps = ({ prefix, count = 3 }: StartStepsProps) => {
  const { t } = useLanguage();
  const gridCols = gridColsByCount[count] ?? 'sm:grid-cols-3';

  return (
    <section className="py-14 sm:py-20 border-t border-border">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-10 max-w-xl tracking-tight leading-[1.05]"
        >
          {t('section.start')}
        </motion.h2>

        <motion.ul
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={`grid ${gridCols} gap-5`}
        >
          {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
            <motion.li
              key={n}
              variants={fadeInUp}
              whileHover={{ x: 3, transition: { duration: 0.2 } }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 size={22} className="text-confirmed shrink-0 mt-0.5" />
              <p className="text-lg text-foreground/90 leading-relaxed">{t(`${prefix}.${n}`)}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default StartSteps;
