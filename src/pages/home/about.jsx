import profileImg from '../../assets/imgs/profile/about-profile.webp'

const STATS = [
    { index: '01', value: '40+', label: 'Projects delivered' },
    { index: '02', value: '98%', label: 'On-time delivery' },
    { index: '03', value: '12', label: 'Industries served' },
    { index: '04', value: '5+', label: 'Years experience' },
]

export default function About() {
    return (
        <section
            id="about"
            style={{ fontFamily: "'Panchang', sans-serif" }}
            className="bg-white text-black px-8 md:px-20 py-24 md:py-32"
        >
            <span className="text-sm font-semibold tracking-widest uppercase">About</span>
            <div className="mt-6 grid md:grid-cols-3 gap-8 md:gap-12 items-end">
                <h2 className="md:col-span-2 text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide">
                    A brief introduction
                </h2>
                <p className="text-black/70 md:text-right">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Senectus
                    arcu nulla viverra arcu elit. Integer nunc posuere ut hendrerit
                    semper vel class aptent taciti.
                </p>
            </div>

            <div className="mt-16 grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
                <div className="relative w-full aspect-4/3 overflow-hidden">
                    <img
                        src={profileImg}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                </div>

                <div className="grid grid-cols-2 grid-rows-2 gap-6 h-full">
                    {STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex flex-col justify-between h-full border border-black/20 bg-black/2 p-6 md:p-8"
                        >
                            <span className="text-xs font-semibold tracking-widest uppercase text-black/40">
                                {stat.index}
                            </span>
                            <div>
                                <span className="block text-4xl md:text-5xl font-bold">{stat.value}</span>
                                <span className="mt-2 block text-xs font-semibold tracking-widest uppercase text-black/60">
                                    {stat.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}