import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';

const hotspots = [
  { id: 'tripped', label: 'Tripped breaker', cx: 160, cy: 140 },
  { id: 'face-panel', label: 'Standing in front', cx: 200, cy: 240 },
  { id: 'wet-hands', label: 'Wet hands', cx: 320, cy: 140 },
  { id: 'side-stance', label: 'Side stance', cx: 80, cy: 240 },
];

export default function ResetBreakerDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 260" className="sketch-diagram" aria-label="Reset breaker diagram">
      <rect width="400" height="260" fill="#141210" rx="8" />
      <rect x="100" y="40" width="200" height="160" rx="4" fill="#2a2a2a" stroke="#666" strokeWidth="2" />
      <rect x="120" y="60" width="50" height="35" rx="2" fill="#333" />
      <rect x="128" y="78" width="8" height="12" rx="1" fill="#d4a017" />
      <text x="145" y="105" textAnchor="middle" className="diagram-label-sm" fill="#d4a017">TRIPPED</text>
      <rect x="190" y="60" width="50" height="35" rx="2" fill="#333" />
      <rect x="198" y="68" width="8" height="12" rx="1" fill="#ccc" />
      <text x="215" y="105" textAnchor="middle" className="diagram-label-sm" fill="#4a7c59">ON</text>
      <path d="M 200 220 L 200 200" stroke="#b85c38" strokeWidth="2" markerEnd="url(#arr)" />
      <text x="200" y="235" textAnchor="middle" className="diagram-label-sm">Stand to the side</text>
      <circle cx="320" cy="130" r="20" fill="rgba(0,100,200,0.3)" stroke="#0078b4" />
      <text x="320" y="165" textAnchor="middle" className="diagram-label-sm">Wet hands</text>
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <circle cx="3" cy="3" r="2" fill="#b85c38" />
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
