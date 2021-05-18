import { Optional } from 'sequelize/types';
export interface IUserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
}

export type TUserCreationAttributes = Optional<IUserAttributes, 'id'>;

export type TUserUpdateRequest = Partial<IUserAttributes>;

export type TUserResponse = Omit<IUserAttributes, 'password'>;
