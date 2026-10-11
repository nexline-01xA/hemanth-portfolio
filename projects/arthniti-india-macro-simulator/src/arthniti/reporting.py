from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

from arthniti.model import VARIABLES, VAR1
from arthniti.simulation import SimulationResult


def write_outputs(*, output_dir: Path, panel: pd.DataFrame, simulation: SimulationResult,
                  model: VAR1, forecasts: pd.DataFrame, metrics: pd.DataFrame,
                  manifest: dict[str, Any]) -> None:
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    panel.to_csv(output_dir / "historical_data.csv", index_label="year", float_format="%.10g")
    simulation.summary.to_csv(output_dir / "simulation_quantiles.csv", index=False, float_format="%.10g")
    forecasts.to_csv(output_dir / "rolling_forecasts.csv", index=False, float_format="%.10g")
    metrics.to_csv(output_dir / "forecast_metrics.csv", index=False, float_format="%.10g")
    (output_dir / "model_parameters.json").write_text(json.dumps(model.to_dict(), indent=2), encoding="utf-8")
    (output_dir / "run_manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    rows = []
    for p in range(min(250, simulation.n_paths)):
        for step, year in enumerate(simulation.years):
            rows.append({"path_id": p, "year": int(year),
                         "gdp_growth": float(simulation.paths[p, step, 0]),
                         "inflation": float(simulation.paths[p, step, 1])})
    pd.DataFrame(rows).to_csv(output_dir / "simulation_path_sample.csv", index=False)
    _plot_history(panel, output_dir / "historical_series.png")
    _plot_simulation(simulation, output_dir / "simulation_fan_chart.png")
    _plot_backtest(forecasts, output_dir / "forecast_backtest.png")


def _plot_history(panel: pd.DataFrame, path: Path) -> None:
    fig, axes = plt.subplots(2, 1, figsize=(10, 7), sharex=True)
    axes[0].plot(panel.index, panel["gdp_growth"], marker="o", markersize=3)
    axes[0].set_title("India — annual real GDP growth")
    axes[1].plot(panel.index, panel["inflation"], marker="o", markersize=3)
    axes[1].set_title("India — annual CPI inflation")
    for ax in axes:
        ax.set_ylabel("Percent")
        ax.grid(alpha=.25)
    axes[-1].set_xlabel("Year")
    fig.tight_layout()
    fig.savefig(path, dpi=160, bbox_inches="tight")
    plt.close(fig)


def _plot_simulation(result: SimulationResult, path: Path) -> None:
    fig, axes = plt.subplots(2, 1, figsize=(10, 7), sharex=True)
    for i, (variable, label) in enumerate(((VARIABLES[0], "GDP growth (%)"),
                                           (VARIABLES[1], "CPI inflation (%)"))):
        frame = result.summary[result.summary.variable == variable]
        axes[i].fill_between(frame.year, frame.p10, frame.p90, alpha=.16, label="10th–90th percentile")
        axes[i].fill_between(frame.year, frame.p25, frame.p75, alpha=.25, label="25th–75th percentile")
        axes[i].plot(frame.year, frame["median"], marker="o", label="Simulation median")
        axes[i].set_ylabel(label)
        axes[i].legend()
        axes[i].grid(alpha=.25)
    axes[-1].set_xlabel("Forecast year")
    fig.suptitle(f"Monte Carlo simulation: {result.n_paths:,} paths; seed={result.seed}")
    fig.tight_layout()
    fig.savefig(path, dpi=160, bbox_inches="tight")
    plt.close(fig)


def _plot_backtest(forecasts: pd.DataFrame, path: Path) -> None:
    fig, axes = plt.subplots(2, 1, figsize=(10, 7), sharex=True)
    for ax, variable, label in zip(axes, VARIABLES, ("GDP growth (%)", "CPI inflation (%)")):
        if forecasts.empty:
            ax.text(.5, .5, "No valid forecast origins", ha="center", va="center")
        else:
            ax.plot(forecasts.year, forecasts[f"actual_{variable}"], marker="o", label="Actual")
            ax.plot(forecasts.year, forecasts[f"VAR1_{variable}"], marker="o", label="VAR(1)")
            ax.plot(forecasts.year, forecasts[f"training_mean_{variable}"], linestyle="--", label="Mean")
            ax.plot(forecasts.year, forecasts[f"persistence_{variable}"], linestyle=":", label="Persistence")
            ax.legend()
        ax.set_ylabel(label)
        ax.grid(alpha=.25)
    axes[-1].set_xlabel("Target year")
    fig.suptitle("Expanding-window one-year-ahead evaluation")
    fig.tight_layout()
    fig.savefig(path, dpi=160, bbox_inches="tight")
    plt.close(fig)
