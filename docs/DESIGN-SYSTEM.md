# Bashford design system

The reference for building a new on-brand screen quickly. **One look,
one ramp, one type scale.** Hairlines and warm minimal everything.
No shadows beyond the floating-pill `drop-shadow-big`. No font-weight
≥ 600 anywhere except the bold-12px Eyebrow.

Live tokens: [`tailwind.config.ts`](../tailwind.config.ts) ·
Type scale: [`src/index.css`](../src/index.css) under `@layer components` ·
Components: [`src/components/`](../src/components/).

---

## Colors

Two ramps drive everything. Semantic aliases sit on top so screens
read by role ("ink", "muted") instead of palette position.

### Sage green (accent · anchor 500)

| Token | Hex | Role |
|---|---|---|
| `sage-0` | `#F6F8F3` | — |
| `sage-50` (`sage-tint`) | `#EDF1E8` | Icon-chip background |
| `sage-100` | `#DDE6D3` | Tint border |
| `sage-200`…`sage-400` | (ramp) | reserved |
| `sage-500` (`sage`) | `#688557` | **Interactive sage** — links, back chevron, Pay Rent fill |
| `sage-600` (`sage-deep`) | `#4F7040` | **Heading sage** — page eyebrows, active bottom-tab, icon-chip fill, Pay Rent pressed |
| `sage-700`…`sage-900` | (ramp) | reserved |

Quick rule: text/icon on a sage-tint background → `sage-600`.
A standalone interactive link or button surface → `sage-500` (which is
`bg-sage` / `text-sage`).

### Warm gray (neutrals · surfaces · text)

| Token | Hex | Role |
|---|---|---|
| `warm-0` (`canvas`, `warm-card`) | `#FBFAF6` | Page bg; inset Quick-info tile bg |
| `warm-50` | `#F7F4EF` | Divider background |
| `warm-100` | `#EFEBE2` | **Default card border** (`border-warm-100`) |
| `warm-200` (`border`) | `#E7E2D8` | Border stronger |
| `warm-300` | `#DCD6CA` | — |
| `warm-400` | `#BFB8A9` | — |
| `warm-500` | `#A39D90` | **Tertiary text** — chevrons, "Coming soon", labels inside cards |
| `warm-600` | `#8A8475` | Close X glyphs (e.g. trash-day dismiss) |
| `warm-700` | `#726C60` | **Secondary text** — subtitles, descriptions, body copy |
| `warm-800` | `#4D483F` | — |
| `warm-900` (`ink`) | `#2B2823` | **Primary text** |
| `muted` | `#8E8270` | Legacy alias (≈ warm-600). Prefer `warm-700` for new copy. |

### Other

| Token | Hex | Use |
|---|---|---|
| `card` | `#FFFFFF` | Card surface |
| `surface` | `#F1EBE3` | Login welcome panel only |
| `danger` | `#A04A3C` | Emergency button glyph |

---

## Typography scale

Use the named classes in `index.css`. They wrap the exact px values
used across screens — never reach for `text-[NNpx]` inline anymore
unless you're prototyping.

| Class | Spec | Use on |
|---|---|---|
| `text-eyebrow` | Hanken Bold 12px · uppercase · tracking 0.09em | Section accents (with `<Eyebrow>`) |
| `text-h1` | Cal Sans 36px · leading-none | Page title |
| `text-h1-sm` | Cal Sans 28px · leading-none | Detail/viewer page title |
| `text-h2` | Cal Sans 20px · leading-tight | Section title |
| `text-money` | Cal Sans 32px · leading-none | Rent value |
| `text-label` | Cal Sans 16px · leading-tight · tracking 0.01em | Row/chip title, card heading |
| `text-body` | Hanken Medium 14px | Subtitle, description, paragraph copy |
| `text-caption` | Hanken Medium 12px | Chip sub, small descriptive lines |
| `text-button-lg` | Cal Sans 18px · tracking 0.05em | Primary CTAs (Pay Rent / Copy Zelle) |
| `text-button-md` | Cal Sans 14px · tracking 0.14px | Secondary CTAs (View breakdown) |
| `text-nav-tab` | Cal Sans 10px · leading 14px · tracking 0.3px | Bottom-pill tab labels only |

