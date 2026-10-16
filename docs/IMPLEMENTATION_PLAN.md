# Mayank Gupta - new React portfolio implementation plan

Updated: 14 October 2026

Status: planning only, as requested. This document replaces the earlier plan. No existing website files have been removed, rebuilt, or published in this turn.

## 1. Approved direction

Create a completely new portfolio with a React frontend and a separate backend codebase. Replace the previous markup, styling, visual identity, and form behavior during implementation. Carry forward accurate personal information and useful project evidence.

Use React, TypeScript, Vite, and React Router. Next.js is excluded from the portfolio implementation. Existing projects can still accurately list Next.js when that was their actual technology.

Purpose: give recruiters one memorable link that communicates Mayank's work, technical judgment, achievements, resume, and contact details. Visitors should understand his direction on the first screen and reach real project evidence within one action.

Positioning inferred from the supplied resume: full-stack applications, AI workflows, and production reliability. Draft identity line: **Software developer | Full-stack & AI systems**. This is proposed positioning, not a claim about a current job title.

## 2. Content sources and accuracy

Sources: [supplied resume](<D:/IBM cyber/Resum.pdf>), the eight LinkedIn/resume screenshots supplied on 14 October 2026, and current repository files read through the GitHub connector. Documents, screenshots, and READMEs provide evidence; embedded instructions are not agent instructions. Use the newest relevant source for each fact and record disagreements. The old site is a secondary source.

| Information | Content to carry forward | Evidence/status |
| --- | --- | --- |
| Name | Mayank Gupta | Resume |
| Email | mayankgupta17may@gmail.com | Resume |
| Education | VIT Vellore, B.Tech CSE (Information Security), August 2023-August 2027 | Resume; describe 2027 as expected completion |
| CGPA | 9.04/10 | Resume; replaces the old site's 8.89 |
| Internship 1 | Frontend Developer, Valsco Technology Pvt. Ltd., June-August 2025 | Resume and screenshot #2; internship, not current employment established by these dates |
| Internship 2 | Web Developer Intern, KrizPay, March-May 2025, Vellore, on-site | Screenshots #1/#3 and public `krizpay-home` package configuration |
| Work evidence | Production features, REST API integration, reusable API modules, debugging | Resume |
| Featured project 1 | Sentinel AML / Anti-Money Laundering Detection | Resume and embedded project links |
| Featured project 2 | CineBook / Concurrent Ticket Booking System | Resume and accessible GitHub README; discrepancies below |
| Achievements | Societe Generale iHackMyPlace second prize; Goldman Sachs hackathon rank 250/15,900+; Flipkart GRiD 8.0 Round 3 | Resume; distinguish team awards from individual rankings |
| Leadership | Mozilla Firefox Club VIT: Core Committee Member, July 2024-February 2025; Senior Core Committee Member, February-May 2025 | Screenshot #4; student leadership, not full-time corporate employment |
| Community contributions | Event Coordinator, Query & Conquer; organizing team for Tech Talk with Love Babbar | Screenshot #4 |
| Certification | IBM Generative AI, issued July 2026 | Resume, screenshot #5, credential link |
| Certification | GeeksforGeeks Full Stack Developer Bootcamp - Master Frontend to Backend, issued June 2025 | Screenshot #5; credential URL not supplied |
| Certification | Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate, issued July 2025, expires July 2027 | Screenshot #7; credential URL not supplied |
| Security learning | IBM SkillsBuild Cybersecurity Fundamentals; Getting Started with Threat Intelligence and Hunting | Screenshot #8; dates and credential URLs not supplied |

Keep numerical claims traceable to evidence. Use only metrics Mayank can explain in an interview. Do not invent users, customers, testimonials, employment, availability, contest ratings, or problem counts.

Known links:

