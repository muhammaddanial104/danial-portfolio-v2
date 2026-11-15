/**
 * ============================================================================
 * DANIAL® — Centralized Skills & Technical Capabilities Data Store
 * ============================================================================
 * 
 * Technical capabilities structured across 7 foundational engineering categories:
 * - Frontend Development
 * - Backend Development
 * - Database
 * - Programming Languages
 * - APIs & Integration
 * - AI & Automation Engineering
 * - Design
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
      { name: 'Tailwind CSS', highlight: true },
      { name: 'Bootstrap', highlight: false },
      { name: 'HTML5', highlight: false },
      { name: 'CSS3', highlight: false },
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
    category: 'Programming Languages',
    clusterId: '04',
    iconName: 'Code',
    description: 'Core languages for systems programming, data pipelines, and application engineering.',
    skills: [
      { name: 'Python', highlight: true },
      { name: 'JavaScript (ES6+)', highlight: true },
      { name: 'TypeScript', highlight: true },
      { name: 'C / C++', highlight: false },
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
    category: 'AI & Automation Engineering',
    clusterId: '06',
    iconName: 'Cpu',
    description: 'Architecting artificial intelligence solutions, workflow automations, and LLM integrations.',
    skills: [
      { name: 'AI Engineering', highlight: true },
      { name: 'AI Automation', highlight: true },
      { name: 'Agentic Workflows', highlight: true },
      { name: 'LLM Orchestration', highlight: false },
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
