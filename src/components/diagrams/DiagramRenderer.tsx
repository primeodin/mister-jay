import type { ReactNode } from 'react';
import type { DiagramId } from '../../types/sketch';
import ChangeTireDiagram from './ChangeTireDiagram';
import ReplaceBatteryDiagram from './ReplaceBatteryDiagram';
import ChangeAirFilterDiagram from './ChangeAirFilterDiagram';
import CheckCoolantDiagram from './CheckCoolantDiagram';
import BreakerPanelDiagram from './BreakerPanelDiagram';
import ResetBreakerDiagram from './ResetBreakerDiagram';
import StopFaucetDiagram from './StopFaucetDiagram';
import UnclogSinkDiagram from './UnclogSinkDiagram';
import MotorcycleDiagram from './MotorcycleDiagram';
import JumpStartDiagram from './JumpStartDiagram';

export interface DiagramHotspot {
  id: string;
  label: string;
  cx: number;
  cy: number;
  r?: number;
}

interface Props {
  diagramId: DiagramId;
  focusIds?: string[];
  selectedIds?: string[];
  highlightIds?: string[];
  onHotspotClick?: (id: string) => void;
  interactive?: boolean;
  variant?: 'hero' | 'viewport' | 'embedded' | 'learn';
  className?: string;
}

const diagrams: Record<DiagramId, (props: DiagramProps) => ReactNode> = {
  'change-tire': ChangeTireDiagram,
  'replace-battery': ReplaceBatteryDiagram,
  'change-air-filter': ChangeAirFilterDiagram,
  'check-coolant': CheckCoolantDiagram,
  'read-breaker-panel': BreakerPanelDiagram,
  'reset-breaker': ResetBreakerDiagram,
  'stop-faucet': StopFaucetDiagram,
  'unclog-sink': UnclogSinkDiagram,
  'move-motorcycle': MotorcycleDiagram,
  'jump-start': JumpStartDiagram,
};

export interface DiagramProps {
  focusIds?: string[];
  selectedIds?: string[];
  highlightIds?: string[];
  onHotspotClick?: (id: string) => void;
  interactive?: boolean;
  showCallouts?: boolean;
}

export function DiagramRenderer({
  diagramId,
  focusIds,
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  className,
  variant = 'embedded',
}: Props) {
  const Diagram = diagrams[diagramId];
  if (!Diagram) return null;

  const mergedHighlights = [
    ...new Set([...(highlightIds ?? []), ...(focusIds ?? [])]),
  ];

  return (
    <div className={`diagram-frame diagram-frame--${variant}${className ? ` ${className}` : ''}`}>
      <Diagram
        focusIds={focusIds}
        selectedIds={selectedIds}
        highlightIds={mergedHighlights}
        onHotspotClick={onHotspotClick}
        interactive={interactive}
        showCallouts={variant === 'learn'}
      />
    </div>
  );
}

export function HotspotOverlay({
  hotspots,
  selectedIds = [],
  highlightIds = [],
  onHotspotClick,
  interactive,
  showCallouts = false,
}: {
  hotspots: DiagramHotspot[];
  selectedIds?: string[];
  highlightIds?: string[];
  onHotspotClick?: (id: string) => void;
  interactive?: boolean;
  showCallouts?: boolean;
}) {
  return (
    <g className="hotspot-layer">
      {hotspots.map((h) => {
        const selected = selectedIds.includes(h.id);
        const highlighted = highlightIds.includes(h.id);
        const r = h.r ?? 22;
        const showLeader = showCallouts && highlighted && !interactive;
        const labelY = h.cy - r - 18;
        return (
          <g key={h.id}>
            {showLeader && (
              <g className="diagram-callout">
                <line
                  x1={h.cx}
                  y1={h.cy - r}
                  x2={h.cx}
                  y2={labelY + 10}
                  stroke="#f5c518"
                  strokeWidth="1.5"
                />
                <rect
                  x={h.cx - 48}
                  y={labelY - 4}
                  width="96"
                  height="14"
                  rx="2"
                  fill="rgba(10, 9, 8, 0.88)"
                  stroke="#f5c518"
                  strokeWidth="1"
                />
                <text
                  x={h.cx}
                  y={labelY + 6}
                  textAnchor="middle"
                  className="diagram-callout-label"
                >
                  {h.label}
                </text>
              </g>
            )}
            {(selected || highlighted) && (
              <circle
                cx={h.cx}
                cy={h.cy}
                r={r + 8}
                className={`hotspot-pulse${selected ? ' hotspot-pulse--selected' : ''}`}
              />
            )}
            <circle
              cx={h.cx}
              cy={h.cy}
              r={r}
              className={`hotspot${selected ? ' hotspot--selected' : ''}${highlighted ? ' hotspot--highlight' : ''}${interactive ? ' hotspot--interactive' : ''}`}
              onClick={interactive && onHotspotClick ? () => onHotspotClick(h.id) : undefined}
              role={interactive ? 'button' : undefined}
              tabIndex={interactive ? 0 : undefined}
              onKeyDown={
                interactive && onHotspotClick
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onHotspotClick(h.id);
                      }
                    }
                  : undefined
              }
            />
            {interactive && (
              <text
                x={h.cx}
                y={h.cy + r + 14}
                textAnchor="middle"
                className="hotspot-label"
              >
                {h.label}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
