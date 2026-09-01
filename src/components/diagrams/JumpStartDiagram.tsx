import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, HazardMark } from './diagramCraft';

const hotspots = [
  { id: 'ground', label: 'Engine ground', cx: 200, cy: 188 },
  { id: 'dead-neg', label: 'Dead − post', cx: 95, cy: 128 },
  { id: 'donor-pos', label: 'Donor + post', cx: 305, cy: 128 },
  { id: 'red-dead', label: 'Red on dead +', cx: 95, cy: 95 },
  { id: 'touching', label: 'Clamps touching', cx: 200, cy: 58 },
];

export default function JumpStartDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 280" className="sketch-diagram" aria-label="Jump start cutaway">
      <DiagramBg h={280}>
        <TitleStamp x={200} y={22}>JUMP-START — CABLE ORDER</TitleStamp>

        {/* Dead car */}
        <rect x="35" y="105" width="130" height="85" rx="6" fill={C.paint} stroke="#555" strokeWidth="2" />
        <rect x="55" y="120" width="90" height="55" rx="4" fill="#1a1a1e" stroke="#333" strokeWidth="1" />
        <circle cx={78} cy={140} r="10" fill="#111" stroke="#444" strokeWidth="2" />
        <circle cx={118} cy={140} r="10" fill={C.danger} />
        <ShopLabel x={100} y={205} size={7}>DEAD CAR</ShopLabel>

        {/* Donor car */}
        <rect x="235" y="105" width="130" height="85" rx="6" fill={C.paint} stroke="#555" strokeWidth="2" />
        <rect x="255" y="120" width="90" height="55" rx="4" fill="#1a1a1e" stroke="#333" strokeWidth="1" />
        <circle cx={278} cy={140} r="10" fill="#111" />
        <circle cx={318} cy={140} r="10" fill={C.danger} />
        <ShopLabel x={300} y={205} size={7}>DONOR CAR</ShopLabel>

        {/* Cables */}
        <path d="M 128 135 Q 200 85 272 135" stroke={C.danger} strokeWidth="4" fill="none" />
        <path d="M 88 148 Q 150 220 200 195" stroke="#111" strokeWidth="4" fill="none" />
        <ShopLabel x={200} y={218} size={7}>GROUND ON ENGINE BLOCK</ShopLabel>

        {/* Clamps touching hazard */}
        <line x1={185} y1={52} x2={215} y2={52} stroke={C.danger} strokeWidth="5" />
        <line x1={185} y1={60} x2={215} y2={60} stroke="#111" strokeWidth="5" />
        <HazardMark x={200} y={38} label="CLAMPS TOUCHING" type="danger" />

        {/* Order labels */}
        <ShopLabel x={95} y={88} size={6} fill={C.danger}>1 RED + DEAD</ShopLabel>
        <ShopLabel x={305} y={88} size={6}>2 RED + DONOR</ShopLabel>
        <ShopLabel x={200} y={178} size={6}>4 BLACK GROUND</ShopLabel>
      </DiagramBg>

      <HotspotOverlay hotspots={hotspots} selectedIds={selectedIds} highlightIds={highlightIds} onHotspotClick={onHotspotClick} interactive={interactive} showCallouts={showCallouts} />
    </svg>
  );
}
