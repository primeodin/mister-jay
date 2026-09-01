import { Cylinder } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import SceneCanvas from './SceneCanvas';
import WorkHotspot from './WorkHotspot';
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

export default function MotorcycleScene({
  selectedIds = [],
  highlightIds = [],
  onHotspotClick,
  interactive,
  variant = 'embedded',
}: SceneProps) {
  const sel = (id: string) => selectedIds.includes(id) || highlightIds.includes(id);

  return (
    <SceneCanvas variant={variant} cameraPosition={[2.2, 1.1, 4.2]} fov={42}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#2c2a26" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0.3]} position={[0.5, -0.94, 1.2]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#252320" roughness={0.95} />
      </mesh>
      <group rotation={[0, 0.35, 0]} position={[0, -0.2, 0]}>
        <Cylinder args={[0.34, 0.34, 0.1, 24]} rotation={[0, 0, Math.PI / 2]} position={[-0.85, -0.35, 0]} castShadow>
          <meshStandardMaterial color="#1a1a1a" roughness={0.75} />
        </Cylinder>
        <Cylinder args={[0.34, 0.34, 0.1, 24]} rotation={[0, 0, Math.PI / 2]} position={[0.85, -0.45, 0]} castShadow>
          <meshStandardMaterial color="#1a1a1a" roughness={0.75} />
        </Cylinder>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.35, 0.12, 0.28]} />
          <meshStandardMaterial color="#4a4a50" metalness={0.55} roughness={0.4} />
        </mesh>
        <mesh position={[0.15, 0.28, 0]} castShadow>
          <boxGeometry args={[0.55, 0.08, 0.08]} />
          <meshStandardMaterial color="#3a3a40" metalness={0.6} />
        </mesh>
        <mesh
          position={[0.45, 0.48, 0]}
          onClick={tap(interactive, onHotspotClick, 'handlebars')}
          castShadow
        >
          <boxGeometry args={[0.55, 0.05, 0.22]} />
          <meshStandardMaterial
            color={sel('handlebars') ? '#f5c518' : '#2a2a2e'}
            emissive={sel('handlebars') ? '#f5c518' : '#000'}
            emissiveIntensity={0.35}
            metalness={0.7}
          />
        </mesh>
        <mesh
          position={[-0.55, -0.5, 0.12]}
          rotation={[0.5, 0, 0]}
          onClick={tap(interactive, onHotspotClick, 'sidestand')}
          castShadow
        >
          <boxGeometry args={[0.04, 0.38, 0.04]} />
          <meshStandardMaterial
            color={sel('sidestand') ? '#f5c518' : '#888'}
            metalness={0.75}
            emissive={sel('sidestand') ? '#f5c518' : '#000'}
            emissiveIntensity={0.3}
          />
        </mesh>
        <WorkHotspot position={[0, 0.55, 0]} id="handlebars" label="" selected={sel('handlebars')} onClick={onHotspotClick} interactive={interactive} />
      </group>
      <WorkHotspot position={[0.8, -0.9, 1.2]} id="slope" label="" selected={sel('slope')} onClick={onHotspotClick} interactive={interactive} />
    </SceneCanvas>
  );
}
