// The hero's dominant visual: AQUA//SHIFT's real agent pipeline, annotated
// with facts actually documented in that project (see projects.js /
// PORTFOLIO_AUDIT.md for sourcing) — not a generic decorative diagram.
// Replaces a stat strip / stock illustration as the first thing a visitor
// sees after the name.

const STAGES = [
  { id: "signals", label: "Signals", sub: "telemetry \u00b7 notes \u00b7 lab data" },
  { id: "sentinel", label: "Sentinel \u2192 Coordinator", sub: "7 specialised agents" },
  { id: "governor", label: "Safety Governor", sub: "deterministic \u00b7 non-LLM", flag: "Tier C: no executor path" },
  { id: "handover", label: "Handover", sub: "structured shift report" },
];

export default function HeroSchematic() {
  return (
    <div className="schematic" role="img" aria-label="AQUA//SHIFT pipeline: signals into seven agents, through a deterministic non-LLM safety governor, to a structured handover report.">
      <div className="schematic__head">
        <span className="schematic__label">AQUA//SHIFT &mdash; live system architecture</span>
        <span className="schematic__meta">FastAPI &middot; google-adk &middot; Gemini</span>
      </div>
      <div className="schematic__row">
        {STAGES.map((stage, i) => (
          <div className="schematic__cell" key={stage.id}>
            <div className="schematic__node">
              <span className="schematic__node-label">{stage.label}</span>
              <span className="schematic__node-sub">{stage.sub}</span>
              {stage.flag && <span className="schematic__flag">{stage.flag}</span>}
            </div>
            {i < STAGES.length - 1 && <div className="schematic__wire" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  );
}
