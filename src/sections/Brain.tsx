import { useTranslation } from 'react-i18next'
import { MagneticButton } from '@/components/MagneticButton'
import { ArrowUpRight } from 'lucide-react'

const sectionCopy = {
  it: {
    eyebrow: 'Il nostro marchio',
    title: 'Una mente che lavora per la tua.',
    body:
      'Il cervello CAIS non è un logo. È la metafora di ciò che facciamo: prendiamo la complessità dei tuoi processi, la modelliamo come una rete neurale, e la trasformiamo in un sistema che impara, decide, esegue. È così che nasce la produttività agentica.',
    cta: 'Inizia con una consulenza',
  },
  en: {
    eyebrow: 'Our mark',
    title: 'A mind that works for yours.',
    body:
      'The CAIS brain is not a logo. It is the metaphor of what we do: we take the complexity of your processes, model it as a neural network, and turn it into a system that learns, decides, executes. This is how agentic productivity is born.',
    cta: 'Start with a consultation',
  },
  'pt-BR': {
    eyebrow: 'A nossa marca',
    title: 'Uma mente que trabalha para a sua.',
    body:
      'O cérebro CAIS não é um logo. É a metáfora do que fazemos: pegamos a complexidade dos seus processos, modelamos como uma rede neural e transformamos num sistema que aprende, decide, executa. É assim que nasce a produtividade agêntica.',
    cta: 'Comece com uma consultoria',
  },
}

export default function Brain() {
  const { i18n } = useTranslation()
  const lng = (i18n.language || 'it').split('-')[0] as 'it' | 'en' | 'pt-BR'
  const copy = sectionCopy[lng] ?? sectionCopy.it

  return (
    <section id="cervello" className="brain-section">
      <div className="brain-section__inner">
        <div className="brain-section__visual reveal-up">
          <img src="/cais-brand.jpg" alt="" loading="lazy" decoding="async" className="brain-section__img" />
          <div className="brain-section__halo" aria-hidden="true" />
          <div className="brain-section__ring brain-section__ring--one" aria-hidden="true" />
          <div className="brain-section__ring brain-section__ring--two" aria-hidden="true" />
          <div className="brain-section__ring brain-section__ring--three" aria-hidden="true" />
        </div>
        <div className="brain-section__copy">
          <span className="brain-section__eyebrow reveal-up">{copy.eyebrow}</span>
          <h2 className="reveal-up">{copy.title}</h2>
          <p className="reveal-up">{copy.body}</p>
          <div className="reveal-up">
            <MagneticButton
              className="magnetic-button--primary"
              onClick={() => document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {copy.cta}
              <ArrowUpRight size={18} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
