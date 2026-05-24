import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FileText, MessageSquare, BarChart3, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const icons = [FileText, MessageSquare, BarChart3, Users]

export default function Automation() {
  const { t } = useTranslation()
  const section = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])

  const tasks = [
    { title: t('automation.task1_title'), desc: t('automation.task1_desc'), Icon: icons[0] },
    { title: t('automation.task2_title'), desc: t('automation.task2_desc'), Icon: icons[1] },
    { title: t('automation.task3_title'), desc: t('automation.task3_desc'), Icon: icons[2] },
    { title: t('automation.task4_title'), desc: t('automation.task4_desc'), Icon: icons[3] },
  ]

  useEffect(() => {
    const s = section.current
    if (!s) return
    gsap.fromTo(s.querySelectorAll('.auto-reveal'), { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: s, start: 'top 75%', toggleActions: 'play none none reverse' },
    })
    cards.current.forEach((c, i) => {
      if (!c) return
      gsap.fromTo(c, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: c, start: 'top 88%', toggleActions: 'play none none reverse' },
      })
    })
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <section id="automation" ref={section} className="relative py-24 sm:py-32 px-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <span className="auto-reveal inline-block text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent-cyan)' }}>
            {t('automation.label')}
          </span>
          <h2 className="auto-reveal font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl md:text-[40px] tracking-tight leading-[1.2] max-w-[800px] mx-auto" style={{ color: 'var(--text-primary)' }}>
            {t('automation.headline')}
          </h2>
          <p className="auto-reveal mt-6 mx-auto max-w-[700px]" style={{ color: 'var(--text-secondary)' }}>
            {t('automation.description')}
          </p>
        </div>

        <div className="auto-reveal mb-12 rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
          <img src="/automation-workflow.jpg" alt="Automation Workflow" className="w-full h-auto object-cover max-h-[400px]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tasks.map((task, i) => (
            <div
              key={task.title}
              ref={(el) => { cards.current[i] = el }}
              className="group p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:border-[var(--accent-cyan)]/40"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-cyan)]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <task.Icon size={22} style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <h3 className="font-['Space_Grotesk'] font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{task.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{task.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {[
            { value: t('automation.stat1_value'), label: t('automation.stat1_label') },
            { value: t('automation.stat2_value'), label: t('automation.stat2_label') },
            { value: t('automation.stat3_value'), label: t('automation.stat3_label') },
          ].map((s) => (
            <div key={s.label} className="text-center p-8 rounded-2xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <div className="font-['Space_Grotesk'] font-bold text-4xl md:text-5xl" style={{ color: 'var(--accent-cyan)' }}>{s.value}</div>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
