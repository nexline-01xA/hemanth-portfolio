# Architecture

- data.py: World Bank adapter, retry policy, cache, validation and SHA-256 fingerprint.
- model.py: calendar-aware transition extraction, VAR(1) fit and diagnostics.
- simulation.py: seeded residual-bootstrap Monte Carlo.
- evaluation.py: expanding-window backtest and baseline metrics.
- reporting.py: CSV/JSON artefacts and diagnostic charts.
- pipeline.py: orchestration and run manifest.
- cli.py: local repeatable execution.
- api.py: FastAPI service with request validation.

Design goals: trace each result to exact source values and a seed; preserve missing data; separate simulation from historical evaluation; test model logic without the network; share a single pipeline across interfaces.

Two variables are a deliberate initial scope. Annual samples are small, so adding many correlated regressors may produce unstable estimates. New inputs should include source definitions, missingness handling and comparative evaluation.

A public production service would still need authentication, quotas, durable storage, structured logging, job queues, run IDs and monitoring. Those components are not claimed as implemented.
