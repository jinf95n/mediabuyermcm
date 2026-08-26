import { useLanguage } from '@/contexts/LanguageContext';
import TopBar from '@/components/landing/TopBar';
import SegmentHero from '@/components/landing/SegmentHero';
import ProblemSection from '@/components/landing/ProblemSection';
import MechanismSteps from '@/components/landing/MechanismSteps';
import StartSteps from '@/components/landing/StartSteps';
import FAQSection from '@/components/landing/FAQSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import Footer from '@/components/landing/Footer';
import StickyMobileCTA from '@/components/landing/StickyMobileCTA';

const WHATSAPP_NUMBER = '543517311760';

const Agencias = () => {
  const { t } = useLanguage();
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('wa.agencias.msg'))}`;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopBar />
      <SegmentHero
        headline={t('agencias.hero.headline')}
        subheadline={t('agencias.hero.subheadline')}
        ctaLabel={t('agencias.hero.cta')}
        ctaHref={waHref}
      />
      <ProblemSection prefix="agencias.problem" count={3} />
      <MechanismSteps
        titleKey="agencias.mechanism.title"
        stepPrefix="agencias.mechanism"
        noteKey="agencias.mechanism.note"
        proofKey="agencias.proof.body"
        comparePrefix="agencias.compare"
      />
      <StartSteps prefix="agencias.start" />
      <FAQSection prefix="agencias.faq" count={4} />
      <FinalCTASection titleKey="agencias.final.title" ctaKey="agencias.final.cta" href={waHref} />
      <Footer />
      <StickyMobileCTA href={waHref} label={t('agencias.hero.cta')} />
    </div>
  );
};

export default Agencias;
