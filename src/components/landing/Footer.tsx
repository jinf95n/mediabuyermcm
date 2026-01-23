import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
  const { t, language } = useLanguage();
  
  const placeholders = {
    name: language === 'es' ? '[TU NOMBRE]' : '[YOUR NAME]',
    email: language === 'es' ? '[TU EMAIL]' : '[YOUR EMAIL]',
    whatsapp: language === 'es' ? '[TU WHATSAPP]' : '[YOUR WHATSAPP]',
    calendly: language === 'es' ? '[TU CALENDLY]' : '[YOUR CALENDLY]',
  };
  
  return (
    <footer className="py-12 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{placeholders.name}</h3>
              <p className="text-sm text-secondary-foreground/80 mb-4">
                Meta Ads Management & Consulting
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{placeholders.email}</span>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{placeholders.whatsapp}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{placeholders.calendly}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-foreground/20 pt-8">
            <p className="text-xs text-secondary-foreground/60 text-center mb-4">
              {t('footer.disclaimer')}
            </p>
            <p className="text-xs text-secondary-foreground/60 text-center">
              © {new Date().getFullYear()} {placeholders.name}. {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
