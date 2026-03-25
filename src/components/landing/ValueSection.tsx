import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

const easeCustom = [0.16, 1, 0.3, 1] as const;

const whatIDo  = ['value.what.1', 'value.what.2', 'value.what.3', 'value.what.4'];
const whatYGet = ['value.get.1',  'value.get.2',  'value.get.3',  'value.get.4'];

const leftIcons  = ['⚙️', '🎯', '📋', '💬'];
const rightIcons = ['🔍', '📅', '📊', '🤝'];

const ValueSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-card relative overflow-hidden">

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeCustom }}
          className="text-center mb-16"
        >
          <div className="h-[2px] w-10 bg-primary mx-auto mb-5 origin-center" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('value.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            {t('value.subtitle')}
          </p>
        </motion.div>

        {/* ── 3-column layout: left | center | right ─────────────────── */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0 items-start">

          {/* ── Left: Lo que hacemos ─────────────────────────────────── */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center text-sm"
                style={{ background: 'var(--gradient-hero)' }}
              >
                ⚙️
              </div>
              <h3 className="font-bold text-foreground">{t('value.what.title')}</h3>
            </motion.div>

            {whatIDo.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -28 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.55, ease: easeCustom }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group relative cursor-default"
              >
                <motion.div
                  animate={{
                    borderColor: hovered === i ? 'var(--primary)' : 'transparent',
                    backgroundColor: hovered === i ? 'hsl(var(--primary) / 0.06)' : 'hsl(var(--background))',
                  }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl border-2 px-4 py-3.5 flex items-start gap-3"
                >
                  {/* Left accent */}
                  <motion.div
                    animate={{ scaleY: hovered === i ? 1 : 0.4, opacity: hovered === i ? 1 : 0.3 }}
                    className="w-[3px] rounded-full bg-primary self-stretch shrink-0"
                  />
                  <span className="text-lg shrink-0">{leftIcons[i]}</span>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-snug">
                    {t(key)}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* ── Center: connector ────────────────────────────────────── */}
          <div className="hidden lg:flex flex-col items-center justify-start pt-16 px-6 gap-0">
            {whatIDo.map((_, i) => (
              <div key={i} className="flex flex-col items-center" style={{ height: '72px' }}>
                <motion.div
                  animate={{
                    opacity: hovered === i ? 1 : 0.15,
                    scale: hovered === i ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                  className="relative flex items-center"
                >
                  {/* Animated arrow */}
                  <motion.div
                    animate={{ x: hovered === i ? [0, 6, 0] : 0 }}
                    transition={{ duration: 0.5, repeat: hovered === i ? Infinity : 0 }}
                  >
                    <ArrowRight
                      size={20}
                      className="text-primary"
                    />
                  </motion.div>

                  {/* Connection dot */}
                  <AnimatePresence>
                    {hovered === i && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Vertical connector line */}
                {i < whatIDo.length - 1 && (
                  <div className="flex-1 w-[1px] bg-border/50 my-1" />
                )}
              </div>
            ))}
          </div>

          {/* ── Right: Lo que obtenés ────────────────────────────────── */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center text-sm"
                style={{ background: 'var(--gradient-hero)' }}
              >
                🎁
              </div>
              <h3 className="font-bold text-foreground">{t('value.get.title')}</h3>
            </motion.div>

            {whatYGet.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 28 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.05, duration: 0.55, ease: easeCustom }}
              >
                <motion.div
                  animate={{
                    borderColor: hovered === i ? 'var(--primary)' : 'transparent',
                    backgroundColor: hovered === i ? 'hsl(var(--primary) / 0.06)' : 'hsl(var(--background))',
                  }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl border-2 px-4 py-3.5 flex items-start gap-3"
                >
                  <span className="text-lg shrink-0">{rightIcons[i]}</span>
                  <p
                    className="text-sm leading-snug transition-colors duration-200"
                    style={{ color: hovered === i ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))' }}
                  >
                    {t(key)}
                  </p>
                  {/* Right accent */}
                  <motion.div
                    animate={{ scaleY: hovered === i ? 1 : 0.4, opacity: hovered === i ? 1 : 0.3 }}
                    className="w-[3px] rounded-full bg-primary self-stretch shrink-0 ml-auto"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom note ───────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-xs text-muted-foreground mt-12 italic"
        >
          {t('value.footer')}
        </motion.p>
      </div>
    </section>
  );
};

export default ValueSection;