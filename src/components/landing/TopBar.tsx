import { useLanguage } from '@/contexts/LanguageContext';
import { Clock } from 'lucide-react';

const TopBar = () => {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div className="bg-secondary text-secondary-foreground py-2 px-4">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <span className="font-semibold" style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            MCM Digital
          </span>
          <span className="font-medium">{t('topbar.spots')}</span>
          <span className="hidden sm:flex items-center gap-1.5 text-secondary-foreground/80">
            <Clock className="h-3.5 w-3.5" />
            {t('topbar.response')}
          </span>
        </div>
        <button
          onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
          className="px-3 py-1 rounded-md bg-secondary-foreground/10 hover:bg-secondary-foreground/20 transition-colors font-medium"
        >
          {t('lang.switch')}
        </button>
      </div>
    </div>
  );
};

export default TopBar;