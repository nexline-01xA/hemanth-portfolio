from __future__ import annotations

import numpy as np
import pandas as pd

from arthniti.model import VARIABLES, VAR1, consecutive_pairs


def mae(actual: np.ndarray, predicted: np.ndarray) -> float:
    return float(np.mean(np.abs(np.asarray(actual) - np.asarray(predicted))))


def rmse(actual: np.ndarray, predicted: np.ndarray) -> float:
    return float(np.sqrt(np.mean(np.square(np.asarray(actual) - np.asarray(predicted)))))


def rolling_origin_backtest(panel: pd.DataFrame, *, test_start_year: int = 2015,
                            min_train_transitions: int = 10) -> tuple[pd.DataFrame, pd.DataFrame]:
    clean = panel.loc[:, VARIABLES].dropna().sort_index()
    rows: list[dict[str, float | int]] = []
    for raw_year in clean.index:
        year = int(raw_year)
        if year < test_start_year or year - 1 not in clean.index:
            continue
        train = clean.loc[clean.index < year]
        _, targets, _ = consecutive_pairs(train)
        if len(targets) < min_train_transitions:
            continue
        actual = clean.loc[year, list(VARIABLES)].to_numpy(dtype=float)
        previous = clean.loc[year - 1, list(VARIABLES)].to_numpy(dtype=float)
        model = VAR1.fit(train, min_transitions=min_train_transitions)
        predictions = {"VAR1": model.predict_next(previous),
                       "training_mean": train.loc[:, VARIABLES].mean().to_numpy(dtype=float),
                       "persistence": previous}
        row: dict[str, float | int] = {"year": year}
        for i, variable in enumerate(VARIABLES):
            row[f"actual_{variable}"] = float(actual[i])
            for method, values in predictions.items():
                row[f"{method}_{variable}"] = float(values[i])
        rows.append(row)
    columns = ["year"]
    for variable in VARIABLES:
        columns.append(f"actual_{variable}")
        columns.extend(f"{method}_{variable}" for method in ("VAR1", "training_mean", "persistence"))
    forecasts = pd.DataFrame(rows, columns=columns)
    metric_rows = []
    for variable in VARIABLES:
        if forecasts.empty:
            break
        actual = forecasts[f"actual_{variable}"].to_numpy(dtype=float)
        for method in ("VAR1", "training_mean", "persistence"):
            predicted = forecasts[f"{method}_{variable}"].to_numpy(dtype=float)
            metric_rows.append({"target": variable, "method": method, "n_forecasts": len(actual),
                                "MAE_percentage_points": mae(actual, predicted),
                                "RMSE_percentage_points": rmse(actual, predicted)})
    return forecasts, pd.DataFrame(metric_rows, columns=["target", "method", "n_forecasts",
        "MAE_percentage_points", "RMSE_percentage_points"])
