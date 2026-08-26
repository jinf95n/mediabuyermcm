import { motion } from 'framer-motion';
import NoiseSignalCompare from '@/components/signal/NoiseSignalCompare';
import { fadeInUp, viewportOnce } from '@/lib/motion';

interface ProofPanelProps {
  className?: string;
  labelPrefix?: string;
}

const ProofPanel = ({ className = '', labelPrefix }: ProofPanelProps) => {
  return (
    <div className={className}>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative rounded-2xl border border-border overflow-hidden"
        style={{ boxShadow: 'var(--shadow-lg)' }}
      >
        <div
          className="absolute -inset-x-20 -top-40 h-80 opacity-30 pointer-events-none"
          style={{ background: 'var(--gradient-signal-radial)' }}
        />
        <NoiseSignalCompare className="relative" labelPrefix={labelPrefix} />
      </motion.div>
    </div>
  );
};

export default ProofPanel;