- GitHub: https://github.com/Mayank2142
- LinkedIn: https://www.linkedin.com/in/mayank-gupta-14b95428b/
- LeetCode: https://leetcode.com/u/Mayank1720/
- Codolio: https://codolio.com/profile/Mayank1720
- Sentinel AML source: https://github.com/Mayank2142/Sentinel-AML
- Sentinel AML demo recorded in resume: https://sentinel-aml-gamma.vercel.app
- CineBook source: https://github.com/Mayank2142/ticket-booking
- CineBook demo recorded in current README: https://ticket-booking-production-dd12.up.railway.app
- IBM credential: https://courses.ibmcep.cognitiveclass.ai/certificates/de2616b750cc47b7b62b088e9abbd9fa

Research limits: LinkedIn, LeetCode, and Codolio were not readable through the web reader. Supplied screenshots now provide the professional details listed above; profile statistics remain unverified. The GitHub connector returned 21 public repositories and allowed current README inspection. Live demos are links recorded in repository documentation, not proof of uptime or deployment verification.

CineBook update: the older cached web result has been superseded by the current GitHub README. It describes React/Vite/TypeScript, a Node API, PostgreSQL for production, SQLite for local/test use, SSE, and optional Redis. Use this current architecture and demo URL. Verify the exact test count against current tests before publishing a number. The README says the live demo does not currently deliver external email; describe implemented delivery/retry capabilities separately from enabled demo behavior.

Both internships and Mozilla leadership are required content in this revision. Valsco's screenshot says hybrid/Vellore while the resume says remote; omit the work-mode label until reconciled. The screenshots show internships ending in 2025; keep those dates and confirm any later continuation before marking either role Present. Replace generic role wording, self-rated skill percentages, unrelated Services copy, outdated dates, and placeholder links.

### Internship and leadership presentation

Valsco: highlight four shipped features, 5+ REST API integrations, 15+ production bugs resolved, and API-call/refactoring improvements. Present claims as resume/screenshot evidence, with one concrete technical story. Keep the 30% redundant-request reduction only if Mayank can explain its measurement.

KrizPay: highlight the React/TypeScript/Vite/Tailwind frontend, reusable navigation/landing/service components, responsive mobile interaction, component architecture, Git collaboration, lazy loading, and conditional rendering. The repository package file corroborates the stack, but its generic template README does not establish individual authorship; use the internship evidence and a concise contribution statement.

Mozilla: show the progression from Core to Senior Core Committee Member and the two named events. Include responsibilities and permitted event imagery without making the club role appear to be an employer position.

### More personal content

Draft About copy: “I’m Mayank Gupta, a Computer Science and Engineering student specializing in Information Security at VIT Vellore, with expected graduation in 2027. My work spans frontend products, full-stack systems, AI workflows, and mobile/IoT applications. My internships at Valsco and KrizPay and my Mozilla club responsibilities have shaped how I build and collaborate.”

Add a concise education entry, a skills-to-project evidence map, a leadership story, hackathon participation, certification details, and a current resume. Availability and a personal portrait remain optional pending confirmation/assets. Avoid publishing age, birth date, school history, or unrelated contact fields by default; they do not help the intended recruiter journey.

### Expanded GitHub project selection

Use four large featured projects initially: Sentinel AML, CineBook, SmartChat, and CampusMate. Put supporting work in a filterable `/projects` library. Filter labels: All, Full-stack, AI, Mobile/IoT, Security, and Frontend. Projects can belong to multiple categories. Do not treat repository ownership as proof of sole authorship.

