import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'

const magneticStrength = 0.18

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  ariaLabel?: string
}

/**
 * A button or anchor that subtly follows the pointer. Stays calm — no
 * spring overshoot, just enough nudge to feel alive.
 */
export function MagneticButton({ children, className = '', onClick, href, ariaLabel }: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null)

  const setRef = (node: HTMLAnchorElement | HTMLButtonElement | null) => {
    ref.current = node
  }

  const handleMove = (event: ReactPointerEvent<HTMLElement>) => {
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * magneticStrength
    const y = (event.clientY - rect.top - rect.height / 2) * magneticStrength
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0, 0, 0)'
  }

  const baseClass = `magnetic-button ${className}`

  if (href) {
    return (
      <a
        ref={setRef}
        href={href}
        className={baseClass}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={setRef}
      type="button"
      className={baseClass}
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
