import { User } from '../types';
import { BASE_API_URL } from './constants';
import { trim } from './utils';

const baseURL = trim(BASE_API_URL, '/');

export const getResourceURL = (endpoint: string) => {
  return `${baseURL}/resource${endpoint}`;
};

export const transformGetMeResponse = (data: User): User => ({
  ...data,
  avatar: getResourceURL(data.avatar),
});
