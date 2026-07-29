export default function PulseDevice() {
  return (
    <div className="relative flex aspect-square w-full max-w-md items-center justify-center">
      {/* Ambient pulse rings — the signature element, staggered like sound emanating from the case */}
      <span className="pointer-events-none absolute h-40 w-40 rounded-full border border-cyan/40 animate-pulse-ring [animation-delay:0s]" />
      <span className="pointer-events-none absolute h-40 w-40 rounded-full border border-cyan/40 animate-pulse-ring [animation-delay:0.9s]" />
      <span className="pointer-events-none absolute h-40 w-40 rounded-full border border-cyan/40 animate-pulse-ring [animation-delay:1.8s]" />

      <svg
        viewBox="0 0 320 320"
        className="relative h-full w-full drop-shadow-[0_30px_60px_rgba(20,22,26,0.45)]"
        role="img"
        aria-label="Pulse Pro charging case with earbuds"
      >
        <defs>
          <linearGradient id="caseBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a2e37" />
            <stop offset="100%" stopColor="#14161a" />
          </linearGradient>
          <linearGradient id="budBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7f6f3" />
            <stop offset="100%" stopColor="#d8d6d0" />
          </linearGradient>
        </defs>

        {/* Case */}
        <rect x="90" y="70" width="140" height="190" rx="34" fill="url(#caseBody)" />
        <rect x="90" y="70" width="140" height="190" rx="34" fill="none" stroke="#3a3f4a" strokeWidth="1.5" />
        <line x1="90" y1="128" x2="230" y2="128" stroke="#3a3f4a" strokeWidth="1.5" />

        {/* Status LED */}
        <circle cx="160" cy="99" r="4" fill="#22d3c7" />

        {/* Earbud stems + heads, nested in the case */}
        <g>
          <rect x="118" y="150" width="26" height="70" rx="13" fill="url(#budBody)" />
          <circle cx="131" cy="150" r="22" fill="url(#budBody)" />
          <circle cx="131" cy="150" r="9" fill="#4f46e5" />
        </g>
        <g>
          <rect x="176" y="150" width="26" height="70" rx="13" fill="url(#budBody)" />
          <circle cx="189" cy="150" r="22" fill="url(#budBody)" />
          <circle cx="189" cy="150" r="9" fill="#4f46e5" />
        </g>
      </svg>

      {/* Floating equalizer chip — reinforces "Pulse" without duplicating the rings motif */}
      <div className="absolute -bottom-2 right-2 flex items-end gap-1 rounded-2xl border border-ink-line bg-ink/90 px-4 py-3 backdrop-blur sm:right-6">
        {[0.4, 0.9, 0.6, 1, 0.5].map((scale, i) => (
          <span
            key={i}
            className="w-1 rounded-full bg-cyan animate-eq-bar"
            style={{
              height: "20px",
              transformOrigin: "bottom",
              animationDelay: `${i * 0.12}s`,
              // base scale keeps bars visually varied even mid-loop
              transform: `scaleY(${scale})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