Compose freely with color/spacing utilities:
`<p class="text-body text-warm-700 mt-2">…</p>`.

**Body-font heading rule.** `index.css` `@layer base` pins `<h1>`–`<h4>`
to Cal Sans 500 line-height-1.2 by default, so a bare `<h2>` already
renders close to `text-h2`. Use the named class anyway for explicitness.

**Bold rule.** The CSS reset pins `<b>` and `<strong>` to weight 500 —
the design forbids ≥600 except the eyebrow. Don't add `font-bold`
inline; use `<Eyebrow>` (which scopes the bold to one role).

---

## Spacing

Tailwind's default rem-based scale, used as-is.

| Token | Used for |
|---|---|
| `space-y-7` (28px) | Major sections on top-level pages (header → card column) |
| `space-y-6` (24px) | Major sections on child pages |
| `space-y-4` (16px) | Card column inside a section; cards inside a card |
| `space-y-3` (12px) | Inner copy stack |
| `space-y-2.5` (10px) | Inner copy stack (e.g. QuickInfo inset stack) |
| `gap-2.5` (10px) | Icon-chip → label spacing (ListRow) |
| `gap-2` (8px) | Action-chip grid |

**Page padding.** Top-level screens: `px-6 pt-12 pb-8`. Child screens
(back-link first): `px-6 pt-4 pb-8`. The AppShell adds `pb-[120px]`
to clear the floating bottom nav.

---

## Radius

| Token | px | Use |
|---|---|---|
| `rounded-pill` | 11 | Pill buttons (Button component default) |
| `rounded-cardInner` | 12 | Inset tiles, Pay Rent button, History button |
| `rounded-card` | 16 | (Legacy — prefer `cardLg`) |
| `rounded-cardLg` | 18 | **All cards** + map preview frame |
| `rounded-hero` | 20 | Sheet top |
| `rounded-[24px]` | 24 | Floating bottom-nav pill + Emergency circle (BottomTabs) |
| `rounded-full` | ∞ | ContactRow icon, Sheet close X |

---

## Borders

`border-hair` is `0.5px`. Always pair with a color: `border-hair border-warm-100`.

---

## Component catalog

### Page-level

#### `<PageHeader>` — top of a child screen

```tsx
<PageHeader eyebrow="Setup" title="Utilities" subtitle="…" subtitleSpacing="loose" />
```

| Prop | Default | Notes |
|---|---|---|
| `eyebrow?` | — | Optional uppercase accent |
| `eyebrowTone?` | `'accent'` | `accent` (sage-600) or `subdued` (warm-500) |
| `title` | required | The H1 string |
| `subtitle?` | — | Body-M copy under the H1 |
| `size?` | `'lg'` | `lg` = 36px (top-level), `md` = 28px (DocumentView) |
| `subtitleSpacing?` | `'tight'` | `tight` = mt-1 (address-like), `loose` = mt-2 (descriptive) |

**When NOT to use it:** Home dashboard. The Home header uses tight Figma-4:392
stacking (no margins between eyebrow / h1 / subtitle) — that variant
isn't worth a prop yet. Stays inline.

#### `<BackLink to={path}>Label</BackLink>` — child-page back affordance

Always at the very top of a screen, before `<PageHeader>`. Sage,
44px tap target, chevron-left.

### Surfaces

#### `<Card>` — the one surface primitive

```tsx
<Card>…</Card>                       // default white surface
<Card variant="inset">…</Card>       // warm-tinted inner tile
<Card as="section">…</Card>          // <section> instead of <div>
<Card noPadding>…</Card>             // strip p-4 for list-card with divide-y
<Card className="space-y-4">…</Card> // compose extra utilities
```

`default` = `bg-card border-hair border-warm-100 rounded-cardLg p-4`.
`inset` = `bg-warm-card rounded-cardInner p-3` (no border).

### Sections / labels

#### `<Eyebrow tone="accent" | "subdued">` — section accent label

`accent` is sage-600 (page eyebrow). `subdued` is warm-500 (eyebrow
inside a card or quieter section).

