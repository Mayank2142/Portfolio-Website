# Four-phase progress

1. **Content, design and architecture:** implemented source inventory, project selection, design tokens and contracts. Existing site archived outside the public build.
2. **React frontend:** implemented homepage, library, seven case studies, both internships, leadership, credentials, resume, theme, search and screenshot inspection. The design refinement adds a concise introduction and readable typography, staggered entrances, orbiting system signals, reading progress, project hover/filter motion, an interactive four-category skills explorer, and continuous decorative motion. Desktop and narrow-screen browser flows have been verified.
3. **Backend and interactions:** implemented durable contact/outbox, PostgreSQL adapter/migration, validation, retry/idempotency, profile links and project navigation. Vercel's Express adapter and Neon PostgreSQL are deployed and verified; email delivery remains in preview mode.
4. **Verification and replacement:** build/type checks, 14 contact and compiled-route tests, and browser QA passed. The site is pushed to GitHub and deployed at `https://mayank-gupta-portfolio-tau.vercel.app/`. Old HTML/CSS/pictures were replaced after recovery-archive verification.

This file is updated after verification. A local preview is not a verified public deployment.

GitHub Pages is also verified at `https://mayank2142.github.io/Portfolio-Website/`, using a dedicated static React build and an email-draft contact fallback. Vercel is the primary full-stack deployment selected by the user.

Deployment handoff includes a Dockerfile, GitHub Actions verification, Vercel configuration, and `DEPLOYMENT.md`. The Docker image remains unverified. Real email delivery requires verified sender/provider credentials; serverless scheduled retry recovery and field performance measurements remain separate production tasks. See `RELEASE.md` for the verified deployment scope.

Local preview: `http://localhost:3001`. To restart it, run `npm start` with `APP_ORIGIN=http://localhost:3001`. See `VERIFICATION.md` for the checks and production limits.

Frontend cleanup: SmartChat has been removed from active content, route generation, search and sitemap; Smart Helmet is now featured with a labelled system illustration. Repeated slogans and duplicate approach cards have been removed.

15 October refinement: added the supplied Credly links, original React/Motion name reveals, magnetic hero actions, bounded card tilt/image parallax, and a sliding skills indicator. Theme tokens and reading sizes have been refined; placeholder initials, repeated introduction strip, fake browser bars and certificate counters were removed. Design sources and verification scope are recorded in `DESIGN_REFERENCES.md`.

Contact/hover update: placeholders use Mayank Gupta and the profile email, the visible motion toggle and its stored pause preference have been removed, and words on the hero, navigation and project titles repeat a hover/focus wave. Decorative orbits, dots, the system card and skill symbols loop; device reduced-motion settings remain supported.

Dribbble motion update: the hero now has an original floating glass magnifier, with additional gradient drift, project cursor badges, section accents, page/scroll entrances, and a sliding mobile menu. The production frontend build, TypeScript checks, 14 integration tests, and desktop/mobile visual checks passed. The local preview remains at `http://localhost:3001`.

Leadership/achievement update: added floating milestone cards, bounded pointer tilt, repeating title waves, animated community/award icons, and travelling/pulsing timeline accents. Card loops pause outside the viewport. Build/type checks and desktop/mobile browser review passed; all content remains available in both themes and with reduced motion.

16 October frontend redesign: introduced warm-paper and botanical-ink themes, large mixed typography, a keyboard-accessible layered project showcase, asymmetric project cards, and a shared visual system across the remaining sections. Preserved all seven projects and the page-wide cursor bubble. Production build, TypeScript checks, 14 integration tests, and the documented desktop/mobile flows passed. See `VERIFICATION.md` for scope and `DESIGN_REFERENCES.md` for implementation provenance.
