type Listener = () => void;

export interface Store<T> {
  getSnapshot: () => T;
  subscribe: (listener: Listener) => () => void;
  update: (updater: (current: T) => T) => void;
}

/** Minimal in-memory store compatible with useSyncExternalStore. */
export function createStore<T>(initialState: T): Store<T> {
  let state = initialState;
  const listeners = new Set<Listener>();

  return {
    getSnapshot: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    update: (updater) => {
      state = updater(state);
      listeners.forEach((listener) => listener());
    },
  };
}
