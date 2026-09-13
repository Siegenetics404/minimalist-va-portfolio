import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const STATUS_WORDS = [
    'Loading assets',
    'Preparing experience',
    'Setting the scene',
    'Almost there',
]

export default function Loader({ onComplete }) {
    const [visible, setVisible] = useState(true)
    const panelRef = useRef(null)
    const fillRef = useRef(null)
    const barRef = useRef(null)
    const statusRef = useRef(null)

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        const progress = { value: 0 }
        let statusIndex = 0

        const statusInterval = setInterval(() => {
            statusIndex = (statusIndex + 1) % STATUS_WORDS.length
            if (statusRef.current) {
                gsap.to(statusRef.current, {
                    opacity: 0,
                    duration: 0.15,
                    onComplete: () => {
                        if (statusRef.current) {
                            statusRef.current.textContent = STATUS_WORDS[statusIndex]
                        }
                        gsap.to(statusRef.current, { opacity: 1, duration: 0.15 })
                    },
                })
            }
        }, 450)

        const tl = gsap.timeline({
            onComplete: () => {
                clearInterval(statusInterval)
                document.body.style.overflow = ''
                setTimeout(() => {
                    setVisible(false)
                    onComplete?.()
                }, 500)
            },
        })

        tl.to(progress, {
            value: 100,
            duration: 1.8,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (fillRef.current) {
                    fillRef.current.style.clipPath = `inset(0 ${100 - progress.value}% 0 0)`
                }
                if (barRef.current) {
                    barRef.current.style.width = `${progress.value}%`
                }
            },
        }).to(
            panelRef.current,
            {
                yPercent: -100,
                duration: 0.8,
                ease: 'power3.inOut',
            },
            '+=0.1'
        )

        return () => {
            document.body.style.overflow = ''
            clearInterval(statusInterval)
            tl.kill()
        }
    }, [onComplete])

    if (!visible) return null

    return (
        <div
            ref={panelRef}
            style={{ fontFamily: "'Panchang', sans-serif" }}
            className="fixed inset-0 z-[200] bg-black text-white flex flex-col items-center justify-center"
        >
            <div className="relative">
                <span
                    className="text-4xl md:text-6xl font-bold uppercase tracking-wide"
                    style={{ WebkitTextStroke: '1px white', color: 'transparent' }}
                >
                    Jane Solutions
                </span>
                <span
                    ref={fillRef}
                    className="absolute inset-0 text-4xl md:text-6xl font-bold uppercase tracking-wide text-white whitespace-nowrap"
                    style={{ clipPath: 'inset(0 100% 0 0)' }}
                >
                    Jane Solutions
                </span>
            </div>

            <div className="mt-8 w-48 h-px bg-white/20 overflow-hidden">
                <div ref={barRef} className="h-full bg-white" style={{ width: '0%' }} />
            </div>

            <span
                ref={statusRef}
                className="mt-3 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-white/40"
            >
                {STATUS_WORDS[0]}
            </span>
        </div>
    )
}