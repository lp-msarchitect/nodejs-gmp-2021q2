'use strict';
import { Model } from 'sequelize';
import { IUserAttributes, TUserCreationAttributes } from 'types/user';

module.exports = (sequelize: any, DataTypes: any): any => {
  class User extends Model<IUserAttributes, TUserCreationAttributes> implements IUserAttributes {
    public id: number;
    public login!: string;
    public password!: string;
    public age!: number;
    static associate(models: any): void {
      User.belongsToMany(models.Group, {
        through: 'UserGroup',
        as: 'users',
        foreignKey: 'userId',
        otherKey: 'groupId',
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
