# Bashford Tenant App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A mobile-first React tenant home base for one rental house with a shared-password gate, three bottom-tab screens (Home / Property / Guide), and a cross-cutting Emergency sheet — all content driven by one typed config file.

**Architecture:** Static Vite + React + TS SPA with Tailwind for tokens. One `AuthGate` component wraps a `BottomTabs` shell that switches between Home, Property, Guide views. A persistent `EmergencyButton` opens an `EmergencySheet` from anywhere. All editable content lives in `src/config/property.ts`. No backend, no DB, no state library — just React Context for the auth flag.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS v3 (config-based theming), React Router v6 (`MemoryRouter` or `BrowserRouter`), lucide-react icons, Cal Sans (heading) + Hanken Grotesk (body) self-hosted from Google Fonts CDN. No testing library is required by the brief; we use Vite's TS check + ESLint + manual visual verification as the verification gate. (Light testing per task is still encouraged where natural — e.g. config typing / utility functions.)

---

## File Structure

```
property-manager-app/
├── .env.example              # VITE_APP_USERNAME / VITE_APP_PASSWORD samples
├── .gitignore
├── README.md                 # run, env, content edits, deploy, security caveat
├── index.html                # font preload links, viewport meta
├── package.json
├── postcss.config.js
├── tailwind.config.ts        # design tokens from spec §7
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   ├── docs/                 # PDFs the landlord drops in (lease, etc.)
│   │   └── .gitkeep
│   └── images/
│       └── .gitkeep          # house photos
└── src/
    ├── main.tsx              # mounts <App />
    ├── App.tsx               # AuthGate → AppShell
    ├── index.css             # tailwind directives + font-face
    ├── config/
    │   └── property.ts       # ALL editable content, fully typed
    ├── auth/
    │   ├── AuthContext.tsx   # React context: { isAuthed, signIn, signOut }
    │   ├── AuthGate.tsx      # renders <Login /> until authed
    │   └── Login.tsx         # full-screen welcome login view
    ├── shell/
    │   ├── AppShell.tsx      # routes + bottom tabs + emergency strip
    │   ├── BottomTabs.tsx    # 3-tab fixed bar
    │   └── EmergencyButton.tsx  # always-visible affordance
    ├── components/
    │   ├── Card.tsx          # hairline-bordered surface
    │   ├── Button.tsx        # primary/secondary/ghost
    │   ├── Sheet.tsx         # bottom sheet / modal
    │   ├── ContactRow.tsx    # tap-to-call/email/link row
    │   ├── CopyField.tsx     # tap-to-copy (wifi password)
    │   └── EmergencySheet.tsx
    ├── screens/
    │   ├── Home.tsx          # dashboard cards (rent, wifi, etc.)
    │   ├── Property.tsx      # utilities, docs, manual, trash, lease
    │   └── Guide.tsx         # welcome, neighborhood, getting around
    └── lib/
        └── format.ts         # rent/date formatting helpers
```

---

## Task 1: Project scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `postcss.config.js`, `tailwind.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `.gitignore`, `.env.example`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "bashford-tenant-app",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx",
    "typecheck": "tsc -b --noEmit"
  },
  "dependencies": {
    "lucide-react": "^0.400.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.7",
    "typescript": "^5.5.3",
    "vite": "^5.3.4"
  }
}
```

- [ ] **Step 2: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: true },
})
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: Create `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts", "tailwind.config.ts"]
}
```

- [ ] **Step 5: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#FBF9F6" />
    <title>Bashford</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/@fontsource/cal-sans@5.0.5/index.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create `postcss.config.js`**

```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
}
```

- [ ] **Step 7: Create `tailwind.config.ts`** — encodes the §7 tokens exactly.

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FBF9F6',
        surface: '#F1EBE3',
        card: '#FFFFFF',
        sage: '#6B8557',
        'sage-deep': '#4F6B3F',
        'sage-tint': '#E7EEDD',
        ink: '#2B2419',
        muted: '#8C8273',
        border: '#E7E0D6',
        danger: '#A04A3C',
      },
      fontFamily: {
        heading: ['"Cal Sans"', 'system-ui', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '11px',
        card: '16px',
        hero: '20px',
      },
      borderWidth: {
        hair: '0.5px',
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 8: Create `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html,
  body,
  #root {
    height: 100%;
  }
  body {
    @apply bg-canvas text-ink font-body antialiased;
    font-feature-settings: 'ss01', 'cv11';
    line-height: 1.6;
  }
  h1,
  h2,
  h3,
  h4 {
    @apply font-heading text-ink;
    font-weight: 500;
    line-height: 1.2;
  }
  :focus-visible {
    @apply outline-none ring-2 ring-sage ring-offset-2 ring-offset-canvas;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
```

- [ ] **Step 9: Create `src/main.tsx`**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 10: Create `src/App.tsx` placeholder**

```tsx
export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl">Bashford — scaffolding</h1>
    </div>
  )
}
```

- [ ] **Step 11: Create `.gitignore`**

```
node_modules
dist
.DS_Store
.env
.env.local
*.log
```

- [ ] **Step 12: Create `.env.example`**

```
VITE_APP_USERNAME=bashford
VITE_APP_PASSWORD=changeme
```

- [ ] **Step 13: Install & verify**

Run: `npm install && npm run dev`
Expected: dev server starts on http://localhost:5173 and renders "Bashford — scaffolding" in Hanken Grotesk on warm-canvas background.

- [ ] **Step 14: Initial commit**

```bash
git add -A
git commit -m "chore: scaffold vite + react + tailwind"
```

---

## Task 2: Typed content config

**Files:**
- Create: `src/config/property.ts`

- [ ] **Step 1: Define the type and full content**

Create `src/config/property.ts` with the complete typed config below. `TODO:` markers flag landlord-supplied values. Every screen reads from this single source.

```ts
// src/config/property.ts
// Single source of truth for editable tenant-app content.
// Landlord: edit values here; types ensure shape stays valid.

