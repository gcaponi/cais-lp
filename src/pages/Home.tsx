import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Preloader from '@/components/Preloader'
import { ScrollProgress } from '@/components/ScrollProgress'
import Navigation from '@/components/Navigation'
import Hero from '@/sections/Hero'
import Manifesto from '@/sections/Manifesto'
import Spotlight from '@/sections/Spotlight'
import Showcase from '@/sections/Showcase'
import Roadmap from '@/sections/Roadmap'
import Services from '@/sections/Services'
import TechStack from '@/sections/TechStack'
import Brain from '@/sections/Brain'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'

import { usePointerGlow } from '@/hooks/usePointerGlow'
import { useWowMotion } from '@/hooks/useWowMotion'

type NavItem = { label: string; href: string }

export default function Home() {
  const { t } = useTranslation()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  usePointerGlow()
  useWowMotion(rootRef)

  const navItems = useMemo<NavItem[]>(
    () => [
      { label: t('nav.solutions'), href: '#soluzioni' },
      { label: t('nav.method'), href: '#metodo' },
      { label: t('nav.services'), href: '#servizi' },
      { label: t('nav.contact'), href: '#contatti' },
    ],
    [t],
  )

  return (
    <div ref={rootRef} className="cais-wow-page">
      <ScrollProgress />
      <div className="cursor-glow" aria-hidden="true" />

      <Preloader onComplete={() => setIsLoaded(true)} />
      <Navigation items={navItems} />

      <main
        className="transition-opacity duration-700 ease-out"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <Hero onCta={() => document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' })} />
        <Manifesto />
        <Spotlight />
        <Showcase />
        <Roadmap />
        <Services />
        <TechStack />
        <Brain />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
