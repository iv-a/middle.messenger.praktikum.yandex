import { User } from '../types';
import { set } from '../utils';
import { EventBus } from './event-bus';

export interface State {
  user: User | null;
}

export const STORE_EVENTS_CONFIG = {
  UPDATE: 'update',
} as const;

type EventSignatures = {
  [STORE_EVENTS_CONFIG.UPDATE]: [State];
};

class Store extends EventBus<EventSignatures> {
  private state: State = {
    user: null,
  };

  public get() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(STORE_EVENTS_CONFIG.UPDATE, this.get());
  }
}

export default new Store();
