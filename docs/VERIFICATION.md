# Local verification - 14 October 2026

## Automated checks

- Production build: frontend route pre-rendering and compiled Express server.
- TypeScript: frontend and backend checks pass.
- Contact integration: 10 tests pass, covering validation, honeypot, origin/body bounds, concurrent idempotency, content conflicts, persistence failure, rate limits, preview processing, retries and worker lease recovery.
- Compiled delivery: 4 tests pass, covering direct/trailing-slash project loads, initial HTML metadata/canonical URLs, missing routes, resume and loader-data serving, and configured-origin sitemap.

Windows sandbox restrictions required elevated local execution for package downloads, loopback tests and some generated build directories. No authentication, certificate validation, or security settings were disabled.

## Browser checks

- Desktop: homepage, system-layer selection, quick-navigation search and project navigation.
- Mobile: 390 px homepage/menu/contact; 320 px project library and light theme. No horizontal overflow in checked views.
- Filters: AI category originally returned three relevant projects (now two after SmartChat removal) and persists after reload through the query string.
- Contact: empty submission exposes field errors and focuses the first field; valid development submission receives durable acceptance with explicit preview-mode wording.
- Theme: light/dark switch updates the interface and preserves the chosen preference.
- Images: loaded project artwork in checked routes, with real source galleries and alt text.
- Screenshot inspection: accessible modal with a labelled close control.
- Application error logs: checked during key browser journeys.

## Production items remaining

The PostgreSQL adapter and migration are implemented but have not been exercised against a live PostgreSQL instance here. Configure and validate the database before public launch. Real email delivery is disabled; the local worker records preview processing. Set the provider credentials and verified sender, then validate actual delivery.

No public deployment, custom domain, external link availability audit, field Core Web Vitals or Lighthouse score is claimed. Project-specific social artwork and metadata are generated; social-platform previews need the final public origin.

More specific team contributions and missing credential URLs can be refined without inventing source evidence.
# Design refinement verification — 14 October 2026

- Production build and TypeScript checks passed after the motion and skills additions; 14 existing contact and route tests passed.
- Browser: skills tabs switch content and related case-study links; ArrowRight moves selection and focus. Motion off persists across reload and sets orbit animation to none.
- Responsive homepage reviewed at 390px. No horizontal overflow observed. Production container cannot be exercised because the installed Docker engine is stopped.
- Deployment files are prepared, not deployed. See `DEPLOYMENT.md` for release configuration and remaining live checks.


Final responsive review also covered a 320px-wide case study, skills-to-case-study navigation on the finished build, and the light theme. No horizontal overflow was observed. During a rebuild, an old browser tab briefly referenced removed hashed assets; reloading the completed build resolved navigation. Production releases should swap complete deployments atomically.

## Frontend cleanup verification

- SmartChat removal is checked through the missing-route response and sitemap regression assertions. Smart Helmet is featured and opens as a case study.
- Checked body sizes through computed browser styles; corrected older rules overriding About, Contact, case sidebar, and project-library copy.
- Browser review at desktop, 390px and 320px: no horizontal overflow in checked homepage/library/case-study views. Mobile/IoT filtering returns two projects.
- Production build, TypeScript checks, and 14 integration tests passed. No new public deployment or real email configuration is claimed.

## 15 October 2026 — certificates, type, contrast and motion

- Added both user-supplied IBM SkillsBuild Credly URLs; normalized trailing punctuation on the Threat Intelligence URL. Each linked credential has a visible Verify action.
- Rendered desktop text audit: 205 non-decorative text elements checked per theme, no contrast failures under the documented test scope and no audited text below 12px. Narrow-screen homepage and Smart Helmet case checks also passed; case-study source action is 16px.
- At 320px, document scroll width equals client width (305px with the browser scrollbar). Also visually reviewed the 390px layout.
- Confirmed skills arrow-key navigation, Mobile/IoT and AI filters, case-study navigation, and persisted motion-off state. Name/orbit animations resolve to none when motion is disabled.
- Fixed a reproduced hydration error on direct filtered-library URLs. Static HTML now matches the initial hydrated render before the browser query is applied. A fresh browser tab and reload of both filter categories showed the correct two projects with no console errors.
- Full build, final frontend build, frontend/backend TypeScript checks, and all 14 integration tests passed. The sandbox's generated-directory EPERM failure was resolved through approved execution.
- Saved desktop light/dark and mobile certificate previews in the ignored output directory. See DESIGN_REFERENCES.md for research links and implementation provenance.

## Contact placeholders and continuous motion — 15 October 2026

- Name/email placeholders now come from profile.name and profile.email: Mayank Gupta and mayankgupta17may@gmail.com. Fields remain empty until a visitor enters their own details.
- Removed the visible motion button and the stored portfolio pause preference. Device reduced-motion preferences still control animation suppression.
- Added accessible word wrappers for the hero name, desktop navigation/brand, and project titles. The letter wave repeats during hover or keyboard focus. Browser inspection confirmed word-wave has infinite iterations on a focused navigation link.
- Browser inspection confirmed infinite iterations for system-card bobbing, orbit rotation, skill-symbol movement and dot breathing. Desktop and 390px contact layouts have matching document/client widths, and the mobile form uses one column so the complete email example fits.
- Frontend build and frontend/backend TypeScript checks passed. The retained local preview uses the finished client build.

## Dribbble-inspired motion — 15 October 2026

