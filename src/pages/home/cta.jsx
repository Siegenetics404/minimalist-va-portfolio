import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useStackReveal from '../../hooks/useStackReveal'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = "Let's keep your next project on track".split(' ')

export default function CTA() {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
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

    return (
        <section
            id="contact"
            ref={sectionRef}
            style={{ fontFamily: "'Panchang', sans-serif" }}
            className="relative z-30 bg-white text-black px-8 md:px-20 py-24 md:py-40"
        >
            <span className="reveal-eyebrow block text-sm font-semibold tracking-widest uppercase text-center">
                Contact
            </span>
            <div className="reveal-header">
                <h2
                    ref={titleRef}
                    className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wide text-center"
                >
                    {HEADLINE.map((word, i) => (
                        <span key={i} className="word inline-block">
                            {word}&nbsp;
                        </span>
                    ))}
                </h2>
                <p className="mt-6 text-black/70 text-center max-w-md mx-auto">
                    Have a project that needs a steady hand? Tell me what you're working
                    on and let's talk timelines.
                </p>
            </div>
            <div className="reveal-item mt-10 flex justify-center">
                <a href="mailto:hello@janesolutions.com"
                    className="text-2xl md:text-4xl font-bold uppercase tracking-wide border-b-2 border-black hover:opacity-60 transition-opacity"
                >
                    hello@janesolutions.com
                </a>
            </div>
            <div className="reveal-item mt-8 flex justify-center">
                <a href="mailto:hello@janesolutions.com"
                    className="bg-black text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:opacity-85 transition-opacity"
                >
                    Start a Project
                </a>
            </div >
            <div className="reveal-item mt-24 overflow-hidden border-y border-black/10 py-4">
                <div className="marquee-track flex w-max whitespace-nowrap">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <span key={i} className="flex items-center">
                            {Array.from({ length: 6 }).map((_, j) => (
                                <span
                                    key={j}
                                    className="mx-6 text-sm font-semibold tracking-widest uppercase text-black/40"
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