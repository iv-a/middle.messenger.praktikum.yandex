import { Router, store } from '../core';
import { HTTPError } from '../core/errors';
import { ROUTES } from '../utils';

export class BaseController {
  protected handleError(err: unknown): void {
    let message = 'An unknown error occurred';

    if (err instanceof HTTPError) {
      switch (err.status) {
        case 400:
          message = 'Validation failed';
          break;
        case 401:
          message = 'Please log in';
          Router.getInstance().go(ROUTES.SIGN_IN);
          break;
        case 403:
          message = 'Access denied';
          break;
        case 404:
          message = 'Resource not found';
          break;
        case 500:
          message = 'Internal server error';
          Router.getInstance().go(ROUTES.SERVER_ERROR);
          break;
        default:
          message = `Error ${err.status}`;
      }
    } else if (err instanceof Error) {
      message = err.message;
    }

    store.set('error', message);
  }
}
