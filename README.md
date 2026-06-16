# Bashford Tenant App

A small mobile-first web app that serves as the tenant home base for 5716 Bashford Crest Ln, Raleigh, NC.

## Run locally

```bash
npm install
cp .env.example .env  # then edit values
npm run dev           # http://localhost:5173
```

## Configuring credentials

The login gate compares against two env vars, read at build time:

```
VITE_APP_USERNAME=...
VITE_APP_PASSWORD=...
```

Put them in `.env` (gitignored) for local dev, and in your host's environment-variable settings for production. **These ship in the client bundle** — see the security note below.

## Editing content

All editable content (rent amount, wifi, utility info, house manual, neighborhood guide, etc.) lives in **one file**: `src/config/property.ts`. The file is typed — your editor will tell you if a field is missing. Items marked `TODO:` need landlord input.

## Adding documents

Drop PDFs into `public/docs/` using the filenames referenced in `property.documents[].file`. Defaults: `lease.pdf`, `inspection.pdf`, `welcome.pdf`, `utilities.pdf`, `deposit.pdf`. To rename or add documents, edit the array in the config file.

## Adding photos

Drop images into `public/images/` and reference them from the config (`heroPhoto`, `manual[].photo`, etc.) by path like `/images/hero.jpg`.

## Deploying

The app is a pure static site. Recommended: Vercel or Netlify.

1. Push the repo to GitHub.
2. Create a new project on Vercel / Netlify and point it at the repo.
3. Build command: `npm run build`. Output dir: `dist`.
4. In the project's env-var settings, add `VITE_APP_USERNAME` and `VITE_APP_PASSWORD`.
5. Deploy.

If you use React Router with `BrowserRouter` (as configured), add a SPA fallback so deep links work: on Vercel, this is automatic; on Netlify, add `/*  /index.html  200` to `public/_redirects`.

## Security note (important)

The password gate is **light client-side protection** — anyone who downloads the bundle can extract the credentials. It deters casual access only. Do not put truly sensitive data (SSNs, bank account numbers, full financial documents) behind it. The lease PDF, house manual, wifi password, and landlord phone number are fine; treat anything beyond that case-by-case.

## Tech

Vite · React · TypeScript · Tailwind · React Router · lucide-react
