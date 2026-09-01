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
  /** Tap target radius (default 12) */
  r?: number;
  /** Label anchor X (leader endpoint) */
  lx?: number;
  /** Label anchor Y (leader endpoint) */
  ly?: number;
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

function labelAnchor(h: DiagramHotspot): { lx: number; ly: number } {
  if (h.lx != null && h.ly != null) return { lx: h.lx, ly: h.ly };
  const r = h.r ?? 12;
  return { lx: h.cx + r + 6, ly: h.cy - 4 };
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
        const active = selected || highlighted;
        const hitR = h.r ?? 12;
        const dotR = 4;
        const { lx, ly } = labelAnchor(h);
        const showLeader = (interactive && active) || (showCallouts && highlighted && !interactive);
        const showIdleRing = interactive && !active;

        return (
          <g key={h.id}>
            {showLeader && (
              <g className="hotspot-leader">
                <line x1={h.cx} y1={h.cy} x2={lx} y2={ly} className="hotspot-leader-line" />
                <text x={lx + 4} y={ly + 3} className="hotspot-leader-label">
                  {h.label}
                </text>
              </g>
            )}

            {showCallouts && highlighted && !interactive && (
              <g className="diagram-callout">
                <line x1={h.cx} y1={h.cy} x2={lx} y2={ly} stroke="#f5c518" strokeWidth="1" />
                <rect
                  x={lx - 44}
                  y={ly - 10}
                  width="88"
                  height="13"
                  rx="2"
                  fill="rgba(10, 9, 8, 0.9)"
                  stroke="#f5c518"
                  strokeWidth="0.75"
                />
                <text x={lx} y={ly} textAnchor="middle" className="diagram-callout-label">
                  {h.label}
                </text>
              </g>
            )}

            {active && (
              <circle
                cx={h.cx}
                cy={h.cy}
                r={dotR + 5}
                className={`hotspot-pulse${selected ? ' hotspot-pulse--selected' : ''}`}
              />
            )}

            {showIdleRing && (
              <circle cx={h.cx} cy={h.cy} r={dotR + 2} className="hotspot hotspot--idle" />
            )}

            {active && (
              <circle
                cx={h.cx}
                cy={h.cy}
                r={dotR}
                className={`hotspot-dot${selected ? ' hotspot-dot--selected' : ''}${highlighted ? ' hotspot-dot--highlight' : ''}`}
              />
            )}

            {interactive && (
              <circle
                cx={h.cx}
                cy={h.cy}
                r={hitR}
                className="hotspot-hit"
                onClick={onHotspotClick ? () => onHotspotClick(h.id) : undefined}
                role="button"
                tabIndex={0}
                onKeyDown={
                  onHotspotClick
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onHotspotClick(h.id);
                        }
                      }
                    : undefined
                }
              />
            )}
          </g>
        );
      })}
    </g>
  );
}
