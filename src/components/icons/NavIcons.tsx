// Nav bar icons from Figma (Iconoir-style).
// Fills and strokes use currentColor so the active/inactive state is driven
// by the parent's text color (sage when selected, muted otherwise).

interface IconProps {
  size?: number
  className?: string
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
