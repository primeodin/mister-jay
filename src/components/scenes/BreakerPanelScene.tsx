import { RoundedBox, Text } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import SceneCanvas from './SceneCanvas';
import WorkHotspot from './WorkHotspot';
import type { SceneProps } from './sceneTypes';

function ShopFloor() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#2c2a26" roughness={0.92} metalness={0.04} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.3, -1.14, 1.1]}>
        <circleGeometry args={[0.55, 32]} />
        <meshStandardMaterial
          color="#1a2838"
          roughness={0.15}
          metalness={0.35}
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
  );
}

function ToggleBreaker({
  position,
  id,
  label,
  width = 0.32,
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
  const toggleY = tripped ? -0.02 : main ? 0.14 : 0.1;

  return (
    <group position={position}>
      <RoundedBox
        args={[width, main ? 0.62 : 0.52, 0.12]}
        radius={0.02}
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
          color={active ? '#4a4030' : '#2e2e32'}
          metalness={0.55}
          roughness={0.38}
          emissive={active ? '#f5c518' : '#000000'}
          emissiveIntensity={active ? 0.35 : 0}
        />
      </RoundedBox>
      <mesh position={[0, toggleY, 0.08]} castShadow>
        <boxGeometry args={[0.06, main ? 0.22 : 0.18, 0.05]} />
        <meshStandardMaterial
          color={tripped ? '#f5c518' : '#d8dce0'}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
      <Text
        position={[0, -0.38, 0.07]}
        fontSize={main ? 0.07 : 0.055}
        color={active ? '#f5c518' : '#888890'}
        anchorX="center"
      >
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
}: SceneProps) {
  return (
    <SceneCanvas
      variant={variant}
      cameraPosition={[0, 0.4, 3.6]}
      fov={40}
    >
      <ShopFloor />
      <group position={[0, 0.1, 0]}>
        <RoundedBox args={[2.6, 2.2, 0.14]} radius={0.04} position={[0, 0, -0.08]}>
          <meshStandardMaterial color="#7a8088" metalness={0.65} roughness={0.42} />
        </RoundedBox>
        <RoundedBox args={[2.35, 1.95, 0.06]} radius={0.02} position={[0, 0, 0.02]}>
          <meshStandardMaterial color="#121214" metalness={0.3} roughness={0.55} />
        </RoundedBox>
        <mesh position={[0, 0.88, 0.08]}>
          <boxGeometry args={[1.8, 0.35, 0.02]} />
          <meshStandardMaterial color="#e8e4d8" roughness={0.9} />
        </mesh>
        <Text position={[0, 0.88, 0.1]} fontSize={0.09} color="#333" anchorX="center">
          PANEL DIRECTORY
        </Text>
        <mesh position={[-1.05, -0.55, 0.09]}>
          <planeGeometry args={[0.35, 0.25]} />
          <meshStandardMaterial color="#6b3a20" roughness={0.95} />
        </mesh>
        <mesh position={[1.05, -0.55, 0.09]}>
          <planeGeometry args={[0.3, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" emissive="#331100" emissiveIntensity={0.4} roughness={0.9} />
        </mesh>
        <ToggleBreaker
          position={[0, 0.55, 0.1]}
          id="main"
          label="MAIN 100A"
          width={0.55}
          main
          selected={selectedIds.includes('main')}
          highlighted={highlightIds.includes('main')}
          onClick={onHotspotClick}
          interactive={interactive}
        />
        <ToggleBreaker position={[-0.72, 0.05, 0.1]} id="kitchen" label="KIT 20A" selected={selectedIds.includes('kitchen')} highlighted={highlightIds.includes('kitchen')} onClick={onHotspotClick} interactive={interactive} />
        <ToggleBreaker position={[-0.24, 0.05, 0.1]} id="bedroom" label="BED 15A" selected={selectedIds.includes('bedroom')} highlighted={highlightIds.includes('bedroom')} onClick={onHotspotClick} interactive={interactive} />
        <ToggleBreaker position={[0.24, 0.05, 0.1]} id="dryer" label="DRY 30A" selected={selectedIds.includes('dryer')} highlighted={highlightIds.includes('dryer')} onClick={onHotspotClick} interactive={interactive} />
        <ToggleBreaker position={[0.72, 0.05, 0.1]} id="unlabeled" label="???" tripped selected={selectedIds.includes('unlabeled')} highlighted={highlightIds.includes('unlabeled')} onClick={onHotspotClick} interactive={interactive} />
        <ToggleBreaker position={[-0.48, -0.45, 0.1]} id="garage" label="GAR" selected={selectedIds.includes('garage')} highlighted={highlightIds.includes('garage')} onClick={onHotspotClick} interactive={interactive} />
        <ToggleBreaker position={[0.48, -0.45, 0.1]} id="ac" label="AC" selected={selectedIds.includes('ac')} highlighted={highlightIds.includes('ac')} onClick={onHotspotClick} interactive={interactive} />
        <WorkHotspot position={[-1.15, -0.85, 0.15]} id="rust" label="Rust" selected={selectedIds.includes('rust')} highlighted={highlightIds.includes('rust')} onClick={onHotspotClick} interactive={interactive} />
        <WorkHotspot position={[1.15, -0.85, 0.15]} id="scorch" label="Scorch" selected={selectedIds.includes('scorch')} highlighted={highlightIds.includes('scorch')} onClick={onHotspotClick} interactive={interactive} />
        <WorkHotspot position={[0.3, -1.05, 0.2]} id="water" label="Wet" selected={selectedIds.includes('water')} highlighted={highlightIds.includes('water')} onClick={onHotspotClick} interactive={interactive} />
      </group>
    </SceneCanvas>
  );
}
