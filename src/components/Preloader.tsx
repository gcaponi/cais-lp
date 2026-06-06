import { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const { isDark } = useTheme()
  const [phase, setPhase] = useState<'text' | 'line' | 'exit'>('text')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('line'), 800)
    const t2 = setTimeout(() => setPhase('exit'), 1800)
    const t3 = setTimeout(() => onComplete(), 2400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-transform duration-700 ease-in-out ${
        phase === 'exit' ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ backgroundColor: isDark ? '#030712' : '#F8FAFC' }}
    >
      <div
        className={`font-['Space_Grotesk'] font-bold text-5xl tracking-tight transition-all duration-500 ${
          phase === 'text' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
        style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
      >
        CAIS
      </div>
      <div
        className={`mt-6 h-[2px] transition-all duration-700 ease-out ${
          phase === 'line' || phase === 'exit' ? 'w-48 opacity-100' : 'w-0 opacity-0'
        }`}
        style={{ backgroundColor: 'var(--accent-cyan)' }}
      />
    </div>
  )
}