export type ContactLink =
  | { kind: 'phone'; value: string; label?: string }
  | { kind: 'email'; value: string; label?: string }
  | { kind: 'url'; value: string; label?: string }
  | { kind: 'sms'; value: string; label?: string }

export interface UtilityProvider {
  id: string
  service: string
  provider: string
  phone?: string
  email?: string
  url?: string
  note?: string
  providedByLandlord?: boolean
}

export interface DocumentRef {
  id: string
  title: string
  /** Path under /public, e.g. "/docs/lease.pdf" */
  file: string
}

export interface ManualEntry {
  id: string
  title: string
  body: string
  /** Path under /public, e.g. "/images/thermostat.jpg" */
  photo?: string
}

export interface Announcement {
  id: string
  title: string
  date: string // ISO yyyy-mm-dd
  body: string
}

export interface GuideSpot {
  id: string
  name: string
  category: string
  town?: string
  why: string
  url?: string
}

export interface NearbyEssential {
  id: string
  label: string
  name: string
  phone?: string
  url?: string
}

export interface SeasonalTip {
  id: string
  title: string
  body: string
}

export interface PropertyConfig {
  address: {
    line1: string
    cityStateZip: string
  }
  heroPhoto?: string
  rent: {
    baseAmount: number
    internetAmount: number
    dueDayOfMonth: number
    paymentLink: string
    paymentLabel: string
    latePolicy: string
  }
  wifi: { ssid: string; password: string }
  trash: {
    garbageDay: string
    recyclingDay: string
    recyclingCadence: string
    notes: string[]
    scheduleLookupUrl: string
  }
  maintenanceContact: ContactLink
  landlord: {
    names: string
    phone: string
    email: string
    afterHoursNote: string
  }
  lease: {
    startDate: string // ISO
    endDate: string   // ISO
  }
  sharedLogin: {
    /** Displayed for tenant reference inside the app (not for auth). */
    username: string
    password: string
  }
  utilities: UtilityProvider[]
  documents: DocumentRef[]
  manual: ManualEntry[]
  announcements: Announcement[]
  welcomeNote: string
  guide: {
    spots: GuideSpot[]
    nearby: NearbyEssential[]
    communityNote?: string
  }
  seasonalTips: SeasonalTip[]
  emergency: {
    waterShutoffLocation: string
    waterShutoffPhoto?: string
    breakerPanelLocation: string
    gasGuidance: string
    gasEmergencyLine: string
  }
}

