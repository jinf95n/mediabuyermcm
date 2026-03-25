import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

const WHATSAPP_NUMBER = '543517311760';
const easeCustom = [0.16, 1, 0.3, 1] as const;

// ── Step definitions ───────────────────────────────────────────────────────
// All labels via t() — add keys to LanguageContext listed at bottom of file

type Option = { value: string; labelKey: string; emoji: string };

type Step = {
  id: string;
  questionKey: string;
  options: Option[];
};

const steps: Step[] = [
  {
    id: 'business',
    questionKey: 'wizard.q1',
    options: [
      { value: 'ecommerce',  labelKey: 'wizard.q1.a', emoji: '🛍️' },
      { value: 'services',   labelKey: 'wizard.q1.b', emoji: '🧠' },
      { value: 'local',      labelKey: 'wizard.q1.c', emoji: '📍' },
      { value: 'other',      labelKey: 'wizard.q1.d', emoji: '🔮' },
    ],
  },
  {
    id: 'revenue',
    questionKey: 'wizard.q2',
    options: [
      { value: 'under5k',   labelKey: 'wizard.q2.a', emoji: '🌱' },
      { value: '5k-15k',    labelKey: 'wizard.q2.b', emoji: '📈' },
      { value: '15k-30k',   labelKey: 'wizard.q2.c', emoji: '🚀' },
      { value: 'over30k',   labelKey: 'wizard.q2.d', emoji: '🏆' },
    ],
  },
  {
    id: 'budget',
    questionKey: 'wizard.q3',
    options: [
      { value: 'under300',  labelKey: 'wizard.q3.a', emoji: '💧' },
      { value: '300-700',   labelKey: 'wizard.q3.b', emoji: '💧💧' },
      { value: '700-2k',    labelKey: 'wizard.q3.c', emoji: '💧💧💧' },
      { value: 'over2k',    labelKey: 'wizard.q3.d', emoji: '🌊' },
    ],
  },
  {
    id: 'goal',
    questionKey: 'wizard.q4',
    options: [
      { value: 'sales',     labelKey: 'wizard.q4.a', emoji: '🛒' },
      { value: 'leads',     labelKey: 'wizard.q4.b', emoji: '🎯' },
      { value: 'scale',     labelKey: 'wizard.q4.c', emoji: '⚡' },
      { value: 'order',     labelKey: 'wizard.q4.d', emoji: '🗂️' },
    ],
  },
];

// ── Plan recommendation logic ──────────────────────────────────────────────
type Answers = Record<string, string>;

const getRecommendation = (answers: Answers) => {
  const { revenue, budget } = answers;

  if (revenue === 'over30k' || budget === 'over2k') {
    return 'partner';
  }
  if (revenue === '15k-30k' || budget === '700-2k') {
    return 'growth';
  }
  return 'starter';
};

const planMeta: Record<string, { titleKey: string; color: string; descKey: string }> = {
  starter: { titleKey: 'packages.starter.title', color: '#6366f1', descKey: 'wizard.plan.starter.desc' },
  growth:  { titleKey: 'packages.growth.title',  color: '#8b5cf6', descKey: 'wizard.plan.growth.desc'  },
  partner: { titleKey: 'packages.partner.title', color: '#ec4899', descKey: 'wizard.plan.partner.desc' },
};

// ── Build WhatsApp message ─────────────────────────────────────────────────
const buildWhatsApp = (answers: Answers, plan: string, t: (k: string) => string) => {
  const lines = [
    `${t('wizard.wa.greeting')}`,
    ``,
    `📋 *${t('wizard.wa.summary')}*`,
    `• ${t('wizard.wa.business')}: ${t(`wizard.q1.${answers.business?.replace('ecommerce','a').replace('services','b').replace('local','c').replace('other','d') ?? 'a'}`)}`,
    `• ${t('wizard.wa.revenue')}: ${t(`wizard.q2.${answers.revenue?.replace('under5k','a').replace('5k-15k','b').replace('15k-30k','c').replace('over30k','d') ?? 'a'}`)}`,
    `• ${t('wizard.wa.budget')}: ${t(`wizard.q3.${answers.budget?.replace('under300','a').replace('300-700','b').replace('700-2k','c').replace('over2k','d') ?? 'a'}`)}`,
    `• ${t('wizard.wa.goal')}: ${t(`wizard.q4.${answers.goal?.replace('sales','a').replace('leads','b').replace('scale','c').replace('order','d') ?? 'a'}`)}`,
    ``,
    `⭐ ${t('wizard.wa.plan')}: *${t(planMeta[plan].titleKey)}*`,
    ``,
    t('wizard.wa.closing'),
  ];
  return encodeURIComponent(lines.join('\n'));
};

// ── Option button ──────────────────────────────────────────────────────────
const OptionBtn = ({
  option,
  selected,
  onClick,
  t,
}: {
  option: Option;
  selected: boolean;
  onClick: () => void;
  t: (k: string) => string;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    animate={{
      borderColor: selected ? 'hsl(var(--primary))' : 'hsl(var(--border))',
      backgroundColor: selected ? 'hsl(var(--primary) / 0.08)' : 'hsl(var(--background))',
    }}
    transition={{ duration: 0.2 }}
    className="relative w-full text-left rounded-xl border-2 px-5 py-4 flex items-center gap-4 transition-shadow hover:shadow-md"
  >
    <span className="text-2xl shrink-0">{option.emoji}</span>
    <span className="text-sm font-medium text-foreground leading-snug">{t(option.labelKey)}</span>
    {selected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="ml-auto h-5 w-5 rounded-full bg-primary flex items-center justify-center shrink-0"
      >
        <Check size={11} className="text-white" strokeWidth={3} />
      </motion.div>
    )}
  </motion.button>
);

