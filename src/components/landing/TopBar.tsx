import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ctaHover, ctaTap } from '@/lib/motion';

const WHATSAPP_LINK = 'https://wa.me/543517311760';

const TopBar = () => {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/agencias', label: t('nav.agencias') },
    { to: '/partners', label: t('nav.partners') },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
          <span className="font-display text-sm font-semibold tracking-tight text-foreground">Media Buyer</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'text-foreground bg-secondary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Switch language"
          >
            {t('lang.switch')}
          </button>
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={ctaHover}
            whileTap={ctaTap}
            className="hidden sm:inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-bold text-primary-foreground"
            style={{ background: 'var(--gradient-signal)', boxShadow: 'var(--glow-signal-tight)' }}
          >
            {t('nav.cta')}
          </motion.a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-border/60"
          >
            <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 py-3 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="text-left px-3 py-2.5 rounded-lg text-sm font-mono text-muted-foreground hover:bg-secondary transition-colors"
              >
                {language === 'es' ? 'English' : 'Español'}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default TopBar;
