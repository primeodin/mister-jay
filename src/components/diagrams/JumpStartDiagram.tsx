import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, HazardMark, VIEW_BOX } from './diagramCraft';

const gid = 'jump';

const hotspots = [
  { id: 'ground', label: 'Engine ground', cx: 200, cy: 205, lx: 200, ly: 238 },
  { id: 'dead-neg', label: 'Dead − post', cx: 95, cy: 138, lx: 48, ly: 118 },
  { id: 'donor-pos', label: 'Donor + post', cx: 305, cy: 138, lx: 352, ly: 118 },
  { id: 'red-dead', label: 'Red on dead +', cx: 95, cy: 108, lx: 48, ly: 88 },
  { id: 'touching', label: 'Clamps touching', cx: 200, cy: 62, lx: 200, ly: 38 },
];

export default function JumpStartDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid meet" className="sketch-diagram" aria-label="Jump start cutaway">
      <DiagramBg id={gid}>
        <TitleStamp x={200} y={22}>
          JUMP-START — CABLE ORDER
        </TitleStamp>

        {/* Dead car battery */}
        <g filter={`url(#dg-${gid}-shadow)`}>
          <rect x="35" y="115" width="130" height="90" rx="6" fill={`url(#dg-${gid}-paint)`} stroke="#555" strokeWidth="2" />
          <rect x="55" y="130" width="90" height="60" rx="4" fill="#1a1a1e" stroke="#333" strokeWidth="1" />
          <circle cx="78" cy="152" r="10" fill="#111" stroke="#444" strokeWidth="2" />
          <circle cx="118" cy="152" r="10" fill={C.danger} stroke="#8b0000" strokeWidth="1.5" />
        </g>
        <ShopLabel x={100} y={218} size={7}>
          DEAD CAR
        </ShopLabel>

        {/* Donor car battery */}
        <g filter={`url(#dg-${gid}-shadow)`}>
          <rect x="235" y="115" width="130" height="90" rx="6" fill={`url(#dg-${gid}-paint)`} stroke="#555" strokeWidth="2" />
          <rect x="255" y="130" width="90" height="60" rx="4" fill="#1a1a1e" stroke="#333" strokeWidth="1" />
          <circle cx="278" cy="152" r="10" fill="#111" stroke="#444" strokeWidth="2" />
          <circle cx="318" cy="152" r="10" fill={C.danger} stroke="#8b0000" strokeWidth="1.5" />
        </g>
        <ShopLabel x={300} y={218} size={7}>
          DONOR CAR
        </ShopLabel>

        {/* Jumper cables */}
        <path d="M 128 148 Q 200 95 272 148" stroke={C.danger} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 88 158 Q 145 235 200 210" stroke="#111" strokeWidth="5" fill="none" strokeLinecap="round" />

        {/* Ground point on engine block */}
        <rect x="185" y="195" width="30" height="18" rx="2" fill="#444" stroke="#666" strokeWidth="1" />
        <circle cx={200} cy={204} r="6" fill="#333" stroke="#111" strokeWidth="2" />
        <ShopLabel x={200} y={232} size={7}>
          GROUND ON ENGINE BLOCK
        </ShopLabel>

        {/* Clamps touching hazard */}
        <g>
          <rect x="178" y="52" width="14" height="10" rx="2" fill={C.danger} />
          <rect x="208" y="52" width="14" height="10" rx="2" fill="#111" />
          <line x1="192" y1="57" x2="208" y2="57" stroke={C.dangerGlow} strokeWidth="2" />
        </g>
        <HazardMark x={200} y={42} label="CLAMPS TOUCHING" type="danger" compact />

        {/* Order labels */}
        <ShopLabel x={95} y={98} size={6} fill={C.danger}>
          1 RED + DEAD
        </ShopLabel>
        <ShopLabel x={305} y={98} size={6}>
          2 RED + DONOR
        </ShopLabel>
        <ShopLabel x={200} y={188} size={6}>
          4 BLACK GROUND
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
