import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, HazardMark, VIEW_BOX } from './diagramCraft';

const gid = 'coolant';

const hotspots = [
  { id: 'reservoir', label: 'Overflow reservoir', cx: 115, cy: 155, lx: 48, ly: 138 },
  { id: 'min', label: 'MIN mark', cx: 88, cy: 188, lx: 48, ly: 198 },
  { id: 'max', label: 'MAX mark', cx: 88, cy: 118, lx: 48, ly: 108 },
  { id: 'radiator', label: 'Radiator cap', cx: 295, cy: 88, lx: 340, ly: 68 },
  { id: 'oil-dipstick', label: 'Oil dipstick', cx: 325, cy: 215, lx: 360, ly: 228 },
  { id: 'hot-cap', label: 'Hot radiator cap', cx: 295, cy: 88, lx: 340, ly: 68 },
  { id: 'wrong-fluid', label: 'Wrong fluid', cx: 200, cy: 248, lx: 200, ly: 278 },
  { id: 'cold-engine', label: 'Cold engine', cx: 55, cy: 55, lx: 24, ly: 42 },
  { id: 'brake-fluid', label: 'Brake fluid', cx: 200, cy: 218, lx: 248, ly: 228 },
];

export default function CheckCoolantDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid meet" className="sketch-diagram" aria-label="Coolant check cutaway">
      <DiagramBg id={gid}>
        <TitleStamp x={200} y={22}>
          COOLANT — COLD ENGINE ONLY
        </TitleStamp>

        {/* Engine bay silhouette */}
        <rect x="30" y="48" width="340" height="200" rx="4" fill="#1a1a1a" opacity="0.4" stroke={C.steel} strokeWidth="1" />

        {/* Overflow reservoir */}
        <rect
          x="55"
          y="85"
          width="110"
          height="160"
          rx="6"
          fill="rgba(0,120,180,0.1)"
          stroke="#0078b4"
          strokeWidth="2"
          filter={`url(#dg-${gid}-shadow)`}
        />
        <rect x="70" y="125" width="80" height="80" rx="3" fill="rgba(0,120,180,0.4)" />
        <rect x="78" y="95" width="64" height="18" rx="2" fill="#444" stroke="#666" strokeWidth="0.75" />
        <ShopLabel x={110} y={262} size={7}>
          OVERFLOW RESERVOIR
        </ShopLabel>

        {/* MIN / MAX */}
        <line x1="72" y1="118" x2="108" y2="118" stroke={C.danger} strokeWidth="2" />
        <ShopLabel x={62} y={122} anchor="end" size={7} fill={C.danger}>
          MAX
        </ShopLabel>
        <line x1="72" y1="188" x2="108" y2="188" stroke={C.danger} strokeWidth="2" />
        <ShopLabel x={62} y={192} anchor="end" size={7} fill={C.danger}>
          MIN
        </ShopLabel>

        {/* Radiator */}
        <rect x="235" y="65" width="110" height="140" rx="4" fill="#aaa" stroke="#666" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={245} y1={85 + i * 20} x2={335} y2={85 + i * 20} stroke="#888" strokeWidth="1" />
        ))}
        <circle cx={290} cy={82} r="16" fill="#333" stroke="#111" strokeWidth="2" />
        <HazardMark x={290} y={58} label="HOT — DON'T OPEN" type="danger" compact />

        {/* Oil dipstick */}
        <rect x="318" y="205" width="6" height="48" rx="1" fill={C.caution} stroke={C.cautionDim} strokeWidth="0.75" />
        <circle cx={321} cy={202} r="5" fill={C.caution} />
        <ShopLabel x={335} y={232} size={7}>
          OIL DIPSTICK
        </ShopLabel>

        {/* Wrong fluid jug */}
        <rect x="175" y="232" width="50" height="38" rx="3" fill="none" stroke={C.caution} strokeDasharray="3 2" strokeWidth="1.5" />
        <rect x="188" y="225" width="24" height="10" rx="2" fill="none" stroke={C.caution} strokeDasharray="2 2" />
        <ShopLabel x={200} y={252} size={6} fill={C.caution}>
          PLAIN WATER?
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
