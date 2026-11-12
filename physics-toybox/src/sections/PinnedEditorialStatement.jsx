import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Compass, Layers } from 'lucide-react'
import CharRevealLabel from '../animations/CharRevealLabel.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function PinnedEditorialStatement() {
  const sectionRef = useRef(null)
  const pinContainerRef = useRef(null)
  const progressBarRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !pinContainerRef.current) return

    const headlineWords = pinContainerRef.current.querySelectorAll('.statement-word')
    const subWords = pinContainerRef.current.querySelectorAll('.manifesto-sub-word')

    const ctx = gsap.context(() => {
      // Pinned Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=125%',
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
        },
      })

      // 1. Progressively illuminate headline words from muted grey to white/violet
      tl.fromTo(
        headlineWords,
        {
          color: '#322B42',
          opacity: 0.25,
          y: 8,
        },
        {
          color: (i, target) => {
            const isHighlight = target.getAttribute('data-highlight') === 'true'
            return isHighlight ? '#E9D5FF' : '#FFFFFF'
          },
          opacity: 1,
          y: 0,
          stagger: 0.12,
          ease: 'power1.inOut',
        }
      )

      // 2. Progressively illuminate manifesto paragraph
      tl.fromTo(
        subWords,
        {
          color: '#302A3E',
          opacity: 0.2,
        },
        {
          color: '#C4B5FD',
          opacity: 0.9,
          stagger: 0.04,
          ease: 'power1.inOut',
        },
        '-=0.4'
      )

      // 3. Scroll scrub progress indicator
      if (progressBarRef.current) {
        tl.fromTo(
          progressBarRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none' },
          0
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headline = 'NOT JUST A DEVELOPER. AN EXPLORER OF WHAT IS POSSIBLE.'
  const highlights = ['explorer', 'possible', 'not', 'just']

  const manifesto =
    'In an industry saturated with templated layouts, we sculpt digital environments with WebGL shaders, fluid dynamics, and tactile physics. Every detail is crafted to evoke wonder.'

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden border-t border-brand-purple/15 bg-obsidian-surface/20 backdrop-blur-sm"
    >
      <div
        ref={pinContainerRef}
        className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full py-16 md:py-24 flex flex-col justify-between"
      >
        {/* Top Section Tag with Character Stagger */}
        <div className="flex items-center justify-between border-b border-brand-purple/15 pb-4 md:pb-6 font-mono text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-widest text-brand-lavender/70">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-purple animate-pulse" />
            <CharRevealLabel text="02 // MANIFESTO & PHILOSOPHY" />
          </div>
          <span className="hidden sm:inline-block font-mono text-brand-lilac/40">
            SCROLL TO ILLUMINATE
          </span>
        </div>

        {/* Pinned Kinetic Typography */}
        <div className="my-auto py-10 md:py-20 max-w-5xl">
          <h2
            aria-label={headline}
            className="font-editorial text-[clamp(2.3rem,6.5vw,6.4rem)] font-extrabold leading-[1.02] tracking-[-0.04em]"
          >
            {headline.split(' ').map((word, idx) => {
              const clean = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').toLowerCase()
              const isHighlight = highlights.includes(clean)
              return (
                <span
                  key={idx}
                  aria-hidden="true"
                  data-highlight={isHighlight ? 'true' : 'false'}
                  className={`statement-word inline-block mr-[0.26em] select-none ${
                    isHighlight ? 'italic font-display font-medium text-brand-lavender' : ''
                  }`}
                >
                  {word}
                </span>
              )
            })}
          </h2>

          <p
            aria-label={manifesto}
            className="mt-8 md:mt-12 max-w-3xl font-display text-sm sm:text-lg md:text-2xl leading-relaxed"
          >
            {manifesto.split(' ').map((word, idx) => (
              <span
                key={idx}
                aria-hidden="true"
                className="manifesto-sub-word inline-block mr-[0.25em] select-none"
              >
                {word}
              </span>
            ))}
          </p>

          <div className="mt-8 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brand-lavender/60">
            <span className="flex items-center gap-1.5"><Layers size={13} className="text-brand-purple" /> Systems Architecture</span>
            <span className="flex items-center gap-1.5"><Compass size={13} className="text-brand-purple" /> WebGL Mathematics</span>
            <span className="flex items-center gap-1.5"><Sparkles size={13} className="text-brand-purple" /> Tactile Code</span>
          </div>
        </div>

        {/* Kinetic Pinned Progress Track */}
        <div className="w-full border-t border-brand-purple/15 pt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-brand-lilac/40">
          <span>KINETIC SCROLL PROGRESS</span>
          <div className="relative h-1 w-32 sm:w-48 rounded-full bg-brand-purple/20 overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute inset-0 origin-left bg-gradient-to-r from-brand-purple to-brand-lilac"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
