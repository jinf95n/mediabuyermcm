import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { ctaHover, ctaTap, fadeInUp, staggerContainer } from '@/lib/motion';

interface SegmentHeroProps {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
}

const SegmentHero = ({ headline, subheadline, ctaLabel, ctaHref }: SegmentHeroProps) => {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-signal-radial)', filter: 'blur(20px)', transform: 'scale(1.2)' }}
      />
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 relative z-10 pt-20 pb-14 sm:pt-28 sm:pb-20">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-display text-5xl sm:text-6xl lg:text-[3.75rem] font-bold text-foreground leading-[1.03] mb-8 tracking-[-0.03em]"
          >
            {headline}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10"
          >
            {subheadline}
          </motion.p>

          <motion.a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeInUp}
            whileHover={ctaHover}
            whileTap={ctaTap}
            className="relative inline-flex items-center gap-3 rounded-xl px-9 py-5 font-bold text-base text-primary-foreground"
            style={{ background: 'var(--gradient-signal)' }}
          >
            <motion.span
              className="absolute inset-0 rounded-xl -z-10"
              style={{ background: 'var(--gradient-signal)', filter: 'blur(20px)' }}
              animate={{ opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <MessageCircle size={19} />
            {ctaLabel}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SegmentHero;
