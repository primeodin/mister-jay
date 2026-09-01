import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, VIEW_BOX } from './diagramCraft';

const gid = 'battery';

const hotspots = [
  { id: 'negative', label: 'Negative (−)', cx: 95, cy: 128, lx: 48, ly: 108 },
  { id: 'positive', label: 'Positive (+)', cx: 305, cy: 128, lx: 352, ly: 108 },
  { id: 'holddown', label: 'Hold-down', cx: 200, cy: 58, lx: 200, ly: 38 },
  { id: 'corrosion', label: 'Corrosion', cx: 318, cy: 158, lx: 360, ly: 148 },
];

export default function ReplaceBatteryDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid meet" className="sketch-diagram" aria-label="Car battery cutaway">
      <DiagramBg id={gid}>
        <TitleStamp x={200} y={22}>
          ENGINE BAY — BATTERY
        </TitleStamp>

        {/* Hood line */}
        <path d="M 40 55 L 200 35 L 360 55" fill="none" stroke={C.steel} strokeWidth="2" strokeDasharray="4 3" />
        <ShopLabel x={200} y={32} size={7}>
          HOOD OPEN
        </ShopLabel>

        {/* Fender wells hint */}
        <path d="M 55 95 Q 55 175 70 195" fill="none" stroke="#333" strokeWidth="8" opacity="0.5" />
        <path d="M 345 95 Q 345 175 330 195" fill="none" stroke="#333" strokeWidth="8" opacity="0.5" />

        {/* Tray */}
        <rect x="55" y="195" width="290" height="16" rx="2" fill="#2a2a2a" stroke="#555" strokeWidth="1" />

        {/* Battery case */}
        <rect
          x="70"
          y="105"
          width="260"
          height="95"
          rx="6"
          fill="#1a1a1e"
          stroke="#333"
          strokeWidth="2"
          filter={`url(#dg-${gid}-shadow)`}
        />
        <rect x="78" y="112" width="244" height="78" rx="4" fill="#222" opacity="0.6" />
        <ShopLabel x={200} y={155} fill={C.label}>
          BATTERY 12V
        </ShopLabel>

        {/* Hold-down bracket */}
        <rect x="85" y="88" width="230" height="10" rx="2" fill="#666" stroke="#888" strokeWidth="0.75" />
        <rect x="90" y="82" width="8" height="18" rx="1" fill="#999" />
        <rect x="302" y="82" width="8" height="18" rx="1" fill="#999" />
        <ShopLabel x={200} y={78} size={7}>
          HOLD-DOWN BRACKET
        </ShopLabel>

        {/* Negative terminal */}
        <rect x="72" y="118" width="46" height="30" rx="4" fill="#111" stroke="#333" strokeWidth="2" />
        <circle cx="95" cy="133" r="11" fill="#222" stroke="#555" strokeWidth="2" />
        <ShopLabel x={95} y={168} fill={C.label} size={7}>
          − BLACK CABLE
        </ShopLabel>

        {/* Positive terminal */}
        <rect x="282" y="118" width="46" height="30" rx="4" fill="#111" stroke="#333" strokeWidth="2" />
        <circle cx="305" cy="133" r="11" fill={C.danger} stroke="#8b0000" strokeWidth="2" />
        <text x={305} y={137} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
          +
        </text>
        <ShopLabel x={305} y={168} fill={C.danger} size={7}>
          + RED CABLE
        </ShopLabel>

        {/* Corrosion bloom */}
        <ellipse cx={318} cy={162} rx="12" ry="9" fill="#3d6b4a" opacity="0.75" />
        <circle cx={318} cy={162} r="16" fill="none" stroke="#4a7c59" strokeWidth="1.5" strokeDasharray="3 2" />
        <ShopLabel x={340} y={166} size={7}>
          CORROSION
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