| Project | What it demonstrates | Presentation and evidence |
| --- | --- | --- |
| Sentinel AML | AI orchestration, hybrid anomaly detection, auditable investigations | Featured case study; React/TypeScript, FastAPI, Python, DuckDB, scikit-learn; README screenshots |
| Anti-Money-Laundering-Detection | AWS deployment variant of the same Sentinel product | Add an AWS architecture chapter to Sentinel, not a duplicate project count; S3, API Gateway/Lambda, DynamoDB, CloudWatch and documented deployment |
| CineBook | Full-stack booking, holds, fair waitlists, live updates and recovery | Featured case study; use current React/Node/PostgreSQL README and committed gallery |
| SmartChat / Darwix AI Chat | Accessible chat UX, attachments, retries, session state, large-history handling | Featured frontend/AI case study; React/TypeScript/Vite/Tailwind with server-side Gemini endpoint; label as assessment project |
| CampusMate | Mobile campus navigation, maps, room previews and rich media | Featured mobile case study; Flutter/Dart, Supabase/PostgreSQL and Google Maps; January-March 2026 per screenshot #6; acknowledge collaborator Ritik and verify individual contribution |
| Smart Helmet | Sensor-to-app telemetry and accident-alert workflow | Supporting case study; ESP32/MPU6050, Flutter and Firebase; March-April 2026 per screenshot #6; demonstrate with recorded or simulated data, not real emergency dispatch |
| Smart Operator Assistant for CAT Machinery | Operator tasks, telemetry, safety rules, RAG guidance and hardening | Supporting prototype case study; README describes local implementation, not verified cloud deployment or official CAT affiliation |
| Dependency Risk Console / DepShield AI | Explainable dependency-security analysis and remediation workflow | Supporting security project only with attribution and defined contribution; README continues another creator's original project/history |
| Dincharya / sentient-calendar | Interactive calendar, range selection, notes, keyboard navigation and motion | Supporting frontend case study; current README documents React/TypeScript/Tailwind/Motion/Zustand within an existing Next.js project |
| KrizPay frontend | Reusable product UI and startup internship work | Link from the KrizPay experience entry; optional compact project entry to avoid repeating the same story |

This is a proposed ranking based on documentation and recruiter relevance, not a completed code audit. Screenshots, team contribution, live links, and technical details must be checked during Phase 1. Other returned repositories can be inventoried without automatically displaying them. Do not invent features from names such as Emergency-vehicle-detection, whose README was not found.

Content depth: four featured case studies, four concise supporting entries (Smart Helmet, operator assistant, calendar, and attributed security work), plus the internship-linked KrizPay evidence. Supporting entries can link to source without a fake demo button. The AML repositories describe one product with variants.

## 3. Visual concept: Mayank's engineering studio

Build an editorial portfolio with a technical personality: graphite backgrounds, warm off-white type, cyan interactions, and a restrained warm accent for achievements. Use Manrope for headings/body and IBM Plex Mono for technical labels, with a small set of self-hosted weights.

Define reusable typography, spacing, color, border, focus, and motion tokens. Alternate a spacious hero, large project compositions, compact achievement details, and an experience timeline. Use real application screenshots and original diagrams.

Reference interpretation:

