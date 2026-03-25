import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, MessageCircle, ArrowRight } from 'lucide-react';

const WHATSAPP_NUMBER = '543517311760';
const WHATSAPP_LINK   = `https://wa.me/${WHATSAPP_NUMBER}`;
const CALENDAR_LINK   = 'https://api.leadconnectorhq.com/widget/booking/u7oCyCflFG3ajShYVJUw';

const easeCustom = [0.16, 1, 0.3, 1] as const;

// ── Floating particles ─────────────────────────────────────────────────────
const Particle = ({ i }: { i: number }) => {
  const style = useMemo(() => ({
    left:  `${5 + Math.random() * 90}%`,
    size:  2 + Math.random() * 3,
    delay: Math.random() * 4,
    dur:   5 + Math.random() * 5,
    drift: (Math.random() - 0.5) * 60,
    opacity: 0.15 + Math.random() * 0.25,
  }), [i]);

  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{ left: style.left, bottom: -10, width: style.size, height: style.size, opacity: 0 }}
      animate={{
        y:       ['0vh', '-110vh'],
        x:       [0, style.drift],
        opacity: [0, style.opacity, style.opacity * 0.5, 0],
      }}
      transition={{
        duration: style.dur,
        delay:    style.delay,
        repeat:   Infinity,
        ease:     'linear',
      }}
    />
  );
};

// ── Main ───────────────────────────────────────────────────────────────────
const FinalCTASection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)' }} />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => <Particle key={i} i={i} />)}
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="max-w-xl mx-auto text-center">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeCustom }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-px w-8 bg-white/30" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/60">
              {t('final.eyebrow') ?? 'Sin compromiso'}
            </span>
            <div className="h-px w-8 bg-white/30" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: easeCustom }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5"
          >
            {t('final.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/75 text-lg mb-10 leading-relaxed"
          >
            {t('final.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
          >
            {/* Primary — calendar */}
            <motion.a
              href={CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-7 py-3.5 font-bold text-sm shadow-xl"
              style={{ color: 'hsl(var(--primary))' }}
            >
              {/* Shimmer */}
              <motion.span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/5 to-transparent"
                animate={{ translateX: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
              />
              <Mail size={16} className="relative z-10" />
              <span className="relative z-10">{t('hero.cta.primary')}</span>
              <ArrowRight size={14} className="relative z-10" />
            </motion.a>

            {/* Secondary — WhatsApp */}
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-7 py-3.5 font-bold text-sm text-white hover:bg-white/10 transition-colors"
            >
              <MessageCircle size={16} />
              {t('hero.cta.secondary')}
            </motion.a>
          </motion.div>

          {/* Microcopy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
            className="text-xs text-white/50"
          >
            {t('final.microcopy')}
          </motion.p>

        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;

