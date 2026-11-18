import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import BackgroundManager from './backgrounds/BackgroundManager.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import DanialAIChatbot from './components/DanialAIChatbot.jsx'

// Route Pages (Loaded dynamically via React.lazy on-demand)
const Home = React.lazy(() => import('./pages/Home.jsx'))
const About = React.lazy(() => import('./pages/About.jsx'))
const Projects = React.lazy(() => import('./pages/Projects.jsx'))
const Skills = React.lazy(() => import('./pages/Skills.jsx'))
const Journey = React.lazy(() => import('./pages/Journey.jsx'))
const Contact = React.lazy(() => import('./pages/Contact.jsx'))
const NotFound = React.lazy(() => import('./pages/NotFound.jsx'))

/**
 * ============================================================================
 * DANIAL® — Root Application Component
 * ============================================================================
 * 
 * ARCHITECTURE OVERVIEW:
 * 1. ErrorBoundary:
 *    Protects the entire application from unexpected runtime crashes. If any
 *    child route, component, or WebGL context encounters an exception, the
 *    ErrorBoundary displays an on-brand recovery interface without a blank screen.
 * 
 * 2. BackgroundManager (Layer 0, fixed):
 *    Houses a single persistent React Three Fiber <Canvas>. Coordinates all 6
 *    procedural WebGL worlds (Liquid Waves, Particle Universe, Digital Network,
 *    Cosmic Aurora, Topographic Terrain, Energy Portal) smoothly crossfading between
 *    routes with zero WebGL context recreations.
 * 
 * 3. Navbar (Layer 50, fixed top):
 *    Global header featuring brand identity, desktop navigation with an animated
 *    Framer Motion spring pill indicator, and responsive mobile hamburger drawer.
 * 
 * 4. Main Page Content (Layer 10, relative z-10):
 *    Houses React Router <Routes> wrapped with Framer Motion <AnimatePresence mode="wait">
 *    for smooth page entrance and exit transitions across URL changes.
 * 
 * 5. Footer (Layer 20):
 *    Editorial footer displaying copyright, location telemetry, social links,
 *    and system status indicators.
 * 
 * SCROLL RESTORATION:
 * When navigating between routes, an instant scroll reset to (0, 0) is triggered
 * to ensure users always start at the top of the incoming page.
 */
export default function App() {
  const location = useLocation()

  // Reset viewport scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  // Synchronize document title, canonical link, and Open Graph metadata with active route
  useEffect(() => {
    const routeMetadata = {
      '/': {
        title: 'DANIAL® — Creative Developer',
        canonical: 'https://danial-portfolio-v2.vercel.app/',
        ogTitle: 'DANIAL® — Creative Developer & 3D Interactive Portfolio',
      },
      '/about': {
        title: 'About — DANIAL®',
        canonical: 'https://danial-portfolio-v2.vercel.app/about',
        ogTitle: 'About — DANIAL® Creative Developer',
      },
      '/projects': {
        title: 'Projects — DANIAL®',
        canonical: 'https://danial-portfolio-v2.vercel.app/projects',
        ogTitle: 'Projects & Work Archive — DANIAL®',
      },
      '/skills': {
        title: 'Skills — DANIAL®',
        canonical: 'https://danial-portfolio-v2.vercel.app/skills',
        ogTitle: 'Technical Proficiencies & Skills — DANIAL®',
      },
      '/journey': {
        title: 'Journey — DANIAL®',
        canonical: 'https://danial-portfolio-v2.vercel.app/journey',
        ogTitle: 'Experience & Milestones — DANIAL®',
      },
      '/contact': {
        title: 'Contact — DANIAL®',
        canonical: 'https://danial-portfolio-v2.vercel.app/contact',
        ogTitle: 'Contact & Collaboration — DANIAL®',
      },
    }

    const currentMeta = routeMetadata[location.pathname]

    if (currentMeta) {
      document.title = currentMeta.title

      // Update or create canonical link
      let canonicalLink = document.querySelector('link[rel="canonical"]')
      if (!canonicalLink) {
        canonicalLink = document.createElement('link')
        canonicalLink.setAttribute('rel', 'canonical')
        document.head.appendChild(canonicalLink)
      }
      canonicalLink.setAttribute('href', currentMeta.canonical)

      // Synchronize Open Graph & Twitter URL/Title
      const ogUrl = document.querySelector('meta[property="og:url"]')
      if (ogUrl) ogUrl.setAttribute('content', currentMeta.canonical)

      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.setAttribute('content', currentMeta.ogTitle)

      const twUrl = document.querySelector('meta[name="twitter:url"]')
      if (twUrl) twUrl.setAttribute('content', currentMeta.canonical)

      const twTitle = document.querySelector('meta[name="twitter:title"]')
      if (twTitle) twTitle.setAttribute('content', currentMeta.ogTitle)
    } else {
      // 404 Route: ensure not canonicalized to homepage
      document.title = '404: Not Found — DANIAL®'
      const canonicalLink = document.querySelector('link[rel="canonical"]')
      if (canonicalLink) {
        canonicalLink.remove()
      }
    }
  }, [location.pathname])

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen w-full max-w-full overflow-x-hidden text-brand-lilac selection:bg-brand-purple selection:text-white bg-[#08070D]">
        {/* Accessible Skip Link for Keyboard & Screen Reader Users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-2.5 focus:rounded-full focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider btn-primary focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
        >
          Skip to main content
        </a>

        {/* Layer 0: Multi-World Dynamic 3D WebGL Background */}
        <BackgroundManager />

        {/* Layer 50: Shared Global Navigation Header */}
        <Navbar />

        {/* Layer 10: Main Page Content */}
        <main
          id="main-content"
          tabIndex="-1"
          className="relative z-10 w-full max-w-full overflow-x-hidden min-h-[85vh] focus:outline-none"
        >
          <React.Suspense fallback={null}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/contact" element={<Contact />} />
                {/* Fallback wildcard route displaying on-brand 404 page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </React.Suspense>
        </main>

        {/* Layer 20: Shared Global Footer */}
        <Footer />

        {/* Layer 50: Interactive 3D Portfolio AI Representative Chatbot */}
        <DanialAIChatbot />
      </div>
    </ErrorBoundary>
  )
}
