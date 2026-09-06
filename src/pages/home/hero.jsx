import { useRef, useEffect } from "react";
import profileImg from '../../assets/imgs/profile/profile-bna1.webp'
import profileImgHover from '../../assets/imgs/profile/profile.webp'

export default function Hero() {
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const trail = useRef(Array.from({ length: 10 }, () => ({ x: 0, y: 0 })));

  useEffect(() => {
    const move = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", move);

    let frameId;
    const animate = () => {
      const speed = 0.15;
      trail.current.forEach((point, i) => {
        const target = i === 0 ? mouse.current : trail.current[i - 1];
        point.x += (target.x - point.x) * speed;
        point.y += (target.y - point.y) * speed;
      });
      if (maskRef.current) {
        const gradients = trail.current
          .map((p, i) => {
            const size = 170 - i * 10;
            const opacity = 1 - i * 0.1;
            return `radial-gradient(circle ${size}px at ${p.x}px ${p.y}px, rgba(255,255,255,${opacity}) 20%, rgba(255,255,255,${opacity * 0.6}) 40%, transparent 70%)`;
          })
          .join(",");
        maskRef.current.style.maskImage = gradients;
        maskRef.current.style.webkitMaskImage = gradients;
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      id="home"
      style={{ fontFamily: "'Panchang', sans-serif" }}
      className="relative h-screen w-full text-black flex items-center justify-start text-left px-8 md:px-20 overflow-hidden"
    >
      <div className="relative flex items-center w-full">
        <div className="flex flex-col items-start text-left">
          <span className="text-sm font-semibold tracking-widest uppercase">Jane Doe</span>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wide mt-4 max-w-5xl">
            A general virtual assistant from the Philippines
          </h1>
          <p className="mt-6 max-w-xl text-black/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Senectus
            arcu nulla viverra arcu elit.
          </p>
          <a href="#contact" className="fancy mt-8">
            <span className="top-key"></span>
            <span className="text">CONTACT ME</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </a>
        </div>

        <div
          ref={containerRef}
          className="absolute top-0 right-0 h-full w-auto -z-10 inline-block"
        >
          <img
            src={profileImg}
            alt=""
            className="h-full w-auto block"
          />
          <div ref={maskRef} className="absolute inset-0 pointer-events-none">
            <img
              src={profileImgHover}
              alt=""
              className="h-full w-auto object-cover"
            />
          </div>
        </div>
      </div>


      <a href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-black/60 hover:text-black transition-colors duration-200 ease-in-out"
      >
        <span className="text-xs font-semibold tracking-widest uppercase">
          Scroll to explore
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="animate-bounce"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section >
  )
}