import { HTTPTransport } from '../../core';
import { BASE_API_URL, trimUrl } from '../../utils';
import type {
  FindUserRequest,
  FindUserResponse,
  UpdateUserAvatarRequest,
  UpdateUserAvatarResponse,
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
  UpdateUserPasswordRequest,
  UpdateUserPasswordResponse,
} from './users.dto';

const baseUrl = trimUrl(BASE_API_URL);

const usersApi = new HTTPTransport(`${baseUrl}/user`);

export class UsersAPI {
  async updateUserInfo(
    data: UpdateUserInfoRequest,
  ): Promise<UpdateUserInfoResponse> {
    return usersApi.put<UpdateUserInfoResponse>('/profile', { data });
  }

  async updateUserAvatar(
    data: UpdateUserAvatarRequest,
  ): Promise<UpdateUserAvatarResponse> {
    return usersApi.put<UpdateUserAvatarResponse>('/profile/avatar', { data });
  }

  async updateUserPassword(
    data: UpdateUserPasswordRequest,
  ): Promise<UpdateUserPasswordResponse> {
    return usersApi.put<UpdateUserPasswordResponse>('/password', { data });
  }

  async findUser(data: FindUserRequest): Promise<FindUserResponse> {
    return usersApi.post<FindUserResponse>('/search', { data });
  }
}

export default new UsersAPI();
