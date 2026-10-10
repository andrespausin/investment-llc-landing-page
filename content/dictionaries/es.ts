import type { Dictionary } from "./types";

/**
 * Spanish copy. Must mirror the structure of `en.ts`; the `Dictionary`
 * type enforces it at build time.
 */
const es: Dictionary = {
  meta: {
    title: "Consultoría y Gestión de Proyectos",
    description:
      "Consultoría y gestión de proyectos para Oil & Gas, construcción civil e infraestructuras, finanzas corporativas e industria. Planificación estructurada, control de proyectos y análisis financiero para decidir mejor.",
  },
  common: {
    skipToContent: "Saltar al contenido principal",
    primaryNav: "Principal",
    footerNav: "Pie de página",
    language: "Idioma",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    backToTop: "Volver arriba",
    homeLabel: "Inicio",
  },
  nav: {
    about: "Nosotros",
    services: "Servicios",
    industries: "Sectores",
    approach: "Metodología",
    contact: "Contacto",
  },
  cta: {
    primary: "Agendar una consulta",
    secondary: "Ver nuestros servicios",
  },
  hero: {
    eyebrow: "Consultoría y Gestión de Proyectos",
    titleLines: ["Claridad estratégica.", "Ejecución rigurosa."],
    lead: "Ayudamos a las organizaciones a convertir sus objetivos en planes estructurados y a llevarlos a la práctica con un control claro del alcance, los costes, los plazos y los riesgos.",
    focusLabel: "Sectores en los que trabajamos",
    focusAreas: [
      "Oil & Gas",
      "Construcción civil e infraestructuras",
      "Finanzas corporativas",
      "Industria y energía",
    ],
    graphic: {
      lanes: ["Estrategia", "Finanzas", "Ingeniería", "Ejecución"],
      baseline: "Línea base",
      progress: "Avance",
      statusDate: "Fecha de corte",
    },
  },
  about: {
    eyebrow: "Nosotros",
    title: "Donde se unen la visión de negocio, el análisis financiero y la gestión de proyectos.",
    paragraphs: [
      "Los proyectos suelen perder valor entre la decisión empresarial y el trabajo sobre el terreno. Se aprueban estrategias sin plan de ejecución, presupuestos sin controles para seguirlos y equipos que avanzan sin prioridades compartidas.",
      "Trabajamos en ese espacio. Conectamos el caso de negocio, el modelo financiero y el plan del proyecto para que las decisiones se apoyen en números sólidos y la ejecución siga una estructura que todos entienden.",
    ],
    pillars: [
      {
        title: "Claridad estratégica",
        text: "Definir qué significa el éxito, cuánto costará y qué prioridades van primero, antes de comprometer recursos.",
      },
      {
        title: "Control del proyecto",
        text: "Planificar, seguir e informar sobre alcance, plazos, costes y riesgos para detectar desviaciones a tiempo.",
      },
      {
        title: "Mejora operativa",
        text: "Identificar ineficiencias, estandarizar la forma de trabajar y crear planes de mejora que el equipo pueda sostener.",
      },
    ],
  },
  services: {
    eyebrow: "Servicios",
    title: "Apoyo desde el primer análisis hasta la entrega final.",
    intro:
      "Puede contratar un único servicio o combinar varios. Cada encargo se define según sus objetivos, su equipo y la fase en la que se encuentra el proyecto.",
    deliverablesLabel: "Entregables representativos",
    items: [
      {
        id: "strategy",
        title: "Consultoría empresarial y estratégica",
        summary:
          "Diagnóstico empresarial, planificación estratégica, revisión de procesos y apoyo a la toma de decisiones para equipos directivos ante crecimiento, cambios o decisiones complejas.",
        deliverables: [
          "Informe de diagnóstico empresarial",
          "Plan estratégico y hoja de ruta de prioridades",
          "Análisis de alternativas y notas de decisión",
          "Mapas de procesos con recomendaciones",
        ],
      },
      {
        id: "project-management",
        title: "Gestión de proyectos",
        summary:
          "Gestión de proyectos desde su definición hasta el cierre: alcance, planificación, coordinación de interesados, seguimiento, gestión de riesgos y control de cambios.",
        deliverables: [
          "Acta de constitución y declaración de alcance",
          "Cronograma integrado y línea base",
          "Registro de riesgos y plan de respuesta",
          "Registro de cambios e informes de avance",
        ],
      },
      {
        id: "project-controls",
        title: "Control de proyectos y apoyo a PMO",
        summary:
          "Control de costes y plazos, presupuestos, reporting e indicadores de desempeño, además de apoyo para crear o reforzar una oficina de proyectos.",
        deliverables: [
          "Líneas base de coste y plazo",
          "Seguimiento presupuestario y previsiones",
          "Cuadros de indicadores e informes periódicos",
          "Procedimientos y plantillas de PMO",
        ],
      },
      {
        id: "corporate-finance",
        title: "Finanzas corporativas y viabilidad",
        summary:
          "Modelos financieros, estudios de viabilidad, análisis de escenarios, evaluación de inversiones y planificación financiera para apoyar decisiones empresariales.",
        deliverables: [
          "Modelos financieros y de flujo de caja",
          "Evaluaciones de viabilidad",
          "Análisis de escenarios y sensibilidad",
          "Presupuestos y planes financieros",
        ],
        note: "Apoyo exclusivo a decisiones empresariales. No gestionamos fondos ni prestamos asesoramiento de inversión regulado.",
      },
      {
        id: "procurement",
        title: "Compras y coordinación de contratos",
        summary:
          "Apoyo en procesos de compra, evaluación de proveedores, coordinación contractual y seguimiento de suministros y entregas.",
        deliverables: [
          "Plan y paquetes de compras",
          "Matrices de evaluación de proveedores",
          "Seguimiento de obligaciones contractuales",
          "Informes de estado de suministros y entregas",
        ],
      },
      {
        id: "operational-improvement",
        title: "Mejora operativa y de procesos",
        summary:
          "Identificación de ineficiencias, estandarización de procesos y planes de mejora prácticos, adaptados a la forma de trabajar de su organización.",
        deliverables: [
          "Evaluación de la situación actual",
          "Procedimientos operativos estándar",
          "Plan de mejora con responsables e hitos",
          "Indicadores de seguimiento",
        ],
      },
    ],
    closing: "¿No sabe qué servicio encaja con su situación? Describa el reto y le ayudaremos a definir el alcance.",
  },
  industries: {
    eyebrow: "Sectores",
    title: "Un mismo método, adaptado a cada sector.",
    intro:
      "Los fundamentos de la planificación y el control son comunes a todas las industrias. Lo que cambia es el contexto: normativa, riesgos, interesados y ritmo. Adaptamos nuestro enfoque a cada uno.",
    items: [
      {
        id: "oil-gas",
        title: "Oil & Gas",
        text: "Proyectos intensivos en capital, con exigencias elevadas de seguridad, plazos e interfaces con contratistas. Nos centramos en la planificación, el control de costes, la coordinación de contratistas y el reporting estructurado.",
      },
      {
        id: "construction",
        title: "Construcción civil e infraestructuras",
        text: "Proyectos con muchos interesados, plazos largos y presupuestos ajustados. Apoyamos la definición del alcance, la programación, el control de cambios y el seguimiento de contratistas y proveedores.",
      },
      {
        id: "corporate-finance",
        title: "Servicios corporativos y financieros",
        text: "Organizaciones que necesitan un análisis sólido detrás de sus decisiones. Apoyamos la planificación financiera, la viabilidad, los presupuestos y los proyectos de transformación interna.",
      },
      {
        id: "industrial-energy",
        title: "Industria y energía",
        text: "Operaciones donde importan la eficiencia, la fiabilidad y la disciplina en el uso del capital. Apoyamos proyectos en instalaciones, la mejora de procesos y la evaluación de inversiones.",
      },
      {
        id: "other",
        title: "Otros sectores empresariales",
        text: "Empresas ante un crecimiento, una reorganización o un proyecto complejo. Nuestros métodos se aplican allí donde objetivos, recursos y plazos necesitan estar bajo control.",
      },
    ],
  },
  approach: {
    eyebrow: "Metodología",
    title: "Cinco etapas que dan estructura a cada encargo.",
    intro:
      "La profundidad de cada etapa depende del alcance, pero la secuencia se mantiene, para que siempre sepa en qué punto está el trabajo y qué viene después.",
    steps: [
      {
        title: "Descubrir",
        text: "Comprender sus objetivos, necesidades y restricciones: qué hay que lograr, en qué plazo y con qué recursos.",
      },
      {
        title: "Evaluar",
        text: "Analizar la situación actual, los riesgos y las oportunidades para fijar un punto de partida realista.",
      },
      {
        title: "Planificar",
        text: "Definir alcance, prioridades, recursos e indicadores, y acordar cómo se medirá el avance.",
      },
      {
        title: "Ejecutar",
        text: "Coordinar la implementación junto a su equipo, hacer seguimiento y abordar las desviaciones cuando aparecen.",
      },
      {
        title: "Optimizar",
        text: "Revisar los resultados frente al plan, recoger lecciones aprendidas y ajustar acciones para sostener la mejora.",
      },
    ],
  },
  why: {
    eyebrow: "Por qué trabajar con nosotros",
    title: "Qué puede esperar de nuestro trabajo.",
    intro:
      "Nuestro objetivo no es producir más informes, sino que sus decisiones y proyectos sean más claros y fáciles de controlar.",
    items: [
      {
        title: "Una visión integrada",
        text: "Las consideraciones de negocio, de proyecto y financieras se analizan juntas, no en compartimentos separados.",
      },
      {
        title: "Planificación estructurada",
        text: "Cada encargo empieza con un alcance definido, un plan e indicadores acordados.",
      },
      {
        title: "Comunicación clara",
        text: "Informes concisos y en lenguaje claro, para que las personas adecuadas puedan actuar con la información.",
      },
      {
        title: "Seguimiento de costes, plazos y riesgos",
        text: "Un seguimiento periódico ayuda a detectar desviaciones pronto, cuando todavía hay margen para corregirlas.",
      },
      {
        title: "Soluciones adaptadas a su contexto",
        text: "Recomendaciones dimensionadas para su organización, sus recursos y la fase de su proyecto.",
      },
    ],
    ctaTitle: "¿Tiene por delante un proyecto o una decisión que necesita estructura?",
    ctaText: "Cuéntenos en qué punto está y qué necesita lograr. Hablaremos de cómo podemos ayudarle.",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Cuéntenos su reto.",
    intro:
      "Comparta algunos detalles sobre su proyecto o necesidad. Revisaremos su mensaje y responderemos al correo electrónico que nos indique para concertar una conversación.",
    checklistTitle: "Información útil para incluir",
    checklist: [
      "Su objetivo o la decisión que tiene por delante",
      "La fase actual del proyecto",
      "Restricciones clave: plazos, presupuesto o recursos",
    ],
    directContact: {
      title: "Contacto directo",
      phone: "Teléfono",
      address: "Dirección",
      country: "Estados Unidos",
      viewMap: "Ver en el mapa",
      newTab: "(se abre en una pestaña nueva)",
    },
    form: {
      requiredHint: "Todos los campos son obligatorios salvo que se indique lo contrario.",
      optional: "opcional",
      fields: {
        fullName: { label: "Nombre completo" },
        email: {
          label: "Correo electrónico profesional",
          hint: "Solo lo usaremos para responder a su solicitud.",
        },
        company: { label: "Empresa" },
        service: {
          label: "Servicio de interés",
          placeholder: "Seleccione un servicio",
          otherOption: "Otro / aún no lo sé",
        },
        message: {
          label: "Necesidades del proyecto o del negocio",
          hint: "Describa brevemente sus objetivos, la situación actual y los plazos relevantes.",
        },
      },
      consent:
        "Al enviar este formulario, acepta que utilicemos la información facilitada para responder a su consulta.",
      privacyLink: "Consulte nuestra política de privacidad",
      submit: "Solicitar una consulta",
      submitting: "Enviando…",
      errors: {
        fullName: {
          required: "Introduzca su nombre completo.",
          tooLong: "Utilice 120 caracteres como máximo.",
        },
        email: {
          required: "Introduzca su correo electrónico profesional.",
          invalid: "Introduzca un correo válido, por ejemplo nombre@empresa.com.",
          tooLong: "Utilice 254 caracteres como máximo.",
        },
        company: {
          tooLong: "Utilice 160 caracteres como máximo.",
        },
        service: {
          required: "Seleccione el servicio que le interesa.",
          invalid: "Seleccione una de las opciones disponibles.",
        },
        message: {
          required: "Describa las necesidades de su proyecto o negocio.",
          tooShort: "Añada algo más de detalle (al menos 20 caracteres).",
          tooLong: "El mensaje no debe superar los 3.000 caracteres.",
        },
      },
      status: {
        invalid: "Revise los campos señalados.",
        unavailable: {
          title: "No hemos podido enviar su solicitud en línea",
          text: "El formulario en línea no está disponible temporalmente. Sus datos siguen en el formulario.",
          phonePrompt: "Puede llamarnos al",
        },
        success: {
          title: "Mensaje enviado",
          text: "Gracias. Su mensaje se ha entregado a nuestro equipo y responderemos al correo electrónico que nos ha indicado.",
        },
        error: {
          title: "No se ha podido enviar su mensaje",
          text: "Un problema técnico ha impedido el envío. Sus datos siguen en el formulario. Inténtelo de nuevo en unos minutos.",
        },
        sendAnother: "Enviar otro mensaje",
      },
    },
  },
  footer: {
    rights: "Todos los derechos reservados.",
    privacy: "Política de privacidad",
    terms: "Condiciones de uso",
  },
  cookies: {
    banner: {
      title: "Preferencias de cookies",
      text: "Utilizamos cookies necesarias para que el sitio funcione, por ejemplo para recordar su idioma. Con su consentimiento, también utilizaríamos cookies opcionales para entender cómo se usa el sitio y medir nuestras comunicaciones.",
      changeHint: "Puede cambiar su elección en cualquier momento desde «Configuración de cookies», al final de la página.",
      acceptAll: "Aceptar todas",
      rejectAll: "Rechazar todas",
      customize: "Personalizar",
      policyLink: "Política de cookies",
    },
    preferences: {
      title: "Configuración de cookies",
      intro:
        "Elija qué cookies opcionales podemos utilizar. Las cookies necesarias no se pueden desactivar porque el sitio las necesita para funcionar.",
      alwaysActive: "Siempre activas",
      save: "Guardar preferencias",
      close: "Cerrar",
      categories: {
        necessary: {
          title: "Necesarias",
          text: "Imprescindibles para que el sitio funcione. Recuerdan su idioma y sus preferencias de cookies, y no se utilizan para seguirle en otros sitios.",
        },
        analytics: {
          title: "Analíticas",
          text: "Nos ayudan a entender cómo se utiliza el sitio para mejorar su contenido y rendimiento.",
        },
        marketing: {
          title: "Marketing",
          text: "Nos ayudan a medir la eficacia de nuestras comunicaciones y, en su caso, a mostrar contenido relevante en otras plataformas.",
        },
      },
    },
    settingsLink: "Configuración de cookies",
  },
  notFound: {
    title: "Página no encontrada",
    text: "La página que busca no existe o ha cambiado de ubicación.",
    back: "Volver a la página de inicio",
  },
  emails: {
    acknowledgement: {
      subject: "Hemos recibido su mensaje",
      greeting: "Hola, {name}:",
      paragraphs: [
        "Gracias por contactar con Investments & Services CM, LLC. Esta es una confirmación automática de que hemos recibido su mensaje.",
        "Nuestro equipo lo revisará y responderá a esta dirección de correo electrónico.",
      ],
      summaryTitle: "Resumen de su solicitud",
      signature: "Investments & Services CM, LLC",
    },
    labels: {
      fullName: "Nombre completo",
      email: "Correo electrónico",
      company: "Empresa",
      service: "Servicio de interés",
      message: "Necesidades del proyecto o del negocio",
    },
    notProvided: "No indicado",
  },
};

export default es;
