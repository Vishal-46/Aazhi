/**
 * AAZHI company content for the ported site.
 * Every claim here is honest: real counts, real project, real people.
 * No invented clients, metrics, dates, or achievements.
 */

export const brand = {
  name: 'AAZHI',
  tagline: 'Technology with purpose.',
  email: 'aazhisolutions@gmail.com',
  phone: '+91 80156 28822',
  tel: 'tel:+918015628822',
  location: 'India · working worldwide',
  logo: '/ref/logo.png',
  logoIcon: '/ref/logo-icon.png',
};

export const hero = {
  solid: 'AAZHI',
  outline: 'FOUNDRY',
  sub: 'A small foundry making practical software — the kind that handles registrations, billing, and reports without any fuss.',
  primaryCta: { label: 'Discuss a project', href: '#contact' },
  secondaryCta: { label: 'See our work', href: '#works' },
  proof: 'Founder-led · One system in progress · Replies within days',
};

export const thriving = {
  heading: 'What we do:',
  cards: [
    {
      img: '/ref/cap-1.svg',
      alt: 'Digital products illustration',
      index: '( 01 )',
      text: 'Digital Products',
    },
    {
      img: '/ref/cap-2.svg',
      alt: 'Workflow automation illustration',
      index: '( 02 )',
      text: 'Workflow Automation',
    },
    {
      img: '/ref/cap-2.svg',
      alt: 'Data and intelligence illustration',
      index: '( 03 )',
      text: 'Data & Intelligence',
    },
  ],
};

export const about = {
  heading: 'About Us',
  heroText:
    'AAZHI is a small technology foundry run by its three founders. We make web tools, automations, and data systems for teams that are tired of paper registers and scattered files.',
  slides: [
    {
      name: 'Vishal',
      role: 'Founder & CEO',
      bio: 'Decides what gets built, then builds most of it — database to screen. Likes tools that are simple and last.',
      skills: ['React', 'TypeScript', 'APIs'],
      img: '/ref/team/vishal.jpg',
      alt: 'Portrait of Vishal, co-founder at AAZHI',
    },
    {
      name: 'Anjai',
      role: 'Co-Founder & CTO',
      bio: 'Turns rough needs into clear plans and keeps every build on track, first sketch to launch.',
      skills: ['Design', 'Prototyping', 'Delivery'],
      img: '/ref/team/anjai.png',
      alt: 'Portrait of Anjai, co-founder at AAZHI',
    },
    {
      name: 'Anish',
      role: 'Co-Founder & COO',
      bio: 'First calls, demos, and follow-ups. Full profile and photo coming soon.',
      skills: ['Profile forthcoming'],
      img: '/ref/logo-icon.png',
      alt: 'AAZHI mark, standing in for the third founder portrait',
    },
  ],
  outroText:
    "We're early and deliberate. Most of our time goes into one clinic operations system, demoed with sample data. If that sounds like your kind of problem, write to us.",
};

export const journey = {
  subtitle:
    "Paper books, scattered files, typing the same thing twice — that's the starting point for most teams we talk to. Here's where we are.",
  items: [
    {
      year: 'Phase 01',
      title: 'Noticed a pattern',
      text: 'Almost every small clinic we saw ran on the same setup: one book for registration, another for visits, billing kept apart. Finding anything meant hunting across desks.',
    },
    {
      year: 'Phase 02',
      title: 'Started AAZHI',
      text: "Three of us decided to build the software we'd want to use ourselves — plain tools that do the job and are easy to keep running.",
    },
    {
      year: 'Phase 03',
      title: 'First system',
      text: 'A clinic operations build: registration, records, appointments, prescriptions, billing and admin reading from one record. Shown only with sample data.',
    },
    {
      year: 'Now',
      title: 'This week',
      text: "We're heads-down on that build and take on a few well-scoped projects alongside it. A short email is enough to start.",
    },
  ],
};

