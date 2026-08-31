import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';

const hotspots = [
  { id: 'supply', label: 'Supply valves', cx: 80, cy: 200 },
  { id: 'handle', label: 'Faucet handle', cx: 200, cy: 80 },
  { id: 'aerator', label: 'Aerator', cx: 200, cy: 110 },
  { id: 'p-trap', label: 'P-trap', cx: 200, cy: 220 },
];

export default function StopFaucetDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 280" className="sketch-diagram" aria-label="Faucet repair diagram">
      <rect width="400" height="280" fill="#e0d8cc" rx="8" />
      <rect x="80" y="30" width="240" height="20" fill="#ccc" />
      <rect x="170" y="50" width="60" height="50" rx="4" fill="#aaa" stroke="#888" strokeWidth="2" />
      <circle cx="200" cy="60" r="12" fill="#888" />
      <path d="M 200 100 L 200 130" stroke="#888" strokeWidth="8" />
      <ellipse cx="200" cy="140" rx="8" ry="4" fill="#0078b4" opacity="0.6" />
      <text x="220" y="145" className="diagram-label-sm">Drip</text>
      <rect x="60" y="160" width="280" height="80" rx="4" fill="#f5f0e8" stroke="#ccc" />
      <circle cx="80" cy="200" r="10" fill="#666" stroke="#333" strokeWidth="2" />
      <circle cx="320" cy="200" r="10" fill="#666" stroke="#333" strokeWidth="2" />
      <text x="80" y="235" textAnchor="middle" className="diagram-label-sm">Hot shutoff</text>
      <text x="320" y="235" textAnchor="middle" className="diagram-label-sm">Cold shutoff</text>
      <path d="M 200 170 Q 180 210 200 230 Q 220 210 200 170" fill="none" stroke="#888" strokeWidth="6" />
      <text x="250" y="220" className="diagram-label-sm">P-trap</text>
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
