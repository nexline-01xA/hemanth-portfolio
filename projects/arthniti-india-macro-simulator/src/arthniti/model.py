from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import pandas as pd

VARIABLES = ("gdp_growth", "inflation")


class ModelFitError(ValueError):
    pass


def consecutive_pairs(panel: pd.DataFrame) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    clean = panel.loc[:, VARIABLES].dropna().sort_index()
    years, values = clean.index.to_numpy(dtype=int), clean.to_numpy(dtype=float)
    if len(values) < 2:
        return np.empty((0, 2)), np.empty((0, 2)), np.empty(0, dtype=int)
    adjacent = np.diff(years) == 1
    return values[:-1][adjacent], values[1:][adjacent], years[1:][adjacent]


@dataclass(frozen=True, slots=True)
class VAR1:
    intercept: np.ndarray
    coefficients: np.ndarray
    residuals: np.ndarray
    fitted_values: np.ndarray
    n_transitions: int

    @classmethod
    def fit(cls, panel: pd.DataFrame, *, min_transitions: int = 8) -> VAR1:
        lagged, target, _ = consecutive_pairs(panel)
        if len(target) < min_transitions:
            raise ModelFitError(f"Need {min_transitions} adjacent annual transitions; got {len(target)}")
        design = np.column_stack((np.ones(len(lagged)), lagged))
        beta, _, rank, _ = np.linalg.lstsq(design, target, rcond=None)
        if rank < design.shape[1]:
            raise ModelFitError("Rank-deficient model design")
        fitted = design @ beta
        return cls(beta[0].copy(), beta[1:].T.copy(), (target - fitted).copy(),
                   fitted.copy(), len(target))

    def predict_next(self, previous: np.ndarray) -> np.ndarray:
        state = np.asarray(previous, dtype=float)
        if state.shape != (2,) or not np.isfinite(state).all():
            raise ValueError("previous must be a finite two-element vector")
        return self.intercept + self.coefficients @ state

    @property
    def spectral_radius(self) -> float:
        return float(np.max(np.abs(np.linalg.eigvals(self.coefficients))))

    @property
    def residual_covariance(self) -> np.ndarray:
        return np.cov(self.residuals, rowvar=False, ddof=1) if len(self.residuals) > 1 else np.zeros((2, 2))

    def to_dict(self) -> dict[str, object]:
        return {"equation": "y_t = c + A @ y_(t-1) + epsilon_t",
                "variables": list(VARIABLES), "intercept": self.intercept.tolist(),
                "lag_coefficients": self.coefficients.tolist(),
                "residual_covariance": self.residual_covariance.tolist(),
                "n_transitions": self.n_transitions, "spectral_radius": self.spectral_radius,
                "dynamics_stable_by_linear_spectral_test": self.spectral_radius < 1.0}
