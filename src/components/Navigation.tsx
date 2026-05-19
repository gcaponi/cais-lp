import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'

export default function Navigation() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: t('nav.services'), href: '#servizi' },
    { label: t('nav.technologies'), href: '#tecnologie' },
    { label: t('nav.contact'), href: '#contatti' },
  ]

  const scrollTo = (href: string) => {
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-color)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-['Space_Grotesk'] font-bold text-xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
            CAIS
          </span>
          <span className="hidden sm:inline text-xs font-medium tracking-[0.2em] uppercase" style={{ color: 'var(--accent-cyan)' }}>
            Strategic AI Consulting
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-sm font-medium transition-colors duration-300 hover:text-[var(--accent-cyan)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {item.label}
            </button>
          ))}

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-300 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
            title={language === 'it' ? 'Switch to English' : 'Passa all\'Italiano'}
          >
            <Globe size={14} />
            {language.toUpperCase()}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          style={{ color: 'var(--text-primary)' }}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden border-t" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
          <div className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-left text-lg font-medium transition-colors hover:text-[var(--accent-cyan)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
              >
                <Globe size={16} />
                {language.toUpperCase()}
              </button>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
