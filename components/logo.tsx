interface LogoProps {
  size?: number
}

export function Logo({ size = 32 }: LogoProps = {}) {
  const sizeClass = size === 56 ? 'w-14 h-14' : 'w-8 h-8'
  
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={sizeClass}
    >
      {/* Background circle */}
      <circle cx="16" cy="16" r="15" className="fill-primary/10" />

      {/* Medical cross - stacked design */}
      <g className="fill-primary">
        {/* Vertical bar of cross */}
        <rect x="14" y="8" width="4" height="16" rx="2" />
        {/* Horizontal bar of cross */}
        <rect x="8" y="14" width="16" height="4" rx="2" />
      </g>

      {/* Pulse wave accent - three arcs */}
      <g
        stroke="currentColor"
        className="stroke-primary"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      >
        {/* First arc */}
        <path d="M 6 16 Q 8 14 10 16" />
        {/* Second arc */}
        <path d="M 22 16 Q 24 14 26 16" />
      </g>
    </svg>
  )
}

export function LogoWithText() {
  return (
    <div className="flex items-center gap-3">
      <Logo />
      <span className="text-xl font-bold text-primary">Clinio</span>
    </div>
  )
}
