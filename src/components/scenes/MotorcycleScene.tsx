import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';

interface SceneProps {
  selectedIds?: string[];
  highlightIds?: string[];
  onHotspotClick?: (id: string) => void;
  interactive?: boolean;
}

export default function MotorcycleScene({
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
    <Canvas camera={{ position: [2, 1.2, 3.5], fov: 45 }} className="scene-canvas">
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#a89d8c" />
      </mesh>
      <group rotation={[0, 0.3, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.8, -0.2, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.12, 20]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.8, -0.2, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.12, 20]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.4, 0.15, 0.3]} />
          <meshStandardMaterial color="#555" />
        </mesh>
        <mesh position={[0.3, 0.35, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.5, 0.08, 0.08]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        <mesh position={[0.55, 0.55, 0]} onClick={tap('handlebars')}>
          <boxGeometry args={[0.5, 0.06, 0.2]} />
          <meshStandardMaterial
            color={sel('handlebars') ? '#b85c38' : '#333'}
            emissive={sel('handlebars') ? '#b85c38' : '#000'}
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[-0.5, -0.35, 0.15]} rotation={[0.4, 0, 0]} onClick={tap('sidestand')}>
          <boxGeometry args={[0.04, 0.35, 0.04]} />
          <meshStandardMaterial
            color={sel('sidestand') ? '#b85c38' : '#888'}
            emissive={sel('sidestand') ? '#b85c38' : '#000'}
            emissiveIntensity={0.3}
          />
        </mesh>
        <Text position={[0, 0.7, 0]} fontSize={0.1} color="#b85c38" anchorX="center">
          center of mass — low
        </Text>
      </group>
      <mesh position={[1.5, -0.55, 1]} rotation={[-0.15, 0, 0]} onClick={tap('slope')}>
        <boxGeometry args={[2, 0.05, 1]} />
        <meshStandardMaterial color={sel('slope') ? '#a63d2f' : '#8a8278'} transparent opacity={0.6} />
      </mesh>
      <OrbitControls enablePan={false} minDistance={2.5} maxDistance={7} />
    </Canvas>
  );
}
