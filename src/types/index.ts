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
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}
