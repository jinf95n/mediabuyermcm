import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import SignalWaveform from '@/components/signal/SignalWaveform';
import { fadeInLeft, fadeInRight, viewportOnce } from '@/lib/motion';

interface NoiseSignalCompareProps {
  className?: string;
  labelPrefix?: string;
}

const NoiseSignalCompare = ({ className = '', labelPrefix = 'home.mechanism' }: NoiseSignalCompareProps) => {
  const { t } = useLanguage();

  return (
    <div className={`grid sm:grid-cols-2 gap-px bg-border ${className}`}>
      <motion.div
        variants={fadeInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative bg-card p-8 sm:p-10"
      >
        <p className="font-display text-lg font-semibold text-foreground/80 mb-1.5">
          {t(`${labelPrefix}.noise.label`)}
        </p>
        <p className="text-sm text-muted-foreground mb-8 max-w-xs">{t(`${labelPrefix}.noise.desc`)}</p>
        <SignalWaveform variant="noise" dim className="h-24" />
      </motion.div>

      <motion.div
        variants={fadeInRight}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-card p-8 sm:p-10 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{ background: 'var(--gradient-signal-radial)' }}
        />
        <div className="relative">
          <p className="font-display text-lg font-semibold text-foreground mb-1.5">
            {t(`${labelPrefix}.signal.label`)}
          </p>
          <p className="text-sm text-muted-foreground mb-8 max-w-xs">{t(`${labelPrefix}.signal.desc`)}</p>
          <SignalWaveform variant="clean" className="h-24" />
        </div>
      </motion.div>
    </div>
  );
};

export default NoiseSignalCompare;
