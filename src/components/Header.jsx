import { useState, useEffect } from 'react'

const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Service", href: "#service" },
    { label: "Experience", href: "#experience" },
    { label: "Project", href: "#project" },
    { label: "Testimonial", href: "#testimonial" },
    { label: "Contact", href: "#contact" },
]

const SOCIAL_LINKS = [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
]

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10)
        onScroll()
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header
            style={{ fontFamily: "'Panchang', sans-serif" }}
            className="fixed top-0 left-0 w-full z-30 text-black"
        >
            <div className="flex items-center justify-between px-8 md:px-20 py-6 bg-white">
                <span className="text-sm font-semibold tracking-widest uppercase">
                    Jane Solutions
                </span>

                <button
                    type="button"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="relative z-40 flex flex-col cursor-pointer items-end justify-center gap-1.5 w-8 transition-transform duration-200 ease-in-out hover:scale-110"
                >
                    <span
                        style={{ transformOrigin: 'center' }}
                        className={`block h-0.5 w-8 bg-black transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-2 rotate-45" : ""
                            }`}
                    ></span>
                    <span
                        className={`block h-0.5 w-5 bg-black transition-[opacity,width] duration-200 ease-in-out ${isOpen ? "w-0 opacity-0" : "opacity-100"
                            }`}
                    ></span>
                    <span
                        style={{ transformOrigin: 'center' }}
                        className={`block h-0.5 w-8 bg-black transition-transform duration-300 ease-in-out ${isOpen ? "-translate-y-2 -rotate-45" : ""
                            }`}
                    ></span>
                </button>
            </div>

            <div
                className={`border-b-2 border-black/30 bg-white transition-all duration-300 ease-in-out ${isScrolled ? "mx-0 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15)]" : "mx-8 md:mx-20"
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
                    <nav className="flex flex-col items-start gap-1 px-8 md:px-20 pt-8">
                        {NAV_LINKS.map((link) => (

                            <a key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-xl md:text-2xl font-semibold uppercase tracking-wide text-black hover:text-black/50 hover:translate-x-2 transition-all duration-200 ease-in-out py-1.5"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="border-t border-black/10 mx-8 md:mx-20 mt-6"></div>

                    <div className="flex items-center gap-6 px-8 md:px-20 py-6">
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