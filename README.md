# Elsewhere Travel

A complete, responsive travel agency frontend with a distinct editorial identity: warm ivory, forest navy, sunset orange, immersive local photography, and self-hosted DM Sans / Cormorant Garamond typography.

**This is a demonstration, not an operating travel agency.** No reservations, payments, visa applications, emails, or subscriptions are created. All prices, ratings, profiles, traveler stories, statistics, contact details, properties, vehicles, and airline itineraries are illustrative.

## Features

- Cinematic homepage with destination discovery, four services, illustrative animated statistics, packages, traveler-story carousel, and newsletter.
- Dedicated flight, hotel, visa, and car service pages with distinct supporting layouts.
- Four search modes with accessible keyboard tabs, contextual fields, native date pickers, passenger/guest/room selection, Zod validation, loading states, empty states, and sample results.
- Flight itinerary dialogs; hotel detail dialogs; car-category filters and detail dialogs; contextual visa inquiries.
- Six destination detail pages with local guidance and prefilled hotel search.
- About, Contact, Privacy, Terms, and a custom 404 page.
- Validated contact inquiries and newsletter interactions with explicit mock success feedback.
- Sticky navigation, accessible service dropdown, animated mobile menu, Escape handling, and focus trapping in mobile navigation and dialogs.
- Scoped GSAP entrance and ScrollTrigger reveals, animated counters, reduced-motion support, image zoom, and restrained hover feedback.
- Next.js image optimization, local fallback artwork, self-hosted fonts, route metadata, Open Graph, sitemap, robots, and SVG icon.
- Responsive layouts from 320px to wide desktop.

## Stack and compatibility

- Next.js 16 App Router, React 19, TypeScript.
- Tailwind CSS 4 plus purpose-built CSS design tokens and responsive layouts.
- GSAP, ScrollTrigger, `@gsap/react`.
- Lucide React, React Hook Form, Zod, and the Zod form resolver.
- ESLint with the Next.js core-web-vitals and TypeScript configurations.
- Node's built-in test runner for validation regression tests.

Dependencies were resolved from npm's current stable tags. TypeScript is intentionally on **6.x** because the installed TypeScript ESLint parser does not support 7.x. ESLint is on **9.x** because the current import, accessibility, and React lint plugins do not declare support for ESLint 10. Exact resolutions are committed in `package-lock.json`.

Build and development use the supported **Webpack** compiler because Turbopack's CSS worker failed in the local Windows environment. The application uses standard Next.js APIs and deploys normally on Vercel.

## Start locally

Use Node.js **22.18 or newer** (Node 24 LTS recommended), and npm. The test command uses Node's built-in TypeScript stripping.

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No API keys, backend, database, or environment variables are required to explore the site. Local photos and fonts are included, so production builds do not need to download design assets.

## Commands

```sh
npm run dev        # local development
npm run lint       # ESLint, zero warnings allowed
npm run typecheck  # strict TypeScript check
npm run test       # date, itinerary, guest, contact, email validation tests
npm run build     # optimized production build
npm run start     # serve the production build
```

With a server running, verify every route, 404 behavior, local image, and Next.js image optimization:

```sh
node scripts/check-routes.mjs
```

Or start an isolated production server, run the same read-only checks, and automatically stop it:

```sh
node scripts/verify-production.mjs
```

Set `TEST_BASE_URL` to test a different origin. On restricted Windows environments, the build may need permission to create Next.js's generated route-segment folders inside `.next`.

## Production

```sh
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
npm run start
```

Set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS production origin for correct sitemap, robots, and social-image URLs. See `.env.example`; never commit secrets. The default is the local development origin and must be replaced for a public deployment.

## Project structure

```text
src/
  app/
    layout.tsx, page.tsx, globals.css
    about/, contact/
    destinations/page.tsx
    destinations/[slug]/page.tsx
    services/[service]/page.tsx
    [legal]/page.tsx
    fonts/
    not-found.tsx, robots.ts, sitemap.ts
  components/
    animations/AnimationProvider.tsx
    home/DestinationGrid.tsx, Testimonials.tsx
    layout/Navbar.tsx, Footer.tsx
    search/TravelSearch.tsx, SearchResults.tsx, DetailModal.tsx
    shared/Photo.tsx, SectionHeading.tsx, Forms.tsx, FAQ.tsx
  data/travel.ts
  lib/validations.ts
public/
  images/             # 15 local photographs and SVG fallback
  icon.svg
scripts/
  check-routes.mjs
  download-images.ps1 # optional asset refresh, requires network
  download-fonts.ps1  # optional asset refresh, requires network
tests/validations.test.ts
```

## Verification record

Production build, zero-warning ESLint, strict TypeScript, and all nine validation tests pass. The production HTTP smoke suite verifies 19 page/metadata URLs, correct 404 behavior, all 15 photographs, and Next.js image optimization.

Interactive browser QA was blocked by the browser approval system when access to the localhost preview was declined. Consequently, visual screenshots, runtime browser console/hydration checks, interactive keyboard checks, and measured responsive overflow/Lighthouse scores have **not** been verified. No browser approval restriction was bypassed. Before release, manually check all four tabs, result dialogs, car filters, carousel, newsletter/contact states, FAQ disclosures, mobile navigation, and reduced motion at 320, 375, 768, 1024, and 1440px.

