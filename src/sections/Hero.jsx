import { SITE } from "../data/site.js";
import { IconArrowRight, IconFileText, IconGithub, IconLeetcode, IconLinkedIn, IconOrcid } from "../components/Icons.jsx";
import SceneCanvas from "../components/SceneCanvas.jsx";

export default function Hero() {
  return (
    <section id="top" className="cinema-hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container cinema-hero__layout">
        <div className="cinema-hero__copy">
          <p className="hero-eyebrow rise-in rise-in-1"><span className="status-dot" /> AI ENGINEERING · SYSTEMS · RESEARCH</p>
          <h1 className="cinema-hero__title rise-in rise-in-2">Intelligence,<br /><span>engineered.</span></h1>
          <p className="cinema-hero__intro rise-in rise-in-3">I’m Hemanth. I build AI systems<br className="desktop-break" /> for <strong><span className="u-nowrap">real-world</span> decisions.</strong></p>
          <p className="cinema-hero__description rise-in rise-in-3">From language models to the infrastructure behind them.<br className="desktop-break" /> Thoughtful engineering. Research that questions the result.</p>
          <div className="hero__actions rise-in rise-in-4">
            <a className="btn btn--primary" href="#work">Explore my work <IconArrowRight /></a>
            <a className="btn btn--outline" href={SITE.resumeUrl} target="_blank" rel="noopener noreferrer"><IconFileText /> Résumé</a>
          </div>
          <div className="hero__links rise-in rise-in-4">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer"><IconGithub size={15} /> GitHub</a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer"><IconLinkedIn size={15} /> LinkedIn</a>
            <a href={SITE.leetcode} target="_blank" rel="noopener noreferrer"><IconLeetcode size={15} /> LeetCode</a>
            <a href={SITE.orcid} target="_blank" rel="noopener noreferrer"><IconOrcid size={15} /> ORCID</a>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-art__halo" aria-hidden="true" />
          <SceneCanvas variant="core" />
          <div className="orbital-label orbital-label--top"><i /> INTELLIGENCE CORE<span>01 / SYSTEMS IN MOTION</span></div>
          <div className="orbital-label orbital-label--bottom"><span className="orbital-cross">+</span> IDEAS → SYSTEMS → IMPACT</div>
          <div className="hero-art__coordinate" aria-hidden="true">17.3850° N<br />78.4867° E</div>
        </div>
        <div className="hero-bottom">
          <a href="#work" className="scroll-cue"><span>↓</span> SCROLL TO EXPLORE</a>
          <p>BASED IN HYDERABAD, INDIA <span>·</span> B.TECH CSE / 2024–2028</p>
        </div>
      </div>
    </section>
  );
}
