import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrainCircuit, ShieldCheck, Database } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const icons = [BrainCircuit, ShieldCheck, Database]

const tags = [
  ['Python', 'PyTorch', 'LangChain', 'CrewAI', 'HERMES Agent'],
  ['TailScale', 'UFW', 'Fail2Ban', 'VPS', 'Locale'],
  ['ChromaDB', 'SQL', 'Obsidian'],
]

const images = ['/ai-agents.jpg', '/security.jpg', '/automation.jpg']

export default function TechStack() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const cards = [
    { title: t('tech.card1_title'), desc: t('tech.card1_desc'), idx: 0 },
    { title: t('tech.card2_title'), desc: t('tech.card2_desc'), idx: 1 },
    { title: t('tech.card3_title'), desc: t('tech.card3_desc'), idx: 2 },
  ]

  return (
    <section
      id="tecnologie"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-6"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl md:text-[40px] tracking-tight mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('tech.heading')}
          </h2>
          <p
            className="text-base sm:text-lg max-w-[700px] mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t('tech.subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = icons[index]
            return (
              <div
                key={card.title}
                ref={(el) => { cardsRef.current[index] = el }}
                className="group relative border rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-cyan)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.4)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)'
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={images[index]}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, var(--bg-card), transparent)',
                    }}
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'var(--accent-cyan-bg)' }}
                    >
                      <Icon size={20} style={{ color: 'var(--accent-cyan)' }} />
                    </div>
                    <h3
                      className="font-['Space_Grotesk'] font-semibold text-xl"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {card.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags[index].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1 rounded-full border"
                        style={{
                          backgroundColor: 'var(--bg-input)',
                          color: 'var(--accent-cyan)',
                          borderColor: 'var(--border-color)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
