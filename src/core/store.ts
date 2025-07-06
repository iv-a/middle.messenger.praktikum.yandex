import { IChat, IChatUser, ITextMessage, User } from '../types';
import { set } from '../utils';
import { EventBus } from './event-bus';

export interface State {
  error: string | null;
  activeChat: IChat | null;
  activeChatMessages: Array<ITextMessage> | null;
  activeChatUsers: Map<number, IChatUser & { role: string }> | null;
  noMore: boolean;
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
    error: null,
    activeChat: null,
    activeChatMessages: null,
    activeChatUsers: null,
    user: null,
    noMore: true,
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
