const KEY = "ingrain-progress-v1";

export type CourseProgress = {
  completedSessions: number;
  lastStage?: string;
  lastVisitedAt?: string;
};

export type ProgressStore = Record<string, CourseProgress>;

export function readProgress(): ProgressStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ProgressStore) : {};
  } catch {
    return {};
  }
}

export function recordSessionComplete(courseId: string): void {
  const store = readProgress();
  const prev = store[courseId] ?? { completedSessions: 0 };
  store[courseId] = {
    ...prev,
    completedSessions: prev.completedSessions + 1,
    lastVisitedAt: new Date().toISOString(),
  };
  localStorage.setItem(KEY, JSON.stringify(store));
}
