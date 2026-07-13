# Ovia Labs Documentation

Official documentation website for Ovia Labs, Ovia Protocol, and ChartLabs Pulse.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The site uses clean client-side routes. `vercel.json` rewrites all routes to `index.html` when deployed on Vercel.

## Adding a page

1. Add a Markdown file to `src/pages`.
2. Add its slug to the `docs` structure in `src/main.js`.
3. Optionally add a label to `pageLabels`.

## Adding a diagram

1. Add a template to `src/components/diagrams.js`.
2. Insert it in Markdown using:

```md
{{diagram:diagram-name}}
```
