// Flagship engineering work, in-progress work, and secondary projects.
//
// Restructured (Sept 2026, content/evidence/link pass): Featured Work now
// holds only the 4 engineering flagships, in order — NexusOS, VendorLens,
// FinPilot AI, AQUA//SHIFT. Research lives in its own dedicated section.
// Portable Personal Agent and the JPMC/Forage credential moved to
// secondary work. See PORTFOLIO_AUDIT.md for exactly what's independently
// verified vs. taken on the author's direct word — several links here
// could not be independently confirmed from this environment (GitHub's
// full repo listing isn't browsable here), and are included on the
// strength of repeated, specific, first-person statements.

export const FLAGSHIP_PROJECTS = [
  {
    id: "nexusos-ai",
    kind: "engineering",
    title: "NexusOS AI",
    fullTitle: "NexusOS AI \u2014 Intelligent Enterprise Workspace",
    tagline: "One AI-native workspace for email, calendar, files, tasks and meetings, instead of six disconnected tools.",
    size: "medium",
    category: "AI Systems Engineering",
    status: "In Development",
    problem: "Knowledge work is scattered across email, calendar, task trackers, documents and meeting notes \u2014 each its own silo of context.",
    approach: "Architected a unified AI workspace spanning 15 application modules (conversations, calendar, projects, knowledge, automations) on ~20 core entities \u2014 one shared data model and permission boundary across modules \u2014 on a Next.js frontend and a layered FastAPI service/repository backend with PostgreSQL/Alembic, with cookie-based authentication (CSRF-protected) and a Google OAuth connector for cross-service account linking.",
    architectureStages: [
      { label: "Connected accounts", sub: "email, calendar, files" },
      { label: "20 core data entities" },
      { label: "15 application modules", sub: "inbox, tasks, meetings, automations\u2026" },
      { label: "Unified AI conversation layer" },
    ],
    results: [
      "Architecture spans ~20 core data entities across 15 application modules under one shared data model and permission boundary",
      "Modules include AI conversations, inbox, calendar, projects, knowledge, meetings, automations and connected-account workflows",
      "Cookie-based authentication with CSRF protection and a Google OAuth connector for cross-service account linking",
    ],
    implementation: "Designing a single data model expressive enough to represent email threads, calendar events, tasks and files consistently \u2014 enough for one AI layer to reason across all of them without each module becoming its own isolated silo again.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Alembic"],
    links: { github: "https://github.com/nexline-01xA/nexusos-ai" },
  },
  {
    id: "vendorlens",
    kind: "engineering",
    title: "VendorLens",
    fullTitle: "VendorLens \u2014 AI Procurement & Vendor Intelligence Platform",
    tagline: "From messy vendor quotes to defensible purchasing decisions \u2014 with a human always in the loop.",
    size: "medium",
    category: "AI Systems Engineering",
    status: "Prototype",
    statusDetail: "Submitted to the Build with Gemini XPRIZE (August 2026).",
    problem: "Procurement teams compare vendor quotations that arrive as PDFs, scanned images and spreadsheets in inconsistent formats, which makes it hard to compare offers on equal terms or justify a purchasing decision after the fact.",
    constraints: "The system must never place an order or auto-approve a purchase on its own. Financial calculations can't tolerate floating-point rounding drift.",
    approach: "A document-ingestion pipeline (PDF/OCR + XLSX/CSV) reconciles inconsistently formatted vendor quotations into structured pricing, GST, delivery, warranty and payment fields inside a confidence-scored extraction layer, feeding deterministic vendor/product matching, landed-cost calculation and weighted scoring, with an approvals workflow and audit trail.",
    architectureStages: [
      { label: "Quotation", sub: "PDF \u00b7 XLSX \u00b7 CSV \u00b7 image" },
      { label: "Ingestion & extraction", sub: "OCR + Gemini" },
      { label: "Matching & landed cost", sub: "deterministic, Decimal" },
      { label: "Vendor scoring" },
      { label: "Human review", sub: "decision snapshot" },
    ],
    decisions: [
      "Landed-cost math runs on Python's Decimal type rather than floats, specifically to avoid rounding drift",
      "Vendor scoring and negotiation intelligence are deterministic rather than LLM-driven \u2014 no LLM call touches the original quotation",
      "Organisation membership, role enforcement and tenant isolation are built in from the start, not retrofitted",
      "Every human correction is tracked as an auditable snapshot \u2014 an override is a first-class event, not a bypass",
    ],
    implementation: "Keeping the system a decision-support tool rather than a decision-maker shaped the architecture directly: scoring and negotiation layers are deliberately deterministic, and every extracted field carries confidence and evidence back to its source document.",
    verification: "Core extraction, scoring and review workflow implemented and backend-tested (pytest, ruff, mypy).",
    results: [
      "Full quotation-to-decision pipeline implemented and backend-tested (pytest, ruff, mypy)",
      "Multi-tenant by design \u2014 organisation membership, role enforcement and tenant isolation",
      "Landed-cost math runs on Decimal, not floats, to avoid rounding drift",
      "A Negotiation Intelligence module runs leverage analysis deterministically \u2014 no LLM call touches the original quotation",
    ],
    improve: "Every correction a reviewer makes is tracked, so a human override is a first-class, auditable event rather than a bypass.",
    stack: ["Next.js (App Router)", "FastAPI", "PostgreSQL 16", "SQLAlchemy", "Alembic", "Gemini API", "Gmail & Google Drive APIs (OAuth 2.0)", "Tesseract OCR", "Docker"],
    links: {
      github: "https://github.com/nexline-01xA/vendorlens",
      architecture: "https://github.com/nexline-01xA/vendorlens/blob/main/ARCHITECTURE.md",
    },
  },
  {
    id: "finpilot-ai",
    kind: "engineering",
    title: "FinPilot AI",
    fullTitle: "FinPilot AI \u2014 Agentic Finance-Control System",
    tagline: "Money and approval state are computed deterministically \u2014 the LLM only reasons over verified tool outputs, and never touches ground truth.",
    size: "feature",
    metric: {
      type: "stats",
      items: [
        { value: "123/123", label: "Tests passing (CI)" },
        { value: "84", label: "Deterministic core" },
        { value: "21", label: "Service" },
        { value: "18", label: "FastAPI integration" },
      ],
    },
    category: "AI Systems Engineering \u00b7 Agentic",
    status: "In Development",
    statusDetail: "Current verified persistence is SQLite; PostgreSQL is a documented migration target, not yet the runtime.",
    problem: "Reconciliation, cash-flow monitoring and anomaly detection in financial operations are typically manual and reactive.",
    constraints: "Agent tools are allowlisted, not open-ended. Nothing executes without human approval, and every execution is verified against persisted state before the audit entry is written.",
    approach: "Architected a deterministic finance-control core \u2014 reconciliation, anomaly detection, cash-flow forecasting \u2014 where money and approval state are computed deterministically. The LLM only reasons over verified tool outputs and proposes governed actions; it never touches ground truth. A full human-in-the-loop approval flow sits between proposal and execution: agent proposes, approver authorizes, execution is verified against persisted state and audited.",
    architectureStages: [
      { label: "Observe & reconcile" },
      { label: "Analyse & forecast" },
      { label: "Detect anomalies" },
      { label: "Recommend" },
      { label: "Approve", sub: "human gate" },
      { label: "Execute", sub: "allowlisted tools only" },
      { label: "Verify & audit" },
    ],
    decisions: [
      "Money and approval state are computed deterministically; the LLM only proposes governed actions over verified tool outputs \u2014 it never touches ground truth",
      "Agent tools are allowlisted rather than open-ended",
      "Execution is verified against persisted state before the audit entry is written",
      "SQLite is the current verified persistence layer; PostgreSQL is a documented migration target",
    ],
    verification: "123/123 tests passing via CI: 84 deterministic core tests, 21 service tests, 18 FastAPI integration tests. Also verified: live Docker smoke tests on a seeded demo dataset, a production Next.js build, and a dependency security audit.",
    results: [
      "123/123 tests passing via CI (84 core + 21 service + 18 integration)",
      "Reconciliation, cash-flow intelligence, anomaly detection and forecasting implemented and verified",
      "Live Docker smoke tests passing on a seeded demo dataset; production Next.js build and dependency security audit verified",
      "Full human-in-the-loop approval flow: agent proposes, approver authorizes, execution verified against persisted state and audited",
    ],
    improve: "The allowlist-plus-approval-gate pattern is the load-bearing decision \u2014 an agent that can only call pre-verified actions, and can't execute any without human approval, is fundamentally different from an agent with open tool access and a policy asking it to be careful.",
    stack: ["FastAPI", "Next.js", "SQLite", "Docker", "Allowlisted agent tools"],
    links: {
      github: "https://github.com/nexline-01xA/FinPilot-AI",
      verification: "https://github.com/nexline-01xA/FinPilot-AI/blob/main/docs/VERIFICATION_MATRIX.md",
    },
  },
  {
    id: "aquashift",
    kind: "engineering",
    title: "AQUA//SHIFT",
    fullTitle: "AQUA//SHIFT \u2014 Autonomous Continuity Layer for Water Utilities",
    tagline: "The AI that stays awake between shifts \u2014 correlating weak signals into incidents before the next shift starts cold.",
    size: "wide",
    category: "AI Systems Engineering \u00b7 Agentic",
    status: "Competition Submission",
    statusDetail: "Built for Google's All Things Agentic Hackathon 2026 \u2014 submission deadline August 31, 2026 (independently confirmed live).",
    problem: "Municipal water/wastewater facilities run 24/7 while human operators rotate through shifts. The dangerous failure mode is when several weak signals combine across systems and nobody connects them before the next shift starts cold.",
    constraints: "Decision-support only \u2014 the system must never issue a command to physical plant equipment, even if a model call misbehaves. The Safety Governor is deterministic application code, not an LLM agent.",
    approach: "Built as 7 specialised agents \u2014 Sentinel, Historian, Evidence, Procedure, Risk, Coordinator, Handover \u2014 plus one deterministic, non-LLM Safety Governor. Every agent runs behind a LOCAL_DETERMINISTIC / GOOGLE_ADK_GEMINI provider switch on one typed contract.",
    architectureStages: [
      { label: "Telemetry / notes / maintenance / lab" },
      { label: "Event ingestion" },
      { label: "Agent fleet", sub: "7 specialised agents" },
      { label: "Safety Governor", sub: "deterministic \u00b7 non-LLM" },
      { label: "Approval / action" },
      { label: "Ops dashboard", sub: "Next.js / TypeScript / Tailwind" },
    ],
    decisions: [
      "Safety Governor is plain application code, never an LLM call \u2014 physical-control actions have no executor path in the codebase at all",
      "Every agent runs behind a provider switch on one typed contract, so the system is fully testable without live cloud credentials",
      "Free-text operator notes are wrapped as data, never concatenated into an instruction channel \u2014 closes a tested prompt-injection path",
      "Firestore and Pub/Sub have designed integration points, exercised via local/deterministic fallbacks in testing \u2014 not described as connected to live GCP resources",
    ],
    implementation: "The hardest part was proving the safety boundary rather than asserting it \u2014 physical-control actions needed to be structurally absent, not conditionally blocked.",
    verification: "Backend test suite passing, with explicit coverage for failure recovery and idempotency. This is an actively-developed repository close to a submission deadline, so the exact test count is tracked in the repository itself rather than restated here.",
    results: [
      "7 specialised agents plus 1 deterministic Safety Governor, each with interchangeable local-deterministic and real-Gemini execution paths",
      "Forced-failure recovery verified: retries via idempotency key with zero duplicate incidents created",
      "Physical-control actions have no executor code path in the system at all",
      "Operations dashboard (Next.js / TypeScript / Tailwind) for human review and approval",
    ],
    improve: "The two-provider pattern forced every integration to be genuinely testable \u2014 next: exercising the Firestore/Pub/Sub adapters against real GCP resources rather than their local fallbacks.",
    stack: ["FastAPI", "google-adk", "Gemini", "SQLite", "Next.js", "TypeScript", "Tailwind"],
    links: {
      github: "https://github.com/nexline-01xA/Aquashift",
      architecture: "https://github.com/nexline-01xA/Aquashift/blob/main/docs/ARCHITECTURE.md",
    },
  },
];

