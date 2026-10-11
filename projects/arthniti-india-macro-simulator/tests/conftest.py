from __future__ import annotations

import numpy as np
import pandas as pd
import pytest


@pytest.fixture
def synthetic_panel() -> pd.DataFrame:
    """Synthetic values are test fixtures only and never presented as real observations."""
    rng = np.random.default_rng(42)
    years = np.arange(1990, 2021)
    values = np.zeros((len(years), 2), dtype=float)
    values[0] = [5.5, 7.0]
    for i in range(1, len(years)):
        noise = rng.normal(0, [0.45, 0.55])
        values[i] = np.array([5.0, 5.5]) + np.array([[0.35, 0.04], [-0.03, 0.35]]) @ (values[i - 1] - [5.0, 5.5]) + noise
    return pd.DataFrame(values, columns=["gdp_growth", "inflation"], index=pd.Index(years, name="year"))
