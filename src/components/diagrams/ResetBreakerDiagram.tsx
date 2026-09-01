import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, HazardMark } from './diagramCraft';

const hotspots = [
  { id: 'tripped', label: 'Tripped breaker', cx: 158, cy: 138 },
  { id: 'face-panel', label: 'Face the panel', cx: 200, cy: 248 },
  { id: 'wet-hands', label: 'Wet hands', cx: 318, cy: 138 },
  { id: 'side-stance', label: 'Side stance', cx: 82, cy: 248 },
];

export default function ResetBreakerDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 280" className="sketch-diagram" aria-label="Reset breaker cutaway">
      <DiagramBg h={280}>
        <TitleStamp x={200} y={22}>RESET A TRIPPED BREAKER</TitleStamp>

        <rect x="95" y="48" width="210" height="165" rx="4" fill="#2a2a2a" stroke="#666" strokeWidth="2" />

        {/* Tripped breaker */}
        <rect x="118" y="68" width="52" height="42" rx="2" fill="#333" stroke="#555" strokeWidth="1" />
        <rect x="136" y="86" width="10" height="14" rx="1" fill={C.caution} />
        <ShopLabel x={144} y={120} size={7} fill={C.caution}>TRIPPED ↓</ShopLabel>

        {/* ON breaker */}
        <rect x="188" y="68" width="52" height="42" rx="2" fill="#333" stroke="#555" strokeWidth="1" />
        <rect x={206} y={76} width="10" height="14" rx="1" fill="#ccc" />
        <ShopLabel x={214} y={120} size={7} fill={C.success}>ON ↑</ShopLabel>

        {/* Side stance figure */}
        <circle cx={82} cy={235} r="10" fill={C.paint} />
        <line x1={82} y1={245} x2={82} y2={268} stroke={C.paint} strokeWidth="3" />
        <line x1={82} y1={255} x2={65} y2={268} stroke={C.paint} strokeWidth="2" />
        <line x1={82} y1={255} x2={99} y2={268} stroke={C.paint} strokeWidth="2" />
        <ShopLabel x={82} y={278} size={6} fill={C.success}>SIDE STANCE ✓</ShopLabel>

        {/* Face panel (hazard) */}
        <circle cx={200} cy={235} r="10" fill={C.paint} opacity="0.5" />
        <line x1={200} y1={245} x2={200} y2={268} stroke={C.paint} strokeWidth="3" />
        <HazardMark x={200} y={218} label="DON'T STAND HERE" type="danger" />

        {/* Wet hands */}
        <circle cx={318} cy={135} r="22" fill="rgba(0,100,200,0.35)" stroke="#0078b4" strokeWidth="2" />
        <HazardMark x={318} y={108} label="WET HANDS" type="danger" />
      </DiagramBg>

      <HotspotOverlay hotspots={hotspots} selectedIds={selectedIds} highlightIds={highlightIds} onHotspotClick={onHotspotClick} interactive={interactive} showCallouts={showCallouts} />
    </svg>
  );
}
