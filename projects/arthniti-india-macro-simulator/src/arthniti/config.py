from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class Indicator:
    key: str
    code: str
    label: str
    unit: str
    description: str
    url: str


INDICATORS = (
    Indicator("gdp_growth", "NY.GDP.MKTP.KD.ZG", "Real GDP growth", "percent",
              "Annual real GDP growth.",
              "https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG?locations=IN"),
    Indicator("inflation", "FP.CPI.TOTL.ZG", "CPI inflation", "percent",
              "Annual consumer-price inflation.",
              "https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?locations=IN"),
)
COUNTRY_CODE = "IND"
WORLD_BANK_API_ROOT = "https://api.worldbank.org/v2/country"
DEFAULT_START_YEAR = 1990
DEFAULT_END_YEAR = 2025
DEFAULT_HORIZON = 5
DEFAULT_PATHS = 10_000
DEFAULT_SEED = 20_261_011
