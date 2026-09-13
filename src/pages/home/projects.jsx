import { useRef, useState } from 'react'
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
const TRANSITION_MS = 300

export default function Project() {
    const sectionRef = useRef(null)
    useStackReveal(sectionRef)

    const [expanded, setExpanded] = useState(null)
    const isTransitioning = useRef(false)
    const [mobileLoaded, setMobileLoaded] = useState({})
    const [desktopLoaded, setDesktopLoaded] = useState({})

    const toggleExpanded = (number) => {

        if (isTransitioning.current) return
        isTransitioning.current = true

        setExpanded((prev) => (prev === number ? null : number))

        setTimeout(() => {
            isTransitioning.current = false
        }, TRANSITION_MS)
    }

    return (
        <section
            id="project"
            ref={sectionRef}
            style={{ fontFamily: "'Panchang', sans-serif" }}
            className="relative z-[35] bg-white text-black px-6 sm:px-8 md:px-14 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-32"
        >
            <span className="reveal-eyebrow block text-xs sm:text-sm font-semibold tracking-widest uppercase text-center">
                Project
            </span>

            <h2 className="reveal-header mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-center">
                Recent work
            </h2>

            <p className="reveal-header mt-3 sm:mt-6 text-xs sm:text-sm md:text-base text-black/70 text-center max-w-xs sm:max-w-md mx-auto">
                A few projects where the plan actually held, start to finish.
            </p>

            <div className="mt-8 sm:mt-12 md:mt-16">
                {PROJECTS.map((project, index) => {
                    const isLast = index === PROJECTS.length - 1
                    const isOpen = expanded === project.number
                    const isMobileImgLoaded = !!mobileLoaded[project.number]
                    const isDesktopImgLoaded = !!desktopLoaded[project.number]

                    return (
                        <div
                            key={project.number}
                            className={`reveal-item ${isLast ? '' : 'group'} relative bg-white ${isLast ? '' : 'border-b border-black/10'} ${Z_INDEX[index]} ${isLast ? '' : 'sm:transition-[z-index] sm:delay-0 sm:group-hover:z-[40] sm:group-hover:delay-500'}`}
                        >
                            {/* Mobile: tap to expand/collapse, no hover dependency */}
                            <button
                                type="button"
                                onClick={() => toggleExpanded(project.number)}
                                aria-expanded={isOpen}
                                className="sm:hidden w-full text-left flex items-center gap-4 py-4 active:opacity-60 transition-opacity duration-150 ease-out"
                            >
                                <div className="relative w-20 h-16 shrink-0 overflow-hidden">
                                    <div
                                        className={`absolute inset-0 bg-black/5 animate-pulse transition-opacity duration-300 ${isMobileImgLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                            }`}
                                    />
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        onLoad={() => setMobileLoaded((prev) => ({ ...prev, [project.number]: true }))}
                                        className={`w-full h-full object-cover object-top transition-opacity duration-500 ease-out ${isMobileImgLoaded ? 'opacity-100' : 'opacity-0'
                                            }`}
                                    />
                                </div>
                                <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                                    <span className={`text-base font-bold uppercase tracking-wide ${isOpen ? '' : 'truncate'}`}>
                                        {project.title}
                                    </span>
                                    <div className="shrink-0 flex items-center gap-2">
                                        <span className="text-[10px] font-semibold tracking-widest uppercase text-black/40">
                                            {project.number}
                                        </span>
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className={`transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
                                        >
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </div>
                                </div>
                            </button>

                            <div
                                className="sm:hidden grid overflow-hidden"
                                style={{
                                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                                    transition: `grid-template-rows ${TRANSITION_MS}ms ease-in-out`,
                                }}
                            >
                                <div className="overflow-hidden">
                                    <p className="pb-4 pl-24 pr-2 text-xs text-black/60">
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            {/* sm and up: original hover-reveal layout, unchanged */}
                            <div className="hidden sm:block">

                                <div className="relative flex items-center gap-6 py-6">

                                    <div className="w-32 md:w-48 shrink-0" aria-hidden="true" />

                                    <span className="flex-1 min-w-0 px-6 md:px-10 text-xl md:text-2xl font-bold uppercase tracking-wide truncate">
                                        {project.title}
                                    </span>

                                    <span className="shrink-0 text-sm font-semibold tracking-widest uppercase text-black/40">
                                        {project.number}
                                    </span>

                                    {/* top-6 matches the row's py-6 above */}
                                    <div className="absolute left-0 top-6 w-32 h-24 md:w-48 md:h-36 overflow-hidden">
                                        <div
                                            className={`absolute inset-0 bg-black/5 animate-pulse transition-opacity duration-300 ${isDesktopImgLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                                }`}
                                        />
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            onLoad={() => setDesktopLoaded((prev) => ({ ...prev, [project.number]: true }))}
                                            className={`w-full h-full object-cover object-top transition-opacity duration-500 ease-out ${isDesktopImgLoaded ? 'opacity-100' : 'opacity-0'
                                                }`}
                                        />
                                    </div>

                                    {/* left offset = image width + gap-6(24px): 128+24=152 / 192+24=216 */}
                                    <p className="absolute left-[152px] md:left-[216px] top-16 md:top-20 px-6 md:px-10 text-sm md:text-base text-black/60 normal-case tracking-normal font-normal truncate whitespace-nowrap">
                                        {project.description}
                                    </p>
                                </div>

                                {!isLast && (
                                    <div className="h-0 group-hover:h-24 md:group-hover:h-28 transition-[height] duration-500 ease-in-out" aria-hidden="true" />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}