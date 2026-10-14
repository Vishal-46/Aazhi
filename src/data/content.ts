export const site = {
  name: 'AAZHI',
  tagline: 'Technology with purpose.',
  descriptor: 'Independent technology studio',
  email: 'hello@aazhi.example.com',
  location: 'India · working worldwide',
};

export const navLinks: { label: string; href: string }[] = [
  { label: 'Home', href: '#/' },
  { label: 'About', href: '#/about' },
  { label: 'Team', href: '#/team/0' },
  { label: 'Work', href: '#/work' },
  { label: 'Contact', href: '#/contact' },
];

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  modules: string[];
  note: string;
  synthetic: boolean;
  href?: string;
}

export const projects: Project[] = [
  {
    slug: 'healthcare-operations',
    title: 'Healthcare Operations Management',
    category: 'Healthcare Technology / Digital Operations',
    description:
      'A clinic management system designed to organise patient registration, records, appointments, prescriptions, billing, and administrative workflows.',
    modules: ['Registration', 'Records', 'Appointments', 'Prescriptions', 'Billing', 'Admin'],
    note: 'Interface mockup with synthetic data. No client identity or patient information shown.',
    synthetic: true,
  },
];

export interface Capability {
  index: string;
  title: string;
  body: string;
  points: string[];
  stage: string;
}

export const capabilities: Capability[] = [
  {
    index: '01',
    title: 'Digital Products',
    body: 'Web applications, dashboards, and database-backed tools shaped around the way people actually work.',
    points: ['Web applications & dashboards', 'Database-backed tools', 'Designed around real workflows'],
    stage: 'Available',
  },
  {
    index: '02',
    title: 'Workflow Automation',
    body: 'API integrations and automation that remove repetitive manual effort — with AI assistance only where it genuinely earns its place.',
    points: ['API integrations', 'Repetitive-task automation', 'AI-assisted steps where genuinely useful'],
    stage: 'Available',
  },
  {
    index: '03',
    title: 'Data & Intelligence',
    body: 'Data processing, reporting, and dashboards that turn scattered operational records into information people can act on.',
    points: ['Data processing & cleanup', 'Reports & dashboards', 'Readable insight from scattered records'],
    stage: 'Available',
  },
  {
    index: '04',
    title: 'Connected Systems & IoT',
    body: 'Early IoT and connected-environment prototypes. This is exploratory, prototype-stage work offered openly while the capability develops.',
    points: ['IoT prototypes', 'Connected-environment experiments', 'Exploratory builds while the capability develops'],
    stage: 'Exploratory · prototype-stage',
  },
];

export type ExplorationIcon = 'waves' | 'cpu' | 'sparkles' | 'database';

export interface Exploration {
  icon: ExplorationIcon;
  title: string;
  body: string;
}

export const explorations: Exploration[] = [
  {
    icon: 'cpu',
    title: 'IoT prototypes',
    body: 'Small connected-device experiments that sense and report on the physical world.',
  },
  {
    icon: 'waves',
    title: 'Connected environments',
    body: 'Exploring how everyday spaces — clinics, workshops, small facilities — can be monitored thoughtfully.',
  },
  {
    icon: 'sparkles',
    title: 'Intelligent automation',
    body: 'Testing where AI-assisted steps genuinely help a workflow, and being honest about where they do not.',
  },
  {
    icon: 'database',
    title: 'Data-driven operations',
    body: 'Turning day-to-day operational data into reports and dashboards people actually read.',
  },
];

export const principles: { title: string; body: string }[] = [
  {
    title: 'Understand the problem.',
    body: 'Start with the people doing the work. We map the real workflow before proposing any tool or technology.',
  },
  {
    title: 'Build what is useful.',
    body: 'Prefer clear, maintainable solutions over impressive-sounding ones. If a simple tool solves it, we build the simple tool.',
  },
  {
    title: 'Keep improving.',
    body: 'Treat each project as a starting point. We ship, observe how it is used, and refine based on what actually happens.',
  },
];

export interface Member {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  /** Optional portrait path, e.g. '/team/founder-name.jpg'. Omit until supplied — card renders a monogram fallback. */
  photo?: string;
  photoAlt?: string;
  linkedin?: string;
  github?: string;
  placeholder: boolean;
}

// Founding team. Only supplied portraits are used; missing imagery stays typographic.
export const team: Member[] = [
  {
    name: 'Vishal N',
    role: 'Founder CEO & COO',
    bio: 'Shapes the product, operating rhythm, and long view of AAZHI — turning complex needs into calm, useful systems.',
    skills: ['Product direction', 'Operations', 'Systems thinking'],
    photo: '/team/Vishal_Prof.jpg',
    photoAlt: 'Portrait of Vishal, co-founder at AAZHI',
    linkedin: '',
    github: '',
    placeholder: false,
  },
  {
    name: 'Anjai',
    role: 'Co-founder · Design & Operations',
    bio: 'Turns working realities into clear interfaces, thoughtful journeys, and delivery systems people can actually live with.',
    skills: ['Interface design', 'Prototyping', 'Delivery'],
    photo: '/team/Anjai.png',
    photoAlt: 'Portrait of Anjai, co-founder at AAZHI',
    linkedin: '',
    github: '',
    placeholder: false,
  },
  {
    name: 'Anish',
    role: 'Co-founder · Strategy & Technology',
    bio: 'Connects the dots between opportunity, technology, and the people a product is meant to serve.',
    skills: ['Strategy', 'Technology', 'Partnerships'],
    photoAlt: 'Portrait forthcoming for Anish, co-founder at AAZHI',
    linkedin: '',
    github: '',
    placeholder: true,
  },
];

export const coreRoles = [
  { title: 'Technical Lead', body: 'Architecture, engineering quality, and the systems behind the experience.' },
  { title: 'Product Lead', body: 'Turning real operational needs into products people can understand and use.' },
  { title: 'Design Lead', body: 'Interface, interaction, and the details that make complexity feel lighter.' },
  { title: 'Marketing Manager', body: 'Making useful work visible, clear, and connected to the right people.' },
  { title: 'Partnerships', body: 'Building thoughtful relationships with clients, collaborators, and communities.' },
  { title: 'Research & Insights', body: 'Finding the signal in messy workflows, data, and emerging opportunities.' },
];

export const projectTypes: string[] = [
  'New digital product',
  'Workflow automation',
  'Data & reporting',
  'Connected system / IoT exploration',
  'Something else',
];

export const socials: { label: string; href: string; icon: string }[] = [
  { label: 'GitHub', href: '', icon: 'github' },
  { label: 'LinkedIn', href: '', icon: 'linkedin' },
];

export const seo = {
  title: 'AAZHI — Technology with purpose.',
  description:
    'AAZHI is an independent technology studio building practical digital solutions — web products, workflow automation, data tools, and connected-system explorations.',
};
