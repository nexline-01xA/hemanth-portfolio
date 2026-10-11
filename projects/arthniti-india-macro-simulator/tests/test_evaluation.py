from __future__ import annotations

import pandas as pd

from arthniti.evaluation import rolling_origin_backtest


def test_backtest_compares_all_methods(synthetic_panel):
    forecasts, metrics = rolling_origin_backtest(synthetic_panel, test_start_year=2015, min_train_transitions=10)
    assert not forecasts.empty
    assert {"VAR1_gdp_growth", "training_mean_gdp_growth", "persistence_gdp_growth"}.issubset(forecasts.columns)
    assert set(metrics["method"]) == {"VAR1", "training_mean", "persistence"}
    assert (metrics["n_forecasts"] > 0).all()
    assert (metrics["MAE_percentage_points"] >= 0).all()
    assert (metrics["RMSE_percentage_points"] >= 0).all()


def test_first_test_forecast_does_not_see_later_observations(synthetic_panel):
    first, _ = rolling_origin_backtest(synthetic_panel, test_start_year=2015)
    changed = synthetic_panel.copy()
    changed.loc[2020, ["gdp_growth", "inflation"]] = [90., -50.]
    second, _ = rolling_origin_backtest(changed, test_start_year=2015)
    cols = ["VAR1_gdp_growth", "VAR1_inflation", "training_mean_gdp_growth", "training_mean_inflation"]
    pd.testing.assert_frame_equal(first.loc[first.year == 2015, cols].reset_index(drop=True),
                                  second.loc[second.year == 2015, cols].reset_index(drop=True))
