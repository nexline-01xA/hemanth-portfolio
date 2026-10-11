from __future__ import annotations

import platform
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd

from arthniti import __version__
from arthniti.config import DEFAULT_END_YEAR, DEFAULT_HORIZON, DEFAULT_PATHS, DEFAULT_SEED, DEFAULT_START_YEAR
from arthniti.data import fingerprint_panel, load_panel, source_manifest
from arthniti.evaluation import rolling_origin_backtest
from arthniti.model import VARIABLES, VAR1
from arthniti.reporting import write_outputs
from arthniti.simulation import run_simulation


def run_pipeline(*, output_dir: Path = Path("outputs"), cache_path: Path = Path("data/cache/world_bank_india.csv"),
                 start_year: int = DEFAULT_START_YEAR, end_year: int = DEFAULT_END_YEAR,
                 horizon: int = DEFAULT_HORIZON, n_paths: int = DEFAULT_PATHS, seed: int = DEFAULT_SEED,
                 test_start_year: int = 2015, min_train_transitions: int = 10,
                 offline: bool = False) -> dict[str, Any]:
    panel = load_panel(start_year, end_year, cache_path=cache_path, offline=offline)
    complete = panel.loc[:, VARIABLES].dropna().sort_index()
    if len(complete) < min_train_transitions + 2:
        raise ValueError(f"Only {len(complete)} complete paired observations are available")
    model = VAR1.fit(complete, min_transitions=min_train_transitions)
    simulation = run_simulation(complete, horizon=horizon, n_paths=n_paths, seed=seed,
                                min_transitions=min_train_transitions)
    forecasts, metrics = rolling_origin_backtest(complete, test_start_year=test_start_year,
                                                  min_train_transitions=min_train_transitions)
    manifest = {
        "project": "ArthNiti — India Macroeconomic Simulation Lab",
        "software_version": __version__,
        "generated_at_utc": datetime.now(UTC).isoformat(),
        "runtime": {"python": platform.python_version(), "numpy": np.__version__, "pandas": pd.__version__},
        "data": {"country": "India", "country_code": "IND", "requested_year_range": [start_year, end_year],
                 "first_complete_year": int(complete.index.min()), "last_complete_year": int(complete.index.max()),
                 "complete_paired_observations": int(len(complete)), "sha256_normalized_panel": fingerprint_panel(panel),
                 "offline_cache_used": offline, "indicators": source_manifest(), "missing_values_are_imputed": False},
        "model": {"family": "bivariate VAR(1)", "estimator": "ordinary least squares",
                  "shock_process": "joint historical residual bootstrap", "parameters": model.to_dict()},
        "simulation": {"horizon_years": horizon, "paths": n_paths, "seed": seed},
        "evaluation": {"method": "expanding-window one-step-ahead backtest", "test_start_year": test_start_year,
                       "minimum_training_transitions": min_train_transitions, "n_forecasts": int(len(forecasts)),
                       "metric_units": "percentage points"},
        "limitations": ["Reduced-form model, not causal or structural.", "Only GDP growth and inflation are modelled.",
                        "Historical residuals may not represent future shocks.", "Annual data are a small sample.",
                        "World Bank values may be revised; fingerprint records the downloaded panel.",
                        "Outputs are experimental, not official forecasts or investment advice."]
    }
    write_outputs(output_dir=Path(output_dir), panel=panel, simulation=simulation, model=model,
                  forecasts=forecasts, metrics=metrics, manifest=manifest)
    return {"output_dir": str(Path(output_dir).resolve()),
            "data_years": [int(complete.index.min()), int(complete.index.max())],
            "complete_observations": int(len(complete)), "n_forecasts": int(len(forecasts)),
            "metrics": metrics.to_dict(orient="records"), "simulation_rows": int(len(simulation.summary)),
            "data_sha256": manifest["data"]["sha256_normalized_panel"], "spectral_radius": model.spectral_radius}
