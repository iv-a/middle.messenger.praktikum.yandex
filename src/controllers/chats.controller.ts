import {
  AddUsersToChatRequest,
  chatsApi,
  ChatsAPI,
  CreateChatRequest,
  DeleteChatRequest,
  DeleteUsersFromChatRequest,
  GetChatsRequest,
  GetChatUsersRequest,
  GetNewMessagesCountRequest,
} from '../api';
import { store } from '../core';

class ChatsController {
  private readonly chatsAPI: ChatsAPI;

  constructor() {
    this.chatsAPI = chatsApi;
  }

  public async getChats(data: GetChatsRequest) {
    try {
      const res = await this.chatsAPI.getChats(data);
      store.set('chats', res);
    } catch (err) {
      console.error({ err });
    }
  }

  public async createChat(data: CreateChatRequest) {
    try {
      const res = await this.chatsAPI.createChat(data);
      store.set('activeChatId', res);
    } catch (err) {
      console.error({ err });
    }
  }

  public async deleteChat(data: DeleteChatRequest) {
    try {
      await this.chatsAPI.deleteChat(data);
    } catch (err) {
      console.error({ err });
    }
  }

  public async getChatUsers(data: GetChatUsersRequest) {
    try {
      return await this.chatsAPI.getChatUsers(data);
    } catch (err) {
      console.error({ err });
    }
  }

  public async getNewMessagesCount(data: GetNewMessagesCountRequest) {
    try {
      return await this.chatsAPI.getNewMessagesCount(data);
    } catch (err) {
      console.error({ err });
    }
  }

  public async addUsersToChat(data: AddUsersToChatRequest) {
    try {
      return await this.chatsAPI.addUsersToChat(data);
    } catch (err) {
      console.error({ err });
    }
  }

  public async deleteUsersFromChat(data: DeleteUsersFromChatRequest) {
    try {
      return await this.chatsAPI.deleteUsersFromChat(data);
    } catch (err) {
      console.error({ err });
    }
  }
}

export default new ChatsController();
