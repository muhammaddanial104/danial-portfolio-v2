import React from 'react'
import { Link } from 'react-router-dom'
import { Compass, ArrowLeft, Home as HomeIcon } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'

/**
 * ============================================================================
 * DANIAL® — 404 Not Found Page Route (*)
 * ============================================================================
 *
 * DESIGN SPECIFICATION:
 * - Aligns with the Obsidian & Electric Violet theme (#08070D & #8B5CF6).
 * - Editorial typography with responsive scaling.
 * - Standardized .btn-primary and .btn-secondary interactive actions.
 * - Clear, elegant celestial error message guiding visitors back to safety.
 */
export default function NotFound() {
  return (
    <PageTransition className="pt-28 pb-20 md:pt-36 md:pb-28 min-h-[80vh] flex items-center justify-center">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full text-center">
        {/* Eyebrow */}
        <span className="font-mono text-xs uppercase tracking-widest text-brand-purple flex items-center justify-center gap-2">
          <Compass size={14} className="text-brand-purple animate-spin-slow" />
          <span>404 // COORDINATE UNREACHABLE</span>
        </span>

        {/* 404 Headline */}
        <h1 className="mt-6 font-editorial text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-white leading-none">
          LOST IN <br />
          <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
            DEEP SPACE.
          </span>
        </h1>

        {/* Descriptive Statement */}
        <p className="mx-auto mt-6 max-w-lg font-display text-sm sm:text-base md:text-lg text-[#C4B5FD]/80 leading-relaxed">
          The celestial coordinates you are searching for do not exist or have drifted beyond this universe's event horizon.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-mono text-xs uppercase tracking-wider font-semibold btn-primary"
          >
            <HomeIcon size={14} />
            <span>Return to Origin</span>
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-mono text-xs uppercase tracking-wider btn-secondary"
          >
            <ArrowLeft size={14} />
            <span>Explore Projects</span>
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}
