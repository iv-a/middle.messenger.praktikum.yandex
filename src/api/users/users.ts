import { HTTPTransport } from '../../core';
import { BASE_API_URL } from '../../utils';
import {
  FindUserRequest,
  FindUserResponse,
  UpdateUserAvatarRequest,
  UpdateUserAvatarResponse,
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
  UpdateUserPasswordRequest,
  UpdateUserPasswordResponse,
} from './users.dto';

const baseUrl = BASE_API_URL.endsWith('/')
  ? BASE_API_URL.slice(0, -1)
  : BASE_API_URL;

const userApi = new HTTPTransport(`${baseUrl}/user`);

export class UserAPI {
  async updateUserInfo(
    data: UpdateUserInfoRequest,
  ): Promise<UpdateUserInfoResponse> {
    return userApi.put<UpdateUserInfoResponse>('/profile', { data });
  }

  async updateUserAvatarInfo(
    data: UpdateUserAvatarRequest,
  ): Promise<UpdateUserAvatarResponse> {
    return userApi.put<UpdateUserAvatarResponse>('/profile/avatar', { data });
  }

  async updateUserPasswordInfo(
    data: UpdateUserPasswordRequest,
  ): Promise<UpdateUserPasswordResponse> {
    return userApi.put<UpdateUserPasswordResponse>('/password', { data });
  }

  async findUser(data: FindUserRequest): Promise<FindUserResponse> {
    return userApi.post<FindUserResponse>('/search', { data });
  }
}

export default new UserAPI();
