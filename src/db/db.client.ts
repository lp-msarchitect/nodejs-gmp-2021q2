import { DataTypes, Model, Sequelize } from 'sequelize';
import { userModel } from '../resources/user';
import { users } from './users';

export const sequelize = new Sequelize('postgresql://postgres@localhost/nmp');

export const models = {
  User: userModel(sequelize, DataTypes),
};

export const seedDB = async () => {
  await sequelize.sync({ force: true });
  await Promise.all(
    users.map((user) => {
      models.User.create(user);
    }),
  );
};
