import { BASE_API_URL } from './constants';
import { formatTime } from './format-time';
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

export const transformDataWithTime = <T extends { time: string }>(
  data: T,
): T => ({
  ...data,
  time: formatTime(data.time),
});

export const transformArrayWithTime = <T extends { time: string }>(
  data: Array<T>,
): Array<T> => data.map((value) => transformDataWithTime(value));
