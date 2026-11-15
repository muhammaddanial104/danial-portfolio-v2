import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  X,
  Info,
  Filter,
} from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import CharRevealLabel from '../animations/CharRevealLabel.jsx'
import ScrollTextReveal from '../animations/ScrollTextReveal.jsx'
import MagneticButton from '../animations/MagneticButton.jsx'
import { projectsData } from '../data/projects.js'

/**
 * ============================================================================
 * DANIAL® — Projects Page Route (/projects)
 * ============================================================================
 * 
 * 3D WORLD:
 * - Panel 2: Particle Universe & Dynamic Constellations (interactive nodes,
 *   geometric connection lines, stellar depth).
 * 
 * CONTENT:
 * - 10 curated projects spanning Full-Stack MERN applications, AI platforms,
 *   autonomous systems, client-side document processing, and developer utilities.
 * - Category filter tabs (All, Full-Stack, AI & Automation, Web Utility).
 * - Editorial project cards with status badges, verified tech tags, and
 *   an interactive full case study modal dialog.
 */

const FILTER_TABS = [
  { id: 'all', label: 'All Projects', count: projectsData.length },
  { id: 'fullstack', label: 'Full-Stack', count: projectsData.filter((p) => p.filterCategory === 'fullstack').length },
  { id: 'ai', label: 'AI & Automation', count: projectsData.filter((p) => p.filterCategory === 'ai').length },
  { id: 'utility', label: 'Web Utility', count: projectsData.filter((p) => p.filterCategory === 'utility').length },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [linkNotice, setLinkNotice] = useState(null)

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
        setLinkNotice(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Filter projects based on active tab
  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.filterCategory === activeFilter)

  const handleActionClick = (e, project, type) => {
    e.stopPropagation()
    const url = type === 'live' ? project.liveUrl : project.githubUrl
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      setLinkNotice({
        projectTitle: project.title,
        type,
        message: type === 'live'
          ? (project.status === 'Completed'
              ? 'Live deployment is available upon request (internal client or local release).'
              : (project.status === 'Under Development' || project.status === 'In Progress')
                ? 'Application under active development. Live deployment in progress.'
                : 'Project in development roadmap / upcoming release.')
          : (project.repoStatus || 'Repository access is private or pending release.'),
      })
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-[11px] font-mono text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Completed
          </span>
        )
      case 'Under Development':
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-purple/35 bg-brand-purple/15 px-3 py-0.5 text-[11px] font-mono text-brand-lilac">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse" />
            Under Development
          </span>
        )
      case 'Upcoming':
      case 'Concept':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-lavender/30 bg-brand-lavender/10 px-3 py-0.5 text-[11px] font-mono text-brand-lavender">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-lavender/70" />
            Upcoming
          </span>
        )
    }
  }

  return (
    <PageTransition className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full">
        {/* Editorial Eyebrow & Headline */}
        <div className="border-b border-brand-purple/15 pb-8 mb-10">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-purple mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse" />
            <CharRevealLabel text="03 // SELECTED WORKS & CASE STUDIES" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
            CURATED <span className="text-shimmer-violet italic font-display">SYSTEMS.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-display text-sm sm:text-base md:text-lg text-brand-lilac/75 leading-relaxed">
            A curated portfolio of 10 full-stack applications, client-side web utilities, and AI system concepts. Built with focus on clean architecture, performance, and tactile elegance.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <span className="flex items-center gap-1.5 font-mono text-xs text-brand-lilac/50 mr-2">
              <Filter size={13} className="text-brand-purple" />
              <span>Filter:</span>
            </span>
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'btn-primary border border-[#8B5CF6]'
                      : 'btn-secondary text-brand-lilac/90'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] rounded-full px-1.5 py-0.2 ${isActive ? 'bg-[#08070D]/15 text-[#08070D] font-bold' : 'bg-[#6D28D9]/40 text-[#A78BFA]'}`}>
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 10 Projects Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl card-glow-border card-glow-stagger bg-obsidian-card/65 p-7 sm:p-9 md:p-10 backdrop-blur-2xl shadow-glass transition-all duration-300 hover:bg-obsidian-card/85 hover:shadow-[0_0_50px_rgba(139,92,246,0.22)] hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Subtle ambient radiant glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-violet/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div>
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between text-brand-lavender font-mono text-[10px] sm:text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-brand-purple font-semibold font-mono">PROJ // {project.num}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-brand-lilac/70">{project.category}</span>
                  </div>
                  <div>{getStatusBadge(project.status)}</div>
                </div>

                {/* Project Title */}
                <h2 className="mt-5 font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white group-hover:text-brand-lilac transition-colors">
                  {project.title}
                </h2>

                {/* Short Description */}
                <ScrollTextReveal
                  text={project.shortDesc}
                  highlightWords={['production-grade', 'client-side', 'real-time', 'intelligent', 'all-in-one', 'generative', 'full-stack', 'pdf']}
                  className="mt-3.5 text-xs sm:text-sm md:text-base leading-relaxed text-brand-lilac/85"
                />

                {/* Key Capabilities List */}
                <div className="mt-6 space-y-2 border-t border-brand-purple/15 pt-5">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-brand-purple font-semibold">
                    Key Capabilities:
                  </span>
                  {project.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 font-display text-xs sm:text-sm text-brand-lilac/80">
                      <CheckCircle2 size={13} className="text-brand-purple mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tech Stack & Action Links */}
              <div className="mt-8 pt-5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-brand-purple/20 bg-brand-purple/10 px-2 py-0.5 font-mono text-[10px] text-brand-lilac/90"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="rounded-md border border-brand-purple/15 bg-obsidian-surface/60 px-2 py-0.5 font-mono text-[10px] text-brand-lavender/60">
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {/* View Details interaction button */}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider btn-primary"
                  >
                    <span>View Details</span>
                    <ArrowUpRight size={13} />
                  </button>

                  {/* External links for completed builds */}
                  {project.status === 'Completed' && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => handleActionClick(e, project, 'github')}
                        title="View GitHub Repository"
                        className="p-1.5 rounded-full btn-icon text-brand-lilac/80"
                        aria-label={`GitHub link for ${project.title}`}
                      >
                        <Github size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleActionClick(e, project, 'live')}
                        title="Open Live Demonstration"
                        className="p-1.5 rounded-full btn-icon text-brand-lilac/80"
                        aria-label={`Live Demo link for ${project.title}`}
                      >
                        <ExternalLink size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal: Full Project Details Dialog */}
        <AnimatePresence>
          {selectedProject && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-obsidian/85 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-brand-purple/40 bg-obsidian-card p-6 sm:p-8 md:p-10 shadow-[0_0_80px_rgba(139,92,246,0.3)] text-left"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 rounded-full btn-icon"
                  aria-label="Close project modal"
                >
                  <X size={16} />
                </button>

                {/* Eyebrow & Status */}
                <div className="flex items-center gap-3 text-brand-lavender font-mono text-xs">
                  <span className="text-brand-purple font-semibold">PROJECT // {selectedProject.num}</span>
                  <span className="text-white/20">•</span>
                  <span>{selectedProject.category}</span>
                  <div className="ml-auto mr-10 sm:mr-8">{getStatusBadge(selectedProject.status)}</div>
                </div>

                {/* Title */}
                <h3 id="modal-project-title" className="mt-4 font-editorial text-3xl sm:text-4xl font-bold text-white">
                  {selectedProject.title}
                </h3>

                {/* Full Description */}
                <p className="mt-4 font-display text-sm sm:text-base text-brand-lilac/90 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Key Features & Architectural Scope */}
                <div className="mt-6 rounded-2xl border border-brand-purple/20 bg-obsidian-surface/60 p-5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-brand-purple font-semibold mb-3">
                    Key Features & Capabilities
                  </h4>
                  <div className="space-y-2.5">
                    {selectedProject.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-lilac/85 font-display">
                        <CheckCircle2 size={14} className="text-brand-purple mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="mt-6">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-brand-purple font-semibold mb-2.5">
                    Technology Stack & Tooling
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-brand-purple/25 bg-brand-purple/15 px-3 py-1 font-mono text-xs text-brand-lilac"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verification & Repository Notice */}
                <div className="mt-6 pt-5 border-t border-brand-purple/15 flex items-start gap-3 text-xs text-brand-lilac/70 font-mono">
                  <Info size={15} className="text-brand-lavender mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-brand-lavender">Status Note: </span>
                    <span>{selectedProject.verifiedNotes}</span>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {selectedProject.status === 'Completed' ? (
                      <>
                        <button
                          type="button"
                          onClick={(e) => handleActionClick(e, selectedProject, 'live')}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider btn-primary"
                        >
                          <ExternalLink size={13} />
                          <span>Live Demo</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleActionClick(e, selectedProject, 'github')}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider btn-secondary"
                        >
                          <Github size={13} />
                          <span>Repository</span>
                        </button>
                      </>
                    ) : (selectedProject.status === 'Under Development' || selectedProject.status === 'In Progress') ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-2 font-mono text-xs text-brand-lilac">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse" />
                        Under Active Development
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-brand-lavender/30 bg-brand-lavender/10 px-4 py-2 font-mono text-xs text-brand-lavender">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-lavender/70" />
                        Upcoming Platform
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider btn-secondary text-center"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Action Link Notice Dialog (for projects where repository or live link is private/in-progress) */}
        <AnimatePresence>
          {linkNotice && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-md"
              onClick={() => setLinkNotice(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md rounded-2xl border border-brand-purple/40 bg-obsidian-card p-6 shadow-glass text-left"
              >
                <div className="flex items-center justify-between pb-3 border-b border-brand-purple/15">
                  <span className="font-mono text-xs text-brand-purple uppercase tracking-wider">
                    {linkNotice.type === 'live' ? 'Deployment Status' : 'Repository Status'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLinkNotice(null)}
                    className="p-1 rounded-full btn-icon text-brand-lilac/80"
                    aria-label="Close status notice"
                  >
                    <X size={15} />
                  </button>
                </div>
                <h4 className="mt-3 font-editorial text-lg font-bold text-white">
                  {linkNotice.projectTitle}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-brand-lilac/80 font-display leading-relaxed">
                  {linkNotice.message}
                </p>
                <div className="mt-5 text-right">
                  <button
                    type="button"
                    onClick={() => setLinkNotice(null)}
                    className="px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider btn-primary"
                  >
                    Understood
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Collaboration Prompt */}
        <div className="mt-16 sm:mt-24 rounded-3xl card-glow-border bg-gradient-to-r from-brand-violet/20 via-obsidian-card/80 to-brand-purple/20 p-8 sm:p-12 text-center backdrop-blur-xl">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-purple">
            LOOKING FOR CUSTOM ENGINEERING?
          </span>
          <h3 className="mt-3 font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Have a specialized web application or AI challenge?
          </h3>
          <div className="mt-6">
            <MagneticButton
              to="/contact"
              className="rounded-full px-8 py-3.5 font-mono text-xs uppercase tracking-wider font-semibold btn-primary"
            >
              Initiate Collaboration
            </MagneticButton>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
