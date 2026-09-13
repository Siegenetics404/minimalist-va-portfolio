import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const WORDS = ['DESIGNING', 'BUILDING', 'REFINING', 'READY']

export default function Loader({ onComplete }) {
    const [visible, setVisible] = useState(true)
    const panelRef = useRef(null)
    const wordRef = useRef(null)
    const barRef = useRef(null)

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        let wordIndex = 0
        const stepDuration = 1800 / WORDS.length

        const wordInterval = setInterval(() => {
            wordIndex = Math.min(wordIndex + 1, WORDS.length - 1)
            if (wordRef.current) {
                gsap.to(wordRef.current, {
                    opacity: 0,
                    y: -10,
                    duration: 0.15,
                    onComplete: () => {
                        wordRef.current.textContent = WORDS[wordIndex]
                        gsap.fromTo(
                            wordRef.current,
                            { opacity: 0, y: 10 },
                            { opacity: 1, y: 0, duration: 0.25 }
                        )
                    },
                })
            }
        }, stepDuration)

        const progress = { value: 0 }

        const tl = gsap.timeline({
            onComplete: () => {
                clearInterval(wordInterval)
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
            clearInterval(wordInterval)
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
                ref={wordRef}
                className="mt-4 text-3xl md:text-5xl font-bold uppercase tracking-wide"
            >
                {WORDS[0]}
            </span>

            <div className="mt-8 w-48 h-px bg-white/20 overflow-hidden">
                <div ref={barRef} className="h-full bg-white" style={{ width: '0%' }} />
            </div>
        </div>
    )
}