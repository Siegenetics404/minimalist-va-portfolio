import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useStackReveal from '../../hooks/useStackReveal'
import StickySection from '../../components/StickySection'

gsap.registerPlugin(ScrollTrigger)

const EXPERIENCE = [
    {
        index: '01',
        role: 'Project Manager',
        org: 'Freelance',
        period: '2021 — Present',
        desc: 'Leading cross-functional teams through full project lifecycles, from scoping to delivery.',
    },
    {
        index: '02',
        role: 'Junior Project Coordinator',
        org: 'Agency Co.',
        period: '2019 — 2021',
        desc: 'Supported delivery on client accounts, keeping timelines, budgets, and stakeholders aligned.',
    },
    {
        index: '03',
        role: 'Operations Assistant',
        org: 'StartUp Inc.',
        period: '2018 — 2019',
        desc: 'Kept day-to-day operations running smoothly across scheduling, vendors, and reporting.',
    },
    {
        index: '04',
        role: 'Project Support Intern',
        org: 'NGO Partners',
        period: '2017 — 2018',
        desc: 'Assisted program leads with documentation, logistics, and on-the-ground coordination.',
    },
]

function ExperienceCard({ job }) {
    return (
        <div className="reveal-item border border-black/20 bg-black/2 p-5 md:p-8 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between gap-3 md:gap-4">
                <span className="text-xs font-semibold tracking-widest uppercase text-black/40">
                    {job.index}
                </span>
                <span className="text-xs font-semibold tracking-widest uppercase text-black/40">
                    {job.period}
                </span>
            </div>
            <div className="mt-5 md:mt-8">
                <h3 className="text-lg md:text-2xl font-bold uppercase tracking-wide">
                    {job.role}
                </h3>
                <span className="block mt-1 text-xs md:text-sm text-black/50">{job.org}</span>
                <p className="mt-3 md:mt-4 text-sm md:text-base text-black/70">{job.desc}</p>
            </div>
        </div>
    )
}

export default function Experience() {
    const wrapperRef = useRef(null)
    const sectionRef = useRef(null)
    const trackRef = useRef(null) // desktop: 2 halves, unchanged from original
    const mobileTrackRef = useRef(null) // mobile: 4 individual full-width cards

    useStackReveal(sectionRef)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const wrapper = wrapperRef.current
            const startPx = wrapper.offsetTop
            const endPx = startPx + wrapper.offsetHeight - window.innerHeight

            ScrollTrigger.create({
                start: startPx,
                end: endPx,
                scrub: 1,
                onUpdate: (self) => {
                    const p = self.progress
                    const isDesktop = window.matchMedia('(min-width: 768px)').matches

                    if (isDesktop) {
                        // Original desktop math — untouched: 2 halves, -50% total slide
                        const slideStart = 0.45
                        const slideEnd = 0.85
                        const slideP = Math.min(
                            Math.max((p - slideStart) / (slideEnd - slideStart), 0),
                            1
                        )
                        gsap.to(trackRef.current, {
                            xPercent: -50 * slideP,
                            duration: 0.4,
                            ease: 'power2.out',
                            overwrite: 'auto',
                        })
                    } else {
                        // Mobile: 4 individual cards, wider window since there
                        // are more stops to move through in the same pin
                        const slideStart = 0.1
                        const slideEnd = 0.95
                        const slideP = Math.min(
                            Math.max((p - slideStart) / (slideEnd - slideStart), 0),
                            1
                        )
                        gsap.to(mobileTrackRef.current, {
                            xPercent: -75 * slideP,
                            duration: 0.4,
                            ease: 'power2.out',
                            overwrite: 'auto',
                        })
                    }
                },
            })
        }, wrapperRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={wrapperRef} className="relative h-[350vh] md:h-[200vh]">
            <StickySection
                id="experience"
                ref={sectionRef}
                zIndex={20}
                bg="bg-white"
                text="text-black"
                border
            >
                <span className="reveal-eyebrow block text-xs md:text-sm font-semibold tracking-widest uppercase">
                    Experience
                </span>

                <div className="reveal-header mt-4 md:mt-6 grid md:grid-cols-3 gap-4 md:gap-12 items-end">
                    <h2 className="md:col-span-2 text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide">
                        Where I've done the work
                    </h2>
                    <p className="text-xs md:text-base text-black/70 md:text-right">
                        Real teams, real deadlines, real budgets — here's a look at where
                        that track record was built.
                    </p>
                </div>

                {/* Mobile: 1 card at a time, pinned slide like Testimonial */}
                <div className="md:hidden mt-6 overflow-hidden">
                    <div ref={mobileTrackRef} className="flex w-[400%] gap-4">
                        {EXPERIENCE.map((job) => (
                            <div key={job.role} className="w-1/4">
                                <ExperienceCard job={job} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop: original 2-halves layout, untouched */}
                <div className="hidden md:block mt-12 overflow-hidden">
                    <div ref={trackRef} className="flex w-[200%]">
                        <div className="w-1/2 grid md:grid-cols-2 gap-8 pr-4">
                            {EXPERIENCE.slice(0, 2).map((job) => (
                                <ExperienceCard key={job.role} job={job} />
                            ))}
                        </div>
                        <div className="w-1/2 grid md:grid-cols-2 gap-8 pl-4">
                            {EXPERIENCE.slice(2, 4).map((job) => (
                                <ExperienceCard key={job.role} job={job} />
                            ))}
                        </div>
                    </div>
                </div>
            </StickySection>
        </div>
    )
}