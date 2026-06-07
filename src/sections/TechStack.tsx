import { useTranslation } from 'react-i18next'
import type { CSSProperties } from 'react'
import { SectionHeader } from '@/components/SectionHeader'

const tech = [
  'OpenClaw',
  'HERMES',
  'LangChain',
  'ChromaDB',
  'FastAPI',
  'React',
  'TypeScript',
  'Docker',
  'VPS',
  'TailScale',
  'UFW',
  'Fail2Ban',
  'OpenAI',
  'Claude',
  'PyTorch',
  'PostgreSQL',
  'CrewAI',
  'Obsidian',
]

const sectionCopy = {
  it: {
    eyebrow: 'Stack',
    title: 'Tecnologia percepita come potenza, non come lista piatta.',
    body:
      'Il nuovo layout trasforma lo stack in un ecosistema visivo con profondità, luce e movimento costante — gli stessi tool che usiamo per i nostri clienti enterprise.',
  },
  en: {
    eyebrow: 'Stack',
    title: 'Technology felt as power, not a flat list.',
    body:
      'The new layout turns the stack into a visual ecosystem with depth, light and constant motion — the same tools we use for our enterprise clients.',
  },
  'pt-BR': {
    eyebrow: 'Stack',
    title: 'Tecnologia sentida como potência, não como lista plana.',
    body:
      'O novo layout transforma o stack num ecossistema visual com profundidade, luz e movimento constante — as mesmas ferramentas que usamos para clientes enterprise.',
  },
}

export default function TechStack() {
  const { i18n } = useTranslation()
  const lng = (i18n.language || 'it').split('-')[0] as 'it' | 'en' | 'pt-BR'
  const copy = sectionCopy[lng] ?? sectionCopy.it

  return (
    <section id="stack" className="tech-section">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title}>
        {copy.body}
      </SectionHeader>
      <div className="tech-cloud reveal-up">
        {tech.map((item, index) => (
          <span key={item} style={{ '--i': index } as CSSProperties}>
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
