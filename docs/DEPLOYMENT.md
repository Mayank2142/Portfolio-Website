# Production handoff

## Current public frontend

GitHub Pages publishes this repository's root at `https://mayank2142.github.io/Portfolio-Website/`. Run `npm run build:pages`, then commit and push the generated root `index.html`, `projects/`, assets, `404.html`, and sitemap. The build sets the React Router basename to `/Portfolio-Website` and opens a drafted email for contact submissions. This static deployment has no `/api` endpoint or server-side message storage; the Express integration below is for full-stack hosting.

## Render Blueprint

`render.yaml` provisions a free Node web service and free PostgreSQL in Singapore. The free database expires after 30 days and the web service sleeps on inactivity. This is a preview configuration; upgrade the database for durable production hosting. Migrations run once in the build command because the free web plan has no pre-deploy command. On a paid plan, move migration to `preDeployCommand: npm run db:deploy`. Render's assigned external URL supplies the public origin unless `APP_ORIGIN` is set for a custom domain.

Email defaults to preview mode and saves submissions without sending external email. Configure the verified Resend sender variables below before enabling real delivery.

The React site and Express API are one deployable Node application. The Dockerfile retains Prisma tooling so migration commands can run as a release step. It uses a non-root runtime and excludes local contacts, secrets, Git history, and preview artifacts from the build context. Docker execution has not been verified on this workstation.

## Host configuration

Use a Node 22/container host with managed PostgreSQL and HTTPS. Set secrets in the host environment, never in tracked files:

| Variable | Value |
| --- | --- |
| NODE_ENV | production |
| HOST | 0.0.0.0 |
| PORT | Host-assigned port, or 3001 |
| APP_ORIGIN | Exact public HTTPS origin, without trailing slash |
| STORAGE_DRIVER | postgres |
| DATABASE_URL | Managed PostgreSQL connection string with provider-required TLS |
| EMAIL_MODE | resend |
| RESEND_API_KEY | Email provider secret |
| EMAIL_FROM | Sender at your verified domain |
| EMAIL_TO | mayankgupta17may@gmail.com |
| TRUST_PROXY | 1 only when the host has exactly one trusted proxy before Express |

For a source deployment, install with `npm ci`, build with `npm run build`, run `npm run db:deploy` as the release command, then start with `npm start`. For Docker, build the image, run the migration command inside that image with the production environment, then start the service. Do not migrate the database in every web process startup.

## Release checks

1. Enable database backups. Apply the checked-in migration and verify `/api/health/ready` returns 200.
2. Verify the homepage and a direct `/projects/cinebook` load, a missing URL's 404, the résumé download, and `/sitemap.xml`.
3. Inspect page source: canonical and Open Graph URLs must use the final public origin.
4. Submit one explicitly authorized real contact message. Confirm it arrives once and that resubmitting the same submission key does not duplicate delivery. Preview acceptance alone is not evidence of delivery.
5. Check desktop, narrow mobile, keyboard navigation, light theme, and reduced-motion preferences. Run Lighthouse against the actual public URL; record the result rather than assuming a score.
6. Keep the previous deployment available for rollback. Restore the previous image if health fails; do not destructively roll back contact data.

CI runs the production build, type checks, and automated tests on pushes and pull requests. The workflow is prepared locally and becomes active after the repository is pushed to GitHub. Hosting, database provisioning, verified email sender, and public URL are still external setup requirements.
