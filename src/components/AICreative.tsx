import { aiCreativeTiles } from "../data/portfolio";
import { Corners, IconPlay, Reveal, SectionHead } from "./ui";

/* ================================================================== */
/*  AI creative — SHOW the ability. Six media tiles, data-driven.      */
/*  Drop real generated frames/clips into aiCreativeTiles[].media.     */
/* ================================================================== */
export default function AICreative() {
  return (
    <section id="ai" aria-label="AI creative work" className="relative border-b border-line py-24 md:py-32">
      <div className="wrap">
        <SectionHead
          no="03"
          kicker="AI Creative"
          title={["AI CREATIVE", "DEVELOPMENT"]}
          note="Prompt-led image and video generation, built for continuity. Frames below are placeholders — swap in real generated work via the data file."
        />

        <div className="grid items-start gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {aiCreativeTiles.map((tile, i) => (
            <Reveal key={tile.index} delay={(i % 3) * 90}>
              <figure className="group relative">
                {/* media */}
                <div className="relative overflow-hidden border border-line bg-panel transition-colors duration-500 group-hover:border-amber/50">
                  <div className={`relative ${tile.aspect}`}>
                    {tile.media ? (
                      tile.kind === "video" ? (
                        <video
                          src={tile.media}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          onMouseEnter={(e) => void e.currentTarget.play().catch(() => undefined)}
                          onMouseLeave={(e) => e.currentTarget.pause()}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <img
                          src={tile.media}
                          alt={`${tile.title} — generated frame`}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      )
                    ) : (
                      <>
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-[radial-gradient(75%_65%_at_35%_25%,rgba(217,160,63,0.07),transparent_60%),linear-gradient(160deg,#16161a_0%,#0d0d0f_60%,#141417_100%)] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                        {/* generative-grid hint */}
                        <span
                          aria-hidden
                          className="absolute inset-0 opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.09]"
                          style={{
                            backgroundImage:
                              "linear-gradient(rgba(241,239,233,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(241,239,233,0.5) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                          }}
                        />
                        <span
                          aria-hidden
                          className="text-outline absolute -bottom-3 -right-1 select-none font-display text-6xl leading-none opacity-40 transition-colors duration-500 group-hover:text-outline-amber md:text-7xl"
                        >
                          {tile.index.split("-")[1]}
                        </span>
                        <span aria-hidden className="scanline opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </>
                    )}

                    <Corners className="text-line2 transition-colors duration-500 group-hover:text-amber" />

                    {/* kind badge + replace token */}
                    <span className="pointer-events-none absolute left-3.5 top-3 flex items-center gap-1.5 border border-line bg-coal/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                      {tile.kind === "video" && <IconPlay className="h-2.5 w-2.5 text-amber" />}
                      {tile.kind === "video" ? "Video" : "Image"}
                    </span>
                    {!tile.media && (
                      <span className="pointer-events-none absolute bottom-3 left-3.5 hidden font-mono text-[9px] uppercase tracking-[0.18em] text-faint sm:block">
                        REPLACE_WITH_{tile.index.replace("-", "_")}_MEDIA
                      </span>
                    )}
                  </div>
                </div>

                {/* caption */}
                <figcaption className="mt-4 flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-amber">{tile.index}</span>
                  <div>
                    <h3 className="font-display text-xl leading-tight tracking-[0.05em] transition-colors duration-300 group-hover:text-amberlite md:text-2xl">
                      {tile.title.toUpperCase()}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">{tile.note}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-10 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-faint">
            Continuity is the craft — same character, same world, every take. Media slots live in
            <span className="text-muted"> src/data/portfolio.ts → aiCreativeTiles</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
