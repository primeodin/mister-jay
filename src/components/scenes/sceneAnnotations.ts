import type { Scene3DId } from '../../types/sketch';

export interface SceneCallout {
  id: string;
  position: [number, number, number];
  title: string;
  body?: string;
  danger?: boolean;
}

/** 3D anchor positions for learn callouts per scene */
export const annotationAnchors: Record<Scene3DId, Record<string, [number, number, number]>> = {
  'breaker-panel': {
    main: [0, 0.9, 0.35],
    kitchen: [-0.72, 0.35, 0.35],
    bedroom: [-0.24, 0.35, 0.35],
    dryer: [0.72, 0.35, 0.35],
    rust: [-1.05, -0.7, 0.2],
    scorch: [1.05, -0.7, 0.2],
    water: [0.4, -1.05, 0.15],
    tripped: [-0.48, -0.2, 0.35],
    unlabeled: [0.72, 0.35, 0.35],
  },
  'car-battery': {
    negative: [-0.5, 0.55, 0.5],
    positive: [0.5, 0.55, 0.5],
    holddown: [0, 0.65, 0.35],
    corrosion: [0.55, 0.5, 0.35],
  },
  'tire-jack': {
    'jack-point': [-0.95, 0.15, 0.45],
    'lug-nuts': [0.55, 0.1, 0.55],
    jack: [0.15, -0.15, 0.55],
    spare: [1.35, -0.35, -0.2],
    'block-wheel': [-0.65, -0.75, 0.85],
  },
  motorcycle: {
    handlebars: [0.5, 0.65, 0.15],
    sidestand: [-0.55, -0.55, 0.25],
    slope: [0.8, -0.85, 1.1],
    sandals: [-0.3, -0.9, 0.5],
    boots: [0.3, -0.9, 0.5],
  },
};

export function buildCallouts(
  sceneId: Scene3DId | undefined,
  focusIds: string[] | undefined,
  title: string,
  body: string,
  danger?: string,
): SceneCallout[] {
  if (!sceneId || !focusIds?.length) return [];
  const anchors = annotationAnchors[sceneId];
  if (!anchors) return [];

  const callouts: SceneCallout[] = focusIds
    .filter((id) => anchors[id])
    .map((id) => ({
      id,
      position: anchors[id],
      title: id.replace(/-/g, ' ').toUpperCase(),
      body: focusIds.length === 1 ? body : undefined,
    }));

  if (callouts.length > 0) {
    callouts[0].title = title;
    callouts[0].body = body;
  }

  if (danger && callouts.length > 0) {
    callouts[0].danger = true;
    callouts[0].body = `${body}\n\n⚠ ${danger}`;
  }

  return callouts;
}
