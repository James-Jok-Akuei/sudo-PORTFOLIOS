// Shared Framer Motion variants. Subtle fade-and-rise on scroll (section 3).
// Framer Motion automatically reduces these when prefers-reduced-motion is set
// via the MotionConfig reducedMotion="user" wrapper in Landing.

export const fadeRise = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// Container that staggers its children's fadeRise entrance.
export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

// Default whileInView props so sections animate once when scrolled into view.
export const inViewProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
};
