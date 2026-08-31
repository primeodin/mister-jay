import type { PracticeExercise } from '../../types/sketch';
import TapPartExerciseView from './TapPartExercise';
import OrderStepsExerciseView from './OrderStepsExercise';
import SpotHazardExerciseView from './SpotHazardExercise';
import ChoiceExerciseView from './ChoiceExercise';

interface Props {
  exercise: PracticeExercise;
  onResult: (passed: boolean, message?: string) => void;
}

export default function PracticeExerciseView({ exercise, onResult }: Props) {
  switch (exercise.type) {
    case 'tap-part':
      return <TapPartExerciseView exercise={exercise} onResult={onResult} />;
    case 'order-steps':
      return <OrderStepsExerciseView exercise={exercise} onResult={onResult} />;
    case 'spot-hazard':
      return <SpotHazardExerciseView exercise={exercise} onResult={onResult} />;
    case 'safe-next-move':
    case 'wrong-setup':
      return <ChoiceExerciseView exercise={exercise} onResult={onResult} />;
  }
}
