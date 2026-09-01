import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { ThreeEvent } from '@react-three/fiber';

interface Props {
  position: [number, number, number];
  id: string;
  label: string;
  selected?: boolean;
  highlighted?: boolean;
  onClick?: (id: string) => void;
  interactive?: boolean;
}

export default function WorkHotspot({
  position,
  id,
  label,
  selected,
  highlighted,
  onClick,
  interactive,
}: Props) {
  const ring = useRef<Group>(null);
  const active = selected || highlighted;

  useFrame(({ clock }) => {
    if (ring.current && active) {
      ring.current.rotation.z = clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={position}>
      {active && (
        <group ref={ring}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <ringGeometry args={[0.14, 0.2, 32]} />
            <meshBasicMaterial color="#f5c518" transparent opacity={0.7} />
          </mesh>
          <spotLight
            position={[0, 0.6, 0.2]}
            angle={0.4}
            penumbra={0.8}
            intensity={selected ? 2.5 : 1.2}
            color="#ffb347"
            distance={2}
            castShadow
          />
        </group>
      )}
      <mesh
        onClick={
          interactive && onClick
            ? (e: ThreeEvent<MouseEvent>) => {
                e.stopPropagation();
                onClick(id);
              }
            : undefined
        }
      >
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial
          color={active ? '#f5c518' : '#ffb347'}
          emissive={active ? '#f5c518' : '#cc8800'}
          emissiveIntensity={active ? 1.2 : 0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
      {label && (
        <mesh position={[0, 0.22, 0]}>
          <planeGeometry args={[0.5, 0.08]} />
          <meshBasicMaterial color="#0d0c0a" transparent opacity={0.75} />
        </mesh>
      )}
    </group>
  );
}
