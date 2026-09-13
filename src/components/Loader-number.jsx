import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Loader({ onComplete }) {
    const [visible, setVisible] = useState(true)
    const panelRef = useRef(null)
    const counterRef = useRef(null)
    const barRef = useRef(null)

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        const counter = { value: 0 }

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = ''
                setTimeout(() => {
                    setVisible(false)
                    onComplete?.()
                }, 500)
            },
        })

        tl.to(counter, {
            value: 100,
            duration: 1.8,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.textContent = String(
                        Math.floor(counter.value)
                    ).padStart(3, '0')
                }
                if (barRef.current) {
                    barRef.current.style.width = `${counter.value}%`
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
            <span className="text-xs font-semibold tracking-widest uppercase text-white/50">
                Jane Solutions
            </span>

            <span
                ref={counterRef}
                className="mt-4 text-6xl md:text-8xl font-bold tabular-nums"
            >
                000
            </span>

            <div className="mt-8 w-48 h-px bg-white/20 overflow-hidden">
                <div
                    ref={barRef}
                    className="h-full bg-white"
                    style={{ width: '0%' }}
                />
            </div>
        </div>
    )
}