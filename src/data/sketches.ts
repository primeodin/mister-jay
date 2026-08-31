import type { Sketch } from '../types/sketch';

import changeTire from '../data/sketches/change-tire.json';
import replaceBattery from '../data/sketches/replace-battery.json';
import changeAirFilter from '../data/sketches/change-air-filter.json';
import checkCoolant from '../data/sketches/check-coolant.json';
import readBreakerPanel from '../data/sketches/read-breaker-panel.json';
import resetBreaker from '../data/sketches/reset-breaker.json';
import stopFaucet from '../data/sketches/stop-faucet.json';
import unclogSink from '../data/sketches/unclog-sink.json';
import moveMotorcycle from '../data/sketches/move-motorcycle.json';
import jumpStart from '../data/sketches/jump-start.json';

export const sketches: Sketch[] = [
  changeTire as Sketch,
  replaceBattery as Sketch,
  changeAirFilter as Sketch,
  checkCoolant as Sketch,
  readBreakerPanel as Sketch,
  resetBreaker as Sketch,
  stopFaucet as Sketch,
  unclogSink as Sketch,
  moveMotorcycle as Sketch,
  jumpStart as Sketch,
];

export function getSketchById(id: string): Sketch | undefined {
  return sketches.find((s) => s.id === id);
}

export const categoryLabels: Record<Sketch['category'], string> = {
  vehicle: 'Vehicle',
  electrical: 'Electrical',
  plumbing: 'Plumbing',
  household: 'Household',
};
