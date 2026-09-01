import { Cylinder, RoundedBox } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import SceneCanvas, { GarageFloor } from './SceneCanvas';
import SceneCallouts from './SceneCallouts';
import type { SceneProps } from './sceneTypes';

function tap(
  interactive: boolean | undefined,
  onClick: ((id: string) => void) | undefined,
  id: string,
) {
  return interactive && onClick
    ? (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onClick(id);
      }
    : undefined;
}

function highlight(sel: boolean) {
  return sel ? { emissive: '#f5c518', emissiveIntensity: 0.4 } : {};
}

export default function MotorcycleScene({
  selectedIds = [],
  highlightIds = [],
  onHotspotClick,
  interactive,
  variant = 'embedded',
  callouts = [],
}: SceneProps) {
  const sel = (id: string) => selectedIds.includes(id) || highlightIds.includes(id);

  return (
    <SceneCanvas variant={variant} cameraPosition={[2, 0.85, 3.8]} fov={40} floorY={-0.9}>
      <GarageFloor y={-0.9} />
      {/* Sloped pavement */}
      <mesh rotation={[-Math.PI / 2, 0, 0.22]} position={[0.6, -0.89, 1]} receiveShadow>
        <planeGeometry args={[5, 4]} />
        <meshStandardMaterial
          color="#252320"
          roughness={0.95}
          emissive={sel('slope') ? '#442200' : '#000'}
          emissiveIntensity={sel('slope') ? 0.15 : 0}
        />
      </mesh>

      <group rotation={[0, 0.4, 0]} position={[0, -0.15, 0]}>
        {/* Rear wheel */}
        <group position={[-0.75, -0.38, 0]}>
          <Cylinder args={[0.36, 0.36, 0.12, 28]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshStandardMaterial color="#1a1a1a" roughness={0.82} />
          </Cylinder>
          <Cylinder args={[0.22, 0.22, 0.13, 20]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#555" metalness={0.75} roughness={0.3} />
          </Cylinder>
        </group>
        {/* Front wheel */}
        <group position={[0.8, -0.42, 0.05]}>
          <Cylinder args={[0.34, 0.34, 0.12, 28]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshStandardMaterial color="#1a1a1a" roughness={0.82} />
          </Cylinder>
        </group>

        {/* Frame */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[1.2, 0.1, 0.22]} />
          <meshStandardMaterial color="#3a3a40" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Engine block */}
        <RoundedBox args={[0.35, 0.28, 0.3]} radius={0.03} position={[-0.05, -0.08, 0]} castShadow>
          <meshStandardMaterial color="#2a2a30" metalness={0.55} roughness={0.45} />
        </RoundedBox>
        {/* Fuel tank */}
        <mesh position={[0.05, 0.22, 0]} castShadow>
          <boxGeometry args={[0.55, 0.18, 0.28]} />
          <meshStandardMaterial color="#1a1a22" metalness={0.65} roughness={0.35} />
        </mesh>
        {/* Seat */}
        <mesh position={[-0.25, 0.2, 0]} castShadow>
          <boxGeometry args={[0.45, 0.08, 0.22]} />
          <meshStandardMaterial color="#2a2020" roughness={0.85} />
        </mesh>
        {/* Fork */}
        <mesh position={[0.55, 0.15, 0]} rotation={[0, 0, -0.2]} castShadow>
          <boxGeometry args={[0.06, 0.35, 0.06]} />
          <meshStandardMaterial color="#555" metalness={0.7} />
        </mesh>
        {/* Handlebars */}
        <mesh
          position={[0.72, 0.42, 0]}
          onClick={tap(interactive, onHotspotClick, 'handlebars')}
          castShadow
        >
          <boxGeometry args={[0.65, 0.045, 0.24]} />
          <meshStandardMaterial color="#222" metalness={0.75} roughness={0.3} {...highlight(sel('handlebars'))} />
        </mesh>
        {/* Grips */}
        <mesh position={[1.02, 0.42, 0.08]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        <mesh position={[1.02, 0.42, -0.08]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        {/* Exhaust */}
        <mesh position={[-0.45, -0.15, 0.12]} rotation={[0, 0, -0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.035, 0.5, 8]} />
          <meshStandardMaterial color="#666" metalness={0.8} roughness={0.35} />
        </mesh>
        {/* Sidestand */}
        <mesh
          position={[-0.5, -0.42, 0.14]}
          rotation={[0.55, 0, 0]}
          onClick={tap(interactive, onHotspotClick, 'sidestand')}
          castShadow
        >
          <boxGeometry args={[0.035, 0.42, 0.025]} />
          <meshStandardMaterial color="#888" metalness={0.78} roughness={0.35} {...highlight(sel('sidestand'))} />
        </mesh>
        <mesh position={[-0.52, -0.62, 0.18]} rotation={[0.55, 0, 0]}>
          <boxGeometry args={[0.08, 0.02, 0.06]} />
          <meshStandardMaterial color="#666" metalness={0.8} />
        </mesh>
      </group>

      <SceneCallouts callouts={callouts} />
    </SceneCanvas>
  );
}
