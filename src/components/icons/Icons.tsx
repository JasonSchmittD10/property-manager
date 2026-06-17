// Nav bar icons from Figma (Iconoir-style).
// Fills and strokes use currentColor so the active/inactive state is driven
// by the parent's text color (sage when selected, muted otherwise).

interface IconProps {
  size?: number
  className?: string
}

// ----------------------------------------------------------------------
// Floating-pill bottom nav + circular Emergency icons.
// All paths copied verbatim from the Figma icon frames (1:1284 and 1:177)
// — fills/strokes converted from var(--fill-0, #212121) to currentColor
// so the icons inherit color from the parent text-* class.
// ----------------------------------------------------------------------

// view-all (Figma 1:1278) — Main nav tab.
export function NavMainIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M7 1H2C1.44772 1 1 1.44772 1 2V6C1 6.55228 1.44772 7 2 7H7C7.55228 7 8 6.55228 8 6V2C8 1.44772 7.55228 1 7 1Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 4H13C12.4477 4 12 4.44772 12 5V13C12 13.5523 12.4477 14 13 14H14C14.5523 14 15 13.5523 15 13V5C15 4.44772 14.5523 4 14 4Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11H4C3.44772 11 3 11.4477 3 12V14C3 14.5523 3.44772 15 4 15H7C7.55228 15 8 14.5523 8 14V12C8 11.4477 7.55228 11 7 11Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// house-7-fill (Figma 1:1283) — Property nav tab.
export function NavPropertyIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17.0011 16.499"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="M8.49957 4.605L1.49957 9.253V12.499C1.49957 14.705 3.29357 16.499 5.49957 16.499H7.49957V13.499C7.49957 12.947 7.94657 12.499 8.49957 12.499C9.05257 12.499 9.49957 12.947 9.49957 13.499V16.499H11.4996C13.7056 16.499 15.4996 14.705 15.4996 12.499V9.282L8.49957 4.605ZM9.49957 10C9.49957 10.276 9.27557 10.5 8.99957 10.5H7.99957C7.72357 10.5 7.49957 10.276 7.49957 10V9C7.49957 8.724 7.72357 8.5 7.99957 8.5H8.99957C9.27557 8.5 9.49957 8.724 9.49957 9V10Z" />
      <path d="M16.5546 5.168L9.05457 0.168C8.71857 -0.056 8.28157 -0.056 7.94557 0.168L4.50057 2.465V1.5C4.50057 0.948 4.05357 0.5 3.50057 0.5C2.94757 0.5 2.50057 0.948 2.50057 1.5V3.798L0.445572 5.168C-0.0144275 5.474 -0.138427 6.095 0.168573 6.555C0.473573 7.014 1.09357 7.139 1.55557 6.832L8.50057 2.202L15.4456 6.832C15.6166 6.946 15.8086 7 15.9996 7C16.3226 7 16.6406 6.844 16.8326 6.555C17.1396 6.096 17.0146 5.474 16.5546 5.168Z" />
    </svg>
  )
}

// location-filled (Figma 1:1484) — Guide nav tab.
export function NavGuideIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.0181 11.2065C1.3763 11.5842 1 12.0258 1 12.5C1 13.8807 4.134 15 8 15C11.866 15 15 13.8807 15 12.5C15 12.0234 14.6199 11.5796 13.9718 11.2006"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 0C4.9673 0 2.5 2.4673 2.5 5.5C2.5 9.4893 7.2432 12.6973 7.4453 12.832C7.6133 12.9438 7.8066 13 8 13C8.1953 13 8.3911 12.9429 8.5601 12.8286C8.7618 12.6924 13.5 9.4443 13.5 5.5C13.5 2.4673 11.0327 0 8 0ZM8 7C7.1729 7 6.5 6.3271 6.5 5.5C6.5 4.6729 7.1729 4 8 4C8.8271 4 9.5 4.6729 9.5 5.5C9.5 6.3271 8.8271 7 8 7Z"
        fill="currentColor"
      />
    </svg>
  )
}

// ----------------------------------------------------------------------
// Home dashboard icons (Figma 4:392). All paths from the Figma frame —
// fills/strokes converted to currentColor so the parent text-* drives
// the swatch.
// ----------------------------------------------------------------------

