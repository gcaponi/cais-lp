import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Manifesto() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    const content = contentRef.current
    if (!section || !grid || !content) return

    const lines = grid.querySelectorAll('.grid-line')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'center top',
        scrub: 0.5,
      },
    })

    tl.to(lines, {
      x: '150vw',
      y: '-25vh',
      stagger: 0.08,
      ease: 'power2.inOut',
    })

    gsap.fromTo(
      content.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60vh] overflow-hidden py-24 px-6"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div
        ref={gridRef}
        className="absolute inset-0 flex justify-around pointer-events-none"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="grid-line w-[1px] h-[120%]"
            style={{ backgroundColor: 'var(--border-color)', transformOrigin: 'top center' }}
          />
        ))}
      </div>

      <div ref={contentRef} className="relative z-10 max-w-[1280px] mx-auto text-center">
        <h2
          className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl md:text-[40px] tracking-tight leading-[1.2] max-w-[900px] mx-auto mb-8"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('manifesto.heading')}
        </h2>
        <p
          className="text-base sm:text-lg max-w-[800px] mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('manifesto.body')}
        </p>
        <button
          onClick={() => {
            const el = document.querySelector('#tecnologie')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }}
          className="inline-flex items-center gap-2 font-semibold text-sm px-8 py-3 rounded-full border transition-all duration-300 hover:bg-[var(--accent-cyan)] hover:text-[var(--text-inverse)]"
          style={{
            borderColor: 'var(--accent-cyan)',
            color: 'var(--accent-cyan)',
          }}
        >
          {t('manifesto.cta')}
        </button>
      </div>
    </section>
  )
}
