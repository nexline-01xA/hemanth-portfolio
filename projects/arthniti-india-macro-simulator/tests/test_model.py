from __future__ import annotations

import numpy as np
import pandas as pd
import pytest

from arthniti.model import ModelFitError, VAR1, consecutive_pairs


def test_fit_predict_shapes(synthetic_panel):
    model = VAR1.fit(synthetic_panel)
    pred = model.predict_next(synthetic_panel.iloc[-1].to_numpy())
    assert model.intercept.shape == (2,)
    assert model.coefficients.shape == (2, 2)
    assert model.residuals.shape[1] == 2
    assert pred.shape == (2,) and np.isfinite(pred).all()


def test_consecutive_pairs_does_not_bridge_gaps():
    panel = pd.DataFrame({"gdp_growth": [1., 2., 3.], "inflation": [4., 5., 6.]},
                         index=pd.Index([2000, 2001, 2003], name="year"))
    lagged, target, pair_years = consecutive_pairs(panel)
    assert len(target) == 1
    assert pair_years.tolist() == [2001]
    assert lagged.tolist() == [[1., 4.]]


def test_rejects_too_few_transitions():
    panel = pd.DataFrame({"gdp_growth": [1., 2.], "inflation": [3., 4.]},
                         index=pd.Index([2000, 2001], name="year"))
    with pytest.raises(ModelFitError):
        VAR1.fit(panel)


def test_rejects_wrong_state_shape(synthetic_panel):
    with pytest.raises(ValueError):
        VAR1.fit(synthetic_panel).predict_next(np.array([1.]))
