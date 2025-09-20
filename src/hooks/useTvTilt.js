import { useEffect } from "react";

/**
 * Adds a subtle 3D tilt effect to an element by id.
 * Example: useTvTilt("tv-frame");
 */
export default function useTvTilt(elementId) {
  useEffect(() => {
    const el = document.getElementById(elementId);
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [elementId]);
}
