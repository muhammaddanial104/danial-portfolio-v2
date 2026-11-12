import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Layers, Code2, ArrowUpRight } from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import LiquidWaveBackground from './three/LiquidWaveBackground.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden text-brand-lilac selection:bg-brand-purple selection:text-white">
      {/* Full-Screen Interactive Animated Liquid Wave Background (Layer 0) */}
      <LiquidWaveBackground />

      {/* Global Navigation Header (Layer 50) */}
      <Navbar />

      {/* Main Content (Layer 10 - Above the animated waves) */}
      <main className="relative z-10 w-full max-w-full overflow-x-hidden">
        {/* Section 1: Cinematic Editorial Hero */}
        <Hero />

        {/* Section 2: Philosophy & About (Translucent Frosted Glass) */}
        <section id="about" className="border-t border-brand-purple/15 bg-obsidian-surface/35 backdrop-blur-md py-20 md:py-28 w-full overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full">
            <div className="grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple">
                  02 / PHILOSOPHY & ABOUT
                </span>
                <h2 className="mt-3 font-editorial text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
                  NOT JUST A DEVELOPER. <br />
                  <span className="bg-gradient-to-r from-brand-lavender via-brand-lilac to-white bg-clip-text text-transparent">
                    AN EXPLORER OF WHAT'S POSSIBLE.
                  </span>
                </h2>
              </div>
              <div className="md:col-span-5 rounded-2xl border border-brand-purple/20 bg-obsidian-card/60 p-6 md:p-8 backdrop-blur-xl shadow-glass">
                <p className="font-display text-sm md:text-base leading-relaxed text-brand-lilac/80">
                  Engineering tactile digital experiences where modern WebGL graphics, mathematical shaders, 
                  and resilient frontend architecture coalesce. Every interaction is sculpted to feel organic, reactive, and purposeful.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-brand-lavender/70 border-t border-white/10 pt-4">
                  <span className="flex items-center gap-1.5"><Layers size={13} className="text-brand-purple" /> Systems Architecture</span>
                  <span className="flex items-center gap-1.5"><Code2 size={13} className="text-brand-purple" /> Modern React</span>
                  <span className="flex items-center gap-1.5"><Sparkles size={13} className="text-brand-purple" /> WebGL Shaders</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Selected Works (Glass Cards over Waves) */}
        <section id="projects" className="border-t border-brand-purple/15 py-20 md:py-28 w-full overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-12">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple">
                  03 / SELECTED WORKS
                </span>
                <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white">
                  CURATED <span className="text-brand-purple italic font-display">SYSTEMS.</span>
                </h2>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-lilac/50">
                Phase 5 Development Milestone
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: 'Toolora', desc: 'All-in-one PDF tools platform with instant client-side WebAssembly processing.', tag: 'Web Utility' },
                { title: 'AI Hub', desc: 'Next-generation AI super platform uniting modern generative reasoning models.', tag: 'AI Platform' },
                { title: 'AI Automation', desc: 'Autonomous YouTube & social media workflow orchestrators and media pipelines.', tag: 'Automation' },
              ].map((proj, idx) => (
                <div
                  key={proj.title}
                  className="group relative rounded-2xl border border-brand-purple/20 bg-obsidian-card/60 p-6 md:p-8 backdrop-blur-xl shadow-glass transition-all duration-300 hover:border-brand-purple/50 hover:bg-obsidian-card/85 hover:shadow-glow-sm"
                >
                  <div className="flex items-center justify-between text-brand-lavender font-mono text-[10px]">
                    <span>PROJ // 0{idx + 1}</span>
                    <span className="rounded-full border border-brand-purple/25 bg-brand-violet/10 px-2.5 py-0.5">{proj.tag}</span>
                  </div>
                  <h3 className="mt-5 font-editorial text-2xl font-bold text-white group-hover:text-brand-lilac transition-colors">
                    {proj.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-brand-lilac/75">
                    {proj.desc}
                  </p>
                  <div className="mt-6 flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-brand-purple group-hover:text-brand-lavender">
                    <span>View Case Study</span>
                    <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Skills & Core Arsenal */}
        <section id="skills" className="border-t border-brand-purple/15 bg-obsidian-surface/30 backdrop-blur-md py-20 md:py-28 w-full overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-10">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple">
                  04 / CORE ARSENAL
                </span>
                <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white">
                  SKILLS & <span className="text-brand-lavender italic font-display">CAPABILITIES.</span>
                </h2>
              </div>
              <div id="journey" className="font-mono text-xs uppercase tracking-widest text-brand-lilac/50">
                Skills & Journey Timeline Preview
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {[
                'React', 'JavaScript (ESNext)', 'Tailwind CSS', 'Three.js', 'WebGL / GLSL', 
                'HTML5 / Modern CSS', 'Node.js', 'Express', 'MongoDB', 'GSAP Animation', 
                'React Three Fiber', 'Shader Art'
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-brand-purple/25 bg-obsidian-card/70 px-4 sm:px-5 py-2 font-mono text-xs uppercase tracking-wider text-brand-lilac/90 backdrop-blur-md transition-all hover:border-brand-purple hover:bg-brand-purple/20 hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Contact CTA */}
        <section id="contact" className="border-t border-brand-purple/20 bg-gradient-to-b from-transparent to-obsidian/90 py-24 md:py-32 w-full overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 text-center w-full">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-purple">
              05 / GET IN TOUCH
            </span>
            <h2 className="mt-4 font-editorial text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tight text-white leading-tight">
              HAVE AN IDEA? <br />
              <span className="bg-gradient-to-r from-white via-brand-lilac to-brand-purple bg-clip-text text-transparent">
                LET'S MAKE IT REAL.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-display text-sm sm:text-base md:text-lg text-brand-lilac/80">
              Currently accepting selected freelance commissions, full-time creative engineering opportunities, and 3D interactive web projects.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:contact@danial.dev"
                className="rounded-full bg-white px-8 py-4 font-mono text-xs uppercase tracking-wider font-semibold text-obsidian transition-all hover:bg-brand-lilac hover:shadow-glow-sm"
              >
                contact@danial.dev
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-brand-purple/30 bg-obsidian-card/80 px-8 py-4 font-mono text-xs uppercase tracking-wider text-brand-lilac backdrop-blur-md transition-all hover:border-brand-purple hover:text-white"
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
