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
    garbageDay: 'Tuesday', // TODO: confirm
    recyclingDay: 'Tuesday', // TODO: confirm
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
    endDate: '2026-12-31', // TODO: confirm
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
      { id: 'hardware', label: 'Hardware store', name: "TODO: nearest Lowe's or Ace" },
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
