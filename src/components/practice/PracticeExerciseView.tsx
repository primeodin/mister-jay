import type { PracticeExercise, Sketch } from '../../types/sketch';
import TapPartExerciseView from './TapPartExercise';
import OrderStepsExerciseView from './OrderStepsExercise';
import SpotHazardExerciseView from './SpotHazardExercise';
import ChoiceExerciseView from './ChoiceExercise';
import InteractiveTapExercise from './InteractiveTapExercise';
import InteractiveHazardExercise from './InteractiveHazardExercise';
import DragOrderExercise from './DragOrderExercise';

interface Props {
  exercise: PracticeExercise;
  sketch: Sketch;
  onResult: (passed: boolean, message?: string) => void;
}

export default function PracticeExerciseView({ exercise, sketch, onResult }: Props) {
  switch (exercise.type) {
    case 'tap-part':
      return exercise.interactive !== false ? (
        <InteractiveTapExercise exercise={exercise} sketch={sketch} onResult={onResult} />
      ) : (
        <TapPartExerciseView exercise={exercise} onResult={onResult} />
      );
    case 'order-steps':
      return exercise.interactive !== false ? (
        <DragOrderExercise exercise={exercise} sketch={sketch} onResult={onResult} />
      ) : (
        <OrderStepsExerciseView exercise={exercise} onResult={onResult} />
      );
    case 'spot-hazard':
      return exercise.interactive !== false ? (
        <InteractiveHazardExercise exercise={exercise} sketch={sketch} onResult={onResult} />
      ) : (
        <SpotHazardExerciseView exercise={exercise} onResult={onResult} />
      );
    case 'safe-next-move':
    case 'wrong-setup':
      return <ChoiceExerciseView exercise={exercise} sketch={sketch} onResult={onResult} />;
  }
}
