import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, HazardMark, Leader } from './diagramCraft';

const hotspots = [
  { id: 'jack', label: 'Scissor jack', cx: 155, cy: 218 },
  { id: 'lug-wrench', label: 'Lug wrench', cx: 295, cy: 228 },
  { id: 'spare', label: 'Spare tire', cx: 330, cy: 115 },
  { id: 'jack-point', label: 'Pinch weld', cx: 175, cy: 148 },
  { id: 'lug-nuts', label: 'Lug nuts', cx: 108, cy: 198 },
  { id: 'block-wheel', label: 'Wheel chock', cx: 55, cy: 248 },
  { id: 'no-brake', label: 'No parking brake', cx: 55, cy: 95 },
  { id: 'soft-ground', label: 'Soft ground', cx: 155, cy: 268 },
  { id: 'spare-ready', label: 'Spare ready', cx: 330, cy: 115 },
];

export default function ChangeTireDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  const hi = (id: string) => highlightIds?.includes(id) ?? false;

  return (
    <svg viewBox="0 0 400 320" className="sketch-diagram" aria-label="Tire change cutaway">
      <DiagramBg h={320}>
        <TitleStamp x={200} y={22}>
          CHANGE A TIRE — ROADSIDE
        </TitleStamp>

        {/* Sedan quarter panel + rocker */}
        <path
          d="M 30 175 L 30 130 L 55 95 L 120 72 L 200 68 L 250 78 L 270 95 L 275 130 L 275 175"
          fill={C.paintDark}
          stroke={C.steel}
          strokeWidth="1.5"
        />
        {/* Door glass */}
        <rect x="95" y="88" width="72" height="38" rx="2" fill={C.glass} opacity="0.55" stroke={C.steel} strokeWidth="1" />
        {/* Wheel arch */}
        <path d="M 55 175 Q 55 130 95 118 Q 135 108 155 130 Q 175 152 175 175 Z" fill={C.void} stroke={C.steel} strokeWidth="1" />

        {/* Near wheel */}
        <circle cx="108" cy="198" r="44" fill={C.rubber} stroke="#333" strokeWidth="3" />
        <circle cx="108" cy="198" r="26" fill={C.rim} stroke="#666" strokeWidth="1" />
        {[0, 72, 144, 216, 288].map((deg) => (
          <circle
            key={deg}
            cx={108 + 20 * Math.cos((deg * Math.PI) / 180)}
            cy={198 + 20 * Math.sin((deg * Math.PI) / 180)}
            r="4"
            fill="#ccc"
          />
        ))}
        <ShopLabel x={108} y={252} fill={C.label}>
          RADIAL T/A
        </ShopLabel>

        {/* Pinch weld / jack point */}
        <rect x="155" y="142" width="48" height="6" rx="1" fill={C.steel} />
        <ShopLabel x={179} y={138} anchor="middle" size={7}>
          PINCH WELD
        </ShopLabel>

        {/* Scissor jack under rocker */}
        <g transform="translate(155, 200)">
          <line x1="-8" y1="0" x2="0" y2="-18" stroke={C.danger} strokeWidth="3" />
          <line x1="8" y1="0" x2="0" y2="-18" stroke={C.danger} strokeWidth="3" />
          <rect x="-14" y="0" width="28" height="5" rx="1" fill="#333" />
          <rect x="-3" y="-22" width="6" height="6" rx="1" fill="#888" />
        </g>

        {/* Spare tire */}
        <ellipse cx="330" cy="118" rx="38" ry="14" fill={C.rubber} stroke="#333" strokeWidth="2" />
        <ellipse cx="330" cy="115" rx="22" ry="8" fill={C.rim} />
        <ShopLabel x={330} y={145} size={7}>
          SPARE
        </ShopLabel>

        {/* Lug wrench */}
        <rect x="268" y="222" width="54" height="7" rx="2" fill="#555" transform="rotate(-12 295 225)" />
        <circle cx="278" cy="218" r="9" fill="none" stroke="#777" strokeWidth="3" />
        <ShopLabel x={295} y={248} size={7}>
          LUG WRENCH
        </ShopLabel>

        {/* Wheel chock */}
        <polygon points="42,255 68,255 62,268 48,268" fill="#6b4423" stroke="#4a3018" strokeWidth="1" />
        <ShopLabel x={55} y={280} size={7}>
          CHOCK
        </ShopLabel>

        {/* Hazard: parking brake not set */}
        <HazardMark x={55} y={82} label="PARK BRAKE?" type="caution" />
        {/* Hazard: soft ground under jack */}
        <ellipse cx={155} cy={275} rx="28" ry="8" fill="#5a4a30" opacity="0.7" stroke={C.caution} strokeDasharray="3 2" />

        {hi('jack-point') && (
          <Leader x1={179} y1={145} x2={220} y2={55} label="JACK POINT" active />
        )}
        {hi('block-wheel') && (
          <Leader x1={55} y1={260} x2={20} y2={200} label="BLOCK OPPOSITE WHEEL" active danger />
        )}
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
