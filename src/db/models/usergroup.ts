'use strict';
import { Model } from 'sequelize';

class UserGroup extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
  }
}

module.exports = (sequelize: any, DataTypes: any): typeof UserGroup => {
  UserGroup.init(
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: DataTypes.UUID,
      groupId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'UserGroup',
      tableName: 'user_groups',
    },
  );
  return UserGroup;
};
