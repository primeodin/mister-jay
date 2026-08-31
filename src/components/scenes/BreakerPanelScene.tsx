import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { useRef } from 'react';
import type { Mesh } from 'three';
import type { ThreeEvent } from '@react-three/fiber';

interface SceneProps {
  focusIds?: string[];
  selectedIds?: string[];
  highlightIds?: string[];
  onHotspotClick?: (id: string) => void;
  interactive?: boolean;
}

function Breaker({
  position,
  id,
  label,
  tripped,
  selected,
  highlighted,
  onClick,
  interactive,
}: {
  position: [number, number, number];
  id: string;
  label: string;
  tripped?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  onClick?: (id: string) => void;
  interactive?: boolean;
}) {
  const ref = useRef<Mesh>(null);
  const toggleY = tripped ? 0 : 0.12;

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onClick={
          interactive && onClick
            ? (e: ThreeEvent<MouseEvent>) => {
                e.stopPropagation();
                onClick(id);
              }
            : undefined
        }
      >
        <boxGeometry args={[0.35, 0.5, 0.15]} />
        <meshStandardMaterial
          color={selected ? '#b85c38' : highlighted ? '#d4a017' : '#333'}
          emissive={selected ? '#b85c38' : '#000'}
          emissiveIntensity={selected ? 0.4 : 0}
        />
      </mesh>
      <mesh position={[0, toggleY, 0.1]}>
        <boxGeometry args={[0.08, 0.2, 0.06]} />
        <meshStandardMaterial color={tripped ? '#d4a017' : '#ccc'} />
      </mesh>
      <Text position={[0, -0.35, 0]} fontSize={0.08} color="#aaa" anchorX="center">
        {label}
      </Text>
    </group>
  );
}

function HazardMarker({
  position,
  id,
  label,
  selected,
  onClick,
  interactive,
}: {
  position: [number, number, number];
  id: string;
  label: string;
  selected?: boolean;
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
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={selected ? '#a63d2f' : '#b22222'}
          emissive={selected ? '#a63d2f' : '#b22222'}
          emissiveIntensity={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>
      <Html distanceFactor={6} position={[0, 0.25, 0]}>
        <span className="scene-label">{label}</span>
      </Html>
    </group>
  );
}

export default function BreakerPanelScene({
  selectedIds = [],
  highlightIds = [],
  onHotspotClick,
  interactive,
}: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0.5, 3.5], fov: 45 }} className="scene-canvas">
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} />
      <directionalLight position={[-2, 2, -2]} intensity={0.4} />
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[2.8, 2.4, 0.15]} />
          <meshStandardMaterial color="#c0b8a8" />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.4, 2, 0.08]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <Breaker
          position={[0, 0.75, 0.1]}
          id="main"
          label="MAIN 100A"
          selected={selectedIds.includes('main')}
          highlighted={highlightIds.includes('main')}
          onClick={onHotspotClick}
          interactive={interactive}
        />
        <Breaker position={[-0.6, 0.2, 0.1]} id="kitchen" label="KIT 20A" selected={selectedIds.includes('kitchen')} highlighted={highlightIds.includes('kitchen')} onClick={onHotspotClick} interactive={interactive} />
        <Breaker position={[0, 0.2, 0.1]} id="bedroom" label="BED 15A" selected={selectedIds.includes('bedroom')} highlighted={highlightIds.includes('bedroom')} onClick={onHotspotClick} interactive={interactive} />
        <Breaker position={[0.6, 0.2, 0.1]} id="dryer" label="DRY 30A" selected={selectedIds.includes('dryer')} highlighted={highlightIds.includes('dryer')} onClick={onHotspotClick} interactive={interactive} />
        <Breaker position={[-0.6, -0.3, 0.1]} id="unlabeled" label="???" tripped selected={selectedIds.includes('unlabeled')} highlighted={highlightIds.includes('unlabeled')} onClick={onHotspotClick} interactive={interactive} />
        <HazardMarker position={[-1.1, -0.8, 0.2]} id="rust" label="Rust" selected={selectedIds.includes('rust')} onClick={onHotspotClick} interactive={interactive} />
        <HazardMarker position={[1.1, -0.8, 0.2]} id="scorch" label="Scorch" selected={selectedIds.includes('scorch')} onClick={onHotspotClick} interactive={interactive} />
        <HazardMarker position={[0, -1.1, 0.3]} id="water" label="Wet floor" selected={selectedIds.includes('water')} onClick={onHotspotClick} interactive={interactive} />
      </group>
      <OrbitControls enablePan={false} minDistance={2} maxDistance={6} />
    </Canvas>
  );
}
