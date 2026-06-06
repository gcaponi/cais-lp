import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const WEB3FORMS_KEY = '41954813-1e79-4b15-bd51-e7fa3578dd45'

export default function Contact() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [emailStatus, setEmailStatus] = useState<{ sent: boolean; error: string | null }>({ sent: false, error: null })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(
      section.querySelectorAll('.contact-reveal'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (formData.name.length < 2) newErrors.name = t('contact.error_name')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('contact.error_email')
    if (formData.message.length < 10) newErrors.message = t('contact.error_message')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setEmailStatus({ sent: false, error: null })

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: 'Nuovo contatto da CAIS Landing Page',
          from_name: 'CAIS Landing Page',
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
        setEmailStatus({ sent: true, error: null })
        setFormData({ name: '', email: '', phone: '', message: '' })
        setErrors({})
      } else {
        setEmailStatus({ sent: false, error: data.message || 'Errore durante l\'invio. Riprova.' })
      }
    } catch (err) {
      setEmailStatus({ sent: false, error: 'Errore di rete. Controlla la connessione e riprova.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[e.target.name]
        return next
      })
    }
  }

  const inputBaseClass =
    'w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-all'

  return (
    <section
      id="contatti"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-6"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div>
            <h2
              className="contact-reveal font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl md:text-[40px] tracking-tight mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('contact.heading')}
            </h2>
            <p
              className="contact-reveal text-base sm:text-lg leading-relaxed mb-10"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('contact.body')}
            </p>

            <div className="space-y-6">
              <div className="contact-reveal flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--accent-cyan-bg)' }}
                >
                  <Mail size={20} style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {t('contact.email_label')}
                  </p>
                  <a
                    href="mailto:caponi.ai.studio@gmail.com"
                    className="hover:text-[var(--accent-cyan)] transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    caponi.ai.studio@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-reveal flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--accent-cyan-bg)' }}
                >
                  <MapPin size={20} style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {t('contact.location_label')}
                  </p>
                  <p style={{ color: 'var(--text-primary)' }}>
                    {t('contact.location_value')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-reveal">
            {isSubmitted ? (
              <div
                className="border rounded-2xl p-8 text-center"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: emailStatus.sent ? 'rgba(16,185,129,0.3)' : 'rgba(253,137,37,0.3)',
                }}
              >
                <CheckCircle size={48} className={emailStatus.sent ? "text-[#10B981] mx-auto mb-4" : "text-[#fd8925] mx-auto mb-4"} />
                <h3
                  className="font-['Space_Grotesk'] font-semibold text-xl mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t('contact.success_title')}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {t('contact.success_body')}
                </p>
                {emailStatus.error && (
                  <div className="mt-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(253,137,37,0.08)', color: '#fd8925', border: '1px solid rgba(253,137,37,0.2)' }}>
                    <p className="font-medium mb-1">Errore invio email</p>
                    <p style={{ color: 'var(--text-secondary)' }}>{emailStatus.error}</p>
                  </div>
                )}
                <button
                  onClick={() => { setIsSubmitted(false); setEmailStatus({ sent: false, error: null }) }}
                  className="mt-6 text-sm hover:underline"
                  style={{ color: 'var(--accent-cyan)' }}
                >
                  {t('contact.success_again')}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border rounded-2xl p-8 space-y-6"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {t('contact.form_name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${inputBaseClass} border`}
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: errors.name ? '#EF4444' : 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    placeholder={t('contact.form_name_placeholder')}
                  />
                  {errors.name && (
                    <p className="text-[#EF4444] text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {t('contact.form_email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputBaseClass} border`}
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: errors.email ? '#EF4444' : 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    placeholder={t('contact.form_email_placeholder')}
                  />
                  {errors.email && (
                    <p className="text-[#EF4444] text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {t('contact.form_phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${inputBaseClass} border`}
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    placeholder={t('contact.form_phone_placeholder')}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {t('contact.form_message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputBaseClass} border resize-none`}
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: errors.message ? '#EF4444' : 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    placeholder={t('contact.form_message_placeholder')}
                  />
                  {errors.message && (
                    <p className="text-[#EF4444] text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {emailStatus.error && (
                  <p className="text-[#EF4444] text-xs">{emailStatus.error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 font-semibold text-sm px-6 py-4 rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: 'var(--accent-cyan)',
                    color: 'var(--text-inverse)',
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {t('contact.submit_loading')}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t('contact.submit')}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