export const property: PropertyConfig = {
  address: {
    line1: '5716 Bashford Crest Ln',
    cityStateZip: 'Raleigh, NC 27606',
  },
  heroPhoto: undefined, // TODO: landlord drop a hero image into /public/images and reference it here

  rent: {
    baseAmount: 0, // TODO: set base monthly rent (excluding internet)
    internetAmount: 70,
    dueDayOfMonth: 1, // TODO: confirm due day
    paymentLink: 'https://venmo.com/', // TODO: final Venmo deep link
    paymentLabel: 'Pay with Venmo',
    latePolicy:
      'Rent is due on the 1st. A late fee applies after the 5th — see your lease for details.', // TODO: confirm
  },

  wifi: {
    ssid: 'Bashford', // TODO: confirm SSID
    password: 'CHANGE_ME', // TODO: set wifi password
  },

  trash: {
    garbageDay: 'Tuesday',         // TODO: confirm
    recyclingDay: 'Tuesday',       // TODO: confirm
    recyclingCadence: 'every other week',
    notes: [
      'Garbage and yard waste are collected weekly.',
      'Recycling is collected every other week.',
      'Use only City-issued carts.',
      'Place bins at the curb the night before, not in the street.',
    ],
    scheduleLookupUrl: 'https://raleighnc.gov',
  },

  maintenanceContact: {
    kind: 'sms',
    value: '+19195551234', // TODO: landlord phone for maintenance texts
    label: 'Text us about it',
  },

  landlord: {
    names: 'Jason & Abby',
    phone: '+19195551234', // TODO: real phone
    email: 'jason@example.com', // TODO: real email
    afterHoursNote:
      'For urgent issues after hours, call or text — we will get back to you as soon as we can.',
  },

  lease: {
    startDate: '2026-01-01', // TODO: confirm
    endDate: '2026-12-31',   // TODO: confirm
  },

  sharedLogin: {
    username: 'bashford',
    password: 'see .env / ask landlord',
  },

  utilities: [
    {
      id: 'electric',
      service: 'Electricity',
      provider: 'Duke Energy Progress',
      phone: '1-800-452-2777',
      url: 'https://www.duke-energy.com',
      note: 'Set up in your name, effective on your lease start date.',
    },
    {
      id: 'gas',
      service: 'Natural gas',
      provider: 'Enbridge Gas North Carolina',
      phone: '1-877-776-2427',
      url: 'https://www.enbridgegas.com/north-carolina',
      note: 'Set up in your name.',
    },
    {
      id: 'water',
      service: 'Water, sewer, garbage & recycling',
      provider: 'City of Raleigh (Raleigh Water)',
      phone: '919-996-3245',
      email: 'customercare@raleighnc.gov',
      url: 'https://raleighnc.gov',
      note: 'Water, sewer, garbage, and recycling all appear on one combined City bill.',
    },
    {
      id: 'internet',
      service: 'Internet',
      provider: 'Google Fiber',
      providedByLandlord: true,
      note: 'Provided by the landlord at $70/month added to rent. Contact the landlord for connectivity issues.',
    },
  ],

  documents: [
    { id: 'lease', title: 'Lease agreement', file: '/docs/lease.pdf' },
    { id: 'inspection', title: 'Move-in / move-out checklist', file: '/docs/inspection.pdf' },
    { id: 'welcome', title: 'Welcome & house rules', file: '/docs/welcome.pdf' },
    { id: 'utilities', title: 'Utilities setup guide', file: '/docs/utilities.pdf' },
    { id: 'deposit', title: 'Security deposit receipt', file: '/docs/deposit.pdf' },
  ],

  manual: [
    {
      id: 'thermostat',
      title: 'Thermostat & HVAC',
      body: 'TODO: how the thermostat works, recommended settings, filter location and replacement cadence.',
    },
    {
      id: 'water-shutoff',
      title: 'Water shut-off location',
      body: 'TODO: where the main shut-off valve is and how to turn it off in an emergency.',
    },
    {
      id: 'breaker',
      title: 'Breaker panel location',
      body: 'TODO: where the breaker panel is and which breaker covers which area.',
    },
    {
      id: 'disposal',
      title: 'Garbage disposal reset',
      body: 'TODO: how to reset the disposal if it stops working (red button on the underside).',
    },
    {
      id: 'appliances',
      title: 'Appliance quirks & notes',
      body: 'TODO: anything to know about the fridge, oven, washer, dryer, dishwasher.',
    },
    {
      id: 'yard',
      title: 'Lawn & yard expectations',
      body: 'TODO: who handles mowing, where yard waste goes, anything else to know.',
    },
  ],

  announcements: [],

  welcomeNote:
    'Welcome to Bashford! We are so glad you are here. This is a home we love and we hope it feels the same to you. The notes below are a few of our favorite local spots and the everyday things that make life here easier. If anything is unclear or you ever need a hand, text us — we are right around the corner.',

  guide: {
    spots: [
      { id: 'cultivate', name: 'Cultivate Coffee Roasters', category: 'Coffee', town: 'Fuquay-Varina', why: 'Our go-to for slow mornings and good beans.' },
      { id: 'bass-lake', name: 'Bass Lake Park', category: 'Parks & trails', town: 'Holly Springs', why: 'Easy lake loop, great for a quick walk.' },
      { id: 'hilltop', name: 'Hilltop Needmore Town Park', category: 'Parks & trails', town: 'Fuquay-Varina', why: 'Bigger trail network if you want to stretch out.' },
      { id: 'fv-dog-park', name: 'Fuquay-Varina Dog Park', category: 'Dog-friendly', town: 'Fuquay-Varina', why: 'Nicely kept and rarely too crowded.' },
      { id: 'aviator', name: 'Aviator Brewing', category: 'Eats & drinks', town: 'Fuquay-Varina', why: 'Local brewery with a casual food scene.' },
      { id: 'grocery', name: 'Harris Teeter', category: 'Grocery & essentials', town: 'Raleigh', why: 'Closest full grocery for the everyday stuff.' },
    ],
    nearby: [
      { id: 'er', label: 'Nearest ER', name: 'WakeMed Cary Hospital' },
      { id: 'urgent', label: 'Urgent care', name: 'TODO: closest urgent care' },
      { id: 'pharmacy', label: 'Pharmacy', name: 'TODO: nearest pharmacy' },
      { id: 'hardware', label: 'Hardware store', name: 'TODO: nearest Lowe\'s or Ace' },
      { id: 'gas', label: 'Gas station', name: 'TODO: closest gas station' },
      { id: 'vet', label: 'Vet', name: 'TODO: recommended vet' },
    ],
    communityNote: undefined,
  },

  seasonalTips: [
    { id: 'pollen', title: 'Pollen season', body: 'Spring is rough in NC — change your HVAC filter monthly through April.' },
    { id: 'freeze', title: 'First freeze', body: 'Cover the outdoor faucet before the first hard freeze (usually mid-November).' },
  ],

  emergency: {
    waterShutoffLocation: 'TODO: describe where the main water shut-off is.',
    breakerPanelLocation: 'TODO: describe where the breaker panel is.',
    gasGuidance:
      'If you smell gas, leave the house immediately, then call 911 followed by Enbridge.',
    gasEmergencyLine: '1-877-776-2427',
  },
}
```

- [ ] **Step 2: Verify type compile**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/config/property.ts
git commit -m "feat: typed property content config"
```

---

## Task 3: Auth gate (light client-side)

**Files:**
- Create: `src/auth/AuthContext.tsx`, `src/auth/AuthGate.tsx`, `src/auth/Login.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `src/auth/AuthContext.tsx`**

```tsx
// Light client-side gate — NOT real authentication.
// This deters casual access only. Credentials live in `.env` (VITE_APP_USERNAME /
// VITE_APP_PASSWORD) and are shipped in the client bundle. Anyone with the bundle can
// recover them. Do not store anything sensitive behind this gate. This is an
// intentional tradeoff for a personal single-tenant app — do not "fix" by adding a
// real backend.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface AuthState {
  isAuthed: boolean
  signIn: (username: string, password: string, remember: boolean) => boolean
  signOut: () => void
}

const STORAGE_KEY = 'bashford.authed'

const AuthCtx = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState<boolean>(false)

  useEffect(() => {
    if (
      sessionStorage.getItem(STORAGE_KEY) === '1' ||
      localStorage.getItem(STORAGE_KEY) === '1'
    ) {
      setIsAuthed(true)
    }
  }, [])

  const signIn = useCallback((username: string, password: string, remember: boolean) => {
    const okUser = import.meta.env.VITE_APP_USERNAME ?? ''
    const okPass = import.meta.env.VITE_APP_PASSWORD ?? ''
    if (username.trim() === okUser && password === okPass) {
      sessionStorage.setItem(STORAGE_KEY, '1')
      if (remember) localStorage.setItem(STORAGE_KEY, '1')
      setIsAuthed(true)
      return true
    }
    return false
  }, [])

  const signOut = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STORAGE_KEY)
    setIsAuthed(false)
  }, [])

  const value = useMemo(() => ({ isAuthed, signIn, signOut }), [isAuthed, signIn, signOut])
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const v = useContext(AuthCtx)
  if (!v) throw new Error('useAuth must be used inside <AuthProvider>')
  return v
}
```

- [ ] **Step 2: Create `src/auth/Login.tsx`**

```tsx
import { useState } from 'react'
import { useAuth } from './AuthContext'
import { property } from '../config/property'

