import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Minus } from 'lucide-react';

const easeCustom = [0.16, 1, 0.3, 1] as const;

const faqs = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
  { q: 'faq.q5', a: 'faq.a5' },
  { q: 'faq.q6', a: 'faq.a6' },
  { q: 'faq.q7', a: 'faq.a7' },
];

const FAQSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section className="py-20 md:py-28 bg-card relative overflow-hidden">

      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeCustom }}
            className="text-center mb-12"
          >
            <div className="h-[2px] w-10 bg-primary mx-auto mb-5" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('faq.title')}
            </h2>
          </motion.div>

          {/* FAQ list */}
          <div className="space-y-2">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: easeCustom }}
                >
                  <motion.div
                    animate={{
                      borderColor: isOpen ? 'hsl(var(--primary) / 0.4)' : 'hsl(var(--border))',
                      backgroundColor: isOpen ? 'hsl(var(--primary) / 0.04)' : 'hsl(var(--background))',
                    }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl border-2 overflow-hidden"
                  >
                    {/* Trigger */}
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center gap-4 px-5 py-4 text-left"
                    >
                      {/* Number */}
                      <motion.span
                        animate={{
                          color: isOpen ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground) / 0.4)',
                        }}
                        className="text-xs font-bold tabular-nums shrink-0 w-5"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </motion.span>

                      {/* Question */}
                      <span className="flex-1 text-sm md:text-base font-semibold text-foreground leading-snug text-left">
                        {t(faq.q)}
                      </span>

                      {/* Icon */}
                      <motion.div
                        animate={{
                          backgroundColor: isOpen ? 'hsl(var(--primary))' : 'hsl(var(--muted) / 0.5)',
                          rotate: isOpen ? 0 : 0,
                        }}
                        className="shrink-0 h-7 w-7 rounded-full flex items-center justify-center"
                      >
                        {isOpen
                          ? <Minus size={13} className="text-white" strokeWidth={2.5} />
                          : <Plus  size={13} className="text-muted-foreground" strokeWidth={2.5} />
                        }
                      </motion.div>
                    </button>

                    {/* Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: easeCustom }}
                          className="overflow-hidden"
                        >
                          {/* Top divider */}
                          <div className="mx-5 h-px bg-primary/10" />
                          <p className="px-5 py-4 pl-14 text-sm text-muted-foreground leading-relaxed">
                            {t(faq.a)}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;