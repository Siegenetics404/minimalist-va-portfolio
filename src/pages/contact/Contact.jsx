import { useState } from 'react'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Submission wiring goes here later
        console.log(formData)
    }

    return (
        <section
            style={{ fontFamily: "'Panchang', sans-serif" }}
            className="relative bg-white text-black px-8 md:px-20 py-24 md:py-32"
        >
            <span className="block text-sm font-semibold tracking-widest uppercase text-center">
                Contact
            </span>

            <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-center">
                Let's talk
            </h1>

            <p className="mt-6 text-black/70 text-center max-w-xl mx-auto">
                Have a project in mind? Send a few details and we'll get back to you.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-16 max-w-2xl mx-auto flex flex-col gap-8"
            >
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="name"
                        className="text-sm font-semibold tracking-widest uppercase text-black/40"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-b border-black/20 py-3 text-lg md:text-xl bg-transparent outline-none focus:border-black transition-colors duration-200 ease-in-out"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-semibold tracking-widest uppercase text-black/40"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-b border-black/20 py-3 text-lg md:text-xl bg-transparent outline-none focus:border-black transition-colors duration-200 ease-in-out"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="message"
                        className="text-sm font-semibold tracking-widest uppercase text-black/40"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="border-b border-black/20 py-3 text-lg md:text-xl bg-transparent outline-none focus:border-black transition-colors duration-200 ease-in-out resize-none"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 self-start border border-black/20 px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200 ease-in-out"
                >
                    Send message
                </button>
            </form>
        </section>
    )
}