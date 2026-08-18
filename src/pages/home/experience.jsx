import { useRef } from 'react'
import useStackReveal from '../../hooks/useStackReveal'
import StickySection from '../../components/StickySection'

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
]

export default function Experience() {
    const sectionRef = useRef(null)
    useStackReveal(sectionRef)

    return (
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

            <div className="mt-12 grid md:grid-cols-2 gap-8">
                {EXPERIENCE.map((job) => (
                    <div
                        key={job.role}
                        className="reveal-item border border-black/20 bg-black/[0.02] p-8 flex flex-col justify-between h-full"
                    >
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
                ))}
            </div>
        </StickySection>
    )
}