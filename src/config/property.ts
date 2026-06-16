/**
 * property.ts — Bashford tenant app content config
 * ------------------------------------------------------------------
 * This is the SINGLE source of all editable content for the app.
 * Jason & Abby edit this file to update everything — no need to touch
 * any UI components.
 *
 * Anything marked `TODO:` needs a real value filled in before launch.
 * Everything else is pre-populated and ready.
 *
 * Note on sensitivity: this content is gated only by a shared password,
 * which is light protection. Do NOT add truly sensitive data here
 * (SSNs, bank/account numbers, spare-key locations, etc.).
 */

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------

export interface Utility {
  id: string;
  name: string;
  category: string;
  phone?: string;
  email?: string;
  link?: string;
  setupBy: "tenant" | "landlord";
  note?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  /** Path to the PDF in /public, e.g. "/documents/lease.pdf". Leave "" if not yet added. */
  file: string;
  description?: string;
}

export interface ManualEntry {
  id: string;
  title: string;
  /** Optional photo path in /public, e.g. "/manual/thermostat.jpg" */
  photo?: string;
  /** Short steps or notes. Each string is a paragraph/step. */
  body: string[];
}

export interface GuideSpot {
  id: string;
  name: string;
  town?: string;
  /** The personal one-liner — keep it short and warm. */
  why: string;
  link?: string;
}

export interface GuideCategory {
  id: string;
  title: string;
  spots: GuideSpot[];
}

export interface EssentialItem {
  id: string;
  label: string;
  name: string;
  phone?: string;
  link?: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string; // ISO date string, e.g. "2026-06-15"
  body: string;
}

export interface SeasonalTip {
  id: string;
  title: string;
  body: string;
}

export interface LandlordContact {
  name: string;
  email: string;
  phone: string;
}

export interface CommunityItem {
  id: string;
  name: string;
  detail: string;
  link?: string;
}

// ----------------------------------------------------------------------
// Property + tenancy basics
// ----------------------------------------------------------------------

export const property = {
  name: "Bashford",
  address: "5716 Bashford Crest Ln",
  cityStateZip: "Raleigh, NC 27606",
  // Hero image shown on Home + login. Swap for a real photo of the house.
  heroPhoto: "/photos/bashford-hero.jpg", // TODO: add real house photo to /public/photos/

  // Lease term — static display only.
  leaseStart: "TODO: lease start date (e.g. 2026-08-01)",
  leaseEnd: "TODO: lease end date (e.g. 2027-07-31)",
};

// ----------------------------------------------------------------------
// Shared app login (light gate — see note at top of file)
// Read from .env in code; mirrored here only so the Property tab can
// display the credentials for tenants who forget them.
// ----------------------------------------------------------------------

export const appAccess = {
  username: "bashfordcrest",
  password: "2026",
  note: "Share these with your tenants. They log in once and can opt to stay signed in.",
};

// ----------------------------------------------------------------------
// Rent + payment (deep-link only — app never processes payment)
// ----------------------------------------------------------------------

export const rent = {
  baseRent: 1900,
  internetCharge: 70, // Google Fiber, added on top of base rent
  // totalDue is base + internet = 1970; compute in code or set explicitly.
  dueDay: "1st of each month",
  // The external payment deep link. Currently Venmo; may switch to Zelle later.
  paymentLabel: "Pay rent with Venmo",
  paymentLink: "https://venmo.com/u/jason-schmitt-3",
  autoPayNote: "If you set up AutoPay in the payment app, it shows here.",
  latePolicy:
    "TODO: late policy text (e.g. rent is due on the 1st; a late fee of $X applies after the 5th).",
};

// ----------------------------------------------------------------------
// Quick info (Home dashboard strip)
// ----------------------------------------------------------------------

export const quickInfo = {
  wifiNetwork: "TODO: WiFi network name",
  wifiPassword: "TODO: WiFi password",
  trashDay: "Thursday (weekly)",
  recyclingNote: "Recycling is collected every other week — see the Trash & Recycling section.",
};

// ----------------------------------------------------------------------
// Maintenance / report-a-problem
// ----------------------------------------------------------------------

export const maintenance = {
  // How tenants report an issue. Routed to Jason's email with a prefilled subject.
  contactMethod: "mailto:jschmittj1@gmail.com?subject=Bashford%20maintenance%20request",
  blurb: "Something not working? Let us know and we'll take care of it.",
  emergencyReminder:
    "For anything urgent (water leak, no heat, gas smell), use the Emergency button — don't wait on a normal request.",
};

// ----------------------------------------------------------------------
// Utilities (researched — ready to go)
// ----------------------------------------------------------------------

