import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ctaTap, fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';

const easeCustom = [0.16, 1, 0.3, 1] as const;

/** Three small signal bars, echoing the wordmark and the pipeline nodes —
 * this agency already has a signal, it just isn't reaching Meta yet. */
const SignalBars = () => (
  <div className="flex items-end gap-1 h-8">
    {[0.5, 1, 0.7].map((h, i) => (
      <motion.span
        key={i}
        className="w-1.5 rounded-full"
        style={{ background: 'var(--gradient-signal)' }}
        initial={{ height: '20%' }}
        whileInView={{ height: `${h * 100}%` }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.12, duration: 0.6, ease: easeCustom }}
      />
    ))}
  </div>
);

/** Two stacked cards, the branded one on top — the white-label relationship
 * this partner keeps with their client. */
const StackedBadge = () => (
  <div className="relative h-8 w-11">
    <div className="absolute inset-0 top-1.5 left-1.5 rounded-md border border-border bg-muted" />
    <div
      className="absolute inset-0 rounded-md border border-border/60"
      style={{ background: 'var(--gradient-signal)' }}
    />
  </div>
);

const PathFork = () => {
  const { t } = useLanguage();

  const panels = [
    {
      to: '/agencias',
      icon: <SignalBars />,
      title: t('home.fork.a.title'),
      desc: t('home.fork.a.desc'),
      cta: t('home.fork.a.cta'),
    },
    {
      to: '/partners',
      icon: <StackedBadge />,
      title: t('home.fork.b.title'),
      desc: t('home.fork.b.desc'),
      cta: t('home.fork.b.cta'),
    },
  ];

  return (
    <section className="py-14 sm:py-20 border-t border-border">
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto w-full max-w-[1200px] px-6 sm:px-8"
      >
        <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-10 max-w-md">
          {t('home.fork.lead')}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {panels.map((panel) => (
            <motion.div
              key={panel.to}
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: easeCustom } }}
              whileTap={ctaTap}
              className="group"
            >
              <Link
                to={panel.to}
                className="relative flex flex-col justify-between h-full rounded-2xl border border-border bg-card p-9 sm:p-12 overflow-hidden transition-colors hover:border-primary/40"
                style={{ boxShadow: 'var(--shadow-md)' }}
              >
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'var(--gradient-signal)', filter: 'blur(50px)' }}
                />
                <div className="relative">
                  <div className="mb-7">{panel.icon}</div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight tracking-tight">
                    {panel.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm">{panel.desc}</p>
                </div>
                <div className="relative mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  {panel.cta}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PathFork;
