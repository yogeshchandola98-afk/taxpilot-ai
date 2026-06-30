# Run Commands

## Frontend

```bash
cd apps/web
npm install
npm run dev
```

Open http://localhost:3000.

## Backend

```bash
cd apps/api
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open http://localhost:8000/docs.

## Backend Tests

```bash
cd apps/api
pytest
```

## Vercel Frontend Deployment

Deploy from `apps/web` as the Vercel project root.

```bash
cd apps/web
npx vercel --prod
```

## Notes

- The frontend demo stores workspace data in browser localStorage only.
- Create `.env` from `.env.example` for local backend configuration.
- Never commit real API keys, PAN, Aadhaar, bank data, tax documents, or user financial records.
- The included tax calculation is only a scaffold and must be updated with versioned Indian Income Tax rules before production use.
