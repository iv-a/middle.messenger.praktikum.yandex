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

export interface Chat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: Message;
}
