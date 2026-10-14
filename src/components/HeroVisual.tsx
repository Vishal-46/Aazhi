/**
 * Restrained technical figure: thin navy contour rings, one sky ring,
 * small nodes. Inline SVG, no animation, no stock imagery.
 */
export default function HeroVisual() {
  const navy = '#0C1B2E';
  const sky = '#BFD9F2';
  return (
    <div
      className="azh-hv pro-hv hm-hv"
      role="img"
      aria-label="Technical line drawing of contour rings with connected system nodes"
    >
      <svg viewBox="0 0 560 420" aria-hidden="true" focusable="false">
        {/* thin navy contour rings */}
        <g fill="none" stroke={navy} strokeWidth="1.25">
          <ellipse cx="280" cy="210" rx="60" ry="42" opacity="0.55" />
          <ellipse cx="280" cy="210" rx="100" ry="70" opacity="0.4" />
          <ellipse cx="280" cy="210" rx="140" ry="98" opacity="0.28" />
          <ellipse cx="280" cy="210" rx="180" ry="126" opacity="0.18" />
          <ellipse cx="280" cy="210" rx="218" ry="154" opacity="0.12" />
        </g>
        {/* one sky ring, used sparingly */}
        <ellipse
          cx="280"
          cy="210"
          rx="120"
          ry="84"
          fill="none"
          stroke={sky}
          strokeWidth="1.5"
          opacity="0.9"
        />
        {/* thin connector path between nodes */}
        <polyline
          points="160,210 220,150 300,168 360,128 400,210"
          fill="none"
          stroke={navy}
          strokeOpacity="0.5"
          strokeWidth="1.25"
        />
        {/* small nodes: white fill, navy stroke */}
        <g fill="#FFFFFF" stroke={navy} strokeOpacity="0.9" strokeWidth="1.5">
          <circle cx="160" cy="210" r="5" />
          <circle cx="220" cy="150" r="5" />
          <circle cx="300" cy="168" r="5" />
          <circle cx="360" cy="128" r="5" />
          <circle cx="400" cy="210" r="5" />
        </g>
        <g fill={navy}>
          <circle cx="160" cy="210" r="1.6" />
          <circle cx="220" cy="150" r="1.6" />
          <circle cx="300" cy="168" r="1.6" />
          <circle cx="360" cy="128" r="1.6" />
          <circle cx="400" cy="210" r="1.6" />
        </g>
      </svg>
    </div>
  );
}
