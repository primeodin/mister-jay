import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';
import { C, DiagramBg, ShopLabel, TitleStamp, HazardMark } from './diagramCraft';

const hotspots = [
  { id: 'main', label: 'Main breaker', cx: 200, cy: 62 },
  { id: 'kitchen', label: 'Kitchen 20A', cx: 115, cy: 128 },
  { id: 'bedroom', label: 'Bedroom 15A', cx: 200, cy: 128 },
  { id: 'dryer', label: 'Dryer 30A', cx: 285, cy: 128 },
  { id: 'rust', label: 'Rust', cx: 58, cy: 195 },
  { id: 'scorch', label: 'Scorch', cx: 285, cy: 195 },
  { id: 'unlabeled', label: 'Unlabeled', cx: 158, cy: 178 },
  { id: 'water', label: 'Water on floor', cx: 340, cy: 248 },
  { id: 'bare-hands', label: 'Bare hands', cx: 200, cy: 100 },
  { id: 'labels', label: 'Circuit labels', cx: 115, cy: 155 },
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
    <svg viewBox="0 0 400 300" className="sketch-diagram" aria-label="Breaker panel cutaway">
      <DiagramBg h={300}>
        <TitleStamp x={200} y={22}>
          LOAD CENTER — READ FIRST
        </TitleStamp>

        {/* Panel enclosure */}
        <rect x="55" y="38" width="290" height="210" rx="3" fill="#c8bfb0" stroke="#666" strokeWidth="2" />
        <rect x="65" y="48" width="270" height="190" rx="2" fill="#1e1e1e" stroke="#444" strokeWidth="1" />

        {/* Main breaker */}
        <rect x="155" y="54" width="90" height="24" rx="2" fill="#444" stroke="#888" strokeWidth="1" />
        <rect x="195" y="58" width="10" height="16" rx="1" fill="#ccc" />
        <ShopLabel x={200} y={50} size={8} fill={C.caution}>
          MAIN 100A
        </ShopLabel>

        {/* Branch breakers */}
        {breakers.map((b) => (
          <g key={b.label}>
            <rect x={b.x} y={b.y} width="38" height="42" rx="2" fill="#333" stroke="#555" strokeWidth="1" />
            <rect
              x={b.x + 14}
              y={b.tripped ? b.y + 20 : b.y + 10}
              width="10"
              height="14"
              rx="1"
              fill={b.tripped ? C.caution : '#ccc'}
            />
            <ShopLabel x={b.x + 19} y={b.y + 52} size={7}>
              {b.label}
            </ShopLabel>
          </g>
        ))}

        {/* Directory sticker */}
        <rect x="75" y="215" width="80" height="18" rx="1" fill="#f5f0e8" opacity="0.15" stroke="#888" strokeDasharray="2 2" />
        <ShopLabel x={115} y={227} size={6}>
          DIRECTORY
        </ShopLabel>

        {/* Rust */}
        <ellipse cx="58" cy="198" rx="14" ry="9" fill="#6b4423" opacity="0.8" />
        <HazardMark x={58} y={185} label="CORROSION" type="caution" />

        {/* Scorch */}
        <rect x="270" y="188" width="32" height="14" rx="2" fill="#222" stroke={C.danger} strokeWidth="2" />
        <HazardMark x={286} y={175} label="SCORCH" type="danger" />

        {/* Water */}
        <ellipse cx="340" cy="252" rx="30" ry="10" fill="rgba(0,100,200,0.45)" stroke="#0078b4" strokeWidth="1" />
        <HazardMark x={340} y={235} label="WET FLOOR" type="danger" />

        {/* Bare hands reaching */}
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
