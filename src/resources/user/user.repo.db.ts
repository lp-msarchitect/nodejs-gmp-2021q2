import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { User, UserRequest, UserUpdateRequest } from 'types/user';
import { models, sequelize } from '../../db/db.client';

const getUserById = (id: string) => models.User.findByPk(id);

const getUsersLoginSubstring = (subStr: string, limit: number) =>
  models.User.findAll({
    where: {
      [Op.substring]: subStr,
    },
    limit: limit,
  });

const updateUser = (options: UserUpdateRequest) =>
  models.User.update(options, {
    where: {
      id: options.id,
    },
  });

const createUser = (user: UserRequest) => models.User.create(user);

const deleteUser = (id: string) =>
  models.User.destroy({
    where: { id: id },
  });

export default { getUserById, getUsersLoginSubstring, updateUser, deleteUser, createUser };
