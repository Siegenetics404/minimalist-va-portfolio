import { useRef } from 'react'
import useStackReveal from '../../hooks/useStackReveal'
import StickySection from '../../components/StickySection'

const SERVICES = [
    {
        index: '01',
        title: 'Deadlines that hold',
        desc: 'Clear timelines and proactive tracking keep every milestone on schedule, so nothing slips through the cracks.',
    },
    {
        index: '02',
        title: 'One source of truth',
        desc: 'No more scattered updates across five different tools. Status, files, and decisions all live in one place.',
    },
    {
        index: '03',
        title: 'Budget visibility',
        desc: 'Spot overruns before they happen, not after the invoice arrives. Full clarity on where time and money are going.',
    },
]

export default function Services() {
    const sectionRef = useRef(null)
    useStackReveal(sectionRef)

    return (
        <StickySection id="service" ref={sectionRef} zIndex={10} border>
            <span className="reveal-eyebrow block text-xs sm:text-sm font-semibold tracking-widest uppercase">
                Service
            </span>

            <div className="reveal-header mt-4 sm:mt-6 grid sm:grid-cols-3 gap-3 sm:gap-8 md:gap-12 items-end">
                <h2 className="sm:col-span-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide">
                    Here's what changes once I'm on it
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-black/70 sm:text-right">
                    Every engagement starts with a clear plan and ends with results
                    you can measure. Here's exactly what that includes.
                </p>
            </div>

            <div className="mt-4 sm:mt-8 md:mt-12 grid sm:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
                {SERVICES.map((service) => (
                    <div
                        key={service.title}
                        className="reveal-item border border-black/20 bg-black/2 p-4 sm:p-6 md:p-8 flex sm:flex-col justify-between sm:justify-between items-center sm:items-stretch h-full gap-3 sm:gap-0"
                    >
                        <span className="text-xs font-semibold tracking-widest uppercase text-black/40 shrink-0">
                            {service.index}
                        </span>
                        <div className="sm:mt-8">
                            <h3 className="text-base sm:text-xl md:text-2xl font-bold uppercase tracking-wide">
                                {service.title}
                            </h3>
                            <p className="mt-1 sm:mt-4 text-xs sm:text-base text-black/70">{service.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </StickySection>
    )
}