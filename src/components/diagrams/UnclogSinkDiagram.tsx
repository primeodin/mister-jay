import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, HazardMark, VIEW_BOX } from './diagramCraft';

const gid = 'sink';

const hotspots = [
  { id: 'no-bucket', label: 'No bucket', cx: 200, cy: 268, lx: 248, ly: 290 },
  { id: 'overtight', label: 'Over-tightened', cx: 152, cy: 218, lx: 88, ly: 198 },
  { id: 'bucket-ready', label: 'Bucket ready', cx: 78, cy: 248, lx: 32, ly: 268 },
  { id: 'plunger', label: 'Plunger first', cx: 318, cy: 108, lx: 360, ly: 78 },
];

export default function UnclogSinkDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid meet" className="sketch-diagram" aria-label="Sink unclog cutaway">
      <DiagramBg id={gid}>
        <TitleStamp x={200} y={22}>
          UNCLOG A SINK — SAVE THE TRAP
        </TitleStamp>

        {/* Countertop — softened warm grey */}
        <rect x="52" y="48" width="296" height="14" rx="2" fill="#7a7570" stroke="#5a5550" strokeWidth="1" opacity="0.9" />
        <rect x="52" y="62" width="296" height="4" fill="#5a5550" opacity="0.85" />

        {/* Porcelain basin */}
        <path
          d="M 88 62 L 312 62 L 300 108 Q 200 118 100 108 Z"
          fill={`url(#dg-${gid}-porcelain)`}
          stroke="#9a9590"
          strokeWidth="1.5"
          opacity="0.92"
        />
        {/* Basin bowl depth */}
        <ellipse cx={200} cy={102} rx="72" ry="14" fill="#c8c4bc" stroke="#999" strokeWidth="0.75" />
        {/* Drain */}
        <circle cx={200} cy={100} r="10" fill="#333" stroke={C.chrome} strokeWidth="2" />
        <circle cx={200} cy={100} r="5" fill="#1a1a1a" />

        {/* Faucet stub */}
        <rect x="188" y="38" width="24" height="26" rx="3" fill={C.chrome} stroke="#888" strokeWidth="1" />
        <rect x="196" y="28" width="8" height="14" rx="2" fill="#999" stroke="#777" strokeWidth="0.75" />

        {/* Tailpiece */}
        <rect x="194" y="112" width="12" height="22" fill="#888" stroke="#666" strokeWidth="0.75" />

        {/* P-trap assembly — no cabinet backdrop; sits on shop void */}
        <path
          d="M 200 134 L 200 158 Q 148 168 148 198 Q 148 228 200 238 Q 252 228 252 198 Q 252 168 200 158"
          fill="none"
          stroke="#777"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Trap highlight */}
        <path
          d="M 200 158 Q 148 168 148 198 Q 148 220 200 228"
          fill="none"
          stroke="#999"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Slip nuts */}
        <ellipse cx={200} cy={156} rx="10" ry="5" fill="#666" stroke="#888" strokeWidth="1" />
        <ellipse cx={148} cy={218} rx="8" ry="5" fill="#666" stroke={C.danger} strokeWidth="1.5" />
        <ellipse cx={252} cy={218} rx="8" ry="5" fill="#666" stroke="#888" strokeWidth="1" />

        <ShopLabel x={268} y={200} size={7}>
          P-TRAP
        </ShopLabel>
        <ShopLabel x={148} y={206} size={6} fill={C.danger}>
          OVER-TIGHT
        </ShopLabel>

        {/* Bucket ready */}
        <g filter={`url(#dg-${gid}-shadow)`}>
          <path d="M 58 248 L 98 248 L 94 278 L 62 278 Z" fill="#b85c38" stroke="#8b4513" strokeWidth="1.5" />
          <ellipse cx={78} cy={248} rx="20" ry="5" fill="#c87048" stroke="#8b4513" strokeWidth="1" />
        </g>
        <ShopLabel x={78} y={292} size={6} fill={C.success}>
          BUCKET ✓
        </ShopLabel>

        {/* No bucket hazard zone */}
        <ellipse cx={200} cy={272} rx="38" ry="10" fill="none" stroke={C.danger} strokeDasharray="4 3" strokeWidth="1.5" />
        <HazardMark x={200} y={252} label="NO BUCKET" type="danger" compact />

        {/* Plunger (try first) */}
        <g transform="translate(318, 88)">
          <ellipse cx="0" cy="0" rx="22" ry="14" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" />
          <rect x="-4" y="12" width="8" height="32" rx="2" fill="#8b4513" stroke="#6b3410" strokeWidth="0.75" />
          <rect x="-8" y="42" width="16" height="6" rx="2" fill="#555" />
        </g>
        <ShopLabel x={318} y={68} size={6}>
          PLUNGER FIRST
        </ShopLabel>
      </DiagramBg>

      <HotspotOverlay
        hotspots={hotspots}
        selectedIds={selectedIds}
        highlightIds={highlightIds}
        onHotspotClick={onHotspotClick}
        interactive={interactive}
        showCallouts={showCallouts}
      />
    </svg>
  );
}
