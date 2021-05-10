import { IGroupAttributes, TGroupCreationAttributes } from 'types/group';
import db from '../../db/models';

const Group = db.Group;
const User = db.User;
const UserGroup = db.UserGroup;

const getAll = () =>
  Group.findAll({
    include: [
      {
        model: User,
        as: 'users',
        required: false,
        attributes: ['id', 'login'],
        through: {
          model: UserGroup,
        },
      },
    ],
  });

const getItemById = (id: string) =>
  Group.findByPk(id, {
    include: [
      {
        model: User,
        as: 'users',
        required: false,
        attributes: ['id', 'login'],
        through: {
          model: UserGroup,
        },
      },
    ],
  });

const create = (item: TGroupCreationAttributes) => Group.create(item);

const update = (options: TGroupCreationAttributes) =>
  Group.update(options, {
    where: {
      id: options.id,
    },
    returning: true,
  });

const remove = (id: string) => Group.destroy({ where: { id: id } });

export default { getAll, getItemById, create, update, remove };
