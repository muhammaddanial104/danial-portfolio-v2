import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import MagneticButton from '../animations/MagneticButton.jsx'

/**
 * ============================================================================
 * DANIAL® — Global Navigation Bar (Header)
 * ============================================================================
 * 
 * DESIGN SYSTEM FEATURES:
 * - Editorial Typography & Obsidian Glassmorphism:
 *   Translucent frosted backdrop (`backdrop-blur-md`) with subtle violet border
 *   that activates when the user scrolls past 15px.
 * - Framer Motion layoutId Pill:
 *   Desktop navigation links feature a shared spring-animated pill indicator
 *   (`layoutId="navPill"`) that glides effortlessly between the active tabs.
 * - Responsive Mobile Drawer:
 *   Smooth slide-in drawer for screens < 768px, ensuring accessible navigation
 *   on smartphones and tablets with automatic closure on URL change.
 * - Magnetic CTA Button:
 *   Interactive contact trigger with cursor pull physics.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Journey', path: '/journey' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        scrolled || isOpen
          ? 'bg-[#08070D] border-b border-brand-purple/15 py-3 sm:py-4 shadow-glass'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-12 w-full">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 tracking-tight text-white transition-opacity hover:opacity-90 flex-shrink-0"
          aria-label="DANIAL® Home"
        >
          <img
            src="/danial-icon.png"
            alt="DANIAL® Icon"
            className="h-8 w-8 sm:h-9 sm:w-9 md:h-9 md:w-9 rounded-xl object-contain shadow-glow-sm transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-editorial text-lg sm:text-xl font-bold tracking-wider text-white">
            DANIAL<span className="text-brand-purple font-mono text-xs ml-0.5">®</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-brand-purple/20 bg-brand-purple/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-brand-lavender">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse" />
            Studio
          </span>
        </Link>

        {/* Desktop Navigation Links with Active Indicator */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6 lg:gap-7 rounded-full border border-brand-purple/15 bg-obsidian-card/60 px-6 py-2.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path)

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={`relative font-mono text-xs uppercase tracking-widest transition-colors duration-200 py-1 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-brand-lilac/70 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-purple to-brand-lavender rounded-full shadow-glow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </NavLink>
              )
            })}
          </div>
        </div>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <MagneticButton
            href="/contact"
            className="group hidden sm:flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 font-mono text-xs uppercase tracking-wider btn-secondary"
          >
            <span>Let's Connect</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </MagneticButton>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-menu"
            className="grid h-9 w-9 place-items-center rounded-full btn-icon md:hidden flex-shrink-0"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu (Full-bleed solid Obsidian overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 h-[calc(100dvh-100%)] min-h-[calc(100vh-100%)] bg-[#08070D] border-t border-brand-purple/20 px-6 py-6 pb-12 overflow-y-auto flex flex-col justify-between md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, idx) => {
                const isActive =
                  link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.path)

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.035 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between border-b border-white/5 pb-3 pt-1 font-editorial text-2xl font-bold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-[#08070D] rounded-lg px-1 ${
                        isActive ? 'text-white' : 'text-brand-lilac/70 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {isActive && <span className="h-2 w-2 rounded-full bg-brand-purple shadow-[0_0_8px_#8B5CF6]" />}
                        {link.name}
                      </span>
                      <span className="font-mono text-xs text-brand-purple">0{idx + 1}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <div className="pt-6 border-t border-brand-purple/15 mt-4">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-mono text-xs uppercase tracking-wider btn-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
