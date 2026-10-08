"use client";

import { useSyncExternalStore } from "react";
import type { Store } from "./createStore";

export function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
}
