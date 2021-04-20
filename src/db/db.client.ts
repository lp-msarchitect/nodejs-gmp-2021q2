import { Sequelize } from 'sequelize';
import { User } from '../resources/user';
import { users } from './users';

export const sequelize = new Sequelize('postgresql://postgres@localhost/nmp');

export const seedDB = async (): Promise<void> => {
  await sequelize.sync({ force: true });
  await Promise.all(
    users.map((user) => {
      User.create(user);
    }),
  );
};
