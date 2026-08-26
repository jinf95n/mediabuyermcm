import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { ctaTap } from '@/lib/motion';

interface StickyMobileCTAProps {
  href: string;
  label: string;
}

const StickyMobileCTA = ({ href, label }: StickyMobileCTAProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 p-3 bg-background/95 backdrop-blur border-t border-border md:hidden z-40"
        >
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={ctaTap}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-sm text-primary-foreground"
            style={{ background: 'var(--gradient-signal)', boxShadow: 'var(--glow-signal-tight)' }}
          >
            <MessageCircle size={18} />
            {label}
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyMobileCTA;
