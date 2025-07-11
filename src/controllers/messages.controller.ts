import {
  catchErrors,
  store,
  WS_EVENTS,
  type WSEventSignatures,
  WSTransport,
} from '../core';
import { EventBus } from '../core/event-bus';
import type { ITextMessage, WSMessage } from '../types';
import { BASE_WS_URL, transformDataWithTime } from '../utils';
import { BaseController } from './base.controller';
import chatsController from './chats.controller';

const baseUrl = BASE_WS_URL.endsWith('/')
  ? BASE_WS_URL.slice(0, -1)
  : BASE_WS_URL;

class MessagesController extends BaseController {
  private _eventBus = new EventBus<WSEventSignatures>();
  private wsConnection: WSTransport | null = null;

  constructor() {
    super();
    this._registerEvents();
  }

  @catchErrors
  public async createWSConnection(userId: number, chatId: number) {
    if (this.wsConnection) {
      this.wsConnection.close();
    }
    const { token } = await chatsController.getToken({ id: chatId });

    const wsUrl = `${baseUrl}/ws/chats/${userId}/${chatId}/${token}`;
    this.wsConnection = new WSTransport(wsUrl, this._eventBus);
    await this.wsConnection.connect();
  }

  private _registerEvents() {
    this._eventBus.on(WS_EVENTS.MESSAGE, this._onMessage.bind(this));
    this._eventBus.on(WS_EVENTS.MESSAGES, this._onMessages.bind(this));
    this._eventBus.on(WS_EVENTS.OPEN, this._onOpen.bind(this));
    this._eventBus.on(WS_EVENTS.CLOSE, this._onClose.bind(this));
  }

  private _onMessage(msg: WSMessage) {
    if (!this.wsConnection) {
      throw new Error('Нет активного соединения');
    }
    const type = msg.type;

    switch (type) {
      case 'user connected': {
        break;
      }
      case 'message': {
        const state = store.get();
        const activeChatMessages = state.activeChatMessages || [];

        const message = transformDataWithTime(msg as ITextMessage);
        store.set('activeChatMessages', [...activeChatMessages, message]);
        break;
      }
      default:
        break;
    }
  }

  private _onMessages(msg: Array<WSMessage>) {
    if (!this.wsConnection) {
      throw new Error('Нет активного соединения');
    }

    const state = store.get();
    const activeChatMessages = state.activeChatMessages || [];

    const messages = msg.reverse().map((message) => {
      const type = message.type;

      if (type === 'message') {
        return transformDataWithTime(message as ITextMessage);
      }
      return message;
    });

    if (messages.length === 20) {
      store.set('noMore', false);
    } else {
      store.set('noMore', true);
    }

    store.set('activeChatMessages', [...messages, ...activeChatMessages]);
  }

  private _onClose() {
    console.log('closed');
  }

  private _onOpen() {
    console.log('opened');
  }

  public sendMessage(content: string) {
    if (!this.wsConnection) {
      throw new Error('Нет активного соединения');
    }

    this.wsConnection.send({ type: 'message', content });
  }

  public getMessages(offset: number) {
    if (!this.wsConnection) {
      throw new Error('Нет активного соединения');
    }
    this.wsConnection.send({ type: 'get old', content: String(offset) });
  }
}

export default new MessagesController();
