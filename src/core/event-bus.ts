type EventCallback = Function;

type CallbacksMap = Map<EventCallback, number>;

export class EventBus<Events extends Record<string, string>> {
  private listeners: Map<Events[keyof Events], CallbacksMap>;

  constructor() {
    this.listeners = new Map<Events[keyof Events], CallbacksMap>();
  }

  on<E extends Events[keyof Events]>(event: E, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Map());
    }

    const callbacks: CallbacksMap = this.listeners.get(event)!;

    if (!callbacks.has(callback)) {
      callbacks.set(callback, 1);
    } else {
      const count: number = callbacks.get(callback)!;

      callbacks.set(callback, count + 1);
    }
  }

  off<E extends Events[keyof Events]>(event: E, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      throw new Error(`Error: Нет события: ${event}`);
    }

    const callbacks = this.listeners.get(event);

    if (!callbacks) {
      return;
    }

    callbacks.delete(callback);
  }

  emit<Evant extends Events[keyof Events], Args extends unknown[]>(
    event: Evant,
    ...args: Args
  ) {
    if (!this.listeners.has(event)) {
      throw new Error(`Error: Нет события: ${event}`);
    }

    const callbacks = this.listeners.get(event);

    if (!callbacks) {
      return;
    }

    for (const [callback, count] of callbacks) {
      for (let i = 0; i < count; i++) {
        callback(...args);
      }
    }
  }
}
