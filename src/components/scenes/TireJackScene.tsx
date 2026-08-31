import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';

interface SceneProps {
  selectedIds?: string[];
  highlightIds?: string[];
  onHotspotClick?: (id: string) => void;
  interactive?: boolean;
}

export default function TireJackScene({
  selectedIds = [],
  highlightIds = [],
  onHotspotClick,
  interactive,
}: SceneProps) {
  const tap = (id: string) =>
    interactive && onHotspotClick
      ? (e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onHotspotClick(id);
        }
      : undefined;

  const sel = (id: string) => selectedIds.includes(id) || highlightIds.includes(id);

  return (
    <Canvas camera={{ position: [2.5, 1.5, 3], fov: 45 }} className="scene-canvas">
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 4]} intensity={1.1} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#a89d8c" />
      </mesh>
      <mesh position={[-0.5, 0.2, 0]}>
        <boxGeometry args={[2.5, 0.3, 1]} />
        <meshStandardMaterial color="#5a5f68" />
      </mesh>
      <mesh position={[-1.2, -0.15, 0]} onClick={tap('jack-point')}>
        <boxGeometry args={[0.2, 0.1, 0.2]} />
        <meshStandardMaterial
          color={sel('jack-point') ? '#b85c38' : '#d4a017'}
          emissive={sel('jack-point') ? '#b85c38' : '#d4a017'}
          emissiveIntensity={0.3}
        />
      </mesh>
      <Text position={[-1.2, 0.05, 0]} fontSize={0.1} color="#d4a017" anchorX="center">
        jack point
      </Text>
      <group position={[0.8, -0.1, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.25, 24]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.28, 0.28, 0.26, 16]} />
          <meshStandardMaterial color="#555" />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[
              0.42 * Math.cos((i * 72 * Math.PI) / 180),
              0.42 * Math.sin((i * 72 * Math.PI) / 180),
              0.14,
            ]}
            onClick={tap('lug-nuts')}
          >
            <cylinderGeometry args={[0.04, 0.04, 0.06, 8]} />
            <meshStandardMaterial color={sel('lug-nuts') ? '#b85c38' : '#c0c0c0'} metalness={0.8} />
          </mesh>
        ))}
      </group>
      <mesh position={[0.3, -0.35, 0.5]} rotation={[0, 0, 0.3]} onClick={tap('jack')}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color={sel('jack') ? '#b85c38' : '#d4a017'} />
      </mesh>
      <mesh position={[1.5, -0.3, -0.5]} rotation={[Math.PI / 2, 0, 0]} onClick={tap('spare')}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 20]} />
        <meshStandardMaterial color={sel('spare') ? '#b85c38' : '#1a1a1a'} />
      </mesh>
      <mesh position={[-0.8, -0.4, 1]} onClick={tap('block-wheel')}>
        <boxGeometry args={[0.3, 0.15, 0.2]} />
        <meshStandardMaterial color={sel('block-wheel') ? '#b85c38' : '#8b4513'} />
      </mesh>
      <OrbitControls enablePan={false} minDistance={2.5} maxDistance={7} />
    </Canvas>
  );
}
