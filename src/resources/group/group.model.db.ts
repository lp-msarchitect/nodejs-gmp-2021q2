import { DataTypes, Model, Sequelize } from 'sequelize';
import { IGroupAttributes, TGroupCreationAttributes, Permission } from 'types/group';

export class Group
  extends Model<IGroupAttributes, TGroupCreationAttributes>
  implements IGroupAttributes {
  public id: string;
  public name!: string;
  public permissions!: Permission[];
}

export const initGroupModel = (sequelize: Sequelize): typeof Group => {
  Group.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'),
        allowNull: false,
      },
    },
    {
      modelName: 'Group',
      sequelize,
      tableName: 'groups',
      timestamps: false,
    },
  );
  return Group;
};
