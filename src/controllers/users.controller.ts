import {
  userApi,
  type UserAPI,
  type UpdateUserAvatarRequest,
  type UpdateUserInfoRequest,
  type UpdateUserPasswordRequest,
  type FindUserRequest,
} from '../api';
import { catchErrors, store } from '../core';
import { transformArrayWithAvatar, transformDataWithAvatar } from '../utils';
import { BaseController } from './base.controller';

class UsersController extends BaseController {
  private readonly userAPI: UserAPI = userApi;

  @catchErrors
  public async updateUserInfo(data: UpdateUserInfoRequest) {
    const res = await this.userAPI.updateUserInfo(data);
    store.set('user', transformDataWithAvatar(res));
  }

  @catchErrors
  public async updateUserPassword(data: UpdateUserPasswordRequest) {
    await this.userAPI.updateUserPassword(data);
  }

  @catchErrors
  public async updateUserAvatar(data: UpdateUserAvatarRequest) {
    const res = await this.userAPI.updateUserAvatar(data);
    store.set('user', transformDataWithAvatar(res));
  }

  @catchErrors
  public async findUser(data: FindUserRequest) {
    const user = await this.userAPI.findUser(data);
    return transformArrayWithAvatar(user);
  }
}

export default new UsersController();
