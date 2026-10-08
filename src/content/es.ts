import type { Dictionary } from "./en"

// Spanish copy. Mirrors en.ts; keep facts identical between languages.

const es: Dictionary = {
  meta: {
    siteName: "Alex Sosa",
    home: {
      title: "Alex Sosa — Consultoría tecnológica, automatización y productos digitales",
      description:
        "Consultor tecnológico independiente que ayuda a las empresas a automatizar procesos, construir productos digitales y tomar buenas decisiones de tecnología, con un uso práctico y responsable de la IA.",
    },
    services: {
      title: "Servicios",
      description:
        "Automatización de procesos, desarrollo de productos digitales y consultoría y liderazgo tecnológico para empresas que necesitan resolver problemas reales con tecnología.",
    },
    work: {
      title: "Trabajo",
      description:
        "Trabajo seleccionado de Alex Sosa: plataformas SaaS, juegos móviles publicados, plataformas de negocio, un estudio de productos digitales y liderazgo de entrega para una fintech de Estados Unidos.",
    },
    about: {
      title: "Sobre mí",
      description:
        "Alex Sosa es consultor tecnológico, fundador y creador de productos, con más de 23 años convirtiendo necesidades de negocio en software que funciona.",
    },
    contact: {
      title: "Contacto",
      description:
        "Escríbele a Alex Sosa sobre un proyecto de consultoría, una iniciativa de automatización o un producto digital que quieras construir.",
    },
    ogAlt: "Logo de Alex Sosa: una A geométrica turquesa sobre fondo negro",
  },

  nav: {
    home: "Inicio",
    services: "Servicios",
    work: "Trabajo",
    about: "Sobre mí",
    contact: "Contacto",
    cta: "Hablemos",
    primary: "Principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
    skip: "Ir al contenido",
    homeLabel: "Alex Sosa, inicio",
  },

  common: {
    letsTalk: "Hablemos",
    downloadCv: "Descargar hoja de vida (PDF)",
    linkedin: "LinkedIn",
    linkedinProfile: "Perfil de LinkedIn",
    github: "GitHub",
    email: "Correo",
    opensInNewTab: "se abre en una pestaña nueva",
  },

  home: {
    eyebrow: "Consultor tecnológico independiente",
    title: "Ayudo a las empresas a convertir retos complejos en",
    titleEmphasis: "tecnología que funciona.",
    lead: "Desde la automatización de procesos hasta los productos digitales, combino liderazgo técnico, comprensión del negocio y desarrollo potenciado con IA para entregar soluciones prácticas.",
    ctaPrimary: "Hablemos",
    ctaSecondary: "Ver mi trabajo",
    location: "Desde Colombia · Trabajando con clientes de Latinoamérica y Estados Unidos",

    credibilityLabel: "Trayectoria",
    facts: [
      { value: "23+", label: "años construyendo software y productos digitales" },
      { value: "100+", label: "proyectos entregados por Appsolution, el estudio que fundé en 2013" },
      { value: "80", label: "profesionales en el equipo multidisciplinario más grande que he liderado" },
      { value: "7+", label: "productos e iniciativas estratégicas entregadas para una fintech de EE. UU." },
    ],
    credentials: [
      "AI Product Management, Duke University (2025)",
      "Maestría en Diseño Web y Desarrollo Multidispositivo (UI/UX)",
      "Ganador, Samsung LATAM Smart TV Challenge",
    ],

    servicesEyebrow: "Servicios",
    servicesTitle: "Tres formas en que ayudo a las empresas a avanzar.",
    servicesIntro:
      "Cada proyecto empieza por el problema de negocio, no por la tecnología. Te ayudo a decidir qué vale la pena construir, y luego lo construyo.",
    servicesLink: "Ver todos los servicios",
    outcomeLabel: "Resultado",

    workEyebrow: "Trabajo seleccionado",
    workTitle: "Productos y plataformas que he construido y liderado.",
    workIntro: "Productos que he diseñado, construido y lanzado, desde plataformas SaaS hasta juegos móviles publicados en Google Play y App Store.",
    workLink: "Ver todo el trabajo",

    aboutEyebrow: "Sobre mí",
    aboutTitle: "Ingeniero, fundador y líder de tecnología.",
    aboutBody: [
      "Empecé como desarrollador de software hace más de dos décadas. En 2013 fundé Appsolution, un estudio de productos digitales que entregó más de 100 proyectos para clientes de Latinoamérica y Estados Unidos. Desde 2019 lidero la entrega de producto y tecnología para una fintech estadounidense, llevando iniciativas desde su definición hasta producción.",
      "Hoy trabajo como consultor independiente. Combino esa experiencia con una forma de trabajo asistida por IA que lleva las ideas a software funcionando más rápido, sin sacrificar calidad, seguridad ni criterio.",
    ],
    aboutLink: "Más sobre mí",
  },

  services: {
    eyebrow: "Servicios",
    title: "Tecnología práctica para problemas reales de negocio.",
    lead: "Trabajo con fundadores, empresarios y equipos directivos que necesitan tecnología para resolver un problema concreto, y a alguien con la experiencia para asumirlo desde la estrategia hasta la entrega.",
    problemsTitle: "Problemas que resuelvo",
    deliverTitle: "Qué hago",
    outcomesTitle: "Qué puedes esperar",
    items: [
      {
        id: "automation",
        title: "Automatización de procesos",
        summary:
          "Reemplaza el trabajo manual repetitivo, las hojas de cálculo dispersas y los traspasos frágiles con flujos de trabajo confiables, herramientas internas e integraciones, usando IA donde realmente aporta.",
        outcome: "Menos esfuerzo manual, menos errores y más tiempo para el trabajo que importa.",
        problems: [
          "Equipos copiando información a mano entre hojas de cálculo, correo y sistemas",
          "Procesos que solo funcionan porque una persona sabe cómo hacerlos",
          "Herramientas que no se comunican entre sí",
          "Informes que tardan días en lugar de minutos",
        ],
        deliver: [
          "Mapear el proceso actual e identificar qué vale la pena automatizar",
          "Diseñar y construir automatizaciones e integraciones entre tus herramientas",
          "Crear herramientas internas y tableros adaptados a cómo trabaja tu equipo",
          "Incorporar pasos asistidos por IA, como clasificar, redactar o resumir, donde aporten valor y puedan revisarse",
        ],
        outcomes: [
          "Menos trabajo manual repetitivo",
          "Menos errores y traspasos perdidos",
          "Procesos documentados y más fáciles de escalar",
          "Visibilidad clara de cómo fluye el trabajo",
        ],
      },
      {
        id: "products",
        title: "Desarrollo de productos digitales",
        summary:
          "Lleva una idea SaaS, una aplicación de negocio o un MVP del concepto a producción en web y móvil, con visión de producto, UX e ingeniería en un mismo lugar.",
        outcome: "Un producto funcionando en manos de usuarios reales, no una presentación ni un prototipo estancado.",
        problems: [
          "Una idea que necesita convertirse en un producto real, no solo en un prototipo",
          "Un MVP que debe llegar rápido a los usuarios sin convertirse en código desechable",
          "Un proceso de negocio que funcionaría mejor como una aplicación propia",
          "Un producto que se quedó estancado entre el diseño y la producción",
        ],
        deliver: [
          "Descubrimiento y definición de producto: usuarios, alcance y prioridades",
          "Diseño de UX e interfaces para web y móvil",
          "Desarrollo completo, desde la arquitectura hasta el despliegue",
          "Acompañamiento en el lanzamiento, iteración y operación en producción",
        ],
        outcomes: [
          "Un alcance claro y un plan realista",
          "Un producto funcionando en producción",
          "Un código y una documentación sobre los que puedes seguir construyendo",
          "Un único responsable desde el concepto hasta el lanzamiento",
        ],
      },
      {
        id: "consulting",
        title: "Consultoría y liderazgo tecnológico",
        summary:
          "Acompañamiento sénior en estrategia técnica, planeación de producto, arquitectura y entrega, o liderazgo directo para modernizar los sistemas que frenan tu negocio.",
        outcome: "Decisiones más claras, planes realistas y equipos que entregan con confianza.",
        problems: [
          "Decisiones de tecnología que se sienten riesgosas o poco claras",
          "Sistemas heredados que ralentizan el negocio",
          "Equipos a los que les cuesta entregar de forma predecible",
          "Incertidumbre sobre dónde encaja realmente la IA en tu empresa",
        ],
        deliver: [
          "Estrategia técnica y planeación de la hoja de ruta",
          "Revisión y orientación de arquitectura",
          "Liderazgo de entrega y acompañamiento de equipos",
          "Planes de modernización para sistemas existentes",
          "Orientación práctica para adoptar IA",
        ],
        outcomes: [
          "Decisiones alineadas con las prioridades del negocio",
          "Una hoja de ruta priorizada y realista",
          "Mejores prácticas de entrega",
          "Un camino de modernización sin reescrituras innecesarias",
        ],
      },
    ],
    processEyebrow: "Proceso",
    processTitle: "Cómo funciona un proyecto.",
    process: [
      {
        title: "Conversación",
        body: "Una llamada corta para entender tu negocio, el problema y cómo se ve el éxito.",
      },
      {
        title: "Diagnóstico",
        body: "Reviso tus procesos, sistemas y restricciones, y propongo un alcance enfocado con prioridades claras.",
      },
      {
        title: "Construcción y entrega",
        body: "Trabajo en iteraciones cortas con revisiones periódicas, para que veas avances funcionando desde temprano.",
      },
      {
        title: "Entrega y soporte",
        body: "Recibes un trabajo documentado y mantenible, con soporte continuo si lo necesitas.",
      },
    ],
    aiEyebrow: "Sobre la IA",
    aiTitle: "La IA como herramienta, no como discurso.",
    aiBody: [
      "Uso IA todos los días para investigar, prototipar, escribir código y probar. Eso permite que una persona con experiencia entregue un trabajo que antes requería un equipo más grande.",
      "Pero la IA es solo una parte del trabajo. Reviso personalmente cada decisión de arquitectura, datos, seguridad y experiencia de usuario, y solo agrego funciones de IA a tu producto cuando resuelven un problema real y las personas pueden verificar sus resultados.",
    ],
    aiPrinciples: [
      "Revisión humana en cada entregable",
      "Manejo cuidadoso de tus datos",
      "Nada de funciones de IA solo por tenerlas",
    ],
    ctaTitle: "¿No sabes qué servicio encaja mejor?",
    ctaBody: "Cuéntame el problema. Encontraremos juntos el enfoque adecuado.",
  },

  work: {
    eyebrow: "Trabajo",
    title: "Trabajo seleccionado.",
    lead: "Productos que he construido y opero, junto con experiencia profesional que he liderado. El trabajo para clientes y empleadores se describe de forma general para respetar la confidencialidad.",
    kinds: {
      product: "Producto propio",
      employment: "Cargo profesional",
      company: "Empresa fundada",
      game: "Juego móvil propio",
      platform: "Plataforma de negocio",
    },
    productsTitle: "Productos digitales",
    productsIntro:
      "Productos que he llevado de la idea al lanzamiento, desde plataformas SaaS hasta juegos móviles publicados, incluyendo definición de producto, UX, desarrollo y publicación.",
    platformsTitle: "Plataformas de negocio",
    platformsIntro: "Software creado para apoyar la operación diaria de las empresas, desde propuestas comerciales hasta la entrega de proyectos.",
    experienceTitle: "Experiencia profesional",
    experienceIntro: "Roles de liderazgo y entrega que definieron cómo trabajo hoy con mis clientes.",
    challengeLabel: "Reto",
    roleLabel: "Mi rol",
    recognitionLabel: "Reconocimientos",
    items: [
      {
        id: "mi-padel-club",
        kind: "product",
        name: "Mi Pádel Club",
        sector: "Deportes · SaaS · Web y móvil",
        summary:
          "Una plataforma multi-club que les da a los clubes de pádel aficionado un hogar digital: reservas de canchas, torneos, rankings y administración del club en web y móvil.",
        challenge:
          "Los clubes manejaban su operación diaria con grupos de WhatsApp, hojas de cálculo y procesos manuales.",
        role: "Definición de producto, UX, arquitectura, desarrollo y despliegue.",
        links: [{ label: "Visitar mipadel.club", href: "https://mipadel.club" }],
      },
      {
        id: "odentia",
        kind: "product",
        name: "Odentia",
        sector: "Salud · SaaS",
        summary:
          "Una plataforma para que los consultorios odontológicos gestionen pacientes, agenda y operación clínica, conectada a un marketplace especializado de insumos odontológicos.",
        challenge:
          "Los consultorios odontológicos manejan citas, historias clínicas y compras de insumos en herramientas desconectadas.",
        role: "Definición de producto, UX, flujos clínicos, arquitectura, desarrollo y despliegue.",
        links: [{ label: "Visitar odentia.co", href: "https://www.odentia.co" }],
      },
      {
        id: "tejo-y-minitejo",
        kind: "game",
        name: "Tejo y MiniTejo",
        sector: "Juego móvil · Android y iOS",
        summary:
          "Un juego móvil que lleva el tejo, el deporte nacional de Colombia, al celular: tejo clásico y el más rápido MiniTejo, retos regionales y un jugador personalizable. Es la evolución más reciente de Virtual Tejo, el juego que construí para Facebook en 2008.",
        challenge:
          "Convertir una tradición física y muy local en un juego casual, con controles táctiles sencillos que funcionen tanto para jugadores de siempre como para quienes lo descubren.",
        role: "Dueño del producto y desarrollador: concepto, diseño del juego, desarrollo, publicación en tiendas y actualizaciones continuas; hoy en su cuarta versión mayor.",
        links: [
          { label: "Google Play", href: "https://play.google.com/store/apps/details?id=me.alexsosa.virtualtejo" },
          { label: "App Store", href: "https://apps.apple.com/co/app/tejo-y-minitejo/id1484371222" },
        ],
      },
      {
        id: "rana-y-bolirana",
        kind: "game",
        name: "Rana y Bolirana",
        sector: "Juego móvil · Android y iOS",
        summary:
          "Un juego móvil casual basado en la rana y la bolirana, el juego tradicional colombiano de apuntar a la boca de una rana de bronce, presente por generaciones en tabernas y ferias.",
        challenge:
          "Recrear la experiencia de un clásico de tabernas y ferias con controles de un solo toque, lanzamientos realistas y partidas rápidas.",
        role: "Dueño del producto y desarrollador: concepto, diseño del juego, desarrollo, publicación en tiendas y actualizaciones; hoy en su segunda versión mayor.",
        links: [
          { label: "Google Play", href: "https://play.google.com/store/apps/details?id=me.alexsosa.virtualsapo" },
          { label: "App Store", href: "https://apps.apple.com/co/app/rana-y-bolirana/id6476509166" },
        ],
      },
      {
        id: "solardesk",
        kind: "platform",
        name: "SolarDesk",
        sector: "Energía · SaaS",
        summary:
          "Una herramienta de negocio para que instaladores y equipos comerciales del sector solar creen propuestas profesionales, con análisis técnico, proyección financiera, ROI, mapas y PDF con su marca, además de cobro por suscripción.",
        challenge:
          "Preparar cotizaciones solares a mano es lento y hace que las propuestas sean inconsistentes dentro de un equipo comercial.",
        role: "Definición de producto, UX, arquitectura, desarrollo, integración de pagos y operación en producción.",
        links: [{ label: "Visitar solardesk.co", href: "https://solardesk.co" }],
      },
      {
        id: "teamforge",
        kind: "platform",
        name: "TeamForge",
        sector: "Gestión de proyectos · Registro de tiempo",
        summary:
          "Una plataforma de gestión de proyectos y registro de tiempo que ayuda a los equipos a organizar su trabajo y llevar un registro claro del tiempo invertido en cada proyecto.",
        challenge:
          "Los equipos suelen repartir la planeación y el registro de tiempo entre herramientas distintas, lo que dificulta ver la entrega y el esfuerzo en conjunto.",
        role: "Definición de producto, UX, arquitectura y desarrollo.",
      },
      {
        id: "lendingpoint",
        kind: "employment",
        name: "LendingPoint",
        sector: "Fintech · Estados Unidos · Desde 2019",
        summary:
          "Como Tech & Product Lead, he liderado la entrega de más de 7 productos e iniciativas digitales estratégicas para una fintech de préstamos en Estados Unidos, desde su definición hasta el lanzamiento y la producción en web y móvil.",
        challenge:
          "Productos críticos para el negocio, donde calidad, dependencias técnicas y plazos deben equilibrarse al mismo tiempo.",
        role: "Liderazgo del equipo frontend, planeación de producto, UX, desarrollo iOS, coordinación de releases y despliegues a producción. Vinculación a través de Techtivo.",
      },
      {
        id: "appsolution",
        kind: "company",
        name: "Appsolution",
        sector: "Estudio de productos digitales · 2013–2019",
        summary:
          "Fundé y dirigí un estudio de productos digitales que entregó más de 100 proyectos en móvil, web, Smart TV y plataformas empresariales para clientes y agencias de Latinoamérica y Estados Unidos, con equipos de hasta 80 profesionales.",
        challenge:
          "Convertir ideas de clientes en productos para plataformas, industrias y presupuestos muy distintos, mientras crecían el equipo y la empresa.",
        role: "Fundador y director de producto: relación con clientes, dirección de producto, tecnología y liderazgo de entrega.",
        recognition: [
          "Primer lugar, #LlevaTuApp en Colombia 3.0 (2013)",
          "Premio Chibchacum al Mejor Nuevo Empresario, Cámara de Comercio de Tunja (2013)",
        ],
      },
    ],
    earlierTitle: "Antes",
    earlier: [
      {
        name: "MOVL Connect",
        role: "Development Manager, Colombia · 2011–2013",
        body: "Lideré equipos que construyeron productos multidispositivo para Samsung Smart TV y móviles, incluida una propuesta ganadora del Samsung LATAM Smart TV Challenge.",
      },
      {
        name: "Mentez",
        role: "Game Engineering Lead · 2010–2011",
        body: "Lideré el desarrollo de juegos sociales para mercados internacionales, en colaboración con equipos de desarrollo en Pekín.",
      },
    ],
    ctaTitle: "¿Tienes algo similar en mente?",
    ctaBody: "Ya sea un producto nuevo o una herramienta interna, me encantaría conocerlo.",
  },

  about: {
    eyebrow: "Sobre mí",
    title: "Hola, soy Alex Sosa.",
    lead: "Soy consultor tecnológico y creador de productos, con más de 23 años de experiencia convirtiendo necesidades de negocio en software que funciona en el mundo real.",
    sections: [
      {
        title: "Primero, constructor",
        body: "Estudié Ingeniería de Sistemas y Computación y empecé escribiendo software. Desde temprano construí juegos sociales y aplicaciones multidispositivo, entre ellas Virtual Tejo, un juego de Facebook que superó los 85.000 usuarios activos diarios, y aplicaciones premiadas para Smart TV.",
      },
      {
        title: "Fundador",
        body: "En 2013 fundé Appsolution en Tunja, Colombia. En seis años, el estudio entregó más de 100 proyectos y llegó a tener equipos de hasta 80 personas. Dirigir una empresa me enseñó para qué sirve realmente la tecnología: resolver los problemas de los clientes con presupuestos y plazos reales.",
      },
      {
        title: "Líder de tecnología",
        body: "Desde 2019 trabajo como Tech & Product Lead para LendingPoint, una fintech de Estados Unidos, liderando el desarrollo frontend y coordinando la entrega de productos web y móviles a producción, donde la confiabilidad y los plazos importan por igual.",
      },
      {
        title: "Hoy",
        body: "Complementé esa experiencia con la especialización en AI Product Management de Duke University (2025), seguida de un trabajo práctico intensivo con desarrollo asistido por IA y automatización. Uso esa forma de trabajar para construir mis propios productos SaaS y para ayudar a mis clientes a avanzar más rápido y con menos riesgo.",
      },
      {
        title: "Docente",
        body: "También he sido docente universitario en desarrollo web, móvil y de videojuegos, además de gestión de proyectos, en la Universidad Santo Tomás y la Fundación Universitaria Juan de Castellanos, en Tunja.",
      },
    ],
    principlesTitle: "Cómo trabajo",
    principles: [
      { title: "Primero el negocio", body: "Empezar por el problema y el resultado, y luego elegir la tecnología." },
      { title: "Asumir el resultado", body: "Responsabilizarme desde la definición hasta producción, no solo de una parte." },
      { title: "Mantenerlo simple", body: "Preferir la solución más simple que funcione y pueda mantenerse." },
      { title: "Usar la IA con responsabilidad", body: "Acelerar el trabajo con IA, con criterio humano en cada decisión." },
    ],
    educationTitle: "Formación",
    education: [
      { title: "AI Product Management Specialization", detail: "Duke University · 2025" },
      {
        title: "Maestría en Diseño Web y Desarrollo Multidispositivo (UI/UX)",
        detail: "Universidad Internacional de Valencia (VIU) / ESDesign Barcelona · 2019",
      },
      { title: "Especialización en Gerencia de Proyectos", detail: "Universidad de Boyacá · 2016" },
      {
        title: "Ingeniería de Sistemas y Computación",
        detail: "Universidad Pedagógica y Tecnológica de Colombia (UPTC) · 2003",
      },
    ],
    recognitionTitle: "Reconocimientos",
    recognition: [
      { title: "Ganador, Samsung LATAM Smart TV Challenge", detail: "2012" },
      { title: "Ganador, Build a Successful Facebook Application, entre más de 600 equipos", detail: "2008" },
      { title: "Primer lugar, #LlevaTuApp en Colombia 3.0", detail: "2013" },
      { title: "Premio Chibchacum al Mejor Nuevo Empresario", detail: "Cámara de Comercio de Tunja · 2013" },
    ],
    actionsTitle: "Trayectoria en detalle",
    actionsBody: "Mi historial profesional completo está en mi hoja de vida y en LinkedIn.",
  },

  contact: {
    eyebrow: "Contacto",
    title: "Hablemos de tu proyecto.",
    lead: "Cuéntame el reto que enfrentas o el producto que quieres construir. Con unas pocas líneas es suficiente para empezar.",
    formTitle: "Envía tu consulta",
    formNote: "Tu mensaje llega directamente a mi correo. No se guarda en este sitio.",
    fields: {
      name: "Tu nombre",
      email: "Tu correo electrónico",
      emailHint: "Para poder responderte.",
      company: "Empresa",
      optional: "opcional",
      topic: "¿En qué necesitas ayuda?",
      message: "Tu mensaje",
      messagePlaceholder: "¿A qué se dedica tu empresa y qué problema te gustaría resolver?",
    },
    topics: [
      { value: "automation", label: "Automatización de procesos" },
      { value: "product", label: "Desarrollo de productos digitales" },
      { value: "consulting", label: "Consultoría y liderazgo tecnológico" },
      { value: "other", label: "Otro tema" },
    ],
    submit: "Enviar consulta",
    sending: "Enviando…",
    errors: {
      name: "Por favor escribe tu nombre.",
      email: "Por favor escribe tu correo electrónico.",
      emailInvalid: "Escribe un correo válido, por ejemplo nombre@empresa.com.",
      service: "Por favor elige en qué necesitas ayuda.",
      message: "Por favor escribe un mensaje corto.",
      tooLong: "El texto es demasiado largo. Por favor acórtalo.",
      summary: "Por favor revisa los campos marcados.",
    },
    success: "¡Gracias por escribirme! Tu mensaje fue enviado. Te responderé lo antes posible.",
    failure: {
      delivery: "No fue posible enviar tu mensaje en este momento. Intenta de nuevo en un momento o escríbeme directamente.",
      network: "Hubo un problema de conexión y tu mensaje no se envió. Revisa tu conexión e intenta de nuevo.",
    },
    directTitle: "¿Prefieres escribir directamente?",
    directBody: "Escríbeme por correo o conectemos en LinkedIn.",
    copy: "Copiar correo",
    copied: "Correo copiado",
    copyFailed: "No se pudo copiar. Selecciona la dirección manualmente.",
    tipsTitle: "Te recomiendo incluir",
    tips: [
      "A qué se dedica tu empresa",
      "El problema u oportunidad que enfrentas",
      "Plazos o restricciones, si los hay",
    ],
  },

  finalCta: {
    title: "¿Tienes un reto que vale la pena resolver?",
    body: "Cuéntame qué está frenando a tu empresa o qué te gustaría construir. Te responderé yo directamente, no un equipo de ventas.",
  },

  footer: {
    tagline: "Consultoría tecnológica, automatización de procesos y desarrollo de productos digitales.",
    navTitle: "Sitio",
    connectTitle: "Conecta",
    rights: "Todos los derechos reservados.",
  },

  notFound: {
    title: "Página no encontrada.",
    body: "La página que buscas no existe o cambió de dirección.",
    cta: "Volver al inicio",
  },
}

export default es
