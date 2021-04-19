import { Model } from 'sequelize';

export const userModel = (seq: any, dataTypes: any) => {
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
      tableName: 'users',
    },
  );
  return User;
};
