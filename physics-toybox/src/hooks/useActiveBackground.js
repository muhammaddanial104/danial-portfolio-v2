import { useLocation } from 'react-router-dom'

/**
 * useActiveBackground hook (Multi-Page Route Architecture)
 * 
 * Maps the current React Router route (location.pathname)
 * to its designated 3D background world.
 * 
 * Routes:
 * - '/'        -> 'home'     (Liquid Chrome Waves)
 * - '/projects'-> 'projects' (Digital Particle Universe)
 * - '/about'   -> 'about'    (Cosmic Violet Aurora - placeholder)
 * - '/skills'  -> 'skills'   (Digital Intelligence - placeholder)
 * - '/journey' -> 'journey'  (Topographic Landscape - placeholder)
 * - '/contact' -> 'contact'  (Energy Portal Rings - placeholder)
 */
export function useActiveBackground() {
  const location = useLocation()

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
