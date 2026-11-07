import { SectionHeading } from "../components/UI.jsx";
import { SITE } from "../data/site.js";
import { IconArrowRight } from "../components/Icons.jsx";
import portrait from "../assets/portrait-540.webp";

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-layout">
        <div className="portrait-card">
          <div className="portrait-card__image"><img src={portrait} alt="Hemanth Nomula" width="540" height="706" loading="lazy" /></div>
          <div className="portrait-card__caption"><span>Hemanth Nomula<small>ENGINEER · RESEARCHER · BUILDER</small></span><span className="portrait-card__mark">HN.</span></div>
          <span className="portrait-card__corner" aria-hidden="true">+</span>
        </div>
        <div className="about-copy">
          <SectionHeading index="02" kicker="THE PERSON BEHIND THE SYSTEMS" title="Curiosity is the starting point." />
          <p className="about-lead">Making it work is where<br /><em>the interesting part begins.</em></p>
          <p>I’m a Computer Science (AI &amp; ML) undergraduate in Hyderabad. I build across the stack: models, APIs, data pipelines, and the infrastructure that turns an idea into a working system.</p>
          <p>My research asks where models break. My engineering asks how to build around those limits. Both come back to the same thing: evidence over assumptions.</p>
          <div className="about-focus"><span>LLM systems</span><span>AI infrastructure</span><span>Applied research</span></div>
          <a className="text-link" href={SITE.resumeUrl} target="_blank" rel="noopener noreferrer">A little more about me <IconArrowRight /></a>
        </div>
      </div>
    </section>
  );
}
