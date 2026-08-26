import { profile } from "../data/portfolio";
import { Reveal, SectionHead } from "./ui";
import VideoPlayer from "./VideoPlayer";

export default function Showreel() {
  return (
    <section id="showreel" aria-label="Showreel" className="relative border-b border-line py-24 md:py-32">
      <div className="wrap">
        <SectionHead
          no="01"
          kicker="Showreel"
          title={["SHOWREEL"]}
          note="A selection of my editing, motion, color, and AI-assisted visual work."
        />

        {/*
          MEDIA — one replacement point.
          Set profile.showreelUrl (+ optional showreelPoster) in
          src/data/portfolio.ts  →  REPLACE_WITH_SHOWREEL
          The player below handles poster, play/pause, mute, seek and fullscreen.
        */}
        <Reveal delay={150}>
          <VideoPlayer
            src={profile.showreelUrl}
            poster={profile.showreelPoster}
            aspect="aspect-[16/9] md:aspect-[21/9]"
            label="REEL"
            replaceHint="showreelUrl"
            metaLeft="Showreel"
            metaRight={profile.showreelUrl ? "Master — 24fps" : "Test card — no source"}
          />
        </Reveal>
      </div>
    </section>
  );
}
