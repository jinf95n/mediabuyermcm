import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Nav
    "nav.agencias": "CRM Signal",
    "nav.partners": "Partners",
    "nav.cta": "Hablar por WhatsApp",
    "lang.switch": "EN",

    // Home — hero
    "home.hero.headline": "Tu CRM ya sabe quién compra. Meta todavía no.",
    "home.hero.subheadline":
      "Conectamos tu CRM con Meta para que tu algoritmo aprenda de ventas reales, no de formularios. Construido y funcionando en producción — no es una promesa.",

    // Home — fork
    "home.fork.lead": "Dos formas de trabajar con nosotros, según tu situación.",
    "home.fork.a.title": "Ya corrés Meta Ads",
    "home.fork.a.desc":
      "Te falta la señal, no el criterio. Conectamos tu CRM con Meta y tu algoritmo empieza a aprender de negocios cerrados, no de leads fríos. Vos seguís al mando de las campañas.",
    "home.fork.a.cta": "Ver CRM Signal",
    "home.fork.b.title": "No corrés ads, pero tus clientes los piden",
    "home.fork.b.desc":
      "Ejecutamos Meta Ads y CRM Signal bajo tu marca. Vos mantenés la relación con el cliente; nosotros, la ejecución técnica completa.",
    "home.fork.b.cta": "Ver el partner program",

    // Home — mechanism (noise vs. signal)
    "home.mechanism.title": "Así se ve la diferencia",
    "home.mechanism.body":
      "Meta optimiza con lo que le mandás. La mayoría le manda ruido: clics, formularios, visitas. Nosotros le mandamos señal: ventas reales, confirmadas, con contexto.",
    "home.mechanism.noise.label": "Sin CRM Signal",
    "home.mechanism.noise.desc": "Ruido: clics y formularios sin contexto.",
    "home.mechanism.signal.label": "Con CRM Signal",
    "home.mechanism.signal.desc": "Señal: ventas reales y confirmadas.",

    // Shared — problem/mechanism/proof section labels
    "section.problem": "El problema",
    "section.mechanism": "Cómo funciona",
    "section.proof": "La prueba",
    "section.start": "Cómo arrancamos",
    "section.faq": "Preguntas frecuentes",

    // Agencias — hero
    "agencias.hero.headline": "Corrés Meta Ads. Tu algoritmo está optimizando a ciegas.",
    "agencias.hero.subheadline":
      "La mayoría de las agencias le manda a Meta clics y formularios. Nosotros conectamos tu CRM directo con Meta, así el algoritmo aprende de negocios reales: cotizaciones, ventas, pipeline cerrado.",
    "agencias.hero.cta": "Agendá una demo técnica",

    // Agencias — problem
    "agencias.problem.1":
      "Meta optimiza sobre lo que le mandás. Si solo le mandás \"Lead\", trae más gente que llena formularios — no más gente que compra.",
    "agencias.problem.2":
      "iOS y el bloqueo de cookies rompieron gran parte del tracking basado en píxel. Una porción de tu pipeline ya es invisible para Meta.",
    "agencias.problem.3":
      "Armar la integración server-side a mano lleva semanas de trabajo técnico que la mayoría de las agencias no tiene tiempo de hacer.",

    // Agencias — mechanism
    "agencias.mechanism.title": "Cómo funciona CRM Signal",
    "agencias.mechanism.step1.title": "Conectamos tu CRM",
    "agencias.mechanism.step1.desc": "HubSpot o GoHighLevel, sobre tu cuenta.",
    "agencias.mechanism.step2.title": "Verificamos cada venta",
    "agencias.mechanism.step2.desc": "Cada evento del pipeline se confirma y se enriquece con contexto real.",
    "agencias.mechanism.step3.title": "Meta recibe la señal",
    "agencias.mechanism.step3.desc": "En tiempo real, con el valor real de cada etapa del pipeline.",
    "agencias.mechanism.step4.title": "Vos seguís al mando",
    "agencias.mechanism.step4.desc": "De la estrategia, las audiencias y las campañas.",
    "agencias.mechanism.note":
      "Nosotros construimos y mantenemos la infraestructura de datos. Vos seguís corriendo las campañas.",

    // Agencias — compare (sin/con), para un media buyer que entiende de tracking
    "agencias.compare.noise.label": "Sin CRM Signal",
    "agencias.compare.noise.desc": "Meta ve clics y formularios sin contexto. Aprende a traer gente que llena formularios.",
    "agencias.compare.signal.label": "Con CRM Signal",
    "agencias.compare.signal.desc": "Meta ve ventas reales verificadas, enviadas server-side. Aprende a traer gente que compra.",

    // Agencias — proof
    "agencias.proof.body":
      "No es una idea ni un prototipo. CRM Signal está construido y corriendo en producción sobre nuestra propia cuenta (Valy Agency), con eventos de pipeline llegando y confirmándose en Meta Events Manager.",

    // Agencias — start
    "agencias.start.1": "Nos das acceso a tu cuenta de Meta Business",
    "agencias.start.2": "Conectás tu CRM: HubSpot o GoHighLevel, o lo dejás listo para conectar",
    "agencias.start.3": "Tenemos una conversación técnica de 30 minutos",

    // Agencias — FAQ
    "agencias.faq.q1": "¿Esto reemplaza a mi media buyer?",
    "agencias.faq.a1":
      "No. Vos seguís definiendo estrategia, audiencias y creatividades. Nosotros construimos el puente de datos entre tu CRM y Meta.",
    "agencias.faq.q2": "¿Qué pasa con mis datos?",
    "agencias.faq.a2":
      "Los eventos viajan de tu CRM a Meta a través de un pipeline que nosotros operamos y monitoreamos. No accedemos a tu cuenta publicitaria salvo que lo necesites para la integración.",
    "agencias.faq.q3": "¿Cuánto tarda la implementación?",
    "agencias.faq.a3":
      "Depende de tu stack de CRM y de cuántos eventos querés mapear. Lo vemos en la demo técnica.",
    "agencias.faq.q4": "¿Necesito saber de tecnología para usar esto?",
    "agencias.faq.a4":
      "No. Nosotros construimos y mantenemos la integración. Vos solo ves los resultados en tus campañas.",

    "agencias.final.title": "¿Hablamos de tu stack?",
    "agencias.final.cta": "Agendá una demo técnica",

    // Partners — hero
    "partners.hero.headline": "Tus clientes piden Meta Ads. Vos no tenés por qué ejecutarlos.",
    "partners.hero.subheadline":
      "Ejecutamos las campañas de Meta Ads bajo tu marca, con CRM Signal incluido desde el día uno. Vos mantenés la relación con el cliente y sumás un servicio más a tu oferta, sin armar un equipo interno.",
    "partners.hero.cta": "Aplicá como partner",

    // Partners — problem
    "partners.problem.1":
      "Un cliente te pide Meta Ads y le decís que no — perdés el proyecto completo, no solo la pauta.",
    "partners.problem.2":
      "Subcontratás a un freelancer sin proceso, y el riesgo y la reputación quedan de tu lado.",
    "partners.problem.3":
      "Armar un equipo interno de paid media para un servicio ocasional no cierra por costo.",

    // Partners — mechanism
    "partners.mechanism.title": "Cómo funciona el fulfillment bajo tu marca",
    "partners.mechanism.step1.title": "Vos sos la cara ante el cliente",
    "partners.mechanism.step1.desc": "Todo el trabajo sale bajo tu marca.",
    "partners.mechanism.step2.title": "Ejecutamos Meta Ads",
    "partners.mechanism.step2.desc": "La campaña completa, de punta a punta.",
    "partners.mechanism.step3.title": "Sumamos CRM Signal",
    "partners.mechanism.step3.desc": "Para que optimice sobre pipeline real desde el día uno.",
    "partners.mechanism.step4.title": "Vos recibís los reportes",
    "partners.mechanism.step4.desc": "Listos para reenviar o adaptar a tu cliente.",
    "partners.mechanism.note":
      "Vos sos la cara ante el cliente. Nosotros ejecutamos todo puertas adentro.",

    // Partners — proof / why it works
    "partners.proof.title": "Por qué funciona",
    "partners.proof.body":
      "El motor técnico (CRM Signal) ya está construido y corriendo en producción — no es un pitch, es infraestructura real. Sumás paid media a tu oferta sin contratar a nadie, y con una señal de datos que la mayoría de las agencias no tiene.",

    // Partners — start
    "partners.start.1": "Aplicás y conversamos sobre tu volumen y tipo de clientes",
    "partners.start.2": "Arrancamos con tu primer cliente piloto",

    // Partners — FAQ
    "partners.faq.q1": "¿Necesito saber de Meta Ads?",
    "partners.faq.a1": "No. Nosotros ejecutamos la campaña completa. Vos manejás la relación con el cliente.",
    "partners.faq.q2": "¿Mi cliente sabe que ustedes ejecutan?",
    "partners.faq.a2": "No. Trabajamos bajo tu marca. El cliente es tuyo, la relación es tuya.",
    "partners.faq.q3": "¿Cómo funciona el modelo comercial?",
    "partners.faq.a3": "Lo vemos según tu volumen y tipo de clientes cuando apliques.",
    "partners.faq.q4": "¿Por qué \"aplicar\" y no simplemente contratar?",
    "partners.faq.a4":
      "Trabajamos con un número limitado de agencias partner para mantener la calidad. Por eso conversamos antes de arrancar.",

    "partners.final.title": "¿Sumamos paid media a tu oferta?",
    "partners.final.cta": "Aplicá como partner",

    // Footer
    "footer.tagline": "Meta Ads con datos reales — lo corrés vos, o lo corremos nosotros bajo tu marca.",
    "footer.contact": "Contacto",
    "footer.explore": "Explorar",
    "footer.disclaimer":
      "Los resultados de las campañas dependen de múltiples factores fuera de nuestro control. No garantizamos ventas ni retornos específicos.",
    "footer.rights": "Todos los derechos reservados.",
    "footer.by": "Desarrollado por",

    // WhatsApp prefilled messages
    "wa.agencias.msg": "Hola! Vi CRM Signal en el sitio y quiero agendar una demo técnica para mi agencia.",
    "wa.partners.msg": "Hola! Quiero aplicar al partner program de MCM Digital.",
  },
  en: {
    // Nav
    "nav.agencias": "CRM Signal",
    "nav.partners": "Partners",
    "nav.cta": "Chat on WhatsApp",
    "lang.switch": "ES",

    // Home — hero
    "home.hero.headline": "Your CRM already knows who buys. Meta still doesn't.",
    "home.hero.subheadline":
      "We connect your CRM to Meta so your algorithm learns from real sales, not forms. Built and running in production — not a pitch.",

    // Home — fork
    "home.fork.lead": "Two ways to work with us, depending on your situation.",
    "home.fork.a.title": "You already run Meta Ads",
    "home.fork.a.desc":
      "You're missing the signal, not the judgment. We connect your CRM with Meta so your algorithm starts learning from closed deals, not cold leads. You stay in control of campaigns.",
    "home.fork.a.cta": "See CRM Signal",
    "home.fork.b.title": "You don't run ads, but your clients ask for them",
    "home.fork.b.desc":
      "We run Meta Ads and CRM Signal under your brand. You keep the client relationship; we handle the full technical execution.",
    "home.fork.b.cta": "See the partner program",

    // Home — mechanism (noise vs. signal)
    "home.mechanism.title": "This is what the difference looks like",
    "home.mechanism.body":
      "Meta optimizes on what you send it. Most send noise: clicks, forms, visits. We send signal: real, confirmed sales, with context.",
    "home.mechanism.noise.label": "Without CRM Signal",
    "home.mechanism.noise.desc": "Noise: clicks and forms with no context.",
    "home.mechanism.signal.label": "With CRM Signal",
    "home.mechanism.signal.desc": "Signal: real, confirmed sales.",

    // Shared
    "section.problem": "The problem",
    "section.mechanism": "How it works",
    "section.proof": "The proof",
    "section.start": "How we start",
    "section.faq": "Frequently asked questions",

    // Agencias — hero
    "agencias.hero.headline": "You run Meta Ads. Your algorithm is optimizing blind.",
    "agencias.hero.subheadline":
      "Most agencies feed Meta clicks and forms. We connect your CRM directly with Meta, so the algorithm learns from real business outcomes: quotes, sales, closed pipeline.",
    "agencias.hero.cta": "Book a technical demo",

    // Agencias — problem
    "agencias.problem.1":
      "Meta optimizes on what you send it. If all you send is \"Lead,\" it brings you more people who fill out forms — not more people who buy.",
    "agencias.problem.2":
      "iOS and cookie blocking broke most pixel-based tracking. A chunk of your pipeline is already invisible to Meta.",
    "agencias.problem.3":
      "Building that server-side integration by hand takes weeks of technical work most agencies don't have time for.",

    // Agencias — mechanism
    "agencias.mechanism.title": "How CRM Signal works",
    "agencias.mechanism.step1.title": "We connect your CRM",
    "agencias.mechanism.step1.desc": "HubSpot or GoHighLevel, on your own account.",
    "agencias.mechanism.step2.title": "We verify every sale",
    "agencias.mechanism.step2.desc": "Each pipeline event is confirmed and enriched with real context.",
    "agencias.mechanism.step3.title": "Meta receives the signal",
    "agencias.mechanism.step3.desc": "In real time, with the real value of each pipeline stage.",
    "agencias.mechanism.step4.title": "You stay in control",
    "agencias.mechanism.step4.desc": "Of strategy, audiences, and campaigns.",
    "agencias.mechanism.note":
      "We build and maintain the data infrastructure. You keep running the campaigns.",

    // Agencias — compare (without/with), for a media buyer who understands tracking
    "agencias.compare.noise.label": "Without CRM Signal",
    "agencias.compare.noise.desc": "Meta sees clicks and forms with no context. It learns to bring people who fill out forms.",
    "agencias.compare.signal.label": "With CRM Signal",
    "agencias.compare.signal.desc": "Meta sees real, verified sales, sent server-side. It learns to bring people who buy.",

    // Agencias — proof
    "agencias.proof.body":
      "This isn't an idea or a prototype. CRM Signal is built and running in production on our own account (Valy Agency), with pipeline events arriving and confirming in Meta Events Manager.",

    // Agencias — start
    "agencias.start.1": "You give us access to your Meta Business account",
    "agencias.start.2": "You connect your CRM — HubSpot or GoHighLevel — or leave it ready to connect",
    "agencias.start.3": "We have a 30-minute technical conversation",

    // Agencias — FAQ
    "agencias.faq.q1": "Does this replace my media buyer?",
    "agencias.faq.a1":
      "No. You keep defining strategy, audiences, and creative. We build the data bridge between your CRM and Meta.",
    "agencias.faq.q2": "What happens to my data?",
    "agencias.faq.a2":
      "Events travel from your CRM to Meta through a pipeline we operate and monitor. We don't access your ad account unless you need us to for the integration.",
    "agencias.faq.q3": "How long does implementation take?",
    "agencias.faq.a3":
      "Depends on your CRM stack and how many events you want mapped. We'll scope it in the technical demo.",
    "agencias.faq.q4": "Do I need to know anything technical to use this?",
    "agencias.faq.a4":
      "No. We build and maintain the integration. You just see the results in your campaigns.",

    "agencias.final.title": "Let's talk about your stack",
    "agencias.final.cta": "Book a technical demo",

    // Partners — hero
    "partners.hero.headline": "Your clients ask for Meta Ads. You don't have to run them.",
    "partners.hero.subheadline":
      "We run the Meta Ads campaigns under your brand, with CRM Signal included from day one. You keep the client relationship and add a service to your offer, without building an in-house team.",
    "partners.hero.cta": "Apply as a partner",

    // Partners — problem
    "partners.problem.1":
      "A client asks you for Meta Ads and you say no — you lose the whole project, not just the ad spend.",
    "partners.problem.2":
      "You subcontract a freelancer with no process, and the risk and the reputation land on you.",
    "partners.problem.3":
      "Building an in-house paid media team for an occasional service doesn't pencil out.",

    // Partners — mechanism
    "partners.mechanism.title": "How white-label fulfillment works",
    "partners.mechanism.step1.title": "You're the face to the client",
    "partners.mechanism.step1.desc": "Everything ships under your brand.",
    "partners.mechanism.step2.title": "We run Meta Ads",
    "partners.mechanism.step2.desc": "The full campaign, end to end.",
    "partners.mechanism.step3.title": "We add CRM Signal",
    "partners.mechanism.step3.desc": "So it optimizes on real pipeline from day one.",
    "partners.mechanism.step4.title": "You get the reports",
    "partners.mechanism.step4.desc": "Ready to forward or adapt for your client.",
    "partners.mechanism.note":
      "You're the face to the client. We execute everything behind the scenes.",

    // Partners — proof / why it works
    "partners.proof.title": "Why it works",
    "partners.proof.body":
      "The technical engine (CRM Signal) is already built and running in production — not a pitch, real infrastructure. You add paid media to your offer without hiring anyone, with a data signal most agencies don't have.",

    // Partners — start
    "partners.start.1": "You apply and we talk about your volume and client type",
    "partners.start.2": "We start with your first pilot client",

    // Partners — FAQ
    "partners.faq.q1": "Do I need to know Meta Ads?",
    "partners.faq.a1": "No. We run the full campaign. You manage the relationship with your client.",
    "partners.faq.q2": "Does my client know you're running it?",
    "partners.faq.a2": "No. We work under your brand. The client is yours, the relationship is yours.",
    "partners.faq.q3": "How does the commercial model work?",
    "partners.faq.a3": "We'll scope it based on your volume and client type once you apply.",
    "partners.faq.q4": "Why \"apply\" instead of just signing up?",
    "partners.faq.a4":
      "We work with a limited number of partner agencies to keep quality high. That's why we talk before starting.",

    "partners.final.title": "Let's add paid media to your offer",
    "partners.final.cta": "Apply as a partner",

    // Footer
    "footer.tagline": "Meta Ads powered by real data — run it yourself, or let us run it under your brand.",
    "footer.contact": "Contact",
    "footer.explore": "Explore",
    "footer.disclaimer":
      "Campaign results depend on multiple factors outside our control. We don't guarantee sales or specific returns.",
    "footer.rights": "All rights reserved.",
    "footer.by": "Built by",

    // WhatsApp prefilled messages
    "wa.agencias.msg": "Hi! I saw CRM Signal on the site and I'd like to book a technical demo for my agency.",
    "wa.partners.msg": "Hi! I'd like to apply to MCM Digital's partner program.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string): string => {
    return translations[language][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
