// Dedicated research-section view: same two papers as in projects.js,
// reshaped around the fields a researcher/faculty reader scans for.
//
// Venue: shown as generic "Submitted, IEEE" per direct instruction from
// the author — not naming a specific conference (e.g. AMICT), even where
// a GitHub README previously suggested one, since that specific naming
// wasn't confirmed as final. See PORTFOLIO_AUDIT.md.

export const RESEARCH_PAPERS = [
  {
    id: "shortcut-learning-fake-news",
    title: "Investigating Shortcut Learning in Transformer-Based Fake News Detection: An Explainability and Ablation Study",
    status: "Under Review",
    venue: "Submitted, IEEE",
    researchQuestion:
      "Does a high-accuracy fake-news classifier rely on genuine misinformation signal, or on source/formatting artifacts specific to its training distribution?",
    methods: [
      "DistilBERT + TF-IDF/Logistic Regression, both evaluated in-domain on Kaggle/ISOT",
      "Zero-shot cross-dataset evaluation on LIAR (TF-IDF + Logistic Regression pipeline only)",
      "LIME explainability on DistilBERT's in-domain predictions + corpus token-frequency analysis",
      "Reuters-token ablation on both models, 3-seed stability check on the TF-IDF result",
      "Text-length confound control (TF-IDF pipeline)",
    ],
    keyResult:
      "TF-IDF + Logistic Regression collapsed from 98.91% in-domain to 48.48% zero-shot on a second dataset (a 50.43-point, below-chance drop). DistilBERT was evaluated in-domain only (99.97%); LIME on its predictions, plus corpus analysis, traced part of that accuracy to a leaked source-attribution token (\u201cReuters,\u201d 83% of REAL vs 1.2% of FAKE). An independent replication of Hoy & Koulouri (IEEE Big Data 2022), whose ~30-point cross-dataset drop on a different dataset pairing this result is directionally consistent with, and larger than.",
    limitation:
      "The cross-dataset and length-control tests used the TF-IDF + Logistic Regression pipeline only \u2014 DistilBERT's cross-dataset behaviour was not measured, and its ablation is a single run. LIME was computed on a sample of 20 predictions.",
    technologies: ["PyTorch", "Hugging Face Transformers", "Scikit-learn", "LIME"],
    links: {
      paper: "https://github.com/nexline-01xA/shortcut-learning-fake-news/blob/main/paper/manuscript.pdf",
      orcid: "https://orcid.org/0009-0002-2571-2752",
      github: "https://github.com/nexline-01xA/shortcut-learning-fake-news",
    },
    badges: ["Under Review", "XAI", "Cross-Dataset Eval"],
  },
  {
    id: "smartroutellm",
    title: "Information Loss in Preference-Derived Supervision for Capability-Aware LLM Routing: An Empirical Study on Chatbot Arena Data",
    status: "Under Review",
    venue: "Submitted, IEEE",
    researchQuestion:
      "Can a lightweight, prompt-only classifier predict the cheapest LLM capability tier likely to give an acceptable answer — and does prompt content add predictive signal beyond simply knowing which two models are being compared?",
    methods: [
      "25-feature lexical/structural prompt encoding",
      "Ordinal two-threshold XGBoost tier classifier",
      "~33,000 Chatbot Arena battles across 20 models",
      "Pairwise identity-only vs. prompt-conditioned diagnostic (paired-bootstrap significance test)",
      "Explicitly labeled deployment & pricing-scenario simulation",
    ],
    keyResult:
      "Prompt-conditioned accuracy (74.89%) did not beat an identity-only baseline (75.58%), p = 0.014 — a reported negative result showing preference-derived supervision may not carry prompt-level routing signal beyond model identity.",
    limitation:
      "Deployment and pricing-scenario figures are labelled simulations over the router's real predicted tier mix, not measurements of a live endpoint. The supervision is human preference data, which this result suggests carries little prompt-level routing signal.",
    technologies: ["XGBoost", "Sentence-Transformers", "Scikit-learn", "Pandas"],
    links: {
      paper: "https://github.com/nexline-01xA/SmartRouteLLM/blob/main/paper/SmartRouteLLM_IEEE.pdf",
      orcid: "https://orcid.org/0009-0002-2571-2752",
      github: "https://github.com/nexline-01xA/SmartRouteLLM",
    },
    badges: ["Under Review", "LLM Systems", "Honest Negative Result"],
  },
];
