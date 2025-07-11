import { User } from '../../types';

export type UpdateUserInfoRequest = Omit<User, 'id' | 'avatar'>;
export type UpdateUserInfoResponse = User;

export type UpdateUserAvatarRequest = FormData;
export type UpdateUserAvatarResponse = User;

export type UpdateUserPasswordRequest = {
  oldPassword: string;
  newPassword: string;
};
export type UpdateUserPasswordResponse = void;

export type FindUserRequest = Pick<User, 'login'>;
export type FindUserResponse = Array<User>;
