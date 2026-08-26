import { capabilities, processSteps } from "../data/portfolio";
import { IconArrowRight, IconDiamond, Reveal, SectionHead } from "./ui";

/* ================================================================== */
/*  Capabilities — compact, recruiter-scannable. No percentage bars.   */
/* ================================================================== */
export function Capabilities() {
  return (
    <section id="capabilities" aria-label="Capabilities" className="relative border-b border-line py-24 md:py-32">
      <div className="wrap">
        <SectionHead
          no="08"
          kicker="Capabilities"
          title={["CAPABILITIES"]}
          note="Four working disciplines, one pipeline — practiced daily, not percentage-ranked."
        />

        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((group, gi) => (
            <div
              key={group.index}
              className="group/cell bg-coal p-7 transition-colors duration-500 hover:bg-panel md:p-8"
            >
              <Reveal delay={gi * 80}>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-amber">{group.index}</span>
                  <h3 className="font-display text-3xl tracking-[0.04em] transition-colors duration-300 group-hover/cell:text-amberlite">
                    {group.title.toUpperCase()}
                  </h3>
                  <span
                    aria-hidden
                    className="hline ml-auto w-6 transition-all duration-500 group-hover/cell:w-10 group-hover/cell:bg-amber"
                  />
                </div>

                <ul className="mt-6">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="group/item flex items-center gap-3 border-b border-line/70 py-2.5 last:border-b-0"
                    >
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 shrink-0 bg-line2 transition-colors duration-300 group-hover/item:bg-amber"
                      />
                      <span className="text-sm text-muted transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:text-ink">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Process — one compact horizontal strip.                            */
/* ================================================================== */
export function Process() {
  return (
    <section id="process" aria-label="Process" className="relative border-b border-line py-14 md:py-16">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              <span className="mr-4 text-amber">09</span>Process
            </p>
            <span className="hline hidden w-16 self-center md:block" aria-hidden />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              A straightforward production path — scaled to the brief, never a rigid formula.
            </p>
          </div>
        </Reveal>

        <ol className="mt-7 flex flex-wrap items-stretch gap-x-2 gap-y-4">
          {processSteps.map((step, i) => (
            <li key={step.step} className="flex items-center gap-2">
              <Reveal delay={i * 70}>
                <div className="group relative border border-line px-4 py-3 transition-colors duration-300 hover:border-amber/60 hover:bg-panel md:px-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-amber">S{i + 1}</span>
                    <h3 className="font-display text-xl tracking-[0.06em] transition-colors duration-300 group-hover:text-amberlite md:text-2xl">
                      {step.step.toUpperCase()}
                    </h3>
                  </div>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                    {step.desc}
                  </p>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-amber transition-transform duration-500 group-hover:scale-x-100"
                  />
                </div>
              </Reveal>
              {i < processSteps.length - 1 ? (
                <IconArrowRight className="h-3.5 w-3.5 shrink-0 text-faint" />
              ) : (
                <IconDiamond className="ml-1 h-2 w-2 shrink-0 text-amber" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
