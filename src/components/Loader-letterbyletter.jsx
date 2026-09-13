import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const NAME = 'JANE SOLUTIONS'

export default function Loader({ onComplete }) {
    const [visible, setVisible] = useState(true)
    const panelRef = useRef(null)
    const lettersRef = useRef(null)
    const barRef = useRef(null)

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        const letters = lettersRef.current.querySelectorAll('.letter')
        gsap.set(letters, { opacity: 0, y: 20 })

        const progress = { value: 0 }

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = ''
                setTimeout(() => {
                    setVisible(false)
                    onComplete?.()
                }, 500)
            },
        })

        tl.to(letters, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.out',
        }, 0)

        tl.to(progress, {
            value: 100,
            duration: 1.8,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (barRef.current) {
                    barRef.current.style.width = `${progress.value}%`
                }
            },
        }, 0)

        tl.to(panelRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power3.inOut',
        }, '+=0.2')

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
            <div ref={lettersRef} className="flex flex-wrap justify-center">
                {NAME.split('').map((char, i) => (
                    <span
                        key={i}
                        className="letter text-3xl md:text-5xl font-bold uppercase tracking-wide"
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </div>

            <div className="mt-8 w-48 h-px bg-white/20 overflow-hidden">
                <div ref={barRef} className="h-full bg-white" style={{ width: '0%' }} />
            </div>
        </div>
    )
}