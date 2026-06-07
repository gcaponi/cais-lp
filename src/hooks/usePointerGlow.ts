import { useEffect } from 'react'

/**
 * Tracks the pointer across the viewport and exposes its position via
 * CSS custom properties on the document root. The visual halo in the
 * .cursor-glow element is then positioned through those vars — no React
 * re-renders involved.
 */
export function usePointerGlow() {
  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
    }

    window.addEventListener('pointermove', handlePointer, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointer)
  }, [])
}
