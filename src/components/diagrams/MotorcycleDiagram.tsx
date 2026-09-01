import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, HazardMark, VIEW_BOX } from './diagramCraft';

const gid = 'moto';

const hotspots = [
  { id: 'slope', label: 'Downhill slope', cx: 200, cy: 258, lx: 248, ly: 278 },
  { id: 'sandals', label: 'Sandals', cx: 75, cy: 268, lx: 32, ly: 290 },
  { id: 'boots', label: 'Sturdy boots', cx: 325, cy: 268, lx: 368, ly: 290 },
  { id: 'sidestand', label: 'Sidestand', cx: 135, cy: 218, lx: 88, ly: 238 },
  { id: 'handlebars', label: 'Handlebars', cx: 285, cy: 88, lx: 328, ly: 68 },
];

export default function MotorcycleDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  return (
    <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid meet" className="sketch-diagram" aria-label="Motorcycle cutaway">
      <DiagramBg id={gid}>
        <TitleStamp x={200} y={22}>
          WALK A MOTORCYCLE
        </TitleStamp>

        {/* Sloped pavement */}
        <path d="M 0 228 L 400 198 L 400 240 L 0 280 Z" fill="#2a2824" opacity="0.6" />
        <line x1="0" y1="228" x2="400" y2="198" stroke="#8a8278" strokeWidth="3" />
        <ShopLabel x={350} y={192} size={7}>
          SLOPE ↘
        </ShopLabel>
        <HazardMark x={200} y={242} label="DOWNHILL" type="caution" compact />

        {/* Rear wheel */}
        <circle cx={115} cy={210} r="40" fill={`url(#dg-${gid}-rubber)`} stroke="#444" strokeWidth="3" />
        <circle cx={115} cy={210} r="24" fill={C.rim} stroke="#666" strokeWidth="1" />
        {[0, 72, 144, 216, 288].map((deg) => (
          <circle
            key={deg}
            cx={115 + 16 * Math.cos((deg * Math.PI) / 180)}
            cy={210 + 16 * Math.sin((deg * Math.PI) / 180)}
            r="3"
            fill="#bbb"
          />
        ))}

        {/* Front wheel */}
        <circle cx={285} cy={200} r="40" fill={`url(#dg-${gid}-rubber)`} stroke="#444" strokeWidth="3" />
        <circle cx={285} cy={200} r="24" fill={C.rim} stroke="#666" strokeWidth="1" />

        {/* Frame */}
        <path
          d="M 115 210 L 175 130 L 220 105 L 285 200"
          fill="none"
          stroke="#555"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M 220 105 L 265 82 L 285 88" fill="none" stroke="#555" strokeWidth="4" strokeLinecap="round" />

        {/* Fuel tank */}
        <ellipse cx={210} cy={125} rx="44" ry="20" fill="#222" stroke="#444" strokeWidth="2" />
        <ellipse cx={210} cy={120} rx="36" ry="12" fill="#333" opacity="0.5" />
        <ShopLabel x={210} y={128} size={7} fill={C.label}>
          FUEL TANK
        </ShopLabel>

        {/* Seat */}
        <ellipse cx={165} cy={155} rx="28" ry="10" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />

        {/* Sidestand */}
        <line x1={140} y1={215} x2={148} y2={245} stroke="#888" strokeWidth="3" strokeLinecap="round" />
        <line x1={148} y1={245} x2={158} y2={248} stroke="#666" strokeWidth="2" />
        <ShopLabel x={135} y={258} size={7}>
          SIDESTAND
        </ShopLabel>

        {/* Handlebars */}
        <line x1={250} y1={82} x2={310} y2={90} stroke="#444" strokeWidth="5" strokeLinecap="round" />
        <circle cx={250} cy={82} r="5" fill="#555" />
        <circle cx={310} cy={90} r="5" fill="#555" />
        <ShopLabel x={285} y={72} size={7}>
          HANDLEBARS
        </ShopLabel>

        {/* Footwear comparison */}
        <ellipse cx={75} cy={268} rx="18" ry="8" fill="#8a7060" opacity="0.85" />
        <ShopLabel x={75} y={286} size={6} fill={C.danger}>
          SANDALS ✕
        </ShopLabel>
        <ellipse cx={325} cy={268} rx="18" ry="10" fill="#2a2a2a" stroke={C.success} strokeWidth="1.5" />
        <ShopLabel x={325} y={286} size={6} fill={C.success}>
          BOOTS ✓
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
