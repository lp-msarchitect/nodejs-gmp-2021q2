import { Optional, Model } from 'sequelize/types';

// export type User = {
//   id: string;
//   login: string;
//   password: string;
//   age: number;
//   isDeleted: boolean;
// };

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
