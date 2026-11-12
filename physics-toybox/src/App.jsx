import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import BackgroundManager from './backgrounds/BackgroundManager.jsx'

// Route Pages
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Skills from './pages/Skills.jsx'
import Journey from './pages/Journey.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden text-brand-lilac selection:bg-brand-purple selection:text-white bg-[#08070D]">
      {/* Multi-World Dynamic 3D WebGL Background (Layer 0) */}
      <BackgroundManager />

      {/* Shared Global Navigation Header (Layer 50) */}
      <Navbar />

      {/* Main Page Content (Layer 10) */}
      <main className="relative z-10 w-full max-w-full overflow-x-hidden min-h-[85vh]">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catch-all route returns to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Shared Global Footer */}
      <Footer />
    </div>
  )
}
