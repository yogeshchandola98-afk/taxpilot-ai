# TaxPilot AI Deployment Notes

## GitHub Repository

- https://github.com/yogeshchandola98-afk/taxpilot-ai

## Live Frontend (Vercel)

- Production URL: https://web-mugzxk1qa-yogeshchandola98-afks-projects.vercel.app
- Alias: https://web-six-pi-53.vercel.app

## Local Storage Mode

The current frontend saves workspace data (PAN, income, deductions, notes) in the browser's localStorage only. Data never leaves the user's device. Reminder: clearing browser data or using another browser/device will remove the local data.

## Subdomain Setup

To connect a subdomain (e.g., taxpilot.yourdomain.com):

1. Open the Vercel Dashboard for the project: https://vercel.com/yogeshchandola98-afks-projects/web
2. Go to Settings > Domains.
3. Add your custom domain or subdomain.
4. Vercel will show the required DNS records (usually one CNAME pointing to cname.vercel-dns.com).
5. Add the DNS record in your domain provider panel.
6. Wait for DNS propagation, then confirm in Vercel.

## Next Steps for Full Stack

- Set up the FastAPI backend with PostgreSQL/Redis (infra/docker-compose.yml included).
- Add document upload + AI extraction endpoints.
- Add proper auth (Clerk or Supabase).
- Connect the frontend to the backend when ready.
