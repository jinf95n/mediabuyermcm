import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Top bar
    'topbar.spots': 'Cupos limitados este mes',
    'topbar.response': 'Respuesta en menos de 24 horas hábiles',
    
    // Hero
    'hero.headline': 'Tu publicidad en Meta, con la atención que merece',
    'hero.subheadline': 'Gestionamos tus campañas de anuncios con foco, claridad y compromiso real. Sin promesas vacías. Con un plan semanal claro.',
    'hero.cta.primary': 'Agendar llamada',
    'hero.cta.secondary': 'Hablar por WhatsApp',
    'hero.microcopy': 'Respondemos en menos de 24 horas. Sin compromiso.',
    'hero.trust.1': 'Comunicación directa y clara cada semana',
    'hero.trust.2': 'Prioridades definidas, sin improvisación',
    'hero.trust.3': 'Compromiso real con tu negocio',
    
    // Problem
    'problem.title': 'Si esto te suena familiar...',
    'problem.subtitle': 'No estás solo. Muchos dueños de eCommerce pasan por lo mismo.',
    'problem.1': 'Sientes que tus anuncios no funcionan, pero no sabes exactamente por qué',
    'problem.2': 'Cada mes improvisas, sin un plan claro de qué probar o cambiar',
    'problem.3': 'Dependes de promociones para vender, y cuando no hay descuento, no hay ventas',
    'problem.4': 'Tu agencia o freelancer anterior desaparecía por días sin explicaciones',
    'problem.5': 'No entiendes los reportes que te mandan (o directamente no te mandan nada)',
    'problem.6': 'Sientes que estás quemando dinero sin saber si vale la pena',
    
    // Value proposition
    'value.title': 'Cómo trabajamos contigo',
    'value.subtitle': 'Sin jerga técnica. Con claridad y orden.',
    'value.what.title': 'Lo que hacemos',
    'value.what.1': 'Gestionamos y optimizamos tus campañas de anuncios en Meta cada semana',
    'value.what.2': 'Definimos prioridades claras para cada período',
    'value.what.3': 'Te explicamos qué funcionó, qué no, y qué vamos a probar',
    'value.what.4': 'Respondemos tus dudas rápidamente, sin dejarte esperando',
    'value.get.title': 'Lo que obtienes',
    'value.get.1': 'Claridad sobre tu inversión publicitaria',
    'value.get.2': 'Un plan semanal que puedes entender',
    'value.get.3': 'Decisiones basadas en datos, no en intuición',
    'value.get.4': 'Un equipo comprometido con tu crecimiento',
    
    // For you section
    'foryou.title': 'Esto es para ti si...',
    'foryou.yes.1': 'Tienes un eCommerce funcionando y quieres escalar con orden',
    'foryou.yes.2': 'Valoras la comunicación clara y directa',
    'foryou.yes.3': 'Buscas un socio comprometido, no un proveedor más',
    'foryou.yes.4': 'Estás dispuesto a trabajar en equipo para mejorar resultados',
    'foryou.nottitle': 'Esto NO es para ti si...',
    'foryou.no.1': 'Esperas resultados mágicos de la noche a la mañana',
    'foryou.no.2': 'No tienes producto definido o tu operación es inestable',
    'foryou.no.3': 'Buscas la opción más barata sin importar la calidad',
    'foryou.no.4': 'No tienes tiempo para revisar reportes o tener reuniones',
    
    // How we work
    'how.title': 'Cómo empezamos',
    'how.step1.title': 'Conversación inicial',
    'how.step1.desc': 'Hablamos de tu negocio, tus metas y si tiene sentido trabajar juntos.',
    'how.step2.title': 'Diagnóstico',
    'how.step2.desc': 'Revisamos tu situación actual y te damos una evaluación honesta.',
    'how.step3.title': 'Propuesta y acuerdo',
    'how.step3.desc': 'Te presentamos un plan claro con expectativas realistas.',
    'how.step4.title': 'Arrancamos',
    'how.step4.desc': 'Empezamos a trabajar con un plan semanal definido.',
    
    // Packages
    'packages.title': 'Planes y precios',
    'packages.subtitle': 'Elige el nivel de compromiso que necesitas',
    
    'packages.starter.title': 'Plan Inicial',
    'packages.starter.price': '$499',
    'packages.starter.period': '/mes',
    'packages.starter.for': 'Para eCommerce hasta USD 10,000/mes de facturación',
    'packages.starter.1': 'Gestión y optimización semanal',
    'packages.starter.2': 'Reunión 1:1 cada dos semanas',
    'packages.starter.3': 'Respuesta en 24 horas hábiles',
    'packages.starter.4': 'Videos explicativos de cambios realizados',
    'packages.starter.5': 'Análisis simple: qué funcionó, qué no, qué sigue',
    'packages.starter.commitment': 'Ideal para empezar a ordenar tu publicidad',
    
    'packages.growth.title': 'Plan Crecimiento',
    'packages.growth.price': '$899',
    'packages.growth.period': '/mes',
    'packages.growth.for': 'Para eCommerce USD 10,000 a 30,000/mes de facturación',
    'packages.growth.1': 'Gestión y optimización semanal',
    'packages.growth.2': 'Reunión 1:1 semanal',
    'packages.growth.3': 'Prioridades semanales claras',
    'packages.growth.4': 'Reportes simples y accionables',
    'packages.growth.5': 'Respuesta en 24 horas hábiles',
    'packages.growth.commitment': 'Cupos limitados por carga semanal de trabajo',
    'packages.growth.popular': 'Más popular',
    
    'packages.partner.title': 'Growth Partner',
    'packages.partner.price': 'Precio a medida',
    'packages.partner.period': '',
    'packages.partner.for': 'Fijo mensual + variable, personalizado',
    'packages.partner.1': 'Soporte prioritario y seguimiento continuo',
    'packages.partner.2': 'Automatizaciones de marketing y proceso comercial',
    'packages.partner.3': 'Diseños UGC orientados a conversión',
    'packages.partner.4': 'Trabajo conjunto en ofertas y calendario',
    'packages.partner.5': 'Compromiso alto y comunicación constante',
    'packages.partner.commitment': 'Muy pocos cupos disponibles',
    'packages.partner.cta': 'Solicitar diagnóstico',
    
    // Limited spots
    'limited.title': 'Sobre los cupos y el compromiso',
    'limited.text1': 'La diferencia de precios refleja las horas de trabajo, la prioridad de atención y los espacios en nuestra agenda.',
    'limited.text2': 'Trabajamos con pocos clientes para garantizar dedicación real.',
    'limited.honest': 'Nota honesta: Los resultados dependen de muchos factores más allá de la publicidad: tu producto, tu stock, tu oferta, tu operación. No podemos garantizar ventas específicas, pero sí podemos garantizar nuestro compromiso, claridad y trabajo profesional.',
    
    // FAQ
    'faq.title': 'Preguntas frecuentes',
    'faq.q1': '¿El gasto en anuncios está incluido?',
    'faq.a1': 'No. Nuestra tarifa cubre la gestión y optimización. El presupuesto de anuncios se paga directamente a Meta y lo defines tú.',
    'faq.q2': '¿Cuánto tiempo hasta ver resultados?',
    'faq.a2': 'Depende de tu situación actual. Normalmente empezamos a ver patrones claros en 4-6 semanas. Los primeros ajustes se hacen desde la semana uno.',
    'faq.q3': '¿Con qué frecuencia nos reunimos?',
    'faq.a3': 'Depende del plan. El plan inicial incluye reuniones cada dos semanas. El plan de crecimiento incluye reuniones semanales.',
    'faq.q4': '¿Puedo trabajar con ustedes si ya tengo un equipo o agencia?',
    'faq.a4': 'Sí, pero necesitamos coordinarnos bien. Podemos trabajar como consultores externos o tomar la gestión directa según lo que funcione mejor.',
    'faq.q5': '¿Qué necesitan de mi parte para empezar?',
    'faq.a5': 'Acceso a tu cuenta publicitaria, información básica de tu negocio, y disponibilidad para una conversación inicial.',
    'faq.q6': '¿Por qué hay cupos limitados?',
    'faq.a6': 'Porque preferimos hacer bien el trabajo con pocos clientes que hacer trabajo mediocre con muchos. Nuestro tiempo es limitado y tu inversión merece atención real.',
    'faq.q7': '¿Cómo empiezo?',
    'faq.a7': 'Escríbenos por WhatsApp o envíanos un email. Conversamos, vemos si podemos ayudarte, y si tiene sentido, te presentamos una propuesta.',
    
    // Final CTA
    'final.title': '¿Listos para ordenar tu publicidad?',
    'final.subtitle': 'Claridad, compromiso y un plan semanal claro. Sin promesas vacías.',
    'final.microcopy': 'Conversación sin compromiso. Respuesta en menos de 24 horas.',
    
    // Footer
    'footer.contact': 'Contacto',
    'footer.disclaimer': 'Los resultados pueden variar. No se garantizan ventas ni retornos específicos. Cada negocio es diferente y los resultados dependen de múltiples factores.',
    'footer.rights': 'Todos los derechos reservados.',
    
    // Language toggle
    'lang.switch': 'EN',
  },
  en: {
    // Top bar
    'topbar.spots': 'Limited spots this month',
    'topbar.response': 'Response within 24 business hours',
    
    // Hero
    'hero.headline': 'Your Meta ads, with the attention they deserve',
    'hero.subheadline': 'We manage your ad campaigns with focus, clarity, and real commitment. No empty promises. With a clear weekly plan.',
    'hero.cta.primary': 'Book a call',
    'hero.cta.secondary': 'Chat on WhatsApp',
    'hero.microcopy': 'We respond within 24 hours. No commitment.',
    'hero.trust.1': 'Direct and clear communication every week',
    'hero.trust.2': 'Defined priorities, no improvisation',
    'hero.trust.3': 'Real commitment to your business',
    
    // Problem
    'problem.title': 'If this sounds familiar...',
    'problem.subtitle': 'You are not alone. Many eCommerce owners go through the same.',
    'problem.1': 'You feel your ads are not working, but you do not know exactly why',
    'problem.2': 'Every month you improvise, without a clear plan of what to test or change',
    'problem.3': 'You depend on promotions to sell, and when there is no discount, there are no sales',
    'problem.4': 'Your previous agency or freelancer disappeared for days without explanations',
    'problem.5': 'You do not understand the reports they send you (or they just do not send anything)',
    'problem.6': 'You feel like you are burning money without knowing if it is worth it',
    
    // Value proposition
    'value.title': 'How we work with you',
    'value.subtitle': 'No technical jargon. With clarity and order.',
    'value.what.title': 'What we do',
    'value.what.1': 'We manage and optimize your Meta ad campaigns every week',
    'value.what.2': 'We define clear priorities for each period',
    'value.what.3': 'We explain what worked, what did not, and what we will test next',
    'value.what.4': 'We answer your questions quickly, without leaving you waiting',
    'value.get.title': 'What you get',
    'value.get.1': 'Clarity about your ad investment',
    'value.get.2': 'A weekly plan you can understand',
    'value.get.3': 'Data-driven decisions, not intuition',
    'value.get.4': 'A team committed to your growth',
    
    // For you section
    'foryou.title': 'This is for you if...',
    'foryou.yes.1': 'You have a running eCommerce and want to scale with order',
    'foryou.yes.2': 'You value clear and direct communication',
    'foryou.yes.3': 'You are looking for a committed partner, not just another vendor',
    'foryou.yes.4': 'You are willing to work as a team to improve results',
    'foryou.nottitle': 'This is NOT for you if...',
    'foryou.no.1': 'You expect magical overnight results',
    'foryou.no.2': 'You do not have a defined product or your operation is unstable',
    'foryou.no.3': 'You are looking for the cheapest option regardless of quality',
    'foryou.no.4': 'You do not have time to review reports or have meetings',
    
    // How we work
    'how.title': 'How we start',
    'how.step1.title': 'Initial conversation',
    'how.step1.desc': 'We talk about your business, your goals, and if it makes sense to work together.',
    'how.step2.title': 'Diagnosis',
    'how.step2.desc': 'We review your current situation and give you an honest assessment.',
    'how.step3.title': 'Proposal and agreement',
    'how.step3.desc': 'We present a clear plan with realistic expectations.',
    'how.step4.title': 'We start',
    'how.step4.desc': 'We begin working with a defined weekly plan.',
    
    // Packages
    'packages.title': 'Plans and pricing',
    'packages.subtitle': 'Choose the level of commitment you need',
    
    'packages.starter.title': 'Starter Plan',
    'packages.starter.price': '$499',
    'packages.starter.period': '/month',
    'packages.starter.for': 'For eCommerce up to USD 10,000/month revenue',
    'packages.starter.1': 'Weekly management and optimization',
    'packages.starter.2': '1:1 meeting every two weeks',
    'packages.starter.3': 'Response within 24 business hours',
    'packages.starter.4': 'Video updates explaining changes made',
    'packages.starter.5': 'Simple analysis: what worked, what did not, what is next',
    'packages.starter.commitment': 'Ideal to start organizing your advertising',
    
    'packages.growth.title': 'Growth Plan',
    'packages.growth.price': '$899',
    'packages.growth.period': '/month',
    'packages.growth.for': 'For eCommerce USD 10,000 to 30,000/month revenue',
    'packages.growth.1': 'Weekly management and optimization',
    'packages.growth.2': 'Weekly 1:1 meeting',
    'packages.growth.3': 'Clear weekly priorities',
    'packages.growth.4': 'Simple and actionable reports',
    'packages.growth.5': 'Response within 24 business hours',
    'packages.growth.commitment': 'Limited spots due to weekly workload',
    'packages.growth.popular': 'Most popular',
    
    'packages.partner.title': 'Growth Partner',
    'packages.partner.price': 'Custom pricing',
    'packages.partner.period': '',
    'packages.partner.for': 'Monthly fixed + variable, customized',
    'packages.partner.1': 'Priority support and continuous follow-up',
    'packages.partner.2': 'Marketing and commercial process automations',
    'packages.partner.3': 'Conversion-oriented UGC designs',
    'packages.partner.4': 'Joint work on offers and calendar',
    'packages.partner.5': 'High commitment and constant communication',
    'packages.partner.commitment': 'Very few spots available',
    'packages.partner.cta': 'Request a diagnosis',
    
    // Limited spots
    'limited.title': 'About spots and commitment',
    'limited.text1': 'Price differences reflect work hours, attention priority, and availability in our schedule.',
    'limited.text2': 'We work with few clients to guarantee real dedication.',
    'limited.honest': 'Honest note: Results depend on many factors beyond advertising: your product, your stock, your offer, your operation. We cannot guarantee specific sales, but we can guarantee our commitment, clarity, and professional work.',
    
    // FAQ
    'faq.title': 'Frequently asked questions',
    'faq.q1': 'Is ad spend included?',
    'faq.a1': 'No. Our fee covers management and optimization. The ad budget is paid directly to Meta and you define it.',
    'faq.q2': 'How long until I see results?',
    'faq.a2': 'It depends on your current situation. Normally we start seeing clear patterns in 4-6 weeks. First adjustments are made from week one.',
    'faq.q3': 'How often do we meet?',
    'faq.a3': 'It depends on the plan. The starter plan includes meetings every two weeks. The growth plan includes weekly meetings.',
    'faq.q4': 'Can I work with you if I already have a team or agency?',
    'faq.a4': 'Yes, but we need to coordinate well. We can work as external consultants or take direct management depending on what works best.',
    'faq.q5': 'What do you need from me to start?',
    'faq.a5': 'Access to your ad account, basic information about your business, and availability for an initial conversation.',
    'faq.q6': 'Why are spots limited?',
    'faq.a6': 'Because we prefer to do good work with few clients than mediocre work with many. Our time is limited and your investment deserves real attention.',
    'faq.q7': 'How do I start?',
    'faq.a7': 'Write us on WhatsApp or send us an email. We talk, we see if we can help you, and if it makes sense, we present a proposal.',
    
    // Final CTA
    'final.title': 'Ready to organize your advertising?',
    'final.subtitle': 'Clarity, commitment, and a clear weekly plan. No empty promises.',
    'final.microcopy': 'No-commitment conversation. Response within 24 hours.',
    
    // Footer
    'footer.contact': 'Contact',
    'footer.disclaimer': 'Results may vary. No specific sales or returns are guaranteed. Each business is different and results depend on multiple factors.',
    'footer.rights': 'All rights reserved.',
    
    // Language toggle
    'lang.switch': 'ES',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};