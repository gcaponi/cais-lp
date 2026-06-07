import { useTranslation } from 'react-i18next'

const marqueeItems = [
  'AI Strategy',
  'Agentic Ops',
  'Automation',
  'RAG',
  'Python',
  'Security',
  'Cloud Native',
  'OpenClaw',
  'HERMES',
]

export default function Manifesto() {
  const { t } = useTranslation()

  return (
    <section id="manifesto" className="manifesto-section">
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, group) => (
            <div className="marquee-group" key={group}>
              {marqueeItems.map((item) => (
                <span key={`${group}-${item}`}>{item}</span>
              ))}
              <span className="marquee-divider" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
      <div className="manifesto-card reveal-up">
        <div className="manifesto-card__brain" aria-hidden="true">
          <img src="/cais-brand.jpg" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="manifesto-card__content">
          <span>{t('manifesto.eyebrow')}</span>
          <h2>{t('manifesto.heading')}</h2>
          <p>{t('manifesto.body')}</p>
        </div>
      </div>
    </section>
  )
}
