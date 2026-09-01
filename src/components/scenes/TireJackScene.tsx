import { Torus, RoundedBox, Text, Cylinder } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import SceneCanvas, { GarageFloor } from './SceneCanvas';
import SceneCallouts from './SceneCallouts';
import type { SceneProps } from './sceneTypes';

const PAINT = '#3d4a58';
const PAINT_METAL = { color: PAINT, metalness: 0.55, roughness: 0.35 };
const RUBBER = { color: '#1a1a1a', roughness: 0.92, metalness: 0 };
const RIM = { color: '#707880', metalness: 0.8, roughness: 0.28 };
const JACK = { color: '#c41e1e', metalness: 0.65, roughness: 0.4 };

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
  onLugClick,
  selLug,
  interactive,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  onLugClick?: (id: string) => void;
  selLug?: boolean;
  interactive?: boolean;
}) {
  return (
    <group position={position} rotation={rotation}>
      <Torus args={[0.44, 0.13, 20, 36]} castShadow>
        <meshStandardMaterial {...RUBBER} />
      </Torus>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.44, 0.04, 8, 32]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.95} />
      </mesh>
      <Cylinder args={[0.3, 0.3, 0.16, 24]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <meshStandardMaterial {...RIM} />
      </Cylinder>
      <Cylinder args={[0.18, 0.18, 0.17, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#444" metalness={0.7} roughness={0.4} />
      </Cylinder>
      {[0, 72, 144, 216, 288].map((deg) => (
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
            color={selLug ? '#f5c518' : '#b8bcc0'}
            metalness={0.92}
            roughness={0.15}
            {...highlight(!!selLug)}
          />
        </mesh>
      ))}
      <Text position={[0, -0.62, 0.1]} fontSize={0.055} color="#555" anchorX="center" rotation={[0, 0, 0]}>
        RADIAL T/A
      </Text>
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
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[0.12, 0.03, 0.08]} />
        <meshStandardMaterial color="#aaa" metalness={0.85} />
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

  const fenderCurve = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(1.8, 0);
    shape.lineTo(1.8, 0.55);
    shape.quadraticCurveTo(1.2, 0.95, 0.5, 0.85);
    shape.lineTo(0, 0.7);
    shape.closePath();
    return shape;
  }, []);

  return (
    <SceneCanvas variant={variant} cameraPosition={[1.8, 0.55, 3.2]} fov={38} floorY={-0.95}>
      <GarageFloor y={-0.95} />
      <group position={[-0.6, -0.35, 0]} rotation={[0, -0.35, 0]}>
        {/* Rocker / sill */}
        <RoundedBox args={[2.4, 0.14, 0.55]} radius={0.02} position={[0.5, 0.05, 0]} castShadow>
          <meshStandardMaterial {...PAINT_METAL} />
        </RoundedBox>
        {/* Pinch weld seam */}
        <mesh
          position={[0.15, 0.14, 0.15]}
          onClick={tap(interactive, onHotspotClick, 'jack-point')}
          castShadow
        >
          <boxGeometry args={[0.55, 0.04, 0.06]} />
          <meshStandardMaterial
            color={sel('jack-point') ? '#f5c518' : '#5a6068'}
            metalness={0.7}
            roughness={0.35}
            {...highlight(sel('jack-point'))}
          />
        </mesh>
        {/* Quarter panel */}
        <mesh position={[0.6, 0.55, 0]} castShadow>
          <extrudeGeometry args={[fenderCurve, { depth: 0.55, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }]} />
          <meshStandardMaterial {...PAINT_METAL} />
        </mesh>
        {/* Wheel arch liner */}
        <mesh position={[0.85, 0.35, 0.12]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.5, 0.04, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        {/* Wheel arch shadow cavity */}
        <mesh position={[0.85, 0.2, -0.05]}>
          <sphereGeometry args={[0.48, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#0a0a0a" roughness={1} />
        </mesh>
        {/* Door gap line */}
        <mesh position={[0.1, 0.5, 0.56]}>
          <boxGeometry args={[0.008, 0.7, 0.5]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </group>

      <Wheel
        position={[0.35, -0.12, 0.35]}
        rotation={[0, 0.2, 0]}
        onLugClick={onHotspotClick}
        selLug={sel('lug-nuts')}
        interactive={interactive}
      />

      <ScissorJack
        position={[0.05, -0.55, 0.55]}
        selected={sel('jack')}
        onClick={onHotspotClick}
        interactive={interactive}
      />

      {/* Wheel chock */}
      <mesh
        position={[-0.55, -0.82, 0.75]}
        rotation={[0, 0.4, 0.15]}
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

      {/* Spare tire */}
      <group
        position={[1.45, -0.72, -0.15]}
        rotation={[Math.PI / 2, 0, 0.3]}
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
