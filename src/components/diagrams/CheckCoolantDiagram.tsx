import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';

const hotspots = [
  { id: 'reservoir', label: 'Overflow reservoir', cx: 120, cy: 140 },
  { id: 'min', label: 'MIN mark', cx: 95, cy: 175 },
  { id: 'max', label: 'MAX mark', cx: 95, cy: 105 },
  { id: 'radiator', label: 'Radiator cap', cx: 300, cy: 80 },
  { id: 'oil-dipstick', label: 'Oil dipstick', cx: 320, cy: 200 },
];

export default function CheckCoolantDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 260" className="sketch-diagram" aria-label="Coolant check diagram">
      <rect width="400" height="260" fill="#d8d0c4" rx="8" />
      <rect x="60" y="70" width="120" height="140" rx="6" fill="rgba(0,120,180,0.15)" stroke="#0078b4" strokeWidth="2" />
      <text x="120" y="225" textAnchor="middle" className="diagram-label">Overflow reservoir</text>
      <line x1="75" y1="110" x2="115" y2="110" stroke="#b22222" strokeWidth="2" />
      <text x="55" y="114" className="diagram-label-sm">MAX</text>
      <line x1="75" y1="180" x2="115" y2="180" stroke="#b22222" strokeWidth="2" />
      <text x="55" y="184" className="diagram-label-sm">MIN</text>
      <rect x="85" y="120" width="70" height="50" rx="3" fill="rgba(0,120,180,0.4)" />
      <rect x="240" y="50" width="100" height="120" rx="4" fill="#ccc" stroke="#888" strokeWidth="2" />
      <text x="290" y="190" textAnchor="middle" className="diagram-label-sm">Radiator</text>
      <circle cx="290" cy="65" r="14" fill="#333" stroke="#111" strokeWidth="2" />
      <text x="290" y="40" textAnchor="middle" className="diagram-label-sm" fill="#b22222">HOT — don&apos;t open</text>
      <line x1="310" y1="200" x2="330" y2="200" stroke="#ffd700" strokeWidth="4" />
      <text x="340" y="204" className="diagram-label-sm">Dipstick</text>
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
