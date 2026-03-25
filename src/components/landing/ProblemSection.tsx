import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const easeCustom = [0.16, 1, 0.3, 1] as const;

const problems = [
  { key: 'problem.1', emoji: '😤', color: '#ef4444' },
  { key: 'problem.2', emoji: '🔀', color: '#f97316' },
  { key: 'problem.3', emoji: '📉', color: '#eab308' },
  { key: 'problem.4', emoji: '👻', color: '#a855f7' },
  { key: 'problem.5', emoji: '📊', color: '#3b82f6' },
  { key: 'problem.6', emoji: '🔥', color: '#ef4444' },
];

// ── Problem item driven by motion values ──────────────────────────────────
const ProblemItem = ({
  prob,
  index,
  activeIndex,
  t,
}: {
  prob: typeof problems[0];
  index: number;
  activeIndex: ReturnType<typeof useTransform>;
  t: (k: string) => string;
}) => {
  const opacity = useTransform(activeIndex, (v: number) => {
    const r = Math.round(v);
    if (r === index) return 1;
    if (r > index)   return 0.38;
    return 0.15;
  });

  const scale = useTransform(activeIndex, (v: number) =>
    Math.round(v) === index ? 1 : 0.97
  );

  const numberBg = useTransform(activeIndex, (v: number) =>
    Math.round(v) === index ? prob.color : 'transparent'
  );

  const numberBorder = useTransform(activeIndex, (v: number) =>
    Math.round(v) === index ? prob.color : 'rgba(255,255,255,0.12)'
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="flex items-start gap-4 py-4 border-b border-border/20 last:border-0"
    >
      {/* Number circle */}
      <motion.div
        style={{ backgroundColor: numberBg, borderColor: numberBorder }}
        className="shrink-0 h-8 w-8 rounded-full border-2 flex items-center justify-center font-bold text-xs text-white"
      >
        {index + 1}
      </motion.div>

      <div className="flex items-start gap-2.5 flex-1 min-w-0">
        <span className="text-lg shrink-0 mt-0.5">{prob.emoji}</span>
        <p className="text-sm md:text-base leading-snug text-muted-foreground">
          {t(prob.key)}
        </p>
      </div>
    </motion.div>
  );
};

// ── Main ───────────────────────────────────────────────────────────────────
const ProblemSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  // Map 0→1 scroll to 0→(n-1) active index
  const activeIndex = useTransform(
    smoothProgress,
    [0, 1],
    [0, problems.length - 1]
  );

  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  const counterDisplay = useTransform(activeIndex, (v: number) =>
    String(Math.min(Math.round(v) + 1, problems.length))
  );

  return (
    // Tall container — gives scroll room for the sticky effect
    <div
      ref={containerRef}
      style={{ height: `${(problems.length + 1.5) * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-background">

        {/* Animated BG orb */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: useTransform(
              smoothProgress,
              [0, 0.5, 1],
              [
                'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(239,68,68,0.05) 0%, transparent 70%)',
                'radial-gradient(ellipse 60% 60% at 20% 50%, rgba(168,85,247,0.05) 0%, transparent 70%)',
                'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(239,68,68,0.05) 0%, transparent 70%)',
              ]
            ),
          }}
        />

        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-border/30 z-20">
          <motion.div className="h-full bg-primary origin-left" style={{ scaleX: smoothProgress }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">

            {/* ── Left: heading + counter ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeCustom }}
            >
              <div className="h-[2px] w-10 bg-primary mb-5" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5">
                {t('problem.title')}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed">
                {t('problem.subtitle')}
              </p>

              {/* Big counter */}
              <div className="flex items-end gap-2 mb-2">
                <motion.span
                  className="text-7xl font-bold tabular-nums leading-none"
                  style={{
                    background: 'var(--gradient-hero)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {counterDisplay}
                </motion.span>
                <span className="text-2xl text-muted-foreground mb-2">
                  / {problems.length}
                </span>
              </div>

              <p className="text-xs text-muted-foreground italic">
                Scrolleá para ver cada punto 👇
              </p>
            </motion.div>

            {/* ── Right: problem list ───────────────────────────────── */}
            <div>
              {problems.map((prob, i) => (
                <ProblemItem
                  key={prob.key}
                  prob={prob}
                  index={i}
                  activeIndex={activeIndex}
                  t={t}
                />
              ))}
            </div>

          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/50"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-widest">scroll</span>
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
            <path d="M6 1v14M1 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

      </div>
    </div>
  );
};

export default ProblemSection;