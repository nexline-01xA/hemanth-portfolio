from __future__ import annotations

import pandas as pd
import pytest

from arthniti.data import DataSourceError, fetch_indicator, fingerprint_panel, load_panel, source_manifest, validate_panel


def test_panel_validation_rejects_missing_indicator():
    frame = pd.DataFrame({"gdp_growth": [1.0]}, index=pd.Index([2000], name="year"))
    with pytest.raises(ValueError, match="Missing indicators"):
        validate_panel(frame)


def test_fingerprint_is_stable(synthetic_panel):
    assert fingerprint_panel(synthetic_panel) == fingerprint_panel(synthetic_panel.copy())


def test_offline_cache_reindexes_year_range(tmp_path, synthetic_panel):
    cache = tmp_path / "cached.csv"
    synthetic_panel.to_csv(cache, index_label="year")
    loaded = load_panel(1995, 2000, cache_path=cache, offline=True)
    assert loaded.index.tolist() == list(range(1995, 2001))
    pd.testing.assert_frame_equal(loaded, synthetic_panel.loc[1995:2000], check_freq=False)


def test_offline_missing_cache_fails(tmp_path):
    with pytest.raises(FileNotFoundError, match="Offline cache not found"):
        load_panel(2000, 2020, cache_path=tmp_path / "absent.csv", offline=True)


class FakeResponse:
    def __init__(self, payload):
        self.payload = payload
    def raise_for_status(self):
        return None
    def json(self):
        return self.payload


class FakeSession:
    def __init__(self, payload):
        self.payload = payload
        self.last_params = None
    def get(self, url, params=None, timeout=None):
        self.last_params = params
        return FakeResponse(self.payload)


def test_fetch_parses_source_shape_and_preserves_missing():
    session = FakeSession([{"page": 1}, [{"date": "2001", "value": 4.1}, {"date": "2000", "value": None}]])
    series = fetch_indicator("FAKE.CODE", 2000, 2002, session=session)
    assert series.index.tolist() == [2000, 2001, 2002]
    assert pd.isna(series.loc[2000]) and pd.isna(series.loc[2002])
    assert series.loc[2001] == 4.1
    assert session.last_params["date"] == "2000:2002"


def test_fetch_rejects_malformed_payload():
    with pytest.raises(DataSourceError, match="Unexpected"):
        fetch_indicator("BAD", 2000, 2001, session=FakeSession({"error": True}))


def test_indicator_catalogue_is_explicit():
    assert {item["code"] for item in source_manifest()} == {"NY.GDP.MKTP.KD.ZG", "FP.CPI.TOTL.ZG"}
