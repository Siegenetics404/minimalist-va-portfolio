import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useStackReveal from '../../hooks/useStackReveal'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = "Let's keep your next project on track".split(' ')

export default function CTA() {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const navigate = useNavigate()
    useStackReveal(sectionRef)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = titleRef.current.querySelectorAll('.word')

            gsap.set(words, { opacity: 0.15 })

            gsap.to(words, {
                opacity: 1,
                stagger: 0.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: true,
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleStartProject = (e) => {
        e.preventDefault()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        navigate('/contact')
    }

    return (
        <section
            id="cta"
            ref={sectionRef}
            style={{ fontFamily: "'Panchang', sans-serif" }}
            className="relative z-30 bg-white text-black px-6 sm:px-8 md:px-14 lg:px-20 py-16 sm:py-20 md:py-28 lg:py-40"
        >
            <span className="reveal-eyebrow block text-xs sm:text-sm font-semibold tracking-widest uppercase text-center">
                Get Started
            </span>
            <div className="reveal-header">
                <h2
                    ref={titleRef}
                    className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-wide text-center"
                >
                    {HEADLINE.map((word, i) => (
                        <span key={i} className="word inline-block">
                            {word}&nbsp;
                        </span>
                    ))}
                </h2>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base text-black/70 text-center max-w-xs sm:max-w-md mx-auto">
                    Have a project that needs a steady hand? Tell me what you're working
                    on and let's talk timelines.
                </p>
            </div>
            <div className="reveal-item mt-8 sm:mt-10 flex justify-center px-2">
                <a href="mailto:hello@janesolutions.com"
                    className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wide border-b-2 border-black hover:opacity-60 transition-opacity break-all sm:break-normal text-center"
                >
                    hello@janesolutions.com
                </a>
            </div>
            <div className="reveal-item mt-6 sm:mt-8 flex justify-center">
                <a href="/contact"
                    onClick={handleStartProject}
                    className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase hover:opacity-85 transition-opacity"
                >
                    Start a Project
                </a>
            </div >
            <div className="reveal-item mt-16 sm:mt-20 md:mt-24 overflow-hidden border-y border-black/10 py-3 sm:py-4">
                <div className="marquee-track flex w-max whitespace-nowrap">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <span key={i} className="flex items-center">
                            {Array.from({ length: 6 }).map((_, j) => (
                                <span
                                    key={j}
                                    className="mx-4 sm:mx-6 text-xs sm:text-sm font-semibold tracking-widest uppercase text-black/40"
                                >
                                    Available for new projects
                                </span>
                            ))}
                        </span>
                    ))}
                </div>
            </div>
        </section >
    )
}