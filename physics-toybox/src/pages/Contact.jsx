import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, ArrowUpRight, MessageSquare, Sparkles, Send } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import CharRevealLabel from '../animations/CharRevealLabel.jsx'
import ScrollTextReveal from '../animations/ScrollTextReveal.jsx'
import MagneticButton from '../animations/MagneticButton.jsx'

/**
 * ============================================================================
 * DANIAL® — Contact Page Route (/contact)
 * ============================================================================
 * 
 * 3D WORLD:
 * - Panel 6: Concentric Energy Portal Rings (nested pulsating arcs, glossy
 *   reflective obsidian stage, laser pillars, rising sparks).
 * 
 * CONTENT:
 * - Direct contact triggers: email inquiry CTA with magnetic interaction.
 * - Live channels: GitHub profile, status beacon ("Available for Q1/Q2 2026").
 * - Obsidian glass communication card with encrypted transmission styling.
 */
export default function Contact() {
  return (
    <PageTransition className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full text-center">
        {/* Eyebrow */}
        <span className="font-mono text-xs uppercase tracking-widest text-brand-purple flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-purple animate-ping" />
          <CharRevealLabel text="06 // INITIATE COLLABORATION" />
        </span>

        {/* Big Impact Headline */}
        <h1 className="mt-5 font-editorial text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-tight">
          HAVE AN IDEA? <br />
          <span className="text-shimmer-violet">
            LET'S MAKE IT REAL.
          </span>
        </h1>

        <ScrollTextReveal
          text="Currently accepting selected commissions, full-time creative engineering opportunities, and 3D interactive web projects."
          highlightWords={['commissions', 'creative', 'engineering', '3d', 'interactive']}
          className="mx-auto mt-6 max-w-xl font-display text-sm sm:text-base md:text-xl text-brand-lilac/80"
        />

        {/* Direct Contact Actions */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <MagneticButton
            href="mailto:contact@danial.dev"
            className="rounded-full bg-white px-8 py-4 font-mono text-xs uppercase tracking-wider font-semibold text-obsidian transition-all duration-300 hover:bg-brand-lilac hover:shadow-glow-sm"
          >
            <span>contact@danial.dev</span>
          </MagneticButton>

          <MagneticButton
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-brand-purple/30 bg-obsidian-card/80 px-8 py-4 font-mono text-xs uppercase tracking-wider text-brand-lilac backdrop-blur-md transition-all duration-300 hover:border-brand-purple hover:text-white"
          >
            <Github size={14} className="mr-2" />
            <span>GitHub Profile</span>
          </MagneticButton>
        </div>

        {/* Collaboration Focus Cards */}
        <div className="mt-20 grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto text-left">
          {[
            {
              title: '3D & WebGL Experiences',
              desc: 'Custom shader development, Three.js scenes, product launches, and tactile animations.',
            },
            {
              title: 'Full-Stack Web Apps',
              desc: 'High-performance React frontends paired with robust Node.js and Express backend architectures.',
            },
            {
              title: 'Design System & UI/UX',
              desc: 'Editorial typography, responsive layouts, dark obsidian themes, and smooth micro-interactions.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-brand-purple/20 bg-obsidian-card/60 p-6 backdrop-blur-xl shadow-glass"
            >
              <div className="font-mono text-[10px] text-brand-purple uppercase">SERVICE // 0{idx + 1}</div>
              <h3 className="mt-3 font-editorial text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 font-display text-xs sm:text-sm text-brand-lilac/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
