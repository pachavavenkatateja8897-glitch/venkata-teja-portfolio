import { aboutClose, aboutCombines, aboutLead, profile } from "../data/portfolio";
import { useISTClock } from "../lib/hooks";
import { MaskLines, PlaceholderFrame, Reveal } from "./ui";

export function About() {
  const clock = useISTClock();
  return (
    <section id="about" aria-label="About" className="relative border-b border-line py-24 md:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* sticky editorial column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                <span className="text-amber">04</span>
                <span className="hline w-10" aria-hidden />
                <span>About</span>
              </div>
            </Reveal>
            <MaskLines
              lines={["BEHIND", "THE CUT"]}
              className="mt-5 font-display text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.88]"
            />

            <Reveal delay={200}>
              <div className="relative mt-10 max-w-sm">
                <PlaceholderFrame
                  label="Portrait"
                  sub="Placeholder — photo pending"
                  watermark="PVT"
                  ratio="aspect-[3/4]"
                />
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  <span>{profile.location}</span>
                  <span>{clock} IST</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* concise copy column */}
        <div className="lg:col-span-7 lg:pt-4">
          <Reveal>
            <p className="max-w-2xl text-2xl font-medium leading-snug md:text-[1.9rem] md:leading-[1.3]">
              &ldquo;{aboutLead.replace(/^I am /, "")}&rdquo;
              <span className="sr-only">I am </span>
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-faint">
              <span>The work combines</span>
              <span className="hline flex-1" aria-hidden />
            </div>
          </Reveal>

          <ul className="mt-2 grid sm:grid-cols-2">
            {aboutCombines.map((item, i) => (
              <Reveal key={item} delay={i * 60}>
                <li className="group flex items-center gap-4 border-b border-line py-4">
                  <span
                    aria-hidden
                    className="h-2 w-2 rotate-45 border border-amber transition-all duration-300 group-hover:bg-amber"
                  />
                  <span className="text-[15px] font-medium text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink">
                    {item}
                  </span>
                  <span className="ml-auto font-mono text-[10px] tracking-[0.2em] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200}>
            <p className="mt-10 max-w-xl leading-relaxed text-muted">{aboutClose}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