export const IN_PROGRESS_PROJECTS = [
  {
    id: "aion",
    title: "AION",
    fullTitle: "AION \u2014 Adaptive Intelligence-per-Operation Network",
    status: "Research Proposal",
    context: "AWS Trainium Frontier Competition \u2014 submitted August 2026",
    description: "An experimental framework exploring progressive compute activation (\u201ccompute annealing\u201d) for AWS Trainium, routing at the block/tile level rather than per-token. The repository is private. Currently a staged research proposal, not yet a benchmarked system.",
  },
];

export const MORE_PROJECTS = [
  {
    id: "portable-personal-agent",
    title: "Portable Personal Agent",
    description: "A personal AI control layer: typed tool registry, a four-level permission model, and an immutable audit log writing an event at every lifecycle transition. 42 backend tests; Phase 1 is CI-verified on every pull request.",
    tech: ["FastAPI", "PostgreSQL", "Docker Compose", "GitHub Actions"],
    github: "https://github.com/nexline-01xA/portable-personal-agent",
  },
  {
    id: "jpmc-midas-forage",
    title: "JPMorgan Chase \u2014 Software Engineering Virtual Experience (Forage)",
    description: "Forage virtual job-simulation program with JPMorgan Chase (MIDAS track).",
    tech: ["Forage"],
    github: "https://github.com/nexline-01xA/forage-midas",
  },
];
