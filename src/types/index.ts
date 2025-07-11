export interface PartialComponent {
  Component: string;
  styles: CSSModuleClasses;
}

export type Indexed<T = unknown> = {
  [key: string]: T | Indexed<T>;
};

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  phone: string;
  login: string;
  avatar: string | null;
  email: string;
}

export interface Message {
  user: Pick<
    User,
    'email' | 'login' | 'first_name' | 'second_name' | 'avatar' | 'phone'
  >;
  time: string;
  content: string;
}

export interface IChat {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: Message | null;
  created_by: number;
}

export type IChatUser = Pick<
  User,
  'id' | 'login' | 'first_name' | 'second_name' | 'display_name' | 'avatar'
>;

export type WSMessageType =
  | 'ping'
  | 'pong'
  | 'message'
  | 'file'
  | 'get old'
  | 'user connected'
  | 'sticker';

export interface WSMessage {
  type: WSMessageType;
  content?: string;
}
export interface ITextMessage {
  id: number;
  time: string;
  user_id: number;
  content: string;
  type: 'message';
}
