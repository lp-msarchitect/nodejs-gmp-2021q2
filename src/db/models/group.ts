'use strict';
import { Model } from 'sequelize';
import { IGroupAttributes, TGroupCreationAttributes, Permission } from 'types/group';

module.exports = (sequelize: any, DataTypes: any): any => {
  class Group
    extends Model<IGroupAttributes, TGroupCreationAttributes>
    implements IGroupAttributes {
    public id: number;
    public name!: string;
    public permissions!: Permission[];
    static associate(models: any): any {}
  }
  Group.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.ARRAY(
          DataTypes.ENUM({ values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'] }),
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Group',
    },
  );
  return Group;
};
