import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/543517311760';

const StickyMobileCTA = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  // Only show after scrolling past hero (~100vh)
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
          className="fixed bottom-0 left-0 right-0 p-3 bg-background/95 backdrop-blur border-t border-border md:hidden z-50"
        >
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            className="relative w-full overflow-hidden flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-sm text-white"
            style={{ backgroundColor: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.35)' }}
          >
            {/* Shimmer */}
            <motion.span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ translateX: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            />
            <MessageCircle size={18} className="relative z-10" />
            <span className="relative z-10">{t('hero.cta.secondary')}</span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyMobileCTA;