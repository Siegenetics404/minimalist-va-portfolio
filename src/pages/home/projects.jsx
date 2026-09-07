import { useRef } from 'react'
import useStackReveal from '../../hooks/useStackReveal'
import project1 from '../../assets/imgs/projects/1.png'
import project2 from '../../assets/imgs/projects/2.png'
import project3 from '../../assets/imgs/projects/3.png'
import project4 from '../../assets/imgs/projects/1.png'
import project5 from '../../assets/imgs/projects/2.png'
import project6 from '../../assets/imgs/projects/3.png'

const PROJECTS = [
    { number: '01', title: 'Beacon Launch Plan', description: 'A phased go-to-market rollout built around a hard launch date.', image: project1 },
    { number: '02', title: 'StudioNine Rebrand Rollout', description: 'Full identity refresh across the site, socials, and every touchpoint.', image: project2 },
    { number: '03', title: 'Northline Ops Overhaul', description: 'Reworked internal workflows end to end, cutting handoff time.', image: project3 },
    { number: '04', title: 'Cascade Retail Refresh', description: 'Storefront and checkout redesign focused on conversion.', image: project4 },
    { number: '05', title: 'Amberline CRM Migration', description: 'Zero-downtime migration off a decade-old legacy system.', image: project5 },
    { number: '06', title: 'Fernwood Site Relaunch', description: 'Ground-up rebuild with a faster stack and cleaner IA.', image: project6 },
]

const Z_INDEX = ['z-[1]', 'z-[2]', 'z-[3]', 'z-[4]', 'z-[5]', 'z-[6]']

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

            <div className="mt-16">
                {PROJECTS.map((project, index) => {
                    const isLast = index === PROJECTS.length - 1

                    return (
                        <div
                            key={project.number}
                            className={`reveal-item ${isLast ? '' : 'group'} relative bg-white ${isLast ? '' : 'border-b border-black/10'} ${Z_INDEX[index]} ${isLast ? '' : 'transition-[z-index] delay-0 group-hover:z-[40] group-hover:delay-500'}`}
                        >
                            <div className="relative flex items-center gap-6 py-6">
                                <div className="w-32 md:w-48 shrink-0" aria-hidden="true" />

                                <span className="flex-1 min-w-0 px-6 md:px-10 text-xl md:text-2xl font-bold uppercase tracking-wide truncate">
                                    {project.title}
                                </span>

                                <span className="shrink-0 text-sm font-semibold tracking-widest uppercase text-black/40">
                                    {project.number}
                                </span>

                                <div className="absolute left-0 top-6 w-32 h-24 md:w-48 md:h-36 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>

                                <p className="absolute left-[152px] md:left-[216px] top-16 md:top-20 px-6 md:px-10 text-sm md:text-base text-black/60 normal-case tracking-normal font-normal truncate whitespace-nowrap">
                                    {project.description}
                                </p>
                            </div>

                            {!isLast && (
                                <div className="h-0 group-hover:h-24 md:group-hover:h-28 transition-[height] duration-500 ease-in-out" aria-hidden="true" />
                            )}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}