// trash 1 — filled iconoir, 20x22 viewBox. Trash-day reminder card.
export function TrashFilledIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 22"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="M2.166 7L2.671 19.125C2.738 20.737 4.055 22 5.669 22H14.332C15.945 22 17.262 20.737 17.33 19.125L17.835 7H2.166ZM8.5 18H6.5V10H8.5V18ZM13.5 18H11.5V10H13.5V18Z" />
      <path d="M17 2H13C13 0.897 12.103 0 11 0H9C7.897 0 7 0.897 7 2H3C1.346 2 0 3.346 0 5V8H20V5C20 3.346 18.654 2 17 2ZM18 6H2V5C2 4.448 2.449 4 3 4H17C17.551 4 18 4.448 18 5V6Z" />
    </svg>
  )
}

// x-close — 12x12 stroke X. Dismiss button on the trash-day reminder.
export function XCloseIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M11 1L1 11M1 1L11 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// subscription-2 — $ inside a circular-arrow loop. Pay Rent chip.
export function SubscriptionIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17.7789 17.7789"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8.88867 0.5C11.4716 0.5 13.8778 1.7174 15.4521 3.69922L16.1787 4.61426L16.3389 3.45605L16.4688 2.51562C16.4925 2.34403 16.6585 2.2095 16.8477 2.22949C17.03 2.25637 17.1549 2.4253 17.1299 2.60547V2.60645L16.6777 5.87793V5.87891C16.666 5.96531 16.6204 6.04385 16.5508 6.09766C16.4899 6.14329 16.4184 6.16699 16.3477 6.16699C16.3367 6.16699 16.3199 6.16551 16.291 6.16211L13.0303 5.71094H13.0312C12.8475 5.68545 12.7202 5.51692 12.7451 5.33594V5.33496C12.7698 5.15863 12.9408 5.02611 13.126 5.0498L14.7461 5.27539L15.8779 5.43262L15.2246 4.49414C13.7981 2.4459 11.4389 1.16699 8.88867 1.16699C4.63048 1.16711 1.16711 4.63048 1.16699 8.88867C1.16699 9.07253 1.01687 9.22266 0.833008 9.22266C0.649299 9.22248 0.5 9.07242 0.5 8.88867C0.500118 4.26388 4.26388 0.500118 8.88867 0.5Z"
        stroke="currentColor"
      />
      <path d="M16.9444 8.05556C16.4844 8.05556 16.1111 8.42889 16.1111 8.88889C16.1111 12.8711 12.8711 16.1111 8.88889 16.1111C6.5 16.1111 4.3 14.9167 2.96556 12.9978L4.58889 13.2222C5.03778 13.2778 5.46556 12.9667 5.52889 12.51C5.59222 12.0533 5.27333 11.6333 4.81667 11.57L1.54556 11.1178C1.33 11.09 1.10556 11.1456 0.927778 11.2789C0.752222 11.4122 0.635555 11.61 0.605555 11.83L0.153333 15.1022C0.0899999 15.5578 0.408889 15.9789 0.865556 16.0422C0.903333 16.0467 0.942222 16.05 0.981111 16.05C1.39 16.05 1.74778 15.7478 1.80556 15.3311L1.93556 14.3944C3.59889 16.4911 6.14222 17.7789 8.89 17.7789C13.7911 17.7789 17.7789 13.7911 17.7789 8.89C17.7789 8.43 17.4056 8.05667 16.9456 8.05667L16.9444 8.05556Z" />
      <path d="M8.93111 11.6667C7.87222 11.6667 7.59556 11.2256 7.46444 10.7933C7.33 10.3533 6.86889 10.1056 6.42333 10.2389C5.98333 10.3733 5.73556 10.8389 5.86889 11.2789C6.19222 12.34 6.96111 13.0122 8.06 13.24C8.07333 13.6889 8.43667 14.05 8.88889 14.05C9.34111 14.05 9.70667 13.6867 9.71778 13.2367C10.3056 13.1022 10.8367 12.83 11.2278 12.4278C11.7067 11.9378 11.96 11.2922 11.9444 10.61C11.91 9.21444 10.9278 8.33444 9.02444 7.99444C7.74444 7.76555 7.69444 7.24889 7.67667 7.07889C7.64667 6.75333 7.74667 6.6 7.82667 6.51222C8.07889 6.23556 8.62444 6.11111 8.93111 6.11111C9.81778 6.11111 10.0611 6.68556 10.1411 6.87333C10.3211 7.29778 10.8133 7.49556 11.2322 7.31667C11.6567 7.13667 11.8556 6.64778 11.6744 6.22444C11.3011 5.34333 10.6067 4.76667 9.72111 4.55V4.43444C9.72111 3.97444 9.34778 3.60111 8.88778 3.60111C8.42778 3.60111 8.05444 3.97444 8.05444 4.43444V4.57444C7.53333 4.70889 6.98889 4.95444 6.59222 5.39111C6.14778 5.88111 5.94889 6.52 6.01778 7.23778C6.08667 7.96444 6.53333 9.24222 8.73 9.63333C10.14 9.88556 10.2678 10.29 10.2767 10.65C10.2833 10.8856 10.2011 11.0922 10.0344 11.2622C9.78778 11.5144 9.37444 11.6656 8.93 11.6656L8.93111 11.6667Z" />
    </svg>
  )
}

