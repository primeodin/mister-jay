import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import {
  C,
  DiagramBg,
  ShopLabel,
  TitleStamp,
  HazardMark,
  BreakerEnclosure,
  BreakerToggle,
  VIEW_BOX,
} from './diagramCraft';

const gid = 'reset';

const hotspots = [
  { id: 'tripped', label: 'Tripped breaker', cx: 148, cy: 148, lx: 80, ly: 118 },
  { id: 'face-panel', label: 'Face the panel', cx: 200, cy: 248, lx: 200, ly: 278 },
  { id: 'wet-hands', label: 'Wet hands', cx: 328, cy: 138, lx: 360, ly: 108 },
  { id: 'side-stance', label: 'Side stance', cx: 72, cy: 248, lx: 32, ly: 278 },
];

export default function ResetBreakerDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid meet" className="sketch-diagram" aria-label="Reset breaker cutaway">
      <DiagramBg id={gid}>
        <TitleStamp x={200} y={22}>
          RESET A TRIPPED BREAKER
        </TitleStamp>

        {/* Wall frame */}
        <rect x="48" y="36" width="304" height="228" rx="4" fill="#3a3834" stroke="#555" strokeWidth="1.5" opacity="0.6" />

        <BreakerEnclosure x={68} y={48} w={264} h={200} gid={gid} />

        {/* Main breaker strip (partial, top) */}
        <rect x="148" y="62" width="104" height="20" rx="2" fill="#444" stroke="#888" strokeWidth="1" />
        <rect x="194" y="66" width="10" height="12" rx="1" fill="#ccc" />
        <ShopLabel x={200} y={58} size={7} fill={C.caution}>
          MAIN 100A
        </ShopLabel>

        {/* Branch row — tripped + neighbors for context */}
        <BreakerToggle x={108} y={98} label="KIT 20A" gid={gid} />
        <BreakerToggle x={148} y={98} label="TRIPPED ↓" tripped gid={gid} />
        <BreakerToggle x={188} y={98} label="BED 15A" gid={gid} />
        <BreakerToggle x={228} y={98} label="GAR 20A" gid={gid} />
        <BreakerToggle x={268} y={98} label="ON ↑" gid={gid} />

        {/* Second row (dim context) */}
        <g opacity="0.55">
          <BreakerToggle x={108} y={152} label="LR 15A" gid={gid} />
          <BreakerToggle x={148} y={152} label="??? 15A" gid={gid} />
          <BreakerToggle x={188} y={152} label="DRY 30A" gid={gid} />
          <BreakerToggle x={228} y={152} label="AC 30A" gid={gid} />
        </g>

        {/* Arrow hint on tripped */}
        <path d="M 167 118 L 167 128" stroke={C.caution} strokeWidth="2" markerEnd="url(#arrow-caution)" />
        <defs>
          <marker id="arrow-caution" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill={C.caution} />
          </marker>
        </defs>
        <ShopLabel x={167} y={138} size={6} fill={C.caution}>
          FLIP OFF, THEN ON
        </ShopLabel>

        {/* Side stance figure (correct) */}
        <g>
          <circle cx={72} cy={238} r="9" fill={C.paintLight} stroke={C.steel} strokeWidth="1" />
          <line x1={72} y1={247} x2={72} y2={268} stroke={C.paintLight} strokeWidth="3" strokeLinecap="round" />
          <line x1={72} y1={255} x2={58} y2={268} stroke={C.paintLight} strokeWidth="2" strokeLinecap="round" />
          <line x1={72} y1={255} x2={86} y2={268} stroke={C.paintLight} strokeWidth="2" strokeLinecap="round" />
          <line x1={72} y1={250} x2={95} y2={242} stroke={C.paintLight} strokeWidth="2" strokeLinecap="round" />
          <ShopLabel x={72} y={276} size={6} fill={C.success}>
            SIDE STANCE ✓
          </ShopLabel>
        </g>

        {/* Face-panel hazard (wrong stance) */}
        <g opacity="0.7">
          <circle cx={200} cy={238} r="9" fill={C.paint} opacity="0.5" />
          <line x1={200} y1={247} x2={200} y2={268} stroke={C.paint} strokeWidth="3" />
        </g>
        <HazardMark x={200} y={218} label="DON'T STAND HERE" type="danger" compact />

        {/* Wet hands — small drips only (no large splash blobs) */}
        <circle cx={332} cy={136} r="3" fill="rgba(0,120,200,0.55)" />
        <circle cx={326} cy={142} r="2" fill="rgba(0,120,200,0.45)" />
        <HazardMark x={318} y={118} label="WET HANDS" type="danger" compact />
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
