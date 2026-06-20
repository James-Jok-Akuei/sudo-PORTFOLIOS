// Primary action button with a soft accent glow on hover. Renders as <a> when
// href is given, else <button>. `variant`: "primary" (accent) or "ghost".
export default function CommandButton({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "group inline-flex items-center gap-2 rounded-md px-5 py-3 font-mono text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const variants = {
    primary:
      "bg-accent text-accent-ink hover:bg-accent-deep hover:shadow-accent-glow hover:-translate-y-0.5",
    ghost:
      "border border-border text-text hover:border-accent hover:text-accent hover:bg-accent-soft",
  };

  const content = <span>{children}</span>;

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {content}
    </button>
  );
}
