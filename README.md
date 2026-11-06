# Hemanth Nomula — Portfolio

AI/ML engineering and AI systems portfolio at https://hemanthn.in.

## Development

```sh
npm ci
npm run dev
npm run lint
npm run build
```

React and Vite with plain CSS. Content lives in `src/data`, page sections in
`src/sections`, and styles in `src/styles`. The resume is
`public/Hemanth-Nomula-Resume.pdf`; `public/resume.pdf` provides the same PDF for older links.
Update both files together.

## Deployment

```sh
npm run deploy
```

This builds the app and publishes `dist` to the repository's `gh-pages` branch.
GitHub Pages serves that branch at https://hemanthn.in. Keep `public/CNAME`
set to `hemanthn.in`, and keep Vite's `base` set to `/` for the custom domain.
The domain uses BigRock DNS and already points to GitHub Pages.

Copyright Hemanth Nomula. All rights reserved.
