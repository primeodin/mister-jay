import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';

const hotspots = [
  { id: 'ground', label: 'Engine ground', cx: 200, cy: 180 },
  { id: 'dead-neg', label: 'Dead − post', cx: 100, cy: 120 },
  { id: 'donor-pos', label: 'Donor + post', cx: 300, cy: 120 },
  { id: 'red-dead', label: 'Red on dead +', cx: 100, cy: 90 },
  { id: 'touching', label: 'Clamps touching', cx: 200, cy: 60 },
];

export default function JumpStartDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 260" className="sketch-diagram" aria-label="Jump start diagram">
      <rect width="400" height="260" fill="#1a1814" rx="8" />
      <rect x="40" y="100" width="120" height="80" rx="6" fill="#555" />
      <text x="100" y="200" textAnchor="middle" className="diagram-label-sm">Dead car</text>
      <rect x="60" y="115" width="80" height="50" rx="4" fill="#222" />
      <circle cx="80" cy="130" r="8" fill="#111" stroke="#333" strokeWidth="2" />
      <circle cx="120" cy="130" r="8" fill="#b22222" />
      <text x="80" y="150" className="diagram-label-sm" fill="#ccc">−</text>
      <text x="120" y="150" className="diagram-label-sm" fill="#b22222">+</text>
      <rect x="240" y="100" width="120" height="80" rx="6" fill="#555" />
      <text x="300" y="200" textAnchor="middle" className="diagram-label-sm">Donor car</text>
      <rect x="260" y="115" width="80" height="50" rx="4" fill="#222" />
      <circle cx="280" cy="130" r="8" fill="#111" />
      <circle cx="320" cy="130" r="8" fill="#b22222" />
      <path d="M 128 125 Q 180 80 272 125" stroke="#b22222" strokeWidth="3" fill="none" />
      <path d="M 88 135 Q 150 200 200 175" stroke="#111" strokeWidth="3" fill="none" />
      <text x="200" y="195" textAnchor="middle" className="diagram-label-sm">Ground on engine block</text>
      <line x1="185" y1="55" x2="215" y2="55" stroke="#b22222" strokeWidth="4" />
      <line x1="185" y1="62" x2="215" y2="62" stroke="#111" strokeWidth="4" />
      <text x="200" y="45" textAnchor="middle" className="diagram-label-sm" fill="#b22222">Clamps touching ✕</text>
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
