import { Sequelize } from 'sequelize';
import { initUserModel } from '../resources/user';

export const sequelize = new Sequelize(
  'postgres://rqyrsigd:qTOfQjQ9BBVEEnbkBjTZ3in9Yowv5q87@tai.db.elephantsql.com:5432/rqyrsigd',
);

export const initModels = (): void => {
  initUserModel(sequelize);
};