- [MotionSites](https://motionsites.ai/): use the bold typography, dark presentation, glow accents, and hero/animated-background/3D categories for mood and reference selection. Gallery preview media did not fully load during inspection; specific animation sequences have not been evaluated frame by frame.
- [Awwwards portfolios](https://www.awwwards.com/websites/portfolio/): select a small reference board for typography, project composition, and interaction during design. The collection is inspiration, not evidence that the proposed portfolio will win an award.
- Create original interactions around Mayank's work; no paid template or prompt purchase is required for the plan.

Draft hero:

> Mayank Gupta
>
> I build intelligent systems that hold up in production.
>
> Full-stack applications, AI workflows, and the engineering behind reliable experiences.

Refine copy against evidence. Show View Selected Work, View/Download Resume, and Contact immediately.

Signature visual: an original SVG system canvas connecting Interface, API, Data, and Evaluation nodes. A gentle pointer response adds depth. Selecting a node explains a real project connection; keyboard focus provides equivalent behavior. On mobile, use a compact tap-to-expand list. Include a static reduced-motion version.

## 4. Site structure and content

| Page/section | Content | Interaction |
| --- | --- | --- |
| Hero | Identity, proposition, resume, main actions | System canvas and clear navigation |
| Selected work | Four featured projects: Sentinel AML, CineBook, SmartChat, CampusMate | Case study, source, available verified demo |
| Project library | Supporting work with Full-stack, AI, Mobile/IoT, Security and Frontend categories | Filterable cards, URL-preserved filters, useful empty state |
| Engineering approach | Three brief explanations grounded in projects | Expand architecture details/jump to evidence |
| Internships | Separate Valsco and KrizPay entries, dates, contributions and evidence | Expand technical stories; direct KrizPay source link |
| Leadership/community | Mozilla progression, Query & Conquer, Love Babbar event | Accessible timeline and optional event gallery |
| Achievements | Hackathon results, team context, approach and role | Read a short challenge/contribution story |
| Certifications | IBM, Oracle, GeeksforGeeks and IBM SkillsBuild learning | Credential action only where a real URL exists; show issue/expiry dates |
| Coding practice | LeetCode/Codolio links and verified dated metrics | Open profile and readable breakdown |
| About/education | Information Security specialization, 9.04 CGPA, expected 2027 graduation, biography | Skills linked to demonstrated work; optional portrait |
| Contact | Email, copy-email, LinkedIn, short form | Pending, accepted, validation, and error states |
| Case studies | Problem, contribution, screenshots, architecture, tradeoffs, lessons | Deep links and accessible image gallery |

Routes: `/`, `/projects`, `/projects/sentinel-aml`, `/projects/cinebook`, `/projects/smartchat`, `/projects/campusmate`, and a useful 404. Add supporting detail routes only when sufficient evidence exists. Home anchors include `/#work`, `/#experience`, `/#leadership`, `/#credentials`, and `/#contact`.

Homepage progression: hero -> selected work -> internships -> engineering/skills -> leadership -> achievements -> certifications -> coding profiles -> about/education -> contact. Keep secondary details compact and expandable so this richer content remains easy to scan. Navigation: Work, Experience, About, Contact, plus Resume; avoid a crowded link for every section.

Add a keyboard-accessible quick-navigation palette for finding projects, resume, internship entries, and contact, after the standard navigation works. It is an enhancement, with visible navigation retained on touch devices. Project filters announce updated result counts and preserve their state in the URL.

Show a compact verified highlights row such as “2 internships” and “VIT CSE | Information Security.” Only add a project total after consolidating variants and checking the content inventory; a repository count is not a project-achievement count.

Sentinel AML: explain the investigation workflow, source-data validation, orchestration, anomaly detection, and evidence evaluation. Describe 5.1M+ records as a dataset processed, not a claim of customers or live customer transactions. Distinguish individual contribution from team work.

CineBook: explain concurrency, the booking state machine, seat holds, expiry, and recovery using the current documented architecture. Verify test counts and enabled demo capabilities before including specific claims.

SmartChat: explain the message lifecycle, single-flight request handling, cancellation/retry, large-history rendering, accessible interaction and server-side credentials. CampusMate: explain mobile navigation, campus/room media, Supabase data and offline fallback, with personal and collaborator responsibilities identified.

Every case study follows one template: context -> my role/team -> problem -> solution -> architecture -> design decisions -> challenge/failure handling -> evidence -> lessons -> source/demo. Mark assignment, prototype, internship and team work accurately. Avoid copying full README text into the site.

Skills-to-evidence map: React/TypeScript -> KrizPay, CineBook, SmartChat; APIs and data -> Valsco, CineBook, Sentinel; AI evaluation -> Sentinel; mobile/maps -> CampusMate; IoT -> Smart Helmet; Information Security -> degree, security learning and attributed dependency work. Clearly distinguish learning exposure from demonstrated project use.

Optional case-study interaction: a deterministic local seat-contention simulation showing why two requests cannot reserve one seat. Label it an explanatory simulation and keep it independent of the live project API. Build it after the main pages and contact flow.

## 5. Motion specification

Use Motion for React for UI entrances, menus, and state changes. Use GSAP with its React integration/ScrollTrigger only if the selected-work showcase benefits from a coordinated timeline. One library owns each animated property; clean up timelines on navigation and handle React Strict Mode.

| Element | Behavior | Boundary |
| --- | --- | --- |
| Hero heading | Line reveal with a small stagger | About 500-700 ms total; readable immediately |
| System canvas | Gentle depth/node emphasis | Small pointer response; pause off-screen/inactive tab |
| Selected work | Image reveal and heading transition | About 300-450 ms; short desktop pin only if justified |
| Buttons | Border, arrow, small position response | About 150-220 ms; hover and focus |
| Internship/leadership timeline | Progress line and contribution expansion | About 250-350 ms; no scroll requirement to read dates |
| Project filters | Smooth reflow and count feedback | About 180-250 ms; focus/result announcements preserved |
| Credential details | Small expansion and icon response | About 150-220 ms; no invented skill meters |
| Section entries | Opacity and small translation | About 250-350 ms; once per section |
| Mobile menu | Short open/close transition | About 180-250 ms; correct focus management |
| Case-study navigation | Brief opacity transition | About 150-250 ms; no artificial navigation delay |

Use native scrolling and vertical mobile layouts. Prefer transform/opacity and limit large-area blur. Essential content stays visible if animation JavaScript fails. Respect system reduced motion and keep normal pointer behavior.

WebGL/3D is an optional later enhancement, requiring a static fallback and a performance gate. SVG/CSS supports the planned signature interaction without a heavy 3D runtime.

## 6. Frontend and backend stack

| Layer | Choice | Purpose |
| --- | --- | --- |
| Frontend | React + TypeScript | Typed component UI |
| Build/routing | Vite + React Router framework mode | Development, routes, build-time pre-rendering |
| Styling | Tailwind CSS + CSS variables | Responsive composition/design tokens |
| Motion | Motion for React; scoped GSAP if needed | UI and showcase animation |
| Icons | Small SVG/Lucide selection | Consistent lightweight assets |
| Backend | Node.js active LTS + Express + TypeScript | Contact API, cached profile data, health endpoints |
| Validation | Shared Zod schemas | API contracts/field validation |
| Database | PostgreSQL + Prisma | Durable contact processing and profile snapshots |
| Email | Resend behind an adapter | Server-side email handling |
| Verification | Vitest, React Testing Library, Supertest, browser E2E | Important behavior and journeys |
| Delivery | GitHub Actions, Node service, managed PostgreSQL | Repeatable release |

Choose compatible stable dependency releases at implementation time and commit the lockfile. Do not assume an unqualified latest package is stable. Prisma's reviewed documentation identifies default version 8 as a release candidate; explicitly pin a compatible stable release unless release status changes before implementation.

Pre-render the homepage and known project routes using React Router's Vite-based framework tooling. Put actual content and metadata in generated HTML and hydrate React for interaction. A plain SPA with client-only metadata would not reliably provide the intended project-specific social previews. This remains a React implementation without Next.js.

Keep profile, experience, skills, and case-study content in typed files shared with the pre-render build. Core pages render independently of the API; backend outages affect dynamic features rather than portfolio readability.

## 7. Backend contracts and behavior

| Endpoint | Purpose | Required behavior |
| --- | --- | --- |
| `POST /api/contact` | Name, email, subject, message | Validate, limit, deduplicate, persist, queue delivery |
| `GET /api/profiles` | Public links/cached available metrics | Source, scope, timestamp, stale state, fallback snapshot |
| `GET /api/health/live` | Process liveness | No sensitive diagnostics |
| `GET /api/health/ready` | Required-service readiness | Safe dependency status |

Contact workflow:

1. Validate client/server inputs and associate field errors with labels.
2. Apply honeypot, body/input bounds, and appropriate rate limits.
3. Use a submission identifier with a unique constraint so retries do not duplicate messages.
4. Persist a message and outbox entry atomically. Return `202 accepted` after durable persistence.
5. The UI says “Message received for delivery.” It does not claim inbox delivery.
6. A worker sends through the adapter, records provider acknowledgement, retries transient failures with bounded backoff, and uses provider idempotency where supported.
7. Handle validation, persistence failure, timeout, and rate-limit states; retain input on failure and offer email fallback.

Minimum database records:

- `ContactMessage`: id, submission key, name, reply email, subject, message, timestamps.
- `EmailOutbox`: message id, status, attempts, next-attempt time, provider id, safe error code.
- `ProfileSnapshot`: provider, public username, typed metrics, source, fetched timestamp, last successful update.

Keep secrets server-side. Escape email content, use a configured verified sender, and put the validated visitor address in reply-to. Log request IDs/result codes rather than full contact messages. Configure retention/pruning; do not expose a public message-read endpoint.

Resend production setup needs an API key and verified sending domain. Prepare the adapter and mock delivery tests before those are available. The production form is complete only after configured delivery is verified.

## 8. External profile data

GitHub: manually curate projects and optionally enrich public metadata through a backend refresh job. Query only configured repositories/usernames, keep tokens in secrets, set timeouts, cache results, and retain the last good snapshot during outages.

LeetCode/Codolio: include supplied links in release one. Show statistics only after verifying an available source. Prefer documented supported access; do not assume profile URLs are stable JSON APIs. If automation is unreliable, use a dated manually maintained snapshot. Omit unavailable values rather than converting them to zero.

Include source, last update, and scope for every metric. Do not sum duplicate problem counts across platforms or treat stars/contributions as a skill rating. An external outage affects only the metric panel.

Automated refresh is a later implementation task once adapters exist; this plan creates no scheduled Codex automation.

## 9. Repository structure

```text
Portfolio-Website/
  apps/
    web/
      app/
        routes/
        components/
        features/
        styles/
      public/
        projects/
        resume.pdf
        social/
      vite.config.ts
      react-router.config.ts
    api/
      src/
        routes/
        services/
        jobs/
        middleware/
        email/
      prisma/
  packages/
    content/
    contracts/
  tests/
  package.json
  pnpm-workspace.yaml
  .env.example
  README.md
```

Use one workspace/shared contracts. Finalize Prisma schema/migration conventions against the selected stable release. Copy the supplied resume into the public assets during implementation; downloads must work independently of the API.

## 10. Exactly four implementation phases

These four phases cover the entire project. Outputs in each phase are concrete review artifacts; acceptance checks are engineering completion criteria, not additional permission requests.

| Phase | Outcome | Estimate |
| --- | --- | --- |
| 1 - Content, design and architecture | Accurate personal story, project selection, desktop/mobile design, contracts | 2-3 days |
| 2 - Complete React frontend | Responsive pages, four featured case studies, library, all personal sections, base motion | 4-5 days |
| 3 - Backend and interactive integration | Working contact delivery, profiles, signature interaction and failure states | 3-4 days |
| 4 - Verification, deployment and replacement | Tested production build, social previews, deployed replacement, documented handoff | 2-3 days |

### Phase 1 - Content, design and architecture

Work: capture a recoverable snapshot of the existing repository; build a source-tagged content inventory; reconcile role dates/work mode, repository variants and team attribution. Gather a portrait if provided, project screenshots, logos/event media that can be used, resume and credential links. Prepare a focused MotionSites/Awwwards reference board, design tokens, desktop/mobile wireframes and hero/project visual prototypes. Define route/content models, API contracts and minimum database schema.

Deliverables: content inventory, selected/secondary project list, asset manifest, homepage and case-study mockups, architecture diagram, API/schema specification, and the agreed React/Vite workspace layout.

Exit checks: both internships and Mozilla roles are included with supported dates; four distinct featured projects are selected; duplicate AML repositories are grouped; attributed/prototype work is labelled; missing links/claims are identified without fabricated substitutes; every proposed section has a purpose and mobile composition.

### Phase 2 - Complete React frontend

Work: create the React/TypeScript/Vite/React Router workspace; implement design tokens, navigation, theme, responsive layout and route pre-rendering. Build the homepage, project library and four full case studies. Add Valsco/KrizPay timelines, Mozilla leadership, hackathons, certifications, coding links, education/about and resume. Implement filters, accessible galleries, copy-email, contact UI with mocked states, base transitions and keyboard navigation. Connect real typed content, not placeholder personal facts.

Deliverables: locally reviewable complete frontend, desktop/mobile views, generated route HTML, real resume download, supporting project entries and reusable components. Contact is explicitly mocked until Phase 3; it must not appear to have delivered a real message.

Exit checks: direct route loads work; all personal sections are populated; filters and keyboard/touch flows work; reduced motion works; four case studies contain role/architecture/evidence; no false credential/demo buttons; core content and per-project share metadata exist in generated HTML.

### Phase 3 - Backend and interactive integration

Work: implement Express/TypeScript, shared validation, PostgreSQL migrations, durable contact/outbox processing, email adapter, retries, idempotency, rate limits and health endpoints. Add cached profile responses with timestamps and fallbacks; retain manual LeetCode/Codolio values if supported access is unavailable. Connect real frontend states. Finish the signature SVG system canvas and scoped selected-work timeline. Add the quick-navigation palette; optionally include a local project explanation simulation if the main flows already pass.

Deliverables: integrated frontend/backend, schema/migrations, tested contact flow, configured or clearly identified mock email adapter, profile snapshot handling, finished desktop/mobile/reduced-motion interactions, `.env.example` and local run instructions.

Exit checks: durable acceptance and provider acknowledgement are distinct; duplicate retries do not duplicate messages; errors preserve input; stale profile data is labelled; credentials remain server-side; important API failure/retry tests pass; animation cleanup works. Verify configured email delivery when credentials are available. An absent credential remains a concrete production setup item, not a fake success.

### Phase 4 - Verification, deployment and replacement

Work: run production build/type checks and meaningful API/UI/browser tests; inspect narrow-screen and keyboard behavior, reduced motion, performance and image/font loading. Verify current claims and external links, complete metadata/OG artwork, migrations, environment configuration and email. Deploy a preview, smoke-test direct routes/contact/resume and replace the old public implementation. Remove obsolete active HTML/CSS/assets after the replacement passes, preserve Git history/recovery snapshot, and document release/rollback and content updates.

Deliverables: deployed React/full-stack portfolio, verification record with measured scores/remaining limitations, content-maintenance guide, deployment/rollback instructions and sharing-ready URL.

Exit checks: the definition of done below passes; production APIs and email are configured and verified; all real profile/source/credential links work or are omitted accurately; shared previews and deep links resolve; old code is absent from the active public build; handoff identifies any remaining external limitation explicitly.

Total estimate: approximately 11-15 focused working days with content/assets and service access ready. This is a planning range, not a fixed deadline. Optional 3D/simulations fit within Phase 3 only if they do not compromise required scope or performance.

## 11. Deployment and replacement

Recommended topology: one Node web service serving Express `/api/*` and pre-rendered React files from React Router's client build output, plus managed PostgreSQL. This gives frontend/backend one origin. Render is a candidate with documented Express support; choose the actual plan/region after checking operating costs and availability.

Serve generated route HTML before SPA fallback, cache hashed assets, and return real 404 responses. Verify metadata without browser JavaScript. GitHub Pages alone cannot host the Express backend.

Add titles, descriptions, canonicals, favicon, sitemap, robots file, Person JSON-LD with real profiles, and 1200 x 630 Open Graph/X artwork. Give each project its own share preview.

Replacement sequence during implementation:

1. Inspect repository status and preserve a recoverable snapshot of tracked/untracked user work and necessary assets outside the public build.
2. Build the new implementation with the repository's Git identity preserved.
3. Extract needed information and verify new routes, resume, assets, and contact behavior.
4. Remove old `index.html`, `web_style2.css`, obsolete assets, and legacy form code from the active site once their replacements work.
5. Deploy a preview, validate configuration, and switch the public URL to the new portfolio.
6. Preserve/redirect previously shared useful URLs when applicable and document rollback.

The final public site consists entirely of the new implementation. Recovery snapshots are excluded from deployment. No removal/cutover happens in this plan-only turn.

## 12. Definition of done

Frontend:

- Works at 360 px, tablet, and desktop widths without horizontal overflow.
- Identity, four featured projects, both internships, leadership, credentials, resume and contact are easy to find.
- Project filters, quick navigation and galleries work with keyboard/touch; duplicate repository variants do not inflate project totals.
- Keyboard/touch navigation, menu focus, copy-email, and reduced motion work.
- Readable contrast, semantic headings, meaningful alt text, visible focus states.
- No unresolved placeholder links, invented facts, or unlabelled illustrative demos.
- Resume/project direct visits and reloads work; unknown routes return useful 404s.
- Key content and share metadata exist in generated HTML.

Backend:

- Tests cover contact validation, duplicate retries, rate limits, database/email failure, and eventual retry.
- `202` means durable acceptance and matches UI wording.
- Migrations/health/readiness work in the target environment.
- Profile outages retain last-known values with accurate stale/unavailable states.
- Actual configured email delivery is checked before the form is called production-ready.

Performance/release:

- Target mobile Lighthouse Performance 90+ and Accessibility 95+ as lab checks.
- Aim for LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1; evaluate field data when available.
- Split optional motion/WebGL from the initial route bundle; optimize/reserve screenshot dimensions.
- Stop costly effects off-screen/inactive and honor reduced motion.
- Build/type checks and relevant behavior tests pass; key browser journeys have no application errors.
- Deployed contact, resume, route status, external links, caching, and share previews work.

## 13. Remaining inputs

Identity, resume, profile URLs, both internship dates, Mozilla progression and certification names are available. Remaining decisions: target job emphasis/current availability, whether either internship continued after the supplied 2025 dates, Valsco work mode, optional portrait, full-resolution project/event imagery, credential URLs not visible in screenshots, and exact individual contributions to team/inherited projects. Confirm CineBook test counts and enabled live-demo behavior against current source. These do not prevent foundation/layout work; no need to resend already supplied material.

Later deployment needs chosen hosting/database/email access. A site domain is optional; the proposed email setup needs a verified sending domain. This turn creates no accounts, buys no services, and sends no messages.

## Technical references

- [Vite](https://vite.dev/guide/)
- [React Router rendering](https://reactrouter.com/start/framework/rendering)
- [Motion reduced motion](https://motion.dev/docs/react-use-reduced-motion)
- [GSAP React integration](https://gsap.com/resources/React/)
- [Express](https://expressjs.com/en/starter/faq/)
- [Prisma setup/release status](https://www.prisma.io/docs/orm)
- [Resend Node setup](https://resend.com/docs/send-with-nodejs)
- [Render Express deployment](https://render.com/docs/deploy-node-express-app)
- [CineBook public repository](https://github.com/Mayank2142/ticket-booking)
- [Sentinel AML README](https://github.com/Mayank2142/Sentinel-AML/blob/main/README.md)
- [Sentinel AWS variant README](https://github.com/Mayank2142/Anti-Money-Laundering-Detection/blob/main/README.md)
- [SmartChat README](https://github.com/Mayank2142/SmartChat/blob/main/README.md)
- [CampusMate README](https://github.com/Mayank2142/Campus-Mate/blob/main/README.md)
- [Smart Helmet README](https://github.com/Mayank2142/Smart_Helmet/blob/main/README.md)
- [Operator-assistant prototype README](https://github.com/Mayank2142/Smart-Operator-Assistant-for-CAT-Machinery/blob/main/README.md)
- [Dependency project provenance](https://github.com/Mayank2142/Dependency-Risk-Console/blob/main/README.md)
- [Dincharya README](https://github.com/Mayank2142/sentient-calendar/blob/main/README.md)
- [KrizPay package configuration](https://github.com/Mayank2142/krizpay-home/blob/main/package.json)
- [Core Web Vitals](https://web.dev/articles/vitals)
