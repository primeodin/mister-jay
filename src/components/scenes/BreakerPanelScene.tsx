import { RoundedBox, Text } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import SceneCanvas, { GarageFloor, Screw } from './SceneCanvas';
import SceneCallouts from './SceneCallouts';
import type { SceneProps } from './sceneTypes';

const STEEL = { color: '#8a9098', metalness: 0.72, roughness: 0.38 };
const STEEL_DARK = { color: '#5a6068', metalness: 0.68, roughness: 0.42 };
const DEAD_FRONT = { color: '#2a2a2e', metalness: 0.35, roughness: 0.5 };

function ToggleBreaker({
  position,
  id,
  label,
  width = 0.3,
  tripped,
  selected,
  highlighted,
  onClick,
  interactive,
  main,
}: {
  position: [number, number, number];
  id: string;
  label: string;
  width?: number;
  tripped?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  onClick?: (id: string) => void;
  interactive?: boolean;
  main?: boolean;
}) {
  const active = selected || highlighted;
  const handleY = tripped ? 0.02 : main ? 0.16 : 0.12;
  const handleRot = tripped ? 0.15 : 0;

  return (
    <group position={position}>
      <RoundedBox
        args={[width, main ? 0.58 : 0.48, 0.14]}
        radius={0.015}
        smoothness={4}
        castShadow
        onClick={
          interactive && onClick
            ? (e: ThreeEvent<MouseEvent>) => {
                e.stopPropagation();
                onClick(id);
              }
            : undefined
        }
      >
        <meshStandardMaterial
          {...DEAD_FRONT}
          emissive={active ? '#f5c518' : '#000'}
          emissiveIntensity={active ? 0.35 : 0}
        />
      </RoundedBox>
      {/* Toggle handle - L shape */}
      <group position={[0, handleY, 0.09]} rotation={[0, 0, handleRot]}>
        <mesh castShadow>
          <boxGeometry args={[0.045, main ? 0.2 : 0.16, 0.035]} />
          <meshStandardMaterial
            color={tripped ? '#f5c518' : '#e0e4e8'}
            metalness={0.82}
            roughness={0.22}
          />
        </mesh>
        <mesh position={[0, main ? -0.1 : -0.08, 0.02]} castShadow>
          <boxGeometry args={[0.08, 0.035, 0.03]} />
          <meshStandardMaterial color={tripped ? '#d4a010' : '#ccc'} metalness={0.8} roughness={0.25} />
        </mesh>
      </group>
      <Text position={[0, -0.34, 0.08]} fontSize={main ? 0.065 : 0.05} color={active ? '#f5c518' : '#6a6e78'} anchorX="center">
        {label}
      </Text>
    </group>
  );
}

