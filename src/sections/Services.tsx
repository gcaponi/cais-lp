import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, DatabaseZap, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'

type Service = {
  title: string
  desc: string
  icon: LucideIcon
  features: string[]
}

const sectionCopy = {
  it: {
    eyebrow: 'Servizi',
    title: 'Capacità tecniche trasformate in risultati di business.',
    body:
      'Tre linee di offerta, presentate con card più dinamiche, hover magnetici, micro-interazioni. La priorità è la conversione: ogni tile apre a una conversazione.',
  },
  en: {
    eyebrow: 'Services',
    title: 'Technical capability turned into business outcomes.',
    body:
      'Three service lines, presented with dynamic cards, magnetic hover, micro-interactions. Conversion is the priority: every tile opens a conversation.',
  },
  'pt-BR': {
    eyebrow: 'Serviços',
    title: 'Capacidade técnica transformada em resultado de negócio.',
    body:
      'Três linhas de oferta, apresentadas com cards dinâmicos, hover magnético, micro-interações. Conversão é prioridade: cada tile abre uma conversa.',
  },
}

export default function Services() {
  const { t, i18n } = useTranslation()
  const lng = (i18n.language || 'it').split('-')[0] as 'it' | 'en' | 'pt-BR'
  const copy = sectionCopy[lng] ?? sectionCopy.it

  const services: Service[] = [
    {
      title: t('services.card1_title'),
      desc: t('services.card1_desc'),
      icon: Sparkles,
      features: [t('services.feature1_1'), t('services.feature1_2'), t('services.feature1_3')],
    },
    {
      title: t('services.card2_title'),
      desc: t('services.card2_desc'),
      icon: DatabaseZap,
      features: [t('services.feature2_1'), t('services.feature2_2'), t('services.feature2_3')],
    },
    {
      title: t('services.card3_title'),
      desc: t('services.card3_desc'),
      icon: ShieldCheck,
      features: [t('services.feature3_1'), t('services.feature3_2'), t('services.feature3_3')],
    },
  ]

  return (
    <section id="servizi" className="services-section">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title}>
        {copy.body}
      </SectionHeader>
      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <article
              className="service-card reveal-up"
              key={service.title}
              style={{ '--delay': `${index * 0.08}s` } as CSSProperties}
            >
              <div className="service-card__shine" aria-hidden="true" />
              <div className="service-card__icon">
                <Icon size={28} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <ul>
                {service.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}
