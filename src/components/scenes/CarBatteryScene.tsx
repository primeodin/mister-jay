import { RoundedBox, Text } from '@react-three/drei';
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

export default function CarBatteryScene({
  selectedIds = [],
  highlightIds = [],
  onHotspotClick,
  interactive,
  variant = 'embedded',
  callouts = [],
}: SceneProps) {
  const sel = (id: string) => selectedIds.includes(id) || highlightIds.includes(id);

  return (
    <SceneCanvas variant={variant} cameraPosition={[0.4, 0.45, 2.8]} fov={36} floorY={-0.75}>
      <GarageFloor y={-0.75} />

      {/* Engine bay context */}
      <group position={[0, -0.15, -0.3]}>
        {/* Fender inner wall */}
        <mesh position={[-1.1, 0.2, 0]} rotation={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.9, 1.4]} />
          <meshStandardMaterial color="#3a4048" metalness={0.45} roughness={0.5} />
        </mesh>
        {/* Radiator support / crossmember */}
        <mesh position={[0, -0.1, -0.4]} castShadow>
          <boxGeometry args={[2.2, 0.06, 0.12]} />
          <meshStandardMaterial color="#4a5058" metalness={0.55} roughness={0.45} />
        </mesh>
        {/* Hood underside hint */}
        <mesh position={[0, 0.75, 0.2]} rotation={[0.15, 0, 0]} receiveShadow>
          <boxGeometry args={[2.4, 0.04, 1.6]} />
          <meshStandardMaterial color="#2a2a30" metalness={0.3} roughness={0.6} />
        </mesh>
      </group>

      <group position={[0, 0, 0]}>
        {/* Battery tray */}
        <mesh position={[0, -0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.75, 0.06, 1.05]} />
          <meshStandardMaterial color="#3a3a40" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Battery case */}
        <RoundedBox args={[1.55, 0.38, 0.88]} radius={0.03} position={[0, 0, 0]} castShadow>
          <meshStandardMaterial color="#1c1c1e" roughness={0.5} metalness={0.12} />
        </RoundedBox>
        {/* Label recess */}
        <mesh position={[0, 0.05, 0.45]}>
          <boxGeometry args={[0.7, 0.2, 0.02]} />
          <meshStandardMaterial color="#2a2a2c" roughness={0.6} />
        </mesh>
        <Text position={[0, 0.05, 0.46]} fontSize={0.06} color="#888" anchorX="center">
          12V 60Ah
        </Text>

        {/* J-bolt hold down */}
        <mesh position={[0, 0.28, 0]} onClick={tap(interactive, onHotspotClick, 'holddown')} castShadow>
          <boxGeometry args={[1.35, 0.04, 0.18]} />
          <meshStandardMaterial color="#666" metalness={0.78} roughness={0.32} {...highlight(sel('holddown'))} />
        </mesh>
        <mesh position={[-0.55, 0.32, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.08, 8]} />
          <meshStandardMaterial color="#888" metalness={0.85} />
        </mesh>
        <mesh position={[0.55, 0.32, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.08, 8]} />
          <meshStandardMaterial color="#888" metalness={0.85} />
        </mesh>

        {/* Negative terminal */}
        <group position={[-0.48, 0.32, 0.38]} onClick={tap(interactive, onHotspotClick, 'negative')}>
          <mesh castShadow>
            <cylinderGeometry args={[0.09, 0.11, 0.12, 16]} />
            <meshStandardMaterial color="#2a2a2e" metalness={0.88} roughness={0.18} {...highlight(sel('negative'))} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.055, 0.07, 0.05, 12]} />
            <meshStandardMaterial color="#111" metalness={0.9} />
          </mesh>
          <Text position={[0, -0.12, 0.1]} fontSize={0.07} color="#aaa" anchorX="center">−</Text>
        </group>

        {/* Positive terminal with red cover */}
        <group position={[0.48, 0.32, 0.38]} onClick={tap(interactive, onHotspotClick, 'positive')}>
          <mesh castShadow>
            <cylinderGeometry args={[0.09, 0.11, 0.1, 16]} />
            <meshStandardMaterial color="#8a1010" metalness={0.85} roughness={0.2} {...highlight(sel('positive'))} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.07, 0.05, 0.08, 12]} />
            <meshStandardMaterial color="#cc1818" metalness={0.3} roughness={0.5} />
          </mesh>
          <Text position={[0, 0.12, 0.08]} fontSize={0.08} color="#fff" anchorX="center" fontWeight="bold">+</Text>
        </group>

        {/* Corrosion crust on positive */}
        <mesh position={[0.58, 0.28, 0.42]} onClick={tap(interactive, onHotspotClick, 'corrosion')}>
          <sphereGeometry args={[0.06, 10, 10]} />
          <meshStandardMaterial
            color="#3d6b4a"
            roughness={0.92}
            emissive={sel('corrosion') ? '#4a8a5c' : '#2a4a35'}
            emissiveIntensity={0.15}
            {...highlight(sel('corrosion'))}
          />
        </mesh>
      </group>

      <SceneCallouts callouts={callouts} />
    </SceneCanvas>
  );
}
