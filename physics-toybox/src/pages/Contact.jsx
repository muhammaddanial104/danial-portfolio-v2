import React from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import CharRevealLabel from '../animations/CharRevealLabel.jsx'
import ScrollTextReveal from '../animations/ScrollTextReveal.jsx'

/**
 * ============================================================================
 * DANIAL® — Contact Page Route (/contact)
 * ============================================================================
 * 
 * 3D WORLD:
 * - Panel 6: Concentric Energy Portal Rings (nested pulsating arcs, glossy
 *   reflective obsidian stage, laser pillars, rising sparks).
 * 
 * CONTENT:
 * - Direct contact triggers: WhatsApp messaging & verified Email channels.
 * - Social & Developer ecosystem: GitHub, LinkedIn, Facebook, Instagram.
 * - Collaboration focus cards: 3D WebGL, Full-Stack MERN, UI/UX Design Systems.
 */
export default function Contact() {
  return (
    <PageTransition className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 w-full text-center">
        {/* Eyebrow */}
        <span className="font-mono text-xs uppercase tracking-widest text-brand-purple flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-purple animate-ping" />
          <CharRevealLabel text="06 // INITIATE COLLABORATION" />
        </span>

        {/* Big Impact Headline */}
        <h1 className="mt-5 font-editorial text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-tight">
          HAVE AN IDEA? <br />
          <span className="text-shimmer-violet">
            LET'S MAKE IT REAL.
          </span>
        </h1>

        <ScrollTextReveal
          text="Currently accepting selected commissions, full-time creative engineering opportunities, and 3D interactive web projects."
          highlightWords={['commissions', 'creative', 'engineering', '3d', 'interactive']}
          className="mx-auto mt-6 max-w-xl font-display text-sm sm:text-base md:text-xl text-brand-lilac/80"
        />

        {/* Primary Direct Contact Cards: WhatsApp & Email */}
        <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
          {/* WhatsApp Direct Card */}
          <a
            href="https://wa.me/923137525862"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-3xl card-glow-border bg-obsidian-card/75 p-6 sm:p-8 backdrop-blur-2xl shadow-glass transition-all duration-300 hover:bg-obsidian-card/90 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:-translate-y-1 block focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-semibold block">
                    DIRECT MESSAGING
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    WhatsApp
                  </h3>
                </div>
              </div>
              <ArrowUpRight
                size={18}
                className="text-brand-lilac/40 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </div>

            <p className="mt-5 font-mono text-base sm:text-lg text-white font-semibold tracking-wider">
              +92 313 7525862
            </p>

            <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-brand-lilac/60">
              <span>Direct Messaging</span>
              <span className="text-emerald-400/90 flex items-center gap-1.5 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Available for collaboration
              </span>
            </div>
          </a>

          {/* Email Direct Card */}
          <a
            href="mailto:innocentdanial00@gmail.com"
            className="group relative rounded-3xl card-glow-border bg-obsidian-card/75 p-6 sm:p-8 backdrop-blur-2xl shadow-glass transition-all duration-300 hover:bg-obsidian-card/90 hover:shadow-[0_0_40px_rgba(139,92,246,0.25)] hover:-translate-y-1 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] active:border-[#6D28D9]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-purple/15 border border-brand-purple/35 text-brand-purple group-hover:scale-110 transition-transform">
                  <Mail size={22} />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-purple font-semibold block">
                    OFFICIAL INQUIRY
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-white group-hover:text-brand-lilac transition-colors">
                    Email
                  </h3>
                </div>
              </div>
              <ArrowUpRight
                size={18}
                className="text-brand-lilac/40 group-hover:text-brand-purple group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </div>

            <p className="mt-5 font-mono text-xs sm:text-sm text-white font-medium tracking-wide break-all">
              innocentdanial00@gmail.com
            </p>

            <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-brand-lilac/60">
              <span>Client Projects & Inquiries</span>
              <span className="text-brand-lavender/90 font-medium">Available for collaboration</span>
            </div>
          </a>
        </div>

        {/* Social & Developer Channels 4-Card Responsive Grid */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-widest text-brand-lilac/50 text-center sm:text-left mb-3.5 flex items-center justify-center sm:justify-start gap-2">
            <Sparkles size={12} className="text-brand-purple" />
            <span>SOCIAL & DEVELOPER CHANNELS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left">
            {/* GitHub */}
            <a
              href="https://github.com/muhammaddanial104/danial-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl card-glow-border card-glow-stagger bg-obsidian-surface/60 p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:bg-obsidian-card/85 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] active:border-[#6D28D9] block"
            >
              <div className="flex items-center justify-between text-brand-lavender">
                <Github size={20} className="group-hover:text-white transition-colors" />
                <ArrowUpRight size={13} className="text-brand-lilac/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <h4 className="mt-3 font-editorial text-base sm:text-lg font-bold text-white group-hover:text-brand-lilac transition-colors">
                GitHub
              </h4>
              <p className="mt-0.5 font-mono text-[10px] text-brand-lilac/60 truncate">
                danial-tech
              </p>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/muhammad-danial-2584b4432"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl card-glow-border card-glow-stagger bg-obsidian-surface/60 p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:bg-obsidian-card/85 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] active:border-[#6D28D9] block"
            >
              <div className="flex items-center justify-between text-brand-lavender">
                <Linkedin size={20} className="group-hover:text-white transition-colors" />
                <ArrowUpRight size={13} className="text-brand-lilac/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <h4 className="mt-3 font-editorial text-base sm:text-lg font-bold text-white group-hover:text-brand-lilac transition-colors">
                LinkedIn
              </h4>
              <p className="mt-0.5 font-mono text-[10px] text-brand-lilac/60 truncate">
                muhammad-danial
              </p>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1CD8FQZmT6/"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl card-glow-border card-glow-stagger bg-obsidian-surface/60 p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:bg-obsidian-card/85 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] active:border-[#6D28D9] block"
            >
              <div className="flex items-center justify-between text-brand-lavender">
                <Facebook size={20} className="group-hover:text-white transition-colors" />
                <ArrowUpRight size={13} className="text-brand-lilac/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <h4 className="mt-3 font-editorial text-base sm:text-lg font-bold text-white group-hover:text-brand-lilac transition-colors">
                Facebook
              </h4>
              <p className="mt-0.5 font-mono text-[10px] text-brand-lilac/60 truncate">
                Connect
              </p>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/muhammad_danial604?exln=amEzODdkdHZzcnVp"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl card-glow-border card-glow-stagger bg-obsidian-surface/60 p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:bg-obsidian-card/85 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] active:border-[#6D28D9] block"
            >
              <div className="flex items-center justify-between text-brand-lavender">
                <Instagram size={20} className="group-hover:text-white transition-colors" />
                <ArrowUpRight size={13} className="text-brand-lilac/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <h4 className="mt-3 font-editorial text-base sm:text-lg font-bold text-white group-hover:text-brand-lilac transition-colors">
                Instagram
              </h4>
              <p className="mt-0.5 font-mono text-[10px] text-brand-lilac/60 truncate">
                @danial604
              </p>
            </a>
          </div>
        </div>

        {/* Collaboration Focus Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto text-left">
          {[
            {
              title: '3D & WebGL Experiences',
              desc: 'Custom shader development, Three.js scenes, product launches, and tactile animations.',
            },
            {
              title: 'Full-Stack Web Apps',
              desc: 'High-performance React frontends paired with robust Node.js and Express backend architectures.',
            },
            {
              title: 'Design System & UI/UX',
              desc: 'Editorial typography, responsive layouts, dark obsidian themes, and smooth micro-interactions.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl card-glow-border card-glow-stagger bg-obsidian-card/60 p-6 backdrop-blur-xl shadow-glass"
            >
              <div className="font-mono text-[10px] text-brand-purple uppercase">SERVICE // 0{idx + 1}</div>
              <h3 className="mt-3 font-editorial text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 font-display text-xs sm:text-sm text-brand-lilac/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
