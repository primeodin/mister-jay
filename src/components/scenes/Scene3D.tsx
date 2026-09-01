import { Suspense, lazy, useState, useEffect } from 'react';
import type { Scene3DId } from '../../types/sketch';
import type { SceneProps } from './sceneTypes';

const BreakerPanelScene = lazy(() => import('./BreakerPanelScene'));
const CarBatteryScene = lazy(() => import('./CarBatteryScene'));
const TireJackScene = lazy(() => import('./TireJackScene'));
const MotorcycleScene = lazy(() => import('./MotorcycleScene'));

interface Props extends SceneProps {
  sceneId: Scene3DId;
  className?: string;
}

function SceneLoader() {
  return (
    <div className="scene-loader">
      <div className="scene-loader-beam" />
      <p className="stamp">LOADING SHOP FLOOR</p>
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
      <p>Offline — illustrated cutaway below.</p>
      <span className="stamp">{labels[sceneId]}</span>
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
  variant = 'embedded',
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

  const sceneProps: SceneProps = {
    focusIds,
    selectedIds,
    highlightIds,
    onHotspotClick,
    interactive,
    variant,
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
    <div className={`scene3d-root${className ? ` ${className}` : ''}`}>
      <Suspense fallback={<SceneLoader />}>
        <Scene {...sceneProps} />
      </Suspense>
    </div>
  );
}
