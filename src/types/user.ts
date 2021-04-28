import { Optional, Model } from 'sequelize/types';

export interface UserDto {
  readonly id: string;
  readonly login: string;
  readonly password: string;
  readonly age: number;
}

export type TUserResponse = {
  id: string;
  login: string;
  age: number;
};

export type TUserRequest = {
  id?: string;
  login: string;
  password: string;
  age: number;
};

export type TUserUpdateRequest = {
  id: string;
  login?: string;
  password?: string;
  age?: number;
};

export interface IUserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
}

export type TUserCreationAttributes = Optional<IUserAttributes, 'id'>;
