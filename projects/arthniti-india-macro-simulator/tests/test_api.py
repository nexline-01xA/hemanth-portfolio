from fastapi.testclient import TestClient

from arthniti.api import app

client = TestClient(app)


def test_health_contract():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_indicator_metadata_contract():
    response = client.get("/v1/indicators")
    assert response.status_code == 200
    items = response.json()
    assert len(items) == 2
    assert all("source_url" in item for item in items)
