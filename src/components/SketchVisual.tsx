import type { Sketch } from '../types/sketch';
import { DiagramRenderer } from './diagrams/DiagramRenderer';

interface Props {
  sketch: Sketch;
  focusIds?: string[];
  selectedIds?: string[];
  highlightIds?: string[];
  onHotspotClick?: (id: string) => void;
  interactive?: boolean;
  variant?: 'hero' | 'viewport' | 'embedded' | 'learn';
}

export default function SketchVisual({
  sketch,
  focusIds,
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  variant = 'embedded',
}: Props) {
  const mergedHighlights = [
    ...new Set([...(highlightIds ?? []), ...(focusIds ?? [])]),
  ];

  return (
    <div className={`sketch-visual sketch-visual--${variant}`}>
      <DiagramRenderer
        diagramId={sketch.diagramId}
        focusIds={focusIds}
        selectedIds={selectedIds}
        highlightIds={mergedHighlights}
        onHotspotClick={onHotspotClick}
        interactive={interactive}
        variant={variant}
      />
    </div>
  );
}
