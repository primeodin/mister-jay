import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';

const hotspots = [
  { id: 'main', label: 'Main breaker', cx: 200, cy: 55 },
  { id: 'kitchen', label: 'Kitchen 20A', cx: 120, cy: 130 },
  { id: 'bedroom', label: 'Bedroom 15A', cx: 200, cy: 130 },
  { id: 'dryer', label: 'Dryer 30A', cx: 280, cy: 130 },
  { id: 'rust', label: 'Rust / corrosion', cx: 60, cy: 200 },
  { id: 'scorch', label: 'Scorch marks', cx: 280, cy: 200 },
  { id: 'unlabeled', label: 'Unlabeled', cx: 200, cy: 200 },
  { id: 'water', label: 'Water on floor', cx: 340, cy: 240 },
];

export default function BreakerPanelDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
}: DiagramProps) {
  const breakers = [
    { x: 100, y: 110, label: 'KIT', tripped: false },
    { x: 160, y: 110, label: '???', tripped: false },
    { x: 220, y: 110, label: 'BED', tripped: false },
    { x: 280, y: 110, label: 'DRY', tripped: false },
    { x: 100, y: 160, label: 'LR', tripped: false },
    { x: 160, y: 160, label: '???', tripped: true },
    { x: 220, y: 160, label: 'GAR', tripped: false },
    { x: 280, y: 160, label: 'AC', tripped: false },
  ];

  return (
    <svg viewBox="0 0 400 280" className="sketch-diagram" aria-label="Breaker panel diagram">
      <rect width="400" height="280" fill="#141210" rx="8" />
      <rect x="50" y="30" width="300" height="220" rx="4" fill="#c0b8a8" stroke="#666" strokeWidth="3" />
      <rect x="60" y="40" width="280" height="200" rx="2" fill="#2a2a2a" />
      <rect x="130" y="48" width="140" height="22" rx="2" fill="#444" stroke="#888" strokeWidth="1" />
      <rect x="155" y="52" width="90" height="14" rx="1" fill="#666" />
      <text x="200" y="38" textAnchor="middle" className="diagram-label-sm" fill="#f5f0e8">MAIN 100A</text>
      {breakers.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width="36" height="40" rx="2" fill="#333" stroke="#555" />
          <rect
            x={b.x + 14}
            y={b.tripped ? b.y + 18 : b.y + 8}
            width="8"
            height="16"
            rx="1"
            fill={b.tripped ? '#d4a017' : '#ccc'}
          />
          <text x={b.x + 18} y={b.y + 52} textAnchor="middle" className="diagram-label-sm" fill="#aaa" fontSize="8">
            {b.label}
          </text>
        </g>
      ))}
      <ellipse cx="55" cy="205" rx="12" ry="8" fill="#8b4513" opacity="0.7" />
      <text x="55" y="225" textAnchor="middle" className="diagram-label-sm" fill="#f5f0e8">Rust</text>
      <rect x="265" y="195" width="30" height="15" rx="2" fill="#333" stroke="#b22222" strokeWidth="2" />
      <text x="280" y="225" textAnchor="middle" className="diagram-label-sm" fill="#f5f0e8">Scorch</text>
      <ellipse cx="340" cy="250" rx="25" ry="8" fill="rgba(0,100,200,0.4)" />
      <HotspotOverlay
        hotspots={hotspots}
        selectedIds={selectedIds}
        highlightIds={highlightIds}
        onHotspotClick={onHotspotClick}
        interactive={interactive}
      />
    </svg>
  );
}
