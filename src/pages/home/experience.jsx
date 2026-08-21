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
        <div className="reveal-item border border-black/20 bg-black/[0.02] p-8 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-semibold tracking-widest uppercase text-black/40">
                    {job.index}
                </span>
                <span className="text-xs font-semibold tracking-widest uppercase text-black/40">
                    {job.period}
                </span>
            </div>
            <div className="mt-8">
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide">
                    {job.role}
                </h3>
                <span className="block mt-1 text-sm text-black/50">{job.org}</span>
                <p className="mt-4 text-black/70">{job.desc}</p>
            </div>
        </div>
    )
}

export default function Experience() {
    const wrapperRef = useRef(null)
    const sectionRef = useRef(null)
    const trackRef = useRef(null)

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

                    // Cards 1-2 slide out left / cards 3-4 slide in from right
                    // across the middle-to-late portion of the scroll
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
                },
            })
        }, wrapperRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={wrapperRef} className="relative h-[200vh]">
            <StickySection
                id="experience"
                ref={sectionRef}
                zIndex={20}
                bg="bg-white"
                text="text-black"
                border
            >
                <span className="reveal-eyebrow block text-sm font-semibold tracking-widest uppercase">
                    Experience
                </span>

                <div className="reveal-header mt-6 grid md:grid-cols-3 gap-8 md:gap-12 items-end">
                    <h2 className="md:col-span-2 text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide">
                        Where I've done the work
                    </h2>
                    <p className="text-black/70 md:text-right">
                        Real teams, real deadlines, real budgets — here's a look at where
                        that track record was built.
                    </p>
                </div>

                <div className="mt-12 overflow-hidden">
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