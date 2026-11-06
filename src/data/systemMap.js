// A small map of how research interests connect to the flagship work.
// Node labels are the interest areas from the resume/about copy;
// `projectIds` reference ids in projects.js (FLAGSHIP_PROJECTS /
// IN_PROGRESS_PROJECTS) so the UI can pull the real title for each.

export const SYSTEM_MAP_NODES = [
  {
    id: "robustness",
    label: "Model Robustness",
    projectIds: ["shortcut-learning-fake-news"],
  },
  {
    id: "evaluation",
    label: "Model Evaluation & Explainability",
    projectIds: ["shortcut-learning-fake-news", "smartroutellm"],
  },
  {
    id: "llm-systems",
    label: "LLM Systems",
    projectIds: ["smartroutellm", "vendorlens"],
  },
  {
    id: "ai-infrastructure",
    label: "AI Infrastructure",
    projectIds: ["aquashift", "portable-personal-agent", "aion"],
  },
  {
    id: "applied-ai",
    label: "Applied AI Products",
    projectIds: ["aquashift", "vendorlens", "portable-personal-agent", "nexusos-ai", "finpilot-ai"],
  },
];
