import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import Preloader from '@/components/Preloader'
import RippleMesh from '@/components/RippleMesh'
import Navigation from '@/components/Navigation'
import Hero from '@/sections/Hero'
import OpenClaw from '@/sections/OpenClaw'
import Hermes from '@/sections/Hermes'
import Automation from '@/sections/Automation'
import PythonAI from '@/sections/PythonAI'
import TechStack from '@/sections/TechStack'
import Services from '@/sections/Services'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'

export default function Home() {
  const { isDark } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Preloader onComplete={() => setIsLoaded(true)} />
      <RippleMesh isDark={isDark} />
      <Navigation />
      <main className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
        <OpenClaw />
        <Hermes />
        <Automation />
        <PythonAI />
        <TechStack />
        <Services />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
