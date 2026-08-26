import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, MessageCircle } from 'lucide-react';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';

const EMAIL = 'mediabuyer@mcmdigital.com.ar';
const WHATSAPP_LINK = 'https://wa.me/543517311760';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 pt-14 pb-8">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-3 gap-10 mb-12"
        >
          <motion.div variants={fadeInUp}>
            <div className="flex items-center mb-3">
              <span className="font-display text-sm font-semibold text-foreground">Media Buyer</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-mono tracking-wider uppercase text-muted-foreground mb-4">
              {t('footer.explore')}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/agencias" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  {t('nav.agencias')}
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  {t('nav.partners')}
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-mono tracking-wider uppercase text-muted-foreground mb-4">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Mail size={14} className="shrink-0 text-muted-foreground" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  <MessageCircle size={14} className="shrink-0 text-muted-foreground" />
                  +54 351 731-1760
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="border-t border-border pt-6 space-y-3">
          <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-xl">
            {t('footer.disclaimer')}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted-foreground/70">
            <span>© {new Date().getFullYear()} MCM Digital · {t('footer.rights')}</span>
            <span className="flex items-center gap-1">
              {t('footer.by')}
              <a
                href="https://mcmdigital.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 decoration-dotted hover:text-foreground transition-colors"
              >
                MCM Digital
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
