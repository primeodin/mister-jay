import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, VIEW_BOX } from './diagramCraft';

const gid = 'filter';

const hotspots = [
  { id: 'housing', label: 'Filter housing', cx: 200, cy: 145, lx: 248, ly: 128 },
  { id: 'intake', label: 'Intake tube', cx: 75, cy: 145, lx: 32, ly: 128 },
  { id: 'filter', label: 'Filter element', cx: 200, cy: 145, lx: 200, ly: 178 },
  { id: 'oil-cap', label: 'Oil cap', cx: 325, cy: 82, lx: 360, ly: 68 },
  { id: 'radiator', label: 'Radiator cap', cx: 325, cy: 82, lx: 360, ly: 68 },
];

export default function ChangeAirFilterDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid meet" className="sketch-diagram" aria-label="Air filter cutaway">
      <DiagramBg id={gid}>
        <TitleStamp x={200} y={22}>
          ENGINE BAY — AIR FILTER
        </TitleStamp>

        {/* Engine bay */}
        <rect x="30" y="55" width="340" height="200" rx="4" fill="#1e1e1e" opacity="0.55" stroke={C.steel} strokeWidth="1" />

        {/* Intake tube */}
        <rect x="40" y="132" width="75" height="28" rx="14" fill="#444" stroke="#666" strokeWidth="1.5" />
        <rect x="48" y="140" width="40" height="12" rx="6" fill="#555" opacity="0.5" />
        <ShopLabel x={77} y={178} size={7}>
          INTAKE TUBE →
        </ShopLabel>

        {/* Housing */}
        <rect
          x="125"
          y="105"
          width="150"
          height="100"
          rx="8"
          fill="#555"
          stroke="#888"
          strokeWidth="2"
          filter={`url(#dg-${gid}-shadow)`}
        />
        <rect
          x="135"
          y="115"
          width="130"
          height="80"
          rx="4"
          fill="#f5f0e8"
          stroke={C.cautionDim}
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        {/* Pleats */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={142 + i * 16} y1={120} x2={142 + i * 16} y2={190} stroke="#d4ccc0" strokeWidth="1" />
        ))}
        <ShopLabel x={200} y={155} fill="#444" size={8}>
          FILTER ELEMENT
        </ShopLabel>
        <ShopLabel x={200} y={218} size={7}>
          CLIP HOUSING
        </ShopLabel>

        {/* Clips */}
        <rect x="128" y="118" width="6" height="14" rx="1" fill={C.caution} />
        <rect x="266" y="118" width="6" height="14" rx="1" fill={C.caution} />

        {/* Oil cap (wrong target) */}
        <circle cx={325} cy={82} r="16" fill={C.caution} stroke={C.cautionDim} strokeWidth="2" />
        <circle cx={325} cy={82} r="8" fill={C.cautionDim} opacity="0.5" />
        <ShopLabel x={325} y={112} size={7}>
          OIL CAP
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
