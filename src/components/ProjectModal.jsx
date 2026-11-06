import { useEffect, useRef } from "react";
import { StatusBadge, TagRow } from "./UI.jsx";
import { IconClose, IconExternal, IconGithub, IconOrcid } from "./Icons.jsx";
import ArchitectureFlow from "./ArchitectureFlow.jsx";
import MetricShift from "./MetricShift.jsx";

// Research projects lead with Paper/ORCID (primary evidence); engineering
// projects lead with GitHub/Demo. Rendered in this fixed order — a project
// simply won't have the fields that don't apply to it.
const LINK_ORDER = [
  { key: "paper", label: "Paper", Icon: IconExternal },
  { key: "orcid", label: "ORCID", Icon: IconOrcid },
  { key: "github", label: "Source", Icon: IconGithub },
  { key: "architecture", label: "Architecture", Icon: IconExternal },
  { key: "verification", label: "Verification", Icon: IconExternal },
  { key: "demo", label: "Demo", Icon: IconExternal },
];

const CASE_SECTIONS = [
  { num: "01", label: "Problem", key: "problem", type: "text" },
  { num: "02", label: "Constraints", key: "constraints", type: "text" },
  { num: "03", label: "Approach", key: "approach", type: "text" },
  { num: "04", label: "Architecture", key: "architectureStages", type: "flow" },
  { num: "05", label: "Key decisions", key: "decisions", type: "list-prose" },
  { num: "06", label: "Implementation", key: "implementation", type: "text" },
  { num: "07", label: "Verification", key: "verification", type: "text" },
  { num: "08", label: "Result", key: "results", type: "list" },
  { num: "09", label: "What I'd improve", key: "improve", type: "text" },
  { num: "10", label: "Status", key: "statusDetail", type: "status" },
  { num: "11", label: "Links", key: "links", type: "links" },
];

function LinksBlock({ links }) {
  const present = LINK_ORDER.filter((l) => links[l.key]);
  if (present.length === 0) {
    return <p className="u-faint case-section__empty-note">No public link yet.</p>;
  }
  return (
    <div className="modal-panel__links">
      {present.map(({ key, label, Icon }) => (
        <a key={key} className="btn btn--sm" href={links[key]} target="_blank" rel="noopener noreferrer">
          <Icon size={15} /> {label}
        </a>
      ))}
    </div>
  );
}

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    lastFocused.current = document.activeElement;
    document.body.classList.add("modal-open");
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
      if (lastFocused.current instanceof HTMLElement) {
        lastFocused.current.focus();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onMouseDown={handleOverlayClick}>
      <div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-panel__head">
          <div>
            <p className="modal-panel__eyebrow">
              {project.category} <StatusBadge status={project.status} />
            </p>
            <h2 className="modal-panel__title" id="modal-title">
              {project.fullTitle || project.title}
            </h2>
          </div>
          <button type="button" className="modal-panel__close" onClick={onClose} ref={closeRef} aria-label="Close case study">
            <IconClose size={16} />
          </button>
        </div>

        <p className="modal-panel__tagline">{project.tagline}</p>

        {project.metric && (
          <div className="modal-section modal-metric-wrap">
            <MetricShift metric={project.metric} />
          </div>
        )}

        {CASE_SECTIONS.map((section) => {
          const value = project[section.key];
          if (!value) return null;

          return (
            <div className="case-section" key={section.num}>
              <span className="case-section__num">{section.num}</span>
              <div>
                <span className="case-section__label">{section.label}</span>

                {section.type === "text" && <p>{value}</p>}

                {section.type === "flow" && <ArchitectureFlow stages={value} />}

                {section.type === "list" && (
                  <ul className="case-results">
                    {value.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                )}

                {section.type === "list-prose" && (
                  <ul className="case-decisions">
                    {value.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                )}

                {section.type === "status" && (
                  <>
                    <p className={project.stack ? "case-section__status-text" : undefined}>{value}</p>
                    {project.stack && <TagRow items={project.stack} />}
                  </>
                )}

                {section.type === "links" && <LinksBlock links={value} />}
              </div>
            </div>
          );
        })}

        {/* Status section needs statusDetail OR a fallback so status/stack still show even
            without a long-form statusDetail string. */}
        {!project.statusDetail && (project.stack || project.status) && (
          <div className="case-section">
            <span className="case-section__num">10</span>
            <div>
              <span className="case-section__label">Status</span>
              <p className={project.stack ? "case-section__status-text" : undefined}>{project.status}</p>
              {project.stack && <TagRow items={project.stack} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
