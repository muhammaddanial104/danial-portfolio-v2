import React from 'react'
import { motion } from 'framer-motion'
import {
  Compass,
  Sparkles,
  Layers,
  Cpu,
  Palette,
  Terminal,
  Code2,
  ArrowUpRight
} from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import CharRevealLabel from '../animations/CharRevealLabel.jsx'
import ScrollTextReveal from '../animations/ScrollTextReveal.jsx'
import MagneticButton from '../animations/MagneticButton.jsx'

/**
 * ============================================================================
 * DANIAL® — About Page Route (/about)
 * ============================================================================
 * 
 * 3D WORLD:
 * - Panel 4: Cosmic Violet Aurora & Nebulae (atmospheric drifting curtains).
 * 
 * CONTENT:
 * - Editorial headline: "NOT JUST A DEVELOPER. AN EXPLORER OF WHAT IS POSSIBLE."
 * - Factually grounded narrative:
 *   • Full-stack web development & MERN applications
 *   • BS in Robotics & Autonomous Systems foundation
 *   • ITS Gujrat 6-month software engineering internship client deliverables
 *   • AI-powered applications & workflow automation
 *   • Interactive web experiences & UI/UX design
 * - Identity card & telemetry.
 */
export default function About() {
  return (
    <PageTransition className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full">
        {/* Editorial Eyebrow & Headline */}
        <div className="border-b border-brand-purple/15 pb-8 mb-12">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-purple mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse" />
            <CharRevealLabel text="02 // PHILOSOPHY & ETHOS" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
            NOT JUST A DEVELOPER. <br />
            <span className="text-shimmer-violet italic font-display">AN EXPLORER OF WHAT IS POSSIBLE.</span>
          </h1>
        </div>

        {/* Narrative Columns */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Column: Personal Statement & Manifesto */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-3xl card-glow-border bg-obsidian-card/65 p-8 sm:p-10 backdrop-blur-2xl shadow-glass">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-lavender block mb-4">
                THE STUDIO MANIFESTO
              </span>
              <ScrollTextReveal
                text="In an industry increasingly filled with repetitive, templated layouts, we sculpt digital environments with tactile physics, intelligent automation, and robust full-stack architecture. Every system is built to evoke wonder and deliver performance."
                highlightWords={['templated', 'sculpt', 'environments', 'tactile', 'automation', 'architecture', 'wonder', 'performance']}
                className="text-lg sm:text-2xl font-editorial font-bold text-white leading-snug"
              />
              <p className="mt-6 font-display text-sm sm:text-base leading-relaxed text-brand-lilac/75">
                My work centers on AI engineering, autonomous workflow automation, and full-stack MERN development. With a foundation in Robotics & Autonomous Systems and software engineering internship experience developing MERN e-commerce platforms at ITS Gujrat (March–August 2024), I engineer software with a focus on clean logic, user privacy, and dependable performance.
              </p>
              <p className="mt-3 font-display text-sm sm:text-base leading-relaxed text-brand-lilac/75">
                From developing client-side document utilities like Toolora and Danix Tools to prototyping conversational AI platforms and interactive WebGL shaders, the goal remains singular: engineer software that is practical, accessible, and memorable.
              </p>
            </div>

            {/* Core Competencies 2x2 Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl card-glow-border card-glow-stagger bg-obsidian-card/50 p-6 backdrop-blur-xl">
                <Layers className="text-brand-purple mb-3" size={20} />
                <h3 className="font-editorial text-lg font-bold text-white">Full-Stack & MERN</h3>
                <p className="mt-2 text-xs sm:text-sm text-brand-lilac/70 leading-relaxed">
                  End-to-end web engineering with React, Node.js, Express, and MongoDB. Secure, API-driven architectures with role-based access control.
                </p>
              </div>

              <div className="rounded-2xl card-glow-border card-glow-stagger bg-obsidian-card/50 p-6 backdrop-blur-xl">
                <Cpu className="text-brand-lavender mb-3" size={20} />
                <h3 className="font-editorial text-lg font-bold text-white">AI Engineering & Automation</h3>
                <p className="mt-2 text-xs sm:text-sm text-brand-lilac/70 leading-relaxed">
                  Architecting intelligent AI automations, agentic workflows, conversational LLM interfaces, and custom Python scripts that streamline repetitive operations.
                </p>
              </div>

              <div className="rounded-2xl card-glow-border card-glow-stagger bg-obsidian-card/50 p-6 backdrop-blur-xl">
                <Sparkles className="text-brand-purple mb-3" size={20} />
                <h3 className="font-editorial text-lg font-bold text-white">Interactive Experiences</h3>
                <p className="mt-2 text-xs sm:text-sm text-brand-lilac/70 leading-relaxed">
                  Infusing web interfaces with real-time WebGL canvas shaders, fluid dynamics, and smooth, responsive micro-interactions.
                </p>
              </div>

              <div className="rounded-2xl card-glow-border card-glow-stagger bg-obsidian-card/50 p-6 backdrop-blur-xl">
                <Palette className="text-brand-lavender mb-3" size={20} />
                <h3 className="font-editorial text-lg font-bold text-white">UI/UX & Design Systems</h3>
                <p className="mt-2 text-xs sm:text-sm text-brand-lilac/70 leading-relaxed">
                  Designing cohesive typography, dark obsidian visual themes, and accessible component structures that prioritize usability.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Identity Card & Discipline Overview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl card-glow-border bg-gradient-to-b from-brand-violet/20 via-obsidian-card/80 to-obsidian-card/90 p-8 backdrop-blur-2xl shadow-glass">
              <div className="flex items-center justify-between pb-6 border-b border-brand-purple/20">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-purple to-brand-violet font-mono text-lg font-bold text-white shadow-glow-sm">
                    D
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl font-bold text-white">DANIAL®</h3>
                    <span className="font-mono text-[10px] text-brand-purple uppercase tracking-wider">
                      AI Engineer & Full-Stack Developer
                    </span>
                  </div>
                </div>
                <span className="rounded-full border border-brand-purple/30 bg-brand-purple/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-brand-lavender">
                  Active
                </span>
              </div>

              <div className="mt-6 space-y-4 font-mono text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-brand-lilac/50">LOCATION:</span>
                  <span className="text-white">Gujrat, Pakistan</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-brand-lilac/50">PRIMARY FOCUS:</span>
                  <span className="text-brand-lavender">AI Engineering, AI Automation & Full-Stack</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-brand-lilac/50">EXPERTISE:</span>
                  <span className="text-white">Web Utilities & UI/UX</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-brand-lilac/50">PHILOSOPHY:</span>
                  <span className="text-white">Form + Function in Harmony</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-brand-lilac/50">COLLABORATION:</span>
                  <span className="text-brand-purple font-semibold">Available for Select Projects</span>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <MagneticButton
                  to="/contact"
                  className="w-full rounded-xl py-3.5 font-mono text-xs uppercase tracking-wider btn-primary text-center"
                >
                  Initiate Discussion
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
