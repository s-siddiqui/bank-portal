type Callback = (payload?: any) => void;

interface GlobalBus {
  on(event: string, callback: Callback): void;
  off(event: string, callback: Callback): void;
  emit(event: string, payload?: any): void;
}

// Create the global singleton
const createEventBus = (): GlobalBus => {
  const listeners: Record<string, Callback[]> = {};

  return {
    on(event, callback) {
      listeners[event] = listeners[event] || [];
      listeners[event].push(callback);
    },
    off(event, callback) {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter((cb) => cb !== callback);
      }
    },
    emit(event, payload) {
      if (listeners[event]) {
        listeners[event].forEach((cb) => cb(payload));
      }
    },
  };
};

// Attach to window so all MFEs use the same instance
if (!(window as any).eventBus) {
  (window as any).eventBus = createEventBus();
}

export const eventBus: GlobalBus = (window as any).eventBus;
