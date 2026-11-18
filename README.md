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
- Responsive, keyboard-friendly, reduced-motion, and print styles

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
Cache-busting: `index.html` now references `style.css?v=c22533d` and `script.js?v=c22533d` to force browsers to fetch updated assets after deployments.
