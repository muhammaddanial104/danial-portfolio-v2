import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, Code2, Database, Terminal, ArrowUpRight } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import CharRevealLabel from '../animations/CharRevealLabel.jsx'
import MagneticButton from '../animations/MagneticButton.jsx'
import { skillsData } from '../data/skills.js'

export default function Skills() {
  return (
    <PageTransition className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full">
        {/* Editorial Eyebrow & Headline */}
        <div className="border-b border-brand-purple/15 pb-8 mb-12">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-purple mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse" />
            <CharRevealLabel text="04 // CORE ARSENAL & PROFICIENCIES" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
            DIGITAL <span className="text-shimmer-violet italic font-display">INTELLIGENCE.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-display text-sm sm:text-base md:text-lg text-brand-lilac/75 leading-relaxed">
            The technical tools, mathematical frameworks, and engineering disciplines utilized to build tactile, immersive software.
          </p>
        </div>

        {/* Skill Matrix Categories */}
        <div className="grid gap-8 lg:grid-cols-3">
          {skillsData.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="rounded-3xl border border-brand-purple/20 bg-obsidian-card/65 p-7 sm:p-9 backdrop-blur-2xl shadow-glass flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 text-brand-lavender font-mono text-xs">
                  {idx === 0 ? <Cpu size={18} className="text-brand-purple" /> : idx === 1 ? <Code2 size={18} className="text-brand-purple" /> : <Database size={18} className="text-brand-purple" />}
                  <span className="font-semibold text-brand-lilac">CLUSTER // 0{idx + 1}</span>
                </div>

                <h2 className="mt-4 font-editorial text-2xl sm:text-3xl font-bold text-white">
                  {category.category}
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-brand-lilac/70 leading-relaxed font-display">
                  {category.description}
                </p>

                {/* Skills Badges */}
                <div className="mt-8 space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex items-center justify-between rounded-xl border border-brand-purple/15 bg-obsidian-surface/60 px-4 py-3 transition-all duration-300 hover:border-brand-purple/50 hover:bg-brand-purple/10"
                    >
                      <span className={`font-mono text-xs sm:text-sm ${skill.highlight ? 'text-white font-medium' : 'text-brand-lilac/80'}`}>
                        {skill.name}
                      </span>
                      <span className="rounded-full border border-brand-purple/25 bg-brand-violet/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-brand-lavender">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/5 font-mono text-[10px] text-brand-lilac/40 uppercase tracking-widest text-right">
                Verified Proficiency
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
