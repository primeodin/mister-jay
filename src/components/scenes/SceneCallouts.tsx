import { Html } from '@react-three/drei';
import type { SceneCallout } from './sceneAnnotations';

interface Props {
  callouts: SceneCallout[];
}

/** Compact on-object markers — step copy lives in the Learn bottom sheet. */
export default function SceneCallouts({ callouts }: Props) {
  return (
    <>
      {callouts.map((c) => (
        <Html key={c.id} position={c.position} center distanceFactor={5} zIndexRange={[100, 0]}>
          <div className={`scene-marker${c.danger ? ' scene-marker--danger' : ''}`}>
            <span className="scene-marker-dot" aria-hidden="true" />
            <span className="scene-marker-label stamp">{c.title}</span>
          </div>
        </Html>
      ))}
    </>
  );
}
