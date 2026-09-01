import { RoundedBox } from '@react-three/drei';
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

export default function CarBatteryScene({
  selectedIds = [],
  highlightIds = [],
  onHotspotClick,
  interactive,
  variant = 'embedded',
}: SceneProps) {
  const sel = (id: string) => selectedIds.includes(id) || highlightIds.includes(id);

  return (
    <SceneCanvas variant={variant} cameraPosition={[0.5, 0.6, 3.2]} fov={38}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.85, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#2c2a26" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.3, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.08, 1.2]} />
        <meshStandardMaterial color="#3a3a40" metalness={0.4} roughness={0.5} />
      </mesh>
      <group position={[0, 0, 0]}>
        <RoundedBox args={[1.6, 0.42, 0.95]} radius={0.04} castShadow>
          <meshStandardMaterial color="#1a1a1c" roughness={0.55} metalness={0.15} />
        </RoundedBox>
        <mesh position={[0, 0.28, 0]} castShadow>
          <boxGeometry args={[1.45, 0.06, 0.75]} />
          <meshStandardMaterial color="#555560" metalness={0.7} roughness={0.35} />
        </mesh>
        <group position={[-0.5, 0.38, 0.35]} onClick={tap(interactive, onHotspotClick, 'negative')}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.12, 0.14, 16]} />
            <meshStandardMaterial
              color={sel('negative') ? '#f5c518' : '#2a2a2e'}
              metalness={0.85}
              roughness={0.2}
              emissive={sel('negative') ? '#f5c518' : '#000'}
              emissiveIntensity={sel('negative') ? 0.4 : 0}
            />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 12]} />
            <meshStandardMaterial color="#111" metalness={0.9} />
          </mesh>
        </group>
        <group position={[0.5, 0.38, 0.35]} onClick={tap(interactive, onHotspotClick, 'positive')}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.12, 0.14, 16]} />
            <meshStandardMaterial
              color={sel('positive') ? '#f5c518' : '#b81818'}
              metalness={0.85}
              roughness={0.2}
              emissive={sel('positive') ? '#f5c518' : '#440000'}
              emissiveIntensity={sel('positive') ? 0.4 : 0.15}
            />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 12]} />
            <meshStandardMaterial color="#cc2222" metalness={0.9} />
          </mesh>
        </group>
        <group position={[0.55, 0.32, 0.1]}>
          <mesh>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#3d6b4a" roughness={0.85} />
          </mesh>
        </group>
        <WorkHotspot position={[0.55, 0.45, 0.2]} id="corrosion" label="" selected={sel('corrosion')} onClick={onHotspotClick} interactive={interactive} />
        <mesh
          position={[0, 0.42, 0]}
          onClick={tap(interactive, onHotspotClick, 'holddown')}
          castShadow
        >
          <boxGeometry args={[1.3, 0.05, 0.2]} />
          <meshStandardMaterial
            color={sel('holddown') ? '#f5c518' : '#666'}
            metalness={0.75}
            roughness={0.3}
            emissive={sel('holddown') ? '#f5c518' : '#000'}
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </SceneCanvas>
  );
}
