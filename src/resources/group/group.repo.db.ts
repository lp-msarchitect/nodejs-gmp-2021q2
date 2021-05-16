import { IGroupAttributes, TGroupCreationAttributes } from 'types/group';
import db from '../../db/models';

const Group = db.Group;
const User = db.User;
const UserGroup = db.UserGroup;
const sequelize = db.sequelize;

const getAll = () =>
  Group.findAll({
    include: [
      {
        model: User,
        as: 'User',
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
        as: 'User',
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

const addUsers = async (groupId: any, userIds: any) => {
  const t = await sequelize.transaction();

  try {
    const group = await Group.findByPk(groupId);
    if (group) {
      await Promise.all(
        userIds.map(async (userId: any) => {
          const user = await User.findByPk(userId);
          await group.addUser(user, { transaction: t });
        }),
      );
      await t.commit();
      return await Group.findByPk(groupId);
    }
  } catch (error) {
    await t.rollback();
    return null;
  }
};

export default { getAll, getItemById, create, update, remove, addUsers };
