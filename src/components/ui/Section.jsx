import { motion } from "framer-motion";
import { stagger, inViewProps } from "../../lib/motion.js";

// A page section with consistent vertical rhythm and a staggered
// fade-and-rise entrance for its children.
export default function Section({ id, children, className = "" }) {
  return (
    <motion.section
      id={id}
      variants={stagger}
      {...inViewProps}
      className={`mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
}
