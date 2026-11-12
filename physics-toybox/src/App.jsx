import { useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Volume2, VolumeX, MoveUpRight, Sparkles, Layers, Code2, Award, Terminal } from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import Toybox from './components/Toybox.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [resetKey, setResetKey] = useState(0)
  const [sound, setSound] = useState(false)

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-obsidian text-brand-lilac selection:bg-brand-purple selection:text-white">
      {/* Global Navigation */}
      <Navbar />

      <main className="relative z-10 w-full max-w-full overflow-x-hidden">
        {/* Section 1: Cinematic Editorial Hero */}
        <Hero />

        {/* Section 2: Interactive 3D Physics Toybox (Preserved & Styled for Phase 4) */}
        <section id="toybox" className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 py-16 md:py-28 w-full overflow-hidden">
          <div className="mb-8 md:mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-2 md:mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-lavender">
                <span className="h-2 w-2 rounded-full bg-brand-purple animate-ping" />
                FEATURE 02 // REAL-TIME RAPIER ENGINE
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white">
                PHYSICS <span className="text-brand-purple italic font-display font-medium">TOYBOX.</span>
              </h2>
            </div>
            <p className="max-w-md font-display text-xs sm:text-sm md:text-base leading-relaxed text-brand-lilac/70">
              A tactile sandbox powered by React Three Fiber and real Rapier physics. 
              Collide, throw, and poke floating digital solids in real time.
            </p>
          </div>

          {/* 3D Physics Canvas Container */}
          <div className="relative h-[360px] sm:h-[420px] md:h-[600px] w-full overflow-hidden rounded-[24px] sm:rounded-[32px] border border-brand-purple/20 bg-gradient-to-b from-obsidian-card to-obsidian-surface/90 shadow-glass">
            {/* Preserved Toybox Canvas */}
            <div className="absolute inset-0 z-0">
              <Toybox resetKey={resetKey} />
            </div>

            {/* Top Bar Info */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-5 md:p-8 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-lilac/60">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
                RAPID RIGID-BODY SIMULATION
              </span>
              <span className="hidden sm:inline-block">GRAVITY: -4.5 M/S²</span>
            </div>

            {/* Bottom Left: Interactive Hint */}
            <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 md:bottom-7 md:left-7 z-10 hidden sm:flex items-center gap-2 rounded-full border border-brand-purple/20 bg-obsidian-surface/80 px-3.5 py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-brand-lilac/80 backdrop-blur-md">
              <MoveUpRight size={12} className="text-brand-purple" />
              <span>Cursor / Touch to Collide</span>
            </div>

            {/* Bottom Right: Interactive Controls */}
            <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-7 md:right-7 z-10 flex items-center gap-2">
              <button
                onClick={() => setResetKey((k) => k + 1)}
                aria-label="Reset physics objects"
                title="Reset simulation"
                className="group grid h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 place-items-center rounded-full border border-brand-purple/25 bg-obsidian-surface/85 backdrop-blur-md text-brand-lilac transition-all duration-300 hover:rotate-[-45deg] hover:border-brand-purple hover:bg-brand-purple hover:text-white hover:shadow-glow-sm"
              >
                <RotateCcw size={15} />
              </button>

              <button
                onClick={() => setSound((v) => !v)}
                aria-label="Toggle sound effect placeholder"
                title={sound ? 'Mute' : 'Enable audio feedback'}
                className="grid h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 place-items-center rounded-full border border-brand-purple/25 bg-obsidian-surface/85 backdrop-blur-md text-brand-lilac transition-all duration-300 hover:border-brand-purple hover:bg-brand-purple hover:text-white"
              >
                {sound ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>
            </div>
          </div>
        </section>

        {/* Preview Placeholders for Upcoming Phases (Clear & Honest Roadmap) */}
        <section id="about" className="border-t border-brand-purple/10 bg-obsidian-surface/30 py-16 md:py-20 w-full overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple">
                  03 / PHILOSOPHY & ABOUT
                </span>
                <h2 className="mt-2 md:mt-3 font-editorial text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white">
                  NOT JUST A DEVELOPER. <br />
                  <span className="text-brand-lavender">AN EXPLORER OF WHAT'S POSSIBLE.</span>
                </h2>
              </div>
              <div className="rounded-2xl border border-brand-purple/15 bg-obsidian-card/40 p-5 sm:p-6 backdrop-blur-md">
                <p className="font-display text-xs sm:text-sm md:text-base leading-relaxed text-brand-lilac/70">
                  Crafting hyper-responsive interfaces, 3D digital artifacts, and intelligent automation systems. 
                  Ready for detailed storytelling, interactive experience milestones, and journey highlights in Phase 5.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-lavender/60">
                  <span className="flex items-center gap-1.5"><Layers size={12} /> Architecture</span>
                  <span className="flex items-center gap-1.5"><Code2 size={12} /> Modern React</span>
                  <span className="flex items-center gap-1.5"><Sparkles size={12} /> Three.js</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Projects Preview Anchor */}
        <section id="projects" className="border-t border-brand-purple/10 py-16 md:py-20 w-full overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple">
                  04 / SELECTED WORKS
                </span>
                <h2 className="mt-2 font-editorial text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white">
                  CURATED <span className="text-brand-purple italic font-display">SYSTEMS.</span>
                </h2>
              </div>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brand-lilac/50">
                Phase 5 Development Milestone
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                { title: 'Toolora', desc: 'All-in-one PDF tools platform with instant client-side processing.', tag: 'Web Utility' },
                { title: 'AI Hub', desc: 'Next-generation AI super platform uniting modern generative models.', tag: 'AI Platform' },
                { title: 'AI Automation', desc: 'Automated YouTube & social media workflow orchestrators.', tag: 'Automation' },
              ].map((proj, idx) => (
                <div
                  key={proj.title}
                  className="group relative rounded-2xl border border-brand-purple/15 bg-obsidian-card/50 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-purple/40 hover:bg-obsidian-card"
                >
                  <div className="flex items-center justify-between text-brand-lavender font-mono text-[10px]">
                    <span>PROJ // 0{idx + 1}</span>
                    <span className="rounded-full border border-brand-purple/20 px-2 py-0.5">{proj.tag}</span>
                  </div>
                  <h3 className="mt-3 sm:mt-4 font-editorial text-xl sm:text-2xl font-bold text-white group-hover:text-brand-lilac">
                    {proj.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-brand-lilac/70">
                    {proj.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Journey Preview Anchor */}
        <section id="skills" className="border-t border-brand-purple/10 bg-obsidian-surface/20 py-16 md:py-20 w-full overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-10">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple">
                  05 / CORE ARSENAL
                </span>
                <h2 className="mt-2 font-editorial text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white">
                  SKILLS & <span className="text-brand-lavender italic font-display">CAPABILITIES.</span>
                </h2>
              </div>
              <div id="journey" className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brand-lilac/50">
                Skills & Journey Timeline Preview
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {[
                'React', 'JavaScript', 'Tailwind CSS', 'Three.js', 'HTML / CSS', 
                'Node.js', 'Express', 'MongoDB', 'GSAP', 'React Three Fiber', 'Rapier'
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-brand-purple/20 bg-obsidian-card/60 px-3.5 sm:px-4 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-brand-lilac/90 backdrop-blur-md hover:border-brand-purple hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section Anchor */}
        <section id="contact" className="border-t border-brand-purple/15 bg-gradient-to-b from-obsidian to-obsidian-surface py-20 md:py-24 w-full overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 text-center w-full">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brand-purple">
              06 / GET IN TOUCH
            </span>
            <h2 className="mt-3 md:mt-4 font-editorial text-3xl sm:text-4xl md:text-7xl font-extrabold tracking-tight text-white">
              HAVE AN IDEA? <br />
              <span className="bg-gradient-to-r from-brand-lilac via-brand-purple to-brand-violet bg-clip-text text-transparent">
                LET'S MAKE IT REAL.
              </span>
            </h2>
            <p className="mx-auto mt-4 md:mt-6 max-w-lg font-display text-xs sm:text-sm md:text-base text-brand-lilac/70">
              Currently accepting selected freelance commissions, full-time creative engineering opportunities, and 3D web collaborations.
            </p>
            <div className="mt-8 md:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href="mailto:contact@danial.dev"
                className="rounded-full bg-white px-6 sm:px-8 py-3 sm:py-3.5 font-mono text-xs uppercase tracking-wider font-semibold text-obsidian transition-all hover:bg-brand-lilac hover:shadow-glow-sm"
              >
                contact@danial.dev
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-brand-purple/30 bg-obsidian-surface px-6 sm:px-8 py-3 sm:py-3.5 font-mono text-xs uppercase tracking-wider text-brand-lilac transition-all hover:border-brand-purple hover:text-white"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}
