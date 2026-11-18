import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, Sparkles, Waves, Compass, Terminal, Layers, CheckCircle2 } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import WordRevealHero from '../animations/WordRevealHero.jsx'
import CharRevealLabel from '../animations/CharRevealLabel.jsx'
import MagneticButton from '../animations/MagneticButton.jsx'
import ScrollTextReveal from '../animations/ScrollTextReveal.jsx'
import { projectsData } from '../data/projects.js'

/**
 * ============================================================================
 * DANIAL® — Home Page Route (/)
 * ============================================================================
 * 
 * 3D WORLD:
 * - Panel 1: Liquid Chrome Waves (Obsidian #08070D & Electric Violet #8B5CF6).
 * 
 * EDITORIAL LAYOUT SECTIONS:
 * 1. Cinematic Hero:
 *    - Word-by-word reveal: "I CREATE DIGITAL WORLDS."
 *    - Status badge: "DANIAL® ARCHIVE — ISSUE 2026.1"
 *    - Editorial mission statement and interactive CTAs
 * 2. Signature Highlights:
 *    - Featured project previews from 10 verified projects
 *    - Prominent link to complete /projects archive
 * 3. Kinetic Editorial Philosophy:
 *    - ScrollTextReveal illuminating developer vision and craftsmanship
 * 4. Multi-World Navigation Portal:
 *    - Direct entry points to About, Skills, and Contact
 */
