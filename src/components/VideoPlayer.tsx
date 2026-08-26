import { useCallback, useEffect, useRef, useState } from "react";
import {
  Corners,
  IconCollapse,
  IconExpand,
  IconMute,
  IconPause,
  IconPlay,
  IconVolume,
} from "./ui";

/* muted, desaturated bars — clearly a placeholder, never fake footage */
const BARS = ["#6d6d62", "#67675f", "#4e4e59", "#41594c", "#5a4545", "#474256", "#57513f"];

function fmt(t: number): string {
  if (!Number.isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export interface VideoPlayerProps {
  /** REPLACE_WITH_* source — set via src/data/portfolio.ts */
  src?: string | null;
  poster?: string | null;
  aspect?: string;
  /** large frame label, e.g. "SHOWREEL" */
  label: string;
  /** shown in the empty-state note, e.g. "REPLACE_WITH_SHOWREEL" */
  replaceHint: string;
  /** smaller top-left status word */
  metaLeft?: string;
  /** smaller top-right word */
  metaRight?: string;
}

export default function VideoPlayer({
  src,
  poster,
  aspect = "aspect-video",
  label,
  replaceHint,
  metaLeft,
  metaRight,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLButtonElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFs, setIsFs] = useState(false);
  const hasSource = Boolean(src);

  /* play / pause */
  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || !hasSource) {
      setPlaying((p) => !p); // empty-state standby pulse
      return;
    }
    if (v.paused) void v.play().catch(() => setPlaying(false));
    else v.pause();
  }, [hasSource]);

  const onTime = () => {
    const v = videoRef.current;
    if (!v) return;
    setProgress(v.duration ? v.currentTime / v.duration : 0);
  };

  /* fullscreen */
  const toggleFs = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.().catch(() => undefined);
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  /* keyboard: space toggles when the stage is focused */
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      togglePlay();
    }
  };

  const seek = (e: React.MouseEvent) => {
    const el = trackRef.current;
    const v = videoRef.current;
    if (!el || !v || !hasSource || !v.duration) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
    setProgress(ratio);
  };

  const pct = `${progress * 100}%`;

  return (
    <div
      ref={wrapRef}
      className={`group/vp relative overflow-hidden border bg-coal transition-colors duration-500 ${
        playing && hasSource ? "border-amber/50" : "border-line hover:border-line2"
      } ${isFs ? "bg-black" : ""}`}
    >
      {/* ------------ frame ------------ */}
      <div
        role="button"
        tabIndex={0}
        onClick={togglePlay}
        onKeyDown={onKey}
        aria-label={`${hasSource ? (playing ? "Pause" : "Play") : "Media placeholder for"} ${label}`}
        className={`relative block w-full cursor-pointer overflow-hidden ${aspect}`}
      >
        {hasSource ? (
          <video
            ref={videoRef}
            src={src ?? undefined}
            poster={poster ?? undefined}
            muted={muted}
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={onTime}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            {/* poster image if provided, otherwise slate */}
            {poster ? (
              <img
                src={poster}
                alt={`${label} — poster frame`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div
                aria-hidden
                className="breathe absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_18%,rgba(217,160,63,0.07),transparent_60%),linear-gradient(170deg,#151519_0%,#0d0d0f_60%,#131317_100%)]"
              />
            )}
            <div aria-hidden className="absolute inset-x-0 bottom-0 flex h-[15%] opacity-[0.14]">
              {BARS.map((c) => (
                <span key={c} className="flex-1" style={{ backgroundColor: c }} />
              ))}
            </div>
            <span
              aria-hidden
              className={`text-outline absolute left-4 bottom-[18%] hidden select-none font-display leading-none opacity-40 transition-opacity duration-500 sm:block ${
                playing ? "opacity-20" : "group-hover/vp:opacity-60"
              } text-6xl md:text-8xl`}
            >
              {label}
            </span>
          </>
        )}

        <span aria-hidden className="scanline" />
        <Corners className="text-line2 transition-colors duration-500 group-hover/vp:text-amber" />

        {/* frame metadata */}
        <div className="pointer-events-none absolute left-4 top-3.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
          <span
            aria-hidden
            className={`h-1.5 w-1.5 rounded-full ${
              playing ? "rec-dot bg-signal" : hasSource ? "bg-faint" : "bg-faint"
            }`}
          />
          {playing ? (hasSource ? "Rolling" : "Standby") : hasSource ? "Ready" : "Idle"}
        </div>
        <div className="pointer-events-none absolute right-4 top-3.5 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-faint sm:block">
          {metaRight ?? (hasSource ? "Src loaded" : "Test card — no source")}
        </div>

        {/* center play affordance */}
        {(!playing || !hasSource) && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <span
              className={`relative grid place-items-center rounded-full border transition-all duration-500 ${
                hasSource
                  ? "h-20 w-20 border-line2 bg-coal/50 group-hover/vp:scale-110 group-hover/vp:border-amber group-hover/vp:bg-amber/10 md:h-24 md:w-24"
                  : "h-16 w-16 border-line2 group-hover/vp:scale-105 group-hover/vp:border-amber md:h-20 md:w-20"
              }`}
            >
              {playing && !hasSource && (
                <span aria-hidden className="ringpulse absolute inset-0 rounded-full border border-amber/60" />
              )}
              {playing && !hasSource ? (
                <IconPause className="h-6 w-6 text-amber" />
              ) : (
                <IconPlay className="h-6 w-6 translate-x-[2px] text-ink transition-colors duration-300 group-hover/vp:text-amber md:h-7 md:w-7" />
              )}
            </span>
          </div>
        )}
      </div>

      {/* ------------ control bar ------------ */}
      <div className="flex items-center gap-3 border-t border-line bg-coal/80 px-3 py-2.5 md:gap-5 md:px-5">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
          className="grid h-9 w-9 shrink-0 place-items-center border border-line text-ink transition-colors duration-300 hover:border-amber hover:text-amber"
        >
          {playing ? <IconPause className="h-3.5 w-3.5" /> : <IconPlay className="h-3.5 w-3.5 translate-x-[1px]" />}
        </button>

        <button
          type="button"
          onClick={() => {
            const v = videoRef.current;
            const next = !muted;
            setMuted(next);
            if (v) v.muted = next;
          }}
          disabled={!hasSource}
          aria-label={muted ? "Unmute" : "Mute"}
          className="grid h-9 w-9 shrink-0 place-items-center border border-line text-muted transition-colors duration-300 enabled:hover:border-amber enabled:hover:text-amber disabled:opacity-40"
        >
          {muted ? <IconMute className="h-3.5 w-3.5" /> : <IconVolume className="h-3.5 w-3.5" />}
        </button>

        <span className="shrink-0 font-mono text-[11px] tracking-[0.1em] text-ink">
          {hasSource ? fmt(progress * duration) : "00:00"}
          <span className="text-faint"> / {hasSource ? fmt(duration) : "--:--"}</span>
        </span>

        {/* progress / seek */}
        <button
          ref={trackRef}
          type="button"
          onClick={seek}
          disabled={!hasSource}
          aria-label="Seek"
          className="group/track relative flex h-7 flex-1 items-center disabled:cursor-default"
        >
          <span className="relative block h-px w-full bg-line2">
            <span
              className="absolute left-0 top-0 h-px bg-amber"
              style={{ width: pct, transition: hasSource ? "width 120ms linear" : "none" }}
            />
            <span
              aria-hidden
              className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-amber transition-transform duration-300 ${
                hasSource ? "group-hover/track:scale-125" : "opacity-40"
              }`}
              style={{ left: `calc(${pct} - 4px)` }}
            />
          </span>
        </button>

        <span className="hidden shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint sm:flex">
          <span aria-hidden className={`h-1.5 w-1.5 border ${hasSource ? "border-amber" : "border-signal"}`} />
          {metaLeft ?? (hasSource ? "Src live" : "Src — empty")}
        </span>

        <button
          type="button"
          onClick={toggleFs}
          aria-label={isFs ? "Exit fullscreen" : "Enter fullscreen"}
          className="grid h-9 w-9 shrink-0 place-items-center border border-line text-muted transition-colors duration-300 hover:border-amber hover:text-amber"
        >
          {isFs ? <IconCollapse className="h-3.5 w-3.5" /> : <IconExpand className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* ------------ empty-state note ------------ */}
      {!hasSource && (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line bg-panel/60 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint md:px-5">
          {playing ? (
            <>
              <span className="text-amber">Standby</span>
              <span>— awaiting media</span>
              <span className="blink text-amber" aria-hidden>▌</span>
            </>
          ) : (
            <>
              <span>Placeholder — add your file in</span>
              <code className="text-muted">src/data/portfolio.ts → {replaceHint}</code>
            </>
          )}
        </div>
      )}
    </div>
  );
}
