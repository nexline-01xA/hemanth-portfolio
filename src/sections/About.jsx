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
          <div className="portrait-card__caption"><span>Hemanth Nomula<small>COMPUTER SCIENCE · 2024–2028</small></span><span className="portrait-card__mark">HN.</span></div>
          <span className="portrait-card__corner" aria-hidden="true">+</span>
        </div>
        <div className="about-copy">
          <SectionHeading  kicker="BACKGROUND" title="About me" />
          <p className="about-lead">I’m Hemanth, a Computer Science undergraduate specialising in AI &amp; ML.</p>
          <p>I’m a Computer Science (AI &amp; ML) undergraduate in Hyderabad. I build across the stack: models, APIs, data pipelines, and the infrastructure that turns an idea into a working system.</p>
          <p>My recent projects cover connected workspaces, document processing, financial controls, and multi-agent workflows. My papers examine model routing and cross-dataset evaluation.</p>
          <div className="about-focus"><span>LLM systems</span><span>AI infrastructure</span><span>Applied research</span></div>
          <a className="text-link" href={SITE.resumeUrl} target="_blank" rel="noopener noreferrer">Download résumé <IconArrowRight /></a>
        </div>
      </div>
    </section>
  );
}
