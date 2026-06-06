import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer
      className="border-t py-8 px-6"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('footer.copyright')}
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm hover:text-[var(--accent-cyan)] transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('footer.privacy')}
          </a>
          <a
            href="#"
            className="text-sm hover:text-[var(--accent-cyan)] transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('footer.terms')}
          </a>
        </div>
      </div>
    </footer>
  )
}