export default function BreakerPanelScene({
  selectedIds = [],
  highlightIds = [],
  onHotspotClick,
  interactive,
  variant = 'embedded',
  callouts = [],
}: SceneProps) {
  const sel = (id: string) => selectedIds.includes(id) || highlightIds.includes(id);

  return (
    <SceneCanvas variant={variant} cameraPosition={[0, 0.35, 3.4]} fov={38} floorY={-1.2}>
      <GarageFloor y={-1.2} puddle={[0.35, 0.5, 1.05]} />

      <group position={[0, 0.05, 0]}>
        {/* Outer enclosure - thick steel box */}
        <RoundedBox args={[2.7, 2.25, 0.18]} radius={0.03} position={[0, 0, -0.1]} castShadow>
          <meshStandardMaterial {...STEEL} />
        </RoundedBox>
        {/* Side knockout stamps */}
        {[-1.35, 1.35].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            {[0.4, 0, -0.4].map((y) => (
              <mesh key={y} position={[0, y, 0]}>
                <circleGeometry args={[0.06, 16]} />
                <meshStandardMaterial color="#6a7078" metalness={0.6} roughness={0.5} />
              </mesh>
            ))}
          </group>
        ))}
        {/* Corner screws */}
        <Screw position={[-1.25, 1.05, 0.02]} />
        <Screw position={[1.25, 1.05, 0.02]} />
        <Screw position={[-1.25, -1.05, 0.02]} />
        <Screw position={[1.25, -1.05, 0.02]} />

        {/* Inner dead front */}
        <RoundedBox args={[2.38, 1.98, 0.05]} radius={0.015} position={[0, 0, 0.04]}>
          <meshStandardMaterial color="#141416" metalness={0.25} roughness={0.6} />
        </RoundedBox>

        {/* Rust bloom on enclosure surface - bottom left */}
        <mesh position={[-1.05, -0.75, 0.1]}>
          <planeGeometry args={[0.45, 0.35]} />
          <meshStandardMaterial
            color="#6b3a20"
            roughness={0.95}
            metalness={0.1}
            emissive={sel('rust') ? '#8b4513' : '#3a2010'}
            emissiveIntensity={sel('rust') ? 0.25 : 0.08}
          />
        </mesh>

        {/* Scorch at lug area - bottom right */}
        <mesh position={[1.05, -0.72, 0.1]}>
          <planeGeometry args={[0.38, 0.28]} />
          <meshStandardMaterial
            color="#1a0a05"
            roughness={0.98}
            emissive={sel('scorch') ? '#441100' : '#220800'}
            emissiveIntensity={sel('scorch') ? 0.5 : 0.2}
          />
        </mesh>

        {/* Directory window with plastic cover */}
        <group position={[0, 0.9, 0.1]}>
          <mesh>
            <boxGeometry args={[1.85, 0.38, 0.025]} />
            <meshStandardMaterial {...STEEL_DARK} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[1.7, 0.3, 0.015]} />
            <meshStandardMaterial
              color="#e8e4d8"
              roughness={0.15}
              metalness={0.05}
              transparent
              opacity={0.85}
            />
          </mesh>
          <Text position={[0, 0, 0.04]} fontSize={0.07} color="#333" anchorX="center">
            PANEL DIRECTORY
          </Text>
        </group>

        <ToggleBreaker
          position={[0, 0.52, 0.1]}
          id="main"
          label="MAIN 100A"
          width={0.52}
          main
          selected={sel('main')}
          highlighted={highlightIds.includes('main')}
          onClick={onHotspotClick}
          interactive={interactive}
        />
        <ToggleBreaker position={[-0.7, 0.02, 0.1]} id="kitchen" label="KIT 20A" selected={sel('kitchen')} highlighted={highlightIds.includes('kitchen')} onClick={onHotspotClick} interactive={interactive} />
        <ToggleBreaker position={[-0.23, 0.02, 0.1]} id="bedroom" label="BED 15A" selected={sel('bedroom')} highlighted={highlightIds.includes('bedroom')} onClick={onHotspotClick} interactive={interactive} />
        <ToggleBreaker position={[0.23, 0.02, 0.1]} id="dryer" label="DRY 30A" selected={sel('dryer')} highlighted={highlightIds.includes('dryer')} onClick={onHotspotClick} interactive={interactive} />
        <ToggleBreaker position={[0.7, 0.02, 0.1]} id="unlabeled" label="???" tripped selected={sel('unlabeled')} highlighted={highlightIds.includes('unlabeled')} onClick={onHotspotClick} interactive={interactive} />
        <ToggleBreaker position={[-0.48, -0.48, 0.1]} id="garage" label="GAR 20A" selected={sel('garage')} onClick={onHotspotClick} interactive={interactive} />
        <ToggleBreaker position={[0.48, -0.48, 0.1]} id="ac" label="AC 30A" selected={sel('ac')} onClick={onHotspotClick} interactive={interactive} />

        {/* Wet floor hazard - clickable puddle zone */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0.35, -1.22, 0.9]}
          onClick={
            interactive && onHotspotClick
              ? (e: ThreeEvent<MouseEvent>) => {
                  e.stopPropagation();
                  onHotspotClick('water');
                }
              : undefined
          }
        >
          <circleGeometry args={[0.45, 32]} />
          <meshStandardMaterial
            color="#1a3040"
            roughness={0.06}
            metalness={0.6}
            transparent
            opacity={sel('water') ? 0.8 : 0.5}
            emissive={sel('water') ? '#204060' : '#000'}
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      <SceneCallouts callouts={callouts} />
    </SceneCanvas>
  );
}
