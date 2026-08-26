import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import SignalWaveform from '@/components/signal/SignalWaveform';
import { fadeInUp, staggerContainer } from '@/lib/motion';

const HeroSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const waveY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const waveOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[100svh] flex flex-col">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--gradient-signal-soft)' }} />

      {/* Vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, hsl(240 6% 6%) 100%)' }}
      />

      <motion.div
        style={{ y: textY }}
        className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 relative z-10 pt-24 sm:pt-32"
      >
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-display text-5xl sm:text-6xl lg:text-[4.25rem] font-bold text-foreground leading-[1.02] mb-8 tracking-[-0.03em]"
          >
            {t('home.hero.headline')}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto"
          >
            {t('home.hero.subheadline')}
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: waveY, opacity: waveOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-10 mt-auto pt-24 sm:pt-32 h-[38vh] min-h-[280px] sm:h-[46vh]"
      >
        <SignalWaveform className="h-full w-full" ambient />
      </motion.div>
    </section>
  );
};

export default HeroSection;
