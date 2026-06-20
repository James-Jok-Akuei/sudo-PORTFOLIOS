// The .sudo PORTFOLIOS wordmark: red dot → sudo → PORTFOLIOS, one row.
// The contrast IS the logo: lowercase weight-800 "sudo" against uppercase,
// wide-tracked, weight-400 "PORTFOLIOS". Font: Archivo (800 + 400).
//
// Props:
//   size  — text size in px (default 28). Dot and gaps scale from this.
//   dark  — optional explicit override. Omit to follow the active theme via
//           CSS variables (white on dark, ink on light).
export default function SudoLogo({ size = 28, dark, className = "" }) {
  // Allow the bare-prop form <SudoLogo size /> to fall back to the default.
  const px = typeof size === "number" ? size : 28;

  // Theme-driven by default; the dark prop forces a fixed palette when given.
  const sudoColor =
    dark === undefined ? "var(--logo-word)" : dark ? "#ffffff" : "#16202e";
  const portColor =
    dark === undefined ? "var(--logo-port)" : dark ? "#cdd6e0" : "#6b7a82";
  const dot = px / 2; // 14px at 28px text
  const gap = (px * 13) / 28; // ~13px at 28px text

  return (
    <span
      className={className}
      aria-label="Sudo Portfolios"
      dir="ltr"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: `${gap}px`,
        fontFamily: "'Archivo', ui-sans-serif, system-ui, sans-serif",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: `${dot}px`,
          height: `${dot}px`,
          borderRadius: "50%",
          backgroundColor: "#cc2b1d", // brand red
          flex: "0 0 auto",
        }}
      />
      <span
        style={{
          fontWeight: 800,
          fontSize: `${px}px`,
          color: sudoColor,
          textTransform: "lowercase",
        }}
      >
        sudo
      </span>
      <span
        style={{
          fontWeight: 400,
          fontSize: `${px}px`,
          color: portColor,
          textTransform: "uppercase",
          letterSpacing: "0.24em",
        }}
      >
        Portfolios
      </span>
    </span>
  );
}
