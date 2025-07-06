import { HTTPTransport, WSEventSignatures, WSTransport } from '../../core';
import { EventBus } from '../../core/event-bus';
import { BASE_API_URL, BASE_WS_URL } from '../../utils';

export class MessagesAPI {
  private http: HTTPTransport;
  private ws?: WSTransport;
  public events = new EventBus<WSEventSignatures>();

  constructor(
    private userId: number,
    private chatId: number,
  ) {
    this.http = new HTTPTransport(`${BASE_API_URL}/chats`);
  }

  public async connect(): Promise<void> {
    const { token } = await this.http.post<{ token: string }>(
      `/token/${this.chatId}`,
    );

    const host = BASE_WS_URL.replace(/^https?:\/\//, '').replace(/\/+$/, '');
    const wsUrl = `${host}/ws/chats/${this.userId}/${this.chatId}/${token}`;

    this.ws = new WSTransport(wsUrl, this.events);
    await this.ws.connect();
  }
}