// screen-reader — megaphone with sound waves. Report a Problem chip.
export function ScreenReaderIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17.5 18.0556"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3.05566 0.5H11.3887C12.7976 0.5 13.9443 1.6467 13.9443 3.05566V5.78711C13.9443 5.97101 13.7952 6.12 13.6113 6.12012C13.4274 6.12012 13.2773 5.97108 13.2773 5.78711V3.05566C13.2773 2.01341 12.4309 1.16699 11.3887 1.16699H3.05566C2.01341 1.16699 1.16699 2.01341 1.16699 3.05566V13.0557C1.16705 14.0979 2.01345 14.9443 3.05566 14.9443C3.23944 14.9444 3.38844 15.0936 3.38867 15.2773C3.38867 15.4613 3.23958 15.6113 3.05566 15.6113C1.64673 15.6113 0.500059 14.4646 0.5 13.0557V3.05566C0.5 1.6467 1.6467 0.5 3.05566 0.5Z"
        stroke="currentColor"
      />
      <path d="M12.8722 8.14344C12.5912 8.00133 12.2538 8.03222 11.9998 8.22211L8.88889 10.5556H6.94444C5.87244 10.5556 5 11.428 5 12.5V13.6111C5 14.6831 5.87244 15.5556 6.94444 15.5556H8.88889L11.9998 17.889C12.1473 17.9991 12.3231 18.0556 12.5 18.0556C12.627 18.0556 12.755 18.0268 12.8722 17.9677C13.1554 17.8266 13.3333 17.538 13.3333 17.2222V8.88889C13.3333 8.57311 13.1553 8.28456 12.8722 8.14344Z" />
      <path d="M15.765 9.67122C15.3896 9.40211 14.8698 9.48789 14.6018 9.86111C14.3327 10.2343 14.4173 10.7552 14.7906 11.0243C15.4438 11.4942 15.8333 12.2537 15.8333 13.0556C15.8333 13.8574 15.4438 14.617 14.7906 15.0868C14.4173 15.3559 14.3327 15.8767 14.6018 16.25C14.7646 16.4762 15.0196 16.5967 15.2789 16.5967C15.4471 16.5967 15.6174 16.5457 15.765 16.4399C16.8511 15.657 17.5 14.3923 17.5 13.0556C17.5 11.7188 16.8511 10.4541 15.765 9.67122Z" />
      <path d="M4.16667 5H10.2778C10.7379 5 11.1111 4.62678 11.1111 4.16667C11.1111 3.70656 10.7379 3.33333 10.2778 3.33333H4.16667C3.70656 3.33333 3.33333 3.70656 3.33333 4.16667C3.33333 4.62678 3.70656 5 4.16667 5Z" />
      <path d="M4.16667 8.33333H7.77778C8.23789 8.33333 8.61111 7.96011 8.61111 7.5C8.61111 7.03989 8.23789 6.66667 7.77778 6.66667H4.16667C3.70656 6.66667 3.33333 7.03989 3.33333 7.5C3.33333 7.96011 3.70656 8.33333 4.16667 8.33333Z" />
    </svg>
  )
}

// wifi 2 — three-arc wifi + dot. Wifi chip + Nextdoor (placeholder in Figma).
export function WifiArcsIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17.6948 13.2501"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8.86064 12.2501H8.84742"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 4.18893C5.36532 -0.0629749 12.3295 -0.0629749 16.6948 4.18893"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.60477 8.00743C6.94793 5.66428 10.7469 5.66428 13.0901 8.00743"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// warning-sign — filled triangle with !. New Emergency button glyph
// (replaces the outlined triangle-warning to match Home 4:392).
export function WarningSignIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 23.9931 23.0007"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="M23.638 18.4857L14.729 1.64368C13.928 0.134677 12.056 -0.439323 10.547 0.361677C10.001 0.651677 9.55503 1.09768 9.26503 1.64368L0.356026 18.4857C-0.436974 19.9897 0.139026 21.8527 1.64403 22.6457C2.08903 22.8807 2.58603 23.0027 3.08903 23.0007H20.905C22.605 23.0057 23.988 21.6317 23.993 19.9307C23.995 19.4267 23.873 18.9307 23.638 18.4857ZM11.997 20.0007C11.169 20.0007 10.497 19.3287 10.497 18.5007C10.497 17.6727 11.169 17.0007 11.997 17.0007C12.825 17.0007 13.497 17.6727 13.497 18.5007C13.497 19.3287 12.825 20.0007 11.997 20.0007ZM12.527 15.0007H11.466C11.202 15.0007 10.983 14.7957 10.967 14.5317L10.529 7.53168C10.511 7.24368 10.74 7.00068 11.028 7.00068H12.964C13.252 7.00068 13.481 7.24368 13.463 7.53168L13.025 14.5317C13.009 14.7957 12.791 15.0007 12.527 15.0007Z" />
    </svg>
  )
}

