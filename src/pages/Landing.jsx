import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import Nav from "../components/Nav.jsx";
import Hero from "../components/Hero.jsx";
import Services from "../components/Services.jsx";
import Work from "../components/Work.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import About from "../components/About.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import { useContent } from "../i18n/LanguageContext.jsx";
import { useMediaQuery } from "../lib/useMediaQuery.js";
import { useActiveHash } from "../lib/useActiveHash.js";

// Booking pulls in the heavy Cal.com embed, so load it as its own chunk
// instead of in the initial bundle.
const Booking = lazy(() => import("../components/Booking.jsx"));

const BookingFallback = () => <div className="min-h-[640px]" />;

// Skip link: visually hidden until focused, so keyboard users can jump past
// the nav straight to the content.
function SkipLink({ label }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-accent-ink"
    >
      {label}
    </a>
  );
}

// Desktop (lg+) presents the site as nav-driven pages: one section fills the
// viewport at a time, switched via the nav bar, and only the active page scrolls
// when its content is taller than the viewport. Mobile/tablet keep the normal
// continuous vertical scroll.
const PAGES = [
  { id: "top", render: () => <Hero /> },
  { id: "services", render: () => <Services /> },
  { id: "work", render: () => <Work /> },
  { id: "how-it-works", render: () => <HowItWorks /> },
  { id: "about", render: () => <About /> },
  {
    id: "booking",
    render: () => (
      <>
        <Suspense fallback={<BookingFallback />}>
          <Booking />
        </Suspense>
        <Contact />
        <Footer />
      </>
    ),
  },
];

export default function Landing() {
  const content = useContent();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const active = useActiveHash();

  // Mobile / tablet: classic single continuous scroll.
  if (!isDesktop) {
    return (
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-ink text-text">
          <SkipLink label={content.skipToContent} />
          <Nav />
          <main id="main" tabIndex={-1}>
            <Hero />
            <Services />
            <Work />
            <HowItWorks />
            <About />
            <Suspense fallback={<BookingFallback />}>
              <Booking />
            </Suspense>
            <Contact />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    );
  }

  // Desktop: resolve the active hash to a page (contact lives on the booking
  // page). Remounting on page change resets scroll to top and replays the
  // section entrance animations.
  let index = PAGES.findIndex((p) => p.id === active);
  if (index === -1) index = active === "contact" ? PAGES.length - 1 : 0;
  const page = PAGES[index];

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-screen flex-col overflow-hidden bg-ink text-text">
        <SkipLink label={content.skipToContent} />
        <Nav />
        <main id="main" tabIndex={-1} className="flex-1 overflow-hidden">
          <div key={page.id} className="h-full overflow-y-auto">
            {page.render()}
          </div>
        </main>
      </div>
    </MotionConfig>
  );
}
