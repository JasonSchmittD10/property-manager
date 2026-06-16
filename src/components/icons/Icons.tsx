// Nav bar icons from Figma (Iconoir-style).
// Fills and strokes use currentColor so the active/inactive state is driven
// by the parent's text color (sage when selected, muted otherwise).

interface IconProps {
  size?: number
  className?: string
}

// ----------------------------------------------------------------------
// New floating-pill bottom nav icons (Figma 1:1332).
// Filled iconoir variants — color swap drives default/selected state.
// ----------------------------------------------------------------------

export function NavMainIcon({ size = 20, className }: IconProps) {
  // view-all — 2x2 grid of filled rounded squares.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="6" height="6" rx="1.25" />
      <rect x="11" y="3" width="6" height="6" rx="1.25" />
      <rect x="3" y="11" width="6" height="6" rx="1.25" />
      <rect x="11" y="11" width="6" height="6" rx="1.25" />
    </svg>
  )
}

export function NavPropertyIcon({ size = 20, className }: IconProps) {
  // house-7-fill — solid house silhouette with door cutout.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="M10.78 1.93a1.25 1.25 0 0 0-1.56 0L2.47 7.33a1.25 1.25 0 0 0-.47.98v8.19c0 .55.45 1 1 1h4.5v-5.25c0-.83.67-1.5 1.5-1.5h2c.83 0 1.5.67 1.5 1.5v5.25H17c.55 0 1-.45 1-1V8.31c0-.39-.18-.75-.47-.98z" />
    </svg>
  )
}

export function NavGuideIcon({ size = 20, className }: IconProps) {
  // location-filled — solid pin with a circular cutout.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="M10 2c-3.31 0-6 2.66-6 5.94 0 4.5 5.4 9.62 5.63 9.84.21.2.54.2.75 0 .23-.22 5.62-5.34 5.62-9.84C16 4.66 13.31 2 10 2zm0 7.94a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    </svg>
  )
}

export function NavEmergencyIcon({ size = 28, className }: IconProps) {
  // Alert glyph for the circular emergency button (Figma 6:613).
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 3L2 20h20L12 3z"
        fill="currentColor"
      />
      <path
        d="M12 10v4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="1" fill="white" />
    </svg>
  )
}

export function DashboardIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 15.994"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5.5 6.744H4.5C4.36193 6.744 4.25 6.85593 4.25 6.994V7.994C4.25 8.13207 4.36193 8.244 4.5 8.244H5.5C5.63807 8.244 5.75 8.13207 5.75 7.994V6.994C5.75 6.85593 5.63807 6.744 5.5 6.744Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 6.744H8.5C8.36193 6.744 8.25 6.85593 8.25 6.994V7.994C8.25 8.13207 8.36193 8.244 8.5 8.244H9.5C9.63807 8.244 9.75 8.13207 9.75 7.994V6.994C9.75 6.85593 9.63807 6.744 9.5 6.744Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 10.744H4.5C4.36193 10.744 4.25 10.8559 4.25 10.994V11.994C4.25 12.1321 4.36193 12.244 4.5 12.244H5.5C5.63807 12.244 5.75 12.1321 5.75 11.994V10.994C5.75 10.8559 5.63807 10.744 5.5 10.744Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 10.744H8.5C8.36193 10.744 8.25 10.8559 8.25 10.994V11.994C8.25 12.1321 8.36193 12.244 8.5 12.244H9.5C9.63807 12.244 9.75 12.1321 9.75 11.994V10.994C9.75 10.8559 9.63807 10.744 9.5 10.744Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.145 4.944L6.395 0.954C6.753 0.682 7.248 0.682 7.605 0.954L12.855 4.944C13.104 5.133 13.25 5.428 13.25 5.74V13.244C13.25 14.349 12.355 15.244 11.25 15.244H2.75C1.645 15.244 0.75 14.349 0.75 13.244V5.74C0.75 5.427 0.896 5.133 1.145 4.944Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PropertyIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18.0007 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M7.25 4.75C8.35457 4.75 9.25 3.85457 9.25 2.75C9.25 1.64543 8.35457 0.75 7.25 0.75C6.14543 0.75 5.25 1.64543 5.25 2.75C5.25 3.85457 6.14543 4.75 7.25 4.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.25 2.75H16.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 2.75V4.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.75 2.75V4.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.437 11.465L15.254 9.291C15.966 8.97 16.803 9.286 17.125 9.998C17.446 10.71 17.13 11.547 16.418 11.869L9.627 14.934C8.951 15.239 8.186 15.283 7.479 15.057L3.001 13.625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.245 10.598L9.216 11.492C9.927 11.815 10.765 11.5 11.088 10.789C11.411 10.078 11.096 9.24 10.385 8.917L7.608 7.649C5.312 6.626 3.375 8.188 3 10.001"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.75 8.25H2C2.552 8.25 3 8.698 3 9.25V14.25C3 14.802 2.552 15.25 2 15.25H0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CityGuideIcon({ size = 18, className }: IconProps) {
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
        d="M5.75 5.75L10.25 10.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5251 0.9138C9.033 0.8083 8.5235 0.75 8 0.75C3.996 0.75 0.75 3.9958 0.75 8C0.75 8.5234 0.8083 9.0332 0.9138 9.5251"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.4749 15.0862C6.967 15.1917 7.4765 15.25 8 15.25C12.004 15.25 15.25 12.0042 15.25 8C15.25 7.4766 15.1917 6.9668 15.0862 6.4749"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.25 2.75L10.25 10.25L2.75 13.25L5.75 5.75L13.25 2.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