export const utilities: Utility[] = [
  {
    id: "electric",
    name: "Duke Energy Progress",
    category: "Electricity",
    phone: "1-800-452-2777",
    link: "https://www.duke-energy.com",
    setupBy: "tenant",
    note: "Set up in your name, effective your lease start date. A deposit may be required for new accounts; ask about Budget Billing to level out seasonal swings.",
  },
  {
    id: "gas",
    name: "Enbridge Gas North Carolina",
    category: "Natural Gas",
    phone: "1-877-776-2427",
    link: "https://www.enbridgegas.com/north-carolina",
    setupBy: "tenant",
    note: "Formerly PSNC / Dominion. Set up in your name, effective your lease start date. Ask about eBill, AutoPay, and Budget Billing.",
  },
  {
    id: "water",
    name: "City of Raleigh (Raleigh Water)",
    category: "Water, Sewer, Garbage & Recycling",
    phone: "919-996-3245",
    email: "customercare@raleighnc.gov",
    link: "https://raleighnc.gov",
    setupBy: "tenant",
    note: "One combined bill covers water, sewer, garbage, AND recycling — set it all up with a single call. Expect a service initiation fee and a new-customer deposit (confirm current amounts at signup). Have your lease and two forms of ID ready.",
  },
  {
    id: "internet",
    name: "Google Fiber (provided)",
    category: "Internet",
    setupBy: "landlord",
    note: "Internet is provided through the home's Google Fiber at $70/month, added to your rent. No setup needed — it's active at move-in. Contact us for any connectivity issues. Prefer your own provider? Let us know in writing before your lease begins.",
  },
];

// ----------------------------------------------------------------------
// Documents (files added to /public/documents — reference by path)
// ----------------------------------------------------------------------

export const documents: DocumentItem[] = [
  {
    id: "lease",
    title: "Lease agreement",
    file: "", // TODO: add /public/documents/lease.pdf
    description: "Your signed lease and its terms.",
  },
  {
    id: "inspection",
    title: "Move-in / move-out inspection checklist",
    file: "", // TODO: add the inspection checklist PDF
    description: "Condition report for move-in and move-out.",
  },
  {
    id: "house-rules",
    title: "Welcome & house rules",
    file: "", // TODO: add when built
    description: "The basics of living at Bashford.",
  },
  {
    id: "utilities-guide",
    title: "Utilities setup guide",
    file: "", // TODO: add the utilities guide PDF
    description: "Step-by-step for setting up every utility.",
  },
  {
    id: "deposit-receipt",
    title: "Security deposit receipt",
    file: "", // TODO: add when built
    description: "Confirmation of your deposit and where it's held.",
  },
];

// ----------------------------------------------------------------------
// House manual (Airbnb-style "how things work")
// Fill in the specifics; titles + structure are ready.
// ----------------------------------------------------------------------

export const houseManual: ManualEntry[] = [
  {
    id: "thermostat",
    title: "Thermostat & HVAC",
    body: [
      "TODO: thermostat model/location and how to use it.",
      "TODO: note the filter size and where spares are kept; remind tenant to change it regularly.",
    ],
  },
  {
    id: "water-shutoff",
    title: "Water shut-off location",
    body: ["TODO: where the main water shut-off is and how to use it in an emergency."],
  },
  {
    id: "breaker",
    title: "Breaker panel",
    body: ["TODO: where the electrical breaker panel is located and any labeling notes."],
  },
  {
    id: "disposal",
    title: "Garbage disposal reset",
    body: [
      "TODO: if it stops working, here's how to reset it (the red reset button on the bottom of the unit, plus the wall switch).",
    ],
  },
  {
    id: "appliances",
    title: "Appliance quirks & notes",
    body: ["TODO: any appliance quirks worth knowing (oven runs hot, dishwasher cycle, etc.)."],
  },
  {
    id: "yard",
    title: "Lawn & yard",
    body: ["TODO: lawn/yard expectations — who mows, trash bin storage, outdoor faucet location."],
  },
];

// ----------------------------------------------------------------------
// GUIDE tab — welcome note (drafted) + neighborhood spots (to fill)
// ----------------------------------------------------------------------

export const welcomeNote = {
  heading: "Welcome home",
  // Drafted in Jason & Abby's voice — edit freely to sound like you.
  body: [
    "We're so glad you're here. This house has been ours for a good while, and it holds a lot of good memories. We hope it becomes a place of rest and good memories for you too.",
    "We've put together everything you might need right here — how to set up utilities, when the trash goes out, how things work around the house, and a few of our favorite spots nearby. If something isn't covered, or anything ever breaks or feels off, please reach out. We'd genuinely rather hear from you than have you wonder.",
    "We believe a home is a gift, and we're grateful to share this one with you. You're always welcome at Antioch with us on a Sunday if you're looking for community — no pressure at all, just an open door.",
    "Settle in, make it yours, and don't be a stranger.",
  ],
  signoff: "— Jason & Abby",
};

