import './assets/styles/index.css';
import { HELPERS, registerHelpers, ROUTES } from './utils';
import {
  ChatsPage,
  ChatsPageProps,
  ErrorPage,
  ErrorPageProps,
  HomePage,
  SettingsPage,
  SignInPage,
  SignUpPage,
} from './pages';
import { Router } from './core';

registerHelpers(HELPERS);

const APP_ROOT_QUERY = '#app';
new Router(APP_ROOT_QUERY)
  .use(ROUTES.SIGN_IN, SignInPage)
  .use(ROUTES.SIGN_UP, SignUpPage)
  .use<ChatsPageProps>(ROUTES.MESSENGER, ChatsPage, {
    chatName: 'William Smith',
  })
  .use(ROUTES.SETTINGS, SettingsPage)
  .use<ErrorPageProps>(ROUTES.NOT_FOUND, ErrorPage, {
    code: 404,
    description: 'This page could not be found.',
  })
  .use<ErrorPageProps>(ROUTES.NOT_ALLOWED, ErrorPage, {
    code: 403,
    description: 'Access to this resource is denied.',
  })
  .use<ErrorPageProps>(ROUTES.SERVER_ERROR, ErrorPage, {
    code: 500,
    description:
      'Please try again later or contact support if the issue persists.',
  })
  .use(ROUTES.EXPLORE, HomePage)
  .use('/', HomePage)
  .start();
