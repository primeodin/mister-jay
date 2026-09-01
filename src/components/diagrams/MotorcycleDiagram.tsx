import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, HazardMark } from './diagramCraft';

const hotspots = [
  { id: 'slope', label: 'Downhill slope', cx: 200, cy: 248 },
  { id: 'sandals', label: 'Sandals', cx: 75, cy: 248 },
  { id: 'boots', label: 'Sturdy boots', cx: 325, cy: 248 },
  { id: 'sidestand', label: 'Sidestand', cx: 135, cy: 205 },
  { id: 'handlebars', label: 'Handlebars', cx: 285, cy: 78 },
];

export default function MotorcycleDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 280" className="sketch-diagram" aria-label="Motorcycle cutaway">
      <DiagramBg h={280}>
        <TitleStamp x={200} y={22}>WALK A MOTORCYCLE</TitleStamp>

        {/* Sloped pavement */}
        <line x1="0" y1="210" x2="400" y2="185" stroke="#8a8278" strokeWidth="3" />
        <ShopLabel x={350} y={178} size={7}>SLOPE ↘</ShopLabel>
        <HazardMark x={200} y={232} label="DOWNHILL" type="caution" />

        {/* Wheels */}
        <circle cx={115} cy={195} r="38" fill={C.rubber} stroke="#444" strokeWidth="3" />
        <circle cx={115} cy={195} r="22" fill={C.rim} />
        <circle cx={285} cy={185} r="38" fill={C.rubber} stroke="#444" strokeWidth="3" />
        <circle cx={285} cy={185} r="22" fill={C.rim} />

        {/* Frame */}
        <path d="M 115 195 L 195 115 L 285 185" fill="none" stroke="#555" strokeWidth="6" strokeLinecap="round" />
        <path d="M 195 115 L 250 75 L 285 78" fill="none" stroke="#555" strokeWidth="4" strokeLinecap="round" />

        {/* Tank */}
        <ellipse cx={210} cy={118} rx="42" ry="18" fill="#222" stroke="#444" strokeWidth="2" />
        <ShopLabel x={210} y={122} size={7} fill={C.label}>FUEL TANK</ShopLabel>

        {/* Sidestand */}
        <line x1={140} y1={200} x2={148} y2={228} stroke="#888" strokeWidth="3" />
        <ShopLabel x={135} y={240} size={7}>SIDESTAND</ShopLabel>

        {/* Handlebars */}
        <line x1={250} y1={75} x2={310} y2={82} stroke="#444" strokeWidth="4" strokeLinecap="round" />
        <ShopLabel x={285} y={65} size={7}>HANDLEBARS</ShopLabel>

        {/* Footwear */}
        <ellipse cx={75} cy={255} rx="18" ry="8" fill="#8a7060" opacity="0.8" />
        <ShopLabel x={75} y={270} size={6} fill={C.danger}>SANDALS ✕</ShopLabel>
        <ellipse cx={325} cy={255} rx="18" ry="10" fill="#2a2a2a" stroke={C.success} strokeWidth="1" />
        <ShopLabel x={325} y={270} size={6} fill={C.success}>BOOTS ✓</ShopLabel>
      </DiagramBg>

      <HotspotOverlay hotspots={hotspots} selectedIds={selectedIds} highlightIds={highlightIds} onHotspotClick={onHotspotClick} interactive={interactive} showCallouts={showCallouts} />
    </svg>
  );
}
