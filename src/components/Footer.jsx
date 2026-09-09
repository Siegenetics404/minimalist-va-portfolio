import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useStackReveal from "../hooks/useStackReveal";
import { scrollToSmooth } from "../lib/lenisInstance";

const NAV_LINKS = [
  { label: "Home", href: "#home", type: "hash" },
  { label: "About", href: "#about", type: "hash" },
  { label: "Service", href: "#service", type: "hash" },
  { label: "Experience", href: "#experience", type: "hash" },
  { label: "Project", href: "#project", type: "hash" },
  { label: "Testimonial", href: "#testimonial", type: "hash" },
  { label: "Contact", href: "/contact", type: "route" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  const sectionRef = useRef(null);
  useStackReveal(sectionRef);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, link) => {
    e.preventDefault();

    if (link.type === "route") {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      navigate(link.href);
      return;
    }

    if (location.pathname === "/") {
      scrollToSmooth(link.href);
    } else {
      navigate("/", { state: { scrollTo: link.href } });
    }
  };

  const handleBackToTop = (e) => {
    e.preventDefault();
    scrollToSmooth(0);
  };

  return (
    <footer
      id="footer"
      ref={sectionRef}
      style={{ fontFamily: "'Panchang', sans-serif" }}
      className="relative z-30 bg-black text-white px-8 md:px-20 py-16 md:py-24"
    >
      <div className="reveal-item flex items-end justify-between gap-6 border-b border-white/10 pb-10">
        <span className="text-3xl md:text-5xl font-bold uppercase tracking-wide">
          Jane Solutions
        </span>

        <a href="#top"
          onClick={handleBackToTop}
          aria-label="Back to top"
          className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-200 ease-in-out"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </a>
      </div>

      <div className="reveal-item mt-10 grid md:grid-cols-2 gap-8 md:gap-10">
        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {NAV_LINKS.map((link) => (

            <a key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="text-xs font-semibold tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-200 ease-in-out"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
          {SOCIAL_LINKS.map((social) => (

            <a key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-200 ease-in-out"
            >
              {social.label}
            </a>
          ))
          }
        </div >
      </div >

      <div className="reveal-item mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs font-semibold tracking-widest uppercase text-white/40">
        <span>hello@janesolutions.com</span>
        <span>
          © {new Date().getFullYear()} Jane Solutions. All rights reserved.
        </span>
      </div>
    </footer >
  );
}