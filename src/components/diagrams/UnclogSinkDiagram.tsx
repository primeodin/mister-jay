import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';

const hotspots = [
  { id: 'no-bucket', label: 'No bucket', cx: 200, cy: 230 },
  { id: 'overtight', label: 'Over-tightened', cx: 140, cy: 200 },
  { id: 'bucket-ready', label: 'Bucket ready', cx: 80, cy: 230 },
  { id: 'plunger', label: 'Plunger first', cx: 320, cy: 100 },
];

export default function UnclogSinkDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 280" className="sketch-diagram" aria-label="Sink unclog diagram">
      <rect width="400" height="280" fill="#e0d8cc" rx="8" />
      <rect x="100" y="40" width="200" height="60" rx="4" fill="#ccc" stroke="#999" strokeWidth="2" />
      <rect x="180" y="100" width="40" height="30" fill="#888" />
      <path d="M 200 130 Q 170 170 200 210 Q 230 170 200 130" fill="none" stroke="#666" strokeWidth="8" />
      <text x="250" y="180" className="diagram-label-sm">P-trap</text>
      <rect x="60" y="215" width="50" height="35" rx="3" fill="#b85c38" opacity="0.7" />
      <text x="85" y="260" textAnchor="middle" className="diagram-label-sm">Bucket ✓</text>
      <ellipse cx="200" cy="250" rx="40" ry="10" fill="rgba(139,69,19,0.3)" stroke="#8b4513" strokeDasharray="4 2" />
      <text x="200" y="275" textAnchor="middle" className="diagram-label-sm" fill="#b22222">No bucket ✕</text>
      <rect x="300" y="70" width="40" height="50" rx="20" fill="#333" />
      <line x1="320" y1="120" x2="320" y2="140" stroke="#8b4513" strokeWidth="4" />
      <text x="320" y="60" textAnchor="middle" className="diagram-label-sm">Plunger</text>
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
