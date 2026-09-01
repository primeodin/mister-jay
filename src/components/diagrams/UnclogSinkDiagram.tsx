import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, HazardMark } from './diagramCraft';

const hotspots = [
  { id: 'no-bucket', label: 'No bucket', cx: 200, cy: 258 },
  { id: 'overtight', label: 'Over-tightened', cx: 145, cy: 215 },
  { id: 'bucket-ready', label: 'Bucket ready', cx: 78, cy: 248 },
  { id: 'plunger', label: 'Plunger first', cx: 318, cy: 95 },
];

export default function UnclogSinkDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 300" className="sketch-diagram" aria-label="Sink unclog cutaway">
      <DiagramBg h={300}>
        <TitleStamp x={200} y={22}>UNCLOG A SINK — SAVE THE TRAP</TitleStamp>

        {/* Sink basin */}
        <rect x="95" y="42" width="210" height="58" rx="4" fill="#ccc" stroke="#999" strokeWidth="2" />
        <rect x="185" y="100" width="30" height="28" fill="#888" />

        {/* P-trap */}
        <path d="M 200 128 Q 155 175 200 218 Q 245 175 200 128" fill="none" stroke="#666" strokeWidth="10" strokeLinecap="round" />
        <ShopLabel x={255} y={185} size={7}>P-TRAP</ShopLabel>

        {/* Bucket ready */}
        <rect x="52" y="228" width="52" height="38" rx="3" fill="#b85c38" opacity="0.85" stroke="#8b4513" strokeWidth="1" />
        <ShopLabel x={78} y={278} size={7} fill={C.success}>BUCKET ✓</ShopLabel>

        {/* No bucket hazard */}
        <ellipse cx={200} cy={262} rx="42" ry="12" fill="none" stroke={C.danger} strokeDasharray="4 3" />
        <HazardMark x={200} y={245} label="NO BUCKET" type="danger" />

        {/* Over-tightened slip nut */}
        <circle cx={145} cy={215} r="12" fill="none" stroke={C.danger} strokeWidth="2" />
        <ShopLabel x={145} y={200} size={6} fill={C.danger}>OVER-TIGHT</ShopLabel>

        {/* Plunger */}
        <rect x="298" y="62" width="40" height="55" rx="20" fill="#333" stroke="#555" strokeWidth="1" />
        <line x1={318} y1={117} x2={318} y2={140} stroke="#8b4513" strokeWidth="5" />
        <ShopLabel x={318} y={52} size={7}>PLUNGER FIRST</ShopLabel>
      </DiagramBg>

      <HotspotOverlay hotspots={hotspots} selectedIds={selectedIds} highlightIds={highlightIds} onHotspotClick={onHotspotClick} interactive={interactive} showCallouts={showCallouts} />
    </svg>
  );
}
