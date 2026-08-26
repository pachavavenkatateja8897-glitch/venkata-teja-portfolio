import { useCallback, useEffect, useRef, useState } from "react";

/* ---------------- prefers-reduced-motion ---------------- */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ---------------- intersection observer (once) ---------------- */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "0px 0px -12% 0px"
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView];
}

/* ---------------- scramble / decode text ---------------- */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/#*+=—";

export function useScramble(text: string, active: boolean, duration = 950): string {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(active && !reduced ? "" : text);
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const total = Math.max(1, Math.round(duration / 28));
    const id = window.setInterval(() => {
      frame += 1;
      const progress = frame / total;
      const settled = Math.floor(progress * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " " || i < settled) out += ch;
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (frame >= total) {
        setDisplay(text);
        window.clearInterval(id);
      }
    }, 28);
    return () => window.clearInterval(id);
  }, [active, text, duration, reduced]);
  return display;
}

/* ---------------- running timecode @ 24fps ---------------- */
export function formatTimecode(totalSeconds: number, fps = 24): string {
  const s = Math.max(0, totalSeconds);
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = Math.floor(s % 60);
  const ff = Math.floor((s - Math.floor(s)) * fps);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

export function useTimecode(fps = 24): string {
  const reduced = usePrefersReducedMotion();
  const [tc, setTc] = useState("00:00:00:00");
  useEffect(() => {
    const start = performance.now();
    const tick = () => setTc(formatTimecode((performance.now() - start) / 1000, fps));
    const id = window.setInterval(tick, reduced ? 1000 : 1000 / fps);
    tick();
    return () => window.clearInterval(id);
  }, [fps, reduced]);
  return tc;
}

/* ---------------- IST wall clock ---------------- */
export function useISTClock(): string {
  const [time, setTime] = useState("--:--");
  const update = useCallback(() => {
    try {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    } catch {
      setTime(new Date().toTimeString().slice(0, 5));
    }
  }, []);
  useEffect(() => {
    update();
    const id = window.setInterval(update, 20_000);
    return () => window.clearInterval(id);
  }, [update]);
  return time;
}
