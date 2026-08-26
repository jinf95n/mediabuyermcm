import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ctaHover, ctaTap, fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';

interface FinalCTASectionProps {
  titleKey: string;
  ctaKey: string;
  href: string;
}

const FinalCTASection = ({ titleKey, ctaKey, href }: FinalCTASectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden border-t border-border">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-signal-radial)', filter: 'blur(10px)', transform: 'scale(1.3)' }}
      />
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 relative z-10">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl sm:text-6xl font-bold text-foreground mb-10 leading-[1.03] tracking-[-0.02em]"
          >
            {t(titleKey)}
          </motion.h2>
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeInUp}
            whileHover={ctaHover}
            whileTap={ctaTap}
            className="relative inline-flex items-center gap-3 rounded-xl px-10 py-5 font-bold text-lg text-primary-foreground"
            style={{ background: 'var(--gradient-signal)' }}
          >
            <motion.span
              className="absolute inset-0 rounded-xl -z-10"
              style={{ background: 'var(--gradient-signal)', filter: 'blur(28px)' }}
              animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <MessageCircle size={20} />
            {t(ctaKey)}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
