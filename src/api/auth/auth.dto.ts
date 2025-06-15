import { User } from '../../types';

export type SignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignUpResponse = {
  id: number;
};

export type SignInRequest = {
  login: string;
  password: string;
};

export type SignInResponse = void;

export type GetMeRequest = undefined;
export type GetMeResponse = User;

export type LogoutRequest = void;
export type LogoutResponse = void;
