import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, MoveUpRight, RotateCcw, Sparkles, Volume2, VolumeX } from 'lucide-react'
import Toybox from './components/Toybox.jsx'

const rise = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.22, 1, 0.36, 1] } } }

export default function App() {
  const [resetKey, setResetKey] = useState(0)
  const [sound, setSound] = useState(false)
  return <main className="min-h-screen overflow-hidden bg-[#f3f1eb] text-[#171817] selection:bg-[#c7ed4a]">
    <nav className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-6 md:px-12">
      <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold tracking-[-.07em]"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#c7ed4a] text-xs">P</span> PLAYFORM<span className="ml-1 font-mono text-[9px] font-normal tracking-[.12em] text-black/45">® 001</span></a>
      <div className="hidden items-center gap-8 font-mono text-[10px] uppercase tracking-[.14em] text-black/55 md:flex"><a className="hover:text-black" href="#playground">Playground</a><a className="hover:text-black" href="#about">About</a><a className="hover:text-black" href="mailto:hello@example.com">Contact</a></div>
      <a href="#playground" className="group flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 font-mono text-[10px] uppercase tracking-wider transition hover:bg-black hover:text-white">Let's play <ArrowUpRight size={13} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
    </nav>

    <section id="top" className="relative mx-auto max-w-[1440px] px-6 pt-12 md:px-12 md:pt-16">
      <div className="relative z-10 grid items-end gap-8 md:grid-cols-[1fr_auto]">
        <motion.div initial="hidden" animate="show" variants={rise}>
          <div className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.19em] text-black/50"><span className="h-2 w-2 animate-pulse rounded-full bg-[#8bbd25]" /> A little playground for big ideas</div>
          <h1 className="max-w-[900px] font-display text-[clamp(4rem,11.5vw,10.5rem)] font-semibold leading-[.78] tracking-[-.095em]">MAKE<br /><span className="relative inline-block">SOME <span className="relative inline-block text-[#8eaa46]">NOISE.</span></span></h1>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .7 }} className="max-w-[250px] pb-2 font-display text-sm leading-relaxed text-black/60 md:text-base">A tiny physics playground where digital objects have a mind of their own. Go on. Poke around.</motion.p>
      </div>

      <div id="playground" className="relative mt-10 h-[390px] overflow-hidden rounded-[28px] border border-black/[.07] bg-[#e9e7df] md:mt-14 md:h-[570px]">
        <div className="absolute inset-0 z-0"><Toybox resetKey={resetKey} /></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5 md:p-7"><span className="font-mono text-[9px] uppercase tracking-[.16em] text-black/45">Interactive object study / 001</span><span className="font-mono text-[9px] uppercase tracking-[.16em] text-black/45">Real-time physics</span></div>
        <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 rounded-full border border-black/10 bg-[#f3f1eb]/75 px-3 py-2 font-mono text-[9px] uppercase tracking-wider text-black/55 backdrop-blur-md md:bottom-7 md:left-7"><MoveUpRight size={12} /> Move your cursor to collide</div>
        <div className="absolute bottom-5 right-5 z-10 flex gap-2 md:bottom-7 md:right-7">
          <button onClick={() => setResetKey(k => k + 1)} aria-label="Reset objects" className="grid h-10 w-10 place-items-center rounded-full border border-black/15 bg-[#f3f1eb]/75 backdrop-blur-md transition hover:rotate-[-35deg] hover:bg-[#c7ed4a]"><RotateCcw size={15} /></button>
          <button onClick={() => setSound(v => !v)} aria-label="Toggle sound" className="grid h-10 w-10 place-items-center rounded-full border border-black/15 bg-[#f3f1eb]/75 backdrop-blur-md transition hover:bg-[#c7ed4a]">{sound ? <Volume2 size={15} /> : <VolumeX size={15} />}</button>
        </div>
        <div className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 font-mono text-[9px] uppercase tracking-[.22em] text-black/35 md:block">Drag your curiosity</div>
      </div>

      <div className="grid gap-8 py-9 md:grid-cols-[1fr_auto] md:items-center">
        <p className="max-w-xl font-display text-lg leading-snug tracking-[-.035em] md:text-2xl">Not everything needs a purpose. Sometimes, the best interface is the one that makes you <span className="text-black/35">feel something.</span></p>
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.14em] text-black/45"><Sparkles size={14} /> Built to be played with</div>
      </div>
    </section>

    <section id="about" className="border-t border-black/10 bg-[#e9e7df]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-16 md:grid-cols-2 md:px-12 md:py-24">
        <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[.18em] text-black/45">01 / The idea</p><h2 className="max-w-lg font-display text-5xl font-semibold leading-[.95] tracking-[-.07em] md:text-7xl">A playful<br />kind of <span className="text-[#8eaa46]">technology.</span></h2></div>
        <div className="flex flex-col justify-between gap-10"><p className="max-w-md text-base leading-relaxed text-black/60">PLAYFORM is a small experiment in making the web feel tangible. Soft bodies, shiny surfaces, unexpected collisions. Move around and see what happens.</p><div className="flex items-center justify-between border-t border-black/15 pt-4 font-mono text-[9px] uppercase tracking-[.15em] text-black/45"><span>React / Three.js / Rapier</span><span>© 2026 PLAYFORM</span></div></div>
      </div>
    </section>
    <footer className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-7 font-mono text-[9px] uppercase tracking-[.15em] text-black/40 md:px-12"><span>Made for curious minds.</span><a href="#top" className="flex items-center gap-1 hover:text-black">Back to top <MoveUpRight size={11} /></a></footer>
  </main>
}
