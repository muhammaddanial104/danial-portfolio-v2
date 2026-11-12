import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Sparkles, Waves } from 'lucide-react'
import WordRevealHero from '../animations/WordRevealHero.jsx'
import CharRevealLabel from '../animations/CharRevealLabel.jsx'
import MagneticButton from '../animations/MagneticButton.jsx'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
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

  return (
    <section id="top" className="relative min-h-[95vh] flex flex-col justify-between w-full pt-28 pb-12 md:pt-40 md:pb-16 overflow-hidden">
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full flex-1 flex flex-col justify-between">
        {/* Top Editorial Eyebrow & Status Tag */}
        <div className="flex items-center justify-between gap-2 border-b border-brand-purple/15 pb-4 md:pb-6 font-mono text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-widest text-brand-lilac/60">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple" />
            </span>
            <CharRevealLabel text="DANIAL® ARCHIVE — ISSUE 2026.1" className="text-brand-lilac truncate" />
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="hidden md:inline-block">CREATIVE TECHNOLOGIST & WEBGL ARTIST</span>
            <span className="hidden sm:inline-block text-brand-lavender">[ 51.5074° N, 0.1278° W ]</span>
          </div>
        </div>

        {/* Hero Central Editorial Statement */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="my-auto py-10 md:py-16 max-w-5xl z-10"
        >
          {/* Subtitle Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-5 md:mb-7 inline-flex items-center gap-2 rounded-full border border-brand-purple/25 bg-brand-violet/15 px-3.5 py-1.5 backdrop-blur-md"
          >
            <Sparkles size={13} className="text-brand-lavender animate-pulse flex-shrink-0" />
            <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-wider text-brand-lilac">
              Creative Developer <span className="text-brand-purple">•</span> Interactive Experiences <span className="text-brand-purple">•</span> 3D Web
            </span>
          </motion.div>

          {/* Cinematic Word-by-Word Reveal Headline */}
          <WordRevealHero className="text-[clamp(2.9rem,8.6vw,8.4rem)]" />

          {/* Descriptive Editorial Paragraph */}
          <motion.p
            variants={itemVariants}
            className="mt-6 md:mt-8 max-w-2xl font-display text-sm sm:text-base md:text-xl leading-relaxed text-brand-lilac/80"
          >
            Merging contemporary editorial design with real-time WebGL, fluid simulation, and generative code. 
            Crafting digital art and scalable applications that provoke wonder, tactile curiosity, and unforgettable presence.
          </motion.p>

          {/* Action Buttons: Magnetic interactions on desktop */}
          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-11 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <MagneticButton
              href="#projects"
              className="group flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-mono text-xs uppercase tracking-wider font-semibold text-obsidian transition-all duration-300 hover:bg-brand-lilac hover:shadow-glow-sm"
            >
              <span>Selected Works</span>
              <ArrowDownRight
                size={15}
                className="transition-transform duration-300 group-hover:rotate-[-45deg]"
              />
            </MagneticButton>

            <MagneticButton
              href="#about"
              className="group flex items-center justify-center gap-2 rounded-full border border-brand-purple/30 bg-obsidian-surface/60 px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-brand-lilac backdrop-blur-md transition-all duration-300 hover:border-brand-purple hover:bg-brand-purple/20 hover:text-white"
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
              <span>Stir with cursor to ripple liquid waves</span>
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
            <span className="block text-brand-purple font-semibold text-[8px] sm:text-[10px]">01 / MEDIUM</span>
            <span className="mt-1 block text-brand-lilac/80 truncate">WebGL & GLSL Shaders</span>
          </div>
          <div>
            <span className="block text-brand-purple font-semibold text-[8px] sm:text-[10px]">02 / STACK</span>
            <span className="mt-1 block text-brand-lilac/80 truncate">React • Three.js • GSAP</span>
          </div>
          <div>
            <span className="block text-brand-purple font-semibold text-[8px] sm:text-[10px]">03 / AESTHETIC</span>
            <span className="mt-1 block text-brand-lilac/80 truncate">Dark Obsidian & Violet</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
