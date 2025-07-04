import {
  authAPI,
  type AuthAPI,
  type SignInRequest,
  type SignUpRequest,
} from '../api';
import { catchErrors, Router, store } from '../core';
import { ROUTES, transformDataWithAvatar } from '../utils';
import { BaseController } from './base.controller';

class AuthController extends BaseController {
  private readonly authAPI: AuthAPI = authAPI;

  @catchErrors
  public async signIn(data: SignInRequest) {
    await this.authAPI.signIn(data);
    await this.getMe();
    Router.getInstance().go(ROUTES.MESSENGER);
  }

  @catchErrors
  public async getMe() {
    const user = await this.authAPI.getMe();
    store.set('user', transformDataWithAvatar(user));
  }

  @catchErrors
  public async signUp(data: SignUpRequest) {
    await this.authAPI.signUp(data);
    await this.getMe();
    Router.getInstance().go(ROUTES.MESSENGER);
  }

  @catchErrors
  public async logout() {
    await this.authAPI.logout();
    Router.getInstance().go(ROUTES.SIGN_IN);
  }
}

export default new AuthController();
