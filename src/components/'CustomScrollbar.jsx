import { useEffect, useRef } from 'react'

export default function CustomScrollbar() {
    const thumbRef = useRef(null)

    useEffect(() => {
        const updateThumb = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = docHeight > 0 ? scrollTop / docHeight : 0

            if (thumbRef.current) {
                const trackHeight = thumbRef.current.parentElement.offsetHeight
                const thumbHeight = thumbRef.current.offsetHeight
                const maxTravel = trackHeight - thumbHeight
                thumbRef.current.style.transform = `translateY(${progress * maxTravel}px)`
            }
        }

        updateThumb()
        window.addEventListener('scroll', updateThumb, { passive: true })
        window.addEventListener('resize', updateThumb)
        return () => {
            window.removeEventListener('scroll', updateThumb)
            window.removeEventListener('resize', updateThumb)
        }
    }, [])

    return (
        <div className="fixed right-2 top-4 bottom-4 z-[150] pointer-events-none">
            <div className="relative h-full w-1.5">
                <div
                    ref={thumbRef}
                    className="absolute left-0 w-1.5 h-16 rounded-full bg-gray-500/50 transition-transform duration-100 ease-out"
                />
            </div>
        </div>
    )
}