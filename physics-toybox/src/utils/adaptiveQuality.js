/**
 * ============================================================================
 * DANIAL® — Adaptive WebGL Quality Tier System
 * ============================================================================
 * 
 * Classifies GPU rendering capabilities once on initialization to avoid
 * noisy runtime fluctuations while guaranteeing 60 FPS performance across
 * both dedicated GPUs and integrated graphics (such as Intel Iris Xe).
 */

export function detectGpuTier() {
  if (typeof window === 'undefined') {
    return { tier: 'balanced', isIntegrated: true, isMobileViewport: false }
  }

  const isMobileViewport = window.innerWidth < 768

  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) {
      return { tier: 'low', isIntegrated: true, isMobileViewport }
    }

    const dbg = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)
    const rLower = (renderer || '').toLowerCase()

    // 1. Dedicated high-performance GPUs
    if (
      rLower.includes('rtx') ||
      rLower.includes('geforce') ||
      rLower.includes('gtx') ||
      rLower.includes('radeon rx') ||
      rLower.includes('quadro') ||
      rLower.includes('tesla') ||
      rLower.includes('arc a7') ||
      rLower.includes('apple m1 max') ||
      rLower.includes('apple m2 max') ||
      rLower.includes('apple m3 max') ||
      rLower.includes('apple m4 max') ||
      rLower.includes('apple m1 pro') ||
      rLower.includes('apple m2 pro') ||
      rLower.includes('apple m3 pro') ||
      rLower.includes('apple m4 pro')
    ) {
      return { tier: 'high', isIntegrated: false, isMobileViewport, renderer }
    }

    // 2. Software emulated or low-end fallback
    if (
      rLower.includes('swiftshader') ||
      rLower.includes('llvmpipe') ||
      rLower.includes('basic render') ||
      rLower.includes('software rasterizer')
    ) {
      return { tier: 'low', isIntegrated: true, isMobileViewport, renderer }
    }

    // 3. Older or low-power integrated GPUs
    if (
      rLower.includes('hd graphics') ||
      rLower.includes('uhd graphics') ||
      rLower.includes('mali-4') ||
      rLower.includes('mali-g5') ||
      rLower.includes('adreno (tm) 5') ||
      rLower.includes('adreno (tm) 6')
    ) {
      return { tier: 'economy', isIntegrated: true, isMobileViewport, renderer }
    }

    // 4. Default for Modern Integrated GPUs (Intel Iris Xe, Intel Arc Xe, Apple base M1-M4, AMD Radeon 680M/780M/880M)
    return { tier: 'balanced', isIntegrated: true, isMobileViewport, renderer }
  } catch {
    return { tier: 'balanced', isIntegrated: true, isMobileViewport }
  }
}

/**
 * Returns tuned rendering parameters for a given quality tier & viewport width
 */
export function getAdaptiveConfig(tier, viewportWidth = 1440) {
  const isMobile = viewportWidth < 7.0 || (typeof window !== 'undefined' && window.innerWidth < 768)

  if (tier === 'high') {
    return {
      dpr: isMobile ? 1.0 : [1, 1.5],
      homeSegX: isMobile ? 44 : 75,
      homeSegY: isMobile ? 44 : 75,
      projectsConstellationCount: isMobile ? 80 : 140,
      projectsMaxLines: isMobile ? 110 : 200,
      projectsBgStars: isMobile ? 220 : 450,
      projectsConnectDistance: isMobile ? 2.35 : 2.2,
    }
  }

  if (tier === 'low') {
    return {
      dpr: 1.0,
      homeSegX: isMobile ? 30 : 36,
      homeSegY: isMobile ? 30 : 36,
      projectsConstellationCount: isMobile ? 50 : 65,
      projectsMaxLines: isMobile ? 60 : 80,
      projectsBgStars: isMobile ? 140 : 180,
      projectsConnectDistance: 2.5,
    }
  }

  if (tier === 'economy') {
    return {
      dpr: 1.0,
      homeSegX: isMobile ? 34 : 40,
      homeSegY: isMobile ? 34 : 40,
      projectsConstellationCount: isMobile ? 60 : 78,
      projectsMaxLines: isMobile ? 75 : 95,
      projectsBgStars: isMobile ? 160 : 220,
      projectsConnectDistance: 2.5,
    }
  }

  // Balanced Tier (Intel Iris Xe, Apple base M-series, AMD APUs)
  return {
    dpr: 1.0,
    homeSegX: isMobile ? 32 : 38,
    homeSegY: isMobile ? 32 : 38,
    projectsConstellationCount: isMobile ? 64 : 76,
    projectsMaxLines: isMobile ? 80 : 105,
    projectsBgStars: isMobile ? 150 : 200,
    projectsConnectDistance: 2.45,
  }
}
