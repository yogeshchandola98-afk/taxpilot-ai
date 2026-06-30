# Architecture

## High-Level Design

TaxPilot AI is structured as a modular SaaS platform.

```text
User -> Next.js Web App -> FastAPI API -> PostgreSQL
                         -> Redis/Celery Workers
                         -> Object Storage
                         -> AI/OCR/RAG Services
```

## Frontend

The Next.js app owns landing pages, authentication UI, dashboard, upload flows, review screens, charts, chatbot interface, and export actions.

## Backend

The FastAPI app exposes versioned APIs under `/api/v1`. Core modules include users, documents, extraction jobs, tax calculations, deductions, validations, AI assistant, exports, and admin.

## Async Processing

Celery workers process document parsing, OCR, broker statement analysis, AIS matching, long-running AI extraction, and export generation.

## Data Storage

- PostgreSQL stores user data, extracted tax records, calculations, validations, audit logs, and job metadata.
- Object storage stores uploaded documents and generated exports.
- Redis stores job queues, short-lived cache, and rate-limit state.

## AI Guardrails

- AI outputs must be saved as estimates or suggestions unless directly supported by imported documents.
- Every extracted value stores source document, source page, confidence score, and edit history.
- User review is mandatory before generating a return summary.

## Security

- HTTPS only.
- Role-based access control.
- Encryption at rest for sensitive data.
- Audit logs for profile changes, document access, extraction changes, and export generation.
- No secrets in source control.
