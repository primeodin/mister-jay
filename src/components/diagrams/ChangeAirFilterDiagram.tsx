import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp } from './diagramCraft';

const hotspots = [
  { id: 'housing', label: 'Filter housing', cx: 200, cy: 135 },
  { id: 'intake', label: 'Intake tube', cx: 75, cy: 135 },
  { id: 'filter', label: 'Filter element', cx: 200, cy: 135, r: 18 },
  { id: 'oil-cap', label: 'Oil cap', cx: 325, cy: 72 },
  { id: 'radiator', label: 'Radiator cap', cx: 325, cy: 72 },
];

export default function ChangeAirFilterDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 260" className="sketch-diagram" aria-label="Air filter cutaway">
      <DiagramBg h={260}>
        <TitleStamp x={200} y={22}>ENGINE BAY — AIR FILTER</TitleStamp>

        {/* Engine bay silhouette */}
        <rect x="30" y="55" width="340" height="170" rx="4" fill="#222" opacity="0.5" stroke={C.steel} strokeWidth="1" />

        {/* Intake tube */}
        <rect x="40" y="122" width="70" height="26" rx="13" fill="#444" stroke="#666" strokeWidth="1" />
        <ShopLabel x={75} y={165} size={7}>INTAKE TUBE →</ShopLabel>

        {/* Housing */}
        <rect x="125" y="95" width="150" height="95" rx="8" fill="#555" stroke="#888" strokeWidth="2" />
        <rect x="135" y="105" width="130" height="75" rx="4" fill="#f5f0e8" stroke={C.cautionDim} strokeWidth="1.5" strokeDasharray="4 2" />
        <ShopLabel x={200} y={145} fill="#333">FILTER ELEMENT</ShopLabel>
        <ShopLabel x={200} y={205} size={7}>CLIP HOUSING</ShopLabel>

        {/* Clips */}
        <rect x="128" y="108" width="6" height="12" rx="1" fill={C.caution} />
        <rect x="266" y="108" width="6" height="12" rx="1" fill={C.caution} />

        {/* Oil cap (wrong fluid trap) */}
        <circle cx={325} cy={72} r="16" fill={C.caution} stroke={C.cautionDim} strokeWidth="2" />
        <ShopLabel x={325} y={100} size={7}>OIL CAP</ShopLabel>
      </DiagramBg>

      <HotspotOverlay hotspots={hotspots} selectedIds={selectedIds} highlightIds={highlightIds} onHotspotClick={onHotspotClick} interactive={interactive} showCallouts={showCallouts} />
    </svg>
  );
}
