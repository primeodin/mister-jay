import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { DiagramBg, ShopLabel, TitleStamp } from './diagramCraft';

const hotspots = [
  { id: 'supply', label: 'Supply valves', cx: 78, cy: 205 },
  { id: 'handle', label: 'Faucet handle', cx: 200, cy: 72 },
  { id: 'aerator', label: 'Aerator', cx: 200, cy: 118 },
  { id: 'p-trap', label: 'P-trap', cx: 200, cy: 228 },
];

export default function StopFaucetDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 300" className="sketch-diagram" aria-label="Faucet repair cutaway">
      <DiagramBg h={300}>
        <TitleStamp x={200} y={22}>STOP A DRIPPING FAUCET</TitleStamp>

        {/* Counter */}
        <rect x="60" y="28" width="280" height="18" rx="2" fill="#888" stroke="#666" strokeWidth="1" />

        {/* Faucet */}
        <rect x="175" y="46" width="50" height="48" rx="4" fill="#aaa" stroke="#777" strokeWidth="2" />
        <circle cx={200} cy={58} r="14" fill="#777" stroke="#555" strokeWidth="2" />
        <ShopLabel x={200} y={42} size={7}>HANDLE</ShopLabel>

        <rect x="194" y="94" width="12" height="32" fill="#888" />
        <ellipse cx={200} cy={132} rx="10" ry="5" fill="#0078b4" opacity="0.6" />
        <ShopLabel x={228} y={135} size={7}>DRIP</ShopLabel>
        <circle cx={200} cy={118} r="8" fill="none" stroke="#999" strokeWidth="1" strokeDasharray="2 2" />
        <ShopLabel x={200} y={108} size={6}>AERATOR</ShopLabel>

        {/* Cabinet */}
        <rect x="50" y="155" width="300" height="120" rx="3" fill="#2a2824" stroke="#444" strokeWidth="1" opacity="0.8" />

        {/* Supply valves */}
        <circle cx={78} cy={205} r="12" fill="#555" stroke="#333" strokeWidth="2" />
        <circle cx={322} cy={205} r="12" fill="#555" stroke="#333" strokeWidth="2" />
        <ShopLabel x={78} y={232} size={7}>HOT OFF</ShopLabel>
        <ShopLabel x={322} y={232} size={7}>COLD OFF</ShopLabel>

        {/* P-trap */}
        <path d="M 200 165 Q 165 210 200 245 Q 235 210 200 165" fill="none" stroke="#777" strokeWidth="8" strokeLinecap="round" />
        <ShopLabel x={248} y={218} size={7}>P-TRAP</ShopLabel>
      </DiagramBg>

      <HotspotOverlay hotspots={hotspots} selectedIds={selectedIds} highlightIds={highlightIds} onHotspotClick={onHotspotClick} interactive={interactive} showCallouts={showCallouts} />
    </svg>
  );
}
