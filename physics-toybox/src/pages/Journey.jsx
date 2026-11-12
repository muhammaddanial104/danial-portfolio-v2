import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Compass, Milestone, Sparkles } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import CharRevealLabel from '../animations/CharRevealLabel.jsx'
import ScrollTextReveal from '../animations/ScrollTextReveal.jsx'
import { journeyData } from '../data/journey.js'

export default function Journey() {
  return (
    <PageTransition className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full">
        {/* Editorial Eyebrow & Headline */}
        <div className="border-b border-brand-purple/15 pb-8 mb-16">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-purple mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse" />
            <CharRevealLabel text="05 // CHRONOLOGICAL EVOLUTION" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
            MY <span className="text-shimmer-violet italic font-display">JOURNEY.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-display text-sm sm:text-base md:text-lg text-brand-lilac/75 leading-relaxed">
            A chronological timeline documenting my progression, key milestones, and ongoing explorations in creative technology.
          </p>
        </div>

        {/* Timeline Sequence */}
        <div className="relative border-l border-brand-purple/25 pl-6 sm:pl-10 ml-3 sm:ml-6 space-y-14">
          {journeyData.map((milestone, idx) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              className="relative"
            >
              {/* Glowing Timeline Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border border-brand-purple/50 bg-[#08070D] shadow-glow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-purple animate-pulse" />
              </div>

              {/* Milestone Card */}
              <div className="rounded-3xl border border-brand-purple/20 bg-obsidian-card/60 p-7 sm:p-9 backdrop-blur-2xl shadow-glass transition-all duration-300 hover:border-brand-purple/50 hover:bg-obsidian-card/80">
                <div className="flex flex-wrap items-center justify-between gap-2 text-brand-lavender font-mono text-xs">
                  <span className="text-lg sm:text-xl font-bold text-white font-editorial tracking-wider">
                    {milestone.year}
                  </span>
                  <span className="rounded-full border border-brand-purple/30 bg-brand-violet/15 px-3 py-0.5 text-brand-lilac text-[10px]">
                    {milestone.subtitle}
                  </span>
                </div>

                <h2 className="mt-3 font-editorial text-2xl sm:text-3xl font-bold text-white">
                  {milestone.title}
                </h2>

                <ScrollTextReveal
                  text={milestone.description}
                  highlightWords={['webgl', 'fluid', 'shaders', 'full-stack', 'react', 'code', 'imagination']}
                  className="mt-3 text-xs sm:text-sm md:text-base text-brand-lilac/80 font-display leading-relaxed"
                />

                <div className="mt-6 pt-5 border-t border-brand-purple/15 space-y-2">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-brand-purple font-semibold">
                    Key Achievements:
                  </span>
                  {milestone.milestones.map((item, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2 text-xs sm:text-sm text-brand-lilac/75 font-display">
                      <span className="text-brand-purple mt-1 text-xs">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
