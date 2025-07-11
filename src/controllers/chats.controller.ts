import {
  chatsApi,
  type ChatsAPI,
  type AddUsersToChatRequest,
  type CreateChatRequest,
  type DeleteChatRequest,
  type DeleteUsersFromChatRequest,
  type GetChatsRequest,
  type GetChatUsersRequest,
  type GetNewMessagesCountRequest,
  type GetTokenRequest,
} from '../api';
import { catchErrors, store } from '../core';
import { transformArrayWithAvatar } from '../utils';
import { BaseController } from './base.controller';

class ChatsController extends BaseController {
  private readonly chatsAPI: ChatsAPI = chatsApi;

  @catchErrors
  public async getChats(data: GetChatsRequest) {
    const res = await this.chatsAPI.getChats(data);
    store.set('chats', transformArrayWithAvatar(res));
  }

  @catchErrors
  public async createChat(data: CreateChatRequest) {
    const res = await this.chatsAPI.createChat(data);
    store.set('activeChatId', res);
    await this.getChats({});
  }

  @catchErrors
  public async deleteChat(data: DeleteChatRequest) {
    await this.chatsAPI.deleteChat(data);
  }

  @catchErrors
  public async getChatUsers(data: GetChatUsersRequest) {
    const users = await this.chatsAPI.getChatUsers(data);
    return transformArrayWithAvatar(users);
  }

  @catchErrors
  public async getNewMessagesCount(data: GetNewMessagesCountRequest) {
    return await this.chatsAPI.getNewMessagesCount(data);
  }

  @catchErrors
  public async addUsersToChat(data: AddUsersToChatRequest) {
    return await this.chatsAPI.addUsersToChat(data);
  }

  @catchErrors
  public async deleteUsersFromChat(data: DeleteUsersFromChatRequest) {
    return await this.chatsAPI.deleteUsersFromChat(data);
  }

  @catchErrors
  public async getToken(data: GetTokenRequest) {
    return await this.chatsAPI.getToken(data);
  }
}

export default new ChatsController();
