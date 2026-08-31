import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';

const hotspots = [
  { id: 'housing', label: 'Filter housing', cx: 200, cy: 130 },
  { id: 'intake', label: 'Intake tube', cx: 80, cy: 130 },
  { id: 'filter', label: 'Filter element', cx: 200, cy: 130, r: 18 },
  { id: 'oil-cap', label: 'Oil cap', cx: 320, cy: 60 },
];

export default function ChangeAirFilterDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="sketch-diagram" aria-label="Engine air filter diagram">
      <rect width="400" height="240" fill="#d4cfc6" rx="8" />
      <rect x="30" y="40" width="340" height="160" rx="6" fill="#888" opacity="0.3" />
      <text x="200" y="30" textAnchor="middle" className="diagram-caption">Under the hood</text>
      <rect x="40" y="110" width="80" height="30" rx="15" fill="#555" />
      <text x="80" y="155" textAnchor="middle" className="diagram-label-sm">Intake tube →</text>
      <rect x="130" y="85" width="140" height="90" rx="8" fill="#ccc" stroke="#888" strokeWidth="2" />
      <rect x="140" y="95" width="120" height="70" rx="4" fill="#f5f0e8" stroke="#b85c38" strokeWidth="2" strokeDasharray="4 2" />
      <text x="200" y="135" textAnchor="middle" className="diagram-label">Air filter</text>
      <text x="200" y="190" textAnchor="middle" className="diagram-label-sm">Housing clips</text>
      <circle cx="320" cy="55" r="18" fill="#ffd700" stroke="#b8860b" strokeWidth="2" />
      <text x="320" y="90" textAnchor="middle" className="diagram-label-sm">Oil cap</text>
      <path d="M 80 125 L 130 125" stroke="#333" strokeWidth="3" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="#333" />
        </marker>
      </defs>
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
