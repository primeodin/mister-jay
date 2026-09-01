export interface SceneProps {
  focusIds?: string[];
  selectedIds?: string[];
  highlightIds?: string[];
  onHotspotClick?: (id: string) => void;
  interactive?: boolean;
  variant?: 'hero' | 'viewport' | 'embedded' | 'learn';
  callouts?: import('./sceneAnnotations').SceneCallout[];
}
