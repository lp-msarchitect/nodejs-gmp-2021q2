'use strict';
import { Model } from 'sequelize';
import { IGroupAttributes, TGroupCreationAttributes, Permission } from 'types/group';

class Group extends Model<IGroupAttributes, TGroupCreationAttributes> implements IGroupAttributes {
  public id: string;
  public name!: string;
  public permissions!: Permission[];
  static associate(models: any): any {
    Group.belongsToMany(models.User, {
      through: 'UserGroup',
      as: 'users',
      foreignKey: 'groupId',
      otherKey: 'userId',
    });
  }
}

module.exports = (sequelize: any, DataTypes: any): typeof Group => {
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
        type: DataTypes.ARRAY(
          DataTypes.ENUM({ values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'] }),
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Group',
      tableName: 'groups',
    },
  );
  return Group;
};
