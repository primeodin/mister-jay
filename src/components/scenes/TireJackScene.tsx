import { Torus, RoundedBox, Text, Cylinder } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import SceneCanvas, { GarageFloor } from './SceneCanvas';
import SceneCallouts from './SceneCallouts';
import type { SceneProps } from './sceneTypes';

const PAINT = '#3d4a58';
const CLEARCOAT = { color: PAINT, metalness: 0.72, roughness: 0.18, envMapIntensity: 1.2 };
const GLASS = { color: '#0a1018', metalness: 0.9, roughness: 0.05, transparent: true, opacity: 0.72 };
const RUBBER = { color: '#141414', roughness: 0.94, metalness: 0 };
const RIM = { color: '#707880', metalness: 0.82, roughness: 0.22 };
const JACK = { color: '#c41e1e', metalness: 0.65, roughness: 0.38 };

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
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onLugClick?: (id: string) => void;
  selLug?: boolean;
  interactive?: boolean;
  showLabel?: boolean;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Torus args={[0.44, 0.13, 20, 36]} castShadow>
        <meshStandardMaterial {...RUBBER} />
      </Torus>
      {/* Sidewall shoulder */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.44, 0.045, 8, 32]} />
        <meshStandardMaterial color="#222" roughness={0.92} />
      </mesh>
      {/* Tread blocks */}
      {Array.from({ length: 18 }, (_, i) => {
        const a = (i / 18) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[0.5 * Math.cos(a), 0.5 * Math.sin(a), 0]}
            rotation={[0, 0, a]}
          >
            <boxGeometry args={[0.06, 0.035, 0.12]} />
            <meshStandardMaterial color="#0e0e0e" roughness={0.98} />
          </mesh>
        );
      })}
      <Cylinder args={[0.3, 0.3, 0.16, 24]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <meshStandardMaterial {...RIM} />
      </Cylinder>
      <Cylinder args={[0.18, 0.18, 0.17, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#444" metalness={0.7} roughness={0.35} />
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
      {showLabel && (
        <Text position={[0, -0.62, 0.1]} fontSize={0.055} color="#666" anchorX="center">
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
    shape.lineTo(1.85, 0);
    shape.lineTo(1.85, 0.5);
    shape.quadraticCurveTo(1.35, 1.05, 0.55, 0.95);
    shape.quadraticCurveTo(0.15, 0.88, 0, 0.72);
    shape.closePath();
    return shape;
  }, []);

  const roofCurve = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(1.6, 0.15);
    shape.quadraticCurveTo(1.2, 0.55, 0.4, 0.5);
    shape.lineTo(0, 0.35);
    shape.closePath();
    return shape;
  }, []);

  return (
    <SceneCanvas variant={variant} cameraPosition={[1.9, 0.6, 3.1]} fov={36} floorY={-0.95}>
      <GarageFloor y={-0.95} />

      <group position={[-0.55, -0.35, 0]} rotation={[0, -0.32, 0]}>
        {/* Rocker / sill */}
        <RoundedBox args={[2.5, 0.14, 0.58]} radius={0.02} position={[0.55, 0.05, 0]} castShadow>
          <meshStandardMaterial {...CLEARCOAT} />
        </RoundedBox>

        {/* Pinch weld */}
        <mesh
          position={[0.18, 0.14, 0.16]}
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
        <mesh position={[0.65, 0.52, 0]} castShadow>
          <extrudeGeometry
            args={[
              fenderCurve,
              { depth: 0.58, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.025, bevelSegments: 3 },
            ]}
          />
          <meshStandardMaterial {...CLEARCOAT} />
        </mesh>

        {/* Cabin / C-pillar */}
        <mesh position={[0.05, 0.95, 0.12]} castShadow>
          <boxGeometry args={[0.12, 0.75, 0.5]} />
          <meshStandardMaterial {...CLEARCOAT} />
        </mesh>

        {/* Roof line */}
        <mesh position={[0.55, 1.35, 0.15]} castShadow>
          <extrudeGeometry args={[roofCurve, { depth: 0.48, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.015, bevelSegments: 2 }]} />
          <meshStandardMaterial {...CLEARCOAT} />
        </mesh>

        {/* Rear door glass */}
        <mesh position={[0.42, 0.88, 0.42]} castShadow>
          <boxGeometry args={[0.55, 0.38, 0.04]} />
          <meshStandardMaterial {...GLASS} />
        </mesh>
        {/* Quarter window */}
        <mesh position={[1.15, 0.78, 0.44]} rotation={[0, 0, -0.35]} castShadow>
          <boxGeometry args={[0.35, 0.22, 0.04]} />
          <meshStandardMaterial {...GLASS} />
        </mesh>
        {/* Window trim */}
        <mesh position={[0.42, 0.88, 0.46]}>
          <boxGeometry args={[0.58, 0.41, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Wheel arch outer lip */}
        <mesh position={[0.9, 0.38, 0.14]}>
          <torusGeometry args={[0.52, 0.025, 8, 28, Math.PI]} />
          <meshStandardMaterial color="#2a3038" metalness={0.6} roughness={0.35} />
        </mesh>
        {/* Wheel arch liner — deep well */}
        <mesh position={[0.88, 0.22, 0.02]}>
          <sphereGeometry args={[0.5, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#080808" roughness={1} />
        </mesh>
        <mesh position={[0.88, 0.15, -0.08]}>
          <torusGeometry args={[0.46, 0.03, 8, 24, Math.PI * 0.85]} />
          <meshStandardMaterial color="#111" roughness={0.95} />
        </mesh>

        {/* Door gap */}
        <mesh position={[0.12, 0.55, 0.58]}>
          <boxGeometry args={[0.008, 0.75, 0.52]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
        {/* Body line crease */}
        <mesh position={[0.7, 0.42, 0.58]}>
          <boxGeometry args={[1.2, 0.006, 0.01]} />
          <meshStandardMaterial color="#2a3238" metalness={0.5} />
        </mesh>
      </group>

      {/* Near wheel */}
      <Wheel
        position={[0.4, -0.12, 0.38]}
        rotation={[0, 0.18, 0]}
        onLugClick={onHotspotClick}
        selLug={sel('lug-nuts')}
        interactive={interactive}
      />

      {/* Far-side wheel hint */}
      <Wheel
        position={[0.15, -0.18, -0.22]}
        rotation={[0, -0.55, 0]}
        scale={0.88}
        interactive={false}
        showLabel={false}
      />

      <ScissorJack
        position={[0.08, -0.55, 0.58]}
        selected={sel('jack')}
        onClick={onHotspotClick}
        interactive={interactive}
      />

      {/* Wheel chock */}
      <mesh
        position={[-0.5, -0.82, 0.78]}
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
        position={[1.5, -0.72, -0.12]}
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
