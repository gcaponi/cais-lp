import { useEffect } from 'react'

/**
 * A fixed-position progress bar at the top of the page. Updates via a
 * passive scroll listener — no React re-renders per frame.
 */
export function ScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>('.scroll-progress__bar')
    if (!bar) return

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max <= 0 ? 0 : window.scrollY / max
      bar.style.transform = `scaleX(${progress})`
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" />
    </div>
  )
}
