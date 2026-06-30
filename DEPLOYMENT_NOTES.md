# TaxPilot AI Deployment Notes

## GitHub Repository

- https://github.com/yogeshchandola98-afk/taxpilot-ai

## Live Frontend (Vercel)

- Production URL: https://web-idojofa67-yogeshchandola98-afks-projects.vercel.app
- Alias: https://web-six-pi-53.vercel.app

## SQLite Local Storage

The frontend now uses an in-browser SQLite database (via sql.js/WebAssembly) instead of plain localStorage. The database is persisted as a base64-encoded SQLite file in localStorage. This gives structured relational storage with tables for:

- `tax_workspace` (PAN, financial year, income, deductions, notes)
- `tax_documents` (uploaded document metadata)
- `deductions` (section-wise deductions)

All data stays in the browser on this laptop. No cloud database is used.

## Custom Domain Setup: taxpilotai.yogeshebook.online

**Status**: The domain is currently assigned to another Vercel project.

### Option A: Remove from other project (Recommended)

1. Go to https://vercel.com/dashboard and find the other project that has `taxpilotai.yogeshebook.online`
2. Open that project → Settings → Domains
3. Remove `taxpilotai.yogeshebook.online`
4. Then run this command from the project folder:
   ```bash
   cd apps/web
   npx vercel domains add taxpilotai.yogeshebook.online
   ```

### Option B: DNS-Only Setup (if you can't remove from other project)

1. Go to your domain provider (where yogeshebook.online is managed)
2. Add a CNAME record:
   - Name/Host: `taxpilotai`
   - Value/Points to: `cname.vercel-dns.com`
   - TTL: 3600 or Auto
3. Go to https://vercel.com/yogeshchandola98-afks-projects/web/settings/domains
4. Add `taxpilotai.yogeshebook.online`
5. Vercel will verify the DNS and issue an SSL certificate

## Next Steps for Full Stack

- Set up the FastAPI backend with PostgreSQL/Redis (infra/docker-compose.yml included).
- Add document upload + AI extraction endpoints.
- Add proper auth (Clerk or Supabase).
- Connect the frontend to the backend when ready.
