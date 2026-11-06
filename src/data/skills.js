// Skills, restructured (Aug 2026 correction pass) into tools vs.
// capabilities per group, rather than one flat tag cloud. TensorFlow and
// "Probability" as a bare pill were dropped — no specific project evidence
// beyond the resume's generic tools list (PyTorch/Transformers/Scikit-learn
// are the ones actually evidenced by the flagship work). Programming and
// Frontend were merged into one group with Python called out as primary.
//
// "Linux" was suggested during review but deliberately not added: VendorLens's
// own README documents a Windows 11 native dev setup (Docker providing the
// only Linux surface), so it isn't clearly evidenced as a personal skill —
// see PORTFOLIO_AUDIT.md.

export const SKILL_GROUPS = [
  {
    title: "Machine Learning & Research",
    tools: ["PyTorch", "Scikit-learn", "XGBoost", "Transformers (Hugging Face)", "LIME", "Pandas", "NumPy"],
    capabilities: ["Model Evaluation", "Explainable AI", "Statistical Modelling", "Cross-Dataset Evaluation", "Ablation Studies"],
  },
  {
    title: "LLM & AI Systems",
    tools: ["LLMs", "FastAPI", "REST APIs", "OAuth 2.0", "Gemini"],
    capabilities: ["Agentic / Automation Workflows", "Document Processing & OCR Pipelines"],
  },
  {
    title: "Data & Backend",
    tools: ["PostgreSQL", "SQLAlchemy", "MongoDB", "SQL"],
  },
  {
    title: "Systems & Infrastructure",
    tools: ["Docker", "Git / GitHub", "GitHub Actions", "Linux", "CUDA", "Google Colab"],
  },
  {
    title: "Programming & Frontend",
    tools: ["Python", "C++", "Java", "JavaScript", "TypeScript", "React", "Next.js"],
    primary: "Python",
  },
];
