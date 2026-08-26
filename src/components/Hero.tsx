import { marqueeRoles, profile } from "../data/portfolio";
import { useISTClock, useTimecode } from "../lib/hooks";
import {
  Corners,
  IconArrowDown,
  IconArrowUpRight,
  IconDiamond,
  IconPlay,
  MaskLines,
  Reveal,
  ScrambleText,
} from "./ui";

export default function Hero() {
  const tc = useTimecode();
  const clock = useISTClock();

  return (
    <>
      <section id="home" aria-label="Introduction" className="relative flex min-h-screen flex-col overflow-hidden">
        {/* ambient ghost type */}
        <span
          aria-hidden
          className="text-outline pointer-events-none absolute -right-8 top-[30%] hidden select-none font-display text-[22rem] leading-none opacity-[0.05] xl:block"
        >
          TEJA
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(217,160,63,0.07),transparent_65%)]"
        />

        <div className="wrap flex-1 pt-28 lg:pt-32">
          {/* slate row */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
              <span className="flex items-center gap-2 text-ink">
                <span className="rec-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
                REC
              </span>
              <ScrambleText text="PVT — PORTFOLIO" className="text-ink/85" />
              <span className="hidden sm:inline">Cut 01</span>
              <span className="hidden text-amber md:inline" aria-hidden>
                TC {tc}
              </span>
              <span className="ml-auto hidden lg:inline">
                {profile.location} · {clock} IST
              </span>
            </div>
          </Reveal>

          <div className="mt-10 grid items-start gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-10">
            {/* left — name + positioning hierarchy */}
            <div className="lg:col-span-7">
              <h1 aria-label={`${profile.firstName} ${profile.lastName}`}>
                <MaskLines
                  as="span"
                  lines={[profile.firstName, profile.lastName]}
                  className="block font-display text-[clamp(4rem,12.5vw,11.5rem)] leading-[0.82] tracking-[0.01em]"
                />
              </h1>

              {/* positioning — the profession, instantly visible */}
              <Reveal delay={230}>
                <p className="mt-8 font-display text-[clamp(2rem,4.6vw,3.9rem)] leading-[0.98] tracking-[0.02em]">
                  {profile.primaryPositioning[0]}{" "}
                  <span className="text-amber" aria-hidden>
                    ×
                  </span>{" "}
                  {profile.primaryPositioning[1]}
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted sm:text-[11px]">
                  {profile.supportingPositioning}
                </p>
              </Reveal>

              <Reveal delay={330}>
                <p className="mt-8 max-w-2xl border-l-2 border-amber/60 pl-5 text-[1.35rem] font-medium leading-snug md:text-[1.6rem]">
                  &ldquo;Visual storytelling through{" "}
                  <span className="text-amber">editing</span>,{" "}
                  <span className="text-amber">motion</span>,{" "}
                  <span className="text-amber">color</span>, and{" "}
                  <span className="text-amber">AI</span>.&rdquo;
                </p>
              </Reveal>

              <Reveal delay={410}>
                <p className="mt-5 max-w-xl leading-relaxed text-muted">{profile.summary}</p>
              </Reveal>

              <Reveal delay={480}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href="#work"
                    className="group inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-coal transition-colors duration-300 hover:bg-amber"
                  >
                    View Selected Work
                    <IconArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-1" />
                  </a>
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-3 border border-line2 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-ink transition-all duration-300 hover:border-amber hover:text-amberlite"
                  >
                    Contact Me
                    <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </Reveal>

              {/* proof line — what the work is, in one breath */}
              <Reveal delay={560}>
                <ul className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-5">
                  {profile.proofLine.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-faint"
                    >
                      <span className="text-muted transition-colors duration-300 hover:text-amberlite">{item}</span>
                      {i < profile.proofLine.length - 1 && (
                        <IconDiamond className="h-1.5 w-1.5 shrink-0 text-amber/70" />
                      )}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* right — showreel poster placeholder */}
            <Reveal delay={300} className="lg:col-span-5">
              <div
                role="img"
                aria-label="Showreel poster — placeholder for upcoming media"
                className="group relative overflow-hidden border border-line bg-panel transition-colors duration-500 hover:border-amber/50"
              >
                <div className="relative aspect-[4/5]">
                  <div
                    aria-hidden
                    className="breathe absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_25%,rgba(217,160,63,0.1),transparent_60%),linear-gradient(165deg,#17171b_0%,#0e0e10_55%,#151518_100%)]"
                  />
                  <span
                    aria-hidden
                    className="text-outline absolute -bottom-5 -right-2 select-none font-display text-[8rem] leading-none opacity-50 transition-all duration-700 group-hover:text-outline-amber md:text-[10rem]"
                  >
                    PVT
                  </span>
                  <span aria-hidden className="scanline" />
                  <Corners className="text-line2 transition-colors duration-500 group-hover:text-amber" />

                  <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    <span className="rec-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
                    REC
                  </div>
                  <div className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                    A-CAM
                  </div>

                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-line2 transition-all duration-500 group-hover:scale-110 group-hover:border-amber group-hover:bg-amber/10">
                        <IconPlay className="h-7 w-7 translate-x-[2px] text-ink transition-colors group-hover:text-amber" />
                      </span>
                      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/85">
                        Showreel Poster
                      </p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                        Placeholder — media pending
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-x-5 bottom-5 flex items-center justify-between border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                    <span>{profile.location}</span>
                    <span className="text-amber" aria-hidden>
                      {tc}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* scroll cue */}
        <div className="wrap flex items-center gap-4 pb-9 pt-14 font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
          <span>Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-line" aria-hidden>
            <span className="scrolldrop absolute inset-x-0 top-0 block h-3 bg-amber" />
          </span>
          <span className="hidden sm:inline">Selected work below</span>
        </div>
      </section>

      <Marquee />
    </>
  );
}

function Marquee() {
  const items = [...marqueeRoles, ...marqueeRoles];
  return (
    <div className="marquee relative overflow-hidden border-y border-line py-5" aria-hidden>
      <div className="marquee-track items-center gap-10 pr-10">
        {items.map((role, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={`whitespace-nowrap font-display text-4xl tracking-[0.06em] md:text-5xl ${
                i % 2 === 1 ? "text-outline" : ""
              }`}
            >
              {role.toUpperCase()}
            </span>
            <IconDiamond className="h-2.5 w-2.5 shrink-0 text-amber" />
          </span>
        ))}
      </div>
    </div>
  );
}