export const skills = {
  heading: 'Our Stack',
  mainTitle: 'Technologies & Tools',
  rowLeft: [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'React',
    'Vite',
    'Node.js',
    'REST APIs',
    'Git',
    'GitHub',
    'Responsive UI',
    'Components',
  ],
  rowRight: [
    'Python',
    'SQL',
    'Data Cleanup',
    'Dashboards',
    'Reporting',
    'Automation',
    'Integrations',
    'REST',
    'JSON',
    'Prototyping',
    'IoT',
    'APIs',
  ],
  cards: [
    { icon: '/ref/assets/icons/icons8-react-48.png', number: '01', title: 'React', sub: 'UI LIBRARY' },
    { icon: '/ref/assets/icons/icons8-js-50.png', number: '02', title: 'JavaScript', sub: 'FRONTEND' },
    { icon: '/ref/assets/icons/icons8-python-50.png', number: '03', title: 'Python', sub: 'DATA & AUTOMATION' },
    { icon: '/ref/assets/icons/icons8-mysql-50.png', number: '04', title: 'SQL', sub: 'DATABASES' },
    { icon: '/ref/assets/icons/icons8-html-50.png', number: '05', title: 'HTML5', sub: 'INTERFACE' },
    { icon: '/ref/assets/icons/icons8-css-50.png', number: '06', title: 'CSS3', sub: 'STYLING' },
  ],
};

export const projects = {
  heading: 'Our Work',
  eyebrow: 'SELECTED WORK',
  sub: 'A clinic system still being built, plus room for a few small, well-scoped builds next to it.',
  items: [
    {
      href: '#contact',
      img: '/ref/project-clinic.svg',
      alt: 'Healthcare operations system illustration',
      name: 'Healthcare Operations Management',
      description:
        'Registration, records, appointments, prescriptions, billing and admin — all reading from one record, so nothing gets typed twice. The screens use sample entries, never real patient data.',
      cta: 'Talk to us about this build →',
    },
    {
      href: '#contact',
      img: '/ref/project-next.svg',
      alt: 'Next build slot illustration',
      name: 'Open engagements',
      description:
        'Dashboards, automations, and reporting setups — scoped small, built by the founders, demoed before anything ships.',
      cta: 'Tell us about yours →',
    },
  ],
};

export const team = {
  heading: 'The Team',
  members: [
    {
      name: 'Vishal',
      role: 'Founder & CEO',
      bio: 'Sets what gets built and builds most of it — database to screen. Prefers simple tools that last.',
      skills: ['React & TypeScript', 'API design', 'Systems thinking'],
    },
    {
      name: 'Anjai',
      role: 'Co-Founder & CTO',
      bio: 'Turns rough asks into clear plans and keeps delivery on track, first sketch to launch.',
      skills: ['Interface design', 'Prototyping', 'Delivery'],
    },
    {
      name: 'Anish',
      role: 'Co-Founder & COO',
      bio: 'Leads sales and marketing for AAZHI. Full profile coming soon.',
      skills: ['Profile forthcoming'],
    },
  ],
};

export const contact = {
  heading: 'Get In Touch',
  subtitle: "Tell us what's slowing you down.",
  cards: [
    {
      icon: '/ref/assets/mail.png',
      title: 'Email',
      content: brand.email,
      link: { label: 'Send Email →', href: `mailto:${brand.email}` },
    },
    {
      icon: '/ref/assets/phone.png',
      title: 'Phone',
      content: brand.phone,
      link: { label: 'Call Now →', href: brand.tel },
    },
    {
      icon: '/ref/assets/location.png',
      title: 'Location',
      content: brand.location,
      link: { label: 'More about us →', href: '#about' },
    },
    {
      icon: '/ref/logo-icon.png',
      title: 'Response',
      content: 'We read everything ourselves and reply within a few working days.',
      link: { label: 'Write to us →', href: '#contactForm' },
    },
  ],
  formTitle: 'Send us a message',
  socialTitle: 'Find your way',
};

export const footer = {
  tagline: brand.tagline,
  links: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    // { label: 'Skills', href: '#skills' }, // hidden with the stack section — restore together.
    { label: 'Team', href: '#team' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
};

export const menuLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  // { label: 'Skills', href: '#skills' }, // hidden with the stack section — restore together.
  { label: 'Team', href: '#team' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];
