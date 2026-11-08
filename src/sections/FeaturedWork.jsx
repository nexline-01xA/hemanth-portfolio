
import { FLAGSHIP_PROJECTS, IN_PROGRESS_PROJECTS } from "../data/projects.js";
import { SectionHeading } from "../components/UI.jsx";
import ProjectCard from "../components/ProjectCard.jsx";


export default function FeaturedWork() {


  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHeading

          kicker="SELECTED WORK"
          title="Selected projects"
          dek="Architecture, implementation, and verification for four software projects."
        />

        <div className="work-grid">
          {FLAGSHIP_PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 1} />
          ))}
        </div>

        <div className="currently-building">
          <h3 className="currently-building__title">Currently building</h3>
          <p className="currently-building__dek">
            Research proposals and early-stage projects.
          </p>
          <div className="progress-grid">
            {IN_PROGRESS_PROJECTS.map((p) => (
              <div className="progress-card" key={p.id}>
                <div className="progress-card__head">
                  <h4 className="progress-card__title">{p.title}</h4>
                  <span className="badge badge--progress">{p.status}</span>
                </div>
                <span className="progress-card__context">{p.context}</span>
                <p className="progress-card__desc">{p.description}</p>
                {p.github && <a className="text-link" href={p.github} target="_blank" rel="noopener noreferrer">Repository ↗</a>}
              </div>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
