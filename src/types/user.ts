import { Optional } from 'sequelize/types';
export interface IUserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
}

export type TUserCreationAttributes = Optional<IUserAttributes, 'id'>;

export type TUserUpdateRequest = Partial<IUserAttributes>;

export interface IUserEntity extends IUserAttributes {
  groups: {
    id: string;
    name: string;
  };
}

export type TUserResponse = Omit<IUserEntity, 'password'>;
