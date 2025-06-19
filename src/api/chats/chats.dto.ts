import { Chat, User } from '../../types';

export type GetChatsRequest = {
  offset?: number;
  limit?: number;
  title?: string;
};
export type GetChatsResponse = Array<Chat>;

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
// export type DeleteChatResponse = {
//   userId: number;
//   result: {
//     id: number;
//     title: string;
//     avatar: string;
//     created_by: number;
//   };
// };

export type GetChatUsersRequest = {
  id: number;
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
};
export type GetChatUsersResponse = Array<
  Pick<
    User,
    'id' | 'login' | 'first_name' | 'second_name' | 'display_name' | 'avatar'
  > & { role: string }
>;

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
