import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "../data/portfolio";
import { Chip, Corners, IconArrowUpRight, IconClose, IconPlay, Reveal, SectionHead } from "./ui";
import VideoPlayer from "./VideoPlayer";

export default function Work() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" aria-label="Selected work" className="relative border-b border-line py-24 md:py-32">
      <div className="wrap">
        <SectionHead
          no="02"
          kicker="Selected Work"
          title={["SELECTED", "WORK"]}
          note="Media-first — five engagements across short-form performance content, training and testimonial delivery, and AI-led cinematic production."
        />

        <Reveal>
          <div className="mb-12 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rotate-45 bg-amber" aria-hidden />
              All view figures are client-reported / project-reported
            </span>
            <span>05 engagements — 2025</span>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {projects.map((p, i) => (
            <ProjectRow
              key={p.num}
              project={p}
              flip={i % 2 === 1}
              last={i === projects.length - 1}
              onOpen={() => setSelected(p)}
            />
          ))}
        </div>

        <Reveal>
          <p className="mt-12 max-w-2xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-faint">
            ※ Statistics are reported by the client or project. Projected figures are
            estimates, not guaranteed outcomes.
          </p>
        </Reveal>
      </div>

      {selected && <ProjectLightbox project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

/* ================================================================== */
/*  Project row — media dominant, copy compact.                        */
/*  MEDIA → TITLE → ROLE → DESCRIPTION → RESULT                        */
/* ================================================================== */
function ProjectRow({
  project,
  flip,
  last,
  onOpen,
}: {
  project: Project;
  flip: boolean;
  last: boolean;
  onOpen: () => void;
}) {
  return (
    <article
      className={`group grid items-center gap-8 border-t border-line py-14 md:py-16 lg:grid-cols-12 lg:gap-10 ${
        last ? "border-b" : ""
      }`}
      aria-label={`Project ${project.num} — ${project.title}`}
    >
      {/* ---- media (dominant) ---- */}
      <div className={`lg:col-span-8 ${flip ? "lg:order-2" : ""}`}>
        <Reveal>
          <ProjectMedia project={project} onOpen={onOpen} />
        </Reveal>
      </div>

      {/* ---- compact info rail ---- */}
      <div className={`lg:col-span-4 ${flip ? "lg:order-1" : ""}`}>
        <Reveal delay={120}>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber">
            Project {project.num} — {project.category}
          </p>

          <h3 className="title-sweep mt-3 inline font-display text-3xl leading-[0.98] tracking-[0.015em] md:text-4xl">
            {project.title}
          </h3>

          <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted">
            <span className="text-faint">Role / </span>
            {project.role}
            {project.languages && (
              <>
                {" "}
                <span className="text-amberlite">— {project.languages}</span>
              </>
            )}
          </p>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">{project.description}</p>
        </Reveal>

        {/* reported results */}
        {project.results.length > 0 && (
          <Reveal delay={200}>
            <div className="mt-6 border-t border-line">
              {project.results.map((r) => (
                <div
                  key={r.label}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 border-b border-line py-3"
                >
                  <span className="font-display text-3xl tracking-[0.02em] text-amberlite md:text-[2.1rem]">
                    {r.value}
                  </span>
                  <span className="font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.12em] text-muted">
                    {r.label}
                    {r.note && <span className="text-faint"> · {r.note}</span>}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal delay={260}>
          <button
            type="button"
            onClick={onOpen}
            className="group/vp2 mt-6 inline-flex items-center gap-3 border border-line2 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink transition-all duration-300 hover:border-amber hover:bg-amber hover:text-coal"
          >
            View Project
            <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/vp2:-translate-y-0.5 group-hover/vp2:translate-x-0.5" />
          </button>
        </Reveal>
      </div>
    </article>
  );
}

/* ================================================================== */
/*  Media stage — real thumbnail / clip when provided, slate if not.   */
/* ================================================================== */
function ProjectMedia({ project, onOpen, big = false }: { project: Project; onOpen?: () => void; big?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* hover-play preview when a clip is wired in */
  const preview = (play: boolean) => {
    const v = videoRef.current;
    if (!v) return;
    if (play) void v.play().catch(() => undefined);
    else {
      v.pause();
      v.currentTime = 0;
    }
  };

  const inner = (
    <div className={`relative overflow-hidden ${project.aspect}`}>
      {project.video ? (
        <video
          ref={videoRef}
          src={project.video}
          poster={project.thumbnail ?? undefined}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : project.thumbnail ? (
        <img
          src={project.thumbnail}
          alt={`${project.title} — key frame`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(80%_70%_at_65%_25%,rgba(217,160,63,0.07),transparent_60%),linear-gradient(160deg,#16161a_0%,#0e0e10_55%,#141417_100%)] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <span
            aria-hidden
            className={`text-outline absolute -bottom-4 -left-2 select-none font-display leading-none transition-colors duration-500 group-hover:text-outline-amber ${
              big ? "text-[10rem] md:text-[14rem]" : "text-[8rem] md:text-[11rem]"
            }`}
          >
            {project.num}
          </span>
          <span aria-hidden className="scanline opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </>
      )}

      <Corners className="text-line2 transition-colors duration-500 group-hover:text-amber" />

      <div className="pointer-events-none absolute left-4 top-3.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
        Project {project.num}
      </div>
      <div className="pointer-events-none absolute right-4 top-3.5 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-faint sm:block">
        {project.video
          ? "Clip — hover to preview"
          : project.thumbnail
            ? "Poster frame"
            : `REPLACE_WITH_PROJECT_${project.num}_THUMBNAIL`}
      </div>

      {/* hover CTA pill */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
        <span className="inline-flex translate-y-3 items-center gap-2 border border-line2 bg-coal/85 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:border-amber group-hover:text-amberlite group-hover:opacity-100">
          {project.video ? <IconPlay className="h-3 w-3" /> : null}
          View project
        </span>
      </div>
    </div>
  );

  if (!onOpen) return <div className="relative w-full border border-line bg-panel">{inner}</div>;

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => preview(true)}
      onMouseLeave={() => preview(false)}
      aria-label={`View project — ${project.title}`}
      className="group relative block w-full overflow-hidden border border-line bg-panel text-left transition-colors duration-500 hover:border-amber/50"
    >
      {inner}
    </button>
  );
}

/* ================================================================== */
/*  Lightbox — full project presentation.                              */
/* ================================================================== */
function ProjectLightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — project details`}
      className="fixed inset-0 z-[90] overflow-y-auto bg-coal/[0.97] backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="wrap min-h-full py-14 md:py-20" onClick={(e) => e.stopPropagation()}>
        {/* header bar */}
        <div className="mb-8 flex items-center justify-between gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
            <span className="text-amber">Project {project.num}</span> — {project.category}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className="grid h-11 w-11 shrink-0 place-items-center border border-line text-ink transition-colors duration-300 hover:border-amber hover:text-amber"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </div>

        {/* media — largest element */}
        <div className="group">
          {project.video ? (
            <VideoPlayer
              src={project.video}
              poster={project.thumbnail}
              aspect={project.aspect}
              label={`PROJECT ${project.num}`}
              replaceHint={`video — project ${project.num}`}
            />
          ) : (
            <ProjectMedia project={project} big />
          )}
        </div>

        {/* meta grid */}
        <div className="mt-8 grid gap-px border border-line bg-line md:grid-cols-3">
          <div className="bg-coal p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber">Title</p>
            <h3 className="mt-3 font-display text-3xl leading-[0.95] tracking-[0.015em]">{project.title}</h3>
            <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted">
              <span className="text-faint">Role / </span>
              {project.role}
            </p>
            {project.languages && (
              <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-ink">
                RELEASES — <span className="text-amberlite">{project.languages}</span>
              </p>
            )}
          </div>

          <div className="bg-coal p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber">Description</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </div>

          <div className="bg-coal p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber">Reported result</p>
            {project.results.length > 0 ? (
              project.results.map((r) => (
                <div key={r.label} className="mt-3 border-b border-line/70 pb-3 last:border-b-0 last:pb-0">
                  <p className="font-display text-3xl tracking-[0.02em] text-amberlite">{r.value}</p>
                  <p className="mt-1 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.12em] text-muted">
                    {r.label}
                    {r.note && <span className="text-faint"> · {r.note}</span>}
                  </p>
                </div>
              ))
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.scopeNote ?? "Contribution-led engagement — outcomes held by the production."}
              </p>
            )}
            <p className="mt-4 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.14em] text-faint">
              Audience figures are client / project-reported. Projections are estimates, not guarantees.
            </p>
          </div>
        </div>

        {/* contributions (multilingual production) */}
        {project.responsibilities && (
          <div className="mt-8 border border-line p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber">Contributions</p>
            <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {project.responsibilities.map((r) => (
                <li key={r} className="flex items-center gap-3 border-b border-line/60 py-2.5 text-sm text-muted">
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-amber" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
