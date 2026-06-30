from pydantic import BaseModel, Field


class RegimeComparisonRequest(BaseModel):
    annual_income: float = Field(ge=0)
    old_regime_deductions: float = Field(default=0, ge=0)
    tds_paid: float = Field(default=0, ge=0)


class TaxRegimeResult(BaseModel):
    tax_payable: float
    refund: float
    effective_tax_rate: float


class RegimeComparisonResponse(BaseModel):
    old_regime: TaxRegimeResult
    new_regime: TaxRegimeResult
    recommended_regime: str
    reason: str
    disclaimer: str
