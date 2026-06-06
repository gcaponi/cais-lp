import { useEffect, useMemo, useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent, type PointerEvent as ReactPointerEvent, type ReactNode, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Check,
  ChevronRight,
  Cpu,
  DatabaseZap,
  Globe2,
  Layers3,
  Loader2,
  Mail,
  Menu,
  Moon,
  Network,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  Workflow,
  X,
  type LucideIcon,
} from 'lucide-react'

import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const WEB3FORMS_KEY = '41954813-1e79-4b15-bd51-e7fa3578dd45'
const CONTACT_EMAIL = 'caponi.ai.studio@gmail.com'

type NavItem = {
  label: string
  href: string
}

type Spotlight = {
  label: string
  headline: string
  body: string
  icon: LucideIcon
  stats: Array<{ value: string; label: string }>
  chips: string[]
}

type Service = {
  title: string
  desc: string
  icon: LucideIcon
  features: string[]
}

type FieldName = 'name' | 'email' | 'phone' | 'message'

type FormState = Record<FieldName, string>

type SubmitState = 'idle' | 'sending' | 'sent' | 'error'
type SupportedLanguage = 'it' | 'en' | 'pt-BR'

const supportedLanguages: Array<{ code: SupportedLanguage; label: string }> = [
  { code: 'it', label: 'IT' },
  { code: 'en', label: 'EN' },
  { code: 'pt-BR', label: 'PT-BR' },
]

const magneticStrength = 0.18

function useWowMotion<T extends HTMLElement>(rootRef: RefObject<T | null>) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      gsap.set('.hero-title-line', { yPercent: 110, rotateX: -18, opacity: 0 })
      gsap.set('.hero-copy, .hero-cta, .hero-proof, .hero-orbit', { y: 28, opacity: 0 })

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
      intro
        .to('.hero-title-line', { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.05, stagger: 0.12 })
        .to('.hero-copy', { y: 0, opacity: 1, duration: 0.75 }, '-=0.55')
        .to('.hero-cta', { y: 0, opacity: 1, duration: 0.75, stagger: 0.08 }, '-=0.45')
        .to('.hero-proof', { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, '-=0.35')
        .to('.hero-orbit', { y: 0, opacity: 1, duration: 0.9 }, '-=0.65')

      gsap.to('.hero-aura', {
        rotate: 360,
        duration: 34,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      gsap.to('.floating-node', {
        y: (i) => [-16, 18, -10, 22][i % 4],
        x: (i) => [12, -10, 16, -14][i % 4],
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.25,
      })

      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 70, opacity: 0, filter: 'blur(14px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('.parallax-soft').forEach((el) => {
        gsap.to(el, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.spotlight-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 120, rotateX: -8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
              end: 'top 42%',
              scrub: 0.8,
            },
          },
        )

        gsap.to(card.querySelector('.spotlight-glow'), {
          opacity: index % 2 === 0 ? 0.75 : 0.45,
          scale: 1.18,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      gsap.utils.toArray<HTMLElement>('.metric-count').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.88, opacity: 0.35 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.8)',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    }, rootRef)

    return () => {
      ctx.revert()
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [rootRef])
}

function usePointerGlow() {
  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
    }

    window.addEventListener('pointermove', handlePointer, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointer)
  }, [])
}

function MagneticButton({ children, className = '', onClick, href }: { children: ReactNode; className?: string; onClick?: () => void; href?: string }) {
  const ref = useRef<HTMLElement | null>(null)

  const setRef = (node: HTMLAnchorElement | HTMLButtonElement | null) => {
    ref.current = node
  }

  const handleMove = (event: ReactPointerEvent<HTMLElement>) => {
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * magneticStrength
    const y = (event.clientY - rect.top - rect.height / 2) * magneticStrength
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0, 0, 0)'
  }

  const baseClass = `magnetic-button ${className}`

  if (href) {
    return (
      <a ref={setRef} href={href} className={baseClass} onPointerMove={handleMove} onPointerLeave={handleLeave}>
        {children}
      </a>
    )
  }

  return (
    <button ref={setRef} type="button" className={baseClass} onClick={onClick} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      {children}
    </button>
  )
}

function ScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>('.scroll-progress__bar')
    if (!bar) return

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max <= 0 ? 0 : window.scrollY / max
      bar.style.transform = `scaleX(${progress})`
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" />
    </div>
  )
}

