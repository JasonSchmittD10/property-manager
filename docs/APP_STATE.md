# Bashford Tenant App — Current State

Snapshot of the app as of merge `fd1529f` (PR #8). Use this when you (or a future contributor) need to pick up cold and not re-derive the architecture from the diff history.

---

## What it is

A single-property tenant home base for **5716 Bashford Crest Ln, Raleigh, NC 27606**. One landlord household (Jason & Abby), one tenant household, one shared password. Mobile-first, deployed as a static site on Vercel.

Hard constraints (locked in by the original brief — don't relitigate without explicit ask):
- One shared username/password gates the whole app. No per-user accounts, no real auth backend.
- No payment processing. "Pay Rent" deep-links to Venmo.
- All editable content lives in **one typed config file**: [`src/config/property.ts`](../src/config/property.ts).
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
| Hosting | Vercel static (auto-deploys on merge to `main`) |
| State | Local `useState` only. Auth flag lives in React Context. No Zustand/Redux/etc. |

---

## File structure

```
src/
├── App.tsx                       # AuthProvider → AuthGate → AppShell
├── main.tsx                      # mount + font imports + index.css
├── index.css                     # tailwind base + body/heading defaults + a11y
├── config/
│   └── property.ts               # SINGLE source of editable content
├── lib/
│   └── format.ts                 # formatMoney, formatDate, ordinal, nextDueDateLabel
├── auth/
│   ├── AuthContext.tsx           # reads creds from appAccess; sessionStorage persistence
│   ├── AuthGate.tsx              # renders Login if not authed
│   └── Login.tsx                 # branded sign-in screen
├── shell/
│   ├── AppShell.tsx              # router + routes + TopBar + ScrollToTop + BottomTabs
│   ├── BottomTabs.tsx            # Dashboard/Property/City Guide tab bar
│   └── EmergencyButton.tsx       # top-right button → EmergencySheet
├── screens/
│   ├── Home.tsx                  # dashboard
│   ├── Property.tsx              # /property (header + Quick info + Rent + 3 setup rows)
│   ├── Utilities.tsx             # /property/utilities
│   ├── Documents.tsx             # /property/documents
│   └── Guide.tsx                 # /guide
└── components/
    ├── Button.tsx
    ├── Card.tsx
    ├── ContactRow.tsx            # tap-to-call/sms/mail/url with sage chip icon
    ├── CopyField.tsx             # tap-to-copy (wifi password etc.)
    ├── Sheet.tsx                 # bottom-sheet modal
    ├── EmergencySheet.tsx        # cross-cutting emergency info
    ├── HouseManualSheet.tsx      # opened from Property page
    └── icons/Icons.tsx           # NavIcons + property page icons (currentColor SVGs)
```

---

## Routes

| Path | Screen | Notes |
|---|---|---|
| `/` | `Home` | Dashboard |
| `/property` | `Property` | Top-level (Emergency button shown) |
| `/property/utilities` | `Utilities` | Child page (Emergency hidden, back link to Property) |
| `/property/documents` | `Documents` | Child page (Emergency hidden, back link to Property) |
| `/guide` | `Guide` | City guide |
| `*` | `Home` | 404 fallback |

**Top-bar Emergency button** renders only on the three top-level routes (`/`, `/property`, `/guide`) — see `TOP_LEVEL_ROUTES` in [`AppShell.tsx`](../src/shell/AppShell.tsx). Child pages use a "← Property" back link instead.

**`ScrollToTop`** component (also in `AppShell.tsx`) scrolls to (0, 0) on every `pathname` change so navigating to a sub-page doesn't inherit the previous page's scroll.

---

## Design tokens

All defined in [`tailwind.config.ts`](../tailwind.config.ts). Values are the Figma canonical token values from the design file (`tk1qzZqiHTe9tWXDJZyi87`).

### Colors
| Token | Hex | Use |
|---|---|---|
| `canvas` | `#faf9f6` | App background |
| `card` | `#FFFFFF` | Card backgrounds |
| `sage` | `#688557` | Primary accent (Figma `sage-green/500`) |
| `sage-deep` | `#4F6B3F` | Sage pressed/hover |
| `sage-tint` | `#edf1e8` | Icon chip backgrounds (Figma `sage-green/50`) |
| `ink` | `#2b2823` | Primary text (Figma `warm-gray/900`) |
| `muted` | `#8E8270` | Nav inactive labels |
| `border` | `#E7E0D6` | Legacy hairline border |
| `warm-50` | `#f7f4ef` | Subtle row divider |
| `warm-100` | `#efebe2` | Inline hairlines |
| `warm-200` | `#f1ece4` | Card border |
| `warm-400` | `#736c5f` | Body M / address copy |
| `warm-500` | `#a39d90` | Eyebrow secondary text |
| `warm-card` | `#fbfaf7` | Inset tile inside Quick info |
| `danger` | `#A04A3C` | **Only** for the genuine Emergency affordance |

### Typography
- **Headings: Cal Sans 400** (self-hosted). Default weight 500 in CSS via `index.css`.
- **Body: Hanken Grotesk** 400 + 500 (self-hosted).
- **Eyebrow:** Hanken Bold 12px, `tracking-eyebrow` (`0.09em`).
- **Rule:** no weights ≥ 600. `<strong>` is pinned to 500 in `index.css`.

### Shape
- `rounded-pill` = 11px
- `rounded-card` = 16px (legacy)
- `rounded-cardLg` = 18px (new Property page card)
- `rounded-cardInner` = 12px (inset tiles, buttons)
- `rounded-hero` = 20px
- `border-hair` = 0.5px (use exclusively for hairlines)

### "Feels wrong" checklist
If a change introduces any of these, it's drifted: pure-white page bg, drop shadows, gradients, Inter/Roboto/system font in headings, more than one accent color, weights ≥ 600, cramped spacing, hard 1px+ gray borders.

---

## Content config — [`src/config/property.ts`](../src/config/property.ts)

Single typed file. Every editable value lives here. Items marked `TODO:` need landlord input.

| Export | What it holds |
|---|---|
| `property` | name, address, cityStateZip, heroPhoto, leaseStart, leaseEnd |
| `appAccess` | username, password, display note (auth gate reads these directly) |
| `rent` | baseRent, internetCharge, dueDayOfMonth (number), dueDay (display string), payment link, autoPayNote, latePolicy |
| `quickInfo` | wifiNetwork, wifiPassword, frontDoorCode, trashDay, recyclingNote |
| `maintenance` | mailto link, blurb, emergencyReminder |
| `utilities` | array — Duke, Enbridge, Raleigh Water, Google Fiber |
| `documents` | array — lease, inspection, house rules, utilities guide, deposit receipt |
| `houseManual` | array — thermostat, water shut-off, breaker, disposal, appliances, yard |
| `welcomeNote` | heading + body paragraphs + signoff |
| `guide` | array of categories with spots (coffee, outdoors, dogs, eats, grocery) |
| `essentials` | nearby ER / pharmacy / hardware / gas / vet |
| `community` | optional Antioch-style faith/community section |
| `trashRecycling` | collection day, rules, Raleigh schedule lookup link |
| `announcements` | landlord notices (empty by default) |
| `seasonalTips` | pollen-season / first-freeze etc. |
| `emergency` | water shutoff, gas leak guidance, breaker panel, after-hours contact, 911 reminder |
| `landlord` | name + contacts[] (Jason + Abby) + preferredContact + responseExpectation |

---

## Important conventions

- **No `.env`.** Auth credentials live in `appAccess` in the config file. Deleted `.env.example` and `vite-env.d.ts` after this caused two real bugs (see PR #3).
- **Sheets vs pages:** sheets for short, self-contained content (House Manual, Emergency). Pages for substantial drilldowns (Utilities, Documents).
- **Icons:** prefer the custom `Icons.tsx` (Figma-sourced, `currentColor`) over `lucide-react`. Add lucide only when the design doesn't supply an icon.
- **Money:** always `formatMoney(...)` — never `$` + raw number. The helper handles 0 / cents correctly.
- **Dates:** `nextDueDateLabel(dayOfMonth)` produces "Due Jul 1 · in 15 days"-style copy from the current date. Uses local time to avoid TZ shifts on mobile.
- **Routes that should hide the Emergency button:** add the path to `TOP_LEVEL_ROUTES` in `AppShell.tsx` to *show* it; not in the set = hidden.
- **Strong/bold elements:** never use `font-bold` or `font-semibold`. Use `font-medium` (500). Hanken Bold is reserved for the eyebrow labels at 12px.
- **No backend.** If a feature seems to need one, push back. The brief is explicit.

---

## Build & deploy

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b + vite build → dist/
npm run typecheck  # tsc --noEmit
```

Vercel auto-deploys on merge to `main`. No env vars required.

---

## Build history (chronological)

| PR | Lands as | What it did |
|---|---|---|
| #1 | `06def97` | Initial scaffold: Vite/React/TS/Tailwind, content config, auth gate, primitives, app shell, Home/Property/Guide, README. Built per the original brief in `docs/superpowers/plans/2026-06-16-bashford-tenant-app.md`. |
| #2 | `0e4ca09` | Restructured content config with researched data — multi-export shape (`property`, `appAccess`, `rent`, `quickInfo`, `utilities`, etc.). All screens refactored. |
| #3 | `8b820d8` | Auth gate reads creds from `appAccess` directly. Dropped `.env`/`.env.example`/`vite-env.d.ts`. Fixed a recurring credentials-out-of-sync bug. |
| #4 | `59fe9ec` | Self-hosted Cal Sans + Hanken Grotesk via `@fontsource/*`. Fonts no longer fall back on mobile networks that block jsDelivr. |
| #5 | `bc1d039` | Pixel-perfect bottom navbar from Figma (Dashboard / Property / City Guide). |
| #6 | `4bb378f` | Pixel-perfect Property page redesign per Figma 1:1359 — header + Quick info + Rent (with breakdown collapse + Pay Rent + history button) + Setup & Documents 3-row section. Added `warm-*` color scale, `tracking-eyebrow`, `rounded-cardLg/cardInner`. |
| #7 | `5be9fbf` | Utilities and Documents converted from bottom sheets to full pages at `/property/utilities` and `/property/documents`. House Manual still a sheet. |
| #8 | `fd1529f` | `ScrollToTop` on route change + Emergency button hidden on child pages. |

---

## Known TODOs / open threads

- **History button** on the Rent card is decorative — no handler yet. Needs a destination (Venmo history? a payment-log sheet?).
- **House Manual** is still a sheet. If you want it as a full page for consistency with Utilities/Documents, mirror what those screens do.
- **Floating-pill nav** with a voice button shows up in Figma 1:1359's bottom but we intentionally kept the tab bar from #5. If you want the pill nav, that's a separate redesign.
- **`TODO:` markers in `property.ts`** — wifi password, front door code, late policy, lease dates, manual specifics, neighborhood spot reasons. Edit those in place; the structure is ready.
- **Public PDFs** in `public/documents/` — config has the slots but the files aren't checked in. Documents with empty `file: ""` render as "Coming soon".

---

## Where the design lives

Figma: `tk1qzZqiHTe9tWXDJZyi87` — "Property" file. Notable nodes:
- `1:18` — bottom tab MenuItem (Default / Selected variants for each tab)
- `1:9` — full nav bar frame
- `1:1359` — Property page (the source of the current /property design)

Use the Figma MCP `get_design_context` / `get_screenshot` with these node IDs when picking up future work.
