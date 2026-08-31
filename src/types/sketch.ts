export type SketchCategory = 'vehicle' | 'electrical' | 'plumbing' | 'household';

export type Scene3DId =
  | 'breaker-panel'
  | 'car-battery'
  | 'tire-jack'
  | 'motorcycle';

export type DiagramId =
  | 'change-tire'
  | 'replace-battery'
  | 'change-air-filter'
  | 'check-coolant'
  | 'read-breaker-panel'
  | 'reset-breaker'
  | 'stop-faucet'
  | 'unclog-sink'
  | 'move-motorcycle'
  | 'jump-start';

export type PracticeType =
  | 'tap-part'
  | 'order-steps'
  | 'spot-hazard'
  | 'safe-next-move'
  | 'wrong-setup';

export interface LearnSection {
  heading: string;
  body: string;
  callout?: string;
  diagramFocus?: string[];
}

export interface TapPartOption {
  id: string;
  label: string;
  correct: boolean;
}

export interface OrderStep {
  id: string;
  text: string;
}

export interface HazardOption {
  id: string;
  label: string;
  correct: boolean;
}

export interface ChoiceOption {
  id: string;
  text: string;
  correct: boolean;
  feedback?: string;
}

export interface TapPartExercise {
  type: 'tap-part';
  prompt: string;
  parts: TapPartOption[];
  requiredCount: number;
  failMessage: string;
  interactive?: boolean;
}

export interface OrderStepsExercise {
  type: 'order-steps';
  prompt: string;
  steps: OrderStep[];
  correctOrder: string[];
  failMessage: string;
  interactive?: boolean;
}

export interface SpotHazardExercise {
  type: 'spot-hazard';
  prompt: string;
  hazards: HazardOption[];
  requiredCount: number;
  failMessage: string;
  interactive?: boolean;
}

export interface SafeNextMoveExercise {
  type: 'safe-next-move';
  prompt: string;
  options: ChoiceOption[];
  failMessage: string;
}

export interface WrongSetupExercise {
  type: 'wrong-setup';
  prompt: string;
  options: ChoiceOption[];
  failMessage: string;
}

export type PracticeExercise =
  | TapPartExercise
  | OrderStepsExercise
  | SpotHazardExercise
  | SafeNextMoveExercise
  | WrongSetupExercise;

export interface VehicleType {
  id: string;
  label: string;
  note: string;
}

export interface SketchResource {
  id: string;
  title: string;
  url: string;
  type: 'video' | 'search' | 'note';
  why: string;
  duration?: string;
}

export interface Sketch {
  id: string;
  title: string;
  category: SketchCategory;
  summary: string;
  learn: LearnSection[];
  practice: PracticeExercise[];
  scene3d?: Scene3DId;
  diagramId: DiagramId;
  vehicleTypes?: VehicleType[];
}

export interface SketchProgress {
  learnComplete: boolean;
  practiceComplete: boolean;
  practiceScore: number;
}

export interface AppProgress {
  sketches: Record<string, SketchProgress>;
  lastVisitDate: string | null;
  streak: number;
}
