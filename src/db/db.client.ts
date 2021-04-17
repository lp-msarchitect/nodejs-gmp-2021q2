import { DataTypes, Model, Sequelize } from 'sequelize';
import { userModel } from '../resources/user';

const models = [userModel];

export const sequelize = new Sequelize('postgresql://postgres@localhost/nmp');

export const connectToDB = async (): Promise<Sequelize> => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    models.forEach((model) => model(sequelize, DataTypes));
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
