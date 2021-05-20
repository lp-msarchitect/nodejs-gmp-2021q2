import { Op, WhereOperators } from 'sequelize';
import { IUserEntity, TUserCreationAttributes, TUserUpdateRequest } from 'types/user';
import db from '../../db/models';

const User = db.User;
const Group = db.Group;
const UserGroup = db.UserGroup;

const getUserById = (id: string): Promise<IUserEntity> =>
  User.findByPk(id, {
    include: [
      {
        model: Group,
        as: 'groups',
        required: false,
        attributes: ['id', 'name'],
        through: {
          model: UserGroup,
        },
      },
    ],
  });

const getUsersLoginSubstring = (subStr: string, limit: number): Promise<IUserEntity[]> =>
  User.findAll({
    where: {
      login: <WhereOperators>{
        [Op.substring]: subStr,
      },
    },
    limit: limit,
    include: [
      {
        model: Group,
        as: 'groups',
        required: false,
        attributes: ['id', 'name'],
        through: {
          model: UserGroup,
        },
      },
    ],
  });

const updateUser = (options: TUserUpdateRequest): Promise<[number, IUserEntity[]]> =>
  User.update(options, {
    where: {
      id: options.id,
    },
    returning: true,
  });

const createUser = (user: TUserCreationAttributes): Promise<IUserEntity> => User.create(user);

const deleteUser = (id: string): Promise<number> =>
  User.destroy({
    where: { id: id },
  });

export default { getUserById, getUsersLoginSubstring, updateUser, deleteUser, createUser };
