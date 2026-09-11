# Portfolio Template — VA / Project Manager Edition

A fully coded, animated portfolio website template built for freelancers and VAs who want a client-ready online presence without hiring a developer.

---

## Tech Stack

- **React** + **Vite**
- **Tailwind CSS** (utility classes, no config plugins beyond core)
- **React Router** — multi-page routing (`/` and `/contact`)
- **GSAP** + **ScrollTrigger** — scroll-driven animations, pinned/sticky sections, horizontal card slides
- **Lenis** — smooth scrolling
- **EmailJS** (`@emailjs/browser`) — client-side contact form emails, no backend required

---

## Project Structure

```
src/
  App.jsx                  # Router, Lenis + GSAP setup, route-change resync
  components/
    Header.jsx              # Fixed nav, hamburger menu, hash + route links
    Footer.jsx               # Nav links, socials, back-to-top
    ScrollToTopButton.jsx     # Floating back-to-top, all pages
    StickySection.jsx         # Shared sticky/pinned section wrapper
  hooks/
    useStackReveal.js         # IntersectionObserver-based fade/slide-in reveal
  lib/
    lenisInstance.js          # scrollToSmooth() helper, shared Lenis instance
  pages/
    home/
      hero.jsx                # Mouse-trail image reveal, headline, CTA
      about.jsx                # Stats grid, intro copy
      services.jsx              # 3-card service breakdown
      experience.jsx             # Pinned horizontal card slide (work history)
      projects.jsx                # Expandable project list (accordion on mobile)
      testimonial.jsx              # Pinned horizontal testimonial slide
      cta.jsx                       # Closing CTA, prefilled contact-form links
      index.jsx (Home)               # Assembles all sections + scrollTo handling
    contact/
      Contact.jsx              # Contact form, EmailJS, honeypot + time-trap spam guard
    error/
      NotFound.jsx              # 404 page (not reviewed/documented in this build)
```

---

## Setup

1. `npm install`
2. Copy `.env.example` → `.env` and fill in your EmailJS credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=
   VITE_EMAILJS_TEMPLATE_ID=
   VITE_EMAILJS_PUBLIC_KEY=
   ```
3. In your EmailJS dashboard, confirm the template's **"To Email"** field points to your real inbox — a wrong/blank value causes the API to report success with the email going nowhere.
4. `npm run dev`

**Note on `.env` changes:** Vite does not hot-reload environment variable changes. If you edit `.env` while the dev server is running, fully stop and restart `npm run dev`.

---

## Contact Form — How It Works

- **EmailJS**, sent directly from the browser — no backend/serverless function needed.
- **Honeypot field** (`hp_field`) — invisible to real users, catches basic bots that auto-fill every input. Deliberately *not* named `company`/`name`/etc., since browsers autofill those recognized field names even with `autocomplete="off"`, which silently broke real submissions during testing.
- **Time-trap** — rejects submissions faster than 3 seconds (`MIN_SUBMIT_SECONDS`). **Skipped automatically in dev** (`import.meta.env.DEV`) so you can test without waiting; fully active in a production build.
- **Minimum "Sending..." display time** (`MIN_SEND_DISPLAY_MS`, 600ms) — prevents the loading state from flashing invisibly on fast connections.
- **Prefilled message support** — CTA's email link and "Start a Project" button both navigate to `/contact` with a prewritten opener via router state (`location.state.message`), read into the form on mount.

---

## Routing & Scroll Notes (read before touching navigation)

This template mixes route-based navigation (`/`, `/contact`) with in-page hash scrolling (`#about`, `#service`, etc.), which created several non-obvious bugs during development. If you're extending the nav, know these:

- **Hash links only work on the page the target section lives on.** Header/Footer's `handleNavClick` checks `location.pathname` — if already on `/`, it scrolls directly; otherwise it navigates to `/` first with `state: { scrollTo: link.href }`, which `Home`'s own effect reads and completes the scroll after mount.
- **GSAP ScrollTrigger must be killed before routing away**, synchronously, in the click handler — *not* in a `useEffect`. Pinned sections insert extra DOM nodes (pin-spacers) that React doesn't know about; if left behind when React unmounts the old page, it crashes to a blank white screen requiring a hard refresh. Every route-triggering click handler in this project (Header, Footer, CTA, Hero's Contact link) calls `ScrollTrigger.getAll().forEach(t => t.kill())` before `navigate()`.
- **Lenis needs an explicit reset on every route change** — `App.jsx`'s route-change effect calls `lenis.scrollTo(0, { immediate: true })` plus `lenis.resize()` + `ScrollTrigger.refresh()`. Without this, Lenis's fake-scroll transform carries over from the previous page, leaving the new (often shorter) page looking blank/misplaced until a manual refresh.
- **`scrollToSmooth(0)`**, not `scrollToSmooth('#home')`, is used for "back to top" buttons — a numeric target works on any page; a hash target only works where that element exists.

---

## Responsive Design Notes

- Breakpoint scaling follows `base → sm → md → lg` throughout (Tailwind defaults), applied consistently across every section.
- **Experience** and **Testimonial** use pinned horizontal-scroll card tracks. Experience specifically has separate desktop (2 cards per view, `md:grid-cols-2`) and mobile (1 card at a time) tracks with different `xPercent` slide math — see inline comments in `experience.jsx` before adjusting either.
- **Projects** section relies on hover to reveal descriptions on `sm`+ screens (no touch equivalent needed — descriptions are visible via tap-to-expand accordion on mobile instead, added specifically because hover doesn't exist on touch devices).
- Some sections live inside `StickySection` (`h-screen overflow-hidden` — a fixed, non-scrollable height). Long headline or copy changes can cause content to get visually clipped rather than wrap gracefully. If you lengthen any heading/paragraph in a `StickySection`-based file, check it doesn't push content past the fixed viewport height.

---

## Known Placeholder Content — Not Yet Replaced

See `placeholder-checklist.md` (generated earlier in this project) for the full itemized list. Short version: brand name ("Jane Solutions"), all social links, all project/testimonial images and copy, favicon, and the page `<title>` are placeholder and need real content before this goes live for an actual client or buyer.

---
