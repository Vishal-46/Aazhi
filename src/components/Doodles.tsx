interface DoodleProps {
  className?: string;
  width?: number;
}

/** Wobbly hand-drawn underline */
export function Squiggle({ className = '', width = 220 }: DoodleProps) {
  return (
    <svg
      className={`doodle ${className}`}
      width={width}
      height={14}
      viewBox="0 0 220 14"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 9 C 22 3, 38 12, 58 7 S 92 3, 112 8 S 148 12, 168 6 S 200 4, 217 8"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Loose circle scribble */
export function CircleScribble({ className = '', width = 120 }: DoodleProps) {
  return (
    <svg
      className={`doodle ${className}`}
      width={width}
      height={56}
      viewBox="0 0 120 56"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 28 C 10 10, 42 4, 68 6 S 114 12, 112 30 S 88 52, 58 51 S 8 46, 10 26"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Curved hand arrow pointing down-right */
export function ArrowDoodle({ className = '' }: DoodleProps) {
  return (
    <svg
      className={`doodle ${className}`}
      width={54}
      height={64}
      viewBox="0 0 54 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 6 C 30 12, 42 28, 38 50 M 28 42 L 38 51 L 47 41"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Four-point star / sparkle */
export function StarDoodle({ className = '' }: DoodleProps) {
  return (
    <svg
      className={`doodle doodle-star ${className}`}
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M11 1 C 12 7, 14 9, 21 11 C 14 13, 12 15, 11 21 C 10 15, 8 13, 1 11 C 8 9, 10 7, 11 1 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="11" r="1.4" fill="currentColor" />
    </svg>
  );
}

/** Small asterisk burst */
export function BurstDoodle({ className = '' }: DoodleProps) {
  return (
    <svg
      className={`doodle ${className}`}
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="14" y1="3" x2="14" y2="9" />
        <line x1="14" y1="19" x2="14" y2="25" />
        <line x1="3" y1="14" x2="9" y2="14" />
        <line x1="19" y1="14" x2="25" y2="14" />
        <line x1="6.5" y1="6.5" x2="10.5" y2="10.5" />
        <line x1="17.5" y1="17.5" x2="21.5" y2="21.5" />
      </g>
    </svg>
  );
}
