import { HTTPTransport } from '../../core';
import { BASE_API_URL } from '../../utils';
import type {
  AddUsersToChatRequest,
  AddUsersToChatResponse,
  CreateChatRequest,
  CreateChatResponse,
  DeleteChatRequest,
  DeleteChatResponse,
  DeleteUsersFromChatRequest,
  DeleteUsersFromChatResponse,
  GetChatsRequest,
  GetChatsResponse,
  GetChatUsersRequest,
  GetChatUsersResponse,
  GetNewMessagesCountRequest,
  GetNewMessagesCountResponse,
} from './chats.dto';

const baseUrl = BASE_API_URL.endsWith('/')
  ? BASE_API_URL.slice(0, -1)
  : BASE_API_URL;

const chatsApi = new HTTPTransport(`${baseUrl}/chats`);

export class ChatsAPI {
  async getChats(data: GetChatsRequest): Promise<GetChatsResponse> {
    const query = new URLSearchParams(
      Object.entries(data).map(([K, v]) => [K, String(v)]),
    ).toString();
    return chatsApi.get<GetChatsResponse>(query);
  }

  async createChat(data: CreateChatRequest): Promise<CreateChatResponse> {
    return chatsApi.post<CreateChatResponse>('', { data });
  }

  async deleteChat(data: DeleteChatRequest): Promise<DeleteChatResponse> {
    return chatsApi.delete<DeleteChatResponse>('', { data });
  }

  async getChatUsers(data: GetChatUsersRequest): Promise<GetChatUsersResponse> {
    const { id, ...rest } = data;
    const query = new URLSearchParams(
      Object.entries(rest).map(([K, v]) => [K, String(v)]),
    ).toString();
    return chatsApi.get<GetChatUsersResponse>(`/${id}/users?${query}`);
  }

  async getNewMessagesCount(
    data: GetNewMessagesCountRequest,
  ): Promise<GetNewMessagesCountResponse> {
    return chatsApi.get<GetNewMessagesCountResponse>(`/new/${data.id}`, {
      data,
    });
  }

  async addUsersToChat(
    data: AddUsersToChatRequest,
  ): Promise<AddUsersToChatResponse> {
    return chatsApi.put<AddUsersToChatResponse>('/users', { data });
  }

  async deleteUsersFromChat(
    data: DeleteUsersFromChatRequest,
  ): Promise<DeleteUsersFromChatResponse> {
    return chatsApi.delete<DeleteUsersFromChatResponse>('/users', { data });
  }
}

export default new ChatsAPI();
