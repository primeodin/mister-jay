import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, HazardMark, BreakerEnclosure, BreakerToggle, VIEW_BOX } from './diagramCraft';

const gid = 'panel';

const hotspots = [
  { id: 'main', label: 'Main breaker', cx: 200, cy: 62, lx: 248, ly: 48 },
  { id: 'kitchen', label: 'Kitchen 20A', cx: 115, cy: 128, lx: 72, ly: 108 },
  { id: 'bedroom', label: 'Bedroom 15A', cx: 200, cy: 128, lx: 200, ly: 108 },
  { id: 'dryer', label: 'Dryer 30A', cx: 285, cy: 128, lx: 328, ly: 108 },
  { id: 'rust', label: 'Rust', cx: 58, cy: 195, lx: 24, ly: 178 },
  { id: 'scorch', label: 'Scorch', cx: 285, cy: 195, lx: 328, ly: 178 },
  { id: 'unlabeled', label: 'Unlabeled', cx: 158, cy: 178, lx: 120, ly: 198 },
  { id: 'water', label: 'Water on floor', cx: 340, cy: 248, lx: 360, ly: 278 },
  { id: 'bare-hands', label: 'Bare hands', cx: 200, cy: 100, lx: 248, ly: 78 },
  { id: 'labels', label: 'Circuit labels', cx: 115, cy: 155, lx: 72, ly: 168 },
];

export default function BreakerPanelDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  showCallouts,
}: DiagramProps) {
  const hi = (id: string) => highlightIds?.includes(id) ?? false;
  const breakers = [
    { x: 88, y: 108, label: 'KIT 20A', tripped: false },
    { x: 148, y: 108, label: '???', tripped: false },
    { x: 208, y: 108, label: 'BED 15A', tripped: false },
    { x: 268, y: 108, label: 'DRY 30A', tripped: false },
    { x: 88, y: 158, label: 'LR 15A', tripped: false },
    { x: 148, y: 158, label: '???', tripped: true },
    { x: 208, y: 158, label: 'GAR 20A', tripped: false },
    { x: 268, y: 158, label: 'AC 30A', tripped: false },
  ];

  return (
    <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid meet" className="sketch-diagram" aria-label="Breaker panel cutaway">
      <DiagramBg id={gid}>
        <TitleStamp x={200} y={22}>
          LOAD CENTER — READ FIRST
        </TitleStamp>

        <BreakerEnclosure x={55} y={38} w={290} h={210} gid={gid} />

        {/* Main breaker */}
        <rect x="155" y="54" width="90" height="24" rx="2" fill="#444" stroke="#888" strokeWidth="1" />
        <rect x="195" y="58" width="10" height="16" rx="1" fill="#ccc" />
        <ShopLabel x={200} y={50} size={8} fill={C.caution}>
          MAIN 100A
        </ShopLabel>

        {/* Branch breakers */}
        {breakers.map((b) => (
          <BreakerToggle key={b.label + b.x} x={b.x} y={b.y} label={b.label} tripped={b.tripped} gid={gid} />
        ))}

        {/* Rust */}
        <ellipse cx="58" cy="198" rx="14" ry="9" fill="#6b4423" opacity="0.8" />
        <HazardMark x={58} y={182} label="CORROSION" type="caution" compact />

        {/* Scorch */}
        <rect x="270" y="188" width="32" height="14" rx="2" fill="#222" stroke={C.danger} strokeWidth="2" />
        <HazardMark x={286} y={172} label="SCORCH" type="danger" compact />

        {/* Water */}
        <ellipse cx="340" cy="252" rx="30" ry="10" fill="rgba(0,100,200,0.45)" stroke="#0078b4" strokeWidth="1" />
        <HazardMark x={340} y={232} label="WET FLOOR" type="danger" compact />

        {hi('bare-hands') && (
          <g opacity="0.9">
            <path d="M 185 95 Q 200 75 215 95" fill="none" stroke={C.danger} strokeWidth="2" />
            <ShopLabel x={200} y={72} size={7} fill={C.danger}>
              BARE HANDS
            </ShopLabel>
          </g>
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
