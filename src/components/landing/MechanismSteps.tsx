import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import ProofPanel from '@/components/signal/ProofPanel';
import { cardHover, fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';

interface MechanismStepsProps {
  titleKey: string;
  stepPrefix: string;
  noteKey: string;
  proofKey: string;
  proofTitleKey?: string;
  comparePrefix?: string;
  showProofPanel?: boolean;
}

const MechanismSteps = ({
  titleKey,
  stepPrefix,
  noteKey,
  proofKey,
  proofTitleKey = 'section.proof',
  comparePrefix,
  showProofPanel = true,
}: MechanismStepsProps) => {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative py-14 sm:py-20 border-t border-border overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] translate-x-1/3 -translate-y-1/3 rounded-full opacity-[0.07] pointer-events-none"
          style={{ background: 'var(--gradient-signal)', filter: 'blur(90px)' }}
        />

        <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 relative">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-10 max-w-xl tracking-tight leading-[1.05]"
          >
            {t(titleKey)}
          </motion.h2>

          <motion.ol
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[1, 2, 3, 4].map((n) => (
              <motion.li
                key={n}
                variants={fadeInUp}
                whileHover={cardHover}
                className="rounded-2xl border border-border bg-card p-6 h-full"
              >
                <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background font-mono text-xs font-medium text-foreground">
                  {n}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {t(`${stepPrefix}.step${n}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`${stepPrefix}.step${n}.desc`)}</p>
              </motion.li>
            ))}
          </motion.ol>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-10 max-w-xl text-base text-foreground/80 leading-relaxed border-l-2 pl-5"
            style={{ borderImage: 'var(--gradient-signal) 1' }}
          >
            {t(noteKey)}
          </motion.p>
        </div>
      </section>

      <section className="relative py-14 sm:py-20 border-t border-border">
        <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6 max-w-xl tracking-tight leading-[1.05]"
          >
            {t(proofTitleKey)}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={`text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl ${
              showProofPanel ? 'mb-10 sm:mb-12' : ''
            }`}
          >
            {t(proofKey)}
          </motion.p>

          {showProofPanel && <ProofPanel labelPrefix={comparePrefix} />}
        </div>
      </section>
    </>
  );
};

export default MechanismSteps;
