import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToSmooth } from '../lib/lenisInstance'

const NAV_LINKS = [
    { label: "Home", href: "#home", type: "hash" },
    { label: "About", href: "#about", type: "hash" },
    { label: "Service", href: "#service", type: "hash" },
    { label: "Experience", href: "#experience", type: "hash" },
    { label: "Project", href: "#project", type: "hash" },
    { label: "Testimonial", href: "#testimonial", type: "hash" },
    { label: "Contact", href: "/contact", type: "route" },
]

const SOCIAL_LINKS = [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
]

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10)
        onScroll()
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleNavClick = (e, link) => {
        e.preventDefault()
        setIsOpen(false)

        if (link.type === "route") {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
            navigate(link.href)
            return
        }

        // Hash link — only works if the target section actually lives on this page
        if (location.pathname === "/") {
            scrollToSmooth(link.href)
        } else {
            navigate("/", { state: { scrollTo: link.href } })
        }
    }

    const handleLogoClick = (e) => {
        // Same behavior as the "Home" nav link
        handleNavClick(e, NAV_LINKS[0])
    }

    return (
        <header
            style={{ fontFamily: "'Panchang', sans-serif" }}
            className="fixed top-0 left-0 w-full z-45 text-black"
        >
            <div className="flex items-center justify-between px-6 sm:px-8 md:px-14 lg:px-20 py-4 sm:py-5 md:py-6 bg-white">

                <a href="#home"
                    onClick={handleLogoClick}
                    className="text-xs sm:text-sm font-semibold tracking-widest uppercase hover:opacity-70 transition-opacity duration-200 ease-in-out"
                >
                    Jane Solutions
                </a>

                <button
                    type="button"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="relative z-40 flex flex-col cursor-pointer items-end justify-center gap-1.5 w-7 sm:w-8 transition-transform duration-200 ease-in-out hover:scale-110"
                >
                    <span
                        style={{ transformOrigin: 'center' }}
                        className={`block h-0.5 w-7 sm:w-8 bg-black transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-2 rotate-45" : ""
                            }`}
                    ></span>
                    <span
                        className={`block h-0.5 w-4 sm:w-5 bg-black transition-[opacity,width] duration-200 ease-in-out ${isOpen ? "w-0 opacity-0" : "opacity-100"
                            }`}
                    ></span>
                    <span
                        style={{ transformOrigin: 'center' }}
                        className={`block h-0.5 w-7 sm:w-8 bg-black transition-transform duration-300 ease-in-out ${isOpen ? "-translate-y-2 -rotate-45" : ""
                            }`}
                    ></span>
                </button>
            </div>

            <div
                className={`border-b-2 border-black/30 bg-white transition-all duration-300 ease-in-out ${isScrolled ? "mx-0 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15)]" : "mx-6 sm:mx-8 md:mx-14 lg:mx-20"
                    }`}
            ></div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 300ms ease-in-out',
                }}
                className="w-full bg-white"
            >
                <div className="overflow-hidden">
                    <nav className="flex flex-col items-start gap-1 px-6 sm:px-8 md:px-14 lg:px-20 pt-6 sm:pt-8">
                        {NAV_LINKS.map((link) => (

                            <a key={link.label}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link)}
                                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold uppercase tracking-wide text-black hover:text-black/50 hover:translate-x-2 transition-all duration-200 ease-in-out py-1 sm:py-1.5"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="border-t border-black/10 mx-6 sm:mx-8 md:mx-14 lg:mx-20 mt-4 sm:mt-6"></div>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 px-6 sm:px-8 md:px-14 lg:px-20 py-4 sm:py-6">
                        {SOCIAL_LINKS.map((social) => (

                            <a key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold tracking-widest uppercase text-black/70 hover:text-black transition-colors duration-200 ease-in-out"
                            >
                                {social.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div >
        </header >
    )
}