import { StatusBadge } from "./UI.jsx";
import { IconArrowRight } from "./Icons.jsx";
import MetricShift from "./MetricShift.jsx";
import ArchitectureFlow from "./ArchitectureFlow.jsx";

export default function ProjectCard({ project, index, onOpen }) {
  const showFlow = project.kind === "engineering" && project.architectureStages;
  const showMetric = Boolean(project.metric);

  return (
    <button type="button" className="project-card" data-size={project.size || "medium"} onClick={() => onOpen(project)}>
      <div className="project-card__top">
        <span className="project-card__category">
          {index != null && <span className="project-card__index">{String(index).padStart(2, "0")} — </span>}
          {project.category}
        </span>
        <StatusBadge status={project.status} />
      </div>
      <div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__tagline">{project.tagline}</p>
      </div>

      {showMetric && (
        <div className="project-card__preview">
          <MetricShift metric={project.metric} compact />
        </div>
      )}
      {showFlow && (
        <div className="project-card__preview">
          <ArchitectureFlow stages={project.architectureStages.slice(0, 4)} compact />
        </div>
      )}

      <div className="project-card__footer">
        <span className="project-card__cta">
          Case study <IconArrowRight />
        </span>
      </div>
    </button>
  );
}
