let instance = null

export function setLenisInstance(lenis) {
    instance = lenis
}

export function scrollToSmooth(target) {
    if (instance) {
        instance.scrollTo(target)
    } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    }
}