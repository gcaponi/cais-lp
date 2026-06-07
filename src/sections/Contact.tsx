import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { trpc } from '@/providers/trpc'
import { CheckCircle2, Loader2, Mail, MapPin, Send } from 'lucide-react'
import { SectionEyebrow } from '@/components/SectionHeader'

// Web3Forms is the always-on fallback. trpc is the local backend that
// also persists to DB and triggers SMTP email when configured.
const WEB3FORMS_KEY = '41954813-1e79-4b15-bd51-e7fa3578dd45'
const CONTACT_EMAIL = 'caponi.ai.studio@gmail.com'

type FieldName = 'name' | 'email' | 'phone' | 'message'
type FormState = Record<FieldName, string>
type SubmitState = 'idle' | 'sending' | 'sent' | 'error'

const sectionCopy = {
  it: {
    heading: 'Inizia la trasformazione agentica.',
    body:
      'Contattaci per una consulenza strategica gratuita. Analizziamo i tuoi processi e progettiamo una roadmap AI su misura, con agenti che lavorano davvero sui tuoi dati.',
    location_value: 'Italia — Consulenza Nazionale & Internazionale',
  },
  en: {
    heading: 'Start the agentic transformation.',
    body:
      'Reach out for a free strategic consultation. We analyze your processes and design a tailor-made AI roadmap, with agents that actually work on your data.',
    location_value: 'Italy — National & International Consulting',
  },
  'pt-BR': {
    heading: 'Comece a transformação agêntica.',
    body:
      'Fale connosco para uma consultoria estratégica gratuita. Analisamos os seus processos e desenhamos uma roadmap AI sob medida, com agentes que trabalham de fato nos seus dados.',
    location_value: 'Itália — Consultoria Nacional & Internacional',
  },
}

export default function Contact() {
  const { t, i18n } = useTranslation()
  const lng = (i18n.language || 'it').split('-')[0] as 'it' | 'en' | 'pt-BR'
  const copy = sectionCopy[lng] ?? sectionCopy.it

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

  const submitToTrpc = async () => {
    try {
      await trpcContactCreate.mutateAsync({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        message: form.message.trim(),
      })
    } catch (err) {
      // Non-blocking — the Web3Forms call is the primary channel.
      // We log so the user can see what happened in the network tab.
      console.warn('[CAIS] trpc contact.create failed (non-fatal):', err)
    }
  }

  const trpcContactCreate = trpc.contact.create.useMutation()

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
      if (!response.ok || !data.success) {
        throw new Error(data.message || t('contact.error_generic'))
      }

      // Persist + SMTP notify in parallel — does not block the user.
      void submitToTrpc()

      setState('sent')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      setState('error')
      setServerMessage(error instanceof Error ? error.message : t('contact.error_network'))
    }
  }

  const reset = () => {
    setState('idle')
    setServerMessage('')
  }

  return (
    <section id="contatti" className="contact-section">
      <div className="contact-shell">
        <div className="contact-copy reveal-up">
          <SectionEyebrow>{t('contact.eyebrow')}</SectionEyebrow>
          <h2>{copy.heading}</h2>
          <p>{copy.body}</p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ background: 'var(--accent-cyan-bg)', color: 'var(--accent-cyan-light)' }}
              >
                <Mail size={16} />
              </span>
              <a className="contact-mail !mt-0" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ background: 'var(--accent-cyan-bg)', color: 'var(--accent-cyan-light)' }}
              >
                <MapPin size={16} />
              </span>
              <span>{copy.location_value}</span>
            </div>
          </div>
        </div>

        <form className="contact-form reveal-up" onSubmit={submit} noValidate>
          {state === 'sent' ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <span
                className="inline-flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: 'var(--accent-cyan-bg)', color: 'var(--accent-lime)' }}
              >
                <CheckCircle2 size={28} />
              </span>
              <h3 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {t('contact.success_title')}
              </h3>
              <p className="form-success">{t('contact.success_body')}</p>
              <button type="button" onClick={reset} className="text-sm font-semibold hover:underline" style={{ color: 'var(--accent-cyan-light)' }}>
                {t('contact.success_again')}
              </button>
            </div>
          ) : (
            <>
              <div className="form-grid">
                <label>
                  <span>{t('contact.form_name')}</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={update}
                    placeholder={t('contact.form_name_placeholder')}
                    autoComplete="name"
                  />
                  {errors.name ? <small>{errors.name}</small> : null}
                </label>
                <label>
                  <span>{t('contact.form_email')}</span>
                  <input
                    name="email"
                    value={form.email}
                    onChange={update}
                    placeholder={t('contact.form_email_placeholder')}
                    autoComplete="email"
                    type="email"
                  />
                  {errors.email ? <small>{errors.email}</small> : null}
                </label>
              </div>
              <label>
                <span>{t('contact.form_phone')}</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  placeholder={t('contact.form_phone_placeholder')}
                  autoComplete="tel"
                  type="tel"
                />
              </label>
              <label>
                <span>{t('contact.form_message')}</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={update}
                  placeholder={t('contact.form_message_placeholder')}
                  rows={5}
                />
                {errors.message ? <small>{errors.message}</small> : null}
              </label>

              {state === 'error' ? <p className="form-error">{serverMessage}</p> : null}

              <button type="submit" className="submit-button" disabled={state === 'sending'}>
                {state === 'sending' ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
                {state === 'sending' ? t('contact.submit_loading') : t('contact.submit')}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
