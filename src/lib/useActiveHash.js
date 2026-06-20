import { useState, useEffect } from "react";

// Current location hash without the "#", defaulting to "top" (the hero).
// Drives which page is shown in desktop paged mode and the nav highlight.
function readHash() {
  if (typeof window === "undefined") return "top";
  return window.location.hash.replace("#", "") || "top";
}

export function useActiveHash() {
  const [hash, setHash] = useState(readHash);

  useEffect(() => {
    const onChange = () => setHash(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return hash;
}
