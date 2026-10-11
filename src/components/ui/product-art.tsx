import { cn } from "@/lib/utils";

/**
 * Deterministic, dependency-free chandelier artwork.
 * Renders elegant line-art in the brand's brass gradient so the storefront
 * looks intentional even before real product photography is uploaded.
 */
export function ProductArt({
  variant = 0,
  className,
}: {
  variant?: number;
  className?: string;
}) {
  const v = ((Math.round(variant) % 6) + 6) % 6;
  const metal = `url(#metal-${v})`;

  return (
    <svg
      viewBox="0 0 400 540"
      role="presentation"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={`glow-${v}`} cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor="#e2c88f" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#c6a15b" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0b0b0c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`metal-${v}`} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#f0dcae" />
          <stop offset="50%" stopColor="#c6a15b" />
          <stop offset="100%" stopColor="#7d6229" />
        </linearGradient>
      </defs>

      <rect width="400" height="540" fill={`url(#glow-${v})`} className="animate-glow" />

      <g stroke={metal} fill="none" strokeWidth="2.2" strokeLinecap="round">
        {/* ceiling canopy + stem */}
        <rect x="180" y="10" width="40" height="12" rx="4" />
        <line x1="200" y1="22" x2="200" y2="150" />
        {body(v, metal)}
      </g>

      <g fill="#f0dcae">
        {lights(v).map((l) => (
          <circle key={`${l.cx}-${l.cy}`} cx={l.cx} cy={l.cy} r={l.r} />
        ))}
      </g>
    </svg>
  );
}

function body(v: number, metal: string) {
  switch (v) {
    case 0: {
      const tips = [
        { x: 78, y: 300 },
        { x: 135, y: 262 },
        { x: 265, y: 262 },
        { x: 322, y: 300 },
      ];
      return (
        <>
          {tips.map((t) => (
            <g key={`${t.x}-${t.y}`}>
              <path
                d={`M200,150 C200,${t.y} ${t.x},${t.y - 70} ${t.x},${t.y}`}
                stroke={metal}
              />
              <ellipse cx={t.x} cy={t.y} rx="13" ry="4.5" />
              <line x1={t.x} y1={t.y} x2={t.x} y2={t.y - 30} />
              <line x1={t.x} y1={t.y + 4} x2={t.x} y2={t.y + 30} />
              <path d={`M${t.x - 6},${t.y + 34} L${t.x},${t.y + 44} L${t.x + 6},${t.y + 34} Z`} />
            </g>
          ))}
          <line x1="200" y1="150" x2="200" y2="360" />
          <path d="M188,366 L200,384 L212,366 Z" />
          <ellipse cx="200" cy="150" rx="18" ry="6" />
        </>
      );
    }
    case 1:
      return (
        <>
          <ellipse cx="200" cy="250" rx="132" ry="34" />
          <ellipse cx="200" cy="250" rx="98" ry="25" />
          <line x1="200" y1="150" x2="200" y2="222" />
          <ellipse cx="200" cy="222" rx="20" ry="7" />
        </>
      );
    case 2:
      return (
        <>
          <ellipse cx="200" cy="196" rx="130" ry="32" />
          <ellipse cx="200" cy="266" rx="102" ry="26" />
          <ellipse cx="200" cy="326" rx="72" ry="20" />
          <line x1="200" y1="150" x2="200" y2="196" />
          {[110, 155, 245, 290].map((x, i) => (
            <path
              key={x}
              d={`M200,170 C${(200 + x) / 2},${220 + i * 6} ${x},${240} ${x},${i < 2 ? 196 : 196}`}
              stroke={metal}
            />
          ))}
          {[140, 200, 260].map((x) => (
            <line key={`d${x}`} x1={x} y1="340" x2={x} y2="372" />
          ))}
        </>
      );
    case 3:
      return (
        <>
          <rect x="60" y="182" width="280" height="16" rx="8" />
          <rect x="100" y="252" width="200" height="16" rx="8" />
          <rect x="140" y="322" width="120" height="16" rx="8" />
          <line x1="200" y1="150" x2="200" y2="182" />
          <line x1="90" y1="198" x2="90" y2="252" />
          <line x1="310" y1="198" x2="310" y2="252" />
          <line x1="128" y1="268" x2="128" y2="322" />
          <line x1="272" y1="268" x2="272" y2="322" />
        </>
      );
    case 4:
      return (
        <>
          <line x1="200" y1="150" x2="200" y2="212" />
          <circle cx="200" cy="300" r="66" />
          <circle cx="200" cy="300" r="44" opacity="0.55" />
          <path d="M200,234 v-16" />
        </>
      );
    default:
      return (
        <>
          <line x1="200" y1="150" x2="200" y2="192" />
          <path d="M108,300 Q200,166 292,300 Z" />
          <path d="M140,300 Q200,206 260,300" opacity="0.6" />
        </>
      );
  }
}

function lights(v: number) {
  switch (v) {
    case 0:
      return [
        { cx: 78, cy: 264, r: 7 },
        { cx: 135, cy: 226, r: 7 },
        { cx: 265, cy: 226, r: 7 },
        { cx: 322, cy: 264, r: 7 },
        { cx: 200, cy: 150, r: 6 },
      ];
    case 1:
      return ring(200, 250, 132, 34, 10);
    case 2:
      return [...ring(200, 196, 130, 32, 8), ...ring(200, 266, 102, 26, 6)];
    case 3:
      return [
        { cx: 90, cy: 190, r: 6 },
        { cx: 310, cy: 190, r: 6 },
        { cx: 128, cy: 260, r: 5.5 },
        { cx: 272, cy: 260, r: 5.5 },
        { cx: 200, cy: 330, r: 5.5 },
      ];
    case 4:
      return [{ cx: 200, cy: 300, r: 9 }];
    default:
      return [
        { cx: 200, cy: 300, r: 8 },
        { cx: 156, cy: 300, r: 5 },
        { cx: 244, cy: 300, r: 5 },
      ];
  }
}

function ring(cx: number, cy: number, rx: number, ry: number, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    return {
      cx: cx + Math.cos(a) * rx,
      cy: cy + Math.sin(a) * ry,
      r: 6,
    };
  });
}
