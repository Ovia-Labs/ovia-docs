# Ovia Labs Documentation

Source of https://docs.ovialabs.xyz: the documentation and whitepaper for Ovia Labs, Ovia Protect, Ovia Network and the proposed OVIA Token.

## Local development

```bash
npm install
npm run dev       # builds, watches and serves on http://localhost:4174
npm run build     # production build into dist/
npm run preview   # serves the existing dist/ build
```

Requires Node 20 or newer.

## Structure

| Path | Purpose |
|---|---|
| `content/*.md` | Pages. Front matter: `title`, `description`, `status`, `related` |
| `content/nav.json` | Sidebar groups and page order (also sets previous/next) |
| `content/meta.json` | Docs version, update date, component status, revision history |
| `content/roadmap.json` | Roadmap phases and milestones |
| `client/` | Browser code and styles. `client/brand.css` is a copy of `ovia-website/src/brand.css`: keep both in sync |
| `public/` | Favicons, logos, social image and the self-hosted font |
| `scripts/build.mjs` | Static site generator (Markdown → HTML, search index, sitemap, robots) |
| `scripts/dev.mjs` | Local server with clean URLs and the 404 page |

The build fails on a missing page, a broken internal link or anchor, or an unknown related page.

## Adding a page

1. Add `content/<slug>.md` with front matter.
2. Add the slug to a group in `content/nav.json`.

## Markdown extensions

- Callouts: `> [!NOTE|STATUS|WARNING|LIMITATION|PROPOSAL|OPEN] Title`
- Status badges: `{{status:planned}}` (see `STATUS` in `scripts/build.mjs`)
- Blocks: `{{roadmap}}`, `{{status-table}}`, `{{revisions}}`, `{{whitepaper-meta}}`, `{{whitepaper-contents}}`

## Deployment

Vercel, configured by `vercel.json`: build `npm run build`, output `dist`, clean URLs, no trailing slashes, security headers and permanent redirects from the URLs of the previous documentation site. Domain: `docs.ovialabs.xyz`.

Internal documents such as PRDs do not belong in this repository. They live in the separate `ovia-internal` folder.

## Versioning

Update `docsVersion`, `updated` and `revisions` in `content/meta.json`, and describe the release in `content/resources/changelog.md`.
