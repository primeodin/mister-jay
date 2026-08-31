import type { AppProgress, SketchProgress } from '../types/sketch';

const STORAGE_KEY = 'mister-jay-progress';

function defaultProgress(): AppProgress {
  return {
    sketches: {},
    lastVisitDate: null,
    streak: 0,
  };
}

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function loadProgress(): AppProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress: AppProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getSketchProgress(
  progress: AppProgress,
  sketchId: string,
): SketchProgress {
  return (
    progress.sketches[sketchId] ?? {
      learnComplete: false,
      practiceComplete: false,
      practiceScore: 0,
    }
  );
}

export function markLearnComplete(sketchId: string): AppProgress {
  const progress = loadProgress();
  const current = getSketchProgress(progress, sketchId);
  progress.sketches[sketchId] = { ...current, learnComplete: true };
  return updateStreak(progress);
}

export function markPracticeComplete(
  sketchId: string,
  score: number,
): AppProgress {
  const progress = loadProgress();
  const current = getSketchProgress(progress, sketchId);
  progress.sketches[sketchId] = {
    ...current,
    practiceComplete: true,
    practiceScore: Math.max(current.practiceScore, score),
  };
  return updateStreak(progress);
}

function updateStreak(progress: AppProgress): AppProgress {
  const today = todayKey();
  if (progress.lastVisitDate === today) {
    saveProgress(progress);
    return progress;
  }
  if (progress.lastVisitDate === yesterdayKey()) {
    progress.streak += 1;
  } else if (progress.lastVisitDate !== today) {
    progress.streak = 1;
  }
  progress.lastVisitDate = today;
  saveProgress(progress);
  return progress;
}

export function completedCount(progress: AppProgress): number {
  return Object.values(progress.sketches).filter(
    (s) => s.learnComplete && s.practiceComplete,
  ).length;
}
