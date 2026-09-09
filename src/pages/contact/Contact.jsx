import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { useNavigate } from 'react-router-dom'
import useStackReveal from '../../hooks/useStackReveal'
import contactImg from '../../assets/imgs/contact/contact-image.webp'

const FIELDS = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
]

const MIN_SUBMIT_SECONDS = 3
const MIN_SEND_DISPLAY_MS = 600

export default function Contact() {
    const navigate = useNavigate()
    const formLoadedAt = useRef(Date.now())
    const sectionRef = useRef(null)
    useStackReveal(sectionRef)

    const containerRef = useRef(null)
    const maskRef = useRef(null)
    const mouse = useRef({ x: 0, y: 0 })
    const trail = useRef(Array.from({ length: 10 }, () => ({ x: 0, y: 0 })))

    useEffect(() => {
        const move = (e) => {
            const rect = containerRef.current?.getBoundingClientRect()
            if (!rect) return
            mouse.current.x = e.clientX - rect.left
            mouse.current.y = e.clientY - rect.top
        }
        window.addEventListener('mousemove', move)

        let frameId
        const animate = () => {
            const speed = 0.15
            trail.current.forEach((point, i) => {
                const target = i === 0 ? mouse.current : trail.current[i - 1]
                point.x += (target.x - point.x) * speed
                point.y += (target.y - point.y) * speed
            })
            if (maskRef.current) {
                const gradients = trail.current
                    .map((p, i) => {
                        const size = 170 - i * 10
                        const opacity = 1 - i * 0.1
                        return `radial-gradient(circle ${size}px at ${p.x}px ${p.y}px, rgba(255,255,255,${opacity}) 20%, rgba(255,255,255,${opacity * 0.6}) 40%, transparent 70%)`
                    })
                    .join(',')
                maskRef.current.style.maskImage = gradients
                maskRef.current.style.webkitMaskImage = gradients
            }
            frameId = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            window.removeEventListener('mousemove', move)
            cancelAnimationFrame(frameId)
        }
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        hp_field: '', // honeypot — renamed from "company" since browsers autofill
        // recognized field names even with autocomplete="off"
    })
    const [status, setStatus] = useState('idle') // idle | sending | success | error

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Honeypot: bots fill every field, real users never see this one — always active
        if (formData.hp_field.trim() !== '') {
            setStatus('success') // silently pretend it worked, don't tip off the bot
            return
        }

        // Time-trap: real humans take at least a few seconds to fill a form.
        // Skipped in dev so you can test quickly without waiting — still
        // fully active in a production build.
        if (!import.meta.env.DEV) {
            const secondsElapsed = (Date.now() - formLoadedAt.current) / 1000
            if (secondsElapsed < MIN_SUBMIT_SECONDS) {
                setStatus('success') // same silent handling
                return
            }
        }

        setStatus('sending')
        const sendStartedAt = Date.now()

        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                time: new Date().toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                }),
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then(() => {
                const elapsed = Date.now() - sendStartedAt
                const remaining = Math.max(0, MIN_SEND_DISPLAY_MS - elapsed)
                setTimeout(() => {
                    setStatus('success')
                    setFormData({ name: '', email: '', message: '', hp_field: '' })
                }, remaining)
            })
            .catch((err) => {
                console.error(err)
                const elapsed = Date.now() - sendStartedAt
                const remaining = Math.max(0, MIN_SEND_DISPLAY_MS - elapsed)
                setTimeout(() => {
                    setStatus('error')
                }, remaining)
            })
    }

    const closeModal = () => setStatus('idle')

    const handleBackToHome = () => {
        setStatus('idle')
        navigate('/')
    }

    return (
        <section
            id="contact"
            ref={sectionRef}
            style={{ fontFamily: "'Panchang', sans-serif" }}
            className="relative bg-white text-black px-6 sm:px-8 md:px-14 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-32"
        >
            <div className="grid sm:grid-cols-2 border border-black/20 bg-black/2 overflow-hidden">
                <div
                    ref={containerRef}
                    className="reveal-item hidden sm:block relative w-full aspect-4/5 md:aspect-auto md:h-full overflow-hidden"
                >
                    <img
                        src={contactImg}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                    <div ref={maskRef} className="absolute inset-0 pointer-events-none">
                        <img
                            src={contactImg}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover object-top grayscale"
                        />
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col gap-5 sm:gap-6 md:gap-8"
                >
                    <div className="reveal-header">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide">
                            Let's talk
                        </h2>
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-black/70 max-w-sm">
                            Have a project in mind? Send a few details and we'll get back to you within a day or two.
                        </p>
                    </div>

                    {/* Honeypot field — off-screen, not display:none, and named to
                        avoid browser autofill heuristics for common field names */}
                    <div className="absolute left-[-9999px] w-px h-px overflow-hidden" aria-hidden="true">
                        <label htmlFor="hp_field">Leave this field empty</label>
                        <input
                            id="hp_field"
                            name="hp_field"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={formData.hp_field}
                            onChange={handleChange}
                        />
                    </div>

                    {FIELDS.map((field) => (
                        <div key={field.name} className="reveal-item flex flex-col gap-1.5 sm:gap-2">
                            <label
                                htmlFor={field.name}
                                className="text-xs font-semibold tracking-widest uppercase text-black/40"
                            >
                                {field.label}
                            </label>
                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required
                                className="border-b border-black/20 py-2 sm:py-2.5 text-sm sm:text-base md:text-lg bg-transparent outline-none focus:border-black transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    ))}

                    <div className="reveal-item flex flex-col gap-1.5 sm:gap-2">
                        <label
                            htmlFor="message"
                            className="text-xs font-semibold tracking-widest uppercase text-black/40"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="border-b border-black/20 py-2 sm:py-2.5 text-sm sm:text-base md:text-lg bg-transparent outline-none focus:border-black transition-colors duration-200 ease-in-out resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="reveal-item mt-1 sm:mt-2 self-start border border-black/20 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'sending' ? 'Sending...' : 'Send message'}
                    </button>
                </form>
            </div>

            {(status === 'success' || status === 'error') && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-6"
                    onClick={closeModal}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-xs sm:max-w-sm bg-white border border-black/20 p-6 sm:p-8 md:p-10 text-center"
                    >
                        <button
                            type="button"
                            aria-label="Close"
                            onClick={closeModal}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 text-black/40 hover:text-black transition-colors duration-200 ease-in-out"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-xs font-semibold tracking-widest uppercase text-black/40">
                            {status === 'success' ? 'Message sent' : 'Something went wrong'}
                        </div>

                        <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold uppercase tracking-wide">
                            {status === 'success' ? "Thanks, I'll be in touch" : 'Please try again'}
                        </h3>

                        <p className="mt-2 sm:mt-3 text-sm text-black/70">
                            {status === 'success'
                                ? "Your message has been received. I'll get back to you within a day or two."
                                : "That didn't go through. You can retry, or reach out directly by email."}
                        </p>

                        <button
                            type="button"
                            onClick={status === 'success' ? handleBackToHome : closeModal}
                            className="mt-5 sm:mt-6 border border-black/20 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200 ease-in-out"
                        >
                            {status === 'success' ? 'Back to home' : 'Try again'}
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}