import { AuthAPI, authAPI, SignInRequest, SignUpRequest } from '../api';
import { Router, store } from '../core';
import { ROUTES, transformUserDataResponse } from '../utils';

class AuthController {
  private readonly authAPI: AuthAPI;

  constructor() {
    this.authAPI = authAPI;
  }

  public async signIn(data: SignInRequest) {
    try {
      await this.authAPI.signIn(data);
      await this.getMe();
      Router.getInstance().go(ROUTES.MESSENGER);
    } catch (err) {
      console.error({ err });
    }
  }

  public async getMe() {
    try {
      const user = await this.authAPI.getMe();

      store.set('user', transformUserDataResponse(user));
    } catch (err) {
      console.error(err);
    }
  }

  public async signUp(data: SignUpRequest) {
    try {
      await this.authAPI.signUp(data);
      await this.getMe();
      Router.getInstance().go(ROUTES.MESSENGER);
    } catch (err) {
      console.error(err);
    }
  }

  public async logout() {
    try {
      await this.authAPI.logout();
    } catch (err) {
      console.error(err);
    }
  }
}

export default new AuthController();
