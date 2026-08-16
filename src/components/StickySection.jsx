import { forwardRef } from 'react'

const StickySection = forwardRef(function StickySection(
    { id, zIndex = 0, bg = 'bg-white', text = 'text-black', border = false, className = '', children },
    ref
) {
    return (
        <section
            id={id}
            ref={ref}
            style={{ fontFamily: "'Panchang', sans-serif", zIndex }}
            className={[
                'sticky top-0 h-screen overflow-hidden',
                bg,
                text,
                'px-8 md:px-20 py-24 md:py-32 flex flex-col justify-center',
                border ? 'border-t border-black/10' : '',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {children}
        </section>
    )
})

export default StickySection