```tsx
<Eyebrow>TUESDAY, JUNE 16</Eyebrow>          // sage-600
<Eyebrow tone="subdued">Verse of the day</Eyebrow>  // warm-500
```

The `uppercase` is applied by the class — write the content in its
natural case, the class handles the visual.

### Rows

#### `<IconChip Icon={SomeIcon} size?={20} />` — sage-tint icon tile

36×36, sage-tint background, sage-600 fill. Used at the start of a
row or at the top of a Home action chip.

#### `<ListRow Icon, label, trailing?, to | href | onClick />`

Standard row: IconChip + label (with `text-label`) + right chevron
(default trailing). Switches between Link / anchor / button / static
based on which prop you pass.

```tsx
<ListRow Icon={PowerIcon} label="Utilities" to="/property/utilities" />
```

To use ListRow as a tappable card, wrap it inside `<Card>`:

```tsx
<Card>
  <ListRow … />
  <Divider />
  <ListRow … />
</Card>
```

**When to skip ListRow:** if the *entire* card must be tappable (you
want padding + border to be in the click target), inline a `<Link>`
wrapping `<IconChip>` + label + chevron. See `Guide.tsx` "Neighborhood"
row.

### Forms

#### `<ContactRow contact, title?>` — phone/sms/email/url action

Already-built. Renders an anchor that opens the right scheme handler
(`tel:`, `sms:`, `mailto:`, https). Used in EmergencySheet, Documents,
Utilities.

#### `<Button variant="primary" | "secondary" | "ghost">` — legacy

Used only by Login. Other CTAs (Pay Rent, Copy Zelle) are inline
because they live inside cards with custom layout. If you build a new
form / standalone action, prefer Button to keep the styles aligned.

### Modals

#### `<Sheet open, onClose, title>` — bottom sheet

Already-built. Used by `<EmergencySheet>`. Esc to close, dimmed
backdrop, focus-trapped to the sheet body.

---

## "Feels wrong" checklist

Run through this before merging a screen. If any are true, you've
drifted from the system.

- ❌ A `text-[NNpx]` arbitrary value where a named class fits.
- ❌ A `text-sage` eyebrow where `text-sage-600` is correct (eyebrows go to sage-600).
- ❌ A `bg-card border-hair border-warm-100 rounded-cardLg p-4` div instead of `<Card>`.
- ❌ A back-link copy/pasted from another screen instead of `<BackLink>`.
- ❌ A page header markup-block instead of `<PageHeader>` (with Home as the documented exception).
- ❌ A `font-bold` or `font-semibold` on anything except an `<Eyebrow>`.
- ❌ A box-shadow that isn't `drop-shadow-big`.
- ❌ A new accent color. The accent is sage. That's it.
- ❌ A hardcoded hex literal. Use the token.

---

## How to build a new screen in 5 minutes

```tsx
import { BackLink } from '../components/BackLink'
import { PageHeader } from '../components/PageHeader'
import { Card } from '../components/Card'
import { Eyebrow } from '../components/Eyebrow'
import { ListRow } from '../components/ListRow'
import { SomeIcon } from '../components/icons/Icons'

export default function NewScreen() {
  return (
    <div className="px-6 pt-4 pb-8 space-y-6">
      <BackLink to="/property">Property</BackLink>
      <PageHeader eyebrow="Section name" title="Page title" subtitle="Optional description." />

      <section className="space-y-4">
        <Eyebrow tone="subdued">Group name</Eyebrow>
        <Card className="space-y-4">
          <ListRow Icon={SomeIcon} label="First item" to="/somewhere" />
        </Card>
      </section>
    </div>
  )
}
```

Top-level dashboard pages use `pt-12 space-y-7` instead of `pt-4 space-y-6`.

---

## What's out of bounds

- New accent colors / shadow variants / typeface — the design is locked.
- Changing payment routing, auth, or content config — see [`docs/CMS-SETUP.md`](./CMS-SETUP.md) and the prime directives in [`docs/AUDIT.md`](./AUDIT.md).
- Adding font-weight ≥ 600 anywhere except Eyebrow's bold-12px.
