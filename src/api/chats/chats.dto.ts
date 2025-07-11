import { IChat, IChatUser } from '../../types';

export type GetChatsRequest = {
  offset?: number;
  limit?: number;
  title?: string;
};
export type GetChatsResponse = Array<IChat>;

export type CreateChatRequest = {
  title: string;
};
export type CreateChatResponse = {
  id: number;
};

export type DeleteChatRequest = {
  chatId: number;
};
export type DeleteChatResponse = void;

export type GetChatUsersRequest = {
  id: number;
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
};
export type GetChatUsersResponse = Array<IChatUser & { role: string }>;

export type GetNewMessagesCountRequest = {
  id: number;
};
export type GetNewMessagesCountResponse = {
  unread_count: number;
};

export type AddUsersToChatRequest = {
  users: Array<number>;
  chatId: number;
};
export type AddUsersToChatResponse = void;

export type DeleteUsersFromChatRequest = {
  users: Array<number>;
  chatId: number;
};
export type DeleteUsersFromChatResponse = void;

export type GetTokenRequest = {
  id: number;
};

export type GetTokenResponse = {
  token: string;
};
