import React, { Component } from 'react'

/**
 * ============================================================================
 * DANIAL® — React Error Boundary Component
 * ============================================================================
 * 
 * WHY THIS COMPONENT EXISTS:
 * In React, an uncaught JavaScript error inside any component's render phase,
 * lifecycle method, or constructor unmounts the entire React component tree,
 * resulting in an empty white screen for the user.
 * 
 * A React Error Boundary is a class component that catches JavaScript errors
 * anywhere in its child component tree, logs the error, and displays a fallback UI
 * instead of crashing the whole application.
 * 
 * NOTE ON REACT ARCHITECTURE:
 * As of React 18 / 19, Error Boundaries MUST be written as class components
 * because React has not yet provided equivalent Hook equivalents for 
 * `componentDidCatch` or `static getDerivedStateFromError`.
 * 
 * BRAND SYSTEM:
 * Adheres strictly to DANIAL® Obsidian & Violet palette:
 * - Background: #08070D (Obsidian Black)
 * - Accent: #8B5CF6 (Electric Purple), #6D28D9 (Royal Violet), #E9D5FF (Lilac)
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    // Initialize error state
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    }
  }

  /**
   * getDerivedStateFromError:
   * Lifecycle method called synchronously after an error is thrown by a descendant.
   * Updates state so the next render will show the fallback UI.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  /**
   * componentDidCatch:
   * Lifecycle method called after an error has been thrown by a descendant.
   * Ideal for error logging and reporting.
   */
  componentDidCatch(error, errorInfo) {
    console.error('⚠️ [DANIAL® ErrorBoundary caught an exception]:', error, errorInfo)
    this.setState({ errorInfo })
  }

  /**
   * handleReset:
   * Clears error state and resets route to home, or reloads page if requested.
   */
  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    if (window.location.pathname !== '/') {
      window.location.href = '/'
    } else {
      window.location.reload()
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }))
  }

  render() {
    if (this.state.hasError) {
      // Custom Fallback UI matching the Obsidian / Violet Art Studio aesthetic
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#08070D] text-[#E9D5FF] px-4 py-16 relative overflow-hidden">
          {/* Subtle ambient violet background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6D28D9]/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-xl w-full p-8 sm:p-10 rounded-2xl bg-[#0E0B18]/80 backdrop-blur-xl border border-[#8B5CF6]/20 shadow-2xl shadow-[#6D28D9]/10 text-center">
            {/* Brand Logo & Ping */}
            <div className="flex items-center justify-center gap-2 mb-6 font-mono text-[11px] uppercase tracking-widest text-[#A78BFA]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]" />
              </span>
              <span>DIMENSIONAL RIFT DETECTED</span>
            </div>

            {/* Title */}
            <h1 className="font-syne text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Sector Temporarily Unstable
            </h1>

            {/* Description */}
            <p className="font-grotesk text-sm sm:text-base text-[#A78BFA]/80 leading-relaxed mb-8">
              An unexpected anomaly occurred while rendering this digital world.
              The core systems remain intact. You can restore the state below.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#8B5CF6]/25 hover:scale-105 active:scale-95"
              >
                Reload Universe
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#181326] hover:bg-[#231C38] border border-[#8B5CF6]/30 text-[#E9D5FF] font-medium text-xs uppercase tracking-wider transition-all duration-300 hover:border-[#8B5CF6]/60"
              >
                Return to Origin
              </button>
            </div>

            {/* Collapsible Technical Details (for developer diagnostics) */}
            {this.state.error && (
              <div className="text-left mt-6 pt-6 border-t border-[#8B5CF6]/15">
                <button
                  type="button"
                  onClick={this.toggleDetails}
                  className="text-[11px] font-mono text-[#A78BFA]/60 hover:text-[#A78BFA] transition-colors underline flex items-center gap-1 mx-auto"
                >
                  {this.state.showDetails ? '▲ Hide Anomaly Telemetry' : '▼ View Anomaly Telemetry'}
                </button>

                {this.state.showDetails && (
                  <div className="mt-3 p-3 rounded-lg bg-[#050408] border border-[#8B5CF6]/20 font-mono text-[11px] text-[#A78BFA] overflow-x-auto max-h-48 leading-relaxed">
                    <p className="text-[#EF4444] font-semibold mb-1">
                      {this.state.error.toString()}
                    </p>
                    {this.state.errorInfo?.componentStack && (
                      <pre className="text-[#A78BFA]/70 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )
    }

    // When no error occurs, render children normally
    return this.props.children
  }
}
