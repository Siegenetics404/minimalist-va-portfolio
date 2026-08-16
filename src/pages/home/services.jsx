import { useRef } from 'react'
import useStackReveal from '../../hooks/useStackReveal'
import StickySection from '../../components/StickySection'

const SERVICES = [
    {
        index: '01',
        title: 'Fewer missed deadlines',
        desc: 'Clear timelines and proactive tracking keep every milestone on schedule, so nothing slips through the cracks.',
    },
    {
        index: '02',
        title: 'One source of truth',
        desc: 'No more scattered updates across five different tools — status, files, and decisions all live in one place.',
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
            <span className="reveal-eyebrow block text-sm font-semibold tracking-widest uppercase">
                Service
            </span>

            <div className="reveal-header mt-6 grid md:grid-cols-3 gap-8 md:gap-12 items-end">
                <h2 className="md:col-span-2 text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide">
                    What you get when you hire me
                </h2>
                <p className="text-black/70 md:text-right">
                    Every engagement starts with a clear plan and ends with results
                    you can measure — here's exactly what that includes.
                </p>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-8">
                {SERVICES.map((service) => (
                    <div
                        key={service.title}
                        className="reveal-item border border-black/20 bg-black/[0.02] p-8 flex flex-col justify-between h-full"
                    >
                        <span className="text-xs font-semibold tracking-widest uppercase text-black/40">
                            {service.index}
                        </span>
                        <div className="mt-8">
                            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide">
                                {service.title}
                            </h3>
                            <p className="mt-4 text-black/70">{service.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </StickySection>
    )
}