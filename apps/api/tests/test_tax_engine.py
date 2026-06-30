from app.schemas.tax import RegimeComparisonRequest
from app.services.tax_engine import compare_regimes


def test_compare_regimes_returns_disclaimer() -> None:
    result = compare_regimes(RegimeComparisonRequest(annual_income=1200000, old_regime_deductions=200000, tds_paid=50000))
    assert result.disclaimer
    assert result.recommended_regime in {"old_regime", "new_regime"}
