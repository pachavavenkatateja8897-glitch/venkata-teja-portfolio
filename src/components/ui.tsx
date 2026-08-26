import React, { useEffect, useRef, useState } from "react";
import { useInView, useScramble } from "../lib/hooks";
import { profile } from "../data/portfolio";

type CSSVars = React.CSSProperties & Record<string, string>;

/* ================= scroll reveal wrapper ================= */
export function Reveal({
  children,
  className = "",
  delay = 0,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      id={id}
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ "--rv-d": `${delay}ms` } as CSSVars}
    >
      {children}
    </div>
  );
}

/* ================= line-mask title reveal ================= */
export function MaskLines({
  lines,
  className = "",
  as: Tag = "h2",
  stagger = 110,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
}) {
  const [ref, inView] = useInView<HTMLHeadingElement>();
  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={`${inView ? "in" : ""} ${className}`}
      style={{ "--stagger": `${stagger}ms` } as CSSVars}
    >
      {lines.map((line, i) => (
        <span className="mask-line" key={i}>
          <span style={{ "--i": String(i) } as CSSVars}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/* ================= scramble-decode text ================= */
export function ScrambleText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const display = useScramble(text, inView);
  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}

/* ================= section heading ================= */
export function SectionHead({
  no,
  kicker,
  title,
  note,
}: {
  no: string;
  kicker: string;
  title: string[];
  note?: React.ReactNode;
}) {
  return (
    <div className="mb-14 md:mb-16">
      <Reveal>
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          <span className="text-amber">{no}</span>
          <span className="hline w-10" aria-hidden />
          <span>{kicker}</span>
        </div>
      </Reveal>
      <MaskLines
        lines={title}
        className="mt-5 font-display text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.88] tracking-[0.01em]"
      />
      {note && (
        <Reveal delay={220}>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">{note}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ================= viewfinder corner brackets ================= */
export function Corners({ className = "text-line2" }: { className?: string }) {
  const base = `absolute w-4 h-4 pointer-events-none ${className}`;
  return (
    <>
      <span aria-hidden className={`${base} left-2.5 top-2.5 border-l border-t`} />
      <span aria-hidden className={`${base} right-2.5 top-2.5 border-r border-t`} />
      <span aria-hidden className={`${base} bottom-2.5 left-2.5 border-b border-l`} />
      <span aria-hidden className={`${base} bottom-2.5 right-2.5 border-b border-r`} />
    </>
  );
}

/* ================= placeholder media frame ================= */
export function PlaceholderFrame({
  label,
  sub,
  watermark,
  ratio = "aspect-[4/3]",
  className = "",
  children,
}: {
  label: string;
  sub?: string;
  watermark?: string;
  ratio?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} — placeholder media block`}
      className={`group relative overflow-hidden border border-line bg-panel ${className}`}
    >
      <div className={`relative ${ratio}`}>
        <div
          aria-hidden
          className="breathe absolute inset-0 bg-[radial-gradient(90%_70%_at_30%_20%,rgba(217,160,63,0.08),transparent_60%),linear-gradient(160deg,#16161a_0%,#0e0e10_55%,#141417_100%)]"
        />
        {watermark && (
          <span
            aria-hidden
            className="text-outline absolute -bottom-4 -left-2 select-none font-display text-[7rem] leading-none opacity-40 transition-colors duration-500 group-hover:text-outline-amber md:text-[9rem]"
          >
            {watermark}
          </span>
        )}
        <span aria-hidden className="scanline" />
        <Corners className="text-line2 transition-colors duration-500 group-hover:text-amber" />
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/80 md:text-[11px]">
              {label}
            </p>
            {sub && (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                {sub}
              </p>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ================= chips / tags ================= */
export function Chip({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${
        accent ? "border-amber/40 text-amberlite" : "border-line text-muted"
      }`}
    >
      {children}
    </span>
  );
}

/* ================= resume link (handles placeholder) ================= */
export function ResumeLink({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);
  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);
  if (profile.resumeUrl) {
    return (
      <a
        href={profile.resumeUrl}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        Resume <IconArrowUpRight className="inline h-3.5 w-3.5" />
      </a>
    );
  }
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          if (timer.current) window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setOpen(false), 3200);
        }}
        className={className}
        aria-expanded={open}
      >
        Resume <IconArrowUpRight className="inline h-3.5 w-3.5" />
      </button>
      {open && (
        <span
          role="status"
          className="absolute bottom-full left-0 z-30 mb-3 w-64 border border-line bg-panel p-3 font-mono text-[10px] leading-relaxed tracking-wide text-muted"
        >
          <span className="text-amber">PLACEHOLDER</span> — add your resume URL in
          <span className="text-ink"> src/data/portfolio.ts → resumeUrl</span>
        </span>
      )}
    </span>
  );
}

