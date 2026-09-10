import { useRef } from 'react'
import useStackReveal from '../../hooks/useStackReveal'
import StickySection from '../../components/StickySection'
import profileImg from '../../assets/imgs/profile/about-profile.webp'

const STATS = [
    { index: '01', value: '40+', label: 'Projects delivered' },
    { index: '02', value: '98%', label: 'On-time delivery' },
    { index: '03', value: '12', label: 'Industries served' },
    { index: '04', value: '5+', label: 'Years experience' },
]

export default function About() {
    const sectionRef = useRef(null)
    useStackReveal(sectionRef)

    return (
        <StickySection id="about" ref={sectionRef} zIndex={0}>
            <span className="reveal-eyebrow block text-xs sm:text-sm font-semibold tracking-widest uppercase">
                About
            </span>
            <div className="reveal-header mt-3 sm:mt-4 grid sm:grid-cols-3 gap-4 sm:gap-8 md:gap-12 items-end">
                <h2 className="sm:col-span-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide">
                    What you get when I run your project
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-black/70 sm:text-right">
                    Years of keeping timelines, budgets, and teams on track, so
                    you get a project that actually ships on schedule instead of
                    slipping quietly out of control.
                </p>
            </div>

            <div className="mt-4 sm:mt-6 md:mt-8 grid sm:grid-cols-2 gap-3 sm:gap-6 md:gap-10 items-stretch">
                <div className="reveal-item relative w-full aspect-16/10 overflow-hidden">
                    <img
                        src={profileImg}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                </div>

                <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-4 h-full">
                    {STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className="reveal-item flex flex-col justify-between h-full border border-black/20 bg-black/2 p-2.5 sm:p-4 md:p-6"
                        >
                            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-black/40">
                                {stat.index}
                            </span>
                            <div>
                                <span className="block text-xl sm:text-3xl md:text-4xl font-bold">{stat.value}</span>
                                <span className="mt-1 sm:mt-2 block text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-black/60">
                                    {stat.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </StickySection>
    )
}