export default function Login() {
  const { signIn } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const ok = signIn(username, password, remember)
    if (!ok) setError('That username or password didn\'t match. Try again.')
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <div className="flex-1 flex flex-col justify-end p-6 pt-16 bg-surface">
        <p className="text-xs tracking-widest text-muted uppercase">Welcome to</p>
        <h1 className="font-heading text-4xl mt-1">Bashford</h1>
        <p className="text-muted mt-2 max-w-sm">
          {property.address.line1} · {property.address.cityStateZip}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-canvas p-6 space-y-4 max-w-md w-full mx-auto"
      >
        <label className="block">
          <span className="text-sm text-muted">Username</span>
          <input
            autoCapitalize="none"
            autoCorrect="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full bg-card border-hair border-border rounded-pill px-4 py-3 text-ink"
          />
        </label>
        <label className="block">
          <span className="text-sm text-muted">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full bg-card border-hair border-border rounded-pill px-4 py-3 text-ink"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="accent-sage"
          />
          Keep me signed in on this device
        </label>
        {error && <p className="text-danger text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-sage text-white rounded-pill py-3 font-medium active:bg-sage-deep active:scale-[0.98] transition"
        >
          Sign in
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 3: Create `src/auth/AuthGate.tsx`**

```tsx
import { useAuth } from './AuthContext'
import Login from './Login'

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthed } = useAuth()
  return isAuthed ? <>{children}</> : <Login />
}
```

- [ ] **Step 4: Wire into `src/App.tsx`**

Replace the placeholder `App.tsx`:

```tsx
import { AuthProvider } from './auth/AuthContext'
import AuthGate from './auth/AuthGate'

export default function App() {
  return (
    <AuthProvider>
      <AuthGate>
        <div className="p-6">
          <h1 className="font-heading text-2xl">Signed in</h1>
          <p className="text-muted">Shell will render here.</p>
        </div>
      </AuthGate>
    </AuthProvider>
  )
}
```

- [ ] **Step 5: Create `.env` from `.env.example`**

```bash
cp .env.example .env
```

- [ ] **Step 6: Manually verify**

Run: `npm run dev`. Open at narrow width (DevTools ~390px). Confirm:
- Login screen renders warm, sage button.
- Wrong creds → red error.
- Right creds (from `.env`) → "Signed in" view.
- Refresh keeps you in (sessionStorage).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: light client-side auth gate with login screen"
```

---

## Task 4: Shared primitives (Card, Button, Sheet, ContactRow, CopyField)

**Files:**
- Create: `src/components/Card.tsx`, `src/components/Button.tsx`, `src/components/Sheet.tsx`, `src/components/ContactRow.tsx`, `src/components/CopyField.tsx`

- [ ] **Step 1: `src/components/Card.tsx`**

```tsx
import { type HTMLAttributes } from 'react'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        'bg-card border-hair border-border rounded-card p-4 ' + className
      }
      {...props}
    />
  )
}
```

- [ ] **Step 2: `src/components/Button.tsx`**

```tsx
import { type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  fullWidth?: boolean
}

const styles: Record<Variant, string> = {
  primary:
    'bg-sage text-white active:bg-sage-deep border-transparent',
  secondary:
    'bg-card text-ink border-border hover:bg-surface',
  ghost: 'bg-transparent text-ink border-transparent hover:bg-surface',
}

