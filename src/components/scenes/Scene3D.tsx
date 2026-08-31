import { Suspense, lazy, useState, useEffect } from 'react';
import type { Scene3DId } from '../../types/sketch';

const BreakerPanelScene = lazy(() => import('./BreakerPanelScene'));
const CarBatteryScene = lazy(() => import('./CarBatteryScene'));
const TireJackScene = lazy(() => import('./TireJackScene'));
const MotorcycleScene = lazy(() => import('./MotorcycleScene'));

interface Props {
  sceneId: Scene3DId;
  focusIds?: string[];
  selectedIds?: string[];
  highlightIds?: string[];
  onHotspotClick?: (id: string) => void;
  interactive?: boolean;
  className?: string;
}

function SceneLoader() {
  return (
    <div className="scene-loader">
      <div className="scene-loader-pulse" />
      <p>Loading shop floor…</p>
    </div>
  );
}

function OfflineFallback({ sceneId }: { sceneId: Scene3DId }) {
  const labels: Record<Scene3DId, string> = {
    'breaker-panel': 'Breaker panel',
    'car-battery': 'Car battery',
    'tire-jack': 'Tire & jack',
    motorcycle: 'Motorcycle',
  };
  return (
    <div className="scene-offline">
      <p>3D view needs a connection. The labeled diagram below shows the same parts.</p>
      <span className="scene-offline-label">{labels[sceneId]}</span>
    </div>
  );
}

export default function Scene3D({
  sceneId,
  focusIds,
  selectedIds,
  highlightIds,
  onHotspotClick,
  interactive,
  className,
}: Props) {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  if (!online) {
    return <OfflineFallback sceneId={sceneId} />;
  }

  const sceneProps = {
    focusIds,
    selectedIds,
    highlightIds,
    onHotspotClick,
    interactive,
  };

  const Scene =
    sceneId === 'breaker-panel'
      ? BreakerPanelScene
      : sceneId === 'car-battery'
        ? CarBatteryScene
        : sceneId === 'tire-jack'
          ? TireJackScene
          : MotorcycleScene;

  return (
    <div className={`scene3d-frame${className ? ` ${className}` : ''}`}>
      <Suspense fallback={<SceneLoader />}>
        <Scene {...sceneProps} />
      </Suspense>
      <p className="scene3d-hint">Drag to orbit · Pinch to zoom · Tap parts</p>
    </div>
  );
}
