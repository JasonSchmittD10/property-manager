# Bashford Tenant App

A small mobile-first web app that serves as the tenant home base for 5716 Bashford Crest Ln, Raleigh, NC.

## Run locally

```bash
npm install
npm run dev           # http://localhost:5173
```

## Configuring credentials

The login gate compares against `appAccess.username` / `appAccess.password` in [`src/config/property.ts`](src/config/property.ts). Edit those values directly — no `.env` to maintain.

These ship in the client bundle (see security note below), so this is "deter casual access" protection, not real security.

## Editing content

All editable content (rent amount, wifi, utility info, house manual, neighborhood guide, etc.) lives in **one file**: `src/config/property.ts`. The file is typed — your editor will tell you if a field is missing. Items marked `TODO:` need landlord input.

## Adding documents

Drop PDFs into `public/documents/` and reference them from `documents[].file` in the config (e.g. `/documents/lease.pdf`). Leave `file` as `""` if you haven't added the PDF yet — the row renders as "Coming soon" until you do.

## Adding photos

Drop images into `public/photos/` and reference them from the config (e.g. `property.heroPhoto`, `houseManual[].photo`) by path like `/photos/bashford-hero.jpg`.

## Deploying

The app is a pure static site. Recommended: Vercel or Netlify.

1. Push the repo to GitHub.
2. Create a new project on Vercel / Netlify and point it at the repo.
3. Build command: `npm run build`. Output dir: `dist`.
4. Deploy. (No env vars to configure — credentials live in the config file.)

If you use React Router with `BrowserRouter` (as configured), add a SPA fallback so deep links work: on Vercel, this is automatic; on Netlify, add `/*  /index.html  200` to `public/_redirects`.

## Security note (important)

The password gate is **light client-side protection** — anyone who downloads the bundle can extract the credentials. It deters casual access only. Do not put truly sensitive data (SSNs, bank account numbers, full financial documents) behind it. The lease PDF, house manual, wifi password, and landlord phone number are fine; treat anything beyond that case-by-case.

## Tech

Vite · React · TypeScript · Tailwind · React Router · lucide-react
