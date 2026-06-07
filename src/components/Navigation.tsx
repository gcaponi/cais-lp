import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe2, Menu, Moon, Sun, X, ChevronRight } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'

type NavItem = { label: string; href: string }
type SupportedLanguage = 'it' | 'en' | 'pt-BR'

const supportedLanguages: Array<{ code: SupportedLanguage; label: string }> = [
  { code: 'it', label: 'IT' },
  { code: 'en', label: 'EN' },
  { code: 'pt-BR', label: 'PT' },
]

type NavigationProps = { items: NavItem[] }

export default function Navigation({ items }: NavigationProps) {
  const { t } = useTranslation()
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

  const themeLabel = theme === 'dark' ? t('nav.theme_light') : t('nav.theme_dark')
  const languageGroupLabel = t('nav.language')

  return (
    <header className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
      <button className="brand-mark" type="button" onClick={() => goTo('#top')} aria-label="CAIS home">
        <span className="brand-mark__glyph">
          <img src="/cais-logo-512.png" alt="" width={48} height={48} />
        </span>
        <span>
          <strong>CAIS</strong>
          <small>Strategic AI Consulting</small>
        </span>
      </button>

      <nav className="site-nav__links" aria-label={t('nav.menu')}>
        {items.map((item) => (
          <button key={item.href} type="button" onClick={() => goTo(item.href)}>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="site-nav__actions">
        <div className="language-switcher" aria-label={languageGroupLabel}>
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
        <button type="button" className="icon-button" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button
          type="button"
          className="icon-button icon-button--mobile"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? t('nav.close_menu') : t('nav.open_menu')}
        >
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
        <div className="mobile-language-row" aria-label={languageGroupLabel}>
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