export function Button({
  variant = 'primary',
  fullWidth,
  className = '',
  ...rest
}: Props) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-pill border-hair px-5 py-3 font-medium',
        'transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sage',
        'min-h-[44px]',
        fullWidth ? 'w-full' : '',
        styles[variant],
        className,
      ].join(' ')}
      {...rest}
    />
  )
}
```

- [ ] **Step 3: `src/components/Sheet.tsx`** — modal bottom sheet for emergency + details

```tsx
import { useEffect } from 'react'
import { X } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Sheet({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-end justify-center"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/30"
      />
      <div className="relative w-full max-w-md bg-canvas rounded-t-hero p-6 max-h-[85vh] overflow-y-auto border-t-hair border-border">
        <div className="flex items-start justify-between mb-4">
          <h2 className="font-heading text-2xl">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-surface"
            aria-label="Close sheet"
          >
            <X size={18} className="text-muted" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: `src/components/ContactRow.tsx`**

```tsx
import { Phone, Mail, MessageSquare, ExternalLink } from 'lucide-react'
import type { ContactLink } from '../config/property'

const ICON = {
  phone: Phone,
  email: Mail,
  sms: MessageSquare,
  url: ExternalLink,
} as const

function hrefFor(c: ContactLink): string {
  switch (c.kind) {
    case 'phone':
      return `tel:${c.value.replace(/[^+\d]/g, '')}`
    case 'sms':
      return `sms:${c.value.replace(/[^+\d]/g, '')}`
    case 'email':
      return `mailto:${c.value}`
    case 'url':
      return c.value
  }
}

interface Props {
  contact: ContactLink
  title?: string
}

export function ContactRow({ contact, title }: Props) {
  const Icon = ICON[contact.kind]
  return (
    <a
      href={hrefFor(contact)}
      className="flex items-center gap-3 py-3 min-h-[44px] hover:bg-surface rounded-pill px-2 -mx-2"
    >
      <span className="bg-sage-tint text-sage-deep p-2 rounded-full">
        <Icon size={16} />
      </span>
      <span className="flex-1">
        <span className="block text-ink">{title ?? contact.label ?? contact.value}</span>
        {title && <span className="block text-muted text-sm">{contact.value}</span>}
      </span>
    </a>
  )
}
```

- [ ] **Step 5: `src/components/CopyField.tsx`**

```tsx
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface Props {
  label: string
  value: string
}

export function CopyField({ label, value }: Props) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* no-op: clipboard may not be available */
    }
  }
  return (
    <button
      onClick={copy}
      className="w-full flex items-center justify-between text-left py-2 rounded-pill px-3 hover:bg-surface min-h-[44px]"
    >
      <span>
        <span className="block text-muted text-xs">{label}</span>
        <span className="block font-medium">{value}</span>
      </span>
      {copied ? (
        <Check size={16} className="text-sage" />
      ) : (
        <Copy size={16} className="text-muted" />
      )}
    </button>
  )
}
```

- [ ] **Step 6: Typecheck & commit**

```bash
npm run typecheck
git add -A
git commit -m "feat: shared UI primitives"
```

---

## Task 5: App shell — bottom tabs, routes, emergency strip

**Files:**
- Create: `src/shell/AppShell.tsx`, `src/shell/BottomTabs.tsx`, `src/shell/EmergencyButton.tsx`, `src/components/EmergencySheet.tsx`, `src/screens/Home.tsx`, `src/screens/Property.tsx`, `src/screens/Guide.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Placeholder screens**

`src/screens/Home.tsx`:
```tsx
export default function Home() {
  return <div className="p-4"><h1 className="font-heading text-2xl">Home</h1></div>
}
```

`src/screens/Property.tsx`:
```tsx
export default function Property() {
  return <div className="p-4"><h1 className="font-heading text-2xl">Property</h1></div>
}
```

`src/screens/Guide.tsx`:
```tsx
export default function Guide() {
  return <div className="p-4"><h1 className="font-heading text-2xl">Guide</h1></div>
}
```

- [ ] **Step 2: `src/components/EmergencySheet.tsx`**

```tsx
import { Sheet } from './Sheet'
import { property } from '../config/property'
import { ContactRow } from './ContactRow'

interface Props {
  open: boolean
  onClose: () => void
}

export function EmergencySheet({ open, onClose }: Props) {
  const e = property.emergency
  return (
    <Sheet open={open} onClose={onClose} title="Emergency info">
      <p className="text-ink">
        For life-threatening emergencies, <strong>call 911 first.</strong>
      </p>
      <div className="space-y-4 mt-4">
        <section>
          <h3 className="text-sm uppercase tracking-widest text-muted">Water shut-off</h3>
          <p className="mt-1">{e.waterShutoffLocation}</p>
          {e.waterShutoffPhoto && (
            <img
              src={e.waterShutoffPhoto}
              alt="Water shut-off location"
              className="mt-2 rounded-card border-hair border-border"
            />
          )}
        </section>
        <section>
          <h3 className="text-sm uppercase tracking-widest text-muted">Gas leak</h3>
          <p className="mt-1">{e.gasGuidance}</p>
          <ContactRow
            contact={{ kind: 'phone', value: e.gasEmergencyLine, label: 'Enbridge emergency line' }}
            title="Enbridge emergency line"
          />
        </section>
        <section>
          <h3 className="text-sm uppercase tracking-widest text-muted">Breaker panel</h3>
          <p className="mt-1">{e.breakerPanelLocation}</p>
        </section>
        <section>
          <h3 className="text-sm uppercase tracking-widest text-muted">Landlord after-hours</h3>
          <p className="mt-1">{property.landlord.afterHoursNote}</p>
          <ContactRow
            contact={{ kind: 'phone', value: property.landlord.phone, label: property.landlord.names }}
            title={`Call ${property.landlord.names}`}
          />
        </section>
      </div>
    </Sheet>
  )
}
```

- [ ] **Step 3: `src/shell/EmergencyButton.tsx`** — always-visible strip

```tsx
import { AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { EmergencySheet } from '../components/EmergencySheet'

export function EmergencyButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm text-danger bg-card border-hair border-border rounded-pill px-3 py-2 min-h-[36px]"
        aria-label="Open emergency info"
      >
        <AlertTriangle size={14} />
        Emergency
      </button>
      <EmergencySheet open={open} onClose={() => setOpen(false)} />
    </>
  )
}
```

- [ ] **Step 4: `src/shell/BottomTabs.tsx`**

```tsx
import { NavLink } from 'react-router-dom'
import { Home as HomeIcon, House, Compass } from 'lucide-react'

const tabs = [
  { to: '/', label: 'Home', icon: HomeIcon, end: true },
  { to: '/property', label: 'Property', icon: House, end: false },
  { to: '/guide', label: 'Guide', icon: Compass, end: false },
]

export function BottomTabs() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-canvas border-t-hair border-border">
      <ul className="flex max-w-md mx-auto">
        {tabs.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'flex flex-col items-center gap-1 py-2 text-xs',
                  isActive ? 'text-sage' : 'text-muted',
                ].join(' ')
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}
```

- [ ] **Step 5: `src/shell/AppShell.tsx`**

```tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BottomTabs } from './BottomTabs'
import { EmergencyButton } from './EmergencyButton'
import Home from '../screens/Home'
import Property from '../screens/Property'
import Guide from '../screens/Guide'

export function AppShell() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-canvas">
        <div className="max-w-md mx-auto pb-24">
          <div className="px-4 pt-3 flex justify-end">
            <EmergencyButton />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property" element={<Property />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <BottomTabs />
      </div>
    </BrowserRouter>
  )
}
```

- [ ] **Step 6: Wire shell into App**

`src/App.tsx`:
```tsx
import { AuthProvider } from './auth/AuthContext'
import AuthGate from './auth/AuthGate'
import { AppShell } from './shell/AppShell'

