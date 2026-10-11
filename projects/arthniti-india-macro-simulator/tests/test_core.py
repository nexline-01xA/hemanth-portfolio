import numpy as np
import pandas as pd
import pytest

from arthniti.data import fingerprint_panel, validate_panel
from arthniti.evaluation import rolling_origin_backtest
from arthniti.model import ModelFitError, VAR1, consecutive_pairs
from arthniti.simulation import run_simulation


@pytest.fixture
def sample_panel():
    rng = np.random.default_rng(42)
    years = np.arange(1990, 2021)
    values = np.zeros((len(years), 2))
    values[0] = [5.5, 7.0]
    for i in range(1, len(years)):
        noise = rng.normal(0, [.45, .55])
        values[i] = np.array([5., 5.5]) + np.array([[.35, .04], [-.03, .35]]) @ (values[i - 1] - [5., 5.5]) + noise
    return pd.DataFrame(values, columns=["gdp_growth", "inflation"], index=pd.Index(years, name="year"))


def test_fit_forecast_shapes(sample_panel):
    model = VAR1.fit(sample_panel)
    assert model.predict_next(sample_panel.iloc[-1].to_numpy()).shape == (2,)
    assert model.coefficients.shape == (2, 2)


def test_gaps_are_not_bridged():
    panel = pd.DataFrame({"gdp_growth": [1., 2., 3.], "inflation": [4., 5., 6.]},
                         index=pd.Index([2000, 2001, 2003], name="year"))
    _, targets, years = consecutive_pairs(panel)
    assert len(targets) == 1 and years.tolist() == [2001]


def test_small_sample_fails():
    panel = pd.DataFrame({"gdp_growth": [1., 2.], "inflation": [3., 4.]},
                         index=pd.Index([2000, 2001], name="year"))
    with pytest.raises(ModelFitError):
        VAR1.fit(panel)


def test_seed_reproducibility(sample_panel):
    first = run_simulation(sample_panel, horizon=3, n_paths=200, seed=123)
    second = run_simulation(sample_panel, horizon=3, n_paths=200, seed=123)
    assert np.array_equal(first.paths, second.paths)
    pd.testing.assert_frame_equal(first.summary, second.summary)


def test_seed_changes_paths(sample_panel):
    first = run_simulation(sample_panel, horizon=2, n_paths=100, seed=1)
    second = run_simulation(sample_panel, horizon=2, n_paths=100, seed=2)
    assert not np.array_equal(first.paths, second.paths)


def test_backtest_metrics(sample_panel):
    forecasts, metrics = rolling_origin_backtest(sample_panel, test_start_year=2015)
    assert not forecasts.empty
    assert set(metrics.method) == {"VAR1", "training_mean", "persistence"}
    assert (metrics.RMSE_percentage_points >= 0).all()


def test_validation_and_fingerprint(sample_panel):
    validate_panel(sample_panel)
    assert fingerprint_panel(sample_panel) == fingerprint_panel(sample_panel.copy())
    with pytest.raises(ValueError):
        validate_panel(sample_panel.drop(columns=["inflation"]))
