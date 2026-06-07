import { useTranslation } from 'react-i18next'
import { Bot, BrainCircuit, Workflow, Cpu, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'

type Spotlight = {
  label: string
  headline: string
  body: string
  icon: LucideIcon
  image: string
  bullets: string[]
  stats: Array<{ value: string; label: string }>
}

const sectionCopy = {
  it: {
    eyebrow: 'Soluzioni proprietarie',
    title: 'Quattro pilastri per integrare AI agentica nei processi core.',
    body:
      'Ogni pilastro è una leva strategica. Insieme formano un sistema operativo per la produttività agentica: agenti che lavorano sui tuoi dati, automazioni che tolgono attrito, software sicuro che regge la crescita.',
  },
  en: {
    eyebrow: 'Proprietary solutions',
    title: 'Four pillars to embed agentic AI into your core operations.',
    body:
      'Each pillar is a strategic lever. Together they form an operating system for agentic productivity: agents that act on your data, automations that remove friction, secure software that scales with you.',
  },
  'pt-BR': {
    eyebrow: 'Soluções proprietárias',
    title: 'Quatro pilares para integrar AI agêntica no core operacional.',
    body:
      'Cada pilar é uma alavanca estratégica. Juntos formam um sistema operacional para produtividade agêntica: agentes que agem nos seus dados, automações que removem atrito, software seguro que escala com você.',
  },
}

export default function Spotlight() {
  const { t, i18n } = useTranslation()
  const lng = (i18n.language || 'it').split('-')[0] as 'it' | 'en' | 'pt-BR'
  const copy = sectionCopy[lng] ?? sectionCopy.it

  const items: Spotlight[] = [
    {
      label: t('openclaw.label'),
      headline: t('openclaw.headline'),
      body: t('openclaw.description'),
      icon: Bot,
      image: '/openclaw-hero.jpg',
      bullets: [t('openclaw.feature1_title'), t('openclaw.feature2_title'), t('openclaw.feature3_title')],
      stats: [
        { value: t('openclaw.stat1_value'), label: t('openclaw.stat1_label') },
        { value: t('openclaw.stat2_value'), label: t('openclaw.stat2_label') },
        { value: t('openclaw.stat3_value'), label: t('openclaw.stat3_label') },
      ],
    },
    {
      label: t('hermes.label'),
      headline: t('hermes.headline'),
      body: t('hermes.description'),
      icon: BrainCircuit,
      image: '/hermes-agent.jpg',
      bullets: [t('hermes.feature1_title'), t('hermes.feature2_title'), t('hermes.feature3_title')],
      stats: [
        { value: t('hermes.stat1_value'), label: t('hermes.stat1_label') },
        { value: t('hermes.stat2_value'), label: t('hermes.stat2_label') },
        { value: t('hermes.stat3_value'), label: t('hermes.stat3_label') },
      ],
    },
    {
      label: t('automation.label'),
      headline: t('automation.headline'),
      body: t('automation.description'),
      icon: Workflow,
      image: '/automation-workflow.jpg',
      bullets: [t('automation.task1_title'), t('automation.task2_title'), t('automation.task3_title')],
      stats: [
        { value: t('automation.stat1_value'), label: t('automation.stat1_label') },
        { value: t('automation.stat2_value'), label: t('automation.stat2_label') },
        { value: t('automation.stat3_value'), label: t('automation.stat3_label') },
      ],
    },
    {
      label: t('python.label'),
      headline: t('python.headline'),
      body: t('python.description'),
      icon: Cpu,
      image: '/python-ai-dev.jpg',
      bullets: [t('python.feature1_title'), t('python.feature2_title'), t('python.feature3_title')],
      stats: [
        { value: t('python.stat1_value'), label: t('python.stat1_label') },
        { value: t('python.stat2_value'), label: t('python.stat2_label') },
        { value: t('python.stat3_value'), label: t('python.stat3_label') },
      ],
    },
  ]

  return (
    <section id="soluzioni" className="spotlight-section">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title}>
        {copy.body}
      </SectionHeader>

      <div className="spotlight-stack">
        {items.map((item, index) => {
          const Icon = item.icon
          // Alternate the visual side so the page feels alive
          const flipped = index % 2 === 1
          return (
            <article
              className={`spotlight-card ${flipped ? 'spotlight-card--flipped' : ''}`}
              key={item.label}
            >
              <div className="spotlight-glow" aria-hidden="true" />
              <div className="spotlight-card__visual parallax-soft">
                <img
                  src={item.image}
                  alt={item.label}
                  loading="lazy"
                  decoding="async"
                  className="spotlight-image"
                />
                <div className="spotlight-image-overlay" aria-hidden="true" />
                <div className="spotlight-badge">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
                <div className="spotlight-index">0{index + 1}</div>
              </div>
              <div className="spotlight-card__content">
                <span className="spotlight-label">{item.label}</span>
                <h3>{item.headline}</h3>
                <p>{item.body}</p>
                <ul className="spotlight-feature-list">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>
                      <span className="spotlight-bullet-dot" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="metric-row">
                  {item.stats.map((stat) => (
                    <div className="metric" key={`${item.label}-${stat.label}`}>
                      <strong className="metric-count">{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
                <a
                  className="spotlight-cta"
                  href="#contatti"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {t('spotlight.cta_learn_more', { label: item.label })}
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
