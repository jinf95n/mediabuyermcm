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

const Partners = () => {
  const { t } = useLanguage();
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('wa.partners.msg'))}`;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopBar />
      <SegmentHero
        headline={t('partners.hero.headline')}
        subheadline={t('partners.hero.subheadline')}
        ctaLabel={t('partners.hero.cta')}
        ctaHref={waHref}
      />
      <ProblemSection prefix="partners.problem" count={3} />
      <MechanismSteps
        titleKey="partners.mechanism.title"
        stepPrefix="partners.mechanism"
        noteKey="partners.mechanism.note"
        proofKey="partners.proof.body"
        proofTitleKey="partners.proof.title"
        showProofPanel={false}
      />
      <StartSteps prefix="partners.start" count={2} />
      <FAQSection prefix="partners.faq" count={4} />
      <FinalCTASection titleKey="partners.final.title" ctaKey="partners.final.cta" href={waHref} />
      <Footer />
      <StickyMobileCTA href={waHref} label={t('partners.hero.cta')} />
    </div>
  );
};

export default Partners;
