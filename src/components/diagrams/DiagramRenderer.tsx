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
  variant?: 'hero' | 'viewport' | 'embedded';
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

  return (
    <div className={`diagram-frame diagram-frame--${variant}${className ? ` ${className}` : ''}`}>
      <Diagram
        focusIds={focusIds}
        selectedIds={selectedIds}
        highlightIds={highlightIds}
        onHotspotClick={onHotspotClick}
        interactive={interactive}
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
}: {
  hotspots: DiagramHotspot[];
  selectedIds?: string[];
  highlightIds?: string[];
  onHotspotClick?: (id: string) => void;
  interactive?: boolean;
}) {
  return (
    <g className="hotspot-layer">
      {hotspots.map((h) => {
        const selected = selectedIds.includes(h.id);
        const highlighted = highlightIds.includes(h.id);
        const r = h.r ?? 22;
        return (
          <g key={h.id}>
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
            <text
              x={h.cx}
              y={h.cy + r + 14}
              textAnchor="middle"
              className="hotspot-label"
            >
              {h.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}
