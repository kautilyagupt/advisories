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
- Text-free, instructor-led whiteboard lessons that pan across one connected 16:9 scene as context, incident, impact, and response are drawn; the people and symbols adapt to the topic, earlier events recede as the story progresses, captions stay outside the drawing, and optional device narration quality varies by device

## How to view it
Open [index.html](index.html) in a browser.

## Run locally

```powers
python -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Deployment

The repository can be hosted through GitHub Pages. Live content uses public RSS feeds through the RSS-to-JSON endpoint and falls back to curated sample stories when live sources are unavailable.

Once the repository is published with GitHub Pages, the site will be available at:

https://kautilyagupt.github.io/advisories/
Cache-busting: `index.html` references versioned CSS and JavaScript assets to force browsers to fetch updates after deployments.
