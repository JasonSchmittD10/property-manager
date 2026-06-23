# Bashford Tenant App — Current State

Snapshot of the app after the cleanup pass. Use this when you (or a future contributor) need to pick up cold and not re-derive the architecture from the diff history.

---

## What it is

A single-property tenant home base for **5716 Bashford Crest Ln, Raleigh, NC 27606**. One landlord household (Jason & Abby), one tenant household, one shared password. Mobile-first, deployed as a static site on Vercel.

Hard constraints (locked in by the original brief — don't relitigate without explicit ask):
- One shared username/password gates the whole app. No per-user accounts, no real auth backend.
- No payment processing. "Pay Rent" deep-links to Venmo.
- All editable content lives in [`src/config/property.ts`](../src/config/property.ts), which re-exports per-section JSON in [`src/content/`](../src/content/) so a non-technical editor (Decap CMS at `/admin/`) can edit content without touching TypeScript.
- Mobile-first. Designed at ~390px width; scales up gracefully but desktop is not the priority.

---

## Tech stack

| Concern | Choice |
|---|---|
| Build | Vite 5 + TypeScript 5 |
| UI | React 18 |
| Styling | Tailwind 3 (tokens encoded in [`tailwind.config.ts`](../tailwind.config.ts)) |
| Routing | React Router 6 (`BrowserRouter`) |
| Icons | Custom SVGs from Figma in [`src/components/icons/Icons.tsx`](../src/components/icons/Icons.tsx) + a few `lucide-react` icons |
| Fonts | **Self-hosted** via `@fontsource/cal-sans` + `@fontsource/hanken-grotesk` — no CDN dependency |
| Maps | `leaflet` + `react-leaflet` (`SpotsMap` component, OpenStreetMap tiles) |
| PDFs | `react-pdf` — lazy-loaded so the ~1 MB `pdf.worker` only ships when a tenant opens a PDF |
| CMS | Decap CMS (formerly Netlify CMS) at `/admin/`, writes per-section JSON in `src/content/` |
| Edge | One Vercel edge function: [`api/wifi-outage.ts`](../api/wifi-outage.ts) — returns `{ outage, message }` for the Home wifi chip |
| Hosting | Vercel static + edge (auto-deploys on merge to `main`) |
| State | Local `useState` only. Auth flag in React Context. No Zustand/Redux/etc. |

---

## File structure

```
api/
└── wifi-outage.ts                # edge function: { outage, message, checkedAt, source }

public/
├── admin/                        # Decap CMS shell (index.html + config.yml)
├── app-icon.png                  # favicon + iOS apple-touch-icon
├── documents/                    # PDFs referenced from src/content/documents.json
└── photos/                       # hero + manual photos

scripts/
├── geocode-spots.mjs             # geocodes guide.spots → src/content/geocode-cache.json
└── import-kml.mjs                # imports Jason & Abby's Google My Maps export

src/
├── App.tsx                       # AuthProvider → AuthGate → AppShell
├── main.tsx                      # mount + font imports + index.css
├── index.css                     # tailwind base + typography utilities (.text-h1..caption)
├── vite-env.d.ts                 # ambient module declarations (CSS/SVG imports)
├── config/
│   └── property.ts               # re-exports per-section JSON from src/content/
├── content/                      # CMS-managed JSON, one file per section
│   ├── announcements.json
│   ├── community.json
│   ├── documents.json
│   ├── essentials.json
│   ├── geocode-cache.json
│   ├── guide.json
│   ├── houseManual.json
│   ├── propertyMedia.json
│   ├── quickInfo.json
│   ├── rentNotes.json
│   ├── seasonalTips.json
│   ├── verses.json
│   └── welcome.json
├── lib/
│   └── format.ts                 # formatMoney, formatDate, ordinal, nextDueDateLabel
├── auth/
│   ├── AuthContext.tsx           # reads creds from appAccess; sessionStorage persistence
│   ├── AuthGate.tsx              # renders Login if not authed
│   └── Login.tsx                 # branded sign-in screen
├── shell/
│   ├── AppShell.tsx              # router + routes + ScrollToTop + BottomTabs
│   └── BottomTabs.tsx            # Main/Property/Guide tabs + Emergency button (sheet)
├── screens/
│   ├── Home.tsx                  # /            dashboard (greeting, chips, verse, hero)
│   ├── Property.tsx              # /property    Quick info + Rent + 3 setup rows
│   ├── Utilities.tsx             # /property/utilities
│   ├── Documents.tsx             # /property/documents          (file list)
│   ├── DocumentView.tsx          # /property/documents/:id      (lazy-loaded pdf.js viewer)
│   ├── HouseManual.tsx           # /property/house-manual
│   ├── Guide.tsx                 # /guide       welcome note + map preview + essentials
│   └── GuideMap.tsx              # /guide/map   full-screen Leaflet map of pinned spots
└── components/
    ├── BackLink.tsx              # "← Property" pattern for child pages
    ├── Card.tsx                  # standard card surface (supports `as` polymorphic prop, `noPadding`)
    ├── ContactRow.tsx            # tap-to-call/sms/mail/url row with sage chip icon
    ├── EmergencySheet.tsx        # opened from the Emergency button in BottomTabs
    ├── Eyebrow.tsx               # uppercase Hanken-Bold label (tones: default sage / subdued warm)
    ├── IconChip.tsx              # 36px sage-tint chip with a centered icon
    ├── ListRow.tsx               # icon-chip + title + chevron row used in Property
    ├── PageHeader.tsx            # eyebrow + h1 + subtitle stack
    ├── Sheet.tsx                 # bottom-sheet modal (used by EmergencySheet)
    ├── SpotsMap.tsx              # Leaflet map of guide spots (preview + full modes)
    └── icons/Icons.tsx           # all custom SVG icons (`currentColor` + `IconComponent` type)
```

---

## Routes

| Path | Screen | Notes |
|---|---|---|
| `/` | `Home` | Top-level. Greeting, action chips, verse-of-the-day, hero photo. |
| `/property` | `Property` | Top-level. Quick info + Rent + 3 setup rows. |
| `/property/utilities` | `Utilities` | Child page. Back link. |
| `/property/documents` | `Documents` | Child page. File list — each row routes to viewer. |
| `/property/documents/:id` | `DocumentView` | Lazy-loaded in-app PDF viewer (pdf.js). |
| `/property/house-manual` | `HouseManual` | Child page. |
| `/guide` | `Guide` | Top-level. Welcome note, map preview, essentials. |
| `/guide/map` | `GuideMap` | Full-screen Leaflet map. |
| `*` | `Home` | 404 fallback. |

**`ScrollToTop`** (in [`AppShell.tsx`](../src/shell/AppShell.tsx)) scrolls to (0, 0) on every `pathname` change.

**Emergency button** lives inside [`BottomTabs.tsx`](../src/shell/BottomTabs.tsx) (a sage-pill chip + sheet), so it follows the nav and doesn't need per-route plumbing.

---

## Design tokens

All defined in [`tailwind.config.ts`](../tailwind.config.ts). Values are the Figma canonical tokens (`tk1qzZqiHTe9tWXDJZyi87`).

### Color ramps

**Sage green (`sage-0..900`)** — primary accent. Anchor 500 = `#688557` (Figma `sage-green/500`).

| Token | Hex | Common role |
|---|---|---|
| `sage-50` / `sage-tint` | `#EDF1E8` | Icon chip background, success surface |
| `sage-500` / `sage` | `#688557` | Primary accent |
| `sage-600` / `sage-deep` | `#4F7040` | Accent pressed |

**Warm gray (`warm-0..900`)** — neutral surfaces and text.

| Token | Hex | Common role |
|---|---|---|
| `warm-0` / `canvas` / `warm-card` | `#FBFAF6` / `#FBFAF7` | App background, Quick info inset |
| `warm-50` | `#F7F4EF` | Row divider |
| `warm-100` | `#EFEBE2` | Hairlines |
| `warm-200` / `border` | `#E7E2D8` | Card border |
| `warm-500` | `#A39D90` | Tertiary text (subdued eyebrow) |
| `warm-700` | `#726C60` | Secondary text (Body M, address line) |
| `warm-900` / `ink` | `#2B2823` | Primary text |

Other: `muted` `#8E8270` (nav default text), `danger` `#A04A3C` (reserved for genuine emergency affordances only).

### Typography utility classes

Defined in [`src/index.css`](../src/index.css), not in Tailwind config:

| Class | Spec |
|---|---|
| `.text-h1` | Cal Sans 36 / leading-none |
| `.text-h2` | Cal Sans 32 |
| `.text-label` | Cal Sans 16 |
| `.text-body` | Hanken Medium 14 |
| `.text-caption` | Hanken Medium 12 |
| `.text-money` | Cal Sans display |
| Eyebrow | rendered via `<Eyebrow>` — `tracking-eyebrow` (`0.09em`) + Hanken Bold 12 uppercase |

### Shape & effects

- `rounded-pill` 11px · `rounded-card` 16px · `rounded-cardLg` 18px · `rounded-cardInner` 12px · `rounded-hero` 20px
- `border-hair` 0.5px — the only border weight used on hairlines
- `dropShadow.big` — Figma's "BIG shadow" stack (5 drops), used on the floating bottom nav

### "Feels wrong" checklist

Pure-white page bg · drop shadows on cards · gradients · Inter/Roboto/system font in headings · more than one accent color · weights ≥ 600 (`<strong>` is pinned to 500 in `index.css`) · 1px+ hard gray borders · raw eyebrow markup instead of `<Eyebrow>`.

---

## Content config

Shape lives in [`src/config/property.ts`](../src/config/property.ts); values live as JSON in [`src/content/`](../src/content/). Decap CMS at `/admin/` writes these JSON files; the TS layer adds the types and a couple of derived helpers.

| Export | Source JSON | What it holds |
|---|---|---|
| `property` | static + `propertyMedia.json` | name, address, hero photo, lease term |
| `appAccess` | static | username, password, display note (auth gate reads directly) |
| `rent` | static + `rentNotes.json` | base + internet, due day, payment link, autoPay note, late policy |
| `quickInfo` | `quickInfo.json` | wifi network/password, front door code, trash day, recycling note |
| `maintenance` | static | mailto link, blurb, emergency reminder |
| `utilities` | static | Duke, Enbridge, Raleigh Water, Google Fiber |
| `documents` | `documents.json` | PDFs in `public/documents/` |
| `houseManual` | `houseManual.json` | thermostat, water shut-off, breaker, disposal, appliances, yard |
| `welcomeNote` | `welcome.json` | heading + paragraphs + signoff |
| `guide` | `guide.json` | guide categories + spots |
| `favoritesMap` | `guide.json` | toggle + bounding box + tile config for `SpotsMap` |
| `essentials` | `essentials.json` | nearby ER / pharmacy / hardware / gas / vet |
| `community` | `community.json` | optional Antioch-style faith/community section |
| `trashRecycling` | static | collection day, rules, schedule lookup link |
| `announcements` | `announcements.json` | landlord notices (empty by default) |
| `seasonalTips` | `seasonalTips.json` | pollen-season / first-freeze etc. |
| `verses` / `verseFallback` | `verses.json` | daily verse pool + offline fallback (ASV) |
| `emergency` | static | water shutoff, gas leak guidance, breaker, after-hours, 911 reminder |
| `landlord` | static | name + contacts[] (Jason + Abby) |

`community`, `announcements`, and `seasonalTips` are CMS-managed slots — kept exported even when no screen renders them today, so a future UI can pick them up without a config change.

---

## Conventions

**Building a new screen?** Start with these primitives, in this order:

1. `<BackLink to="/parent">Parent label</BackLink>` — only on child pages
2. `<PageHeader eyebrow="…" title="…" subtitle="…" />`
3. `<Card>` (or `<Card as="section">` for semantic sections; `<Card noPadding>` when wrapping a list)
4. `<Eyebrow tone="subdued">SECTION LABEL</Eyebrow>` for in-card eyebrows
5. `<ContactRow>` for tap-to-call/sms/mail/url

**Other rules:**
- No `.env`. Auth credentials live in `appAccess`. (See PR #3 history — this caused two real bugs.)
- **Sheets vs pages:** sheets for short, self-contained content (Emergency). Pages for substantial drilldowns (Utilities, Documents, House Manual, Document viewer).
- **Icons:** prefer the custom `Icons.tsx` (Figma-sourced, `currentColor`) over `lucide-react`. Use lucide only when the design doesn't supply an icon (e.g. `ChevronLeft`, `ChevronRight`, `FileText`, `Trash2`, `Users`).
- **Money:** always `formatMoney(...)` — never `$` + raw number.
- **Dates:** `nextDueDateLabel(dayOfMonth)` produces "Due Jul 1 · in 15 days" copy from the current date.
- **No backend.** If a feature seems to need one, push back. The `api/wifi-outage` edge function is the only exception and it's read-only.
- **Adding a route?** Register in `AppShell.tsx`. If it's a top-level destination, also add it to `BottomTabs.tsx`.

---

## Build & deploy

```bash
npm install
npm run dev         # http://localhost:5173
npm run build       # tsc -b + vite build → dist/
npm run typecheck   # tsc --noEmit
npm run geocode     # populate src/content/geocode-cache.json from guide.spots
npm run import-kml  # parse Google My Maps KML → guide spots
```

Vercel auto-deploys on merge to `main`. No env vars required for the app itself; the edge function reads no secrets.

### Bundle sizes (approximate, gzipped)

- `index.*.js` — ~120 KB (React + Router + Leaflet + Tailwind)
- `index.*.css` — ~16 KB
- `DocumentView.*.js` — ~137 KB (loaded only when a tenant opens a PDF)
- `pdf.worker.*.mjs` — ~1 MB raw (lazy, served on demand from `react-pdf`)
- Fonts — ~25 KB woff2 each (Cal Sans 400, Hanken 400/500)

---

## Build history (chronological highlights)

| PR | What it did |
|---|---|
| #1 | Initial scaffold — Vite/React/TS/Tailwind, content config, auth gate, primitives, app shell, Home/Property/Guide. |
| #2 | Restructured content config with researched data. |
| #3 | Auth gate reads creds from `appAccess` directly. Dropped `.env`. |
| #4 | Self-hosted Cal Sans + Hanken Grotesk. |
| #5 | Pixel-perfect bottom navbar (Dashboard / Property / City Guide). |
| #6 | Pixel-perfect Property page redesign (Quick info + Rent + Setup rows). |
| #7 | Utilities + Documents converted to full pages. |
| #8 | `ScrollToTop` + Emergency button hidden on child pages. |
| #9 | First `APP_STATE.md` snapshot. |
| Later | Guide page redesign with welcome note + map; KML import + geocode script. |
| Later | `SpotsMap` + `/guide/map` full Leaflet map. |
| Later | House Manual converted from sheet to full page. |
| Later | Document viewer — in-app pdf.js renderer with lazy load. |
| Later | Home dashboard redesign — greeting, trash-day reminder, 2×2 action chips, verse of the day, hero photo. |
| Later | Verse-of-the-day fetches live ASV text from `bible-api.com` with local fallback. |
| Later | Decap CMS at `/admin/` writing per-section JSON in `src/content/`. |
| Later | `/api/wifi-outage` edge function feeding the Home wifi chip. |
| Later | Cleanup: removed dead `Button.tsx`, 3 duplicate PDFs (~647 KB), fixed Home dup-icon. |

For exact commits, `git log --oneline`.

---

## Known TODOs / open threads

- **History button** on the Rent card is decorative — no handler yet. Needs a destination (Venmo history? a payment-log sheet?).
- **`TODO:` markers in `src/content/*.json`** — wifi password, front door code, late policy text, lease dates, etc. Edit via Decap CMS at `/admin/` (preferred) or directly in the JSON.
- **Public PDFs** in `public/documents/` — config slots present for all; some still reference TODO uploads.
- **`floor-area` floating-pill nav** with a voice button shows up in some Figma frames but isn't shipped. Decision pending.

---

## Where the design lives

Figma: `tk1qzZqiHTe9tWXDJZyi87` — "Property" file.

Notable nodes referenced during build:
- `2:308` — color-palette token frame
- `1:18` / `1:9` — bottom-nav MenuItem + frame
- `1:1359` — Property page (the current `/property` design)
- `4:392` — Home dashboard
- `9:410` — Guide page

Use the Figma MCP `get_design_context` / `get_screenshot` with these node IDs when picking up future work.
