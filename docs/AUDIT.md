# Audit — Phase 1 (read-only)

Snapshot of the codebase as of `b4b454c..6122497` (current `main`).
Goal: surface inconsistencies so Phase 2 can codify a token system + component
library, and Phase 3 can clean up the safe stuff. **No code was changed in this phase.**

Scope: `src/`, `tailwind.config.ts`, `index.css`. ~2,760 LOC across 25 files.

---

## A. Design-token inventory

### A.1 Color usage — what's defined vs what's used

**Defined in `tailwind.config.ts`:**

- Sage ramp: `sage-0` … `sage-900` (DEFAULT = `sage-500` = `#688557`).
- Warm ramp: `warm-0` … `warm-900`.
- Semantic aliases: `canvas`, `surface`, `card`, `ink`, `muted`, `border`, `danger`, `sage-deep`, `sage-tint`, `warm-card`.

**Inconsistencies in the screens:**

| Role | Found in screens | Tokens used | Issue |
|---|---|---|---|
| Eyebrow color | Home | `text-sage-600` | ✅ correct (Figma 4:392) |
| Eyebrow color | Property, Documents, HouseManual, Utilities, GuideMap | `text-sage` (= sage-500) | ❌ should match Home |
| Eyebrow color (secondary, "subdued") | Home verse, Property "Setup & documents", Guide "Our recommendations", Guide "Getting around", Utilities category, Property/Guide section eyebrows | `text-warm-500` | ✅ consistent |
| Active nav tab | `BottomTabs.tsx:64` | `text-[#648652]` (literal hex) | ❌ off-palette — closest token is `sage-600` (#4F7040), but the value 648652 doesn't match any token. Was an early Figma color before the variable settled. |
| Spots map pin fill | `SpotsMap.tsx:50` | `const SAGE = '#688557'` (literal hex) | 🟡 valid (it's `sage-500`) but should be referenced as a token. |
| Muted secondary text | Login, Sheet close X, EmergencySheet h3, SpotsMap popup town | `text-muted` (#8E8270) | 🟡 used in 5 places but most "muted" text elsewhere uses `text-warm-500` or `text-warm-700`. The "muted" alias semantics are ambiguous. |
| Body/secondary text | Home subtitle, Property address, Documents description, Utilities note, etc. | `text-warm-700` | ✅ consistent |
| Tertiary text (chevrons, history button) | Property history btn, Documents "Coming soon", Guide row chevron, SpotsMap | `text-warm-500` | ✅ consistent |
| Card border | All cards | `border-warm-100` | ✅ consistent |
| Card border | `Card` component (`Card.tsx:6`) | `border-border` (= warm-200) | ❌ component picks `warm-200` but every screen uses `warm-100` inline — the component is effectively abandoned |
| Pay Rent gradient/press state | `Property.tsx:197` | `bg-sage` / `active:bg-sage-deep` | ✅ uses aliases — sage-deep was wrong (`#566E45`) until commit `6122497` realigned to `#4F7040` |
| Auth login surface | `Login.tsx:21` | `bg-surface` (#F1EBE3) | 🟡 used only on login — this color exists for one screen |

**Takeaway:** the eyebrow color drift is the most visible inconsistency. Three colors are doing the work of one — `sage-500` (legacy), `sage-600` (correct per latest Figma), and warm-500 (intentionally lower-emphasis). The hex literal in `BottomTabs.tsx` is a real bug.

---

### A.2 Type-scale inventory

Every distinct combination of `font-size + family + weight + tracking` used in the codebase:

| Usage | Classes | Implied token |
|---|---|---|
| Page H1 (most screens) | `font-heading text-[36px] leading-(none\|tight) text-ink` | `text-h1` |
| Document viewer H1 | `font-heading text-[28px] leading-none text-ink` | (one-off — could be `text-h1-sm` or just keep) |
| Money / Rent value | `font-heading text-[32px] leading-none text-ink` | `text-money` |
| Section H2 | `font-heading text-[20px] leading-none text-ink` | `text-h2` |
| Card/label H2 | `font-heading text-lg text-ink` (HouseManual, Utilities) | inconsistent with the `text-[20px]` H2 used elsewhere |
| Label (chip title, row title) | `font-heading text-[16px] tracking-[0.01em] text-ink` | `text-label` |
| Sheet title | `font-heading text-2xl` | inconsistent — Sheet vs the rest of the app |
| Login H1 | `font-heading text-4xl` | inconsistent — only used in Login |
| Eyebrow | `font-body font-bold text-[12px] tracking-eyebrow uppercase` | `text-eyebrow` |
| Body M (subtitles, descriptions) | `font-body font-medium text-[14px] text-warm-700` | `text-body` |
| Body S (sub on chips, card body) | `font-body font-medium text-[12px] text-warm-700 (leading-snug)` | `text-caption` |
| Button label (large) | `font-heading text-[18px] tracking-[0.05em]` | `text-button-lg` |
| Button label (medium / view-breakdown) | `font-heading text-[14px] tracking-[0.14px]` | `text-button-md` |
| Nav tab label | `font-heading text-[10px] leading-[14px] tracking-[0.3px]` | `text-nav-tab` |
| Popup spot name | `font-heading text-[16px] leading-tight` | reuses `text-label` |
| Popup town | `font-body text-[12px] text-muted` | (one-off — different muted color than the rest) |
| Generic `text-sm` (Tailwind 14px) | 16+ places | conflates with body-m — should resolve to one of: `text-body` (14/medium) or `text-body-sm` (14/normal) |
| Generic `text-xs` | 12+ places | conflates with caption/eyebrow — should resolve to `text-caption` |

**Tracking values in use:** `tracking-widest` (Tailwind ~0.1em), `tracking-eyebrow` (0.09em ≈ 1.08px on 12px), `tracking-[0.05em]`, `tracking-[0.14px]`, `tracking-[0.16px]`, `tracking-[0.01em]`, `tracking-[0.3px]`. Half of these are arbitrary literals.

**Leading values in use:** `leading-none`, `leading-tight`, `leading-snug`, `leading-[14px]`, `leading-[20px]`, `leading-[0]`, default. Six different "what's the line-height" decisions.

**Takeaway:** there's an implicit type scale of ~8 named roles, but it's expressed as 30+ arbitrary class combinations. A single typography config (component classes or `@layer components`) would collapse this and remove the drift between e.g. "H2 = text-[20px]" (Property) and "H2 = text-lg" (HouseManual) — same role, different value.

---

### A.3 Spacing / radius / border

**Card padding** is `p-4` (16px) everywhere — consistent.

**Card radius** is mostly `rounded-cardLg` (18px) but inset tiles use `rounded-cardInner` (12px) and PayRent button uses `rounded-cardInner` — both correct per Figma.

**Floating pill nav** uses `rounded-[24px]` arbitrary literal — should be tokenized as `rounded-pillNav` or similar.

**Vertical section gap** drifts:
- Home, Property, Guide top-level: `space-y-7` (28px) → matches Figma's 27/28px section gap
- Documents, Utilities, HouseManual, GuideMap, DocumentView: `space-y-6` / `space-y-4` (24/16px) — child pages
- Property's "Setup & documents" section uses `space-y-4` internally — ✅
- Home's card column uses `space-y-4` internally — ✅
- **Mismatch:** the spacing inside the rent card uses `space-y-4` between sections, then `-mt-2` to pull the breakdown back. Brittle.

**Top padding** is `pt-12` (48px) on top-level pages and `pt-4` on child pages — consistent and intentional.

**Bottom padding** for the floating nav: `pb-[120px]` on the AppShell wrapper, `pb-8` on each screen. Two layers of padding, hard to reason about. Should be one.

**Border widths** use `border-hair` (0.5px) for all hairlines — consistent.

**Border colors** for cards = `border-warm-100` everywhere except the `<Card>` component which uses `border-border` (warm-200). Once-`<Card>` is reconciled this is consistent.

**Min-touch-target** patterns: `min-h-[44px]` (back link, button, contact row), `min-h-[52px]` (Documents list row), `min-h-[47px]` (Pay Rent button), `min-h-[28px]` (Pay Rent dismiss). Multiple "minimum tappable" values for different controls. iOS HIG is 44pt — most are fine.

---

### A.4 Component patterns that repeat (and aren't abstracted)

Pattern frequency across the screens:

| Pattern | Inline copies | Where |
|---|---|---|
| Back link (`< Property` etc.) | **5** | Documents, DocumentView, Utilities, HouseManual, GuideMap |
| Page header (eyebrow + H1 + subtitle) | **7** | Home, Property, Documents, DocumentView, Utilities, Guide, HouseManual, GuideMap |
| Card wrapper (`bg-card border-hair border-warm-100 rounded-cardLg p-4`) | **20+** | Every screen |
| Icon chip (`bg-sage-tint rounded-cardInner w-9 h-9 flex items-center justify-center …`) | **4** | Home `ActionChip`, Property `SetupRow`, Guide "The Neighborhood" link, (similar) ContactRow |
| Section eyebrow (`font-body font-bold text-[12px] tracking-eyebrow uppercase text-warm-500`) | **10+** | Property, Documents, Utilities, Guide, GuideMap, Home verse |
| List row with leading icon + trailing chevron | **3** | Property SetupRow, Documents file row, Guide "The Neighborhood" |
| Sage "Open" / "Call" small link | **3** | Guide essentials, Documents list, several places |

**The `Card`, `Button`, `ContactRow`, `CopyField`, and `Sheet` components exist**, but:
- `Card` is used in only 1 place (it's referenced once in `Login.tsx` indirectly — but actually grepping shows it's not imported anywhere right now). The "card" pattern is duplicated inline 20+ times instead.
- `Button` is used **only** in `Login.tsx`. Every other button is hand-rolled.
- `ContactRow` is used by Documents, Utilities, EmergencySheet — ✅ working as intended.
- `CopyField` is **not currently used anywhere** (it was used in old Home, now replaced).
- `Sheet` is used by `EmergencySheet` — ✅.

**Takeaway:** there's a half-built component library being bypassed. Either revive (`Card`, `Button`) or remove (`CopyField`). The right move is to revive `Card` (with the correct tokens), revive `Button`, and add the missing primitives (`BackLink`, `PageHeader`, `IconChip`, `Eyebrow`, `ListRow`).

---

## B. Code-quality findings

### 🟢 Safe / mechanical

1. **`Login.tsx:18` typo / leftover comment** — `pt-16` on `flex-1` parent has a hard-coded top spacing that isn't tokenized. Minor.
2. **`Home.tsx:233-241`** — `IconCmp` type is defined inline in Home; should live in `Icons.tsx` and be exported (matches the existing `IconProps`).
3. **`Home.tsx:247`** — `Icon === WifiArcsIcon` reference-equality check to switch icon size is fragile. Better: each chip carries its preferred icon size.
4. **`format.ts:5-9` — `ordinal()` is exported but not imported anywhere.** Dead code.
5. **`format.ts:11-20` — `formatDate()` is exported but not currently used** (was used by an old announcements section on Home).
6. **`CopyField.tsx` is not imported anywhere.** Dead code (since the rent UX moved to the Zelle copy button on Property).
7. **`Card.tsx` is not imported anywhere** (the same comment — verified with grep below).
8. **`Property.tsx:11`** — `HistoryIcon` is imported but the button it renders is a placeholder (no `onClick`, `title="Payment history (coming soon)"`). Not dead, but the button is non-functional and probably misleading. Flag for product call — Phase 3 leave / revive / remove?
9. **`Icons.tsx` — older unused icon variants:** `DashboardIcon`, `PropertyIcon` (hand-holding-key), `CityGuideIcon` (compass-5), `SirenIcon`, `BellIcon`, `NavEmergencyIcon` are exported but no longer referenced anywhere (the floating-pill nav replaced them). 6 dead exports.
10. **`AppShell.tsx:30`** — `pb-[120px]` on the wrapper plus each screen's own `pb-8` double-pads. Pick one layer.
11. **`AuthContext.tsx`** — no JSDoc on exported functions. Minor.
12. **`Sheet.tsx:40`** — uses Lucide `<X>`; could use the Figma `XCloseIcon` for visual consistency. Minor.

### 🟡 Moderate (extract / refactor — Phase 2-3 candidates)

1. **Duplicate page-header markup in 7 screens** — extract `<PageHeader eyebrow="THE BASICS" title="House manual" subtitle="…" />`.
2. **Duplicate back-link markup in 5 screens** — extract `<BackLink to="/property">Property</BackLink>`.
3. **Duplicate card wrapper in 20+ places** — revive `<Card>` (with the correct `border-warm-100` and `rounded-cardLg` defaults).
4. **`ActionChip` (Home) and `SetupRow` (Property) and the "Neighborhood" link (Guide) are all the same shape** — sage-tint icon chip + label + (optional sub) + (optional trailing chevron). One `<TileRow>` component would cover all three; a `<ChipCard>` variant covers the 2x2 home grid.
5. **Eyebrow pattern (`font-body font-bold text-[12px] tracking-eyebrow uppercase`)** — 10+ inline copies, with the **color drifting** (sage / sage-600 / warm-500). Extract `<Eyebrow tone="accent | subdued">`.
6. **Two fetch-with-fallback hooks (`useWifiStatus`, `useVerseOfTheDay`)** are nearly identical structure. A `useSafeFetch(url, fallback, parse)` could DRY them, but they're each <30 lines, hooks-rule-aware, and clearly named. **Recommendation: leave alone.** Premature abstraction.
7. **`Home.tsx` is 282 lines** carrying date helpers, hooks, ActionChip, fallback selection. Split into `Home.tsx` (screen) + `lib/useVerseOfTheDay.ts` + `lib/useWifiStatus.ts` + `components/ActionChip.tsx`. The hooks/date-helpers also belong outside the screen file.
8. **`Property.tsx:201-225` PayWithZelle** is a separate component inside the screen. Fine — but the same "copy to clipboard with timed reset" pattern is also in `CopyField.tsx`. Reuse if `CopyField` is revived.
9. **`SpotsMap.tsx:11` `googleMapsUrl` helper** lives in the component file. Move to `lib/maps.ts` if other call sites appear (low priority).
10. **Icon `size` prop type inconsistency:** `Icons.tsx` defines `interface IconProps { size?: number; className?: string }`; `Home.tsx` re-declares `type IconCmp = (props: { size?: number; className?: string }) => JSX.Element`. Should import the type.
11. **`Property.tsx:233`** — `SetupRowProps` uses `Icon: typeof PowerIcon` which is a brittle type. Should use the shared `IconCmp`.

### 🔴 Behavior-affecting (LIST ONLY, no fix without approval)

1. **`SpotsMap.tsx:86` — `useMemo(resolveSpots, [])` performs `console.warn` side effect inside the memoized function.** React 18 strict-mode may call the factory twice → double warning in dev. Harmless in production but technically wrong. **Fix would require restructuring** — small behavior change for dev only.
2. **`PayWithZelle` / `CopyField` `setTimeout`** isn't cleared on unmount → "setState on unmounted component" warning if user navigates fast. Low impact in practice.
3. **`useWifiStatus` / `useVerseOfTheDay` fetch hooks** silently swallow ALL errors — including JSON-parse errors and HTTP 5xx. Visible to users: they always see the fallback. Intentional per the spec (no scary state). **Confirm before "improving."**
4. **`BottomTabs.tsx:64` — `text-[#648652]` literal** is a real off-token color that doesn't match `sage-600` (#4F7040). Fixing it is a 1-line change but the active tab will visibly shift from a lighter green to a darker green. **Confirm before changing.**
5. **`Login.tsx:21` — `pt-16`** is hardcoded. The login screen has a unique layout (welcome panel + form) that isn't tokenized. Fine as-is; flagged in case a redesign is planned.
6. **Color contrast (WCAG)**:
   - `text-warm-500` (#A39D90) on `bg-card` (#FFFFFF) ≈ **2.8:1 contrast** — fails AA for normal text (needs ≥4.5). Used on small "Coming soon", chevrons, tertiary labels. **Fixing would change appearance** — needs design call.
   - `text-muted` (#8E8270) on `bg-card` ≈ **3.6:1** — fails AA for normal text, passes for large text. Used in Login labels and Sheet close button.
   - `text-warm-700` (#726C60) on `bg-card` ≈ **5.1:1** — passes AA. Used for body text. ✅
7. **Verse-of-the-day fetches `bible-api.com` on every Home mount** with no in-memory cache across nav. Fine (ETag/HTTP cache handles it) but it's user-visible network traffic. Could memoize per `(date, ref)` for the session.
8. **`Home.tsx:153` Trash-day dismiss** state lives in component memory — reappears on every nav. Intentional (so it nudges again tomorrow), but worth confirming.

---

## C. Accessibility + correctness quick-scan

### Passes ✅

- All `<button>` and `<a>` for navigation have either text content or `aria-label`.
- Forms use proper `<label>` wrapping (Login).
- Sheet is a proper `role="dialog" aria-modal="true"` with focus-trapping ESC handler.
- `<img>` tags have `alt` text (`property.name`, `m.title`, `s.name`).
- Reduced-motion preference is honored (`@media (prefers-reduced-motion: reduce)` in `index.css`).
- Focus-visible ring is defined globally on `:focus-visible`.

### Failures / weak spots ❌

| # | Issue | File |
|---|---|---|
| 1 | `text-warm-500` (#A39D90) and `text-muted` (#8E8270) fail WCAG AA contrast on white. | many |
| 2 | The Pay Rent button doesn't expose `aria-live` or `aria-pressed` for the "Copied" state — a screen reader user won't know the action succeeded. | `Property.tsx:194` |
| 3 | The trash-day Dismiss button uses `aria-label="Dismiss"` which is correct, but the trash icon is decorative (`aria-hidden`) — no programmatic association between icon and message. Acceptable. | `Home.tsx:154` |
| 4 | The floating Emergency button uses `aria-label="Open emergency info"` ✅. The sheet then opens with the full title. ✅. | `BottomTabs.tsx:82` |
| 5 | Login submit button shows no inline error state for a screen-reader user during the failed-login flash beyond the `role="alert" aria-live="polite"` paragraph — that paragraph is correct. ✅ | `Login.tsx:62` |
| 6 | `DocumentView` iframe has `title={doc.title}` ✅. No fallback content for browsers that block iframes. Minor. | `DocumentView.tsx:36` |
| 7 | The `Card.tsx` `<div>` carries `...HTMLAttributes<HTMLDivElement>` so it could accept `onClick` and become an interactive surface without `role="button"` / `tabIndex`. Not currently used this way — guard against it in Phase 2. | `Card.tsx:6` |
| 8 | `SpotsMap` popup's "Google Maps" / "Website" anchor color is forced to sage globally in `index.css` (`.leaflet-popup-content a { color: #688557 }`). This is a hex literal that drifts from the sage token. | `index.css:32` |

### Correctness bugs / risks

- **No console errors observed in the verified preview runs throughout this session.**
- Vite SPA fallback regex in `vercel.json` excludes `admin`, `api`, `assets`, `photos`, `documents`, `fonts`, `images`, `docs`, `favicon.ico`, and `.*\..*`. Looks correct.
- `tsconfig.node.json` is referenced but not read — assumed standard.

---

## Proposed plan for Phases 2 + 3

### Phase 2 — tokens + components (behavior-preserving)

**Order matters — token changes first so the components can use them.**

**P2.1 — Reconcile color tokens (1 commit)**
- Replace `text-[#648652]` in `BottomTabs.tsx` with `text-sage-600` (confirms visual drift first — see 🔴 #4).
- Replace `text-sage` eyebrow usages in `Property/Documents/HouseManual/Utilities/GuideMap` with `text-sage-600` to match Home + Figma.
- Pull the hex `'#688557'` literal in `SpotsMap.tsx` into a `SAGE_500` import or a constant in `lib/colors.ts`.
- Pull `#688557` from `index.css .leaflet-popup-content a` into a CSS var driven by tailwind.

**P2.2 — Add named typography scale (1 commit)**
Define a `@layer components` set in `index.css`:
```css
.text-eyebrow   { @apply font-body font-bold text-[12px] tracking-eyebrow uppercase; }
.text-h1        { @apply font-heading text-[36px] leading-tight text-ink; }
.text-h2        { @apply font-heading text-[20px] leading-tight text-ink; }
.text-h3        { @apply font-heading text-[16px] leading-tight text-ink; }
.text-money     { @apply font-heading text-[32px] leading-none text-ink; }
.text-body      { @apply font-body font-medium text-[14px] text-warm-700; }
.text-body-ink  { @apply font-body font-medium text-[14px] text-ink; }
.text-caption   { @apply font-body font-medium text-[12px] text-warm-700; }
.text-button-lg { @apply font-heading text-[18px] tracking-[0.05em]; }
.text-nav-tab   { @apply font-heading text-[10px] leading-[14px] tracking-[0.3px]; }
```
These compose with existing utility classes (color overrides etc.).

**P2.3 — Revive/replace primitives (3-4 small commits)**

- **Commit a:** `Card` rewritten with correct defaults (`border-warm-100`, `rounded-cardLg`); variants `default` (white card) and `inset` (warm-card tile). Replace inline copies across 8 screens, one per file.
- **Commit b:** `BackLink` extracted, used in 5 screens.
- **Commit c:** `PageHeader { eyebrow, title, subtitle, headingSize?: 'lg'|'md' }` covering the 7 inline copies.
- **Commit d:** `IconChip { Icon, size?, tone? }` covering the 4 inline copies; `ListRow { Icon, label, sub?, trailing?, href|to|onClick }` covering SetupRow / Documents / Neighborhood.
- **Commit e:** `Eyebrow { tone: 'accent' | 'subdued' }` covering the 10+ inline copies.

**P2.4 — Documentation (1 commit)**
- `docs/DESIGN-SYSTEM.md` with the token reference, component catalog, do/don't checklist, and "how to build a new screen on-brand in 5 minutes."

**Out of scope for Phase 2:** anything in 🔴 that would change behavior or appearance.

---

### Phase 3 — safe cleanup (after P2 approval)

**P3.1 — Dead code** (1 commit each, separate so they're reversible)
- Remove `ordinal`, `formatDate` from `format.ts` if still unused after P2.
- Remove `CopyField.tsx` (not used).
- Remove unused icon exports in `Icons.tsx`: `DashboardIcon`, `PropertyIcon`, `CityGuideIcon`, `SirenIcon`, `BellIcon`, `NavEmergencyIcon`.
- Consolidate `pb-8` per-screen + `pb-[120px]` shell into a single source.

**P3.2 — Type tightening** (1 commit)
- Move `IconCmp` to `Icons.tsx`, import it in `Home.tsx`, `Property.tsx`, etc.
- Replace `Icon: typeof PowerIcon` with `Icon: IconCmp` in `Property.tsx`.

**P3.3 — Safe a11y** (1 commit)
- Add `aria-live="polite"` to the "Copied" feedback in `Property.tsx`.
- Confirm the Pay Rent button announces state correctly.
- No contrast changes here — flag for product call.

**P3.4 — 🔴 items, individually approved**
- Move `console.warn` out of `useMemo` in `SpotsMap.tsx`.
- Clear `setTimeout` on unmount in PayWithZelle / CopyField.
- Surface `text-warm-500` contrast issue with a one-line proposal (e.g. swap to `text-warm-700` for "Coming soon" labels). Each visual change needs an explicit OK.

---

## What I'm NOT proposing to touch

Per the prime directives:

- Auth model (shared password + localStorage).
- Payment routing (Zelle copy flow).
- Content config in `src/content/*.json` and the Sveltia CMS wiring.
- `/api/wifi-outage` edge function.
- Vercel `rewrites` config.
- The fetch-with-fallback semantics in `useWifiStatus` / `useVerseOfTheDay` (intentional silent failure).
- The visual design (sage accent, hairlines, no shadows beyond `drop-shadow-big`, no font-weight ≥ 600 except the eyebrow's `font-bold`).
- The hardcoded login top-padding (`Login.tsx:21`) until a Login redesign is planned.

---

## Estimate

- **Phase 2:** 7-10 small commits, each `typecheck + build` green. ~1-2 hours of focused work. Visual output should be **pixel-identical** to current `main`.
- **Phase 3:** 4-5 small commits, several 🔴 items pending per-item approval. ~30-45 min.

**Awaiting your approval before any code changes.**
