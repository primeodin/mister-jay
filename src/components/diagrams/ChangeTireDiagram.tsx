import type { DiagramProps } from './DiagramRenderer';
import { HotspotOverlay } from './DiagramRenderer';

const hotspots = [
  { id: 'jack', label: 'Jack', cx: 120, cy: 200 },
  { id: 'lug-wrench', label: 'Lug wrench', cx: 280, cy: 210 },
  { id: 'spare', label: 'Spare tire', cx: 340, cy: 120 },
  { id: 'jack-point', label: 'Jack point', cx: 180, cy: 140 },
  { id: 'lug-nuts', label: 'Lug nuts', cx: 95, cy: 95 },
  { id: 'block-wheel', label: 'Block wheel', cx: 300, cy: 280 },
];

export default function ChangeTireDiagram({
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
}: DiagramProps) {
  return (
    <svg viewBox="0 0 400 320" className="sketch-diagram" aria-label="Tire change diagram">
      <defs>
        <linearGradient id="concrete" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8bfb0" />
          <stop offset="100%" stopColor="#a89d8c" />
        </linearGradient>
      </defs>
      <rect width="400" height="320" fill="url(#concrete)" rx="8" />
      <rect x="40" y="60" width="220" height="80" rx="6" fill="#5a5f68" />
      <text x="150" y="105" textAnchor="middle" className="diagram-caption">Car body / frame rail</text>
      <circle cx="100" cy="200" r="48" fill="#1a1a1a" stroke="#444" strokeWidth="4" />
      <circle cx="100" cy="200" r="28" fill="#666" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <circle
          key={deg}
          cx={100 + 38 * Math.cos((deg * Math.PI) / 180)}
          cy={200 + 38 * Math.sin((deg * Math.PI) / 180)}
          r="5"
          fill="#c0c0c0"
        />
      ))}
      <text x="100" y="265" textAnchor="middle" className="diagram-label">Flat tire</text>
      <polygon points="160,180 175,240 145,240" fill="#d4a017" stroke="#8b6914" strokeWidth="2" />
      <text x="162" y="258" textAnchor="middle" className="diagram-label-sm">Jack</text>
      <rect x="250" y="90" width="90" height="90" rx="45" fill="#1a1a1a" stroke="#444" strokeWidth="3" />
      <text x="295" y="195" textAnchor="middle" className="diagram-label-sm">Spare</text>
      <rect x="260" y="205" width="60" height="8" rx="2" fill="#555" transform="rotate(-15 290 209)" />
      <text x="290" y="230" textAnchor="middle" className="diagram-label-sm">Lug wrench</text>
      <rect x="270" y="270" width="40" height="20" rx="3" fill="#8b4513" />
      <text x="290" y="305" textAnchor="middle" className="diagram-label-sm">Wheel chock</text>
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
