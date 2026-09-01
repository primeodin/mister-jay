import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';

const hotspots = [
  { id: 'negative', label: 'Negative (−)', cx: 95, cy: 115 },
  { id: 'positive', label: 'Positive (+)', cx: 305, cy: 115 },
  { id: 'holddown', label: 'Hold-down', cx: 200, cy: 55 },
  { id: 'corrosion', label: 'Corrosion', cx: 305, cy: 145 },
];

export default function ReplaceBatteryDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 260" className="sketch-diagram" aria-label="Car battery diagram">
      <rect width="400" height="260" fill="#1a1814" rx="8" />
      <rect x="60" y="70" width="280" height="120" rx="8" fill="#2a2a2a" stroke="#111" strokeWidth="3" />
      <rect x="75" y="85" width="250" height="90" rx="4" fill="#1a1a1a" />
      <text x="200" y="135" textAnchor="middle" fill="#888" fontSize="11">BATTERY</text>
      <rect x="80" y="50" width="240" height="12" rx="3" fill="#666" />
      <text x="200" y="42" textAnchor="middle" className="diagram-label-sm">Hold-down bracket</text>
      <rect x="75" y="95" width="40" height="24" rx="4" fill="#222" stroke="#000" strokeWidth="2" />
      <circle cx="95" cy="107" r="10" fill="#111" stroke="#333" strokeWidth="2" />
      <text x="95" y="145" textAnchor="middle" className="diagram-label" fill="#333">− BLACK</text>
      <rect x="285" y="95" width="40" height="24" rx="4" fill="#222" stroke="#000" strokeWidth="2" />
      <circle cx="305" cy="107" r="10" fill="#b22222" stroke="#8b0000" strokeWidth="2" />
      <text x="305" y="112" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">+</text>
      <text x="305" y="145" textAnchor="middle" className="diagram-label" fill="#b22222">+ RED</text>
      <circle cx="315" cy="155" r="12" fill="none" stroke="#4a7c59" strokeWidth="2" strokeDasharray="3 2" />
      <text x="340" y="160" className="diagram-label-sm">Corrosion</text>
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
