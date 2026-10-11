from __future__ import annotations

import hashlib
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from arthniti.config import COUNTRY_CODE, INDICATORS, WORLD_BANK_API_ROOT


class DataSourceError(RuntimeError):
    """Data source unavailable or returned an invalid response."""


def _session() -> requests.Session:
    policy = Retry(total=4, connect=4, read=4, backoff_factor=.5,
                   status_forcelist=(429, 500, 502, 503, 504),
                   allowed_methods=frozenset({"GET"}), respect_retry_after_header=True)
    session = requests.Session()
    session.headers.update({"User-Agent": "ArthNiti-Macro/0.1"})
    session.mount("https://", HTTPAdapter(max_retries=policy))
    return session


def fetch_indicator(code: str, start_year: int, end_year: int, *,
                    timeout: float = 20, session: requests.Session | None = None) -> pd.Series:
    if start_year > end_year:
        raise ValueError("start_year must be <= end_year")
    client = session or _session()
    url = f"{WORLD_BANK_API_ROOT}/{COUNTRY_CODE}/indicator/{code}"
    try:
        response = client.get(url, params={"format": "json", "date": f"{start_year}:{end_year}",
                                           "per_page": 2000}, timeout=timeout)
        response.raise_for_status()
        payload: Any = response.json()
    except (requests.RequestException, ValueError) as exc:
        raise DataSourceError(f"World Bank download failed for {code}: {exc}") from exc
    if not isinstance(payload, list) or len(payload) < 2:
        raise DataSourceError(f"Unexpected World Bank response for {code}")
    if not isinstance(payload[1], list):
        raise DataSourceError(f"No observations for {code}: {payload[0]}")
    values = {}
    for row in payload[1]:
        if row.get("date") is not None and row.get("value") is not None:
            year, value = int(row["date"]), float(row["value"])
            if start_year <= year <= end_year and np.isfinite(value):
                values[year] = value
    years = pd.Index(range(start_year, end_year + 1), name="year")
    return pd.Series(values, dtype="float64", name=code).reindex(years)


def fetch_panel(start_year: int, end_year: int) -> pd.DataFrame:
    if start_year > end_year:
        raise ValueError("start_year must be <= end_year")
    client = _session()
    columns = {item.key: fetch_indicator(item.code, start_year, end_year, session=client)
               for item in INDICATORS}
    panel = pd.DataFrame(columns, index=pd.Index(range(start_year, end_year + 1), name="year"))
    validate_panel(panel)
    return panel


def validate_panel(panel: pd.DataFrame) -> None:
    required = {item.key for item in INDICATORS}
    if required - set(panel.columns):
        raise ValueError(f"Missing indicators: {sorted(required - set(panel.columns))}")
    if panel.index.name != "year" or panel.index.has_duplicates:
        raise ValueError("Index must be unique and named year")
    years = panel.index.to_numpy(dtype=int)
    if len(years) and not np.all(np.diff(years) > 0):
        raise ValueError("Years must be strictly increasing")
    for column in required:
        if not np.isfinite(panel[column].dropna().to_numpy(dtype=float)).all():
            raise ValueError(f"Non-finite values in {column}")


def load_panel(start_year: int, end_year: int, *, cache_path: Path, offline: bool = False) -> pd.DataFrame:
    cache_path = Path(cache_path)
    if offline:
        if not cache_path.exists():
            raise FileNotFoundError(f"Offline cache not found: {cache_path}")
        panel = pd.read_csv(cache_path, index_col="year")
        panel.index = panel.index.astype(int)
        panel.index.name = "year"
        panel = panel.loc[(panel.index >= start_year) & (panel.index <= end_year)]
        panel = panel.reindex(pd.Index(range(start_year, end_year + 1), name="year"))
        validate_panel(panel)
        return panel
    panel = fetch_panel(start_year, end_year)
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    panel.to_csv(cache_path, index_label="year", float_format="%.10g")
    return panel


def fingerprint_panel(panel: pd.DataFrame) -> str:
    content = panel.sort_index().to_csv(index_label="year", na_rep="NA", float_format="%.10g").encode()
    return hashlib.sha256(content).hexdigest()


def source_manifest() -> list[dict[str, str]]:
    return [{"key": x.key, "code": x.code, "label": x.label, "unit": x.unit,
             "description": x.description, "source_url": x.url} for x in INDICATORS]
