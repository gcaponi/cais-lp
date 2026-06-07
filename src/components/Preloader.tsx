import { useEffect, useState } from 'react'

type PreloaderProps = { onComplete: () => void }

type Phase = 'text' | 'bar' | 'exit'

/**
 * Lightweight intro overlay. The brain is the brand mark in motion: it
 * fades in, the progress bar fills, then the whole overlay lifts off
 * and the page choreography takes over.
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>('text')

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('bar'), 700)
    const t2 = window.setTimeout(() => setPhase('exit'), 1700)
    const t3 = window.setTimeout(() => onComplete(), 2300)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
    }
  }, [onComplete])

  const isExit = phase === 'exit'
  const isBar = phase === 'bar' || phase === 'exit'

  return (
    <div className={`preloader ${isExit ? 'preloader--exit' : ''}`} aria-hidden="true">
      <div className="preloader__brain">
        <img src="/cais-brand.jpg" alt="" className="preloader__brain-img" />
        <div className="preloader__brain-glow" aria-hidden="true" />
      </div>
      <div className={`preloader__brand ${isBar ? 'preloader__brand--hidden' : ''}`}>CAIS</div>
      <div className={`preloader__bar ${isBar ? 'preloader__bar--visible' : ''}`} />
      <div className="preloader__tag">Strategic AI Consulting</div>
    </div>
  )
}
