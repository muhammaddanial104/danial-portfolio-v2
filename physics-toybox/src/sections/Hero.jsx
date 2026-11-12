import { motion } from 'framer-motion'
import { ArrowDownRight, Compass, Sparkles, Terminal, Box } from 'lucide-react'
import HeroSculpture from '../components/HeroSculpture.jsx'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="top" className="relative min-h-screen w-full pt-24 pb-14 md:pt-36 md:pb-24 overflow-hidden">
      {/* Ambient background atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient-purple opacity-70" />
      <div className="pointer-events-none absolute top-1/4 right-0 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-brand-violet/10 blur-[120px]" />
      
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full">
        {/* Top Editorial Eyebrow & Status Tag */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex items-center justify-between gap-2 border-b border-brand-purple/15 pb-4 md:pb-6 font-mono text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-widest text-brand-lilac/60"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple" />
            </span>
            <span className="text-brand-lilac truncate">DANIAL® ARCHIVE — 2026.1</span>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="hidden md:inline-block">CREATIVE TECHNOLOGIST</span>
            <span className="hidden sm:inline-block text-brand-lavender">[ 51.5° N, 0.1° W ]</span>
          </div>
        </motion.div>

        {/* Hero Main Grid: Asymmetrical Layout */}
        <div className="mt-6 md:mt-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-8 w-full">
          {/* Left Column: Editorial Headline & Bio (7 Columns) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 z-10 w-full"
          >
            {/* Subtitle Badge */}
            <motion.div variants={itemVariants} className="mb-4 md:mb-5 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand-purple/20 bg-brand-violet/15 px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md max-w-full">
              <Sparkles size={12} className="text-brand-lavender animate-pulse flex-shrink-0" />
              <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider text-brand-lilac truncate">
                Creative Developer <span className="text-brand-purple">•</span> Interactive Experiences <span className="text-brand-purple">•</span> 3D Web
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-editorial text-[clamp(2.15rem,6.4vw,6.4rem)] font-extrabold leading-[0.94] tracking-[-0.04em] text-white"
            >
              I CREATE <br />
              <span className="bg-gradient-to-r from-white via-brand-lilac to-brand-purple bg-clip-text text-transparent">
                DIGITAL
              </span>{' '}
              <br />
              <span className="relative inline-block text-brand-lavender italic font-display font-medium">
                WORLDS.
                <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-brand-purple to-transparent" />
              </span>
            </motion.h1>

            {/* Descriptive Editorial Paragraph */}
            <motion.p
              variants={itemVariants}
              className="mt-4 md:mt-6 max-w-xl font-display text-xs sm:text-base md:text-lg leading-relaxed text-brand-lilac/75"
            >
              Merging contemporary editorial design with real-time WebGL, physics, and creative code. 
              Engineering digital products that don't just communicate information—they provoke wonder and tactile engagement.
            </motion.p>

            {/* Action Buttons: Stack on mobile, inline on tablet/desktop */}
            <motion.div
              variants={itemVariants}
              className="mt-6 md:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1"
            >
              <a
                href="#projects"
                className="group flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs uppercase tracking-wider font-semibold text-obsidian transition-all duration-300 hover:bg-brand-lilac hover:shadow-glow-sm"
              >
                <span>Selected Works</span>
                <ArrowDownRight
                  size={15}
                  className="transition-transform duration-300 group-hover:rotate-[-45deg]"
                />
              </a>

              <a
                href="#toybox"
                className="group flex items-center justify-center gap-2 rounded-full border border-brand-purple/30 bg-obsidian-surface/80 px-5 py-3 font-mono text-xs uppercase tracking-wider text-brand-lilac backdrop-blur-md transition-all duration-300 hover:border-brand-purple hover:bg-brand-purple/20 hover:text-white"
              >
                <Box size={14} className="text-brand-purple flex-shrink-0" />
                <span>Launch 3D Toybox</span>
              </a>
            </motion.div>

            {/* Editorial Badges: Stacked grid */}
            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-4 border-t border-brand-purple/15 pt-4 sm:pt-5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-brand-lilac/50"
            >
              <div>
                <span className="block text-brand-purple font-semibold text-[8px] sm:text-[10px]">01/DISCIPLINE</span>
                <span className="mt-0.5 sm:mt-1 block text-brand-lilac/80 truncate">3D & WebGL</span>
              </div>
              <div>
                <span className="block text-brand-purple font-semibold text-[8px] sm:text-[10px]">02/STACK</span>
                <span className="mt-0.5 sm:mt-1 block text-brand-lilac/80 truncate">React • Three</span>
              </div>
              <div>
                <span className="block text-brand-purple font-semibold text-[8px] sm:text-[10px]">03/THEME</span>
                <span className="mt-0.5 sm:mt-1 block text-brand-lilac/80 truncate">Obsidian</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Sculpture Interactive Canvas (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 relative w-full"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[420px] lg:max-w-none rounded-[24px] sm:rounded-[32px] border border-brand-purple/20 bg-gradient-to-b from-obsidian-card/80 to-obsidian-surface/40 p-2 backdrop-blur-xl shadow-glass overflow-hidden">
              {/* Corner Accents */}
              <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-brand-lilac/60">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
                SCULPTURE // VIOLET CHROME
              </div>
              <div className="absolute top-3.5 right-3.5 z-10 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-brand-lavender/50">
                DRAG TO EXPLORE
              </div>

              {/* 3D Sculpture Component */}
              <div className="h-full w-full">
                <HeroSculpture />
              </div>

              {/* Bottom Card Spec */}
              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between border-t border-brand-purple/15 bg-obsidian/70 px-3 py-1.5 rounded-lg backdrop-blur-md font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-brand-lilac/60">
                <span>R3F Parametric Torus</span>
                <span className="text-brand-purple">60 FPS REALTIME</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