function Navigation({ items }: { items: NavItem[] }) {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
      <button className="brand-mark" type="button" onClick={() => goTo('#top')} aria-label="CAIS home">
        <span className="brand-mark__glyph">C</span>
        <span>
          <strong>CAIS</strong>
          <small>Strategic AI Consulting</small>
        </span>
      </button>

      <nav className="site-nav__links" aria-label="Navigazione principale">
        {items.map((item) => (
          <button key={item.href} type="button" onClick={() => goTo(item.href)}>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="site-nav__actions">
        <div className="language-switcher" aria-label="Cambia lingua">
          <Globe2 size={16} />
          {supportedLanguages.map((item) => (
            <button
              key={item.code}
              type="button"
              className={item.code === language ? 'language-option language-option--active' : 'language-option'}
              onClick={() => setLanguage(item.code)}
              aria-pressed={item.code === language}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button type="button" className="icon-button" onClick={toggleTheme} aria-label="Cambia tema">
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button type="button" className="icon-button icon-button--mobile" onClick={() => setOpen((value) => !value)} aria-label="Apri menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`mobile-panel ${open ? 'mobile-panel--open' : ''}`}>
        {items.map((item) => (
          <button key={item.href} type="button" onClick={() => goTo(item.href)}>
            {item.label}
            <ChevronRight size={18} />
          </button>
        ))}
        <div className="mobile-language-row" aria-label="Lingue disponibili">
          {supportedLanguages.map((item) => (
            <button
              key={item.code}
              type="button"
              className={item.code === language ? 'language-option language-option--active' : 'language-option'}
              onClick={() => setLanguage(item.code)}
              aria-pressed={item.code === language}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="section-eyebrow reveal-up">
      <Sparkles size={15} />
      <span>{children}</span>
    </div>
  )
}

function SectionHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="section-header">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="reveal-up">{title}</h2>
      {children ? <p className="section-header__copy reveal-up">{children}</p> : null}
    </div>
  )
}

function Hero({ onCta }: { onCta: () => void }) {
  const { t } = useTranslation()
  const proof = useMemo(
    () => [
      { value: '10x', label: t('openclaw.stat1_label') },
      { value: '24/7', label: t('openclaw.stat3_label') },
      { value: '2x', label: t('python.stat3_label') },
    ],
    [t],
  )

  return (
    <section id="top" className="hero-section">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-aura" />
        <div className="hero-grid" />
        <div className="floating-node floating-node--one" />
        <div className="floating-node floating-node--two" />
        <div className="floating-node floating-node--three" />
        <div className="floating-node floating-node--four" />
      </div>

      <div className="hero-layout">
        <div className="hero-content">
          <div className="hero-kicker hero-copy">
            <Sparkles size={16} />
            <span>AI transformation studio</span>
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
              {t('hero.cta')}
              <ArrowUpRight size={18} />
            </MagneticButton>
            <MagneticButton className="magnetic-button--ghost hero-cta" onClick={() => document.querySelector('#roadmap')?.scrollIntoView({ behavior: 'smooth' })}>
              Guarda la roadmap
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

        <aside className="hero-orbit" aria-label="Sistema AI CAIS">
          <div className="orbit-card orbit-card--main">
            <div className="orbit-card__topline">
              <span>CAIS OS</span>
              <strong>LIVE</strong>
            </div>
            <div className="orbit-core">
              <BrainCircuit size={54} />
            </div>
            <div className="orbit-wave" />
            <p>Agent orchestration, automation and AI deployment in one strategic layer.</p>
          </div>
          <div className="orbit-pill orbit-pill--one">
            <Bot size={18} />
            Agenti AI
          </div>
          <div className="orbit-pill orbit-pill--two">
            <Workflow size={18} />
            Workflow
          </div>
          <div className="orbit-pill orbit-pill--three">
            <ShieldCheck size={18} />
            Secure deploy
          </div>
        </aside>
      </div>
    </section>
  )
}

function Manifesto() {
  const { t } = useTranslation()
  return (
    <section id="manifesto" className="manifesto-section">
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, group) => (
            <div className="marquee-group" key={group}>
              <span>AI Agents</span>
              <span>Automation</span>
              <span>Python</span>
              <span>Cloud</span>
              <span>RAG</span>
              <span>Security</span>
              <span>Strategy</span>
            </div>
          ))}
        </div>
      </div>
      <div className="manifesto-card reveal-up">
        <span>Manifesto</span>
        <h2>{t('manifesto.heading')}</h2>
        <p>{t('manifesto.body')}</p>
      </div>
    </section>
  )
}

function SpotlightSection({ items }: { items: Spotlight[] }) {
  return (
    <section id="soluzioni" className="spotlight-section">
      <SectionHeader eyebrow="Soluzioni proprietarie" title="Un sito più cinematografico, una proposta più chiara.">
        Ogni blocco racconta cosa CAIS fa, mentre il movimento guida l'utente verso una richiesta di contatto.
      </SectionHeader>

      <div className="spotlight-stack">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <article className="spotlight-card" key={item.label}>
              <div className="spotlight-glow" aria-hidden="true" />
              <div className="spotlight-card__visual parallax-soft">
                <div className="spotlight-ring">
                  <Icon size={58} />
                </div>
                <div className="spotlight-index">0{index + 1}</div>
              </div>
              <div className="spotlight-card__content">
                <span className="spotlight-label">{item.label}</span>
                <h3>{item.headline}</h3>
                <p>{item.body}</p>
                <div className="chip-row">
                  {item.chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
                <div className="metric-row">
                  {item.stats.map((stat) => (
                    <div className="metric" key={`${item.label}-${stat.label}`}>
                      <strong className="metric-count">{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function Roadmap() {
  const steps = [
    {
      title: 'Audit AI',
      body: 'Mappiamo processi, dati, strumenti e colli di bottiglia con una visione strategica prima di scrivere codice.',
      icon: Layers3,
    },
    {
      title: 'Prototype sprint',
      body: 'Creiamo un prototipo interattivo: agente, automazione o dashboard pronta per essere testata dal team.',
      icon: Rocket,
    },
    {
      title: 'Production deploy',
      body: 'Portiamo tutto in produzione con monitoraggio, sicurezza, documentazione e miglioramento continuo.',
      icon: Network,
    },
  ]

  return (
    <section id="roadmap" className="roadmap-section">
      <SectionHeader eyebrow="Metodo" title="Dal caos operativo a un sistema AI vivo.">
        La ristrutturazione visuale deve comunicare anche metodo: non solo effetto WOW, ma percorso chiaro verso valore misurabile.
      </SectionHeader>
      <div className="roadmap-grid">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <article className="roadmap-card reveal-up" key={step.title} style={{ '--step': index + 1 } as CSSProperties}>
              <div className="roadmap-card__icon">
                <Icon size={24} />
              </div>
              <span>Step 0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function Services({ services }: { services: Service[] }) {
  return (
    <section id="servizi" className="services-section">
      <SectionHeader eyebrow="Servizi" title="Capacità tecniche trasformate in risultati visibili.">
        Tre linee di offerta, presentate con card più dinamiche, hover magnetici, micro-interazioni e priorità alla conversione.
      </SectionHeader>
      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <article className="service-card reveal-up" key={service.title} style={{ '--delay': `${index * 0.08}s` } as CSSProperties}>
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

function TechStack() {
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
  ]

  return (
    <section id="stack" className="tech-section">
      <SectionHeader eyebrow="Stack" title="Tecnologia percepita come potenza, non come lista piatta.">
        Il nuovo layout trasforma lo stack in un ecosistema visivo con profondità, luce e movimento costante.
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

function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [state, setState] = useState<SubmitState>('idle')
  const [serverMessage, setServerMessage] = useState('')

  const update = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    if (errors[name as FieldName]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[name as FieldName]
        return next
      })
    }
  }

  const validate = () => {
    const next: Partial<Record<FieldName, string>> = {}
    if (form.name.trim().length < 2) next.name = t('contact.error_name')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t('contact.error_email')
    if (form.message.trim().length < 10) next.message = t('contact.error_message')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return

    setState('sending')
    setServerMessage('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Nuovo contatto da CAIS Landing Page',
          from_name: 'CAIS Landing Page',
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      })

      const data = (await response.json()) as { success?: boolean; message?: string }
      if (!response.ok || !data.success) throw new Error(data.message || 'Invio non riuscito. Riprova.')

      setState('sent')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      setState('error')
      setServerMessage(error instanceof Error ? error.message : 'Errore di rete. Riprova tra poco.')
    }
  }

  return (
    <section id="contatti" className="contact-section">
      <div className="contact-shell">
        <div className="contact-copy reveal-up">
          <SectionEyebrow>Contatto</SectionEyebrow>
          <h2>{t('contact.heading')}</h2>
          <p>{t('contact.body')}</p>
          <a className="contact-mail" href={`mailto:${CONTACT_EMAIL}`}>
            <Mail size={18} />
            {CONTACT_EMAIL}
          </a>
        </div>

        <form className="contact-form reveal-up" onSubmit={submit} noValidate>
          <div className="form-grid">
            <label>
              <span>{t('contact.form_name')}</span>
              <input name="name" value={form.name} onChange={update} placeholder={t('contact.form_name_placeholder')} autoComplete="name" />
              {errors.name ? <small>{errors.name}</small> : null}
            </label>
            <label>
              <span>{t('contact.form_email')}</span>
              <input name="email" value={form.email} onChange={update} placeholder={t('contact.form_email_placeholder')} autoComplete="email" />
              {errors.email ? <small>{errors.email}</small> : null}
            </label>
          </div>
          <label>
            <span>{t('contact.form_phone')}</span>
            <input name="phone" value={form.phone} onChange={update} placeholder={t('contact.form_phone_placeholder')} autoComplete="tel" />
          </label>
          <label>
            <span>{t('contact.form_message')}</span>
            <textarea name="message" value={form.message} onChange={update} placeholder={t('contact.form_message_placeholder')} rows={5} />
            {errors.message ? <small>{errors.message}</small> : null}
          </label>

          {state === 'sent' ? <p className="form-success">{t('contact.success_body')}</p> : null}
          {state === 'error' ? <p className="form-error">{serverMessage}</p> : null}

          <button type="submit" className="submit-button" disabled={state === 'sending'}>
            {state === 'sending' ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
            {state === 'sending' ? t('contact.submit_loading') : t('contact.submit')}
          </button>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer-section">
      <div>
        <strong>CAIS</strong>
        <span>Strategic AI Consulting</span>
      </div>
      <p>© 2026 CAIS. AI agents, automation and software systems.</p>
    </footer>
  )
}

export default function Home() {
  const { t } = useTranslation()
  const rootRef = useRef<HTMLDivElement | null>(null)
  useWowMotion(rootRef)
  usePointerGlow()

  const navItems = useMemo<NavItem[]>(
    () => [
      { label: 'Soluzioni', href: '#soluzioni' },
      { label: 'Roadmap', href: '#roadmap' },
      { label: t('nav.services'), href: '#servizi' },
      { label: t('nav.contact'), href: '#contatti' },
    ],
    [t],
  )

  const spotlights = useMemo<Spotlight[]>(
    () => [
      {
        label: t('openclaw.label'),
        headline: t('openclaw.headline'),
        body: t('openclaw.description'),
        icon: Bot,
        chips: [t('openclaw.feature1_title'), t('openclaw.feature2_title'), t('openclaw.feature3_title')],
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
        chips: [t('hermes.feature1_title'), t('hermes.feature2_title'), t('hermes.feature3_title')],
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
        chips: [t('automation.task1_title'), t('automation.task2_title'), t('automation.task3_title')],
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
        chips: [t('python.feature1_title'), t('python.feature2_title'), t('python.feature3_title')],
        stats: [
          { value: t('python.stat1_value'), label: t('python.stat1_label') },
          { value: t('python.stat2_value'), label: t('python.stat2_label') },
          { value: t('python.stat3_value'), label: t('python.stat3_label') },
        ],
      },
    ],
    [t],
  )

  const services = useMemo<Service[]>(
    () => [
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
    ],
    [t],
  )

  return (
    <div ref={rootRef} className="cais-wow-page">
      <ScrollProgress />
      <div className="cursor-glow" aria-hidden="true" />
      <Navigation items={navItems} />
      <main>
        <Hero onCta={() => document.querySelector('#servizi')?.scrollIntoView({ behavior: 'smooth' })} />
        <Manifesto />
        <SpotlightSection items={spotlights} />
        <Roadmap />
        <Services services={services} />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
