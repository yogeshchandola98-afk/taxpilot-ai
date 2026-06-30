from fastapi import APIRouter

from app.schemas.tax import RegimeComparisonRequest, RegimeComparisonResponse
from app.services.tax_engine import compare_regimes

router = APIRouter()


@router.post("/compare-regimes", response_model=RegimeComparisonResponse)
def compare_tax_regimes(payload: RegimeComparisonRequest) -> RegimeComparisonResponse:
    return compare_regimes(payload)
