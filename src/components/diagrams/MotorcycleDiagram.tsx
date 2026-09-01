import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';

const hotspots = [
  { id: 'slope', label: 'Downhill slope', cx: 200, cy: 240 },
  { id: 'sandals', label: 'Sandals', cx: 80, cy: 230 },
  { id: 'boots', label: 'Sturdy boots', cx: 320, cy: 230 },
  { id: 'sidestand', label: 'Sidestand', cx: 140, cy: 200 },
  { id: 'handlebars', label: 'Handlebars', cx: 280, cy: 80 },
];

export default function MotorcycleDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 260" className="sketch-diagram" aria-label="Motorcycle diagram">
      <rect width="400" height="260" fill="#141210" rx="8" />
      <line x1="0" y1="200" x2="400" y2="180" stroke="#8a8278" strokeWidth="2" />
      <text x="350" y="175" className="diagram-label-sm">Slope ↘</text>
      <circle cx="120" cy="185" r="35" fill="#222" stroke="#444" strokeWidth="3" />
      <circle cx="280" cy="175" r="35" fill="#222" stroke="#444" strokeWidth="3" />
      <line x1="120" y1="185" x2="200" y2="120" stroke="#555" strokeWidth="6" />
      <line x1="200" y1="120" x2="280" y2="175" stroke="#555" strokeWidth="6" />
      <line x1="200" y1="120" x2="240" y2="70" stroke="#555" strokeWidth="4" />
      <line x1="240" y1="70" x2="280" y2="80" stroke="#555" strokeWidth="3" />
      <line x1="130" y1="195" x2="140" y2="220" stroke="#888" strokeWidth="3" />
      <text x="130" y="240" className="diagram-label-sm">Sidestand</text>
      <text x="260" y="65" className="diagram-label-sm">Bars</text>
      <text x="80" y="250" className="diagram-label-sm">👡 Sandals</text>
      <text x="320" y="250" className="diagram-label-sm">🥾 Boots</text>
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
