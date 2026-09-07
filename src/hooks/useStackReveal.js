import { useEffect } from "react";
import gsap from "gsap";

export default function useStackReveal(sectionRef) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const eyebrows = section.querySelectorAll(".reveal-eyebrow");
    const headers = section.querySelectorAll(".reveal-header");
    const items = section.querySelectorAll(".reveal-item");

    gsap.set(eyebrows, { opacity: 0, y: 30 });
    gsap.set(headers, { opacity: 0, y: 50 });
    gsap.set(items, { opacity: 0, y: 90 });

    let hasPlayed = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          hasPlayed = true;
          gsap.to(eyebrows, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          });
          gsap.to(headers, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.1,
            ease: "power3.out",
          });
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          });
        } else if (!entry.isIntersecting && hasPlayed) {
          hasPlayed = false;
          gsap.set(eyebrows, { opacity: 0, y: 30 });
          gsap.set(headers, { opacity: 0, y: 50 });
          gsap.set(items, { opacity: 0, y: 90 });
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionRef]);
}
