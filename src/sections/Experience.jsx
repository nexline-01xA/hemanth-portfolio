import { EXPERIENCE } from "../data/experience.js";
import { SectionHeading } from "../components/UI.jsx";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading index="05" kicker="EXPERIENCE" title="Applied work" />
        <div className="timeline">
          {EXPERIENCE.map((exp) => (
            <div className="timeline-row" key={exp.id}>
              <div>
                <div className="timeline-row__period">{exp.period}</div>
                <span className="timeline-row__kind">{exp.kind}</span>
              </div>
              <div>
                <h3 className="timeline-row__title">{exp.title}</h3>
                <p className="timeline-row__org">
                  {exp.org}
                  {exp.location ? ` · ${exp.location}` : ""}
                </p>
                <ul className="timeline-row__bullets">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
