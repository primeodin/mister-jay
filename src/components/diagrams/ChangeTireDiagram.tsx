import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, HazardMark, Leader, VIEW_BOX } from './diagramCraft';

const gid = 'tire';

const hotspots = [
  { id: 'jack', label: 'Scissor jack', cx: 168, cy: 212, lx: 248, ly: 200 },
  { id: 'lug-wrench', label: 'Lug wrench', cx: 298, cy: 222, lx: 340, ly: 248 },
  { id: 'spare', label: 'Spare tire', cx: 332, cy: 118, lx: 360, ly: 88 },
  { id: 'jack-point', label: 'Pinch weld', cx: 178, cy: 152, lx: 248, ly: 128 },
  { id: 'lug-nuts', label: 'Lug nuts', cx: 112, cy: 192, lx: 48, ly: 168 },
  { id: 'block-wheel', label: 'Wheel chock', cx: 52, cy: 242, lx: 24, ly: 268 },
  { id: 'no-brake', label: 'No parking brake', cx: 72, cy: 108, lx: 24, ly: 78 },
  { id: 'soft-ground', label: 'Soft ground', cx: 168, cy: 262, lx: 248, ly: 278 },
  { id: 'spare-ready', label: 'Spare ready', cx: 332, cy: 118, lx: 360, ly: 88 },
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
    <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid meet" className="sketch-diagram" aria-label="Tire change cutaway">
      <DiagramBg id={gid}>
        <TitleStamp x={200} y={22}>
          CHANGE A TIRE — ROADSIDE
        </TitleStamp>

        {/* Ground shadow */}
        <ellipse cx={130} cy={278} rx="95" ry="10" fill="#000" opacity="0.35" />

        {/* Sedan rear quarter — curved roof, fender flare */}
        <path
          d="M 28 178 L 28 138 Q 30 108 58 88 Q 95 68 145 64 Q 195 62 238 72 Q 268 82 278 102 L 282 138 L 282 178 Z"
          fill={`url(#dg-${gid}-paint)`}
          stroke={C.steel}
          strokeWidth="1.5"
        />
        {/* Body highlight */}
        <path
          d="M 38 140 Q 70 95 145 78 Q 210 72 265 88"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="3"
        />
        {/* Rocker / sill */}
        <path d="M 28 178 L 282 178 L 282 186 L 28 186 Z" fill={C.paintDark} stroke={C.steel} strokeWidth="0.75" />

        {/* Rear door glass */}
        <path
          d="M 98 92 Q 118 82 148 80 Q 178 80 198 88 L 198 128 Q 175 132 145 130 Q 110 126 98 118 Z"
          fill={C.glass}
          opacity="0.6"
          stroke={C.steel}
          strokeWidth="1"
        />
        {/* Quarter window */}
        <path d="M 210 86 L 255 94 L 252 118 L 210 112 Z" fill={C.glass} opacity="0.45" stroke={C.steel} strokeWidth="0.75" />

        {/* Wheel arch cutout */}
        <path
          d="M 52 178 Q 52 128 88 112 Q 118 102 138 118 Q 158 134 158 178 Z"
          fill={C.void}
          stroke={C.steel}
          strokeWidth="1"
        />
        <path d="M 52 178 Q 88 148 138 148 Q 148 148 158 178" fill="none" stroke="#222" strokeWidth="2" />

        {/* Tire + wheel */}
        <circle cx={112} cy={192} r="42" fill={`url(#dg-${gid}-rubber)`} stroke="#2a2a2a" strokeWidth="2.5" />
        <circle cx={112} cy={192} r="34" fill="none" stroke="#333" strokeWidth="1" />
        <circle cx={112} cy={192} r="24" fill={C.rim} stroke="#666" strokeWidth="1" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <circle
            key={deg}
            cx={112 + 18 * Math.cos((deg * Math.PI) / 180)}
            cy={192 + 18 * Math.sin((deg * Math.PI) / 180)}
            r="3.5"
            fill="#bbb"
          />
        ))}
        <circle cx={112} cy={192} r="6" fill="#888" />
        <ShopLabel x={112} y={248} fill={C.labelDim} size={6}>
          RADIAL T/A
        </ShopLabel>

        {/* Pinch weld jack point */}
        <rect x={162} y={146} width="52" height="5" rx="1" fill={C.steel} stroke="#888" strokeWidth="0.5" />
        <rect x={168} y={143} width="8" height="3" rx="0.5" fill="#aaa" />
        <rect x={200} y={143} width="8" height="3" rx="0.5" fill="#aaa" />
        <ShopLabel x={188} y={140} anchor="middle" size={6}>
          PINCH WELD
        </ShopLabel>

        {/* Scissor jack */}
        <g transform="translate(168, 205)" filter={`url(#dg-${gid}-shadow)`}>
          <line x1="-10" y1="4" x2="0" y2="-22" stroke={C.danger} strokeWidth="3" strokeLinecap="round" />
          <line x1="10" y1="4" x2="0" y2="-22" stroke={C.danger} strokeWidth="3" strokeLinecap="round" />
          <rect x="-16" y="4" width="32" height="6" rx="1" fill="#2a2a2a" stroke="#444" strokeWidth="0.75" />
          <rect x="-4" y="-26" width="8" height="7" rx="1" fill="#999" />
        </g>

        {/* Spare tire (laying flat) */}
        <g filter={`url(#dg-${gid}-shadow)`}>
          <ellipse cx={332} cy={122} rx="40" ry="14" fill={`url(#dg-${gid}-rubber)`} stroke="#333" strokeWidth="2" />
          <ellipse cx={332} cy={118} rx="24" ry="8" fill={C.rim} stroke="#666" strokeWidth="0.75" />
        </g>
        <ShopLabel x={332} y={148} size={6}>
          SPARE
        </ShopLabel>

        {/* Lug wrench */}
        <g transform="translate(298, 218) rotate(-15)">
          <rect x="-28" y="-3" width="56" height="7" rx="2" fill="#555" stroke="#777" strokeWidth="0.75" />
          <circle cx="-20" cy="0" r="10" fill="none" stroke="#888" strokeWidth="3" />
          <circle cx="20" cy="0" r="10" fill="none" stroke="#888" strokeWidth="3" />
        </g>
        <ShopLabel x={298} y={248} size={6}>
          LUG WRENCH
        </ShopLabel>

        {/* Wheel chock */}
        <polygon points="38,248 66,248 60,262 44,262" fill="#6b4423" stroke="#4a3018" strokeWidth="1" />
        <ShopLabel x={52} y={276} size={6} fill={C.success}>
          CHOCK ✓
        </ShopLabel>

        {/* Hazards — placed clear of hotspot dots */}
        <HazardMark x={72} y={88} label="PARK BRAKE?" type="caution" compact />
        <ellipse cx={168} cy={270} rx="32" ry="7" fill="#5a4a30" opacity="0.65" stroke={C.caution} strokeDasharray="3 2" strokeWidth="1" />

        {hi('jack-point') && (
          <Leader x1={188} y1={148} x2={248} y2={100} label="JACK POINT" active />
        )}
        {hi('block-wheel') && (
          <Leader x1={52} y1={254} x2={20} y2={210} label="BLOCK OPPOSITE" active danger />
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
