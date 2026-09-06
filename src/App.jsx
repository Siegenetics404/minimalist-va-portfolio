import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenisInstance } from './lib/lenisInstance'
import Hero from './pages/home/hero'
import About from './pages/home/about'
import Services from './pages/home/services'
import Header from './components/Header'
import Experience from './pages/home/experience'
import CTA from './pages/home/cta'
import Footer from './components/Footer'
import Testimonial from './pages/home/testimonial'
import ScrollToTopButton from './components/ScrollToTopButton'
import Project from './pages/home/projects'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: false,
    })

    setLenisInstance(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Services />
      <Experience />
      <Project />
      <Testimonial />
      <CTA />
      <Footer />
      <ScrollToTopButton />
    </main>
  )
}