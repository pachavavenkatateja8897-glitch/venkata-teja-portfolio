import { useEffect, useState } from "react";
import { navLinks, profile } from "../data/portfolio";
import { useISTClock } from "../lib/hooks";
import { IconPlay } from "./ui";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const clock = useISTClock();

  /* header state + reading progress */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* active section tracking */
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* lock scroll while mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-line bg-coal/85 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        {/* reading progress */}
        <span
          aria-hidden
          className="absolute left-0 top-0 block h-[2px] bg-amber transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <a href="#home" className="group flex items-center gap-3" aria-label="Back to top — Pachava Venkata Teja">
            <span className="grid h-9 w-9 place-items-center border border-line transition-colors duration-300 group-hover:border-amber">
              <IconPlay className="h-3.5 w-3.5 translate-x-[1px] text-amber" />
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-muted transition-colors group-hover:text-ink sm:block">
              Pachava · V · Teja
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`link-draw font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  active === l.id ? "active" : "text-muted hover:text-ink"
                }`}
                aria-current={active === l.id ? "true" : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <span className="hidden font-mono text-[10px] tracking-[0.2em] text-faint md:block">
              HYD {clock} IST
            </span>
            <a
              href="#contact"
              className="hidden border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink transition-all duration-300 hover:border-amber hover:bg-amber hover:text-coal sm:block"
            >
              Let&rsquo;s Talk
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-10 w-10 items-center justify-center border border-line lg:hidden"
            >
              <span
                className={`absolute h-px w-4 bg-ink transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-ink transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-coal/[0.985] px-6 pb-10 pt-24 transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {navLinks.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className={`group flex items-baseline gap-4 border-b border-line py-4 transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-amber">
                0{i + 1}
              </span>
              <span className="font-display text-5xl tracking-[0.03em] transition-colors group-hover:text-amberlite">
                {l.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-3 font-mono text-[11px] tracking-[0.14em] text-muted">
          <a href={`mailto:${profile.email}`} className="hover:text-amber" tabIndex={open ? 0 : -1}>
            {profile.email}
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber"
            tabIndex={open ? 0 : -1}
          >
            {profile.linkedinLabel}
          </a>
          <p className="text-faint">{profile.location} — {clock} IST</p>
        </div>
      </div>
    </>
  );
}
