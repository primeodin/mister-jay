import { RoundedBox, Cylinder } from '@react-three/drei';
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

export default function TireJackScene({
  selectedIds = [],
  highlightIds = [],
  onHotspotClick,
  interactive,
  variant = 'embedded',
}: SceneProps) {
  const sel = (id: string) => selectedIds.includes(id) || highlightIds.includes(id);

  return (
    <SceneCanvas variant={variant} cameraPosition={[2, 1, 4]} fov={40}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#2c2a26" roughness={0.92} />
      </mesh>
      <mesh position={[-0.8, 0.1, 0]} castShadow>
        <boxGeometry args={[2.2, 0.25, 1]} />
        <meshStandardMaterial color="#4a5058" metalness={0.5} roughness={0.45} />
      </mesh>
      <mesh position={[-1.1, -0.15, 0]} onClick={tap(interactive, onHotspotClick, 'jack-point')} castShadow>
        <boxGeometry args={[0.25, 0.08, 0.15]} />
        <meshStandardMaterial
          color={sel('jack-point') ? '#f5c518' : '#888'}
          emissive={sel('jack-point') ? '#f5c518' : '#000'}
          emissiveIntensity={0.35}
          metalness={0.6}
        />
      </mesh>
      <group position={[0.6, -0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <Cylinder args={[0.48, 0.48, 0.22, 32]} castShadow>
          <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
        </Cylinder>
        <Cylinder args={[0.3, 0.3, 0.24, 24]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#555" metalness={0.7} roughness={0.35} />
        </Cylinder>
        {[0, 72, 144, 216, 288].map((deg) => (
          <mesh
            key={deg}
            position={[
              0.42 * Math.cos((deg * Math.PI) / 180),
              0.42 * Math.sin((deg * Math.PI) / 180),
              0.13,
            ]}
            onClick={tap(interactive, onHotspotClick, 'lug-nuts')}
            castShadow
          >
            <cylinderGeometry args={[0.045, 0.045, 0.05, 8]} />
            <meshStandardMaterial
              color={sel('lug-nuts') ? '#f5c518' : '#c8c8c8'}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
      <group position={[0.2, -0.55, 0.4]} rotation={[0, 0, 0.25]} onClick={tap(interactive, onHotspotClick, 'jack')}>
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.55, 0.12]} />
          <meshStandardMaterial color={sel('jack') ? '#f5c518' : '#d4a017'} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.32, 0]}>
          <boxGeometry args={[0.35, 0.06, 0.2]} />
          <meshStandardMaterial color="#333" metalness={0.7} />
        </mesh>
      </group>
      <group position={[1.4, -0.5, -0.3]} onClick={tap(interactive, onHotspotClick, 'spare')}>
        <Cylinder args={[0.38, 0.38, 0.18, 24]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <meshStandardMaterial color={sel('spare') ? '#f5c518' : '#1a1a1a'} roughness={0.8} />
        </Cylinder>
      </group>
      <RoundedBox
        args={[0.35, 0.18, 0.22]}
        radius={0.02}
        position={[-0.5, -0.82, 0.8]}
        onClick={tap(interactive, onHotspotClick, 'block-wheel')}
        castShadow
      >
        <meshStandardMaterial color={sel('block-wheel') ? '#f5c518' : '#5c3d1e'} roughness={0.9} />
      </RoundedBox>
      <WorkHotspot position={[-1.1, -0.82, 0.8]} id="block-wheel" label="" selected={sel('block-wheel')} onClick={onHotspotClick} interactive={interactive} />
    </SceneCanvas>
  );
}
