/**
 * ============================================================================
 * DANIAL® — Centralized Skills & Technical Capabilities Data Store
 * ============================================================================
 * 
 * Technical capabilities structured across foundational engineering categories:
 * - AI & Automation Engineering
 * - Frontend & Mobile Development
 * - Backend Development
 * - Database & Cloud
 * - Programming Languages
 * - APIs & Integration
 * - Design & UI Architecture
 */

export const skillsData = [
  {
    category: 'AI & Automation Engineering',
    clusterId: '01',
    iconName: 'Cpu',
    description: 'Architecting artificial intelligence systems, multi-agent workflows, autonomous agents, and LLM integrations.',
    skills: [
      { name: 'AI Engineer', highlight: true },
      { name: 'Agentic AI', highlight: true },
      { name: 'n8n Agents', highlight: true },
      { name: 'Gen AI', highlight: true },
      { name: 'AI & Automation', highlight: true },
      { name: 'LLM Orchestration', highlight: true },
      { name: 'RAG Architecture (pgvector)', highlight: false },
      { name: 'Groq & OpenAI APIs', highlight: false },
    ],
  },
  {
    category: 'Frontend & Mobile Development',
    clusterId: '02',
    iconName: 'Layout',
    description: 'Building high-performance interactive web apps, 3D WebGL scenes, mobile apps, and design systems.',
    skills: [
      { name: 'React.js', highlight: true },
      { name: 'Next.js', highlight: true },
      { name: 'React Native App Development', highlight: true },
      { name: 'Three.js / React Three Fiber', highlight: true },
      { name: 'Tailwind CSS v4', highlight: true },
      { name: 'Framer Motion', highlight: false },
      { name: 'HTML5 / CSS3', highlight: false },
      { name: 'Bootstrap', highlight: false },
    ],
  },
  {
    category: 'Backend Development',
    clusterId: '03',
    iconName: 'Server',
    description: 'High-throughput server-side architecture, microservices, security headers, and webhook pipelines.',
    skills: [
      { name: 'Node.js', highlight: true },
      { name: 'Express 5', highlight: true },
      { name: 'FastAPI / Python', highlight: true },
      { name: 'Helmet & Rate Limiting', highlight: false },
      { name: 'Django', highlight: false },
    ],
  },
  {
    category: 'Database & Storage',
    clusterId: '04',
    iconName: 'Database',
    description: 'Relational, vector, and document data modeling, indexing, and persistent client-side storage.',
    skills: [
      { name: 'Supabase (PostgreSQL)', highlight: true },
      { name: 'MongoDB', highlight: true },
      { name: 'pgvector (Vector Embeddings)', highlight: true },
      { name: 'IndexedDB', highlight: false },
    ],
  },
  {
    category: 'Programming Languages',
    clusterId: '05',
    iconName: 'Code',
    description: 'Core languages for systems programming, data pipelines, web applications, and algorithms.',
    skills: [
      { name: 'TypeScript', highlight: true },
      { name: 'JavaScript (ES6+)', highlight: true },
      { name: 'Python', highlight: true },
      { name: 'C / C++', highlight: false },
    ],
  },
  {
    category: 'APIs & Integration',
    clusterId: '06',
    iconName: 'Network',
    description: 'Developing, hardening, and integrating modern RESTful APIs, WebSockets, and WhatsApp bots.',
    skills: [
      { name: 'REST APIs', highlight: true },
      { name: 'Baileys WhatsApp Web Automation', highlight: true },
      { name: 'WebSockets', highlight: false },
      { name: 'Web Cryptography API', highlight: false },
    ],
  },
  {
    category: 'Design & UI/UX Architecture',
    clusterId: '07',
    iconName: 'Palette',
    description: '3D interactive spatial layouts, glassmorphism design systems, and responsive user interfaces.',
    skills: [
      { name: 'UI/UX Design', highlight: true },
      { name: '3D WebGL Interactive Worlds', highlight: true },
      { name: 'Design Systems', highlight: false },
    ],
  },
]
