import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenisInstance } from './lib/lenisInstance'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import Home from './pages/home'
import NotFound from './pages/error/NotFound'
import Contact from './pages/contact/Contact'

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

    const handleLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', handleLoad)

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh()
    })
    resizeObserver.observe(document.body)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
      window.removeEventListener('load', handleLoad)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </main>
  )
}