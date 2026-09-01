import { Torus, RoundedBox, Text, Cylinder } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import SceneCanvas, { GarageFloor } from './SceneCanvas';
import SceneCallouts from './SceneCallouts';
import type { SceneProps } from './sceneTypes';

const PAINT = '#323c46';
const PAINT_MAT = { color: PAINT, metalness: 0.5, roughness: 0.28, envMapIntensity: 1.2 };
const GLASS = {
  color: '#b8d4f0',
  metalness: 0.02,
  roughness: 0.05,
  transparent: true,
  opacity: 0.62,
  emissive: '#6a98c8',
  emissiveIntensity: 0.85,
};
const TRIM = { color: '#1a1e22', metalness: 0.75, roughness: 0.35 };
const RIM = { color: '#9098a0', metalness: 0.82, roughness: 0.2 };
const JACK = { color: '#d42020', metalness: 0.6, roughness: 0.35 };

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
  return sel
    ? { emissive: '#f5c518', emissiveIntensity: 0.45, color: '#f5c518' }
    : {};
}

/** Thin edge rails only — never a solid plate over the glass */
function WindowTrim({
  position,
  width,
  height,
}: {
  position: [number, number, number];
  width: number;
  height: number;
}) {
  const t = 0.018;
  const d = 0.022;
  const z = 0.02;
  return (
    <group position={position}>
      <mesh position={[0, height / 2 + t / 2, z]}>
        <boxGeometry args={[width + t * 2, t, d]} />
        <meshStandardMaterial {...TRIM} />
      </mesh>
      <mesh position={[0, -(height / 2 + t / 2), z]}>
        <boxGeometry args={[width + t * 2, t, d]} />
        <meshStandardMaterial {...TRIM} />
      </mesh>
      <mesh position={[-(width / 2 + t / 2), 0, z]}>
        <boxGeometry args={[t, height, d]} />
        <meshStandardMaterial {...TRIM} />
      </mesh>
      <mesh position={[width / 2 + t / 2, 0, z]}>
        <boxGeometry args={[t, height, d]} />
        <meshStandardMaterial {...TRIM} />
      </mesh>
    </group>
  );
}

function Wheel({
  position,
  rotation = [0, 0, 0] as [number, number, number],
  scale = 1,
  onLugClick,
  selLug,
  interactive,
  showLabel = true,
  dimmed = false,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onLugClick?: (id: string) => void;
  selLug?: boolean;
  interactive?: boolean;
  showLabel?: boolean;
  dimmed?: boolean;
}) {
  const rubberColor = dimmed ? '#222' : '#1a1a1a';
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Torus args={[0.42, 0.12, 20, 36]} castShadow>
        <meshStandardMaterial color={rubberColor} roughness={0.9} metalness={0} />
      </Torus>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.045, 8, 32]} />
        <meshStandardMaterial color={dimmed ? '#333' : '#444'} roughness={0.88} />
      </mesh>
      {!dimmed &&
        Array.from({ length: 14 }, (_, i) => {
          const a = (i / 14) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[0.46 * Math.cos(a), 0.46 * Math.sin(a), 0]}
              rotation={[0, 0, a]}
            >
              <boxGeometry args={[0.065, 0.035, 0.09]} />
              <meshStandardMaterial color="#0a0a0a" roughness={0.98} />
            </mesh>
          );
        })}
      <Cylinder args={[0.28, 0.28, 0.14, 24]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <meshStandardMaterial {...RIM} color={dimmed ? '#666' : RIM.color} />
      </Cylinder>
      {!dimmed &&
        [0, 72, 144, 216, 288].map((deg) => (
          <mesh
            key={deg}
            position={[
              0.34 * Math.cos((deg * Math.PI) / 180),
              0.34 * Math.sin((deg * Math.PI) / 180),
              0.08,
            ]}
            onClick={tap(interactive, onLugClick, 'lug-nuts')}
            castShadow
          >
            <cylinderGeometry args={[0.032, 0.032, 0.035, 6]} />
            <meshStandardMaterial
              color={selLug ? '#f5c518' : '#c8ccd0'}
              metalness={0.92}
              roughness={0.15}
              {...highlight(!!selLug)}
            />
          </mesh>
        ))}
      {showLabel && (
        <Text position={[0, -0.58, 0.1]} fontSize={0.06} color="#999" anchorX="center">
          RADIAL T/A
        </Text>
      )}
    </group>
  );
}

