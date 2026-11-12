import { useLocation } from 'react-router-dom'

/**
 * ============================================================================
 * DANIAL® — useActiveBackground Custom Hook
 * ============================================================================
 * 
 * PURPOSE:
 * Maps the current React Router URL pathname (`location.pathname`) to its
 * corresponding WebGL background world key.
 * 
 * ROUTE MAPPING TABLE:
 * - `/`         → 'home'     (Panel 1: Liquid Chrome Waves)
 * - `/projects` → 'projects' (Panel 2: Particle Universe & Constellations)
 * - `/skills`   → 'skills'   (Panel 3: Digital Network & Energy Grid)
 * - `/about`    → 'about'    (Panel 4: Cosmic Violet Aurora & Nebulae)
 * - `/journey`  → 'journey'  (Panel 5: Topographic Terrain & River of Light)
 * - `/contact`  → 'contact'  (Panel 6: Concentric Energy Portal Rings)
 * 
 * ARCHITECTURAL BENEFIT:
 * By centralizing route-to-world mapping inside this single hook, both the
 * WebGL coordinator (`BackgroundManager`) and navigation components can cleanly
 * query the active world state without prop-drilling or tightly coupling
 * 3D scene code with router logic.
 * 
 * @returns {{ activeWorld: string, pathname: string }}
 * - `activeWorld`: One of 'home' | 'projects' | 'skills' | 'about' | 'journey' | 'contact'
 * - `pathname`: The raw React Router pathname string
 */
export function useActiveBackground() {
  const location = useLocation()

  /**
   * Resolves the world identifier based on route prefix matching.
   * Gracefully defaults to 'home' for the root route or any undefined URL.
   * 
   * @param {string} path - The current location pathname
   * @returns {string} World key
   */
  const getActiveWorld = (path) => {
    if (path.startsWith('/projects')) return 'projects'
    if (path.startsWith('/about')) return 'about'
    if (path.startsWith('/skills')) return 'skills'
    if (path.startsWith('/journey')) return 'journey'
    if (path.startsWith('/contact')) return 'contact'
    return 'home'
  }

  const activeWorld = getActiveWorld(location.pathname)

  return { activeWorld, pathname: location.pathname }
}
