import { SectionHeading } from "../components/UI.jsx";
import SystemMap from "../components/SystemMap.jsx";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading index="01" kicker="PROFILE" title="About" />

        <div className="about-grid">
          <p className="about-grid__statement">
            I build <em>AI products as systems</em> — models, APIs, data pipelines, persistence
            and deployment. Research feeds that work and gets held to the same standard of
            evidence; it isn&rsquo;t a separate half of the identity.
          </p>

          <div className="about-grid__bio">
            <p>
              I&rsquo;m a Computer Science (AI &amp; ML) undergraduate who builds full-stack AI
              systems — procurement intelligence, enterprise workspace architecture, agentic
              automation — and backs that engineering with research in model robustness,
              explainability, LLM systems and statistical modelling.
            </p>
            <p>
              VendorLens and NexusOS AI build human approval into the architecture itself, not as
              an afterthought. The same standard carries into the research: a study on shortcut
              learning in fake-news classifiers and SmartRouteLLM&rsquo;s look at LLM routing both
              publish results that came back negative, because that&rsquo;s what the evidence
              showed. Nothing here is presented as more finished than it is.
            </p>
          </div>
        </div>

        <div className="about-interests">
          <div className="about-interests__group">
            <div className="about-interests__label">Engineering Interests</div>
            <div className="about-interests__value">LLM systems · AI infrastructure · Full-stack AI products</div>
          </div>
          <div className="about-interests__group">
            <div className="about-interests__label">Research Interests</div>
            <div className="about-interests__value">Model robustness · Explainability · Statistical modelling</div>
          </div>
          <div className="about-interests__group">
            <div className="about-interests__label">Current Direction</div>
            <div className="about-interests__value">Cross-dataset evaluation, capability-aware routing, and human-in-the-loop AI systems</div>
          </div>
        </div>

        <div className="about-connect">
          <h3 className="about-connect__title">How the interests connect to the work</h3>
          <SystemMap />
        </div>
      </div>
    </section>
  );
}
