type TypedEventCallback<Args extends unknown[]> = (
  ...args: Args
) => void | Promise<void>;

export class EventBus<TEventSignatures extends Record<string, unknown[]>> {
  private listeners: {
    [K in keyof TEventSignatures]?: Map<
      TypedEventCallback<TEventSignatures[K]>,
      number
    >;
  } = {};

  on<K extends keyof TEventSignatures>(
    event: K,
    callback: TypedEventCallback<TEventSignatures[K]>
  ): void {
    if (!this.listeners[event]) {
      this.listeners[event] = new Map();
    }
    const map = this.listeners[event]!;
    const current = map.get(callback) ?? 0;
    map.set(callback, current + 1);
  }

  off<K extends keyof TEventSignatures>(
    event: K,
    callback: TypedEventCallback<TEventSignatures[K]>
  ): void {
    const map = this.listeners[event];
    if (!map) {
      return;
    }
    const current = map.get(callback);
    if (!current) {
      return;
    }
    if (current > 1) {
      map.set(callback, current - 1);
    } else {
      map.delete(callback);
    }
    if (map.size === 0) {
      delete this.listeners[event];
    }
  }

  async emit<K extends keyof TEventSignatures>(
    event: K,
    ...args: TEventSignatures[K]
  ): Promise<void> {
    const map = this.listeners[event];
    if (!map) {
      return;
    }
    // Копируем entries, чтобы безопасно итерировать, даже если внутри колбэков
    // кто-то вызовет off/on на том же событии
    const entries = Array.from(map.entries());
    const promises: Promise<unknown>[] = [];

    for (const [callback, count] of entries) {
      for (let i = 0; i < count; i++) {
        try {
          const result = callback(...args);
          if (result instanceof Promise) {
            promises.push(result);
          }
        } catch (err) {
          console.error(`Error in callback for event "${String(event)}":`, err);
        }
      }
    }

    if (promises.length) {
      await Promise.all(promises);
    }
  }
}
