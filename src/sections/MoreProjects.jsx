import { MORE_PROJECTS } from "../data/projects.js";
import { SectionHeading } from "../components/UI.jsx";
import { IconArrowRight } from "../components/Icons.jsx";

export default function MoreProjects() {
  if (MORE_PROJECTS.length === 0) return null;

  return (
    <section id="more-projects" className="section section--tight">
      <div className="container">
        <SectionHeading index="04" kicker="SECONDARY WORK" title="More work" />
        <div className="more-grid">
          {MORE_PROJECTS.map((p) => (
            <div className="more-card" key={p.id}>
              <h3 className="more-card__title">{p.title}</h3>
              <p className="more-card__desc">{p.description}</p>
              <div className="tag-row">
                {p.tech.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              {p.github && (
                <a className="more-card__link link-arrow" href={p.github} target="_blank" rel="noopener noreferrer">
                  Repository <span className="link-arrow__glyph"><IconArrowRight size={12} /></span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
