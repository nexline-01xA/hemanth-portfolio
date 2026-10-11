import json
import tempfile
from pathlib import Path
from typing import Any

import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from arthniti.config import DEFAULT_END_YEAR, DEFAULT_HORIZON, DEFAULT_PATHS, DEFAULT_SEED, DEFAULT_START_YEAR
from arthniti.data import source_manifest
from arthniti.pipeline import run_pipeline

app = FastAPI(title="ArthNiti Macro API", version="0.1.0",
              description="Experimental Indian macroeconomic simulation and forecast evaluation.")


class SimulationRequest(BaseModel):
    start_year: int = Field(DEFAULT_START_YEAR, ge=1960, le=2100)
    end_year: int = Field(DEFAULT_END_YEAR, ge=1960, le=2100)
    horizon: int = Field(DEFAULT_HORIZON, ge=1, le=30)
    paths: int = Field(DEFAULT_PATHS, ge=100, le=100_000)
    seed: int = Field(DEFAULT_SEED, ge=0)
    test_start_year: int = Field(2015, ge=1960, le=2100)
    min_train_transitions: int = Field(10, ge=6, le=100)


@app.get("/health", tags=["operations"])
def health() -> dict[str, str]:
    return {"status": "ok", "service": "arthniti-macro-api", "version": "0.1.0"}


@app.get("/v1/indicators", tags=["metadata"])
def indicators() -> list[dict[str, str]]:
    return source_manifest()


@app.post("/v1/simulations", tags=["simulation"])
def create_simulation(request: SimulationRequest) -> dict[str, Any]:
    if request.start_year > request.end_year:
        raise HTTPException(status_code=422, detail="start_year must be <= end_year")
    with tempfile.TemporaryDirectory(prefix="arthniti-") as directory:
        temp = Path(directory)
        try:
            result = run_pipeline(output_dir=temp / "out", cache_path=temp / "cache" / "india.csv",
                start_year=request.start_year, end_year=request.end_year, horizon=request.horizon,
                n_paths=request.paths, seed=request.seed, test_start_year=request.test_start_year,
                min_train_transitions=request.min_train_transitions, offline=False)
            quantiles = pd.read_csv(temp / "out" / "simulation_quantiles.csv").to_dict(orient="records")
            metrics = pd.read_csv(temp / "out" / "forecast_metrics.csv").to_dict(orient="records")
            model = json.loads((temp / "out" / "model_parameters.json").read_text(encoding="utf-8"))
            return {"run": result, "simulation_quantiles": quantiles, "forecast_metrics": metrics, "model": model}
        except Exception as exc:
            raise HTTPException(status_code=502, detail=f"Data/model run failed: {exc}") from exc
