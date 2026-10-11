from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import pandas as pd

from arthniti.model import VARIABLES, VAR1


@dataclass(frozen=True, slots=True)
class SimulationResult:
    years: np.ndarray
    paths: np.ndarray
    summary: pd.DataFrame
    seed: int
    n_paths: int


def run_simulation(panel: pd.DataFrame, *, horizon: int = 5, n_paths: int = 10_000,
                   seed: int = 20_261_011, min_transitions: int = 8) -> SimulationResult:
    if not 1 <= horizon <= 30:
        raise ValueError("horizon must be between 1 and 30")
    if not 100 <= n_paths <= 1_000_000:
        raise ValueError("n_paths must be between 100 and 1,000,000")
    if seed < 0:
        raise ValueError("seed must be non-negative")
    clean = panel.loc[:, VARIABLES].dropna().sort_index()
    model = VAR1.fit(clean, min_transitions=min_transitions)
    last_year = int(clean.index.max())
    state = clean.loc[last_year, list(VARIABLES)].to_numpy(dtype=float)
    rng = np.random.default_rng(seed)
    paths = np.empty((n_paths, horizon, 2), dtype=np.float64)
    for path_id in range(n_paths):
        current = state.copy()
        for step in range(horizon):
            shock = model.residuals[int(rng.integers(0, len(model.residuals)))]
            current = model.predict_next(current) + shock
            paths[path_id, step, :] = current
    years = np.arange(last_year + 1, last_year + horizon + 1, dtype=int)
    rows = []
    for step, year in enumerate(years):
        for j, variable in enumerate(VARIABLES):
            values = paths[:, step, j]
            rows.append({"year": int(year), "variable": variable, "mean": float(np.mean(values)),
                         "p10": float(np.quantile(values, .10)), "p25": float(np.quantile(values, .25)),
                         "median": float(np.quantile(values, .50)), "p75": float(np.quantile(values, .75)),
                         "p90": float(np.quantile(values, .90))})
    return SimulationResult(years, paths, pd.DataFrame(rows), seed, n_paths)
