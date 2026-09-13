import { useRef, useEffect, useState } from 'react'

export default function CustomCursor() {
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const mouse = useRef({ x: 0, y: 0 })
    const ring = useRef({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Custom cursors only make sense on devices with a real mouse —
        // skip entirely on touch devices (phones/tablets)
        const hasFinePointer = window.matchMedia('(pointer: fine)').matches
        if (!hasFinePointer) return

        setIsVisible(true)

        const move = (e) => {
            mouse.current.x = e.clientX
            mouse.current.y = e.clientY
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
            }
        }

        const handleOver = (e) => {
            if (e.target.closest('a, button, [role="button"]')) {
                setIsHovering(true)
            }
        }
        const handleOut = (e) => {
            if (e.target.closest('a, button, [role="button"]')) {
                setIsHovering(false)
            }
        }

        window.addEventListener('mousemove', move)
        document.addEventListener('mouseover', handleOver)
        document.addEventListener('mouseout', handleOut)

        let frameId
        const animate = () => {
            const speed = 0.18
            ring.current.x += (mouse.current.x - ring.current.x) * speed
            ring.current.y += (mouse.current.y - ring.current.y) * speed
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`
            }
            frameId = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            window.removeEventListener('mousemove', move)
            document.removeEventListener('mouseover', handleOver)
            document.removeEventListener('mouseout', handleOut)
            cancelAnimationFrame(frameId)
        }
    }, [])

    if (!isVisible) return null

    return (
        <>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white pointer-events-none z-[9999]"
                style={{ mixBlendMode: 'difference' }}
            />
            <div
                ref={ringRef}
                className={`fixed top-0 left-0 rounded-full border border-white pointer-events-none z-[9999] transition-[width,height,margin] duration-200 ease-out ${isHovering ? 'w-12 h-12 -ml-6 -mt-6' : 'w-8 h-8 -ml-4 -mt-4'
                    }`}
                style={{ mixBlendMode: 'difference' }}
            />
        </>
    )
}