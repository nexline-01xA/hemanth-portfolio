import { SITE } from "../data/site.js";
import SceneCanvas from "../components/SceneCanvas.jsx";
import { FLAGSHIP_PROJECTS } from "../data/projects.js";

export default function Hero() {
  return <section className="home-page container" id="top">
    <div className="home-caption"><span>PERSONAL PORTFOLIO</span><span>HYDERABAD, INDIA / 2026</span></div>
    <h1 className="name-title">Hemanth<span>Nomula<span className="name-period">.</span></span></h1>
    <div className="home-composition">
      <div className="home-intro">
        <p className="home-role">Computer Science undergraduate.<br />Focused on AI/ML and software systems.</p>
        <p>I work on AI applications, backend services, and model evaluation. Here are my projects, papers, and the details behind them.</p>
        <div className="home-actions"><a className="btn btn--primary" href="/work/">View projects ↗</a><a className="text-link" href={SITE.resumeUrl} target="_blank" rel="noopener noreferrer">Download résumé ↓</a></div>
        <div className="home-profiles"><a href={SITE.github}>GitHub ↗</a><a href={SITE.linkedin}>LinkedIn ↗</a><a href={SITE.leetcode}>LeetCode ↗</a></div>
      </div>
      <figure className="systems-figure"><div className="systems-figure__head"><span>01 / PROCESSING ARCHITECTURE</span><span>LIVE 3D</span></div><SceneCanvas variant="system" /><figcaption><span>Input → processing → storage</span><span>Conceptual study</span></figcaption></figure>
    </div>
    <div className="home-index"><p>SELECTED PROJECTS</p><div>{FLAGSHIP_PROJECTS.map((project,i)=><a key={project.id} href={`/work/${project.id}/`}><span>0{i+1}</span><strong>{project.title}</strong><span>↗</span></a>)}</div><a className="home-index__all" href="/research/">Research papers ↗</a></div>
  </section>;
}
