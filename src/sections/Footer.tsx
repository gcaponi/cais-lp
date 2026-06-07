import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer-section">
      <div className="footer-brand">
        <span className="footer-brand__glyph" aria-hidden="true">
          <img src="/cais-logo-512.png" alt="" width={40} height={40} />
        </span>
        <div>
          <strong>CAIS</strong>
          <span>Strategic AI Consulting</span>
        </div>
      </div>
      <p>
        © {year} CAIS · {t('footer.tagline')}
      </p>
    </footer>
  )
}
