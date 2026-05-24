import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, BrainCircuit, Layers, Lock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const icons = [Code2, BrainCircuit, Layers, Lock]

export default function PythonAI() {
  const { t } = useTranslation()
  const section = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])

  const features = [
    { title: t('python.feature1_title'), desc: t('python.feature1_desc'), Icon: icons[0] },
    { title: t('python.feature2_title'), desc: t('python.feature2_desc'), Icon: icons[1] },
    { title: t('python.feature3_title'), desc: t('python.feature3_desc'), Icon: icons[2] },
    { title: t('python.feature4_title'), desc: t('python.feature4_desc'), Icon: icons[3] },
  ]

  useEffect(() => {
    const s = section.current
    if (!s) return
    gsap.fromTo(s.querySelectorAll('.py-reveal'), { opacity: 0, y: 50 }, {
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
    <section id="python" ref={section} className="relative py-24 sm:py-32 px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <span className="py-reveal inline-block text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: '#22c55e' }}>
            {t('python.label')}
          </span>
          <h2 className="py-reveal font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl md:text-[40px] tracking-tight leading-[1.2] max-w-[800px] mx-auto" style={{ color: 'var(--text-primary)' }}>
            {t('python.headline')}
          </h2>
          <p className="py-reveal mt-6 mx-auto max-w-[700px]" style={{ color: 'var(--text-secondary)' }}>
            {t('python.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="py-reveal rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
            <img src="/api/images/python-ai-dev.jpg" alt="Python AI Development" className="w-full h-full object-cover min-h-[320px]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                ref={(el) => { cards.current[i] = el }}
                className="group p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:border-green-500/40"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <f.Icon size={22} className="text-green-400" />
                </div>
                <h3 className="font-['Space_Grotesk'] font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { value: t('python.stat1_value'), label: t('python.stat1_label') },
            { value: t('python.stat2_value'), label: t('python.stat2_label') },
            { value: t('python.stat3_value'), label: t('python.stat3_label') },
          ].map((s) => (
            <div key={s.label} className="text-center p-8 rounded-2xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <div className="font-['Space_Grotesk'] font-bold text-4xl md:text-5xl text-green-400">{s.value}</div>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
