import { useSyncExternalStore } from "react";
import type { LayerId } from "./deck";

export type Draw = {
  layer: LayerId;
  /** null when the Student put back every card in this Layer. */
  cardId: string | null;
  /** One answer per Option, in the same order as Reading.options. */
  answers: string[];
};

export type Reading = {
  id: string;
  createdAt: string;
  decision: string;
  options: string[];
  draws: Draw[];
  reflection: string;
};

const KEY = "phai-song-jai:readings";
const EMPTY: Reading[] = [];

let cache: Reading[] | undefined;
const listeners = new Set<() => void>();

function readStorage(): Reading[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Reading[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function commit(next: Reading[]) {
  cache = next;
  try {
    if (next.length === 0) window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private mode or blocked storage: the Reading still lives until the tab closes.
  }
  listeners.forEach((listener) => listener());
}

function getSnapshot(): Reading[] {
  if (cache === undefined) cache = readStorage();
  return cache;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Newest first. Lives only in this browser. */
export function useReadings(): Reading[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

export function saveReading(reading: Reading) {
  const current = getSnapshot();
  const exists = current.some((r) => r.id === reading.id);
  commit(exists ? current.map((r) => (r.id === reading.id ? reading : r)) : [reading, ...current]);
}

export function clearReadings() {
  commit(EMPTY);
}
