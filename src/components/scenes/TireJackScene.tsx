import { Torus, RoundedBox, Text, Cylinder } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import SceneCanvas, { GarageFloor } from './SceneCanvas';
import SceneCallouts from './SceneCallouts';
import type { SceneProps } from './sceneTypes';

const PAINT = '#2e3842';
const PAINT_MAT = { color: PAINT, metalness: 0.52, roughness: 0.3, envMapIntensity: 1.1 };
const GLASS = {
  color: '#8ab0d0',
  metalness: 0.02,
  roughness: 0.06,
  transparent: true,
  opacity: 0.55,
  emissive: '#4a78a8',
  emissiveIntensity: 0.95,
};
const TRIM = { color: '#14181c', metalness: 0.78, roughness: 0.32 };
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

/** Recessed glass pane — sits behind the door skin, never in front */
function DoorGlass({
  position,
  width,
  height,
  depth = 0.025,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  depth?: number;
}) {
  const t = 0.022;
  const frameZ = 0.03;
  const glassZ = -0.012;
  return (
    <group position={position}>
      <mesh position={[0, height / 2 + t / 2, frameZ]} castShadow>
        <boxGeometry args={[width + t * 2, t, 0.04]} />
        <meshStandardMaterial {...PAINT_MAT} />
      </mesh>
      <mesh position={[0, -(height / 2 + t / 2), frameZ]} castShadow>
        <boxGeometry args={[width + t * 2, t, 0.04]} />
        <meshStandardMaterial {...PAINT_MAT} />
      </mesh>
      <mesh position={[-(width / 2 + t / 2), 0, frameZ]} castShadow>
        <boxGeometry args={[t, height, 0.04]} />
        <meshStandardMaterial {...PAINT_MAT} />
      </mesh>
      <mesh position={[width / 2 + t / 2, 0, frameZ]} castShadow>
        <boxGeometry args={[t, height, 0.04]} />
        <meshStandardMaterial {...PAINT_MAT} />
      </mesh>
      <mesh position={[0, 0, glassZ]} renderOrder={1}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial {...GLASS} depthWrite={false} />
      </mesh>
      <mesh position={[0, height / 2, glassZ + 0.01]}>
        <boxGeometry args={[width, 0.012, 0.018]} />
        <meshStandardMaterial {...TRIM} />
      </mesh>
      <mesh position={[0, -height / 2, glassZ + 0.01]}>
        <boxGeometry args={[width, 0.012, 0.018]} />
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

const CAMERA: [number, number, number] = [2.9, 0.5, 3.5];

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
      <ambientLight intensity={0.42} color="#90a0b0" />
      <spotLight position={[4, 4, 5]} angle={0.55} intensity={5} color="#ffc870" castShadow />
      <spotLight position={[-3, 3, 4]} angle={0.6} intensity={2.2} color="#a0c8e8" />
      <pointLight position={[0.3, 0.8, 0.6]} intensity={1.4} color="#90b8e0" distance={3} />

      <group position={[0, -0.26, 0]} rotation={[0, -0.38, 0]}>
        <RoundedBox args={[2.15, 0.13, 0.48]} radius={0.02} position={[0.05, 0.03, 0.02]} castShadow>
          <meshStandardMaterial {...PAINT_MAT} />
        </RoundedBox>

        <mesh position={[0.08, 0.24, 0.24]} castShadow>
          <boxGeometry args={[0.92, 0.3, 0.05]} />
          <meshStandardMaterial {...PAINT_MAT} />
        </mesh>

        <mesh position={[0.08, 0.7, 0.24]} castShadow>
          <boxGeometry args={[0.92, 0.14, 0.05]} />
          <meshStandardMaterial {...PAINT_MAT} />
        </mesh>

        <mesh position={[0.08, 0.42, 0.255]}>
          <boxGeometry args={[0.96, 0.035, 0.04]} />
          <meshStandardMaterial color="#222830" metalness={0.55} roughness={0.28} />
        </mesh>
        <mesh position={[0.08, 0.62, 0.255]}>
          <boxGeometry args={[0.96, 0.035, 0.04]} />
          <meshStandardMaterial color="#222830" metalness={0.55} roughness={0.28} />
        </mesh>

        <DoorGlass position={[0.08, 0.52, 0.24]} width={0.68} height={0.24} />

        <group position={[0.52, 0.5, 0.18]} rotation={[0, -0.35, 0]}>
          <mesh position={[0, 0, -0.01]} renderOrder={1}>
            <boxGeometry args={[0.32, 0.18, 0.025]} />
            <meshStandardMaterial {...GLASS} depthWrite={false} />
          </mesh>
          <mesh position={[0, 0.1, 0.02]} castShadow>
            <boxGeometry args={[0.34, 0.025, 0.04]} />
            <meshStandardMaterial {...PAINT_MAT} />
          </mesh>
          <mesh position={[0, -0.1, 0.02]} castShadow>
            <boxGeometry args={[0.34, 0.025, 0.04]} />
            <meshStandardMaterial {...PAINT_MAT} />
          </mesh>
        </group>

        <mesh position={[-0.18, 0.58, 0.16]} castShadow>
          <boxGeometry args={[0.1, 0.42, 0.4]} />
          <meshStandardMaterial {...PAINT_MAT} />
        </mesh>

        <RoundedBox args={[1.05, 0.07, 0.38]} radius={0.02} position={[0.15, 0.8, 0.14]} castShadow>
          <meshStandardMaterial {...PAINT_MAT} />
        </RoundedBox>

        <mesh position={[0.72, 0.18, 0.1]} rotation={[0, -0.25, 0]} castShadow>
          <boxGeometry args={[0.35, 0.22, 0.42]} />
          <meshStandardMaterial {...PAINT_MAT} />
        </mesh>

        <mesh position={[-0.55, 0.32, 0.08]} rotation={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.4, 0.38, 0.38]} />
          <meshStandardMaterial {...PAINT_MAT} />
        </mesh>

        <mesh position={[0.28, 0.2, 0.2]} castShadow>
          <boxGeometry args={[0.55, 0.18, 0.06]} />
          <meshStandardMaterial {...PAINT_MAT} />
        </mesh>
        <mesh position={[0.28, 0.28, 0.22]}>
          <torusGeometry args={[0.46, 0.03, 8, 28, Math.PI * 0.92]} />
          <meshStandardMaterial color="#222830" metalness={0.55} roughness={0.38} />
        </mesh>

        <mesh
          position={[-0.08, 0.1, 0.26]}
          onClick={tap(interactive, onHotspotClick, 'jack-point')}
          castShadow
        >
          <boxGeometry args={[0.5, 0.04, 0.05]} />
          <meshStandardMaterial
            color={sel('jack-point') ? '#f5c518' : '#5a6068'}
            metalness={0.72}
            roughness={0.32}
            {...highlight(sel('jack-point'))}
          />
        </mesh>

        <Wheel
          position={[0.3, -0.08, 0.12]}
          rotation={[0, 0.1, 0]}
          onLugClick={onHotspotClick}
          selLug={sel('lug-nuts')}
          interactive={interactive}
        />

        <Wheel
          position={[-0.42, -0.12, -0.08]}
          rotation={[0, -0.45, 0]}
          scale={0.78}
          interactive={false}
          showLabel={false}
          dimmed
        />
      </group>

      <ScissorJack
        position={[-0.12, -0.55, 0.68]}
        selected={sel('jack')}
        onClick={onHotspotClick}
        interactive={interactive}
      />

      <mesh
        position={[-0.5, -0.82, 0.88]}
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

      <group
        position={[1.3, -0.78, 0.22]}
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
