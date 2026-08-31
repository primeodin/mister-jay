const VEHICLE_KEY = 'mister-jay-vehicle';

export function loadVehicleChoice(sketchId: string): string | null {
  try {
    const raw = localStorage.getItem(VEHICLE_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw) as Record<string, string>;
    return map[sketchId] ?? null;
  } catch {
    return null;
  }
}

export function saveVehicleChoice(sketchId: string, vehicleId: string): void {
  try {
    const raw = localStorage.getItem(VEHICLE_KEY);
    const map = raw ? (JSON.parse(raw) as Record<string, string>) : {};
    map[sketchId] = vehicleId;
    localStorage.setItem(VEHICLE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}