export default function App() {
  return (
    <AuthProvider>
      <AuthGate>
        <AppShell />
      </AuthGate>
    </AuthProvider>
  )
}
```

- [ ] **Step 7: Verify**

`npm run dev`. Sign in → see three tabs at the bottom, switch between them, click Emergency → sheet opens, Esc closes it.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: app shell with bottom tabs and emergency sheet"
```

---

## Task 6: Home screen

**Files:**
- Create: `src/lib/format.ts`
- Modify: `src/screens/Home.tsx`

- [ ] **Step 1: `src/lib/format.ts`**

```ts
export function formatMoney(cents: number): string {
  return cents.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0])
}

export function formatDate(iso: string): string {
  // Treat YYYY-MM-DD as a local calendar date — avoid TZ shift on phones.
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
```

- [ ] **Step 2: Implement `src/screens/Home.tsx`**

```tsx
import { property } from '../config/property'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { ContactRow } from '../components/ContactRow'
import { CopyField } from '../components/CopyField'
import { formatMoney, ordinal, formatDate } from '../lib/format'
import { Wifi, Trash2, Wrench, Phone, MessageSquare } from 'lucide-react'

export default function Home() {
  const { rent, wifi, trash, maintenanceContact, landlord, announcements, heroPhoto, address } = property
  const total = rent.baseAmount + rent.internetAmount

  return (
    <div className="px-4 space-y-4">
      {/* Hero */}
      <div className="rounded-hero overflow-hidden border-hair border-border bg-surface">
        {heroPhoto ? (
          <img src={heroPhoto} alt="Bashford" className="w-full h-44 object-cover" />
        ) : (
          <div className="w-full h-44 bg-sage-tint" aria-hidden />
        )}
        <div className="p-5 bg-card">
          <p className="text-xs tracking-widest text-muted uppercase">Welcome to</p>
          <h1 className="font-heading text-3xl mt-1">Bashford</h1>
          <p className="text-muted mt-1">{address.line1} · {address.cityStateZip}</p>
        </div>
      </div>

      {/* Rent */}
      <Card>
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs text-muted uppercase tracking-widest">Rent</p>
            <p className="font-heading text-3xl mt-1">{formatMoney(total)}</p>
            <p className="text-muted text-sm mt-1">
              Due the {ordinal(rent.dueDayOfMonth)} · includes ${rent.internetAmount} internet
            </p>
          </div>
        </div>
        <Button
          fullWidth
          className="mt-4"
          onClick={() => window.open(rent.paymentLink, '_blank', 'noopener')}
        >
          {rent.paymentLabel}
        </Button>
      </Card>

      {/* Quick info: wifi + trash */}
      <Card>
        <div className="flex items-center gap-2 mb-2">
          <Wifi size={16} className="text-sage" />
          <h2 className="font-heading text-lg">Wifi & trash</h2>
        </div>
        <CopyField label="Network" value={wifi.ssid} />
        <CopyField label="Password" value={wifi.password} />
        <div className="flex items-start gap-2 pt-3 border-t-hair border-border mt-2">
          <Trash2 size={16} className="text-sage mt-1" />
          <p className="text-sm">
            Garbage: {trash.garbageDay} · Recycling: {trash.recyclingDay} ({trash.recyclingCadence})
          </p>
        </div>
      </Card>

      {/* Report a problem */}
      <Card>
        <div className="flex items-center gap-2 mb-2">
          <Wrench size={16} className="text-sage" />
          <h2 className="font-heading text-lg">Something not working?</h2>
        </div>
        <p className="text-muted text-sm">Let us know — we will sort it out.</p>
        <ContactRow contact={maintenanceContact} title={maintenanceContact.label ?? 'Reach maintenance'} />
      </Card>

      {/* Announcements */}
      <Card>
        <h2 className="font-heading text-lg">Announcements</h2>
        {announcements.length === 0 ? (
          <p className="text-muted text-sm mt-2">All quiet — nothing new from us right now.</p>
        ) : (
          <ul className="mt-2 space-y-3">
            {announcements.map((a) => (
              <li key={a.id}>
                <p className="text-xs text-muted uppercase tracking-widest">{formatDate(a.date)}</p>
                <p className="font-medium">{a.title}</p>
                <p className="text-sm text-muted">{a.body}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Quick contact */}
      <Card>
        <h2 className="font-heading text-lg">Reach {landlord.names}</h2>
        <ContactRow
          contact={{ kind: 'phone', value: landlord.phone, label: 'Call' }}
          title="Call"
        />
        <ContactRow
          contact={{ kind: 'sms', value: landlord.phone, label: 'Text' }}
          title="Text"
        />
        <ContactRow
          contact={{ kind: 'email', value: landlord.email, label: landlord.email }}
          title="Email"
        />
      </Card>
    </div>
  )
}
```

(Imports `Phone` / `MessageSquare` are unused — drop them. Actually used: `Wifi`, `Trash2`, `Wrench`. Keep imports tight to pass `noUnusedLocals`.)

Final import line for `Home.tsx`:
```tsx
import { Wifi, Trash2, Wrench } from 'lucide-react'
```

- [ ] **Step 3: Verify** — `npm run dev`. Home renders cards in order: hero, rent, wifi+trash, report problem, announcements (empty state), contact. Tap wifi password — clipboard icon flips to check. "Pay rent" opens the configured URL in a new tab.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: home dashboard"
```

---

## Task 7: Property screen

**Files:**
- Modify: `src/screens/Property.tsx`

- [ ] **Step 1: Implement**

```tsx
import { property } from '../config/property'
import { Card } from '../components/Card'
import { ContactRow } from '../components/ContactRow'
import { formatMoney, formatDate, ordinal } from '../lib/format'
import { FileText, Zap, Flame, Droplet, Wifi as WifiIcon, Trash2 } from 'lucide-react'

