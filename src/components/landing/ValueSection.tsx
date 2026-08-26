import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import ProofPanel from '@/components/signal/ProofPanel';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';

const ValueSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-14 sm:py-20 border-t border-border overflow-hidden">
      <div
        className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.08] pointer-events-none"
        style={{ background: 'var(--gradient-signal)', filter: 'blur(100px)' }}
      />

      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 relative">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl mb-12 sm:mb-14"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-5 tracking-tight leading-[1.05]"
          >
            {t('home.mechanism.title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {t('home.mechanism.body')}
          </motion.p>
        </motion.div>

        <ProofPanel />
      </div>
    </section>
  );
};

export default ValueSection;
