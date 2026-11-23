# Cyber Pulse Daily

A professional, privacy-friendly cybersecurity intelligence briefing for GitHub Pages.

## Features

- Hourly RSS intelligence refresh with fallback content
- Threat category, region, and activity visualizations
- Priority scoring, CVE extraction, confidence labels, and source provenance
- Personal watchlists and saved-story collections stored locally
- Briefing profile personalization
- Search, category filtering, sorting, compact view, print/PDF, and executive brief copy
- Advisory timeline and regional/global coverage views
- PWA manifest and offline asset caching
- Last-known-good story cache and provider health reporting
- Manual feed refresh control
- Responsive, keyboard-friendly, reduced-motion, and print styles
- Browser smoke-test suite under `tests/`
- Story-aware adaptive knowledge checks with explanations and topic review
- Local best-score, attempt count, and weak-topic progress tracking
- Optional Runway Gen-4.5 cinematic reenactment for a selected live incident; generation is user-triggered, server-side, protected by Turnstile, and reports estimated/final provider cost
- Text-free, instructor-led whiteboard lessons keep one complete 16:9 scene in view while context, incident, impact, and response are drawn in sequence; the instructor points to each beat, the response returns to the affected system, and topic-matched people, symbols, and settings build one causal scene while earlier events remain visible; captions stay outside the drawing and optional device narration quality varies by device

## How to view it
Open [index.html](index.html) in a browser.

## Run locally

```powers
python -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Deployment

The static site can be hosted through GitHub Pages. Live content uses public RSS feeds through the RSS-to-JSON endpoint and falls back to curated sample stories when live sources are unavailable. AI video generation requires Cloudflare Pages Functions; GitHub Pages cannot host the secure provider endpoint, so the feature remains disabled on GitHub Pages.

### Enable AI-generated incident video

The optional video generator sends the selected story's headline, summary, category-derived scene, and response to [Runway Gen-4.5](https://docs.dev.runwayml.com/). It creates one five-second, 720p illustrative reenactment; generated footage is not evidence or a depiction of the actual incident. The user must explicitly request each clip. Runway's published rate is 12 credits per second and credits cost $0.01 each, so a five-second clip is approximately **$0.60**. Runway may change pricing, and the API's estimate is returned with each task. Its developer account currently requires a minimum $10 credit purchase.

To enable the feature:

1. Deploy this repository as a [Cloudflare Pages](https://developers.cloudflare.com/pages/) project connected to GitHub. Set the project root and static build output directory to the repository root (`.`); no build command is needed. Pages Functions under `functions/` provide the same-origin API endpoints.
2. Create a [Runway Dev project and API key](https://docs.dev.runwayml.com/guides/setup/), add credits, and set project spending limits. In Cloudflare Pages, add `RUNWAYML_API_SECRET` as a secret environment variable.
3. Create a [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) widget for the Pages hostname. Set `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in the Pages environment. Both keys are required; the secret stays server-side.
4. Add a Cloudflare rate-limit rule for `POST /api/video/generate` before making a public deployment. Turnstile helps prevent automated use, but is not a spending limit.

The app's current GitHub Pages URL will not execute these API functions. Until the site is deployed with the secrets above, AI generation shows a disabled/setup message and makes no provider request. Successful Runway result URLs are temporary (24–48 hours), so download clips you want to keep.

Once the repository is published with GitHub Pages, the site will be available at:

https://kautilyagupt.github.io/advisories/
Cache-busting: `index.html` references versioned CSS and JavaScript assets to force browsers to fetch updates after deployments.
