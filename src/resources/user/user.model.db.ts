import { DataTypes, Model, Sequelize } from 'sequelize';

export const userModel = (seq: Sequelize, dataTypes: typeof DataTypes): typeof Model => {
  class User extends Model {}
  User.init(
    {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        primaryKey: true,
      },
      login: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: dataTypes.SMALLINT,
        allowNull: false,
      },
    },
    {
      modelName: 'User',
      sequelize: seq,
      tableName: 'Users',
    },
  );
  return User;
};
