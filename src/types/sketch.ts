export type SketchCategory = 'vehicle' | 'electrical' | 'plumbing' | 'household';

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
}

export interface OrderStepsExercise {
  type: 'order-steps';
  prompt: string;
  steps: OrderStep[];
  correctOrder: string[];
  failMessage: string;
}

export interface SpotHazardExercise {
  type: 'spot-hazard';
  prompt: string;
  hazards: HazardOption[];
  requiredCount: number;
  failMessage: string;
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

export interface Sketch {
  id: string;
  title: string;
  category: SketchCategory;
  summary: string;
  learn: LearnSection[];
  practice: PracticeExercise[];
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