// ----------------------------------------------------------------------
// Property page icons (from Figma 1:1359)
// ----------------------------------------------------------------------

export function PowerIcon({ size = 20, className }: IconProps) {
  // Lightning bolt — utility chip on Setup & Documents row.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 16.0001"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8.00002 1.00004L6.00002 7.00004H13L6.00002 15L8.00002 9.00004H1.00002L8.00002 1.00004Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DocumentIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 0.5H10C11.9299 0.5 13.5 2.07014 13.5 4V12C13.5 13.9299 11.9299 15.5 10 15.5H4C2.07014 15.5 0.5 13.9299 0.5 12V4C0.5 2.07014 2.07014 0.5 4 0.5ZM9.5 9.5C8.39586 9.5 7.5 10.3959 7.5 11.5C7.5 12.6041 8.39586 13.5 9.5 13.5C10.6041 13.5 11.5 12.6041 11.5 11.5C11.5 10.3959 10.6041 9.5 9.5 9.5ZM4 6.5C3.17053 6.5 2.5 7.17218 2.5 8C2.5 8.82782 3.17053 9.5 4 9.5H6C6.82947 9.5 7.5 8.82782 7.5 8C7.5 7.17218 6.82947 6.5 6 6.5H4ZM4 2.5C3.17053 2.5 2.5 3.17218 2.5 4C2.5 4.82782 3.17053 5.5 4 5.5H10C10.8295 5.5 11.5 4.82782 11.5 4C11.5 3.17218 10.8295 2.5 10 2.5H4Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  )
}

export function BookBookmarkIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 18.0001"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 1.5H11C11.8285 1.5 12.5 2.17154 12.5 3V8.5H3.5C2.73077 8.5 2.03098 8.79156 1.5 9.26758V3C1.5 2.17154 2.17154 1.5 3 1.5ZM4 5.5C3.17156 5.5 2.5 6.17156 2.5 7C2.5 7.82844 3.17156 8.5 4 8.5C4.82844 8.5 5.5 7.82844 5.5 7C5.5 6.17156 4.82844 5.5 4 5.5ZM4 1.5C3.17156 1.5 2.5 2.17156 2.5 3C2.5 3.82844 3.17156 4.5 4 4.5C4.82844 4.5 5.5 3.82844 5.5 3C5.5 2.17156 4.82844 1.5 4 1.5Z"
        fill="currentColor"
        stroke="currentColor"
      />
      <path
        d="M11.5 14H12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 11.5V3C1 1.8954 1.8954 1 3 1H11C12.1046 1 13 1.8954 13 3V9H3.5C2.1193 9 1 10.1193 1 11.5ZM1 11.5C1 12.8807 2.1193 14 3.5 14H7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 11.5H5.25C4.8359 11.5 4.5 11.8359 4.5 12.25V17.25C4.5 17.5703 4.7031 17.8555 5.0068 17.959C5.3105 18.0615 5.6455 17.9629 5.8418 17.711L7 16.2217L8.1582 17.711C8.3027 17.8965 8.5234 18.0001 8.75 18.0001C8.8311 18.0001 8.9131 17.9864 8.9932 17.9591C9.2969 17.8556 9.5 17.5704 9.5 17.2501V12.2501C9.5 11.836 9.1641 11.5 8.75 11.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function HistoryIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15.9291 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.29613 1.044L1.70013 4.798L5.44513 4.145L2.29613 1.044Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.92913 5V8L9.92913 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.92913 3.101C4.20013 1.804 5.97013 1 7.92913 1C11.7951 1 14.9291 4.134 14.9291 8C14.9291 11.866 11.7951 15 7.92913 15C4.40313 15 1.48513 12.392 1.00013 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CaratDownIcon({ size = 16, className }: IconProps) {
  // Used as both "View breakdown" caret and (rotated) the row chevrons.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10.6667 5.07967"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M0.666678 0.666967L4.8127 4.22070C5.11229 4.47749 5.55438 4.47749 5.85397 4.22070L9.99999 0.666967"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
