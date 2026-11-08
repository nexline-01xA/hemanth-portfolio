# Hemanth Nomula — Portfolio

AI/ML engineering and AI systems portfolio at https://hemanthn.in.

## Development

```sh
npm ci
npm run dev
npm run lint
npm run build
```

React and Vite with plain CSS and live Three.js artwork. Content lives in `src/data`, page sections in
`src/sections`, and styles in `src/styles`. The resume is
`public/Hemanth-Nomula-Resume.pdf`; `public/resume.pdf` provides the same PDF for older links.
Update both files together.

## 3D artwork and motion

`src/graphics/scenes.js` renders the hero's orbital core and four project sculptures.
The graphics module loads separately from the page content, and each scene initializes
when approaching the viewport. Animation stops offscreen and in background tabs.
Device pixel ratio is capped on phones. The navigation includes a motion toggle,
and the initial state respects the visitor's reduced-motion preference.
CSS artwork remains visible when WebGL is unavailable; project links and case studies
work independently of the renderer. The cinematic theme is in `src/styles/cinematic.css`.

## Deployment

```sh
npm run deploy
```

This builds the app and publishes `dist` to the repository's `gh-pages` branch.
GitHub Pages serves that branch at https://hemanthn.in. Keep `public/CNAME`
set to `hemanthn.in`, and keep Vite's `base` set to `/` for the custom domain.
The domain uses BigRock DNS and already points to GitHub Pages.

Copyright Hemanth Nomula. All rights reserved.

## Page structure (November 2026)

The name-led home page links to `/work/`, `/research/`, `/about/`, and `/contact/`. Each flagship project has a full case study at `/work/<project-id>/`. Navigation uses ordinary links. `scripts/static-pages.mjs` emits directory entrypoints, unique titles/canonical URLs, a sitemap, and a 404 page after Vite builds, so GitHub Pages can serve direct links and reloads.

The home visual is a conceptual animated processing board. Project-specific Three.js scenes remain on the Work page. Motion respects system preference and retains the visitor's pause setting across page navigation for the current session.
