KNOWN_DOCUMENT_TYPES = {
    "form16": "Form 16",
    "ais": "Annual Information Statement",
    "tis": "Taxpayer Information Summary",
    "26as": "Form 26AS",
    "broker": "Broker Statement",
    "capital": "Capital Gains Statement",
    "bank": "Bank Statement",
    "salary": "Salary Slip",
    "home_loan": "Home Loan Certificate",
    "insurance": "Insurance Premium Receipt",
    "elss": "ELSS Statement",
    "ppf": "PPF Statement",
    "nps": "NPS Statement",
    "donation": "Donation Receipt",
}


def classify_document(filename: str) -> str:
    normalized = filename.lower().replace(" ", "_").replace("-", "_")
    for key, label in KNOWN_DOCUMENT_TYPES.items():
        if key in normalized:
            return label
    return "Unknown Document"
