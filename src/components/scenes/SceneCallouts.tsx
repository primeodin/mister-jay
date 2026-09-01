import { Html } from '@react-three/drei';
import type { SceneCallout } from './sceneAnnotations';

interface Props {
  callouts: SceneCallout[];
}

export default function SceneCallouts({ callouts }: Props) {
  return (
    <>
      {callouts.map((c) => (
        <Html key={c.id} position={c.position} center distanceFactor={4} zIndexRange={[100, 0]}>
          <div className={`scene-callout${c.danger ? ' scene-callout--danger' : ''}`}>
            <span className="scene-callout-line" aria-hidden="true" />
            <div className="scene-callout-card">
              <strong className="stamp">{c.title}</strong>
              {c.body && <p>{c.body}</p>}
            </div>
          </div>
        </Html>
      ))}
    </>
  );
}