/* ================= copy-email button ================= */
export function CopyEmailButton({ className = "" }: { className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<number | null>(null);
  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setState("copied");
    } catch {
      setState("error");
    }
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 1800);
  };
  return (
    <button type="button" onClick={copy} className={className}>
      {state === "copied" ? (
        <>
          Copied to clipboard <IconCheck className="h-3.5 w-3.5" />
        </>
      ) : state === "error" ? (
        <>Select &amp; copy manually</>
      ) : (
        <>
          Copy email <IconCopy className="h-3.5 w-3.5" />
        </>
      )}
    </button>
  );
}

/* ================= custom inline icons ================= */
const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
};

export function IconPlay({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M8 5.5 L19 12 L8 18.5 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function IconPause({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="7" y="5" width="3.4" height="14" fill="currentColor" stroke="none" />
      <rect x="13.6" y="5" width="3.4" height="14" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function IconArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...S}>
      <path d="M7 17 L17 7 M9 7 h8 v8" />
    </svg>
  );
}
export function IconArrowDown({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...S}>
      <path d="M12 4 v16 M5 13 l7 7 7-7" />
    </svg>
  );
}
export function IconArrowUp({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...S}>
      <path d="M12 20 V4 M5 11 l7-7 7 7" />
    </svg>
  );
}
export function IconArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...S}>
      <path d="M4 12 h16 M13 5 l7 7-7 7" />
    </svg>
  );
}
export function IconPlus({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...S}>
      <path d="M12 5 v14 M5 12 h14" />
    </svg>
  );
}
export function IconMinus({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...S}>
      <path d="M5 12 h14" />
    </svg>
  );
}
export function IconCopy({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...S}>
      <rect x="8" y="8" width="12" height="12" />
      <path d="M16 8 V4 H4 v12 h4" />
    </svg>
  );
}
export function IconCheck({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...S}>
      <path d="M4.5 12.5 l5 5 10-11" />
    </svg>
  );
}
export function IconDiamond({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function IconMail({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...S}>
      <rect x="3" y="5" width="18" height="14" />
      <path d="M3 6 l9 7 9-7" />
    </svg>
  );
}
export function IconLinkedIn({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor" stroke="none">
      <path d="M4.98 3.5 a2 2 0 1 1 0 4 2 2 0 0 1 0-4 Z M3.5 9 h3 v11.5 h-3 Z M9 9 h2.9 v1.6 h.04 c.4-.76 1.4-1.9 3.06-1.9 3.3 0 3.9 2.1 3.9 4.9 v6.9 h-3 v-6.1 c0-1.5-.03-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3 v6.2 H9 Z" />
    </svg>
  );
}
export function IconVolume({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...S}>
      <path d="M4 9.5 h3.5 L12 5.5 v13 l-4.5-4 H4 Z" fill="currentColor" stroke="none" />
      <path d="M15.5 9 a4.2 4.2 0 0 1 0 6 M18 6.5 a8 8 0 0 1 0 11" />
    </svg>
  );
}
export function IconMute({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...S}>
      <path d="M4 9.5 h3.5 L12 5.5 v13 l-4.5-4 H4 Z" fill="currentColor" stroke="none" />
      <path d="M15.5 9.5 l5 5 M20.5 9.5 l-5 5" />
    </svg>
  );
}
export function IconExpand({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...S}>
      <path d="M4 9 V4 h5 M20 9 V4 h-5 M4 15 v5 h5 M20 15 v5 h-5" />
    </svg>
  );
}
export function IconCollapse({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...S}>
      <path d="M9 4 v5 H4 M15 4 v5 h5 M9 20 v-5 H4 M15 20 v-5 h5" />
    </svg>
  );
}
export function IconClose({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...S}>
      <path d="M5 5 l14 14 M19 5 L5 19" />
    </svg>
  );
}
/* hand-drawn laurel mark for the recognition section */
export function IconLaurel({ className = "h-20 w-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M48 14 L53 25 L65 26 L56 34 L58.5 46 L48 40 L37.5 46 L40 34 L31 26 L43 25 Z" fill="currentColor" stroke="none" opacity="0.9" />
      <path d="M22 34 C16 48 20 66 34 76 M74 34 C80 48 76 66 62 76" />
      <path d="M25 44 l-8-2 M27 54 l-8 1 M31 63 l-7 4 M37 71 l-5 6" />
      <path d="M71 44 l8-2 M69 54 l8 1 M65 63 l7 4 M59 71 l5 6" />
      <path d="M40 82 C44 84 52 84 56 82" />
    </svg>
  );
}
