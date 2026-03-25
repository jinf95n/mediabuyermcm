import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, MessageCircle, ExternalLink } from 'lucide-react';

const easeCustom = [0.16, 1, 0.3, 1] as const;

const EMAIL          = 'mediabuyer@mcmdigital.com.ar';
const WHATSAPP_LINK  = 'https://wa.me/543517311760';
const CALENDAR_LINK  = 'https://api.leadconnectorhq.com/widget/booking/u7oCyCflFG3ajShYVJUw';

const Footer = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <footer className="relative bg-secondary text-secondary-foreground">

      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full leading-[0] pointer-events-none">
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-12">
          <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" fill="hsl(var(--secondary))" />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-14 pb-8 relative z-10" ref={ref}>
        <div className="max-w-4xl mx-auto">

          {/* ── Main grid ───────────────────────────────────────────── */}
          <div className="grid md:grid-cols-3 gap-10 mb-10">

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easeCustom }}
            >
              <h3
                className="text-xl font-bold mb-2"
                style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                MCM Digital
              </h3>
              <p className="text-xs text-secondary-foreground/50 mb-4 leading-relaxed">
                Meta Ads Management & Consulting
              </p>
              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-px w-12 bg-secondary-foreground/15 origin-left"
              />
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6, ease: easeCustom }}
            >
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-secondary-foreground/40 mb-5">
                {t('footer.contact')}
              </h4>
              <ul className="space-y-3">
                {[
                  { href: `mailto:${EMAIL}`,  icon: Mail,          label: EMAIL },
                  { href: WHATSAPP_LINK,       icon: MessageCircle, label: '+54 351 731-1760' },
                ].map(({ href, icon: Icon, label }) => (
                  <li key={label}>
                    <motion.a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center gap-2.5 text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-colors group"
                    >
                      <Icon size={14} className="shrink-0 group-hover:text-primary transition-colors" />
                      {label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick action */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6, ease: easeCustom }}
            >
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-secondary-foreground/40 mb-5">
                {t('footer.action.label') ?? 'Empezar'}
              </h4>
              <motion.a
                href={CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-lg border border-secondary-foreground/15 px-4 py-2.5 text-sm font-medium text-secondary-foreground/70 hover:border-primary/40 hover:text-primary transition-all"
              >
                <Mail size={13} />
                {t('hero.cta.primary')}
                <ExternalLink size={11} className="opacity-50" />
              </motion.a>
            </motion.div>
          </div>

          {/* ── Bottom bar ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="border-t border-secondary-foreground/10 pt-6 space-y-3"
          >
            <p className="text-xs text-secondary-foreground/35 text-center leading-relaxed max-w-xl mx-auto">
              {t('footer.disclaimer')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-secondary-foreground/35">
              <span>© {new Date().getFullYear()} MCM Digital · {t('footer.rights')}</span>
              <span className="flex items-center gap-1">
                {t('footer.by') ?? 'Desarrollado por'}
                <motion.a
                  href="https://landing24.mcmdigital.com.ar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ color: 'hsl(var(--secondary-foreground))' }}
                  className="underline underline-offset-2 decoration-dotted hover:text-secondary-foreground/70 transition-colors"
                >
                  Landing24
                </motion.a>
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

