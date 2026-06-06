import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Bot, Globe, Server } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const serviceIcons = [Bot, Globe, Server]

export default function Services() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<(HTMLDivElement | null)[]>([])

  const services = [
    {
      icon: serviceIcons[0],
      title: t('services.card1_title'),
      desc: t('services.card1_desc'),
      features: [t('services.feature1_1'), t('services.feature1_2'), t('services.feature1_3')],
    },
    {
      icon: serviceIcons[1],
      title: t('services.card2_title'),
      desc: t('services.card2_desc'),
      features: [t('services.feature2_1'), t('services.feature2_2'), t('services.feature2_3')],
    },
    {
      icon: serviceIcons[2],
      title: t('services.card3_title'),
      desc: t('services.card3_desc'),
      features: [t('services.feature3_1'), t('services.feature3_2'), t('services.feature3_3')],
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    pillarsRef.current.forEach((pillar, i) => {
      if (!pillar) return
      gsap.fromTo(
        pillar,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: i * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pillar,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      id="servizi"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-6 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl md:text-[40px] tracking-tight mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('services.heading')}
          </h2>
          <p
            className="text-base sm:text-lg max-w-[700px] mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t('services.subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                ref={(el) => { pillarsRef.current[index] = el }}
              >
                <div
                  className="border rounded-2xl p-8 h-full transition-all duration-500 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    boxShadow: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-cyan)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(34,211,238,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110"
                    style={{ backgroundColor: 'var(--accent-cyan-bg)' }}
                  >
                    <Icon size={28} style={{ color: 'var(--accent-cyan)' }} />
                  </div>

                  <h3
                    className="font-['Space_Grotesk'] font-semibold text-2xl mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {service.desc}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: 'var(--accent-cyan)' }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
