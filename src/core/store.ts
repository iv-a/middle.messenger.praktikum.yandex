import { IChat, User } from '../types';
import { set } from '../utils';
import { EventBus } from './event-bus';

export interface State {
  activeChat: IChat | null;
  user: User | null;
  chats: Array<IChat>;
}

export const STORE_EVENTS_CONFIG = {
  UPDATE: 'update',
} as const;

type EventSignatures = {
  [STORE_EVENTS_CONFIG.UPDATE]: [State];
};

class Store extends EventBus<EventSignatures> {
  private state: State = {
    activeChat: null,
    user: null,
    chats: [],
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
