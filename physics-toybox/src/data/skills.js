/**
 * ============================================================================
 * DANIAL® — Centralized Skills & Technical Capabilities Data Store
 * ============================================================================
 * 
 * 15 core technical capabilities structured across 7 engineering categories:
 * - Frontend Development (7)
 * - Backend Development (3)
 * - Database (1)
 * - Programming (1)
 * - APIs & Integration (1)
 * - AI & Automation (1)
 * - Design (1)
 * 
 * Neutral, factual descriptions without arbitrary percentage scores or
 * unverified proficiency claims.
 */

export const skillsData = [
  {
    category: 'Frontend Development',
    clusterId: '01',
    iconName: 'Layout',
    description: 'Building responsive web interfaces, component structures, and styling systems.',
    skills: [
      { name: 'React.js', highlight: true },
      { name: 'Next.js', highlight: true },
      { name: 'JavaScript', highlight: true },
      { name: 'Tailwind CSS', highlight: true },
      { name: 'Bootstrap', highlight: false },
      { name: 'HTML', highlight: false },
      { name: 'CSS', highlight: false },
    ],
  },
  {
    category: 'Backend Development',
    clusterId: '02',
    iconName: 'Server',
    description: 'Server-side application development, routing, and backend logic.',
    skills: [
      { name: 'Node.js', highlight: true },
      { name: 'Express.js', highlight: true },
      { name: 'Django', highlight: false },
    ],
  },
  {
    category: 'Database',
    clusterId: '03',
    iconName: 'Database',
    description: 'Document data modeling, collection structures, and database queries.',
    skills: [
      { name: 'MongoDB', highlight: true },
    ],
  },
  {
    category: 'Programming',
    clusterId: '04',
    iconName: 'Code',
    description: 'General-purpose programming, script automation, and algorithmic logic.',
    skills: [
      { name: 'Python', highlight: true },
    ],
  },
  {
    category: 'APIs & Integration',
    clusterId: '05',
    iconName: 'Network',
    description: 'Developing and consuming structured RESTful HTTP endpoints.',
    skills: [
      { name: 'REST APIs', highlight: true },
    ],
  },
  {
    category: 'AI & Automation',
    clusterId: '06',
    iconName: 'Cpu',
    description: 'Integrating artificial intelligence models and workflow automation tools.',
    skills: [
      { name: 'AI Automation', highlight: true },
    ],
  },
  {
    category: 'Design',
    clusterId: '07',
    iconName: 'Palette',
    description: 'User interface layouts, design hierarchies, and interactive user experience.',
    skills: [
      { name: 'UI/UX Design', highlight: true },
    ],
  },
]