// ── Result card ────────────────────────────────────────────────────────────
const ResultCard = ({
  plan,
  answers,
  t,
}: {
  plan: string;
  answers: Answers;
  t: (k: string) => string;
}) => {
  const meta = planMeta[plan];
  const waMsg = buildWhatsApp(answers, plan, t);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeCustom }}
      className="text-center"
    >
      {/* Sparkle icon */}
      <motion.div
        initial={{ rotate: -20, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl mx-auto mb-6"
        style={{ backgroundColor: meta.color + '20', border: `2px solid ${meta.color}40` }}
      >
        <Sparkles size={28} style={{ color: meta.color }} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2"
      >
        {t('wizard.result.label')}
      </motion.p>

      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold mb-3"
        style={{ color: meta.color }}
      >
        {t(meta.titleKey)}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-muted-foreground text-sm max-w-xs mx-auto mb-8 leading-relaxed"
      >
        {t(meta.descKey)}
      </motion.p>

      {/* Summary pills */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {Object.entries(answers).map(([, val]) => (
          <span
            key={val}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-border text-muted-foreground"
          >
            {val}
          </span>
        ))}
      </motion.div>

      {/* WhatsApp CTA */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 font-bold text-sm text-white shadow-lg"
        style={{ backgroundColor: '#25D366', boxShadow: '0 8px 24px rgba(37,211,102,0.3)' }}
      >
        <MessageCircle size={18} />
        {t('wizard.result.cta')}
        <ArrowRight size={15} />
      </motion.a>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        className="text-xs text-muted-foreground mt-4 italic"
      >
        {t('wizard.result.note')}
      </motion.p>
    </motion.div>
  );
};

// ── Main ───────────────────────────────────────────────────────────────────
const PackagesSection = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const [direction, setDirection] = useState(1);

  const step = steps[currentStep];
  const selected = answers[step?.id];
  const totalSteps = steps.length;
  const progress = (currentStep / totalSteps) * 100;

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
  };

  const handleNext = () => {
    if (!selected) return;
    if (currentStep === totalSteps - 1) {
      setDone(true);
    } else {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setDirection(-1);
    setCurrentStep((s) => s - 1);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setDone(false);
  };

  const plan = getRecommendation(answers);

  return (
    <section className="py-20 md:py-28 bg-card relative overflow-hidden" id="packages">

      {/* BG */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeCustom }}
          className="text-center mb-12"
        >
          <div className="h-[2px] w-10 bg-primary mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t('packages.title')}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t('packages.subtitle')}
          </p>
        </motion.div>

        {/* ── Wizard card ─────────────────────────────────────────────── */}
        <div className="max-w-xl mx-auto">
          <div className="rounded-2xl border border-border bg-background shadow-xl overflow-hidden">

            {/* Progress bar */}
            {!done && (
              <div className="h-[3px] bg-border/40">
                <motion.div
                  className="h-full bg-primary origin-left"
                  animate={{ width: `${progress + (100 / totalSteps)}%` }}
                  transition={{ duration: 0.4, ease: easeCustom }}
                />
              </div>
            )}

            <div className="p-7 md:p-10">
              <AnimatePresence mode="wait" custom={direction}>
                {done ? (
                  <motion.div key="result">
                    <ResultCard plan={plan} answers={answers} t={t} />
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      onClick={handleReset}
                      className="mt-6 mx-auto block text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                    >
                      {t('wizard.restart')}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -32 }}
                    transition={{ duration: 0.35, ease: easeCustom }}
                  >
                    {/* Step counter */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-bold text-muted-foreground/50 tracking-widest uppercase">
                        {currentStep + 1} / {totalSteps}
                      </span>
                      <div className="flex gap-1">
                        {steps.map((_, i) => (
                          <div
                            key={i}
                            className="h-1.5 rounded-full transition-all duration-300"
                            style={{
                              width: i === currentStep ? 20 : 6,
                              backgroundColor: i <= currentStep ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Question */}
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-7 leading-snug">
                      {t(step.questionKey)}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3 mb-8">
                      {step.options.map((opt) => (
                        <OptionBtn
                          key={opt.value}
                          option={opt}
                          selected={selected === opt.value}
                          onClick={() => handleSelect(opt.value)}
                          t={t}
                        />
                      ))}
                    </div>

                    {/* Nav buttons */}
                    <div className="flex items-center justify-between">
                      <motion.button
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        whileHover={{ x: -2 }}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ArrowLeft size={15} />
                        {t('wizard.back')}
                      </motion.button>

                      <motion.button
                        onClick={handleNext}
                        disabled={!selected}
                        whileHover={selected ? { scale: 1.04 } : {}}
                        whileTap={selected ? { scale: 0.97 } : {}}
                        className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-sm text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{ background: selected ? 'var(--gradient-hero)' : undefined, backgroundColor: !selected ? 'hsl(var(--muted))' : undefined }}
                      >
                        {currentStep === totalSteps - 1 ? t('wizard.see.plan') : t('wizard.next')}
                        <ArrowRight size={15} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;

