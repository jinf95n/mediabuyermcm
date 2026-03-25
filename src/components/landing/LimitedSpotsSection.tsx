import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShieldCheck, Clock, Users } from 'lucide-react';

const easeCustom = [0.16, 1, 0.3, 1] as const;

// Simulated "slots" — 3 taken, 2 available
const SLOTS = [
  { taken: true },
  { taken: true },
  { taken: true },
  { taken: false },
  { taken: false },
];

const LimitedSpotsSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">

      {/* Faint radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--primary) / 0.04) 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeCustom }}
            className="text-center mb-10"
          >
            <div className="h-[2px] w-10 bg-primary mx-auto mb-5" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t('limited.title')}
            </h2>
          </motion.div>

          {/* ── Slot availability visual ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6, ease: easeCustom }}
            className="rounded-2xl border border-border bg-card p-6 mb-4"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-muted-foreground" />
                <span className="text-sm font-bold text-foreground">{t('limited.slots.label') ?? 'Cupos este mes'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-xs font-bold text-green-500">{t('limited.slots.open') ?? '2 disponibles'}</span>
              </div>
            </div>

            {/* Slot bars */}
            <div className="flex gap-2 mb-5">
              {SLOTS.map((slot, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: easeCustom }}
                  className="flex-1 h-2.5 rounded-full origin-left"
                  style={{ backgroundColor: slot.taken ? 'hsl(var(--primary))' : 'hsl(var(--border))' }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{t('limited.slots.taken') ?? '3 cupos ocupados'}</span>
              <span className="font-medium text-foreground">{t('limited.slots.total') ?? '5 cupos totales / mes'}</span>
            </div>
          </motion.div>

          {/* Two info cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { icon: Clock, textKey: 'limited.text1', delay: 0.25 },
              { icon: Users, textKey: 'limited.text2', delay: 0.35 },
            ].map(({ icon: Icon, textKey, delay }) => (
              <motion.div
                key={textKey}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay, duration: 0.55, ease: easeCustom }}
                className="rounded-xl border border-border bg-card px-5 py-4 flex items-start gap-3"
              >
                <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                  <Icon size={15} className="text-primary" />
                </div>
                <p className="text-sm text-muted-foreground leading-snug">{t(textKey)}</p>
              </motion.div>
            ))}
          </div>

          {/* Honest note — styled as a highlight, not a warning */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.55, ease: easeCustom }}
            className="rounded-xl border border-primary/20 bg-primary/[0.03] px-5 py-5 flex items-start gap-4"
          >
            <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
              <ShieldCheck size={15} className="text-primary" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              {t('limited.honest')}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LimitedSpotsSection;

