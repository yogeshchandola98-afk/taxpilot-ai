# TaxPilot AI

AI-powered Indian Income Tax Return preparation assistant.

TaxPilot AI helps users upload tax documents, extract financial information, compare tax regimes, identify deductions, validate return data, and generate a ready-to-review ITR summary.

Important: TaxPilot AI assists with tax preparation. It does not replace advice from a qualified Chartered Accountant for complex tax matters. Users remain responsible for verifying all data before submission.

## Stack

- Frontend: Next.js 15, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Recharts
- Backend: FastAPI, PostgreSQL, SQLAlchemy, Redis, Celery
- AI: OpenAI GPT, LangChain, RAG, OCR, Document Intelligence
- Documents: PyMuPDF, pdfplumber, Tesseract OCR, Pandas, Camelot
- Auth: Clerk or Supabase Auth
- Storage: AWS S3 or Supabase Storage
- Deployment: Vercel plus Railway/Render

## Apps

- `apps/web`: Next.js frontend
- `apps/api`: FastAPI backend
- `docs`: Product, architecture, compliance, and roadmap notes
- `infra`: Deployment and infrastructure placeholders

## Core Modules

- User profile and authentication
- Document upload and extraction
- AIS and Form 26AS parsing
- Broker statement analysis
- Capital gains engine
- Deduction finder
- Tax regime comparison
- ITR recommendation
- AI tax assistant
- Validation engine
- Export generation
- Admin dashboard

## Development

This is a scaffolded starter project. Add credentials in local environment files only. Do not commit secrets.

## Local SQLite Data Mode

The Vercel-ready frontend uses an in-browser SQLite database (via sql.js/WebAssembly) for structured local storage. The database is serialized to localStorage as a base64 SQLite file. Tables include tax_workspace, tax_documents, and deductions. All data stays on the user's laptop/device only. Clearing browser data or using another browser/device will remove the local data. Do not store production PAN, Aadhaar, bank details, or sensitive tax documents without proper backend security.
