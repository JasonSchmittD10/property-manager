# Sveltia CMS — one-time setup

The Bashford tenant app has a built-in admin UI at `/admin` powered by
[Sveltia CMS](https://github.com/sveltia/sveltia-cms). Landlords (Jason & Abby)
can edit safe content — welcome note, announcements, guide spots, house manual,
PDFs, photos, etc. — from any device. Edits commit straight to GitHub and
Vercel redeploys in ~60 seconds. No code editing, no copy/paste.

This document covers the **one-time setup** Jason has to do to turn it on. Once
done, neither landlord ever touches code again.

## What's already wired up

- `public/admin/index.html` — loads Sveltia CMS from a CDN.
- `public/admin/config.yml` — describes every editable collection.
- `src/content/*.json` — the editable content files. The CMS writes here.
- `src/config/property.ts` — imports each JSON file and re-exports it under the
  existing TypeScript interfaces, so a malformed save fails the Vercel build
  loudly instead of shipping broken content.
- `vercel.json` — excludes `/admin` from the SPA fallback so the CMS HTML loads
  instead of the React app.
- `public/photos/` and `public/documents/` — where uploaded media + PDFs land.

The only things you have to do are stand up the OAuth bridge (one-time, free)
and tell `config.yml` about it.

## Step 1 — Deploy the Sveltia OAuth worker on Cloudflare (free)

Sveltia is a client-side SPA, so it needs a tiny serverless function to
complete the GitHub OAuth handshake. The official one is open source.

1. Sign in at <https://dash.cloudflare.com> (free tier is plenty).
2. Open <https://github.com/sveltia/sveltia-cms-auth> and follow the README's
   "Deploy with Cloudflare Workers" button (or `wrangler deploy` if you prefer
   CLI).
3. After deploy, copy the Worker URL — it looks like
   `https://sveltia-cms-auth.YOUR-SUBDOMAIN.workers.dev`. No trailing slash.

Leave this tab open — you'll set env vars on it in Step 2.

## Step 2 — Register a GitHub OAuth App

1. Go to <https://github.com/settings/developers> → **OAuth Apps** → **New OAuth App**.
2. Fill it in:
   - **Application name:** `Bashford CMS` (anything — landlords won't see it)
   - **Homepage URL:** your Vercel domain (e.g. `https://bashford.vercel.app`)
   - **Authorization callback URL:** the Worker URL + `/callback`
     (e.g. `https://sveltia-cms-auth.YOUR-SUBDOMAIN.workers.dev/callback`)
3. Click **Register application**.
4. Copy the **Client ID**. Click **Generate a new client secret** and copy that too.
5. In the Cloudflare Worker dashboard (Step 1), open the worker → **Settings**
   → **Variables** → add these as **Secret** (encrypted):
   - `GITHUB_CLIENT_ID` — the Client ID from above
   - `GITHUB_CLIENT_SECRET` — the secret from above
   - `ALLOWED_DOMAINS` — comma-separated list, e.g.
     `bashford.vercel.app,*.vercel.app` (limits which sites the worker will
     authenticate for; prevents random third parties using your worker)
6. Re-deploy the worker so the new env vars take effect.

## Step 3 — Wire `config.yml` to your repo + worker

Edit `public/admin/config.yml` (the only two lines that need real values):

```yaml
backend:
  name: github
  repo: OWNER/REPO              # e.g. JasonSchmittD10/property-manager-app
  branch: main
  base_url: https://YOUR-WORKER-URL   # the Cloudflare Worker URL from Step 1
```

Commit + push. Vercel will redeploy.

## Step 4 — Try it

1. Open `https://YOUR-VERCEL-DOMAIN/admin`.
2. Click **Login with GitHub**, approve.
3. You should see the collection list (Announcements, Welcome note, Guide, etc.).
4. Edit something small — e.g. add an announcement — and click **Publish**.
5. Watch the repo on GitHub: a new commit should appear within seconds.
6. Vercel auto-deploys; the app updates in ~60s.

## Step 5 — Add Abby as a collaborator

The CMS uses GitHub for auth, so only GitHub accounts with **write** access to
the repo can edit content.

1. Repo → **Settings** → **Collaborators** → **Add people** → Abby's GitHub username.
2. She accepts the email invite.
3. Done — she can now log in at `/admin` with her GitHub account.

If Abby doesn't have a GitHub account yet: <https://github.com/signup>. Free.

## What's editable vs not

**Editable in the CMS (safe stuff):**
- Welcome note
- Rent notes (autopay note, late policy — the prose, not the dollar amounts)
- House rules / manual entries (with optional photo upload)
- Guide categories + spots
- Essentials (hospital, pharmacy, etc.)
- Seasonal tips
- Announcements
- Documents (with PDF upload)
- Faith & community section
- Hero photo

**Stays in code (in `src/config/property.ts`):**
- Login credentials (`appAccess`)
- Rent math + payment link (so the CMS can't break the breakdown or send
  tenants to a wrong URL)
- WiFi + door codes (`quickInfo`)
- Utility provider details (structural)
- Maintenance contact, emergency info, landlord phone numbers
- Property address / lease dates

If you ever need to change any of those, edit `src/config/property.ts`
directly and push.

## Troubleshooting

- **"Configuration error" on the admin login screen** — usually `repo:` or
  `base_url:` in `config.yml` is wrong. Check the Worker URL has no trailing
  slash.
- **GitHub OAuth says "redirect_uri mismatch"** — the callback URL on the
  GitHub OAuth App must match the Worker URL + `/callback` exactly.
- **Login succeeds but "permission denied" when saving** — that GitHub account
  doesn't have write access to the repo. Add them as a collaborator (Step 5).
- **`/admin` shows the tenant app instead of the CMS** — Vercel's SPA fallback
  is catching it. `vercel.json` already excludes `/admin` from the rewrite, so
  check that file hasn't been clobbered.
- **A save fails the Vercel build** — the CMS wrote malformed JSON (rare —
  Sveltia validates against the config). Revert the bad commit on GitHub and
  re-edit in the CMS. TypeScript interfaces in `property.ts` are the contract.

## Cost

- Cloudflare Worker: free tier (100k requests/day — way more than two
  landlords will ever use)
- GitHub OAuth App: free
- Vercel: same plan you're already on
- Sveltia CMS: free, open source

No new monthly bills.
