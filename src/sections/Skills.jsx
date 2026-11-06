import { SKILL_GROUPS } from "../data/skills.js";
import { SectionHeading } from "../components/UI.jsx";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading index="06" kicker="TOOLKIT" title="Technical capabilities" />
        <div className="matrix">
          {SKILL_GROUPS.map((group) => (
            <div className="matrix-group" key={group.title}>
              <div className="matrix-group__title">{group.title}</div>
              <ul className="matrix-group__list">
                {group.tools.map((item) => (
                  <li key={item} className={item === group.primary ? "matrix-group__item--primary" : undefined}>
                    {item}
                  </li>
                ))}
              </ul>
              {group.capabilities && (
                <p className="matrix-group__capabilities">{group.capabilities.join(" \u00b7 ")}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
