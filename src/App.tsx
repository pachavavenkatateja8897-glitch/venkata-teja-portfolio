import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Showreel from "./components/Showreel";
import Work from "./components/Work";
import AICreative from "./components/AICreative";
import { About } from "./components/About";
import { Education, Experience, Recognition } from "./components/Experience";
import { Capabilities, Process } from "./components/Studio";
import { Contact, Footer } from "./components/Contact";
import { Cursor, Noise, Vignette } from "./components/chrome";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-coal font-body text-ink">
      {/* accessibility */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-amber focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.2em] focus:text-coal"
      >
        Skip to content
      </a>

      {/* cinematic chrome */}
      <Noise />
      <Vignette />
      <Cursor />

      <Nav />

      <main id="main">
        <Hero />
        <Showreel />
        <Work />
        <AICreative />
        <About />
        <Experience />
        <Recognition />
        <Education />
        <Capabilities />
        <Process />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
