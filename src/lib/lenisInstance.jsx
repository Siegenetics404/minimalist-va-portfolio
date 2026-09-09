let instance = null

export function setLenisInstance(lenis) {
    instance = lenis
}

function performScroll(target) {
    if (instance) {
        instance.resize?.() // recalculate scroll height — layout may have shifted since Lenis last measured
        instance.scrollTo(target)
    } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    }
}

export function scrollToSmooth(target) {
    if (document.readyState === 'complete') {
        performScroll(target)
    } else {
        // Page (including images) hasn't finished loading — wait, then scroll
        window.addEventListener('load', () => performScroll(target), { once: true })
    }
}