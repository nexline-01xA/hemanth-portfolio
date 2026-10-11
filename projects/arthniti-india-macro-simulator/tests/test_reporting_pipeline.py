from __future__ import annotations

import json

from arthniti.evaluation import rolling_origin_backtest
from arthniti.model import VAR1
from arthniti.pipeline import run_pipeline
from arthniti.reporting import write_outputs
from arthniti.simulation import run_simulation


def test_reporting_writes_auditable_artifacts(tmp_path, synthetic_panel):
    model = VAR1.fit(synthetic_panel)
    simulation = run_simulation(synthetic_panel, horizon=2, n_paths=100, seed=101)
    forecasts, metrics = rolling_origin_backtest(synthetic_panel, test_start_year=2015)
    output = tmp_path / "outputs"
    write_outputs(output_dir=output, panel=synthetic_panel, simulation=simulation, model=model,
                  forecasts=forecasts, metrics=metrics, manifest={"project": "test", "seed": 101})
    for name in ("historical_data.csv", "simulation_quantiles.csv", "rolling_forecasts.csv",
                 "forecast_metrics.csv", "model_parameters.json", "run_manifest.json",
                 "simulation_path_sample.csv", "historical_series.png", "simulation_fan_chart.png",
                 "forecast_backtest.png"):
        assert (output / name).exists()
    assert json.loads((output / "run_manifest.json").read_text()) == {"project": "test", "seed": 101}


def test_pipeline_orchestrates_and_records_provenance(tmp_path, monkeypatch, synthetic_panel):
    monkeypatch.setattr("arthniti.pipeline.load_panel", lambda *args, **kwargs: synthetic_panel.copy())
    result = run_pipeline(output_dir=tmp_path / "outputs", cache_path=tmp_path / "cache.csv",
        start_year=1990, end_year=2020, horizon=2, n_paths=100, seed=77,
        test_start_year=2015, min_train_transitions=10)
    assert result["complete_observations"] == len(synthetic_panel)
    assert result["simulation_rows"] == 4
    assert len(result["data_sha256"]) == 64
    manifest = json.loads((tmp_path / "outputs" / "run_manifest.json").read_text())
    assert manifest["simulation"]["seed"] == 77
    assert manifest["data"]["missing_values_are_imputed"] is False