// Neighborhood guide. Seeded with researched area spots; Jason & Abby
// replace/confirm and add the personal "why" lines.
export const guide: GuideCategory[] = [
  {
    id: "coffee",
    title: "Coffee & cafés",
    spots: [
      {
        id: "cultivate",
        name: "Cultivate Coffee Roasters",
        town: "Fuquay-Varina",
        why: "TODO: why you love it",
      },
      // TODO: add more
    ],
  },
  {
    id: "outdoors",
    title: "Parks, trails & outdoors",
    spots: [
      {
        id: "bass-lake",
        name: "Bass Lake Park",
        town: "Holly Springs",
        why: "TODO: why you love it (lakeside trails)",
      },
      {
        id: "hilltop",
        name: "Hilltop Needmore Town Park",
        town: "Fuquay-Varina",
        why: "TODO: why you love it (trail running, dog walks)",
      },
      // TODO: add your local Raleigh/27606 parks too
    ],
  },
  {
    id: "dogs",
    title: "Dog-friendly",
    spots: [
      {
        id: "fv-dog-park",
        name: "Fuquay-Varina Dog Park",
        town: "Fuquay-Varina",
        why: "TODO: why you love it",
      },
      // TODO: add more
    ],
  },
  {
    id: "eats",
    title: "Eats & drinks",
    spots: [
      {
        id: "aviator",
        name: "Aviator Brewing",
        town: "Fuquay-Varina",
        why: "TODO: why you love it",
      },
      // TODO: add your go-to restaurants
    ],
  },
  {
    id: "grocery",
    title: "Grocery & essentials",
    spots: [
      // TODO: your go-to grocery store, etc.
    ],
  },
];

// Practical "where's the nearest…" list.
export const essentials: EssentialItem[] = [
  { id: "hospital", label: "Hospital / urgent care", name: "TODO", phone: "TODO" },
  { id: "pharmacy", label: "Pharmacy", name: "TODO", phone: "TODO" },
  { id: "hardware", label: "Hardware store", name: "TODO" },
  { id: "gas", label: "Gas station", name: "TODO" },
  { id: "vet", label: "Vet", name: "TODO", phone: "TODO" },
];

// Faith & community section (Antioch included per your request).
export const community: {
  show: boolean;
  heading: string;
  intro: string;
  items: CommunityItem[];
} = {
  show: true,
  heading: "Faith & community",
  intro:
    "If you're looking for a church home, we'd love to have you join us — no pressure, just an open invitation.",
  items: [
    {
      id: "antioch",
      name: "Antioch Church",
      detail: "TODO: service time + a warm one-liner",
      link: "TODO: Antioch website",
    },
    // TODO: anything else — life group, local community
  ],
};

// ----------------------------------------------------------------------
// Trash & recycling (researched — ready)
// ----------------------------------------------------------------------

export const trashRecycling = {
  collectionDay: "Thursday (garbage weekly; recycling every other week)",
  rules: [
    "Garbage and yard waste are collected weekly on the same day; recycling is collected every other week.",
    "Use only City-issued carts. Place bins at the curb, not in the street. Bag trash before it goes in the bin.",
    "Look up your exact collection schedule by entering the address in the Raleigh Reuse tool.",
  ],
  reuseToolLink: "https://raleighnc.gov",
  bulkyPickupNote: "TODO: note on bulky-item pickup if you want to include it.",
};

// ----------------------------------------------------------------------
// Announcements (landlord → tenant notices). Empty state is fine.
// ----------------------------------------------------------------------

export const announcements: Announcement[] = [
  // Example:
  // { id: "filter", title: "HVAC filter swap", date: "2026-08-01", body: "Reminder to change the air filter this month." },
];

// ----------------------------------------------------------------------
// Seasonal tips (drafted starters — edit/add)
// ----------------------------------------------------------------------

export const seasonalTips: SeasonalTip[] = [
  {
    id: "pollen",
    title: "Pollen season (spring)",
    body: "Raleigh springs are heavy on pollen — change your HVAC filter more often to keep the air clean and the system happy.",
  },
  {
    id: "freeze",
    title: "First freeze (late fall)",
    body: "Before the first hard freeze, disconnect any hoses and cover the outdoor faucet to prevent a burst pipe.",
  },
  // TODO: add any Bashford-specific seasonal notes
];

// ----------------------------------------------------------------------
// Emergency info (cross-cutting sheet)
// ----------------------------------------------------------------------

export const emergency = {
  waterShutoff: "TODO: where the main water shut-off is (text + optional photo).",
  gasLeak:
    "If you smell gas: leave the house immediately, then call Enbridge's emergency line at 1-877-776-2427 (or 911). Don't flip switches or light anything.",
  breakerPanel: "TODO: where the electrical breaker panel is.",
  afterHoursContact: "Jason: 919-740-8554 (call or text for true after-hours emergencies)",
  reminder: "For any life-threatening emergency, call 911 first.",
};

// ----------------------------------------------------------------------
// Landlord contact
// ----------------------------------------------------------------------

export const landlord = {
  name: "Jason & Abby",
  contacts: [
    { name: "Jason", email: "jschmittj1@gmail.com", phone: "919-740-8554" },
    { name: "Abby", email: "abbygartner3@gmail.com", phone: "316-239-9526" },
  ] as LandlordContact[],
  preferredContact: "TODO: e.g. text is best, or call/email",
  responseExpectation: "TODO: e.g. we usually respond same day.",
};
