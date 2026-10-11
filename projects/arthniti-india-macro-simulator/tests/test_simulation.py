from __future__ import annotations

import numpy as np
import pandas as pd
import pytest

from arthniti.simulation import run_simulation


def test_fixed_seed_is_repeatable(synthetic_panel):
    a = run_simulation(synthetic_panel, horizon=3, n_paths=200, seed=123)
    b = run_simulation(synthetic_panel, horizon=3, n_paths=200, seed=123)
    assert np.array_equal(a.paths, b.paths)
    pd.testing.assert_frame_equal(a.summary, b.summary)


def test_seed_changes_paths(synthetic_panel):
    a = run_simulation(synthetic_panel, horizon=2, n_paths=100, seed=1)
    b = run_simulation(synthetic_panel, horizon=2, n_paths=100, seed=2)
    assert not np.array_equal(a.paths, b.paths)


def test_invalid_simulation_parameters_fail(synthetic_panel):
    with pytest.raises(ValueError):
        run_simulation(synthetic_panel, horizon=0, n_paths=100)
    with pytest.raises(ValueError):
        run_simulation(synthetic_panel, horizon=2, n_paths=10)
