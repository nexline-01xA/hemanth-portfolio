import { StatusBadge } from "./UI.jsx";
import { IconArrowRight } from "./Icons.jsx";
import SceneCanvas from "./SceneCanvas.jsx";

const VISUALS = { "nexusos-ai": "nexus", vendorlens: "vendor", "finpilot-ai": "finance", aquashift: "aqua" };
const DOMAINS = ["CONNECTED INTELLIGENCE", "DECISION INTELLIGENCE", "GOVERNED AUTONOMY", "ALWAYS-ON INTELLIGENCE"];

export default function ProjectCard({ project, index, onOpen }) {
  const variant = VISUALS[project.id] || "aqua";
  return (
    <button type="button" className="project-card" data-visual={variant} onClick={() => onOpen(project)} aria-label={`Explore ${project.title} case study`}>
      <div className="project-art">
        <span className="project-art__number">{String(index).padStart(2, "0")}</span>
        <span className="project-art__domain">{DOMAINS[index - 1]}</span>
        <SceneCanvas variant={variant} />
        <span className="project-art__annotation">{project.title === "FinPilot AI" ? "123 / 123 TESTS PASSING" : project.title === "NexusOS AI" ? "ONE CONNECTED WORKSPACE" : project.title === "VendorLens" ? "HUMAN REVIEW, BY DESIGN" : "SEVEN AGENTS. ONE SAFETY GOVERNOR."}</span>
        <span className="project-art__open" aria-hidden="true">↗</span>
      </div>
      <div className="project-card__body">
        <div className="project-card__top"><span className="project-card__category">{project.category}</span><StatusBadge status={project.status} /></div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__tagline">{project.tagline}</p>
        <div className="project-card__footer"><span className="project-card__stack">{project.stack?.slice(0, 3).join(" / ")}</span><span className="project-card__cta">Case study <IconArrowRight /></span></div>
      </div>
    </button>
  );
}
