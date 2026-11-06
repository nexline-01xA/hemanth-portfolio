import { CERTIFICATIONS } from "../data/certifications.js";
import { SectionHeading } from "../components/UI.jsx";

export default function CredentialsEducation() {
  return (
    <section id="credentials" className="section">
      <div className="container credentials">
        <div>
          <SectionHeading index="07" kicker="CREDENTIALS" title="Certifications" />
          <div className="cert-rows">
            {CERTIFICATIONS.map((c) => (
              <div className="cert-row" key={c.id}>
                <span className="cert-row__year">{c.year || "\u2014"}</span>
                <div className="cert-row__body">
                  <span className="cert-row__issuer">{c.issuer}</span>
                  <span className="cert-row__title">{c.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading index="08" kicker="EDUCATION" title="Currently studying" />
          <div className="education-card">
            <div className="education-card__degree">B.Tech, Computer Science &amp; Engineering</div>
            <div className="education-card__field">Artificial Intelligence &amp; Machine Learning</div>
            <div className="education-card__meta">2024 &ndash; 2028</div>
          </div>
        </div>
      </div>
    </section>
  );
}
