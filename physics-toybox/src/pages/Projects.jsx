import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, CheckCircle2, Terminal, Layers } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import CharRevealLabel from '../animations/CharRevealLabel.jsx'
import ScrollTextReveal from '../animations/ScrollTextReveal.jsx'
import MagneticButton from '../animations/MagneticButton.jsx'
import { projectsData } from '../data/projects.js'

export default function Projects() {
  return (
    <PageTransition className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full">
        {/* Editorial Eyebrow & Headline */}
        <div className="border-b border-brand-purple/15 pb-8 mb-12">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-purple mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse" />
            <CharRevealLabel text="03 // SELECTED WORKS & CASE STUDIES" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
            CURATED <span className="text-shimmer-violet italic font-display">SYSTEMS.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-display text-sm sm:text-base md:text-lg text-brand-lilac/75 leading-relaxed">
            A portfolio of production platforms, autonomous systems, and experimental 3D laboratories.
            Each project is built from scratch with deliberate focus on architectural elegance, speed, and tactile polish.
          </p>
        </div>

        {/* Projects Grid: Glass Cards floating over Digital Universe */}
        <div className="grid gap-8 lg:grid-cols-2">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl border border-brand-purple/20 bg-obsidian-card/65 p-7 sm:p-9 md:p-10 backdrop-blur-2xl shadow-glass transition-all duration-300 hover:border-brand-purple/60 hover:bg-obsidian-card/85 hover:shadow-[0_0_50px_rgba(139,92,246,0.24)] hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Subtle radiant energy beam inside card */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-violet/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div>
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between text-brand-lavender font-mono text-[10px] sm:text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-brand-purple font-semibold">PROJ // 0{idx + 1}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-brand-lilac/70">{project.category}</span>
                  </div>
                  <span className="rounded-full border border-brand-purple/25 bg-brand-violet/15 px-3 py-0.5 text-brand-lilac">
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h2 className="mt-6 font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white group-hover:text-brand-lilac transition-colors">
                  {project.title}
                </h2>

                {/* Animated Scroll Description */}
                <ScrollTextReveal
                  text={project.description}
                  highlightWords={['client-side', 'webassembly', 'privacy', 'reasoning', 'autonomous', 'telemetry', 'shaders', 'physics']}
                  className="mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-brand-lilac/85"
                />

                {/* Core Features */}
                <div className="mt-6 space-y-2.5 border-t border-brand-purple/15 pt-5">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-brand-purple font-semibold">
                    Key Architectural Capabilities:
                  </span>
                  {project.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 font-display text-xs sm:text-sm text-brand-lilac/80">
                      <CheckCircle2 size={13} className="text-brand-purple mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tech Stack & Action */}
              <div className="mt-8 pt-5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-brand-purple/20 bg-brand-purple/10 px-2.5 py-1 font-mono text-[10px] text-brand-lilac/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <MagneticButton
                  href={project.link}
                  className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-brand-purple/20 hover:bg-brand-purple px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition-all shadow-glow-sm"
                >
                  <span>Case Study</span>
                  <ArrowUpRight size={13} />
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Collaboration Prompt */}
        <div className="mt-16 sm:mt-24 rounded-3xl border border-brand-purple/30 bg-gradient-to-r from-brand-violet/20 via-obsidian-card/80 to-brand-purple/20 p-8 sm:p-12 text-center backdrop-blur-xl">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-purple">
            LOOKING FOR CUSTOM ENGINEERING?
          </span>
          <h3 className="mt-3 font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Have a specialized WebGL or web application challenge?
          </h3>
          <div className="mt-6">
            <MagneticButton
              to="/contact"
              className="rounded-full bg-white px-8 py-3.5 font-mono text-xs uppercase tracking-wider font-semibold text-obsidian hover:bg-brand-lilac transition-all shadow-glow-sm"
            >
              Initiate Collaboration
            </MagneticButton>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
