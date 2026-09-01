import { lazy, Suspense } from 'react';
import type { Sketch } from '../types/sketch';
import type { SceneCallout } from './scenes/sceneAnnotations';
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
  variant?: 'hero' | 'viewport' | 'embedded' | 'learn';
  callouts?: SceneCallout[];
}

export default function SketchVisual({
  sketch,
  focusIds,
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  prefer3d = true,
  variant = 'embedded',
  callouts,
}: Props) {
  const show3d = prefer3d && sketch.scene3d;

  return (
    <div className={`sketch-visual sketch-visual--${variant}`}>
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
              variant={variant}
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
            variant={variant}
            callouts={callouts}
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
          variant={variant}
        />
      )}
    </div>
  );
}
