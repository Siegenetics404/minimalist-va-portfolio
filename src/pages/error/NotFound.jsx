import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <section
            style={{ fontFamily: "'Panchang', sans-serif" }}
            className="relative min-h-screen flex flex-col items-center justify-center bg-white text-black px-8 text-center"
        >
            <span className="block text-sm font-semibold tracking-widest uppercase text-black/40">
                Error
            </span>

            <h1 className="mt-6 text-7xl md:text-9xl font-bold uppercase tracking-wide">
                404
            </h1>

            <h2 className="mt-4 text-2xl md:text-3xl font-bold uppercase tracking-wide">
                Page not found
            </h2>

            <p className="mt-4 text-black/70 max-w-md">
                The page you're looking for doesn't exist or may have been moved.
            </p>

            <Link
                to="/"
                className="mt-10 inline-block border border-black/20 px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200 ease-in-out"
            >
                Back to home
            </Link>
        </section>
    )
}