export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.45,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  }

  // Curate 3 featured projects from the verified list
  const featuredIds = ['devmaple', 'danix-tools', 'mern-internship']
  const featuredProjects = projectsData.filter((p) => featuredIds.includes(p.id))

  return (
    <PageTransition>
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[95vh] flex flex-col justify-between w-full pt-28 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full flex-1 flex flex-col justify-between">
          {/* Top Editorial Eyebrow & Status Tag */}
          <div className="flex items-center justify-between gap-2 border-b border-brand-purple/15 pb-4 md:pb-6 font-mono text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-widest text-brand-lilac/60">
            <div className="flex items-center gap-2 min-w-0">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple" />
              </span>
              <CharRevealLabel text="DANIAL" className="text-brand-lilac truncate font-semibold" delay={0.25} useScrollTrigger={false} />
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="hidden md:inline-block">FULL-STACK & AI DEVELOPER</span>
            </div>
          </div>

          {/* Hero Central Editorial Statement */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="my-auto py-10 md:py-16 max-w-5xl z-10 relative"
          >
            {/* Subtle, soft ambient dark vignette for maximum text contrast against 3D WebGL waves */}
            <div
              className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(8,7,13,0.68)_0%,rgba(8,7,13,0.35)_55%,transparent_80%)] blur-2xl"
              aria-hidden="true"
            />

            {/* Subtitle Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-5 md:mb-7 inline-flex items-center gap-2 rounded-full border border-brand-purple/25 bg-brand-violet/15 px-3.5 py-1.5 backdrop-blur-md"
            >
              <Sparkles size={13} className="text-brand-lavender animate-pulse flex-shrink-0" />
              <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-wider text-brand-lilac">
                Full-Stack Web <span className="text-brand-purple">•</span> MERN Architecture <span className="text-brand-purple">•</span> AI Automation
              </span>
            </motion.div>

            {/* Cinematic Word-by-Word Reveal Headline */}
            <WordRevealHero delay={0.5} className="text-[clamp(2.35rem,8.6vw,8.4rem)]" />

            {/* Descriptive Editorial Paragraph */}
            <motion.p
              variants={itemVariants}
              className="mt-6 md:mt-8 max-w-2xl font-display text-sm sm:text-base md:text-xl leading-relaxed text-[#C4B5FD]"
            >
              Developing full-stack MERN applications, client-side web utilities, and interactive digital experiences. 
              Crafting software that combines clean engineering with memorable visual presence.
            </motion.p>

            {/* Action Buttons: True page routing */}
            <motion.div
              variants={itemVariants}
              className="mt-8 md:mt-11 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <MagneticButton
                to="/projects"
                className="group flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 font-mono text-xs uppercase tracking-wider font-semibold btn-primary"
              >
                <span>Explore {projectsData.length} Projects</span>
                <ArrowDownRight
                  size={15}
                  className="transition-transform duration-300 group-hover:rotate-[-45deg]"
                />
              </MagneticButton>

              <MagneticButton
                to="/about"
                className="group flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-mono text-xs uppercase tracking-wider btn-secondary"
              >
                <span>The Philosophy</span>
                <ArrowUpRight
                  size={14}
                  className="text-brand-purple transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </MagneticButton>

              {/* Interactive hint */}
              <div className="hidden lg:flex items-center gap-2 ml-4 font-mono text-[10px] uppercase tracking-widest text-brand-lilac/50">
                <Waves size={14} className="text-brand-purple animate-pulse" />
                <span>Move cursor to ripple liquid energy waves</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Editorial Specs Bar */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 gap-2 sm:gap-6 border-t border-brand-purple/15 pt-5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-brand-lilac/50 z-10"
          >
            <div>
              <span className="block text-brand-purple font-semibold text-[8px] sm:text-[10px]">01 / DISCIPLINES</span>
              <span className="mt-1 block text-brand-lilac/80 truncate">Full-Stack & AI Automation</span>
            </div>
            <div>
              <span className="block text-brand-purple font-semibold text-[8px] sm:text-[10px]">02 / CORE STACK</span>
              <span className="mt-1 block text-brand-lilac/80 truncate">MERN • Next.js • Python</span>
            </div>
            <div>
              <span className="block text-brand-purple font-semibold text-[8px] sm:text-[10px]">03 / AESTHETIC</span>
              <span className="mt-1 block text-brand-lilac/80 truncate">Dark Obsidian & Violet</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Projects Teaser Section */}
      <section className="border-t border-brand-purple/15 py-24 md:py-32 w-full overflow-hidden bg-obsidian-surface/20 backdrop-blur-sm">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
                <CharRevealLabel text="CURATED PORTFOLIO HIGHLIGHTS" />
              </span>
              <h2 className="mt-3 font-editorial text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white">
                FEATURED <span className="text-shimmer-violet italic font-display">WORKS.</span>
              </h2>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-lavender hover:text-white transition-colors"
            >
              <span>View All {projectsData.length} Projects</span>
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredProjects.map((proj, idx) => (
              <div
                key={proj.id}
                className="group relative rounded-2xl card-glow-border card-glow-stagger bg-obsidian-card/65 p-6 md:p-8 backdrop-blur-xl shadow-glass transition-all duration-300 hover:bg-obsidian-card/85 hover:shadow-[0_0_40px_rgba(139,92,246,0.22)] hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-brand-lavender font-mono text-[10px]">
                    <span className="text-brand-purple font-semibold">PROJECT // {proj.num}</span>
                    <span className="rounded-full border border-brand-purple/25 bg-brand-violet/15 px-2.5 py-0.5">{proj.category}</span>
                  </div>

                  <h3 className="mt-5 font-editorial text-2xl font-bold text-white group-hover:text-brand-lilac transition-colors">
                    {proj.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-brand-lilac/75 font-display">
                    {proj.shortDesc}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {proj.tech.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] text-brand-lilac/80">
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 3 && (
                      <span className="rounded-md border border-brand-purple/20 bg-brand-violet/10 px-1.5 py-0.5 font-mono text-[9px] text-brand-lavender">
                        +{proj.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider ${
                    proj.status === 'Completed'
                      ? 'text-emerald-400'
                      : proj.status === 'Under Development'
                        ? 'text-brand-lilac'
                        : 'text-brand-lavender'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      proj.status === 'Completed'
                        ? 'bg-emerald-400'
                        : proj.status === 'Under Development'
                          ? 'bg-brand-purple animate-pulse'
                          : 'bg-brand-lavender/70'
                    }`} />
                    {proj.status}
                  </span>

                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-brand-purple group-hover:text-brand-lavender transition-colors"
                  >
                    <span>Details</span>
                    <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout Banner */}
          <div className="mt-12 rounded-2xl card-glow-border bg-gradient-to-r from-brand-violet/15 via-obsidian-card/70 to-brand-violet/15 p-6 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h4 className="font-editorial text-lg sm:text-xl font-bold text-white">
                Discover All {projectsData.length} Engineered Projects
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-brand-lilac/70 font-display">
                Explore MERN stack client deliverables, AI guidance engines, developer utilities, and real-time systems with complete architecture breakdowns.
              </p>
            </div>
            <MagneticButton
              to="/projects"
              className="flex-shrink-0 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wider font-semibold btn-primary"
            >
              View Full Archive ({projectsData.length})
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 3. Narrative Portal Teaser */}
      <section className="border-t border-brand-purple/15 py-20 md:py-28 w-full overflow-hidden bg-gradient-to-b from-transparent to-obsidian-surface/40">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-purple flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-purple animate-pulse" />
            <CharRevealLabel text="THE DANIAL® ARCHITECTURE" />
          </span>
          <h2 className="mt-4 font-editorial text-3xl sm:text-4xl md:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight">
            NOT JUST A DEVELOPER. <br />
            <span className="text-shimmer-violet">AN EXPLORER OF WHAT IS POSSIBLE.</span>
          </h2>
          <p className="mt-6 font-display text-sm sm:text-base md:text-lg text-brand-lilac/70 max-w-xl mx-auto leading-relaxed">
            Every digital world in this portfolio is powered by custom WebGL shaders, responsive geometry, and meticulous editorial craft.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <MagneticButton
              to="/about"
              className="rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wider font-semibold btn-primary"
            >
              Read Full Manifesto
            </MagneticButton>
            <MagneticButton
              to="/skills"
              className="rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wider btn-secondary"
            >
              Inspect Core Arsenal
            </MagneticButton>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
