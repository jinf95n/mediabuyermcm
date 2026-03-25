import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, X } from 'lucide-react';

const easeCustom = [0.16, 1, 0.3, 1] as const;

const yesItems = ['foryou.yes.1', 'foryou.yes.2', 'foryou.yes.3', 'foryou.yes.4'];
const noItems  = ['foryou.no.1',  'foryou.no.2',  'foryou.no.3',  'foryou.no.4'];

// ── Single item that animates from neutral → decided ──────────────────────
const DecisionItem = ({
  textKey,
  type,
  index,
  isInView,
  t,
}: {
  textKey: string;
  type: 'yes' | 'no';
  index: number;
  isInView: boolean;
  t: (k: string) => string;
}) => {
  const isYes = type === 'yes';
  const delay = index * 0.12 + (isYes ? 0.2 : 0.35);

  return (
    <motion.li
      initial={{ opacity: 0, x: isYes ? -20 : 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.55, ease: easeCustom }}
      className="flex items-start gap-3"
    >
      {/* Icon — enters as neutral dot, then morphs */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ delay: delay + 0.2, duration: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
        className="mt-0.5 shrink-0 h-6 w-6 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: isYes ? 'hsl(var(--primary) / 0.15)' : 'rgba(255,255,255,0.06)',
        }}
      >
        {isYes
          ? <Check size={13} className="text-primary" strokeWidth={3} />
          : <X size={13} className="text-muted-foreground/50" strokeWidth={3} />
        }
      </motion.div>

      <span className={`text-sm leading-snug ${isYes ? 'text-foreground' : 'text-muted-foreground/60'}`}>
        {t(textKey)}
      </span>
    </motion.li>
  );
};

// ── Main ───────────────────────────────────────────────────────────────────
const ForYouSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTab, setActiveTab] = useState<'yes' | 'no'>('yes');

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">

      {/* BG: split color behind each card */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-primary/[0.02]" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-white/[0.01]" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeCustom }}
          className="text-center mb-14"
        >
          <div className="h-[2px] w-10 bg-primary mx-auto mb-5" />
          {/* 
            Add to translations:
            'foryou.section.label': '¿Es para vos?' / 'Is it for you?'
          */}
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
            style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            {t('foryou.section.label')}
          </p>
          {/* 
            Add to translations:
            'foryou.section.title': 'Esto está hecho para algunos negocios. No para todos.' / 'This is built for some businesses. Not all.'
          */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground max-w-xl mx-auto leading-tight">
            {t('foryou.section.title')}
          </h2>
        </motion.div>

        {/* ── Mobile: tab switcher ───────────────────────────────────── */}
        <div className="flex md:hidden rounded-xl border border-border p-1 gap-1 max-w-xs mx-auto mb-8">
          {(['yes', 'no'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-lg text-sm font-bold transition-colors"
              animate={{
                backgroundColor: activeTab === tab
                  ? tab === 'yes' ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.08)'
                  : 'transparent',
                color: activeTab === tab ? '#fff' : 'hsl(var(--muted-foreground))',
              }}
            >
              {tab === 'yes' ? `✓ ${t('foryou.title')}` : `✗ ${t('foryou.nottitle')}`}
            </motion.button>
          ))}
        </div>

        {/* ── Desktop: 2-column + divider ───────────────────────────── */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-4 md:gap-0 items-start">

            {/* YES column */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab === 'no' && window.innerWidth < 768 ? 'hidden' : 'yes'}
                className={`rounded-2xl border-2 p-6 md:p-8 ${activeTab === 'no' ? 'hidden md:block' : ''}`}
                style={{ borderColor: 'hsl(var(--primary) / 0.3)', background: 'hsl(var(--primary) / 0.03)' }}
                initial={{ opacity: 0, x: -32 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: easeCustom }}
              >
                <div className="flex items-center gap-3 mb-7">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                    className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center"
                  >
                    <Check size={18} className="text-primary" strokeWidth={2.5} />
                  </motion.div>
                  <h3 className="text-lg font-bold text-foreground">{t('foryou.title')}</h3>
                </div>

                <ul className="space-y-4">
                  {yesItems.map((key, i) => (
                    <DecisionItem key={key} textKey={key} type="yes" index={i} isInView={isInView} t={t} />
                  ))}
                </ul>

                {/* Glow bottom accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.6, ease: easeCustom }}
                  className="mt-7 h-[2px] rounded-full bg-primary/40 origin-left"
                />
              </motion.div>
            </AnimatePresence>

            {/* Center divider */}
            <div className="hidden md:flex flex-col items-center justify-start pt-12 gap-2">
              <div className="w-[1px] flex-1 bg-border/40" />
              <div className="rounded-full border border-border/60 bg-card px-2 py-1.5 text-[10px] font-bold text-muted-foreground/50 tracking-widest uppercase rotate-0">
                vs
              </div>
              <div className="w-[1px] flex-1 bg-border/40" />
            </div>

            {/* NO column */}
            <motion.div
              className={`rounded-2xl border border-border p-6 md:p-8 ${activeTab === 'yes' ? 'hidden md:block' : ''}`}
              style={{ background: 'rgba(255,255,255,0.01)', filter: 'saturate(0.7)' }}
              initial={{ opacity: 0, x: 32 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: easeCustom }}
            >
              <div className="flex items-center gap-3 mb-7">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
                  className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center"
                >
                  <X size={18} className="text-muted-foreground/60" strokeWidth={2.5} />
                </motion.div>
                <h3 className="text-lg font-bold text-muted-foreground/70">{t('foryou.nottitle')}</h3>
              </div>

              <ul className="space-y-4">
                {noItems.map((key, i) => (
                  <DecisionItem key={key} textKey={key} type="no" index={i} isInView={isInView} t={t} />
                ))}
              </ul>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.9, duration: 0.6, ease: easeCustom }}
                className="mt-7 h-[2px] rounded-full bg-white/5 origin-left"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForYouSection;