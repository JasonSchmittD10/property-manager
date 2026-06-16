/**
 * property.ts — Bashford tenant app content config
 * ------------------------------------------------------------------
 * Hybrid model:
 *   • Editable content (welcome note, guide, announcements, etc.) lives
 *     in JSON files under src/content/. Those files are edited by the
 *     landlords through the Sveltia CMS at /admin and committed to git.
 *   • Sensitive / structural / logic-bound values (login credentials,
 *     payment links, rent math, utility provider data, emergency info)
 *     stay here as plain TypeScript so they can't be edited via the CMS.
 *
 * Both halves are re-exported under the same names as before, so every
 * screen continues to import from this file unchanged. The TypeScript
 * interfaces below stay as the contract: if a JSON file drifts out of
 * shape, the build fails.
 *
 * Note on sensitivity: this content is gated only by a shared password,
 * which is light protection. Do NOT add truly sensitive data here
 * (SSNs, bank/account numbers, spare-key locations, etc.).
 */

import welcomeData from "../content/welcome.json";
import rentNotesData from "../content/rentNotes.json";
import propertyMediaData from "../content/propertyMedia.json";
import houseManualData from "../content/houseManual.json";
import guideData from "../content/guide.json";
import essentialsData from "../content/essentials.json";
import seasonalTipsData from "../content/seasonalTips.json";
import announcementsData from "../content/announcements.json";
import documentsData from "../content/documents.json";
import communityData from "../content/community.json";

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
  /** Optional address to disambiguate during geocoding. */
  address?: string;
  /** Manual lat/lng override. If set, skips the geocode cache lookup. */
  lat?: number;
  lng?: number;
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
  // Hero image is CMS-editable via propertyMedia.json (Sveltia media library).
  heroPhoto: propertyMediaData.heroPhoto,

  // Lease term — static display only.
  leaseStart: "TODO: lease start date (e.g. 2026-08-01)",
  leaseEnd: "TODO: lease end date (e.g. 2027-07-31)",
};

// ----------------------------------------------------------------------
// Shared app login (light gate — see note at top of file)
// CODE ONLY — never expose via CMS.
// ----------------------------------------------------------------------

export const appAccess = {
  username: "bashfordcrest",
  password: "2026",
  note: "Share these with your tenants. They log in once and can opt to stay signed in.",
};

// ----------------------------------------------------------------------
// Rent + payment (deep-link only — app never processes payment)
// Math fields and payment link stay in code so the CMS can't break
// the breakdown or send tenants to a wrong URL. Only the free-text
// notes (latePolicy, autoPayNote) are CMS-editable.
// ----------------------------------------------------------------------

export const rent = {
  baseRent: 1900,
  internetCharge: 70, // Google Fiber, added on top of base rent
  // totalDue is base + internet = 1970; compute in code or set explicitly.
  dueDayOfMonth: 1, // numeric — used to compute "Due Jul 1 · in 15 days"
  dueDay: "1st of each month", // human display — kept for the breakdown view
  // The external payment deep link. Currently Venmo; may switch to Zelle later.
  paymentLabel: "Pay rent with Venmo",
  paymentLink: "https://venmo.com/u/jason-schmitt-3",
  autoPayNote: rentNotesData.autoPayNote,
  latePolicy: rentNotesData.latePolicy,
};

// ----------------------------------------------------------------------
// Quick info (Home dashboard strip) — stays in code (wifi/door codes
// are credentials and don't belong in the CMS).
// ----------------------------------------------------------------------

export const quickInfo = {
  wifiNetwork: "TODO: WiFi network name",
  wifiPassword: "TODO: WiFi password",
  frontDoorCode: "TODO: front door code",
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
// Utilities (researched — ready to go). Structural; not CMS-editable.
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
// CMS-editable content (re-exports from src/content/*.json)
// ----------------------------------------------------------------------

export const documents: DocumentItem[] = documentsData.items;
export const houseManual: ManualEntry[] = houseManualData.items;
export const welcomeNote: { heading: string; body: string[]; signoff: string } = welcomeData;
export const guide: GuideCategory[] = guideData.categories;
export const essentials: EssentialItem[] = essentialsData.items;
export const community: {
  show: boolean;
  heading: string;
  intro: string;
  items: CommunityItem[];
} = communityData;
export const announcements: Announcement[] = announcementsData.items;
export const seasonalTips: SeasonalTip[] = seasonalTipsData.items;

// ----------------------------------------------------------------------
// Custom map — "Our favorite spots" (Guide tab → full-screen page)
// ----------------------------------------------------------------------
// A Google My Map the landlords built once at mymaps.google.com. The Guide
// shows a single tappable row; tapping it opens a full-screen in-app page
// (/guide/map) that embeds the map via iframe. The tenant stays in the app.
// If the iframe can't render, the page shows an "Open in Google Maps"
// fallback button using shareUrl. Editing pins in My Maps updates the map
// automatically — no redeploy.
// ----------------------------------------------------------------------

export const favoritesMap = {
  enabled: true,
  linkLabel: "Our favorite spots",
  heading: "Our favorite spots",
  blurb: "A few of the places we love around the area — tap a pin to learn more.",
  embedUrl:
    "https://www.google.com/maps/d/u/0/embed?mid=1tKM4APGj5nDlUaCwwzPYXGFzXfH7SdI&ehbc=2E312F",
  shareUrl:
    "https://www.google.com/maps/d/u/0/viewer?mid=1tKM4APGj5nDlUaCwwzPYXGFzXfH7SdI",
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
// Emergency info (cross-cutting sheet). Stays in code — sensitive.
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
// Landlord contact (stays in code — personal contact info).
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
