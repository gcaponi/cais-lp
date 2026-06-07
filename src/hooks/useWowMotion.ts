import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/**
 * Sets up the page-wide motion layer:
 *  - Lenis smooth scroll
 *  - GSAP ticker sync with Lenis
 *  - Hero entrance choreography
 *  - Hero aura slow rotation
 *  - Floating node idle drift
 *  - Scroll-triggered reveal/blur/parallax/scale animations
 *  - Spotlight glow pulse
 *  - Respects `prefers-reduced-motion`
 */
export function useWowMotion<T extends HTMLElement>(rootRef: RefObject<T | null>) {
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
      // Hero entrance
      gsap.set('.hero-title-line', { yPercent: 110, rotateX: -18, opacity: 0 })
      gsap.set('.hero-copy, .hero-cta, .hero-proof, .hero-orbit', { y: 28, opacity: 0 })

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
      intro
        .to('.hero-title-line', { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.05, stagger: 0.12 })
        .to('.hero-copy', { y: 0, opacity: 1, duration: 0.75 }, '-=0.55')
        .to('.hero-cta', { y: 0, opacity: 1, duration: 0.75, stagger: 0.08 }, '-=0.45')
        .to('.hero-proof', { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, '-=0.35')
        .to('.hero-orbit', { y: 0, opacity: 1, duration: 0.9 }, '-=0.65')

      // Hero aura slow rotation
      gsap.to('.hero-aura', {
        rotate: 360,
        duration: 34,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // Floating node idle drift
      gsap.to('.floating-node', {
        y: (i) => [-16, 18, -10, 22][i % 4],
        x: (i) => [12, -10, 16, -14][i % 4],
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.25,
      })

      // Scroll reveal with blur
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

      // Soft parallax
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

      // Spotlight cards: scrubbed reveal + glow pulse
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

      // Metric bouncy pop
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
