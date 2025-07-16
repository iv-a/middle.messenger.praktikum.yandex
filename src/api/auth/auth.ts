import {
  GetMeResponse,
  LogoutResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from './auth.dto';
import { HTTPTransport } from '../../core';
import { BASE_API_URL, trimUrl } from '../../utils';

const baseUrl = trimUrl(BASE_API_URL);

const authApi = new HTTPTransport(`${baseUrl}/auth`);

export class AuthAPI {
  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    return authApi.post<SignUpResponse>('/signup', { data });
  }

  async signIn(data: SignInRequest): Promise<SignInResponse> {
    return authApi.post<SignInResponse>('/signin', { data });
  }

  async getMe(): Promise<GetMeResponse> {
    return authApi.get<GetMeResponse>('/user');
  }

  async logout(): Promise<LogoutResponse> {
    return authApi.post<LogoutResponse>('/logout');
  }
}

export default new AuthAPI();
