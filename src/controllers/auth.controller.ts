import { AuthAPI, authAPI, SignInRequest } from '../api';
import { store } from '../core';
import { transformGetMeResponse } from '../utils';

export class AuthController {
  private readonly authAPI: AuthAPI;

  constructor() {
    this.authAPI = authAPI;
  }

  public async signIn(data: SignInRequest) {
    try {
      await this.authAPI.signIn(data);
    } catch (err) {
      console.error(err);
    }
  }

  public async getMe() {
    try {
      const user = await this.authAPI.getMe();

      store.set('user', transformGetMeResponse(user));
    } catch (err) {
      console.error(err);
    }
  }
}
