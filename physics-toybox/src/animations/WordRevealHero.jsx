import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WordRevealHero({ className = '' }) {
  const containerRef = useRef(null)
  const lineUnderRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const words = containerRef.current.querySelectorAll('.hero-word-reveal')

    const ctx = gsap.context(() => {
      // 1. Cinematic entrance timeline: words float up, unblur, and fade in
      const tl = gsap.timeline({ delay: 0.25 })

      tl.fromTo(
        words,
        {
          opacity: 0,
          y: 55,
          filter: 'blur(14px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.15,
          stagger: 0.14,
          ease: 'power3.out',
        }
      )

      // Animated underline expands smoothly beneath WORLDS.
      if (lineUnderRef.current) {
        tl.fromTo(
          lineUnderRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.0, ease: 'expo.out' },
          '-=0.5'
        )
      }

      // 2. Subtle scroll-controlled upward drift & fade
      gsap.to(containerRef.current, {
        y: -40,
        opacity: 0.45,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 20%',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <h1
      ref={containerRef}
      className={`font-editorial font-extrabold leading-[0.9] tracking-[-0.04em] text-white ${className}`}
    >
      <span className="block overflow-hidden py-1">
        <span className="hero-word-reveal inline-block mr-4">I</span>
        <span className="hero-word-reveal inline-block">CREATE</span>
      </span>

      <span className="block overflow-hidden py-1">
        <span className="hero-word-reveal inline-block text-shimmer-violet">
          DIGITAL
        </span>
      </span>

      <span className="block overflow-hidden py-1">
        <span className="relative inline-block text-brand-lavender italic font-display font-medium">
          <span className="hero-word-reveal inline-block">WORLDS.</span>
          <span
            ref={lineUnderRef}
            className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-brand-purple via-brand-violet to-transparent"
          />
        </span>
      </span>
    </h1>
  )
}
