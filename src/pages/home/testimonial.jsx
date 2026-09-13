import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useStackReveal from '../../hooks/useStackReveal'
import img1 from '../../assets/imgs/testimonial/1.webp'
import img2 from '../../assets/imgs/testimonial/2.webp'
import img3 from '../../assets/imgs/testimonial/3.webp'
import img4 from '../../assets/imgs/testimonial/4.webp'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
    {
        image: img1,
        name: 'Sarah Cruz',
        role: 'Operations Lead, Beacon Co.',
        quote: 'Kept our launch on schedule when everything else was slipping. Clear updates, zero surprises.',
    },
    {
        image: img2,
        name: 'Marco Reyes',
        role: 'Founder, StudioNine',
        quote: 'The kind of project manager who catches problems before they become fires.',
    },
    {
        image: img3,
        name: 'Elena Cruz',
        role: 'Director, Northline',
        quote: 'Budget stayed on track down to the dollar. Would hire again in a heartbeat.',
    },
    {
        image: img4,
        name: 'Jamie Tan',
        role: 'CTO, Fieldwork',
        quote: "Turned a chaotic backlog into a plan the whole team could actually follow.",
    },
]

export default function Testimonial() {
    const wrapperRef = useRef(null)
    const trackRef = useRef(null)
    const [loadedImages, setLoadedImages] = useState({})

    const markLoaded = (name) => {
        setLoadedImages((prev) => ({ ...prev, [name]: true }))
    }

    useStackReveal(wrapperRef)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current
            const scrollDistance = track.scrollWidth - track.parentElement.offsetWidth

            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: 'top top',
                end: () => `+=${scrollDistance}`,
                pin: true,
                scrub: 1,
                onUpdate: (self) => {
                    gsap.to(track, {
                        x: -scrollDistance * self.progress,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto',
                    })
                },
            })
        }, wrapperRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            id="testimonial"
            ref={wrapperRef}
            style={{ fontFamily: "'Panchang', sans-serif" }}
            className="relative z-30 bg-white text-black overflow-hidden"
        >
            <div className="h-screen flex flex-col md:flex-row px-6 sm:px-8 md:px-14 lg:px-20 py-16 sm:py-20 md:py-28 lg:py-32 gap-5 sm:gap-8 md:gap-10">
                <div className="md:w-1/3 shrink-0 flex flex-col justify-center">
                    <span className="reveal-eyebrow block text-xs sm:text-sm font-semibold tracking-widest uppercase">
                        Testimonial
                    </span>
                    <h2 className="reveal-header mt-3 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide">
                        What clients say
                    </h2>
                    <p className="reveal-header mt-3 sm:mt-6 text-sm sm:text-base text-black/70">
                        Don't just take my word for it. Here's what people who've
                        actually worked with me have to say.
                    </p>
                </div>

                <div className="flex-1 overflow-hidden flex items-stretch">
                    <div ref={trackRef} className="flex gap-4 sm:gap-6">
                        {TESTIMONIALS.map((t) => {
                            const imgLoaded = !!loadedImages[t.name]

                            return (
                                <div
                                    key={t.name}
                                    className="reveal-item group w-[80vw] md:w-[420px] shrink-0 h-full border border-black/20 bg-black/[0.02] flex flex-col overflow-hidden"
                                >
                                    <div className="relative w-full aspect-[16/9] overflow-hidden shrink-0">
                                        <div
                                            className={`absolute inset-0 bg-black/5 animate-pulse transition-opacity duration-300 ${imgLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                                }`}
                                        />
                                        <img
                                            src={t.image}
                                            alt={t.name}
                                            onLoad={() => markLoaded(t.name)}
                                            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-out ${imgLoaded ? 'opacity-100' : 'opacity-0'
                                                }`}
                                        />
                                    </div>

                                    <div className="relative flex-1 overflow-hidden">
                                        {/* Truncated view */}
                                        <div className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col justify-between transition-opacity duration-300 ease-in-out group-hover:opacity-0">
                                            <p className="text-sm sm:text-base md:text-lg leading-relaxed line-clamp-3">
                                                "{t.quote}"
                                            </p>
                                            <div className="mt-4 sm:mt-6 shrink-0">
                                                <span className="block text-sm sm:text-base font-bold uppercase tracking-wide">
                                                    {t.name}
                                                </span>
                                                <span className="block text-xs sm:text-sm text-black/50">
                                                    {t.role}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Full quote, revealed on hover */}
                                        <div className="no-scrollbar absolute inset-0 p-5 sm:p-6 md:p-8 bg-black/[0.02] flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out overflow-y-auto">
                                            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                                                "{t.quote}"
                                            </p>
                                            <div className="mt-4 sm:mt-6 shrink-0">
                                                <span className="block text-sm sm:text-base font-bold uppercase tracking-wide">
                                                    {t.name}
                                                </span>
                                                <span className="block text-xs sm:text-sm text-black/50">
                                                    {t.role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}