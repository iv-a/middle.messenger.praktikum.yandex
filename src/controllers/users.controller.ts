import {
  UpdateUserAvatarRequest,
  UpdateUserInfoRequest,
  UpdateUserPasswordRequest,
  userApi,
  UserAPI,
} from '../api';
import { store } from '../core';
import { transformUserDataResponse } from '../utils';

class UsersController {
  private readonly userAPI: UserAPI;

  constructor() {
    this.userAPI = userApi;
  }

  public async updateUserInfo(data: UpdateUserInfoRequest) {
    try {
      const res = await this.userAPI.updateUserInfo(data);
      store.set('user', transformUserDataResponse(res));
    } catch (err) {
      console.error({ err });
    }
  }

  public async updateUserPassword(data: UpdateUserPasswordRequest) {
    try {
      await this.userAPI.updateUserPassword(data);
    } catch (err) {
      console.error({ err });
    }
  }

  public async updateUserAvatar(data: UpdateUserAvatarRequest) {
    try {
      const res = await this.userAPI.updateUserAvatar(data);
      store.set('user', transformUserDataResponse(res));
    } catch (err) {
      console.error({ err });
    }
  }
}

export default new UsersController();
