import Hero from './hero'
import About from './about'
import Services from './services'
import Experience from './experience'
import Project from './projects'
import Testimonial from './testimonial'
import CTA from './cta'

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <Services />
            <Experience />
            <Project />
            <Testimonial />
            <CTA />
        </>
    )
}