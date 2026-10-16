# Release verification — 17 October 2026

## Published destinations

- Primary: https://mayank-gupta-portfolio-tau.vercel.app/
- Repository: https://github.com/Mayank2142/Portfolio-Website (main)
- Additional static frontend: https://mayank2142.github.io/Portfolio-Website/

Vercel project `mayank-gupta-portfolio` runs the prerendered React frontend and Express API function. Neon project `neon-champagne-chair` supplies a separate PostgreSQL database on its free plan. Credentials are managed by the Vercel/Neon integration, not committed. The user's existing calendar database was not used.

## Checks completed

- Web/API TypeScript checks and production builds passed locally.
- Existing 14 contact/compiled-route tests passed; GitHub verification passed on the released code.
- GitHub Pages build/deployment passed; live project navigation and direct case reload worked.
- Vercel production build reached Ready with the configured Neon database.
- Live `/api/health/live`, `/api/health/ready` and `/api/profiles` returned 200. Readiness reported `emailMode: preview`.
- Live project library showed seven projects; CampusMate loaded with all images and survived a direct reload with no browser console errors or horizontal overflow at the inspected width.
- CineBook HTML returned 200 with the Vercel production canonical URL. The resume returned `application/pdf`; the sitemap used the public origin.
- A synthetic contact submission (`deployment-check@example.com`, subject `Deployment verification`) saved successfully. A read-only database query confirmed its outbox status was `preview`. No external message was sent.
- An initial Windows lockfile omitted Linux optional packages. Regenerated the lockfile without stale data and pinned Node 22. Initial API module resolution and pooled migration-lock failures were fixed by importing the compiled ESM handler and using the direct database URL. A read-only Neon query confirmed zero migration locks before redeployment; no database reset or data deletion was performed.

## Remaining configuration and limits

- Email delivery needs `EMAIL_MODE=resend`, `RESEND_API_KEY`, a verified `EMAIL_FROM` and `EMAIL_TO`. Current form feedback correctly states that preview submissions do not send email.
- Vercel processes a bounded outbox batch after acceptance. A scheduled worker is needed for automatic recovery of delayed retries when there are no new requests. The standalone Node deployment retains its continuous worker.
- Rate limiting in the current Express middleware is per function instance. Add a shared rate-limit store or platform firewall policy for stronger protection across concurrent instances.
- No custom domain, field Core Web Vitals/FPS benchmark, or full accessibility certification is claimed.
- An earlier free Render preview was provisioned before the user selected Vercel. It is not the primary deployment; its resources have not been deleted.
- A dependency audit still reports issues in development tooling. No blanket major-version upgrade was applied during the hosting migration; review those updates separately.

For frontend edits, push to main to trigger Vercel deployment and GitHub verification. Updating the separate GitHub Pages frontend requires `npm run build:pages` and committing its generated files.
