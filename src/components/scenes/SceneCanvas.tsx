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
  variant?: 'hero' | 'viewport' | 'embedded' | 'learn';
  className?: string;
  floorY?: number;
}

export default function SceneCanvas({
  children,
  cameraPosition = [0, 0.8, 3.8],
  fov = 42,
  variant = 'embedded',
  className,
  floorY = -1.15,
}: Props) {
  const height =
    variant === 'learn'
      ? 'min(72vh, 560px)'
      : variant === 'hero'
        ? 'min(72vh, 520px)'
        : variant === 'viewport'
          ? 'min(58vh, 440px)'
          : '280px';

  return (
    <div
      className={`scene-canvas-wrap scene-canvas-wrap--${variant}${className ? ` ${className}` : ''}`}
      style={{ height }}
    >
      <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={['#0a0908']} />
        <fog attach="fog" args={['#0a0908', 5, 16]} />
        <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} />
        <ambientLight intensity={0.15} color="#5a5040" />
        <spotLight
          position={[2.5, 5.5, 3]}
          angle={0.42}
          penumbra={0.55}
          intensity={3.2}
          color="#ffb347"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0002}
        />
        <spotLight
          position={[-3.5, 4, 2]}
          angle={0.55}
          penumbra={0.9}
          intensity={0.45}
          color="#6a8098"
        />
        <pointLight position={[0, 2, 1]} intensity={0.2} color="#f5c518" distance={6} />
        <Environment preset="warehouse" />
        <ContactShadows
          position={[0, floorY + 0.01, 0]}
          opacity={0.65}
          scale={14}
          blur={2.8}
          far={5}
          color="#000000"
        />
        {children}
        <OrbitControls
          enablePan={false}
          minDistance={2.2}
          maxDistance={variant === 'hero' || variant === 'learn' ? 7.5 : 6}
          maxPolarAngle={Math.PI / 1.75}
          minPolarAngle={Math.PI / 6}
          dampingFactor={0.05}
          enableDamping
        />
      </Canvas>
      <div className="scene-vignette" aria-hidden="true" />
    </div>
  );
}

/** Shared floor + optional oil stain */
export function GarageFloor({
  y = -1.15,
  puddle,
}: {
  y?: number;
  puddle?: [number, number, number];
}) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#2a2824" roughness={0.94} metalness={0.02} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y + 0.005, 0]} receiveShadow>
        <planeGeometry args={[16, 16, 8, 8]} />
        <meshStandardMaterial color="#32302c" roughness={0.98} wireframe transparent opacity={0.04} />
      </mesh>
      {puddle && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[puddle[0], y + 0.012, puddle[2]]}>
          <circleGeometry args={[puddle[1], 40]} />
          <meshStandardMaterial
            color="#1a3040"
            roughness={0.08}
            metalness={0.55}
            transparent
            opacity={0.55}
          />
        </mesh>
      )}
    </group>
  );
}

/** Corner screw on metal panels */
export function Screw({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.018, 0.018, 0.008, 8]} />
      <meshStandardMaterial color="#8a9098" metalness={0.85} roughness={0.35} />
    </mesh>
  );
}
