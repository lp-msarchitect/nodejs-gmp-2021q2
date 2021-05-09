import { Optional } from 'sequelize/types';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

// export type Group = {
//   id: string;
//   name: string;
//   permission: Permission[];
// };

export interface GroupDTO {
  readonly id: number;
  readonly name: string;
  readonly permissions: Permission[];
}

export interface IGroupAttributes {
  id: number;
  name: string;
  permissions: Permission[];
}

export type TGroupCreationAttributes = Optional<IGroupAttributes, 'id'>;
