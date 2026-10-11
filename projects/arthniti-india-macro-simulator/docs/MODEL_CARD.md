# Model Card

**Model:** ArthNiti VAR(1) plus joint historical residual bootstrap, v0.1.0.  
**Purpose:** exploratory simulation of Indian annual real GDP growth and CPI inflation.  
**Source:** World Bank Indicators API.

## Equation

For y(t) = [GDP growth, CPI inflation] transpose:

    y(t) = c + A * y(t-1) + epsilon(t)

Estimate c and A using ordinary least squares. Iterate forward and sample historical two-dimensional residual vectors jointly. The run uses a fixed seed and stores the input data fingerprint.

## Evaluation

Expanding-window one-year-ahead forecasts, each trained only on earlier years. Compare VAR(1) against a training-window mean and persistence baseline. Report MAE/RMSE in percentage points and the number of forecast origins.

## Appropriate uses

Learning transparent time-series and Monte Carlo mechanics; creating an auditable data pipeline; comparing simple forecast baselines.

## Inappropriate uses

Official government/RBI/World Bank/IMF forecasts; investment or policy decisions; causal interpretation of VAR coefficients; treating percentile ranges as validated confidence intervals.

## Limitations

Only two variables; annual frequency and a small sample; linear relationships may change; historical shocks may not represent future shock distributions; source data can be revised and historical vintages are not reconstructed. A spectral radius >= 1 flags non-decaying fitted dynamics. Outputs are experimental and not financial advice.
