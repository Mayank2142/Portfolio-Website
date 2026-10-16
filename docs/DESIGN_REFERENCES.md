# Design refinement — 15 October 2026

## References reviewed

- [MotionSites portfolio gallery / Parallex](https://motionsites.ai/?prompt=parallex): public visual reference for layered depth, clear focal typography, and restrained motion. The public interface exposes a free prompt action, but source-code download requires a paid plan. No paid source package was accessed. The React components in this checkout are original implementations.
- [Dennis Snellenberg](https://dennissnellenberg.com/): reference for typography, generous spacing, project presentation, and responsive interactions. [Awwwards' listing](https://www.awwwards.com/inspiration_search/transitions/?page=240) identifies its 2022 Site of the Day / Developer Award. No source or personal imagery was copied.
- [Motion scroll animation documentation](https://motion.dev/docs/react-scroll-animations): API reference for scroll progress, spring smoothing, and bounded image parallax.
- [Motion configuration](https://motion.dev/docs/react-motion-config): reduced-motion behavior. Device reduced-motion preferences suppress custom pointer transforms and CSS animation; the visible motion toggle was subsequently removed at the user’s request.

## Implementation

`refinements.css` contains the earlier theme/type layer; `modern.css` now defines the current editorial art direction. `magnetic.tsx` adds spring pointer response to the hero actions. Project visuals use bounded pointer tilt and a 24px total image-parallax range. Name reveals, scroll entrances and the shared skills indicator complete the animation system. Touch input keeps stable cards; reduced motion removes transform animation. Normal text stays fully opaque during scroll reveals.

Removed: placeholder initials artwork, repeated introduction strip, fake browser bars, decorative certificate counters/categories, and repeated contact slogan. Real profile information, résumé, project attribution and prototype limitations remain available.

## Certificates

- Cybersecurity Fundamentals: https://www.credly.com/badges/93c69897-b16b-433a-8fb5-959c63a53380/public_url
- Getting Started with Threat Intelligence and Hunting: https://www.credly.com/badges/60971b73-2318-440f-9c99-0bc91bb711a8/public_url

The mappings come from the user-supplied screenshots and links. The punctuation period after the second URL was removed. No issue date, expiry date, credential identifier or recipient data has been inferred from incomplete browser loading.

## Verification scope

Both themes receive a rendered-text contrast audit using computed foreground/background colours, plus desktop and narrow-screen visual checks. The audit excludes screenshot content, hidden/decorative elements, gradients over images, and animation transition frames; it is not a comprehensive accessibility certification. Native keyboard checks cover navigation, skills tabs, certificate links and reduced-motion preference persistence.

## Purrweb / Dribbble motion reference

[Landing | Designer portfolio by Purrweb](https://dribbble.com/shots/19871911-Landing-Designer-portfolio) was reviewed on 15 October 2026. The reference describes an interactive magnifying glass and gradient; its visible preview provided the art direction for this addition. Interface and motion are credited on the reference to Anya Milovanova and Vladislav Blinov. No reference artwork, video or source code was copied.

The local adaptation adds an original spring-following hero lens with a 1.32× typography duplicate clipped inside glass, a slow idle path, blue/mint/violet atmospheric depth, an Explore cursor on project previews, repeated scroll entrances, animated section rules, and page/mobile-menu entrances. The lens and preview cursor are decorative, ignore pointer events, and are hidden on coarse input, narrow screens and reduced-motion devices. The document retains a single accessible hero heading. The footer sentence and visible motion toggle remain removed.

## Editorial frontend direction — 16 October 2026

The new composition is original: warm paper and botanical ink themes, Manrope paired with a system Georgia italic, layered previews of existing project artwork, and a mix of full-width and compact project cards. The hero showcase replaces the earlier system-layer diagram and supports four selectable projects with keyboard navigation. Its backplates, rotating accent and pointer response use CSS/Motion rather than new rendering dependencies. No third-party template, paid animation source, or reference artwork was copied.

The full project inventory, internship/leadership facts, credential links and attribution remain sourced from the existing content model. The at-a-glance ribbon counts the current project array and summarizes the two documented internships; it does not add visitor, customer, performance or availability claims.
