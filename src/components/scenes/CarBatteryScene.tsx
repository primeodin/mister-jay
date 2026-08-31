import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';

interface SceneProps {
  selectedIds?: string[];
  highlightIds?: string[];
  onHotspotClick?: (id: string) => void;
  interactive?: boolean;
}

function Terminal({
  position,
  id,
  label,
  color,
  selected,
  highlighted,
  onClick,
  interactive,
}: {
  position: [number, number, number];
  id: string;
  label: string;
  color: string;
  selected?: boolean;
  highlighted?: boolean;
  onClick?: (id: string) => void;
  interactive?: boolean;
}) {
  return (
    <group position={position}>
      <mesh
        onClick={
          interactive && onClick
            ? (e: ThreeEvent<MouseEvent>) => {
                e.stopPropagation();
                onClick(id);
              }
            : undefined
        }
      >
        <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
        <meshStandardMaterial
          color={selected ? '#b85c38' : highlighted ? '#d4a017' : color}
          emissive={selected ? '#b85c38' : '#000'}
          emissiveIntensity={selected ? 0.5 : 0}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <Text position={[0, -0.35, 0]} fontSize={0.12} color={color} anchorX="center">
        {label}
      </Text>
    </group>
  );
}

export default function CarBatteryScene({
  selectedIds = [],
  highlightIds = [],
  onHotspotClick,
  interactive,
}: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0.8, 3], fov: 45 }} className="scene-canvas">
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} />
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.5, 1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[1.6, 0.08, 0.8]} />
          <meshStandardMaterial color="#444" metalness={0.5} />
        </mesh>
        <Terminal
          position={[-0.55, 0.45, 0]}
          id="negative"
          label="− NEG"
          color="#222"
          selected={selectedIds.includes('negative')}
          highlighted={highlightIds.includes('negative')}
          onClick={onHotspotClick}
          interactive={interactive}
        />
        <Terminal
          position={[0.55, 0.45, 0]}
          id="positive"
          label="+ POS"
          color="#b22222"
          selected={selectedIds.includes('positive')}
          highlighted={highlightIds.includes('positive')}
          onClick={onHotspotClick}
          interactive={interactive}
        />
        <mesh
          position={[0, 0.55, 0]}
          onClick={
            interactive && onHotspotClick
              ? (e: ThreeEvent<MouseEvent>) => {
                  e.stopPropagation();
                  onHotspotClick('holddown');
                }
              : undefined
          }
        >
          <boxGeometry args={[1.4, 0.06, 0.3]} />
          <meshStandardMaterial
            color={selectedIds.includes('holddown') ? '#b85c38' : '#666'}
            emissive={selectedIds.includes('holddown') ? '#b85c38' : '#000'}
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[0.7, 0.35, 0.3]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#4a7c59" roughness={0.8} />
        </mesh>
        <Text position={[0.7, 0.15, 0.3]} fontSize={0.07} color="#4a7c59" anchorX="center">
          corrosion
        </Text>
      </group>
      <OrbitControls enablePan={false} minDistance={2} maxDistance={5} />
    </Canvas>
  );
}