- Built an original React/Motion glass magnifier for the hero name, with an idle path and spring-based pointer tracking. Its duplicate lettering is decorative; the page retains one accessible H1.
- Added a spring-following Explore badge on project artwork, animated section rules, a moving gradient atmosphere, page entrances, repeated scroll entrances, and a sliding mobile-menu entrance.
- Desktop browser inspection confirmed changing lens transforms, the looping gradient and section rule, and the visible project badge on pointer interaction. Light and dark themes were visually reviewed; no browser errors were recorded in the checked flow.
- At 390px and 320px, the document and viewport widths matched. The lens and pointer badge are hidden on narrow/coarse-pointer layouts; the mobile menu opens and closes. Reduced-motion suppression remains in CSS and MotionConfig and was reviewed in source, rather than through an emulated browser preference.
- The final frontend production build, frontend/backend TypeScript checks, and all 14 existing integration tests passed. A stale preview tab initially failed to connect; a fresh tab loaded the retained local server successfully.
- Saved the final desktop preview as `output/dribbble-motion-final-2026-10-15.png`. Research credits and the original implementation approach are recorded in `DESIGN_REFERENCES.md`.

## Leadership and achievement movement — 15 October 2026

- Added a shared milestone-card surface with a six-pixel floating loop, bounded pointer tilt, and a moving highlight. Each achievement uses a different loop offset. Intersection observation pauses the card/icon/highlight loops outside the viewport.
- The community icon has a rotating dotted ring; the award icons gently move and rotate. A travelling light and pulsing nodes animate the leadership timeline. Community, role and award titles retain semantic heading text and gain repeating hover waves.
- Browser inspection confirmed running achievement animations, the title hover wave and pointer tilt, and paused community-card animation after scrolling away. Decorative icons are hidden from the accessibility tree.
- Reviewed light/dark desktop presentation, 390px leadership, and 320px achievements. The checked mobile layouts use a single column, 17px body copy, and matching document/client widths (375px and 305px respectively). No console errors were recorded in this check.
- Frontend production build and frontend/backend TypeScript checks passed. No backend behavior changed. Device reduced-motion suppression is retained for all new loops.

## Hero bubble boundary fix — 15 October 2026

- Replaced the 60px horizontal pointer inset with the full 75px lens radius plus a 4px margin. The idle path now uses the same safe range and reaches both ends of the name. Removed outer hero clipping while retaining the atmosphere's own clipping.
- Browser checks at the first and last letters showed a complete 150px circle with positive clearance inside the name stage. Desktop, 601px and 390px checks showed no horizontal overflow; the lens remains hidden on phone layouts.
- Frontend production build and frontend/backend TypeScript checks passed. Saved the end-of-name preview as `output/bubble-boundaries-fixed-2026-10-15.png`.

## Page-wide cursor bubble — 15 October 2026

- Moved the single bubble to the shared application layout, outside the animated page surface. Passive pointer events drive spring values in viewport coordinates, so it follows across homepage sections and case studies. Viewport bounds keep the full circle visible near screen edges.
- Name magnification uses the same signature text/typography and measured viewport position. Away from the name the bubble becomes transparent, without blur. Pointer events pass through the decorative overlay; it is hidden on touch/narrow layouts and for reduced-motion preferences.
- Desktop browser checks confirmed one fixed bubble, matching name/copy font sizes, magnification over the name, and transparent mode on a case study and the contact form. On a fresh contact preview the bubble center matched the clicked name field center within one pixel, and the field received focus. Light/dark input focus remained usable.
- At 390px, the bubble was hidden and document/client widths both measured 375px. No browser errors were recorded in the checked case-study flow. The frontend production build, frontend/backend type checks, and all 14 existing integration tests passed.
- Saved the contact preview as `output/cursor-bubble-contact-2026-10-15.png`.

## Editorial frontend redesign — 16 October 2026

- Added the current warm-paper/botanical-ink theme layer in `modern.css`, mixed Manrope/Georgia typography, pill navigation/actions, an at-a-glance profile ribbon, and wide/compact project compositions. Experience, skills, leadership, achievements, credentials, education and contact surfaces share the new visual system. The React/Vite stack, all seven projects, content attribution and profile links remain intact.
- Replaced the hero system diagram with `HeroShowcase`: four real project previews, selectable tabs, bounded spring tilt, layered floating backplates and a rotating accent. Verified mouse selection, ArrowRight/End focus movement, all four preview states, and CampusMate case-study navigation.
- Browser review reproduced and corrected three layout issues: the rotating accent causing desktop overflow, minimum-content card widths causing 320px overflow, and a portrait image exceeding its preview container. Final measurements showed matching document/client widths at 1440px desktop and 320px homepage/library; the CampusMate image and preview heights matched.
- Reviewed light/dark themes, the 390px homepage/menu and the 320px project library/contact flow. Mobile/IoT filtering returned Smart Helmet and CampusMate with the correct pressed button. Empty contact submission displayed validation messages and focused the name field. The page-wide cursor bubble remains decorative and touch layouts hide it.
- Frontend production build, frontend/backend TypeScript checks, and all 14 existing contact/compiled-route tests passed. No browser console errors were recorded in the checked desktop flow. Reduced-motion behavior was retained in source; no fresh system-preference emulation or comprehensive accessibility/performance score is claimed.
- Saved light and dark desktop previews under `output/modern-portfolio-*-2026-10-16.png`. This is a local frontend update; public deployment and external delivery configuration remain separate release requirements.
