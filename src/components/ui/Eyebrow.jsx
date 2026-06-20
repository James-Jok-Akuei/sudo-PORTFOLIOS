// Section eyebrow: a small, wide-tracked uppercase label in the accent color.
export default function Eyebrow({ children, className = "" }) {
  return (
    <p
      className={`font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-accent ${className}`}
    >
      {children}
    </p>
  );
}
