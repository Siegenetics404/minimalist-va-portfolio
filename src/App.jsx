import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: false,
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    const refreshAll = () => {
      lenis.resize()
      ScrollTrigger.refresh()
    }

    refreshAll()

    window.addEventListener('load', refreshAll)

    const resizeObserver = new ResizeObserver(refreshAll)
    resizeObserver.observe(document.body)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
      window.removeEventListener('load', refreshAll)
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    lenis.scrollTo(0, { immediate: true })

    const frame = requestAnimationFrame(() => {
      lenis.resize()
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(frame)
  }, [location.pathname])

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