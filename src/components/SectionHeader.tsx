import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

type SectionEyebrowProps = { children: ReactNode }

export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <div className="section-eyebrow reveal-up">
      <Sparkles size={15} />
      <span>{children}</span>
    </div>
  )
}

type SectionHeaderProps = {
  eyebrow: string
  title: string
  children?: ReactNode
}

export function SectionHeader({ eyebrow, title, children }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="reveal-up">{title}</h2>
      {children ? <p className="section-header__copy reveal-up">{children}</p> : null}
    </div>
  )
}
