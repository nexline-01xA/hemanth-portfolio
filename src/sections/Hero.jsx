import { SITE } from "../data/site.js";
import { IconArrowRight, IconFileText, IconGithub, IconLeetcode, IconLinkedIn, IconOrcid } from "../components/Icons.jsx";
import HeroSchematic from "../components/HeroSchematic.jsx";
import portrait540w from "../assets/portrait-540.webp";
import portrait540j from "../assets/portrait-540.jpg";
import portrait900w from "../assets/portrait-900.webp";
import portrait900j from "../assets/portrait-900.jpg";

export default function Hero() {
  return (
    <section id="top" className="hero container">
      <div className="hero__intro">
        <h1 className="hero__name rise-in rise-in-1">Hemanth Nomula</h1>

        <p className="hero__headline rise-in rise-in-2">Engineering AI systems for <span className="u-nowrap">real-world</span> decisions.</p>

        <p className="hero__descriptor rise-in rise-in-3">
          AI/ML engineering &middot; LLM systems &middot; Backend &amp; infrastructure
        </p>

        <div className="hero__actions rise-in rise-in-4">
          <a className="btn btn--primary" href="#work">
            Selected systems <IconArrowRight />
          </a>
          <a className="btn" href="#research">
            Research
          </a>
        </div>

        <div className="hero__links rise-in rise-in-4">
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="link-arrow">
            <IconGithub size={15} /> GitHub
          </a>
          <span className="hero__links-sep">&middot;</span>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            <IconLinkedIn size={15} /> LinkedIn
          </a>
          <span className="hero__links-sep">&middot;</span>
          <a href={SITE.leetcode} target="_blank" rel="noopener noreferrer">
            <IconLeetcode size={15} /> LeetCode
          </a>
          <span className="hero__links-sep">&middot;</span>
          <a href={SITE.orcid} target="_blank" rel="noopener noreferrer">
            <IconOrcid size={15} /> ORCID
          </a>
          <span className="hero__links-sep">&middot;</span>
          <a href={SITE.resumeUrl} target="_blank" rel="noopener noreferrer">
            <IconFileText size={15} /> R&eacute;sum&eacute;
          </a>
        </div>
      </div>

      <figure className="hero__portrait rise-in rise-in-3">
        <div className="hero__portrait-frame">
          <picture>
            <source
              type="image/webp"
              srcSet={`${portrait540w} 540w, ${portrait900w} 900w`}
              sizes="(min-width: 900px) 380px, 280px"
            />
            <img
              src={portrait900j}
              srcSet={`${portrait540j} 540w, ${portrait900j} 900w`}
              sizes="(min-width: 900px) 380px, 280px"
              alt="Portrait of Hemanth Nomula"
              width={900}
              height={1177}
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>
        <figcaption className="hero__portrait-caption">
          <span>B.Tech &middot; CSE<br />AI &amp; ML</span>
          <span>Hyderabad,<br />India</span>
        </figcaption>
      </figure>

      <div className="hero__schematic-wrap rise-in rise-in-5">
        <HeroSchematic />
      </div>
    </section>
  );
}
