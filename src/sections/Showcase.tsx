import { useTranslation } from 'react-i18next'
import { SectionHeader } from '@/components/SectionHeader'

const cards = [
  { titleKey: 'showcase.card1_title', descKey: 'showcase.card1_desc', image: '/ai-agents.jpg' },
  { titleKey: 'showcase.card2_title', descKey: 'showcase.card2_desc', image: '/security.jpg' },
  { titleKey: 'showcase.card3_title', descKey: 'showcase.card3_desc', image: '/automation.jpg' },
] as const

export default function Showcase() {
  const { t } = useTranslation()

  return (
    <section id="capability" className="showcase-section">
      <SectionHeader eyebrow={t('showcase.eyebrow')} title={t('showcase.title')}>
        {t('showcase.body')}
      </SectionHeader>

      <div className="showcase-grid">
        {cards.map((card, index) => (
          <article className="showcase-card reveal-up" key={card.titleKey} style={{ animationDelay: `${index * 0.08}s` }}>
            <div className="showcase-card__media">
              <img src={card.image} alt="" loading="lazy" decoding="async" />
              <div className="showcase-card__overlay" aria-hidden="true" />
            </div>
            <div className="showcase-card__body">
              <h3>{t(card.titleKey)}</h3>
              <p>{t(card.descKey)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