The dynamic service and destination routes are statically generated from centralized data. Contact uses server-side search parameters to prefill an inquiry. Layouts and editorial content remain server components; forms, navigation, image fallback handling, carousel, and animation boundaries are interactive client components.

## Mock behavior

Search forms validate past/impossible dates and reversed return/check-out dates. Flights reject identical cities. Hotel rooms cannot exceed guest count. Each form waits approximately 800ms before showing sample results. Search for `Antarctica`, `Atlantis`, `nowhere`, or `no results` to exercise the empty state. Other destinations show illustrative data; hotel/property and airline data do not represent actual destination-specific availability.

Flight prices are **per person, one way**; hotels **per room, per night**; cars **per day**; packages and destination starting prices **per person**. All prices use USD. Selected traveler counts, cabin category, dates, and locations are shown in the results and carried into contextual inquiries. No return flight is quoted, no final booking total is promised, and taxes/extras are not calculated.

The car search filters on the selected vehicle category. Results provide a second category filter and a resettable empty state. Detail dialogs support Escape, focus trapping, focus restoration, and close-on-backdrop. Inquiry links open a prefilled contact subject.

Contact and newsletter forms show a simulated completion after validation. Input is held only in browser memory; there are no network submissions, persistent storage, email delivery, cookies, analytics, external social profiles, or payment integrations. Social icons open a clearly labeled inquiry about sample channels. The email uses a reserved `.example` domain, and the phone is fictional.

Visa checklists are general illustrative content, not current immigration advice. Only a government authority can decide eligibility or issue a visa.

## Animation and accessibility

`AnimationProvider` uses `useGSAP`'s scoped `gsap.context()` lifecycle with `revertOnUpdate`, route dependencies, and a `gsap.matchMedia` reduced-motion query. Cleanup removes ScrollTriggers and reverts animation styles on unmount or route changes, including Strict Mode. Animation-only counters do not use React state. Content is server rendered and remains available when motion is reduced.

The interface includes semantic landmarks, a skip link, visible focus indicators, labeled fields, inline errors linked with `aria-describedby`, tab/tabpanel relationships, keyboard arrow navigation, native FAQ disclosure controls, live form/result feedback, and appropriate button names. The desktop layout reflows into dedicated mobile compositions rather than scaling down.

## GitHub and Vercel deployment

No GitHub or Vercel CLI credentials were available in the workspace, so **no repository URL or live Vercel URL is claimed**. The source is ready to publish after authentication. These are the exact remaining steps.

### Publish the repository

Install [GitHub CLI](https://cli.github.com/), then run from the project root:

```sh
git init -b main
git add .
git commit -m "Build Elsewhere travel experience"
gh auth login
gh repo create elsewhere-travel --private --source=. --remote=origin --push
gh repo view --json url --jq .url
```

Choose a different repository name if that name already exists. Use `--public` only if you intend to publish the source publicly. The last command prints the real GitHub URL. See the [official repository creation manual](https://cli.github.com/manual/gh_repo_create).

### Deploy to Vercel (recommended Git integration)

1. Sign in at [Vercel](https://vercel.com/new) and import the repository.
2. Select the **Next.js** preset; use the repository root as the root directory.
3. Use `npm ci` as install command and `npm run build` as build command. Keep the default Next.js output handling and select Node 24 (or a supported Node version at least 22.18).
4. Deploy. Vercel returns the actual live URL.
5. Add `NEXT_PUBLIC_SITE_URL` with that HTTPS origin in project environment variables and redeploy so the sitemap and Open Graph URLs match production.
6. Subsequent pushes create deployments automatically.

See [Vercel deployment documentation](https://vercel.com/docs/deployments).

Alternatively, from an authenticated terminal:

```sh
npx vercel@latest login
npx vercel@latest
npx vercel@latest env add NEXT_PUBLIC_SITE_URL production
npx vercel@latest --prod
```

The preview command links the project and returns its address. Enter your actual production origin when adding the environment variable. The final command returns the live deployment URL. See the [official CLI deployment guide](https://vercel.com/docs/projects/deploy-from-cli).

## Assets

Travel imagery is downloaded from [Unsplash](https://unsplash.com/) and used as illustrative editorial photography. Exact source photo IDs are recorded in `scripts/download-images.ps1`. Named sample properties/vehicles and traveler profiles are not claims about what a photograph depicts. A local SVG landscape provides a graceful image fallback.

DM Sans and Cormorant Garamond are distributed by [Google Fonts](https://fonts.google.com/) under the SIL Open Font License; font license notices are included in `src/app/fonts/`. No runtime font requests are required.

## Before using as a real business

Replace all sample claims, contacts, profiles, testimonials, rates, and policies with verified business content. Connect approved booking providers and server-side submission handling, define real terms and privacy practices, and verify official visa guidance. The present frontend deliberately makes no real-world availability, processing, or booking promises.
