import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { Layers3, Rocket, Network } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'

const sectionCopy = {
  it: {
    eyebrow: 'Metodo',
    title: 'Dal caos operativo a un sistema AI vivo.',
    body:
      'Una ristrutturazione non è solo estetica. È un metodo: partiamo dall’ascolto dei processi, costruiamo prototipi misurabili, portiamo in produzione con monitoraggio e miglioramento continuo.',
  },
  en: {
    eyebrow: 'Method',
    title: 'From operational chaos to a living AI system.',
    body:
      'A redesign is not just visual. It is a method: we start by listening to your processes, ship measurable prototypes, then take them to production with monitoring and continuous improvement.',
  },
  'pt-BR': {
    eyebrow: 'Método',
    title: 'Do caos operacional a um sistema AI vivo.',
    body:
      'Uma reestruturação não é só estética. É método: começamos ouvindo os processos, entregamos protótipos mensuráveis e levamos para produção com monitoramento e melhoria contínua.',
  },
}

const stepCopy = {
  it: [
    {
      title: 'Audit AI',
      body:
        'Mappiamo processi, dati, strumenti e colli di bottiglia. Niente codice prima di aver capito dove nasce il valore e dove si perde.',
      icon: Layers3,
    },
    {
      title: 'Prototype sprint',
      body:
        'Costruiamo un prototipo interattivo — agente, automazione o dashboard — testabile dal tuo team in poche settimane, con KPI chiari.',
      icon: Rocket,
    },
    {
      title: 'Production deploy',
      body:
        'Portiamo tutto in produzione: monitoraggio, sicurezza, documentazione, runbook. Poi iteriamo, perché il valore vero nasce dopo il go-live.',
      icon: Network,
    },
  ],
  en: [
    {
      title: 'AI Audit',
      body:
        'We map processes, data, tools and bottlenecks. No code until we know where value is created and where it leaks.',
      icon: Layers3,
    },
    {
      title: 'Prototype sprint',
      body:
        'We build an interactive prototype — agent, automation or dashboard — your team can test in weeks, with clear KPIs.',
      icon: Rocket,
    },
    {
      title: 'Production deploy',
      body:
        'We take it to production: monitoring, security, docs, runbooks. Then we iterate, because real value is born after go-live.',
      icon: Network,
    },
  ],
  'pt-BR': [
    {
      title: 'Audit AI',
      body:
        'Mapeamos processos, dados, ferramentas e gargalos. Nada de código antes de entender onde o valor nasce e onde se perde.',
      icon: Layers3,
    },
    {
      title: 'Sprint de protótipo',
      body:
        'Construímos um protótipo interativo — agente, automação ou dashboard — testável pela sua equipa em poucas semanas, com KPIs claros.',
      icon: Rocket,
    },
    {
      title: 'Deploy em produção',
      body:
        'Levamos tudo para produção: monitoramento, segurança, documentação, runbooks. Depois iteramos, porque o valor real nasce após o go-live.',
      icon: Network,
    },
  ],
}

export default function Roadmap() {
  const { i18n } = useTranslation()
  const lng = (i18n.language || 'it').split('-')[0] as 'it' | 'en' | 'pt-BR'
  const copy = sectionCopy[lng] ?? sectionCopy.it
  const steps = stepCopy[lng] ?? stepCopy.it

  return (
    <section id="metodo" className="roadmap-section">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title}>
        {copy.body}
      </SectionHeader>
      <div className="roadmap-grid">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <article className="roadmap-card reveal-up" key={step.title} style={{ '--step': index + 1 } as CSSProperties}>
              <div className="roadmap-card__icon">
                <Icon size={24} />
              </div>
              <span className="roadmap-step">Step 0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
