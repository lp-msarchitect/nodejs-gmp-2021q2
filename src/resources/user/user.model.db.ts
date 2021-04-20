import { DataTypes, Model, Sequelize } from 'sequelize';
import { IUserAttributes, TUserCreationAttributes } from 'types/user';

export class User
  extends Model<IUserAttributes, TUserCreationAttributes>
  implements IUserAttributes {
  public id: string;
  public login!: string;
  public password!: string;
  public age!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initUserModel = (sequelize: Sequelize): void => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
    },
    {
      modelName: 'User',
      sequelize,
      tableName: 'users',
    },
  );
};
