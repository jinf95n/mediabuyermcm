import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, CheckCircle, Mail, TrendingUp, Users, Target, Zap } from 'lucide-react';

const WHATSAPP_NUMBER = '543517311760';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const easeCustom = [0.16, 1, 0.3, 1] as const;

// ── Floating metric card ───────────────────────────────────────────────────
const MetricCard = ({
  icon: Icon,
  value,
  label,
  delay,
  className = '',
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  delay: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 16 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: easeCustom }}
    className={`absolute bg-card border border-border rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 backdrop-blur-sm ${className}`}
  >
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
      <Icon size={16} className="text-primary" />
    </div>
    <div>
      <p className="text-base font-bold text-foreground leading-none">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  </motion.div>
);

// ── Animated counter ───────────────────────────────────────────────────────
const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let start = 0;
      const step = Math.ceil(value / 40);
      const timer = setInterval(() => {
        start = Math.min(start + step, value);
        setCount(start);
        if (start >= value) clearInterval(timer);
      }, 35);
      observer.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const HeroSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const scrollToContact = () => {
    const el = document.querySelector('footer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{ background: 'var(--gradient-hero-soft)' }}
    >
      {/* ── Animated background orbs ──────────────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-15 blur-3xl -translate-y-1/3 translate-x-1/4"
          style={{ background: 'var(--gradient-hero)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl translate-y-1/3 -translate-x-1/4"
          style={{ background: 'var(--gradient-hero)' }}
        />
      </motion.div>

      {/* ── Grid texture overlay ───────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10 py-24 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: content ─────────────────────────────────────────── */}
          <div>
            {/* Brand label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="h-px w-8 bg-primary" />
              <span
                className="text-xs font-bold tracking-[0.25em] uppercase"
                style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                MCM Digital
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: easeCustom }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] mb-6"
            >
              {t('hero.headline')}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg"
            >
              {t('hero.subheadline')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mb-4"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm"
                style={{ background: 'var(--gradient-hero)', color: '#fff' }}
              >
                <Mail size={16} />
                {t('hero.cta.primary')}
              </motion.button>

              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm border-2 border-border text-foreground hover:border-primary transition-colors"
              >
                <MessageCircle size={16} style={{ color: '#25D366' }} />
                {t('hero.cta.secondary')}
              </motion.a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-xs text-muted-foreground mb-10"
            >
              {t('hero.microcopy')}
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-col gap-2.5"
            >
              {(['hero.trust.1', 'hero.trust.2', 'hero.trust.3'] as const).map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle size={15} className="text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{t(key)}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: stats visual ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: easeCustom }}
            className="relative hidden lg:flex items-center justify-center h-[480px]"
          >
            {/* Central card */}
            <div className="relative rounded-2xl border border-border bg-card p-8 shadow-2xl w-72 z-10">
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--gradient-hero)' }}
                >
                  <TrendingUp size={16} className="text-white" />
                </div>
                <span className="font-bold text-sm text-foreground">Resultados del mes</span>
              </div>

              {/* Fake bar chart */}
              <div className="flex items-end gap-2 h-24 mb-4">
                {[40, 55, 45, 70, 60, 85, 75].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{ background: i === 5 ? 'var(--gradient-hero)' : 'hsl(var(--muted))' }}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.8 + i * 0.08, duration: 0.5, ease: easeCustom }}
                  />
                ))}
              </div>

              <div className="flex justify-between text-xs text-muted-foreground mb-5">
                <span>Sem 1</span>
                <span>Sem 7</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Campañas activas', value: '8' },
                  { label: 'ROAS promedio', value: '4.2x' },
                  { label: 'Inversión gestionada', value: '$12K' },
                  { label: 'Clientes activos', value: '14' },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-lg bg-muted/50 p-2.5">
                    <p className="font-bold text-sm text-foreground">{value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating metric cards */}
            <MetricCard
              icon={Users}
              value="+40"
              label="Campañas gestionadas"
              delay={1.0}
              className="-top-4 -left-8"
            />
            <MetricCard
              icon={Target}
              value="87%"
              label="Clientes renuevan"
              delay={1.1}
              className="top-16 -right-10"
            />
            <MetricCard
              icon={Zap}
              value="<24hs"
              label="Tiempo de respuesta"
              delay={1.2}
              className="-bottom-4 -left-6"
            />

            {/* Pulsing dot */}
            <div className="absolute top-8 right-8 flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-xs text-muted-foreground font-medium">En vivo</span>
            </div>
          </motion.div>
        </div>

        {/* ── Stats strip — mobile ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-3 gap-4 mt-16 pt-10 border-t border-border lg:hidden"
        >
          {[
            { value: 40, suffix: '+', label: 'Campañas' },
            { value: 87, suffix: '%', label: 'Renuevan' },
            { value: 3,  suffix: '',  label: 'Países' },
          ].map(({ value, suffix, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-foreground">
                <Counter value={value} suffix={suffix} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;