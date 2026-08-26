import { profile } from "../data/portfolio";
import { useISTClock } from "../lib/hooks";
import {
  CopyEmailButton,
  IconArrowUp,
  IconArrowUpRight,
  IconLinkedIn,
  IconMail,
  MaskLines,
  Reveal,
  ResumeLink,
} from "./ui";

export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="relative overflow-hidden py-28 md:py-36">
      {/* ambient ghost type */}
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute -bottom-8 left-0 hidden select-none whitespace-nowrap font-display text-[13rem] leading-none opacity-[0.05] lg:block"
      >
        LET&rsquo;S TALK
      </span>

      <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              <span className="text-amber">10</span>
              <span className="hline w-10" aria-hidden />
              <span>Contact</span>
            </div>
          </Reveal>

          <MaskLines
            lines={["LET'S CREATE", "SOMETHING VISUAL."]}
            className="mt-6 font-display text-[clamp(3.4rem,9.5vw,8.5rem)] leading-[0.85] tracking-[0.01em]"
          />

          <Reveal delay={220}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              Available for video editing, AI creative, motion design, color, and
              post-production opportunities.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-coal transition-colors duration-300 hover:bg-amber"
              >
                <IconMail className="h-4 w-4" />
                Email Me
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 border border-line2 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-ink transition-all duration-300 hover:border-amber hover:text-amberlite"
              >
                <IconLinkedIn className="h-4 w-4" />
                LinkedIn
                <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <ResumeLink className="inline-flex items-center gap-3 border border-line2 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-ink transition-all duration-300 hover:border-amber hover:text-amberlite" />
            </div>
          </Reveal>

          <Reveal delay={400}>
            <CopyEmailButton className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-faint transition-colors duration-300 hover:text-amber" />
          </Reveal>
        </div>

        {/* channel ledger */}
        <div className="lg:col-span-5">
          <Reveal delay={200}>
            <div className="border border-line">
              <ChannelRow label="Email" value={profile.email} href={`mailto:${profile.email}`} />
              <ChannelRow
                label="LinkedIn"
                value={profile.linkedinLabel}
                href={profile.linkedinUrl}
                external
              />
              <ChannelRow label="Instagram" value="URL placeholder — add handle" placeholder />
              <ChannelRow label="YouTube" value="URL placeholder — add channel" placeholder />
              <ChannelRow label="Location" value={profile.location} plain />
              <ChannelRow
                label="Availability"
                value="Open to freelance, contract & studio roles"
                plain
                last
              />
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-faint">
              Placeholders are honest — no invented handles. Drop real URLs in
              <span className="text-muted"> src/data/portfolio.ts</span>.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ChannelRow({
  label,
  value,
  href,
  external,
  placeholder,
  plain,
  last,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  placeholder?: boolean;
  plain?: boolean;
  last?: boolean;
}) {
  const inner = (
    <>
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint transition-colors duration-300 group-hover:text-amber">
        {label}
      </span>
      <span
        className={`mt-1 flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
          placeholder ? "text-faint" : plain ? "text-muted" : "text-ink group-hover:text-amberlite"
        }`}
      >
        {value}
        {!plain && !placeholder && (
          <IconArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
        )}
      </span>
    </>
  );
  const cls = `group block border-b border-line px-5 py-4 transition-colors duration-300 ${
    last ? "border-b-0" : ""
  } ${href ? "hover:bg-panel" : ""}`;

  if (href) {
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className={cls}>
        {inner}
      </a>
    );
  }
  return <div className={cls}>{inner}</div>;
}

export function Footer() {
  const clock = useISTClock();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl tracking-[0.04em]">PACHAVA VENKATA TEJA</p>
          <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-muted">
            AI Creative Artist | Video Editor
            <br />
            Colorist | Motion Designer
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col items-start gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="link-draw text-muted hover:text-ink">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="link-draw text-muted hover:text-ink">
            Email
          </a>
          <ResumeLink className="link-draw text-muted hover:text-ink" />
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group mt-2 inline-flex items-center gap-2 text-amber transition-colors hover:text-amberlite"
          >
            Back to top
            <IconArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </nav>

        <div className="flex flex-col items-start gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint md:items-end md:text-right">
          <p>
            {profile.location} — <span className="text-muted">{clock} IST</span>
          </p>
          <p>Portfolio — Cut 01</p>
          <p className="max-w-[260px] leading-relaxed">
            All audience figures are client / project-reported where labeled.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          <p>© {year} Pachava Venkata Teja</p>
          <p>
            Edited, graded &amp; built with intent <span className="text-amber">▮</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
