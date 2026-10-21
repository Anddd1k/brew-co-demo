# Verification — 21 October 2026

The original local verification precedes the owner-approved release. Current publication status and live checks are recorded at the end of this document.

| Check | Result |
|---|---|
| TypeScript strict check | Passed |
| ESLint, TypeScript/React Hooks/JSX accessibility | Passed |
| Production build | Passed |
| HTTP route/link/header smoke checks | Passed |
| npm audit, production + development dependencies | 0 known vulnerabilities reported |
| Gitleaks 8.30.1 staged source scan | No leaks found |
| Gitleaks complete initial Git history scan | One source commit scanned; no leaks found |

The final documentation commit is also included in the complete history scan during release packaging; see the accompanying release report for its count and final commit ID.

## Browser checks

Category filtering (Iced and Bakery), add/increase/decrease/remove, empty bag, Escape, mobile menu and demo checkout. A $17.50 bag correctly became $10.50 after quantity/removal changes; the receipt showed 3 items / $10.50 and explicitly no charge or order transmission. A fresh 320 px test added and removed a $3.00 espresso. Console was clean.

## Lighthouse 13.5.0 — mobile navigation

Local production server, headless Chrome 123, simulated mobile/network/CPU settings. These are measurements, not guaranteed production scores.

| Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|
| 94 | 100 | 100 | 63 |

SEO is reduced by intentional noindex/robots rules before approved publication. The portfolio enables canonical, hreflang, sitemap and indexing only after a real domain is configured. Demos are intentionally noindex. Lighthouse reports and initial diagnostic runs accompany the release package. Some runs reported that the host CPU was slower than expected; performance varies with device, server warmth and concurrent load.

## Fixes and limits

Known findings were corrected: vulnerable development glob dependency chain, insufficient text contrast, visible/accessibility label mismatches, small link targets, mobile table overflow and an SVG title hydration mismatch. Overview charts use lightweight plots of the same sample data; the Analytics view loads Recharts on demand. Motion features and portfolio fonts load through lighter paths.

Responsive browser dimensions were tested, not physical phones. A complete manual screen-reader audit, unavailable-storage fault injection and gesture-based drag testing were not performed. Keyboard-accessible status controls were exercised. No real backend, payment or external account was tested because none is connected. Real contact copy actions remain untested until the owner supplies contact details. SmokeReset was verified from owner confirmation and public Google Play material, not by running or inspecting its private Android source.

## Reproduce

```sh
npm ci
npm run typecheck
npm run lint
npm run build
npm run start -- --port 3101
# In another terminal, set VERIFY_URL if using a non-default port:
node scripts/verify.mjs
```

Use npm.cmd on Windows PowerShell when needed. Gitleaks reports are redacted. Ignore rules and the tracked-file audit exclude environment files, signing material, dependencies, builds and private app code.

## Approved public release — 21 October 2026

Repository: https://github.com/Anddd1k/brew-co-demo

Live demo: https://brew-co-demo.vercel.app

Production HTTPS route/assets/headers smoke checks passed. Browser checks: Iced filter, bag quantity 2, $11.00 demo receipt, mobile navigation at 390 px and clean console. No real payment or order submission.

Owner explicitly approved public repository creation and publication of the two demos. Before push, full Git history and exported tracked source were rescanned with Gitleaks: no findings. Ignore rules and upload manifests excluded environment files, dependency/build folders and signing material. No SmokeReset source is included. Earlier local QA below is retained as dated verification history.
