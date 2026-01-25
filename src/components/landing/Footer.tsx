import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  
  const WHATSAPP_NUMBER = '541173858548';
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
  const EMAIL = 'mediabuyer@mcmdigital.com.ar';
  
  return (
    <footer className="py-12 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MCM Digital</h3>
              <p className="text-sm text-secondary-foreground/80 mb-4">
                Meta Ads Management & Consulting
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a 
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{EMAIL}</span>
                  </a>
                </li>
                <li>
                  <a 
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>+54 11 7385-8548</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-foreground/20 pt-8">
            <p className="text-xs text-secondary-foreground/60 text-center mb-4">
              {t('footer.disclaimer')}
            </p>
            <p className="text-xs text-secondary-foreground/60 text-center">
              © {new Date().getFullYear()} MCM Digital. {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;