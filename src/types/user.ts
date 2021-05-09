import { Optional, Model } from 'sequelize/types';

export interface UserDto {
  readonly id: number;
  readonly login: string;
  readonly password: string;
  readonly age: number;
}

export type TUserResponse = {
  id: number;
  login: string;
  age: number;
};

export type TUserRequest = {
  id?: number;
  login: string;
  password: string;
  age: number;
};

export type TUserUpdateRequest = {
  id: number;
  login?: string;
  password?: string;
  age?: number;
};

export interface IUserAttributes {
  id: number;
  login: string;
  password: string;
  age: number;
}

export type TUserCreationAttributes = Optional<IUserAttributes, 'id'>;
