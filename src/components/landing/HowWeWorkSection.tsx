import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Search, FileText, Rocket } from 'lucide-react';

const easeCustom = [0.16, 1, 0.3, 1] as const;

const steps = [
  { icon: MessageSquare, titleKey: 'how.step1.title', descKey: 'how.step1.desc', color: '#6366f1', num: '01' },
  { icon: Search,        titleKey: 'how.step2.title', descKey: 'how.step2.desc', color: '#8b5cf6', num: '02' },
  { icon: FileText,      titleKey: 'how.step3.title', descKey: 'how.step3.desc', color: '#a855f7', num: '03' },
  { icon: Rocket,        titleKey: 'how.step4.title', descKey: 'how.step4.desc', color: '#ec4899', num: '04' },
];

// ── Step card ──────────────────────────────────────────────────────────────
const StepCard = ({
  step,
  index,
  progress,
}: {
  step: typeof steps[0];
  index: number;
  progress: ReturnType<typeof useTransform>;
}) => {
  const { t } = useLanguage();
  const threshold = index / (steps.length - 1);

  const opacity  = useTransform(progress, [threshold - 0.1, threshold, threshold + 0.15], [0.15, 1, 1]);
  const scale    = useTransform(progress, [threshold - 0.1, threshold], [0.88, 1]);
  const iconBg   = useTransform(progress, (v) => v >= threshold ? step.color : 'rgba(255,255,255,0.05)');
  const iconOpacity = useTransform(progress, [threshold - 0.05, threshold], [0.3, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="flex flex-col items-center text-center"
    >
      {/* Icon circle */}
      <motion.div
        style={{ backgroundColor: iconBg }}
        className="relative h-16 w-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
      >
        <motion.div style={{ opacity: iconOpacity }}>
          <step.icon size={26} className="text-white" />
        </motion.div>

        {/* Number badge */}
        <motion.div
          style={{
            opacity: useTransform(progress, [threshold - 0.05, threshold], [0, 1]),
            scale: useTransform(progress, [threshold - 0.05, threshold], [0, 1]),
          }}
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background border-2 flex items-center justify-center"
          style2={{ borderColor: step.color }}
        >
          <span className="text-[9px] font-bold" style={{ color: step.color }}>{step.num}</span>
        </motion.div>

        {/* Glow */}
        <motion.div
          style={{ opacity: useTransform(progress, [threshold, threshold + 0.1], [0, 0.35]) }}
          className="absolute inset-0 rounded-2xl blur-lg"
          style2={{ backgroundColor: step.color }}
        />
      </motion.div>

      <h3 className="font-bold text-foreground text-base mb-2">{t(step.titleKey)}</h3>
      <p className="text-sm text-muted-foreground leading-snug max-w-[160px]">{t(step.descKey)}</p>
    </motion.div>
  );
};

// ── Main ───────────────────────────────────────────────────────────────────
const HowWeWorkSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  // SVG line draws from left to right
  const pathLength = useTransform(smoothProgress, [0.05, 0.95], [0, 1]);

  // Active step label
  const activeStep = useTransform(smoothProgress, (v) =>
    Math.min(Math.floor(v * steps.length) + 1, steps.length)
  );

  return (
    <div ref={containerRef} className="relative" style={{ height: `${steps.length * 80}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-card">

        {/* BG gradient shifts through step colors */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: useTransform(smoothProgress, [0, 0.33, 0.66, 1], [
              'radial-gradient(ellipse 60% 50% at 10% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)',
              'radial-gradient(ellipse 60% 50% at 40% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)',
              'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(168,85,247,0.05) 0%, transparent 70%)',
              'radial-gradient(ellipse 60% 50% at 90% 50%, rgba(236,72,153,0.05) 0%, transparent 70%)',
            ]),
          }}
        />

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-border/30 z-20">
          <motion.div className="h-full bg-primary origin-left" style={{ scaleX: smoothProgress }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">

          {/* Header */}
          <motion.div
            ref={headRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeCustom }}
            className="text-center mb-16"
          >
            <div className="h-[2px] w-10 bg-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('how.title')}
            </h2>
            {/* Live step counter */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground">{t('how.step.label') ?? 'Paso'}</span>
              <motion.span
                className="text-sm font-bold tabular-nums"
                style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {activeStep}
              </motion.span>
              <span className="text-xs text-muted-foreground">/ {steps.length}</span>
            </div>
          </motion.div>

          {/* Steps + connecting SVG line */}
          <div className="relative max-w-3xl mx-auto">

            {/* SVG connecting path — desktop only */}
            <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0 hidden md:block" style={{ top: 32 }}>
              <svg
                viewBox="0 0 600 40"
                className="w-full overflow-visible"
                preserveAspectRatio="none"
              >
                {/* Base line (dim) */}
                <path
                  d="M0 20 C100 20 100 20 200 20 C300 20 300 20 400 20 C500 20 500 20 600 20"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="2"
                />
                {/* Animated line */}
                <motion.path
                  d="M0 20 C100 20 100 20 200 20 C300 20 300 20 400 20 C500 20 500 20 600 20"
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ pathLength }}
                />
                {/* Dot that travels the path */}
                <motion.circle
                  cx="0"
                  cy="20"
                  r="5"
                  fill="white"
                  style={{
                    offsetPath: "path('M0 20 C100 20 100 20 200 20 C300 20 300 20 400 20 C500 20 500 20 600 20')",
                    offsetDistance: useTransform(pathLength, [0, 1], ['0%', '100%']),
                  }}
                />
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#6366f1" />
                    <stop offset="33%"  stopColor="#8b5cf6" />
                    <stop offset="66%"  stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Step cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {steps.map((step, i) => (
                <StepCard key={step.num} step={step} index={i} progress={smoothProgress} />
              ))}
            </div>
          </div>

        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/40"
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

export default HowWeWorkSection;