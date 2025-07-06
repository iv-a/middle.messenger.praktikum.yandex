import type { WSMessage } from '../types';
import { EventBus } from './event-bus';

export const WS_EVENTS = {
  OPEN: 'open',
  CLOSE: 'close',
  ERROR: 'error',
  PONG: 'pong',
  MESSAGE: 'message',
  MESSAGES: 'messages',
  USER_CONNECTED: 'user connected',
  FILE: 'file',
  STICKER: 'sticker',
} as const;

export type WSEventSignatures = {
  [WS_EVENTS.OPEN]: [];
  [WS_EVENTS.CLOSE]: [CloseEvent];
  [WS_EVENTS.ERROR]: [Event];
  [WS_EVENTS.PONG]: [];
  [WS_EVENTS.MESSAGE]: [WSMessage];
  [WS_EVENTS.MESSAGES]: [Array<WSMessage>];
  [WS_EVENTS.FILE]: [WSMessage];
  [WS_EVENTS.USER_CONNECTED]: [WSMessage];
  [WS_EVENTS.STICKER]: [WSMessage];
};

export class WSTransport {
  private socket: WebSocket | null = null;
  private pingIntervalId: number | null = null;

  constructor(
    private wsUrl: string,
    private eventBus: EventBus<WSEventSignatures>,
    private pingIntervalMs: number = 10000,
  ) {}

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.wsUrl);

      this.socket.onopen = () => {
        this.startPing();
        this.eventBus.emit(WS_EVENTS.OPEN);
        resolve();
      };

      this.socket.onmessage = (evt) => this.onMessage(evt);
      this.socket.onerror = (err) => {
        this.eventBus.emit('error', err);
        reject(err);
      };
      this.socket.onclose = (evt) => {
        this.stopPing();
        this.eventBus.emit('close', evt);
      };
    });
  }

  public close(): void {
    this.socket?.close();
    this.stopPing();
  }

  public send(data: WSMessage): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }
    this.socket.send(JSON.stringify(data));
  }

  private onMessage(evt: MessageEvent): void {
    let msg: WSMessage | Array<WSMessage>;
    try {
      msg = JSON.parse(evt.data);
    } catch {
      console.warn('Invalid JSON:', evt.data);
      return;
    }

    if (Array.isArray(msg)) {
      this.eventBus.emit(WS_EVENTS.MESSAGES, msg);
    } else {
      const type = msg.type as (typeof WS_EVENTS)[keyof typeof WS_EVENTS];
      this.eventBus.emit(type, msg);
    }
  }

  private startPing(): void {
    this.stopPing();
    this.pingIntervalId = window.setInterval(() => {
      try {
        this.send({ type: 'ping' });
      } catch (e) {
        this.stopPing();
      }
    }, this.pingIntervalMs);
  }

  private stopPing(): void {
    if (this.pingIntervalId !== null) {
      clearInterval(this.pingIntervalId);
      this.pingIntervalId = null;
    }
  }
}
