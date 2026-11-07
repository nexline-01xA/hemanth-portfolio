import { useState } from "react";
import { FLAGSHIP_PROJECTS, IN_PROGRESS_PROJECTS } from "../data/projects.js";
import { SectionHeading } from "../components/UI.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectModal from "../components/ProjectModal.jsx";

export default function FeaturedWork() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHeading
          index="01"
          kicker="SELECTED WORK"
          title="Built to do something real."
          dek="Four systems. Different problems. One approach: make the intelligence useful, and the engineering hold up."
        />

        <div className="work-grid">
          {FLAGSHIP_PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 1} onOpen={setSelected} />
          ))}
        </div>

        <div className="currently-building">
          <h3 className="currently-building__title">Currently building</h3>
          <p className="currently-building__dek">
            Early-stage work, shown with the status it actually has right now.
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
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
