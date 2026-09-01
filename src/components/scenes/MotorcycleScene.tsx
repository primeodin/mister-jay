import { Cylinder, RoundedBox, Torus, Text } from '@react-three/drei';
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

function Wheel({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <Cylinder args={[0.36, 0.36, 0.12, 28]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
      </Cylinder>
      <Cylinder args={[0.22, 0.22, 0.13, 20]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#555" metalness={0.75} roughness={0.3} />
      </Cylinder>
    </group>
  );
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
    <SceneCanvas variant={variant} cameraPosition={[2.1, 0.75, 3.6]} fov={38} floorY={-0.9}>
      <GarageFloor y={-0.9} />
      <ambientLight intensity={0.45} color="#90a0b0" />
      <spotLight position={[4, 4, 5]} angle={0.55} intensity={4.5} color="#ffc870" castShadow />
      <spotLight position={[-3, 3, 4]} angle={0.6} intensity={2} color="#a0c8e8" />
      <pointLight position={[0.5, 1, 1]} intensity={1.2} color="#90b8e0" distance={4} />

      {/* Sloped driveway */}
      <mesh rotation={[-Math.PI / 2, 0, 0.18]} position={[0.5, -0.89, 0.8]} receiveShadow>
        <planeGeometry args={[6, 5]} />
        <meshStandardMaterial
          color="#252320"
          roughness={0.95}
          emissive={sel('slope') ? '#442200' : '#000'}
          emissiveIntensity={sel('slope') ? 0.12 : 0}
        />
      </mesh>

      <group rotation={[0, 0.38, 0]} position={[0, -0.12, 0]}>
        <Wheel position={[-0.78, -0.38, 0]} />
        <Wheel position={[0.82, -0.42, 0.05]} scale={0.95} />

        {/* Swingarm */}
        <mesh position={[-0.35, -0.28, 0]} rotation={[0, 0, -0.12]} castShadow>
          <boxGeometry args={[0.7, 0.05, 0.06]} />
          <meshStandardMaterial color="#444" metalness={0.7} roughness={0.35} />
        </mesh>
        {/* Chain */}
        <Torus args={[0.28, 0.012, 6, 24]} position={[-0.55, -0.32, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.4} />
        </Torus>

        {/* Frame rails */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <boxGeometry args={[1.25, 0.08, 0.2]} />
          <meshStandardMaterial color="#3a3a40" metalness={0.65} roughness={0.38} />
        </mesh>

        {/* Engine */}
        <RoundedBox args={[0.38, 0.32, 0.32]} radius={0.03} position={[-0.02, -0.06, 0]} castShadow>
          <meshStandardMaterial color="#2a2a30" metalness={0.55} roughness={0.45} />
        </RoundedBox>

        {/* Fuel tank — teardrop */}
        <mesh position={[0.08, 0.24, 0]} castShadow>
          <boxGeometry args={[0.58, 0.2, 0.3]} />
          <meshStandardMaterial color="#1a1a22" metalness={0.7} roughness={0.28} />
        </mesh>
        <mesh position={[0.22, 0.28, 0]} castShadow>
          <boxGeometry args={[0.25, 0.12, 0.26]} />
          <meshStandardMaterial color="#222228" metalness={0.75} roughness={0.25} />
        </mesh>
        <Text position={[0.12, 0.38, 0.16]} fontSize={0.07} color="#888" anchorX="center" rotation={[0, 0.38, 0]}>
          MOTORCYCLE
        </Text>

        {/* Seat */}
        <mesh position={[-0.28, 0.22, 0]} castShadow>
          <boxGeometry args={[0.48, 0.09, 0.22]} />
          <meshStandardMaterial color="#2a2020" roughness={0.88} />
        </mesh>

        {/* Fork tubes */}
        <mesh position={[0.58, 0.12, 0.04]} rotation={[0, 0, -0.22]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.38, 8]} />
          <meshStandardMaterial color="#666" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.62, 0.12, -0.04]} rotation={[0, 0, -0.22]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.38, 8]} />
          <meshStandardMaterial color="#666" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Headlight */}
        <mesh position={[0.88, 0.28, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
          <meshStandardMaterial color="#ddd" metalness={0.3} roughness={0.2} emissive="#fff8e0" emissiveIntensity={0.25} />
        </mesh>

        {/* Handlebars */}
        <mesh
          position={[0.74, 0.44, 0]}
          onClick={tap(interactive, onHotspotClick, 'handlebars')}
          castShadow
        >
          <boxGeometry args={[0.68, 0.045, 0.26]} />
          <meshStandardMaterial color="#222" metalness={0.75} roughness={0.3} {...highlight(sel('handlebars'))} />
        </mesh>
        <mesh position={[1.06, 0.44, 0.09]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.032, 0.032, 0.11, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        <mesh position={[1.06, 0.44, -0.09]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.032, 0.032, 0.11, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>

        {/* Exhaust */}
        <mesh position={[-0.48, -0.12, 0.14]} rotation={[0, 0, -0.28]} castShadow>
          <cylinderGeometry args={[0.032, 0.038, 0.55, 8]} />
          <meshStandardMaterial color="#777" metalness={0.82} roughness={0.32} />
        </mesh>

        {/* Taillight */}
        <mesh position={[-0.95, 0.08, 0]}>
          <boxGeometry args={[0.04, 0.08, 0.12]} />
          <meshStandardMaterial color="#aa1818" emissive="#cc2020" emissiveIntensity={0.15} />
        </mesh>

        {/* Sidestand */}
        <mesh
          position={[-0.52, -0.4, 0.16]}
          rotation={[0.55, 0, 0]}
          onClick={tap(interactive, onHotspotClick, 'sidestand')}
          castShadow
        >
          <boxGeometry args={[0.035, 0.42, 0.025]} />
          <meshStandardMaterial color="#888" metalness={0.78} roughness={0.35} {...highlight(sel('sidestand'))} />
        </mesh>
        <mesh position={[-0.54, -0.6, 0.2]} rotation={[0.55, 0, 0]}>
          <boxGeometry args={[0.09, 0.02, 0.07]} />
          <meshStandardMaterial color="#666" metalness={0.8} />
        </mesh>
      </group>

      {/* Footwear on ground — learn anchors */}
      <group position={[-0.35, -0.82, 0.55]} onClick={tap(interactive, onHotspotClick, 'sandals')}>
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0.3]}>
          <boxGeometry args={[0.14, 0.22, 0.03]} />
          <meshStandardMaterial color="#8a7060" roughness={0.85} {...highlight(sel('sandals'))} />
        </mesh>
        <mesh position={[0.18, 0, 0.05]} rotation={[-Math.PI / 2, 0, 0.3]}>
          <boxGeometry args={[0.14, 0.22, 0.03]} />
          <meshStandardMaterial color="#8a7060" roughness={0.85} />
        </mesh>
      </group>
      <group position={[0.35, -0.82, 0.5]} onClick={tap(interactive, onHotspotClick, 'boots')}>
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, -0.15]}>
          <boxGeometry args={[0.12, 0.26, 0.08]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.8} {...highlight(sel('boots'))} />
        </mesh>
        <mesh position={[0.2, 0, 0.04]} rotation={[-Math.PI / 2, 0, -0.15]}>
          <boxGeometry args={[0.12, 0.26, 0.08]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
        </mesh>
      </group>

      <SceneCallouts callouts={callouts} />
    </SceneCanvas>
  );
}
