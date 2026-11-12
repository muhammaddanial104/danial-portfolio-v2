import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'

/**
 * ============================================================================
 * DANIAL® — Application Entrypoint
 * ============================================================================
 * 
 * WHY THIS FILE EXISTS:
 * This is Vite's main JavaScript entrypoint loaded directly by index.html.
 * It mounts the React component tree into the DOM root node (`<div id="root">`).
 * 
 * CORE WRAPPERS:
 * 1. React.StrictMode:
 *    Enables runtime sanity checks in development (e.g. detecting deprecated
 *    lifecycle methods, double-invoking effects to flush out memory leaks).
 * 
 * 2. BrowserRouter:
 *    Provides HTML5 History API routing context across the entire application,
 *    allowing separate URLs (/about, /projects, /skills, /journey, /contact)
 *    and seamless browser back/forward navigation.
 * 
 * 3. styles.css:
 *    Loads Tailwind CSS base, components, and utilities along with custom
 *    Obsidian glassmorphism, scrollbars, and keyframe animations.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
