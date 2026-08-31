import { motion } from 'framer-motion';
import type { VehicleType } from '../../types/sketch';
import { loadVehicleChoice, saveVehicleChoice } from '../../lib/vehicleStorage';

interface Props {
  sketchId: string;
  vehicleTypes: VehicleType[];
  onChange?: (vehicleId: string) => void;
}

export default function VehiclePicker({ sketchId, vehicleTypes, onChange }: Props) {
  const current = loadVehicleChoice(sketchId) ?? vehicleTypes[0]?.id;

  function select(id: string) {
    saveVehicleChoice(sketchId, id);
    onChange?.(id);
  }

  return (
    <div className="vehicle-picker">
      <h4 className="vehicle-picker-title">Your vehicle</h4>
      <div className="vehicle-picker-options">
        {vehicleTypes.map((v) => (
          <motion.button
            key={v.id}
            type="button"
            className={`vehicle-option${current === v.id ? ' vehicle-option--active' : ''}`}
            whileTap={{ scale: 0.96 }}
            onClick={() => select(v.id)}
          >
            <span className="vehicle-option-label">{v.label}</span>
            {current === v.id && <span className="vehicle-option-note">{v.note}</span>}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
