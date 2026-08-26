import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/hooks";

/* Film grain overlay */
export function Noise() {
  return <div aria-hidden className="noise" />;
}

/* Cinematic edge vignette */
export function Vignette() {
  return <div aria-hidden className="vignette" />;
}

/* Accent cursor follower — fine pointers only, honours reduced motion */
export function Cursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let seen = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        rx = tx;
        ry = ty;
        dot.classList.add("cursor-on");
        ring.classList.add("cursor-on");
      }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      );
      ring.classList.toggle("cursor-hover", interactive);
    };
    const onLeave = () => {
      dot.classList.remove("cursor-on");
      ring.classList.remove("cursor-on");
      seen = false;
    };

    const loop = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden>
        <div className="cursor-ring-inner" />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