function ScissorJack({
  position,
  selected,
  onClick,
  interactive,
}: {
  position: [number, number, number];
  selected?: boolean;
  onClick?: (id: string) => void;
  interactive?: boolean;
}) {
  const h = highlight(!!selected);
  return (
    <group position={position} onClick={tap(interactive, onClick, 'jack')}>
      <mesh position={[-0.07, 0.04, 0]} rotation={[0, 0, 0.55]} castShadow>
        <boxGeometry args={[0.03, 0.38, 0.022]} />
        <meshStandardMaterial {...JACK} {...h} />
      </mesh>
      <mesh position={[0.07, 0.04, 0]} rotation={[0, 0, -0.55]} castShadow>
        <boxGeometry args={[0.03, 0.38, 0.022]} />
        <meshStandardMaterial {...JACK} {...h} />
      </mesh>
      <mesh position={[0, -0.16, 0]} castShadow>
        <boxGeometry args={[0.26, 0.03, 0.16]} />
        <meshStandardMaterial color="#333" metalness={0.75} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.05, 12]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

/** Wide 3/4 shot — glass, wheel, jack, spare all in frame */
const CAMERA: [number, number, number] = [3.0, 0.55, 3.6];

export default function TireJackScene({
  selectedIds = [],
  highlightIds = [],
  onHotspotClick,
  interactive,
  variant = 'embedded',
  callouts = [],
}: SceneProps) {
  const sel = (id: string) => selectedIds.includes(id) || highlightIds.includes(id);

  return (
    <SceneCanvas variant={variant} cameraPosition={CAMERA} fov={40} floorY={-0.95}>
      <GarageFloor y={-0.95} />
      <ambientLight intensity={0.38} color="#90a0b0" />
      <spotLight position={[4, 4, 5]} angle={0.55} intensity={4.5} color="#ffc870" castShadow />
      <spotLight position={[-3, 3, 4]} angle={0.6} intensity={2} color="#a0c8e8" />
      <pointLight position={[0.3, 0.8, 0.6]} intensity={1.2} color="#90b8e0" distance={3} />

      {/* Car body — 3/4 driver side, no monolith extrusion over the wheel */}
      <group position={[0, -0.28, 0]} rotation={[0, -0.42, 0]}>
        {/* Rocker / sill */}
        <RoundedBox args={[2.0, 0.12, 0.5]} radius={0.02} position={[0.2, 0.02, 0]} castShadow>
          <meshStandardMaterial {...PAINT_MAT} />
        </RoundedBox>

        {/* Lower door panel — below window */}
        <mesh position={[0.15, 0.22, 0.26]} castShadow>
          <boxGeometry args={[0.9, 0.28, 0.04]} />
          <meshStandardMaterial {...PAINT_MAT} />
        </mesh>

        {/* Belt line — dark paint above and below glass for contrast */}
        <mesh position={[0.15, 0.42, 0.27]}>
          <boxGeometry args={[0.95, 0.04, 0.045]} />
          <meshStandardMaterial color="#222830" metalness={0.55} roughness={0.3} />
        </mesh>
        <mesh position={[0.15, 0.62, 0.27]}>
          <boxGeometry args={[0.95, 0.04, 0.045]} />
          <meshStandardMaterial color="#222830" metalness={0.55} roughness={0.3} />
        </mesh>

        {/* DOOR GLASS — on outer face, nothing in front */}
        <mesh position={[0.15, 0.52, 0.3]} renderOrder={2}>
          <boxGeometry args={[0.72, 0.26, 0.03]} />
          <meshStandardMaterial {...GLASS} depthWrite={false} />
        </mesh>
        <WindowTrim position={[0.15, 0.52, 0.3]} width={0.72} height={0.26} />

        {/* Quarter glass */}
        <mesh position={[0.62, 0.5, 0.22]} rotation={[0, -0.4, 0]} renderOrder={2}>
          <boxGeometry args={[0.38, 0.2, 0.03]} />
          <meshStandardMaterial {...GLASS} depthWrite={false} />
        </mesh>
        <group position={[0.62, 0.5, 0.22]} rotation={[0, -0.4, 0]}>
          <WindowTrim position={[0, 0, 0]} width={0.38} height={0.2} />
        </group>

        {/* C-pillar + roof */}
        <mesh position={[-0.12, 0.58, 0.2]} castShadow>
          <boxGeometry args={[0.08, 0.45, 0.42]} />
          <meshStandardMaterial {...PAINT_MAT} />
        </mesh>
        <mesh position={[0.25, 0.78, 0.18]} castShadow>
          <boxGeometry args={[1.0, 0.07, 0.4]} />
          <meshStandardMaterial {...PAINT_MAT} />
        </mesh>

        {/* Pinch weld */}
        <mesh
          position={[-0.05, 0.1, 0.28]}
          onClick={tap(interactive, onHotspotClick, 'jack-point')}
          castShadow
        >
          <boxGeometry args={[0.45, 0.035, 0.05]} />
          <meshStandardMaterial
            color={sel('jack-point') ? '#f5c518' : '#6a7078'}
            metalness={0.7}
            roughness={0.35}
            {...highlight(sel('jack-point'))}
          />
        </mesh>

        {/* Wheel arch lip — opening, not solid fill */}
        <mesh position={[0.35, 0.18, 0.24]}>
          <torusGeometry args={[0.44, 0.025, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#222830" metalness={0.55} roughness={0.4} />
        </mesh>
      </group>

      {/* Thin fender curve above near tire — does not hide the wheel */}
      <mesh position={[0.42, 0.02, 0.52]} rotation={[0, 0.15, 0]}>
        <torusGeometry args={[0.46, 0.018, 6, 24, Math.PI * 0.55]} />
        <meshStandardMaterial color="#2a3238" metalness={0.55} roughness={0.38} />
      </mesh>

      {/* Near wheel — outside body group, clearly beside arch */}
      <Wheel
        position={[0.45, -0.22, 0.55]}
        rotation={[0, 0.15, 0]}
        onLugClick={onHotspotClick}
        selLug={sel('lug-nuts')}
        interactive={interactive}
      />

      {/* Far wheel hint */}
      <Wheel
        position={[0.0, -0.28, 0.15]}
        rotation={[0, -0.5, 0]}
        scale={0.8}
        interactive={false}
        showLabel={false}
        dimmed
      />

      {/* Jack tucked under rocker / pinch-weld contact */}
      <ScissorJack
        position={[-0.04, -0.5, 0.66]}
        selected={sel('jack')}
        onClick={onHotspotClick}
        interactive={interactive}
      />

      {/* Wheel chock */}
      <mesh
        position={[-0.45, -0.82, 0.9]}
        rotation={[0, 0.3, 0.12]}
        onClick={tap(interactive, onHotspotClick, 'block-wheel')}
        castShadow
      >
        <boxGeometry args={[0.2, 0.09, 0.12]} />
        <meshStandardMaterial
          color={sel('block-wheel') ? '#f5c518' : '#6b4423'}
          roughness={0.88}
          {...highlight(sel('block-wheel'))}
        />
      </mesh>

      {/* Spare tire on ground */}
      <group
        position={[1.35, -0.78, 0.25]}
        rotation={[Math.PI / 2, 0, 0.2]}
        onClick={tap(interactive, onHotspotClick, 'spare')}
      >
        <Torus args={[0.34, 0.1, 16, 32]}>
          <meshStandardMaterial
            color={sel('spare') ? '#f5c518' : '#1a1a1a'}
            roughness={0.9}
            {...highlight(sel('spare'))}
          />
        </Torus>
        <Cylinder args={[0.22, 0.22, 0.1, 20]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial {...RIM} />
        </Cylinder>
      </group>

      <SceneCallouts callouts={callouts} />
    </SceneCanvas>
  );
}
