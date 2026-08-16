import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useStackReveal(sectionRef) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-eyebrow", {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(".reveal-header", {
        opacity: 0,
        y: 50,
        duration: 0.7,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(".reveal-item", {
        opacity: 0,
        y: 90,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [sectionRef]);
}
