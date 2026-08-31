import { lazy, Suspense } from 'react';
import type { Sketch } from '../types/sketch';
import { DiagramRenderer } from './diagrams/DiagramRenderer';

const Scene3D = lazy(() => import('./scenes/Scene3D'));

interface Props {
  sketch: Sketch;
  focusIds?: string[];
  selectedIds?: string[];
  highlightIds?: string[];
  onHotspotClick?: (id: string) => void;
  interactive?: boolean;
  prefer3d?: boolean;
}

export default function SketchVisual({
  sketch,
  focusIds,
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  prefer3d = true,
}: Props) {
  const show3d = prefer3d && sketch.scene3d;

  return (
    <div className="sketch-visual">
      {show3d ? (
        <Suspense
          fallback={
            <DiagramRenderer
              diagramId={sketch.diagramId}
              focusIds={focusIds}
              selectedIds={selectedIds}
              highlightIds={highlightIds}
              onHotspotClick={onHotspotClick}
              interactive={interactive}
            />
          }
        >
          <Scene3D
            sceneId={sketch.scene3d!}
            focusIds={focusIds}
            selectedIds={selectedIds}
            highlightIds={highlightIds}
            onHotspotClick={onHotspotClick}
            interactive={interactive}
          />
        </Suspense>
      ) : (
        <DiagramRenderer
          diagramId={sketch.diagramId}
          focusIds={focusIds}
          selectedIds={selectedIds}
          highlightIds={highlightIds}
          onHotspotClick={onHotspotClick}
          interactive={interactive}
        />
      )}
      <div className="sketch-visual-tabs">
        {sketch.scene3d && (
          <span className="sketch-visual-badge">
            {show3d ? '3D shop view' : '2D diagram'}
          </span>
        )}
      </div>
    </div>
  );
}
