import { education, experience, recognition } from "../data/portfolio";
import { Chip, Corners, IconLaurel, Reveal, SectionHead } from "./ui";

export function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="relative border-b border-line py-24 md:py-32">
      <div className="wrap">
        <SectionHead
          no="05"
          kicker="Experience"
          title={["EXPERIENCE"]}
          note="Freelance, contract, and internship engagements. Headline figures emphasized; everything else sits quietly underneath."
        />

        <div className="flex flex-col">
          {experience.map((entry, i) => {
            const headline = entry.ledger?.filter((l) => l.highlight) ?? [];
            const supporting = entry.ledger?.filter((l) => !l.highlight) ?? [];
            return (
              <article
                key={entry.id}
                className={`grid gap-8 border-t border-line py-14 md:py-16 lg:grid-cols-[280px_1fr] ${
                  i === experience.length - 1 ? "border-b" : ""
                }`}
                aria-label={`Engagement ${entry.id} — ${entry.company}`}
              >
                {/* rail */}
                <div className="flex items-baseline gap-4 lg:flex-col lg:items-start lg:gap-3">
                  <Reveal>
                    <p className="font-display text-3xl tracking-[0.06em] text-amberlite">{entry.dates}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      {entry.location}
                    </p>
                    <div className="mt-4">
                      <Chip accent>{entry.type}</Chip>
                    </div>
                    <p className="mt-4 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-faint lg:block">
                      Engagement {entry.id} / 0{experience.length}
                    </p>
                  </Reveal>
                </div>

                {/* content */}
                <div className="relative border-l border-line pl-6 md:pl-10">
                  <span
                    aria-hidden
                    className="absolute -left-[5.5px] top-2 h-2.5 w-2.5 rotate-45 border border-amber bg-coal"
                  />
                  <Reveal>
                    <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-amber">{entry.role}</p>
                    <h3 className="mt-3 font-display text-5xl leading-[0.92] tracking-[0.015em] md:text-6xl">
                      {entry.company.toUpperCase()}
                    </h3>
                  </Reveal>

                  {entry.intro && (
                    <Reveal delay={120}>
                      <p className="mt-5 max-w-2xl leading-relaxed text-muted">{entry.intro}</p>
                    </Reveal>
                  )}
                  {entry.description && (
                    <Reveal delay={120}>
                      <p className="mt-5 max-w-2xl leading-relaxed text-muted">{entry.description}</p>
                    </Reveal>
                  )}

                  {/* headline metrics — emphasized */}
                  {headline.length > 0 && (
                    <Reveal delay={180}>
                      <div className="mt-8">
                        <p className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                          Headline reported figures
                          <span className="hline flex-1" aria-hidden />
                          <span className="text-amber">client / project-reported</span>
                        </p>
                        <div className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
                          {headline.map((stat) => (
                            <div
                              key={stat.label}
                              className="group/stat bg-coal p-5 transition-colors duration-300 hover:bg-panel"
                            >
                              <p className="font-display text-4xl tracking-[0.02em] text-amberlite transition-colors duration-300 group-hover/stat:text-amber md:text-5xl">
                                {stat.value}
                              </p>
                              <p className="mt-2 text-xs leading-relaxed text-muted">{stat.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  )}

                  {/* supporting ledger — deliberately quiet */}
                  {supporting.length > 0 && (
                    <Reveal delay={220}>
                      <details className="group/ledger mt-5">
                        <summary className="flex cursor-pointer list-none items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-faint transition-colors duration-300 hover:text-muted [&::-webkit-details-marker]:hidden">
                          <span
                            aria-hidden
                            className="grid h-4 w-4 place-items-center border border-line text-[9px] text-amber transition-transform duration-300 group-open/ledger:rotate-45"
                          >
                            +
                          </span>
                          {supporting.length} supporting figures — {entry.ledgerTitle ?? "reported ledger"}
                        </summary>
                        <ul className="mt-4 grid gap-x-10 gap-y-2.5 border-l border-line pl-5 sm:grid-cols-2">
                          {supporting.map((stat) => (
                            <li key={stat.label} className="flex items-baseline gap-3 text-[13px] leading-relaxed text-faint">
                              <span className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-muted">
                                {stat.value}
                              </span>
                              {stat.label}
                            </li>
                          ))}
                        </ul>
                      </details>
                    </Reveal>
                  )}

                  {/* responsibilities */}
                  {entry.responsibilities && (
                    <Reveal delay={240}>
                      <div className="mt-9">
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                          {entry.responsibilitiesTitle}
                        </p>
                        <ul className="mt-4 grid gap-x-10 md:grid-cols-2">
                          {entry.responsibilities.map((r) => (
                            <li
                              key={r}
                              className="group flex items-start gap-3 border-b border-line/70 py-3 text-sm leading-relaxed text-muted"
                            >
                              <span
                                aria-hidden
                                className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-line2 transition-colors duration-300 group-hover:bg-amber"
                              />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Recognition — now visual: poster slot + award copy.                */
/* ================================================================== */
export function Recognition() {
  return (
    <section id="recognition" aria-label="Recognition" className="relative border-b border-line py-24 md:py-32">
      <div className="wrap">
        <SectionHead no="06" kicker="Recognition" title={["RECOGNITION"]} />

        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          {/* poster slot — REPLACE_WITH_AWARD_POSTER */}
          <Reveal className="lg:col-span-5">
            <div className="group relative h-full overflow-hidden border border-line bg-panel transition-colors duration-500 hover:border-amber/50">
              <div className="relative aspect-[3/4]">
                {recognition.poster ? (
                  <img
                    src={recognition.poster}
                    alt="Ichigo social-media ad poster — Editor's Choice Award, MAAC MCL Competition"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <>
                    <div
                      aria-hidden
                      className="breathe absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_30%,rgba(217,160,63,0.09),transparent_60%),linear-gradient(165deg,#17171b_0%,#0e0e10_55%,#151518_100%)]"
                    />
                    <span
                      aria-hidden
                      className="text-outline absolute -bottom-4 -right-2 select-none font-display text-[7rem] leading-none opacity-40 transition-colors duration-500 group-hover:text-outline-amber md:text-[8rem]"
                    >
                      MCL
                    </span>
                    <span aria-hidden className="scanline" />
                  </>
                )}
                <Corners className="text-line2 transition-colors duration-500 group-hover:text-amber" />
                <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  Exhibit A
                </div>
                <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  {recognition.poster ? "Poster — on file" : "Poster pending"}
                </div>
                {!recognition.poster && (
                  <div className="absolute inset-0 grid place-items-center px-6 text-center">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/80">
                        Ichigo Ad Poster
                      </p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                        REPLACE_WITH_AWARD_POSTER
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {/* award copy */}
          <Reveal delay={150} className="lg:col-span-7">
            <div className="relative flex h-full flex-col justify-center overflow-hidden border border-line bg-panel px-8 py-10 md:px-12 md:py-14">
              <span
                aria-hidden
                className="text-outline pointer-events-none absolute -right-4 -top-10 select-none font-display text-[10rem] leading-none opacity-25"
              >
                01
              </span>
              <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
                <div className="text-amber">
                  <IconLaurel className="h-24 w-24 md:h-28 md:w-28" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber">Award — on file</p>
                  <h3 className="mt-4 font-display text-5xl leading-[0.9] tracking-[0.015em] md:text-6xl xl:text-7xl">
                    EDITOR&rsquo;S CHOICE
                  </h3>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
                    {recognition.org}
                  </p>
                  <p className="mt-5 max-w-md leading-relaxed text-muted">{recognition.detail}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" aria-label="Education" className="relative border-b border-line py-24 md:py-32">
      <div className="wrap">
        <SectionHead no="07" kicker="Education" title={["EDUCATION"]} />

        <div className="border-t border-line">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 90}>
              <div className="group grid items-baseline gap-2 border-b border-line px-2 py-6 transition-colors duration-300 hover:bg-panel md:grid-cols-[200px_1fr_auto] md:gap-8 md:px-4 md:py-7">
                <p className="font-mono text-[11px] tracking-[0.2em] text-muted">
                  <span className="mr-3 text-amber">E{i + 1}</span>
                  {e.years}
                </p>
                <h3 className="font-display text-2xl tracking-[0.04em] transition-colors duration-300 group-hover:text-amberlite md:text-3xl">
                  {e.degree.toUpperCase()}
                </h3>
                <p className="text-sm text-muted md:text-right">{e.school}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
