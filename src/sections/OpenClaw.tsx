import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Cpu, Plug, ShieldCheck, TrendingUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const icons = [Cpu, Plug, ShieldCheck, TrendingUp]

export default function OpenClaw() {
  const { t } = useTranslation()
  const section = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])

  const features = [
    { title: t('openclaw.feature1_title'), desc: t('openclaw.feature1_desc'), Icon: icons[0] },
    { title: t('openclaw.feature2_title'), desc: t('openclaw.feature2_desc'), Icon: icons[1] },
    { title: t('openclaw.feature3_title'), desc: t('openclaw.feature3_desc'), Icon: icons[2] },
    { title: t('openclaw.feature4_title'), desc: t('openclaw.feature4_desc'), Icon: icons[3] },
  ]

  useEffect(() => {
    const s = section.current
    if (!s) return

    gsap.fromTo(s.querySelectorAll('.oc-reveal'), { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: s, start: 'top 75%', toggleActions: 'play none none reverse' },
    })

    cards.current.forEach((c, i) => {
      if (!c) return
      gsap.fromTo(c, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: c, start: 'top 88%', toggleActions: 'play none none reverse' },
      })
    })

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <section id="openclaw" ref={section} className="relative py-24 sm:py-32 px-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="oc-reveal inline-block text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent-cyan)' }}>
            {t('openclaw.label')}
          </span>
          <h2 className="oc-reveal font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl md:text-[40px] tracking-tight leading-[1.2] max-w-[800px] mx-auto" style={{ color: 'var(--text-primary)' }}>
            {t('openclaw.headline')}
          </h2>
          <p className="oc-reveal mt-6 mx-auto max-w-[700px]" style={{ color: 'var(--text-secondary)' }}>
            {t('openclaw.description')}
          </p>
        </div>

        {/* Image */}
        <div className="oc-reveal mb-12 rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
          <img src="/openclaw-hero.jpg" alt="OpenClaw" className="w-full h-auto object-cover max-h-[400px]" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              ref={(el) => { cards.current[i] = el }}
              className="group p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:border-[var(--accent-cyan)]/40"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-cyan)]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <f.Icon size={22} style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <h3 className="font-['Space_Grotesk'] font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {[
            { value: t('openclaw.stat1_value'), label: t('openclaw.stat1_label') },
            { value: t('openclaw.stat2_value'), label: t('openclaw.stat2_label') },
            { value: t('openclaw.stat3_value'), label: t('openclaw.stat3_label') },
          ].map((s) => (
            <div key={s.label} className="text-center p-8 rounded-2xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <div className="font-['Space_Grotesk'] font-bold text-4xl md:text-5xl" style={{ color: 'var(--accent-cyan)' }}>
                {s.value}
              </div>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
