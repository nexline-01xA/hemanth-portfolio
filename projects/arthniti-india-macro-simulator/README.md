# ArthNiti — India Macroeconomic Simulation Lab

A reproducible economic data pipeline, calibrated time-series simulator and rolling forecast-evaluation service. Built as an engineering-first project with a CLI, REST API, tests, Docker and CI.

**Scope:** annual real GDP growth and CPI inflation are modelled with a bivariate VAR(1). This is an experimental statistical baseline—not a causal model, official forecast or investment advice.

## Data

| Indicator | World Bank code | Source |
|---|---| 
| Real GDP growth | NY.GDP.MKTP.KD.ZG | https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG?locations=IN |
| CPI inflation | FP.CPI.TOTL.ZG | https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?locations=IN |

API docs: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation

Data is downloaded at runtime, aligned by year, cached locally, and fingerprinted using SHA-256. Missing values are not silently filled. World Bank observations can be revised, and each run records the exact panel used.

## Install and run

Python 3.11 or 3.12:

    python -m venv .venv

Windows Command Prompt:

    .venv\Scripts\activate
    python -m pip install -e ".[dev]"
    arthniti run

Linux/macOS:

    source .venv/bin/activate
    python -m pip install -e ".[dev]"
    arthniti run

Default: request 1990–2025; simulate five years using 10,000 paths and seed 20261011.

    arthniti run --start-year 1990 --end-year 2025 --horizon 5 --paths 10000 --seed 20261011 --test-start 2015

After an online download, use the cache for offline reruns:

    arthniti run --offline --cache data/cache/world_bank_india.csv --seed 20261011

## Mathematical model

For y(t) = [GDP growth, CPI inflation] transpose:

    y(t) = c + A * y(t-1) + epsilon(t)

The intercept and lag matrix are fitted by ordinary least squares. Only consecutive annual transitions are used. Monte Carlo paths iterate this equation and draw historical residual vectors jointly, preserving observed same-year error co-movement. A fixed seed makes numeric paths reproducible for a fixed dataset and software environment.

## Forecast evaluation

An expanding-window backtest re-estimates the model for each target year using only prior observations. VAR(1) is compared with the training mean and a persistence baseline. Reported metrics are:

    MAE  = mean(abs(actual - prediction))
    RMSE = sqrt(mean((actual - prediction)^2))

Errors are in percentage points. Compare methods on identical forecast years; do not assume the VAR is better without reading the generated metrics.

## Outputs

The output folder contains the aligned source CSV, run manifest and data hash, model coefficients and residual covariance, simulation quantiles and representative paths, rolling forecasts, MAE/RMSE metrics, and historical/fan-chart/backtest PNGs.

## API

    uvicorn arthniti.api:app --reload

Open http://127.0.0.1:8000/docs. Endpoints: GET /health, GET /v1/indicators, POST /v1/simulations.

Docker:

    docker compose up --build

## Engineering controls

Retry/timeouts, schema validation, explicit offline mode, calendar-aware lag construction, deterministic simulation, synthetic-only unit-test fixtures, linting, coverage and GitHub Actions CI.

    ruff check .
    pytest --cov=arthniti --cov-report=term-missing --cov-fail-under=75

## Limitations

Only two annual indicators are modelled; samples are small, parameters can shift, historical errors may not represent future shocks, and data vintages are not reconstructed. Percentile bands are not guaranteed confidence intervals. Coefficients do not establish causality. No official forecast or investment/policy advice is claimed.

See docs/ARCHITECTURE.md and docs/MODEL_CARD.md. MIT License.
