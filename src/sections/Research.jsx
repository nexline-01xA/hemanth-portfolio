import { RESEARCH_PAPERS } from "../data/research.js";
import { FLAGSHIP_PROJECTS } from "../data/projects.js";
import { SectionHeading, StatusBadge } from "../components/UI.jsx";
import MetricShift from "../components/MetricShift.jsx";
import { IconExternal, IconGithub, IconOrcid } from "../components/Icons.jsx";

const LINK_ORDER = [
  { key: "paper", label: "Preprint", Icon: IconExternal },
  { key: "orcid", label: "ORCID", Icon: IconOrcid },
  { key: "github", label: "Repository", Icon: IconGithub },
];

export default function Research() {
  return (
    <section id="research" className="section">
      <div className="container">
        <SectionHeading
          index="03"
          kicker="APPLIED RESEARCH"
          title="Where the models break"
          dek="Both papers below are currently under review. Status is shown as it stands today, not as I'd like it to read."
        />
        <div className="research-list">
          {RESEARCH_PAPERS.map((paper) => {
            const metric = FLAGSHIP_PROJECTS.find((p) => p.id === paper.id)?.metric;
            const links = LINK_ORDER.filter((l) => paper.links?.[l.key]);
            return (
              <article className="research-card" key={paper.id}>
                <div>
                  <div className="research-card__badges">
                    <StatusBadge status={paper.status} />
                    {paper.badges
                      ?.filter((b) => b !== paper.status)
                      .map((b) => (
                        <span className="badge badge--neutral" key={b}>
                          {b}
                        </span>
                      ))}
                  </div>
                  <h3 className="research-card__title">{paper.title}</h3>
                  <span className="research-card__label">Research question</span>
                  <p className="research-card__question">{paper.researchQuestion}</p>

                  <span className="research-card__label">Methods</span>
                  <ul className="research-card__methods">
                    {paper.methods.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>

                  <div className="tag-row">
                    {paper.technologies.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  {metric && (
                    <div className="research-card__metric-wrap">
                      <span className="research-card__label">Key result</span>
                      <MetricShift metric={metric} />
                    </div>
                  )}
                  <p className="research-card__result">{paper.keyResult}</p>
                  {paper.limitation && (
                    <>
                      <span className="research-card__label research-card__label--spaced">Limitation</span>
                      <p className="research-card__limit">{paper.limitation}</p>
                    </>
                  )}
                  <p className="research-card__venue">{paper.venue}</p>
                  <div className="research-card__links">
                    {links.map(({ key, label, Icon }) => (
                      <a key={key} className="btn btn--sm" href={paper.links[key]} target="_blank" rel="noopener noreferrer">
                        <Icon size={15} /> {label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
