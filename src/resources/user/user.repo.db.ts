import { Op, WhereOperators } from 'sequelize';
import { TUserRequest, TUserUpdateRequest } from 'types/user';
import { User } from './user.model.db';

const getUserById = (id: string): Promise<User> => User.findByPk(id);

const getUsersLoginSubstring = (subStr: string, limit: number): Promise<User[]> =>
  User.findAll({
    where: {
      login: <WhereOperators>{
        [Op.substring]: subStr,
      },
    },
    limit: limit,
  });

const updateUser = (options: TUserUpdateRequest): Promise<[number, User[]]> =>
  User.update(options, {
    where: {
      id: options.id,
    },
    returning: true,
  });

const createUser = (user: TUserRequest): Promise<User> => User.create(user);

const deleteUser = (id: string): Promise<number> =>
  User.destroy({
    where: { id: id },
  });

export default { getUserById, getUsersLoginSubstring, updateUser, deleteUser, createUser };
