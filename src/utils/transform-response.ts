import { BASE_API_URL } from './constants';
import { trim } from './utils';

const baseURL = trim(BASE_API_URL, '/');

export const getResourceURL = (endpoint: string) => {
  return `${baseURL}/resources${endpoint}`;
};

export const transformDataWithAvatar = <T extends { avatar?: string | null }>(
  data: T,
): T => ({
  ...data,
  avatar: data.avatar ? getResourceURL(data.avatar) : null,
});
export const transformArrayWithAvatar = <T extends { avatar?: string | null }>(
  data: Array<T>,
): Array<T> => data.map((value) => transformDataWithAvatar(value));
