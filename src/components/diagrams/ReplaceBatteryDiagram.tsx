import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp } from './diagramCraft';

const hotspots = [
  { id: 'negative', label: 'Negative (−)', cx: 95, cy: 118 },
  { id: 'positive', label: 'Positive (+)', cx: 305, cy: 118 },
  { id: 'holddown', label: 'Hold-down', cx: 200, cy: 58 },
  { id: 'corrosion', label: 'Corrosion', cx: 318, cy: 155 },
];

export default function ReplaceBatteryDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 280" className="sketch-diagram" aria-label="Car battery cutaway">
      <DiagramBg h={280}>
        <TitleStamp x={200} y={22}>ENGINE BAY — BATTERY</TitleStamp>

        {/* Hood hint */}
        <path d="M 40 55 L 200 35 L 360 55" fill="none" stroke={C.steel} strokeWidth="2" strokeDasharray="4 3" />
        <ShopLabel x={200} y={32} size={7}>HOOD OPEN</ShopLabel>

        {/* Tray */}
        <rect x="55" y="175" width="290" height="14" rx="2" fill="#333" stroke="#555" strokeWidth="1" />

        {/* Battery case */}
        <rect x="70" y="95" width="260" height="85" rx="6" fill="#1a1a1e" stroke="#333" strokeWidth="2" />
        <ShopLabel x={200} y={140} fill={C.label}>BATTERY 12V</ShopLabel>

        {/* Hold-down */}
        <rect x="85" y="78" width="230" height="10" rx="2" fill="#666" />
        <rect x="90" y="72" width="8" height="16" rx="1" fill="#888" />
        <rect x="302" y="72" width="8" height="16" rx="1" fill="#888" />
        <ShopLabel x={200} y={70} size={7}>HOLD-DOWN BRACKET</ShopLabel>

        {/* Negative terminal */}
        <rect x="72" y="108" width="46" height="28" rx="4" fill="#111" stroke="#333" strokeWidth="2" />
        <circle cx="95" cy="122" r="11" fill="#222" stroke="#444" strokeWidth="2" />
        <ShopLabel x={95} y={155} fill={C.label}>− BLACK CABLE</ShopLabel>

        {/* Positive terminal */}
        <rect x="282" y="108" width="46" height="28" rx="4" fill="#111" stroke="#333" strokeWidth="2" />
        <circle cx="305" cy="122" r="11" fill={C.danger} stroke="#8b0000" strokeWidth="2" />
        <text x={305} y={126} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">+</text>
        <ShopLabel x={305} y={155} fill={C.danger}>+ RED CABLE</ShopLabel>

        {/* Corrosion */}
        <circle cx={318} cy={158} r="14" fill="none" stroke="#4a7c59" strokeWidth="2" strokeDasharray="3 2" />
        <ellipse cx={318} cy={158} rx="8" ry="6" fill="#3d6b4a" opacity="0.7" />
        <ShopLabel x={340} y={162} size={7}>CORROSION</ShopLabel>
      </DiagramBg>

      <HotspotOverlay hotspots={hotspots} selectedIds={selectedIds} highlightIds={highlightIds} onHotspotClick={onHotspotClick} interactive={interactive} showCallouts={showCallouts} />
    </svg>
  );
}
