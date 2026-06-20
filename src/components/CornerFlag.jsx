// Small South Sudan flag badge fixed in the bottom-right corner. Carries the
// national identity without taking over the page. Crisp (not blurred),
// decorative, and never intercepts clicks. `width` controls the size; the flag
// keeps its 2:1 aspect ratio.
export default function CornerFlag({ width = 72 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        right: "1rem",
        bottom: "1rem",
        zIndex: 40,
        width: `${width}px`,
        pointerEvents: "none",
      }}
      className="overflow-hidden rounded-md border border-border shadow-lg"
    >
      <svg
        viewBox="0 0 60 30"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="60" height="30" fill="#078930" />
        <rect x="0" y="0" width="60" height="9.3" fill="#0B0B0B" />
        <rect x="0" y="9.3" width="60" height="1" fill="#FFFFFF" />
        <rect x="0" y="10.3" width="60" height="9.4" fill="#DA121A" />
        <rect x="0" y="19.7" width="60" height="1" fill="#FFFFFF" />
        <polygon points="0,0 0,30 24,15" fill="#0F47AF" />
        <path
          d="M8,10 L9.18,13.38 L12.76,13.45 L9.9,15.62 L10.94,19.05 L8,17 L5.06,19.05 L6.1,15.62 L3.25,13.45 L6.82,13.38 Z"
          fill="#FCDD09"
        />
      </svg>
    </div>
  );
}