const utilityIcon: Record<string, typeof Zap> = {
  electric: Zap,
  gas: Flame,
  water: Droplet,
  internet: WifiIcon,
}

export default function Property() {
  const { utilities, documents, manual, trash, rent, lease, landlord, sharedLogin } = property
  const totalRent = rent.baseAmount + rent.internetAmount

  return (
    <div className="px-4 space-y-6">
      <header className="pt-2">
        <h1 className="font-heading text-3xl">Property</h1>
        <p className="text-muted text-sm">Everything about the house and your tenancy.</p>
      </header>

      {/* Utilities */}
      <section>
        <h2 className="font-heading text-xl mb-3">Utilities</h2>
        <div className="space-y-3">
          {utilities.map((u) => {
            const Icon = utilityIcon[u.id] ?? Zap
            return (
              <Card key={u.id}>
                <div className="flex items-start gap-3">
                  <span className="bg-sage-tint text-sage-deep p-2 rounded-full">
                    <Icon size={16} />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs text-muted uppercase tracking-widest">{u.service}</p>
                    <p className="font-heading text-lg">{u.provider}</p>
                    {u.note && <p className="text-sm text-muted mt-1">{u.note}</p>}
                    {u.providedByLandlord ? null : (
                      <div className="mt-2">
                        {u.phone && (
                          <ContactRow
                            contact={{ kind: 'phone', value: u.phone }}
                            title="Call to set up"
                          />
                        )}
                        {u.email && (
                          <ContactRow
                            contact={{ kind: 'email', value: u.email }}
                            title={u.email}
                          />
                        )}
                        {u.url && (
                          <ContactRow
                            contact={{ kind: 'url', value: u.url, label: 'Set up service' }}
                            title="Set up online"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Documents */}
      <section>
        <h2 className="font-heading text-xl mb-3">Documents</h2>
        <Card>
          <ul className="divide-y divide-border">
            {documents.map((d) => (
              <li key={d.id}>
                <a
                  href={d.file}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 py-3 min-h-[44px]"
                >
                  <FileText size={16} className="text-sage" />
                  <span className="flex-1">{d.title}</span>
                  <span className="text-muted text-xs">View</span>
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* House manual */}
      <section>
        <h2 className="font-heading text-xl mb-3">House manual</h2>
        <div className="space-y-3">
          {manual.map((m) => (
            <Card key={m.id}>
              <h3 className="font-heading text-lg">{m.title}</h3>
              {m.photo && (
                <img
                  src={m.photo}
                  alt={m.title}
                  className="rounded-card border-hair border-border my-3"
                />
              )}
              <p className="text-sm whitespace-pre-line text-ink/90">{m.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Trash & recycling */}
      <section>
        <h2 className="font-heading text-xl mb-3">Trash & recycling</h2>
        <Card>
          <div className="flex items-start gap-3">
            <Trash2 size={16} className="text-sage mt-1" />
            <div className="flex-1 text-sm">
              <p>Garbage: <strong>{trash.garbageDay}</strong></p>
              <p>Recycling: <strong>{trash.recyclingDay}</strong> ({trash.recyclingCadence})</p>
              <ul className="mt-3 space-y-1 list-disc list-inside text-muted">
                {trash.notes.map((n, i) => <li key={i}>{n}</li>)}
              </ul>
              <a
                href={trash.scheduleLookupUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-sage underline underline-offset-2"
              >
                Look up your schedule on raleighnc.gov
              </a>
            </div>
          </div>
        </Card>
      </section>

      {/* Rent details */}
      <section>
        <h2 className="font-heading text-xl mb-3">Rent & payment details</h2>
        <Card>
          <p className="text-sm">
            Total monthly rent: <strong>{formatMoney(totalRent)}</strong>
          </p>
          <p className="text-sm text-muted mt-1">
            Base {formatMoney(rent.baseAmount)} + {formatMoney(rent.internetAmount)} internet.
            Due the {ordinal(rent.dueDayOfMonth)} of each month.
          </p>
          <p className="text-sm text-muted mt-3">{rent.latePolicy}</p>
          <a
            href={rent.paymentLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-sage underline underline-offset-2"
          >
            How payment works
          </a>
        </Card>
      </section>

      {/* Lease & contact */}
      <section>
        <h2 className="font-heading text-xl mb-3">Lease & contact</h2>
        <Card>
          <p className="text-sm">
            Lease term: <strong>{formatDate(lease.startDate)}</strong> – <strong>{formatDate(lease.endDate)}</strong>
          </p>
          <div className="mt-3">
            <p className="text-xs text-muted uppercase tracking-widest">Landlord</p>
            <p className="font-medium">{landlord.names}</p>
            <ContactRow contact={{ kind: 'phone', value: landlord.phone }} title="Call" />
            <ContactRow contact={{ kind: 'email', value: landlord.email }} title="Email" />
          </div>
          <div className="mt-3 border-t-hair border-border pt-3">
            <p className="text-xs text-muted uppercase tracking-widest">App login (for reference)</p>
            <p className="text-sm">Username: <strong>{sharedLogin.username}</strong></p>
            <p className="text-sm">Password: <strong>{sharedLogin.password}</strong></p>
          </div>
        </Card>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Verify** — `npm run dev`. Navigate to Property tab. Confirm utilities render (4 cards: Duke, Enbridge, Raleigh, Google Fiber with no setup links), documents list, manual entries, trash card, rent detail, lease + login card.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: property screen with utilities, documents, manual, trash, lease"
```

---

## Task 8: Guide screen

**Files:**
- Modify: `src/screens/Guide.tsx`

- [ ] **Step 1: Implement**

```tsx
import { property } from '../config/property'
import { Card } from '../components/Card'
import { ExternalLink } from 'lucide-react'

export default function Guide() {
  const { welcomeNote, guide, seasonalTips, landlord } = property

  const grouped = guide.spots.reduce<Record<string, typeof guide.spots>>((acc, s) => {
    acc[s.category] = acc[s.category] ?? []
    acc[s.category]!.push(s)
    return acc
  }, {})

  return (
    <div className="px-4 space-y-6">
      <header className="pt-2">
        <h1 className="font-heading text-3xl">Guide</h1>
        <p className="text-muted text-sm">A few favorites from {landlord.names}.</p>
      </header>

      {/* Welcome */}
      <Card>
        <p className="text-xs uppercase tracking-widest text-muted">A note from {landlord.names}</p>
        <p className="mt-2 whitespace-pre-line">{welcomeNote}</p>
      </Card>

      {/* Neighborhood */}
      <section>
        <h2 className="font-heading text-xl mb-3">Neighborhood</h2>
        <div className="space-y-5">
          {Object.entries(grouped).map(([cat, spots]) => (
            <div key={cat}>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">{cat}</p>
              <div className="space-y-3">
                {spots.map((s) => (
                  <Card key={s.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-heading text-lg">{s.name}</p>
                        {s.town && (
                          <p className="text-xs text-muted">{s.town}</p>
                        )}
                        <p className="text-sm text-muted mt-1">{s.why}</p>
                      </div>
                      {s.url && (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${s.name}`}
                          className="text-sage p-2"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Getting around */}
      <section>
        <h2 className="font-heading text-xl mb-3">Getting around</h2>
        <Card>
          <ul className="divide-y divide-border">
            {guide.nearby.map((n) => (
              <li key={n.id} className="py-3">
                <p className="text-xs text-muted uppercase tracking-widest">{n.label}</p>
                <div className="flex items-center justify-between">
                  <p>{n.name}</p>
                  {n.url && (
                    <a href={n.url} target="_blank" rel="noreferrer" className="text-sage text-sm">
                      Open
                    </a>
                  )}
                  {n.phone && !n.url && (
                    <a href={`tel:${n.phone.replace(/[^+\d]/g, '')}`} className="text-sage text-sm">
                      Call
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Community (optional) */}
      {guide.communityNote && (
        <section>
          <h2 className="font-heading text-xl mb-3">Community</h2>
          <Card>
            <p className="whitespace-pre-line">{guide.communityNote}</p>
          </Card>
        </section>
      )}

      {/* Seasonal */}
      <section>
        <h2 className="font-heading text-xl mb-3">Seasonal tips</h2>
        <div className="space-y-3">
          {seasonalTips.map((t) => (
            <Card key={t.id}>
              <p className="font-heading text-lg">{t.title}</p>
              <p className="text-sm text-muted mt-1">{t.body}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Verify** — `npm run dev`. Guide tab renders welcome note, neighborhood spots grouped by category with town labels, getting-around list, seasonal tips.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: guide screen with welcome, neighborhood, seasonal tips"
```

---

## Task 9: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README**

```markdown
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

## Security note (important)

The password gate is **light client-side protection** — anyone who downloads the bundle can extract the credentials. It deters casual access only. Do not put truly sensitive data (SSNs, bank account numbers, full financial documents) behind it. The lease PDF, house manual, wifi password, and landlord phone number are fine; treat anything beyond that case-by-case.

## Tech

Vite · React · TypeScript · Tailwind · React Router · lucide-react
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with setup, content, and security notes"
```

---

## Task 10: Final verification pass

- [ ] **Step 1: Typecheck & build**

```bash
npm run typecheck
npm run build
```
Expected: both pass clean.

- [ ] **Step 2: Visual run-through at 390px viewport**

`npm run dev`. In Chrome DevTools, set width to 390px. Walk through:
1. Login screen — warm, sage button, error on bad creds.
2. Home — hero, rent (sage primary), wifi+trash, report-problem, announcements empty state, contact.
3. Property — utilities (4), documents, manual, trash, rent details, lease+login.
4. Guide — welcome, neighborhood grouped, getting around, seasonal tips.
5. Emergency button (top right of each screen) opens sheet, Esc closes.
6. Bottom tabs always visible, active tab uses sage.

- [ ] **Step 3: "Feels wrong" checklist (from spec §7)**

Confirm none of these are present anywhere:
- pure-white page background (canvas is `#FBF9F6`)
- drop shadows
- gradients
- Inter / Roboto / system font in headings
- more than one accent color
- 700-weight headings
- cramped spacing
- 1px+ hard gray borders (we use 0.5px hairline)

- [ ] **Step 4: Final commit if any tweaks**

```bash
git add -A
git commit -m "chore: final pass — typecheck, visual review, design tokens"
```

---

## Self-review against the brief

- §1 constraints: single property hard-coded ✓ · one shared login ✓ · no payment backend (deep link) ✓ · no sensitive data flows ✓ · mobile-first ✓
- §2 stack: Vite/React/TS/Tailwind/router/lucide ✓ — Tailwind tokens encoded in config ✓
- §3 auth gate: env-based, sessionStorage + optional localStorage ✓ · explicit security comments ✓
- §4 three tabs + persistent emergency strip ✓
- §5.1 Home cards in priority order ✓
- §5.2 Property covers utilities (exact data), documents, manual, trash, rent details, lease+login ✓
- §5.3 Guide: welcome, neighborhood by category with town tags, getting around, optional community, seasonal ✓
- §5.4 Emergency sheet with water shutoff, gas, breaker, landlord after-hours, 911 reminder ✓
- §6 single typed config with TODOs ✓
- §7 design tokens encoded; no shadows/gradients; sage-only accent; hairline borders ✓
- §8 deliverables: app, config, README ✓
- §9 non-goals respected — no backend, no analytics, no admin ✓
