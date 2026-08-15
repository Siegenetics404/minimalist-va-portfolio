import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profileImg from '../../assets/imgs/profile/about-profile.webp'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
    { index: '01', value: '40+', label: 'Projects delivered' },
    { index: '02', value: '98%', label: 'On-time delivery' },
    { index: '03', value: '12', label: 'Industries served' },
    { index: '04', value: '5+', label: 'Years experience' },
]

export default function About() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-eyebrow', {
                opacity: 0,
                y: 30,
                duration: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 50%',
                    toggleActions: 'play none none reverse',
                },
            })

            gsap.from('.about-header', {
                opacity: 0,
                y: 50,
                duration: 0.7,
                delay: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 50%',
                    toggleActions: 'play none none reverse',
                },
            })

            gsap.from('.about-image', {
                opacity: 0,
                y: 90,
                duration: 0.8,
                delay: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 50%',
                    toggleActions: 'play none none reverse',
                },
            })

            gsap.from('.about-card', {
                opacity: 0,
                y: 90,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 50%',
                    toggleActions: 'play none none reverse',
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            id="about"
            ref={sectionRef}
            style={{ fontFamily: "'Panchang', sans-serif" }}
            className="sticky top-0 z-0 h-screen overflow-hidden bg-white text-black px-8 md:px-20 py-8 md:py-12 flex flex-col justify-center"
        >
            <span className="about-eyebrow block text-sm font-semibold tracking-widest uppercase">
                About
            </span>
            <div className="about-header mt-6 grid md:grid-cols-3 gap-8 md:gap-12 items-end">
                <h2 className="md:col-span-2 text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide">
                    A brief introduction of myself
                </h2>
                <p className="text-black/70 md:text-right">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Senectus
                    arcu nulla viverra arcu elit. Integer nunc posuere ut hendrerit
                    semper vel class aptent taciti.
                </p>
            </div>

            <div className="mt-16 grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
                <div className="about-image relative w-full aspect-4/3 overflow-hidden">
                    <img
                        src={profileImg}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                </div>

                <div className="grid grid-cols-2 grid-rows-2 gap-6 h-full">
                    {STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className="about-card flex flex-col justify-between h-full border border-black/20 bg-black/[0.02] p-6 md:p-8"
                        >
                            <span className="text-xs font-semibold tracking-widest uppercase text-black/40">
                                {stat.index}
                            </span>
                            <div>
                                <span className="block text-4xl md:text-5xl font-bold">{stat.value}</span>
                                <span className="mt-2 block text-xs font-semibold tracking-widest uppercase text-black/60">
                                    {stat.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}