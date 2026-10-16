# Mayank Gupta - portfolio

A new React portfolio with technical case studies, a project library, internship and leadership timelines, credentials, and a separate Express contact API. The old HTML/CSS implementation is replaced; its recovery archive is outside this repository at `D:/Portfolio WEBSITE/backups/portfolio-before-rebuild-2026-10-14.zip`.

## Stack

React, TypeScript, Vite, React Router route pre-rendering, Tailwind CSS, Motion, Express, Zod and PostgreSQL/Prisma. Local development uses Node's SQLite storage so no database account is needed to review the contact workflow. Production requires PostgreSQL.

## Local development

Requires Node.js 22.16+.

```powershell
npm install
npm run db:generate
Copy-Item .env.example .env
npm run dev
```

Frontend: http://localhost:5173. API: http://127.0.0.1:3001. The frontend proxies `/api` to the API.

Email is in **preview mode** by default: submissions are saved durably and processed locally, but no external email is sent. The form explicitly reports this. Local messages are in `.data/portfolio.db`; no public endpoint exposes them.

```powershell
npm run typecheck
npm test
npm run build
```

To review the compiled site at port 3001, stop the dev API and set `APP_ORIGIN=http://localhost:3001` in your local environment, then `npm start`. Set this to the real HTTPS origin in production.

## Production setup

Configure `NODE_ENV=production`, `HOST=0.0.0.0`, the platform's `PORT`, `APP_ORIGIN`, `STORAGE_DRIVER=postgres`, and `DATABASE_URL`. Run `npm run db:deploy` against the target database before starting the application. Set `TRUST_PROXY=1` only on a trusted platform with exactly one reverse proxy.

For external email, configure `EMAIL_MODE=resend`, `RESEND_API_KEY`, a verified `EMAIL_FROM`, and `EMAIL_TO`. Secrets are server-only. Acceptance (`202`) means the message is saved, not inbox delivery. The outbox uses leases, idempotency keys and bounded retries. Configure external monitoring and a contact-data retention schedule before a public launch.

Express serves the pre-rendered route HTML and assets, `/api`, canonical tags, and a sitemap based on the configured origin. Unknown routes return HTTP 404. No account purchase or public deployment is performed by this checkout itself.

## Content and assets

- Edit `packages/core/src/index.ts` for profile, project and credential content.
- Project screenshots are in `apps/web/public/images`; the resume is `apps/web/public/resume.pdf`.
- `scripts/prepare_assets.py` prepares the supplied resume, documented public GitHub screenshots, licensed fonts and site share artwork. `scripts/social_cards.py` builds project-specific share artwork.
- Original README/gallery provenance is recorded in `docs/CONTENT_SOURCES.md`.
- Team, prototype and inherited work is identified in its case study. No unsupported problem counts or credential links are fabricated.
- Site-level social artwork is present. Set the final origin before sharing publicly.

See `docs/PHASE_STATUS.md` for progress and remaining production checks.

## Design and motion

The interface uses an editorial visual system with warm paper/light and botanical ink/dark themes, large mixed typography, and asymmetric project layouts. A layered hero showcase previews four real projects, with spring transitions, pointer tilt, and Left/Right/Home/End keyboard navigation. The page-wide cursor bubble magnifies the hero name and becomes transparent over other content. Scroll entrances, animated milestones, and the reading-progress line complete the motion system. Operating-system reduced-motion preferences are respected. The skills explorer also supports keyboard navigation and links each discipline to a real case study.

Production container setup and release checks are documented in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). The prepared GitHub Actions workflow runs build, typecheck, and tests once pushed. Public deployment and real email delivery require host configuration.
