import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToSmooth } from '../../lib/lenisInstance'
import Hero from './hero'
import About from './about'
import Services from './services'
import Experience from './experience'
import Project from './projects'
import Testimonial from './testimonial'
import CTA from './cta'

export default function Home() {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const target = location.state?.scrollTo
        if (!target) return

        navigate(location.pathname, { replace: true, state: {} })

        const frame = requestAnimationFrame(() => {
            ScrollTrigger.refresh()
            scrollToSmooth(target)
        })

        return () => cancelAnimationFrame(frame)
    }, [location.state, location.pathname, navigate])

    return (
        <>
            <Hero />
            <About />
            <Services />
            <Experience />
            <Project />
            <Testimonial />
            <CTA />
        </>
    )
}