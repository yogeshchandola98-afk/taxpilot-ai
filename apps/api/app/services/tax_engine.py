from app.schemas.tax import RegimeComparisonRequest, RegimeComparisonResponse, TaxRegimeResult

DISCLAIMER = "TaxPilot AI assists with tax preparation. Verify all values before filing and consult a qualified Chartered Accountant for complex tax situations."


def estimate_taxable_income(income: float, deductions: float) -> float:
    return max(income - deductions, 0)


def simple_slab_tax(taxable_income: float) -> float:
    if taxable_income <= 300000:
        return 0
    if taxable_income <= 600000:
        return (taxable_income - 300000) * 0.05
    if taxable_income <= 900000:
        return 15000 + (taxable_income - 600000) * 0.10
    if taxable_income <= 1200000:
        return 45000 + (taxable_income - 900000) * 0.15
    if taxable_income <= 1500000:
        return 90000 + (taxable_income - 1200000) * 0.20
    return 150000 + (taxable_income - 1500000) * 0.30


def build_result(taxable_income: float, tds_paid: float) -> TaxRegimeResult:
    tax = simple_slab_tax(taxable_income)
    cess = tax * 0.04
    total_tax = round(tax + cess, 2)
    refund = round(max(tds_paid - total_tax, 0), 2)
    payable = round(max(total_tax - tds_paid, 0), 2)
    effective_rate = round((total_tax / taxable_income) * 100, 2) if taxable_income else 0
    return TaxRegimeResult(tax_payable=payable, refund=refund, effective_tax_rate=effective_rate)


def compare_regimes(payload: RegimeComparisonRequest) -> RegimeComparisonResponse:
    old_taxable = estimate_taxable_income(payload.annual_income, payload.old_regime_deductions)
    new_taxable = estimate_taxable_income(payload.annual_income, 75000)
    old_result = build_result(old_taxable, payload.tds_paid)
    new_result = build_result(new_taxable, payload.tds_paid)
    recommended = "old_regime" if old_result.tax_payable < new_result.tax_payable else "new_regime"
    reason = "Recommended because it currently has the lower estimated tax payable in this simplified calculation."
    return RegimeComparisonResponse(
        old_regime=old_result,
        new_regime=new_result,
        recommended_regime=recommended,
        reason=reason,
        disclaimer=DISCLAIMER,
    )
