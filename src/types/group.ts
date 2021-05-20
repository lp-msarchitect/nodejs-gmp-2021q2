import { Optional } from 'sequelize/types';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface IGroupAttributes {
  id: string;
  name: string;
  permissions: Permission[];
}

export type TGroupCreationAttributes = Optional<IGroupAttributes, 'id'>;

export interface IGroupEntity extends IGroupAttributes {
  users: {
    id: string;
    login: string;
  }[];
}

export type TGroupResponse = IGroupEntity;
