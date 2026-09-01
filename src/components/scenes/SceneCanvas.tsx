import { Canvas } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  variant?: 'hero' | 'viewport' | 'embedded';
  className?: string;
}

export default function SceneCanvas({
  children,
  cameraPosition = [0, 0.8, 3.8],
  fov = 42,
  variant = 'embedded',
  className,
}: Props) {
  const height =
    variant === 'hero' ? 'min(72vh, 520px)' : variant === 'viewport' ? 'min(58vh, 440px)' : '280px';

  return (
    <div
      className={`scene-canvas-wrap scene-canvas-wrap--${variant}${className ? ` ${className}` : ''}`}
      style={{ height }}
    >
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={['#0a0908']} />
        <fog attach="fog" args={['#0a0908', 4, 14]} />
        <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} />
        <ambientLight intensity={0.12} color="#4a4030" />
        <spotLight
          position={[2.5, 5, 3]}
          angle={0.45}
          penumbra={0.6}
          intensity={2.8}
          color="#ffb347"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight
          position={[-3, 3, 1]}
          angle={0.5}
          penumbra={1}
          intensity={0.6}
          color="#8090a0"
        />
        <Environment preset="warehouse" />
        <ContactShadows
          position={[0, -1.15, 0]}
          opacity={0.55}
          scale={12}
          blur={2.5}
          far={4}
          color="#000000"
        />
        {children}
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={variant === 'hero' ? 7 : 6}
          maxPolarAngle={Math.PI / 1.85}
          dampingFactor={0.06}
          enableDamping
        />
      </Canvas>
      <div className="scene-vignette" aria-hidden="true" />
    </div>
  );
}
