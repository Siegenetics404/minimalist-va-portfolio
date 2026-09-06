import { useRef } from 'react'
import useStackReveal from '../../hooks/useStackReveal'
import project1 from '../../assets/imgs/projects/1.png'
import project2 from '../../assets/imgs/projects/2.png'
import project3 from '../../assets/imgs/projects/3.png'

const PROJECTS = [
    { number: '01', title: 'Beacon Launch Plan', image: project1 },
    { number: '02', title: 'StudioNine Rebrand Rollout', image: project2 },
    { number: '03', title: 'Northline Ops Overhaul', image: project3 },
]

export default function Project() {
    const sectionRef = useRef(null)
    useStackReveal(sectionRef)

    return (
        <section
            id="project"
            ref={sectionRef}
            style={{ fontFamily: "'Panchang', sans-serif" }}
            className="relative z-[35] bg-white text-black px-8 md:px-20 py-24 md:py-32"
        >
            <span className="reveal-eyebrow block text-sm font-semibold tracking-widest uppercase text-center">
                Project
            </span>

            <h2 className="reveal-header mt-6 text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-center">
                Recent work
            </h2>

            <p className="reveal-header mt-6 text-black/70 text-center mx-auto">
                A few projects where the plan actually held, start to finish.
            </p>

            <div className="mt-16 border-t border-black/10">
                {PROJECTS.map((project) => (
                    <div
                        key={project.number}
                        className="reveal-item flex items-center justify-between gap-6 py-8 border-b border-black/10 hover:opacity-60 transition-opacity duration-200 ease-in-out"
                    >
                        <div className="w-20 h-14 md:w-28 md:h-20 shrink-0 overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="flex-1 text-xl md:text-3xl font-bold uppercase tracking-wide">
                            {project.title}
                        </span>
                        <span className="text-sm font-semibold tracking-widest uppercase text-black/40">
                            {project.number}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}