import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowDown, ArrowUpRight, Bot, BrainCircuit, ShieldCheck, Workflow } from 'lucide-react'
import { MagneticButton } from '@/components/MagneticButton'

type HeroProps = { onCta: () => void }

export default function Hero({ onCta }: HeroProps) {
  const { t } = useTranslation()

  const proof = useMemo(
    () => [
      { value: t('hero.proof_1_value'), label: t('hero.proof_1_label') },
      { value: t('hero.proof_2_value'), label: t('hero.proof_2_label') },
      { value: t('hero.proof_3_value'), label: t('hero.proof_3_label') },
    ],
    [t],
  )

  const agents = useMemo(
    () => [
      { name: t('hero.agent_strategy'), tag: t('hero.agent_strategy_tag'), value: 92 },
      { name: t('hero.agent_ops'), tag: t('hero.agent_ops_tag'), value: 78 },
      { name: t('hero.agent_data'), tag: t('hero.agent_data_tag'), value: 65 },
    ],
    [t],
  )

  return (
    <section id="top" className="hero-section">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-aura" />
        <div className="hero-grid" />
        <div className="hero-brain-bg">
          <img src="/cais-brand.jpg" alt="" loading="eager" decoding="async" />
        </div>
        <div className="floating-node floating-node--one" />
        <div className="floating-node floating-node--two" />
        <div className="floating-node floating-node--three" />
        <div className="floating-node floating-node--four" />
      </div>

      <div className="hero-layout">
        <div className="hero-content">
          <div className="hero-kicker hero-copy">
            <span className="pulse-dot" />
            <span>{t('hero.kicker')}</span>
          </div>

          <h1 className="hero-title" aria-label={`${t('hero.line1')} ${t('hero.line2')} ${t('hero.line3')}`}>
            <span className="hero-title__mask">
              <span className="hero-title-line">{t('hero.line1')}</span>
            </span>
            <span className="hero-title__mask">
              <span className="hero-title-line hero-title-line--accent">{t('hero.line2')}</span>
            </span>
            <span className="hero-title__mask">
              <span className="hero-title-line">{t('hero.line3')}</span>
            </span>
          </h1>

          <p className="hero-description hero-copy">{t('hero.description')}</p>

          <div className="hero-actions">
            <MagneticButton className="magnetic-button--primary hero-cta" onClick={onCta}>
              {t('hero.cta_primary')}
              <ArrowUpRight size={18} />
            </MagneticButton>
            <MagneticButton
              className="magnetic-button--ghost hero-cta"
              onClick={() => document.querySelector('#metodo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta_secondary')}
              <ArrowDown size={18} />
            </MagneticButton>
          </div>

          <div className="hero-proof-grid">
            {proof.map((item) => (
              <div className="hero-proof" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="hero-orbit" aria-label="CAIS AI core">
          <div className="orbit-card orbit-card--main">
            <div className="orbit-card__topline">
              <span>CAIS · Agentic OS</span>
              <strong>LIVE</strong>
            </div>

            <div className="orbit-core" aria-hidden="true">
              <BrainCircuit size={52} />
            </div>

            <div className="orbit-card__stack">
              {agents.map((agent) => (
                <div className="orbit-row" key={agent.name}>
                  <span className="orbit-row__agent">
                    <Bot size={15} />
                    {agent.name}
                  </span>
                  <span className="orbit-row__bar" aria-hidden="true">
                    <span style={{ transform: `scaleX(${agent.value / 100})` }} />
                  </span>
                  <span className="orbit-row__tag">{agent.tag}</span>
                </div>
              ))}
            </div>

            <div className="orbit-wave" aria-hidden="true" />
            <p>{t('hero.orbit_caption')}</p>
          </div>

          <div className="orbit-pill orbit-pill--one">
            <Bot size={18} />
            {t('hero.pill_agents')}
          </div>
          <div className="orbit-pill orbit-pill--two">
            <Workflow size={18} />
            {t('hero.pill_workflow')}
          </div>
          <div className="orbit-pill orbit-pill--three">
            <ShieldCheck size={18} />
            {t('hero.pill_secure')}
          </div>
        </aside>
      </div>
    </section>
  )
}
