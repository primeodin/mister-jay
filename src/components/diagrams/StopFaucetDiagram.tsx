import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, VIEW_BOX } from './diagramCraft';

const gid = 'faucet';

const hotspots = [
  { id: 'supply', label: 'Supply valves', cx: 78, cy: 218, lx: 32, ly: 238 },
  { id: 'handle', label: 'Faucet handle', cx: 200, cy: 78, lx: 248, ly: 58 },
  { id: 'aerator', label: 'Aerator', cx: 200, cy: 128, lx: 248, ly: 128 },
  { id: 'p-trap', label: 'P-trap', cx: 200, cy: 248, lx: 248, ly: 268 },
];

export default function StopFaucetDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid meet" className="sketch-diagram" aria-label="Faucet repair cutaway">
      <DiagramBg id={gid}>
        <TitleStamp x={200} y={22}>
          STOP A DRIPPING FAUCET
        </TitleStamp>

        {/* Countertop */}
        <rect x="60" y="38" width="280" height="16" rx="2" fill="#8a8580" stroke="#666" strokeWidth="1" />
        <rect x="60" y="54" width="280" height="4" fill="#6a6560" />

        {/* Faucet body */}
        <path
          d="M 175 54 L 225 54 L 220 102 L 180 102 Z"
          fill={C.chrome}
          stroke="#888"
          strokeWidth="1.5"
        />
        <circle cx={200} cy={68} r="16" fill="#888" stroke="#666" strokeWidth="2" />
        <rect x="188" y="52" width="24" height="8" rx="2" fill="#999" />
        <ShopLabel x={200} y={48} size={7}>
          HANDLE
        </ShopLabel>

        {/* Spout */}
        <rect x="194" y="102" width="12" height="36" fill="#999" stroke="#777" strokeWidth="0.75" />
        <path d="M 200 138 Q 218 142 218 152 L 200 152 Z" fill="#999" stroke="#777" strokeWidth="0.75" />

        {/* Drip */}
        <ellipse cx={208} cy={162} rx="4" ry="6" fill="#0078b4" opacity="0.7" />
        <ellipse cx={208} cy={172} rx="3" ry="5" fill="#0078b4" opacity="0.5" />
        <ShopLabel x={232} y={165} size={7}>
          DRIP
        </ShopLabel>

        {/* Aerator */}
        <circle cx={200} cy={128} r="8" fill="none" stroke="#aaa" strokeWidth="1" strokeDasharray="2 2" />
        <ShopLabel x={200} y={118} size={6}>
          AERATOR
        </ShopLabel>

        {/* Cabinet cutaway */}
        <rect x="50" y="168" width="300" height="132" rx="3" fill="#2a2824" stroke="#444" strokeWidth="1" opacity="0.85" />
        <line x1="50" y1="168" x2="350" y2="168" stroke="#555" strokeWidth="1" strokeDasharray="4 3" />

        {/* Supply valves */}
        <circle cx={78} cy={218} r="12" fill="#555" stroke="#333" strokeWidth="2" />
        <rect x={72} y={206} width="12" height="6" rx="1" fill="#888" transform="rotate(-45 78 218)" />
        <circle cx={322} cy={218} r="12" fill="#555" stroke="#333" strokeWidth="2" />
        <rect x={316} y={206} width="12" height="6" rx="1" fill="#888" transform="rotate(45 322 218)" />
        <ShopLabel x={78} y={248} size={7}>
          HOT OFF
        </ShopLabel>
        <ShopLabel x={322} y={248} size={7}>
          COLD OFF
        </ShopLabel>

        {/* P-trap */}
        <path
          d="M 200 178 Q 165 218 200 258 Q 235 218 200 178"
          fill="none"
          stroke="#777"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <ellipse cx={200} cy={178} rx="8" ry="4" fill="#666" stroke="#888" strokeWidth="0.75" />
        <ShopLabel x={248} y={228} size={7}>
          P-TRAP
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
