import React from 'react'
import { motion } from 'framer-motion'
import {
  Layout,
  Server,
  Database,
  Code2,
  Network,
  Cpu,
  Palette,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import CharRevealLabel from '../animations/CharRevealLabel.jsx'
import MagneticButton from '../animations/MagneticButton.jsx'
import { skillsData } from '../data/skills.js'

/**
 * ============================================================================
 * DANIAL® — Skills Page Route (/skills)
 * ============================================================================
 * 
 * 3D WORLD:
 * - Panel 3: Digital Network & Energy Grid (1,600+ glowing nodes, vertical light streams).
 * 
 * CONTENT:
 * - 15 technical capabilities structured across 7 foundational disciplines:
 *   1. Frontend Development (HTML, CSS, Bootstrap, Tailwind CSS, JavaScript, React.js, Next.js)
 *   2. Backend Development (Node.js, Express.js, Django)
 *   3. Database (MongoDB)
 *   4. Programming (Python)
 *   5. APIs & Integration (REST APIs)
 *   6. AI & Automation (AI Automation)
 *   7. Design (UI/UX Design)
 * 
 * FACTUAL ACCURACY STANDARDS:
 * - Strictly neutral category descriptions.
 * - No arbitrary percentage bars, years of experience, or unverified mastery badges.
 * - Consistent dark obsidian and electric violet aesthetic.
 */

const iconMap = {
  Layout: Layout,
  Server: Server,
  Database: Database,
  Code: Code2,
  Network: Network,
  Cpu: Cpu,
  Palette: Palette,
}

export default function Skills() {
  const totalSkillsCount = skillsData.reduce((acc, cat) => acc + cat.skills.length, 0)

  return (
    <PageTransition className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full">
        {/* Editorial Eyebrow & Headline */}
        <div className="border-b border-brand-purple/15 pb-8 mb-12">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-purple mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse" />
            <CharRevealLabel text="04 // TECHNICAL PROFICIENCIES" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
            DIGITAL <span className="text-shimmer-violet italic font-display">INTELLIGENCE.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-display text-sm sm:text-base md:text-lg text-brand-lilac/75 leading-relaxed">
            {totalSkillsCount} core technologies structured across {skillsData.length} engineering disciplines — supporting full-stack web platforms, workflow automation, and structured interfaces.
          </p>

          {/* Capability Matrix Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[10px] uppercase tracking-wider text-brand-lilac/70">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-purple/30 bg-brand-violet/15 px-3 py-1 text-brand-lavender">
              <Sparkles size={12} className="text-brand-purple" />
              {skillsData.length} Engineering Domains
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-obsidian-surface/60 px-3 py-1">
              <Layers size={12} className="text-brand-purple" />
              {totalSkillsCount} Core Technologies
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-obsidian-surface/60 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
              Full-Stack & Applied AI Focus
            </span>
          </div>
        </div>

        {/* Skill Matrix Categories */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillsData.map((category, idx) => {
            const IconComponent = iconMap[category.iconName] || Code2
            const isWide = category.skills.length > 4

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className={`rounded-3xl card-glow-border card-glow-stagger bg-obsidian-card/65 p-6 sm:p-8 backdrop-blur-2xl shadow-glass flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_35px_rgba(139,92,246,0.18)] ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-brand-lavender font-mono text-xs">
                      <div className="p-2 rounded-xl bg-brand-violet/25 border border-brand-purple/30 text-brand-purple">
                        <IconComponent size={18} />
                      </div>
                      <span className="font-semibold text-brand-lilac tracking-wider">
                        CLUSTER // {category.clusterId}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-brand-lavender/60 uppercase tracking-widest">
                      {category.skills.length} {category.skills.length === 1 ? 'Skill' : 'Skills'}
                    </span>
                  </div>

                  <h2 className="mt-5 font-editorial text-2xl sm:text-3xl font-bold text-white">
                    {category.category}
                  </h2>
                  <p className="mt-2.5 text-xs sm:text-sm text-brand-lilac/70 leading-relaxed font-display">
                    {category.description}
                  </p>

                  {/* Skills Badges Container */}
                  <div className={`mt-6 ${isWide ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5' : 'space-y-2.5'}`}>
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`group flex items-center justify-between rounded-xl border px-3.5 py-2.5 transition-all duration-300 ${
                          skill.highlight
                            ? 'border-brand-purple/25 bg-obsidian-surface/80 hover:border-brand-purple/60 hover:bg-brand-purple/15'
                            : 'border-white/10 bg-obsidian-surface/40 hover:border-brand-purple/30 hover:bg-brand-purple/10'
                        }`}
                      >
                        <span className={`font-mono text-xs sm:text-sm flex items-center gap-2 ${skill.highlight ? 'text-white font-medium' : 'text-brand-lilac/80'}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${skill.highlight ? 'bg-brand-purple shadow-[0_0_8px_#8B5CF6]' : 'bg-brand-lavender/40'} group-hover:scale-125 transition-transform`} />
                          {skill.name}
                        </span>
                        <span className="rounded-full border border-brand-purple/20 bg-brand-violet/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-brand-lavender/70 group-hover:text-brand-lavender group-hover:border-brand-purple/40 transition-colors">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-brand-lilac/40 uppercase tracking-widest">
                  <span>Domain // {category.category}</span>
                  <span className="text-brand-lavender/60">
                    {category.skills.length} {category.skills.length === 1 ? 'Technology' : 'Technologies'}
                  </span>
                </div>
              </motion.div>
            )
          })}

          {/* Architectural Synthesis Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="rounded-3xl card-glow-border bg-gradient-to-br from-brand-violet/20 via-obsidian-card/80 to-obsidian-card/90 p-6 sm:p-8 backdrop-blur-2xl shadow-glass flex flex-col justify-between col-span-1"
          >
            <div>
              <div className="flex items-center gap-2.5 text-brand-lavender font-mono text-xs">
                <div className="p-2 rounded-xl bg-brand-purple/20 border border-brand-purple/40 text-brand-purple">
                  <Sparkles size={18} />
                </div>
                <span className="font-semibold text-brand-lilac tracking-wider">
                  DISCIPLINE // OVERVIEW
                </span>
              </div>

              <h2 className="mt-5 font-editorial text-2xl sm:text-3xl font-bold text-white">
                Full-Stack Synergy
              </h2>
              <p className="mt-2.5 text-xs sm:text-sm text-brand-lilac/70 leading-relaxed font-display">
                Connecting React, Next.js, and Node.js with Python scripting, database queries, and UI design to build functional modern web applications.
              </p>

              <div className="mt-6 space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between rounded-xl border border-brand-purple/20 bg-brand-violet/10 px-3.5 py-2.5 text-brand-lavender">
                  <span>MERN Stack</span>
                  <span className="text-white font-medium">Web Applications</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-brand-purple/20 bg-brand-violet/10 px-3.5 py-2.5 text-brand-lavender">
                  <span>AI & Automation</span>
                  <span className="text-white font-medium">Workflow Integration</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-brand-purple/20 bg-brand-violet/10 px-3.5 py-2.5 text-brand-lavender">
                  <span>UI/UX Design</span>
                  <span className="text-white font-medium">Interface Layouts</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-purple/20">
              <MagneticButton
                to="/projects"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 font-mono text-xs uppercase tracking-wider btn-primary"
              >
                <span>View Projects Archive</span>
                <ArrowUpRight size={14} />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
