import { Torus, RoundedBox, Text, Cylinder } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import SceneCanvas, { GarageFloor } from './SceneCanvas';
import SceneCallouts from './SceneCallouts';
import type { SceneProps } from './sceneTypes';

const PAINT = '#5a6d80';
const CLEARCOAT = { color: PAINT, metalness: 0.55, roughness: 0.2, envMapIntensity: 1.6 };
/** Visible in screenshots — blue-tinted night glass */
const GLASS = {
  color: '#9ab8d8',
  metalness: 0.05,
  roughness: 0.04,
  transparent: true,
  opacity: 0.82,
  emissive: '#4a78a8',
  emissiveIntensity: 0.65,
};
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
  const rubberColor = dimmed ? '#111' : '#1c1c1c';
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Torus args={[0.44, 0.13, 20, 36]} castShadow>
        <meshStandardMaterial color={rubberColor} roughness={0.9} metalness={0} />
      </Torus>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.44, 0.05, 8, 32]} />
        <meshStandardMaterial color={dimmed ? '#1a1a1a' : '#333'} roughness={0.88} />
      </mesh>
      {!dimmed &&
        Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[0.48 * Math.cos(a), 0.48 * Math.sin(a), 0]}
              rotation={[0, 0, a]}
            >
              <boxGeometry args={[0.07, 0.04, 0.1]} />
              <meshStandardMaterial color="#0a0a0a" roughness={0.98} />
            </mesh>
          );
        })}
      <Cylinder args={[0.3, 0.3, 0.16, 24]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <meshStandardMaterial {...RIM} color={dimmed ? '#555' : RIM.color} />
      </Cylinder>
      {!dimmed &&
        [0, 72, 144, 216, 288].map((deg) => (
          <mesh
            key={deg}
            position={[
              0.36 * Math.cos((deg * Math.PI) / 180),
              0.36 * Math.sin((deg * Math.PI) / 180),
              0.09,
            ]}
            onClick={tap(interactive, onLugClick, 'lug-nuts')}
            castShadow
          >
            <cylinderGeometry args={[0.035, 0.035, 0.04, 6]} />
            <meshStandardMaterial
              color={selLug ? '#f5c518' : '#c8ccd0'}
              metalness={0.92}
              roughness={0.15}
              {...highlight(!!selLug)}
            />
          </mesh>
        ))}
      {showLabel && (
        <Text position={[0, -0.62, 0.12]} fontSize={0.065} color="#888" anchorX="center">
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
      <mesh position={[-0.08, 0.05, 0]} rotation={[0, 0, 0.55]} castShadow>
        <boxGeometry args={[0.035, 0.42, 0.025]} />
        <meshStandardMaterial {...JACK} {...h} />
      </mesh>
      <mesh position={[0.08, 0.05, 0]} rotation={[0, 0, -0.55]} castShadow>
        <boxGeometry args={[0.035, 0.42, 0.025]} />
        <meshStandardMaterial {...JACK} {...h} />
      </mesh>
      <mesh position={[0, -0.18, 0]} castShadow>
        <boxGeometry args={[0.28, 0.035, 0.18]} />
        <meshStandardMaterial color="#333" metalness={0.75} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.06, 12]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function TireJackScene({
  selectedIds = [],
  highlightIds = [],
  onHotspotClick,
  interactive,
  variant = 'embedded',
  callouts = [],
}: SceneProps) {
  const sel = (id: string) => selectedIds.includes(id) || highlightIds.includes(id);

  const bodySide = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.2, 0);
    shape.lineTo(2.0, 0);
    shape.lineTo(2.0, 0.45);
    shape.quadraticCurveTo(1.5, 0.75, 0.9, 0.7);
    shape.lineTo(0.1, 0.55);
    shape.lineTo(-0.2, 0.35);
    shape.closePath();
    return shape;
  }, []);

  const camera =
    variant === 'learn'
      ? ([2.4, 0.75, 2.2] as [number, number, number])
      : variant === 'hero'
        ? ([2.5, 0.85, 2.3] as [number, number, number])
        : ([2.2, 0.55, 2.1] as [number, number, number]);

  return (
    <SceneCanvas variant={variant} cameraPosition={camera} fov={34} floorY={-0.95}>
      <GarageFloor y={-0.95} />
      <ambientLight intensity={0.32} color="#8090a0" />
      <spotLight position={[3.5, 3, 4]} angle={0.5} intensity={5} color="#ffc870" castShadow />
      <spotLight position={[-2, 2.5, 3]} angle={0.55} intensity={2.5} color="#90b0d0" />
      <pointLight position={[1.2, 1.2, 2]} intensity={0.6} color="#c0d8f0" distance={8} />
      {/* Cabin interior glow — visible through glass */}
      <pointLight position={[0.5, 0.9, 0.3]} intensity={0.9} color="#80a8d8" distance={2.5} />

      <group position={[-0.35, -0.32, 0]} rotation={[0, -0.55, 0]}>
        {/* Lower body / rocker */}
        <RoundedBox args={[2.3, 0.16, 0.62]} radius={0.025} position={[0.65, 0.06, 0]} castShadow>
          <meshStandardMaterial {...CLEARCOAT} />
        </RoundedBox>

        {/* Side body panel */}
        <mesh position={[0.7, 0.42, 0]} castShadow>
          <extrudeGeometry
            args={[bodySide, { depth: 0.62, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }]}
          />
          <meshStandardMaterial {...CLEARCOAT} />
        </mesh>

        {/* Greenhouse rail — top of doors */}
        <mesh position={[0.55, 0.88, 0.28]} castShadow>
          <boxGeometry args={[1.35, 0.06, 0.52]} />
          <meshStandardMaterial color="#3a4550" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* DOOR WINDOW — faces camera */}
        <mesh position={[0.55, 0.72, 0.58]} castShadow>
          <boxGeometry args={[0.62, 0.32, 0.05]} />
          <meshStandardMaterial {...GLASS} />
        </mesh>
        {/* Quarter window */}
        <mesh position={[1.15, 0.68, 0.48]} rotation={[0, -0.35, 0]} castShadow>
          <boxGeometry args={[0.42, 0.24, 0.05]} />
          <meshStandardMaterial {...GLASS} />
        </mesh>
        {/* Rear side glass — third pane for greenhouse read */}
        <mesh position={[0.2, 0.75, 0.52]} rotation={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.28, 0.22, 0.04]} />
          <meshStandardMaterial {...GLASS} />
        </mesh>
        {/* Window frames — black trim makes glass read */}
        <mesh position={[0.55, 0.72, 0.61]}>
          <boxGeometry args={[0.66, 0.36, 0.02]} />
          <meshStandardMaterial color="#111" metalness={0.7} roughness={0.35} />
        </mesh>
        <mesh position={[0.55, 0.72, 0.59]}>
          <boxGeometry args={[0.64, 0.02, 0.04]} />
          <meshStandardMaterial color="#111" metalness={0.7} />
        </mesh>

        {/* C-pillar */}
        <mesh position={[0.08, 0.82, 0.25]} castShadow>
          <boxGeometry args={[0.1, 0.55, 0.48]} />
          <meshStandardMaterial {...CLEARCOAT} />
        </mesh>

        {/* Roof */}
        <mesh position={[0.7, 1.02, 0.22]} castShadow>
          <boxGeometry args={[1.2, 0.08, 0.5]} />
          <meshStandardMaterial {...CLEARCOAT} />
        </mesh>

        {/* Pinch weld */}
        <mesh
          position={[0.22, 0.16, 0.22]}
          onClick={tap(interactive, onHotspotClick, 'jack-point')}
          castShadow
        >
          <boxGeometry args={[0.5, 0.04, 0.06]} />
          <meshStandardMaterial
            color={sel('jack-point') ? '#f5c518' : '#6a7078'}
            metalness={0.7}
            roughness={0.35}
            {...highlight(sel('jack-point'))}
          />
        </mesh>

        {/* Wheel arch */}
        <mesh position={[0.95, 0.32, 0.18]}>
          <torusGeometry args={[0.5, 0.03, 8, 28, Math.PI]} />
          <meshStandardMaterial color="#2a3038" metalness={0.55} roughness={0.4} />
        </mesh>
        <mesh position={[0.92, 0.18, 0.05]}>
          <sphereGeometry args={[0.46, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#0c0c0c" roughness={1} />
        </mesh>
      </group>

      <Wheel
        position={[0.55, -0.1, 0.42]}
        rotation={[0, 0.1, 0]}
        onLugClick={onHotspotClick}
        selLug={sel('lug-nuts')}
        interactive={interactive}
      />

      <Wheel
        position={[0.05, -0.14, -0.05]}
        rotation={[0, -0.7, 0]}
        scale={0.82}
        interactive={false}
        showLabel={false}
        dimmed
      />

      <ScissorJack
        position={[0.12, -0.52, 0.62]}
        selected={sel('jack')}
        onClick={onHotspotClick}
        interactive={interactive}
      />

      <mesh
        position={[-0.35, -0.8, 0.82]}
        rotation={[0, 0.35, 0.12]}
        onClick={tap(interactive, onHotspotClick, 'block-wheel')}
        castShadow
      >
        <boxGeometry args={[0.22, 0.1, 0.14]} />
        <meshStandardMaterial
          color={sel('block-wheel') ? '#f5c518' : '#6b4423'}
          roughness={0.88}
          {...highlight(sel('block-wheel'))}
        />
      </mesh>

      <group
        position={[1.55, -0.7, 0.05]}
        rotation={[Math.PI / 2, 0, 0.25]}
        onClick={tap(interactive, onHotspotClick, 'spare')}
      >
        <Torus args={[0.36, 0.11, 16, 32]}>
          <meshStandardMaterial
            color={sel('spare') ? '#f5c518' : '#1a1a1a'}
            roughness={0.9}
            {...highlight(sel('spare'))}
          />
        </Torus>
        <Cylinder args={[0.24, 0.24, 0.12, 20]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial {...RIM} />
        </Cylinder>
      </group>

      <SceneCallouts callouts={callouts} />
    </SceneCanvas>
  );
}
