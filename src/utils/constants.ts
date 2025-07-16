export const ROUTES = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  MESSENGER: '/messenger',
  SETTINGS: '/settings',
  NOT_ALLOWED: '/403',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
  ROOT: '/',
} as const;

export const BASE_API_URL = 'https://ya-praktikum.tech/api/v2/';
export const BASE_WS_URL = 'wss://ya-praktikum.tech/';
