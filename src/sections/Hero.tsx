import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 })
    
    tl.to(line1Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(line2Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to(line3Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')

    return () => { tl.kill() }
  }, [])

  const scrollToServices = () => {
    const el = document.querySelector('#servizi')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      <div className="max-w-[1280px] w-full text-center">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div
            ref={line1Ref}
            className="opacity-0 translate-y-8 font-['Space_Grotesk'] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[90px] tracking-tight leading-[1.1]"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('hero.line1')}
          </div>
          <div
            ref={line2Ref}
            className="opacity-0 translate-y-8 font-['Space_Grotesk'] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[90px] tracking-tight leading-[1.1]"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('hero.line2')}
          </div>
          <div
            ref={line3Ref}
            className="opacity-0 translate-y-8 font-['Space_Grotesk'] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[90px] tracking-tight leading-[1.1]"
            style={{ color: 'var(--accent-cyan)' }}
          >
            {t('hero.line3')}
          </div>
        </div>

        <p
          ref={descRef}
          className="opacity-0 translate-y-4 text-base sm:text-lg max-w-[600px] mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('hero.description')}
        </p>

        <button
          ref={ctaRef}
          onClick={scrollToServices}
          className="opacity-0 translate-y-4 inline-flex items-center gap-2 font-semibold text-sm px-8 py-4 rounded-full hover:scale-105 transition-all duration-300"
          style={{
            backgroundColor: 'var(--accent-cyan)',
            color: 'var(--text-inverse)',
            boxShadow: '0 0 30px var(--glow-cyan)',
          }}
        >
          {t('hero.cta')}
          <ArrowDown size={16} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'var(--text-muted)' }}>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--accent-cyan)] to-transparent animate-pulse" />
      </div>
    </section>
  )
}
