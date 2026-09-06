import { useState, useEffect } from 'react'
import { scrollToSmooth } from '../lib/lenisInstance'

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const footer = document.querySelector('#footer')

        const onScroll = () => {
            const scrolledPastHero = window.scrollY > window.innerHeight * 0.5

            let footerInView = false
            if (footer) {
                const rect = footer.getBoundingClientRect()
                footerInView = rect.top < window.innerHeight
            }

            setVisible(scrolledPastHero && !footerInView)
        }

        onScroll()
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleClick = (e) => {
        e.preventDefault()
        scrollToSmooth('#home')
    }

    return (

        <a href="#home"
            onClick={handleClick}
            aria-label="Back to top"
            className={`fixed bottom-8 right-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full border border-black/30 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 ease-in-out ${visible
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-4 pointer-events-none'
                }`
            }
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
            </svg>
        </a >
    )
}