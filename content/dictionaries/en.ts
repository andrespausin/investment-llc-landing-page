import type { Dictionary } from "./types";

/**
 * English copy (default locale).
 *
 * Content rules: no invented clients, projects, figures, certifications,
 * years of experience, locations or contact data. Services are a proposed
 * scope and must be validated with the company before launch.
 */
const en: Dictionary = {
  meta: {
    title: "Consulting & Project Management Services",
    description:
      "Consulting and project management for Oil & Gas, civil construction and infrastructure, corporate finance and industrial organizations. Structured planning, project controls and financial analysis to support better decisions.",
  },
  common: {
    skipToContent: "Skip to main content",
    primaryNav: "Primary",
    footerNav: "Footer",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToTop: "Back to top",
    homeLabel: "Home",
  },
  nav: {
    about: "About",
    services: "Services",
    industries: "Industries",
    approach: "Approach",
    contact: "Contact",
  },
  cta: {
    primary: "Schedule a Consultation",
    secondary: "Explore Our Services",
  },
  hero: {
    eyebrow: "Consulting & Project Management Services",
    titleLines: ["Strategic clarity.", "Disciplined execution."],
    lead: "We help organizations turn business objectives into structured plans, and carry those plans through execution with clear control of scope, cost, schedule and risk.",
    focusLabel: "Sectors we support",
    focusAreas: [
      "Oil & Gas",
      "Civil Construction & Infrastructure",
      "Corporate Finance",
      "Industrial & Energy",
    ],
    graphic: {
      lanes: ["Strategy", "Finance", "Engineering", "Execution"],
      baseline: "Baseline",
      progress: "Progress",
      statusDate: "Status date",
    },
  },
  about: {
    eyebrow: "About",
    title: "Where business vision, financial analysis and project management meet.",
    paragraphs: [
      "Projects often lose value in the space between a business decision and the work on the ground. Strategies are approved without a delivery plan, budgets without the controls to follow them, and teams execute without shared priorities.",
      "We work in that space. We connect the business case, the financial model and the project plan, so decisions rest on sound numbers and execution follows a structure everyone understands.",
    ],
    pillars: [
      {
        title: "Strategic clarity",
        text: "Define what success looks like, what it will cost and which priorities come first, before resources are committed.",
      },
      {
        title: "Project control",
        text: "Plan, track and report scope, schedule, cost and risk, so deviations surface early and can be addressed in time.",
      },
      {
        title: "Operational improvement",
        text: "Identify inefficiencies, standardize how work gets done and build improvement plans your team can sustain.",
      },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "Support from the first analysis to final delivery.",
    intro:
      "Engage us for a single service or combine several. Each engagement is scoped to your objectives, your team and the stage of your project.",
    deliverablesLabel: "Representative deliverables",
    items: [
      {
        id: "strategy",
        title: "Business & Strategic Consulting",
        summary:
          "Business diagnostics, strategic planning, process review and decision support for leadership teams facing growth, change or complex choices.",
        deliverables: [
          "Business diagnostic report",
          "Strategic plan and priority roadmap",
          "Option analysis and decision memos",
          "Process maps with recommendations",
        ],
      },
      {
        id: "project-management",
        title: "Project Management",
        summary:
          "Management of projects from definition to close: scope, planning, stakeholder coordination, progress tracking, risk management and change control.",
        deliverables: [
          "Project charter and scope statement",
          "Integrated schedule and baseline",
          "Risk register and response plan",
          "Change log and progress reports",
        ],
      },
      {
        id: "project-controls",
        title: "Project Controls & PMO Support",
        summary:
          "Cost and schedule control, budgeting, reporting and performance indicators, plus support to set up or strengthen a project management office.",
        deliverables: [
          "Cost and schedule baselines",
          "Budget tracking and forecasts",
          "KPI dashboards and periodic reports",
          "PMO procedures and templates",
        ],
      },
      {
        id: "corporate-finance",
        title: "Corporate Finance & Feasibility",
        summary:
          "Financial models, feasibility studies, scenario analysis, investment appraisal and financial planning to support business decisions.",
        deliverables: [
          "Financial and cash-flow models",
          "Feasibility assessments",
          "Scenario and sensitivity analysis",
          "Budgets and financial plans",
        ],
        note: "Business decision support only. We do not manage funds or provide regulated investment advice.",
      },
      {
        id: "procurement",
        title: "Procurement & Contract Coordination",
        summary:
          "Support for purchasing processes, supplier evaluation, contract coordination and follow-up of supplies and deliveries.",
        deliverables: [
          "Procurement plan and packages",
          "Supplier evaluation matrices",
          "Contract obligation tracking",
          "Supply and delivery status reports",
        ],
      },
      {
        id: "operational-improvement",
        title: "Operational & Process Improvement",
        summary:
          "Identification of inefficiencies, process standardization and practical improvement plans that fit the way your organization works.",
        deliverables: [
          "Current-state assessment",
          "Standard operating procedures",
          "Improvement plan with owners and milestones",
          "Follow-up indicators",
        ],
      },
    ],
    closing: "Not sure which service fits your situation? Describe the challenge and we will help you define the scope.",
  },
  industries: {
    eyebrow: "Industries",
    title: "One method, adapted to each sector.",
    intro:
      "The fundamentals of planning and control are shared across industries. What changes is the context: regulations, risks, stakeholders and pace. We adapt our approach to each of them.",
    items: [
      {
        id: "oil-gas",
        title: "Oil & Gas",
        text: "Capital-intensive projects with demanding safety, schedule and contractor-interface requirements. Our focus: planning, cost control, contractor coordination and structured reporting.",
      },
      {
        id: "construction",
        title: "Civil Construction & Infrastructure",
        text: "Projects with many stakeholders, long timelines and tight budgets. We support scope definition, scheduling, change control and the follow-up of contractors and suppliers.",
      },
      {
        id: "corporate-finance",
        title: "Corporate & Financial Services",
        text: "Organizations that need solid analysis behind their decisions. We support financial planning, feasibility, budgeting and internal transformation projects.",
      },
      {
        id: "industrial-energy",
        title: "Industrial & Energy",
        text: "Operations where efficiency, reliability and capital discipline matter. We support facility projects, process improvement and the evaluation of investments.",
      },
      {
        id: "other",
        title: "Other Business Sectors",
        text: "Companies facing growth, reorganization or a complex project. Our methods apply wherever objectives, resources and deadlines need to be brought under control.",
      },
    ],
  },
  approach: {
    eyebrow: "Approach",
    title: "Five stages that keep every engagement structured.",
    intro:
      "The depth of each stage depends on the scope, but the sequence stays the same, so you always know where the work stands and what comes next.",
    steps: [
      {
        title: "Discover",
        text: "Understand your objectives, needs and constraints: what must be achieved, by when and with which resources.",
      },
      {
        title: "Assess",
        text: "Analyze the current situation, risks and opportunities to establish a realistic starting point.",
      },
      {
        title: "Plan",
        text: "Define scope, priorities, resources and indicators, and agree on how progress will be measured.",
      },
      {
        title: "Execute",
        text: "Coordinate implementation alongside your team, track progress and address deviations as they arise.",
      },
      {
        title: "Optimize",
        text: "Review results against the plan, capture lessons learned and adjust actions to sustain improvement.",
      },
    ],
  },
  why: {
    eyebrow: "Why work with us",
    title: "What you can expect from our work.",
    intro:
      "Our aim is not to produce more reports, but to make your decisions and projects clearer and easier to control.",
    items: [
      {
        title: "An integrated view",
        text: "Business, project and financial considerations are analyzed together, not in separate silos.",
      },
      {
        title: "Structured planning",
        text: "Every engagement starts with a defined scope, a plan and agreed indicators.",
      },
      {
        title: "Clear communication",
        text: "Concise reporting in plain language, so the right people can act on the information.",
      },
      {
        title: "Cost, schedule and risk follow-up",
        text: "Regular monitoring helps detect deviations early, while there is still room to correct them.",
      },
      {
        title: "Solutions that fit your context",
        text: "Recommendations sized to your organization, your resources and the stage of your project.",
      },
    ],
    ctaTitle: "Facing a project or a decision that needs structure?",
    ctaText: "Tell us where you are and what you need to achieve. We will discuss how we can help.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell us about your challenge.",
    intro:
      "Share a few details about your project or business need. We will review your message and reply to the email address you provide to arrange a conversation.",
    checklistTitle: "Useful details to include",
    checklist: [
      "Your objective or the decision you are facing",
      "The current stage of the project",
      "Key constraints: timeline, budget or resources",
    ],
    directContact: {
      title: "Direct contact",
      phone: "Phone",
      address: "Address",
      country: "United States",
      viewMap: "View on map",
      newTab: "(opens in a new tab)",
    },
    form: {
      requiredHint: "All fields are required unless marked as optional.",
      optional: "optional",
      fields: {
        fullName: { label: "Full name" },
        email: {
          label: "Business email",
          hint: "We will only use it to reply to your request.",
        },
        company: { label: "Company" },
        service: {
          label: "Service of interest",
          placeholder: "Select a service",
          otherOption: "Other / not sure yet",
        },
        message: {
          label: "Project or business needs",
          hint: "Briefly describe your objectives, current situation and any relevant deadlines.",
        },
      },
      consent:
        "By submitting this form, you agree that we may use the information provided to respond to your enquiry.",
      privacyLink: "Read our privacy policy",
      submit: "Request a Consultation",
      submitting: "Sending…",
      errors: {
        fullName: {
          required: "Enter your full name.",
          tooLong: "Use 120 characters or fewer.",
        },
        email: {
          required: "Enter your business email.",
          invalid: "Enter a valid email address, for example name@company.com.",
          tooLong: "Use 254 characters or fewer.",
        },
        company: {
          tooLong: "Use 160 characters or fewer.",
        },
        service: {
          required: "Select the service you are interested in.",
          invalid: "Select one of the available options.",
        },
        message: {
          required: "Describe your project or business needs.",
          tooShort: "Add a little more detail (at least 20 characters).",
          tooLong: "Keep your message under 3,000 characters.",
        },
      },
      status: {
        invalid: "Please review the highlighted fields.",
        unavailable: {
          title: "We could not send your request online",
          text: "The online form is temporarily unavailable. Your details are still in the form.",
          phonePrompt: "Please call us at",
        },
        success: {
          title: "Message sent",
          text: "Thank you. Your message has been delivered to our team, and we will reply to the email address you provided.",
        },
        error: {
          title: "Your message could not be sent",
          text: "A technical problem prevented delivery. Your details are still in the form. Please try again in a few minutes.",
        },
        sendAnother: "Send another message",
      },
    },
  },
  footer: {
    rights: "All rights reserved.",
    privacy: "Privacy policy",
    terms: "Terms of use",
  },
  cookies: {
    banner: {
      title: "Cookie preferences",
      text: "We use necessary cookies to make this site work, such as remembering your language. With your consent, we would also use optional cookies to understand how the site is used and to measure our communications.",
      changeHint: "You can change your choice at any time from “Cookie settings” at the bottom of the page.",
      acceptAll: "Accept all",
      rejectAll: "Reject all",
      customize: "Customize",
      policyLink: "Cookie policy",
    },
    preferences: {
      title: "Cookie settings",
      intro:
        "Choose which optional cookies we may use. Necessary cookies cannot be turned off because the site needs them to work.",
      alwaysActive: "Always active",
      save: "Save preferences",
      close: "Close",
      categories: {
        necessary: {
          title: "Necessary",
          text: "Required for the site to work. They remember your language and your cookie choices, and are not used to track you on other sites.",
        },
        analytics: {
          title: "Analytics",
          text: "Help us understand how visitors use the site, so we can improve its content and performance.",
        },
        marketing: {
          title: "Marketing",
          text: "Help us measure the effectiveness of our communications and, where applicable, show relevant content on other platforms.",
        },
      },
    },
    settingsLink: "Cookie settings",
  },
  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has been moved.",
    back: "Return to the home page",
  },
  emails: {
    acknowledgement: {
      subject: "We have received your message",
      greeting: "Hello {name},",
      paragraphs: [
        "Thank you for contacting Investments & Services CM, LLC. This is an automatic confirmation that your message has been received.",
        "Our team will review it and reply to this email address.",
      ],
      summaryTitle: "Summary of your request",
      signature: "Investments & Services CM, LLC",
    },
    labels: {
      fullName: "Full name",
      email: "Email",
      company: "Company",
      service: "Service of interest",
      message: "Project or business needs",
    },
    notProvided: "Not provided",
  },
};

export default en;
