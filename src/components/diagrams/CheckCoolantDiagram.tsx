import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, HazardMark } from './diagramCraft';

const hotspots = [
  { id: 'reservoir', label: 'Overflow reservoir', cx: 115, cy: 145 },
  { id: 'min', label: 'MIN mark', cx: 88, cy: 178 },
  { id: 'max', label: 'MAX mark', cx: 88, cy: 108 },
  { id: 'radiator', label: 'Radiator cap', cx: 295, cy: 78 },
  { id: 'oil-dipstick', label: 'Oil dipstick', cx: 325, cy: 205 },
  { id: 'hot-cap', label: 'Hot radiator cap', cx: 295, cy: 78 },
  { id: 'wrong-fluid', label: 'Wrong fluid', cx: 200, cy: 230 },
  { id: 'cold-engine', label: 'Cold engine', cx: 55, cy: 55 },
  { id: 'brake-fluid', label: 'Brake fluid', cx: 200, cy: 200 },
];

export default function CheckCoolantDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 280" className="sketch-diagram" aria-label="Coolant check cutaway">
      <DiagramBg h={280}>
        <TitleStamp x={200} y={22}>COOLANT — COLD ENGINE ONLY</TitleStamp>

        {/* Overflow reservoir */}
        <rect x="55" y="75" width="110" height="150" rx="6" fill="rgba(0,120,180,0.12)" stroke="#0078b4" strokeWidth="2" />
        <rect x="70" y="115" width="80" height="70" rx="3" fill="rgba(0,120,180,0.35)" />
        <ShopLabel x={110} y={240} size={7}>OVERFLOW RESERVOIR</ShopLabel>

        {/* MIN / MAX */}
        <line x1="72" y1="108" x2="108" y2="108" stroke={C.danger} strokeWidth="2" />
        <ShopLabel x={62} y={112} anchor="end" size={7} fill={C.danger}>MAX</ShopLabel>
        <line x1="72" y1="178" x2="108" y2="178" stroke={C.danger} strokeWidth="2" />
        <ShopLabel x={62} y={182} anchor="end" size={7} fill={C.danger}>MIN</ShopLabel>

        {/* Radiator */}
        <rect x="235" y="55" width="110" height="130" rx="4" fill="#aaa" stroke="#666" strokeWidth="2" />
        <circle cx={290} cy={72} r="16" fill="#333" stroke="#111" strokeWidth="2" />
        <HazardMark x={290} y={48} label="HOT — DON'T OPEN" type="danger" />

        {/* Oil dipstick */}
        <rect x="318" y="195" width="6" height="45" rx="1" fill={C.caution} />
        <circle cx={321} cy={192} r="5" fill={C.caution} />
        <ShopLabel x={335} y={220} size={7}>OIL DIPSTICK</ShopLabel>

        {/* Wrong fluid jug */}
        <rect x="175" y="218" width="50" height="35" rx="3" fill="none" stroke={C.caution} strokeDasharray="3 2" />
        <ShopLabel x={200} y={238} size={6} fill={C.caution}>PLAIN WATER?</ShopLabel>
      </DiagramBg>

      <HotspotOverlay hotspots={hotspots} selectedIds={selectedIds} highlightIds={highlightIds} onHotspotClick={onHotspotClick} interactive={interactive} showCallouts={showCallouts} />
    </svg>
  );
}
