import { IGroupAttributes, IGroupEntity, TGroupCreationAttributes } from 'types/group';
import db from '../../db/models';

const Group = db.Group;
const User = db.User;
const UserGroup = db.UserGroup;
const sequelize = db.sequelize;

const getAll = (): Promise<IGroupEntity[]> =>
  Group.findAll({
    include: [
      {
        model: User,
        as: 'users',
        required: false,
        attributes: ['id', 'login'],
        through: {
          attributes: [],
        },
      },
    ],
  });

const getItemById = (id: string): Promise<IGroupEntity> =>
  Group.findByPk(id, {
    include: [
      {
        model: User,
        as: 'users',
        required: false,
        attributes: ['id', 'login'],
        through: {
          attributes: [],
        },
      },
    ],
  });

const create = (item: TGroupCreationAttributes): Promise<IGroupEntity> => Group.create(item);

const update = (options: TGroupCreationAttributes): Promise<[number, IGroupEntity[]]> =>
  Group.update(options, {
    where: {
      id: options.id,
    },
    returning: true,
  });

const remove = (id: string): Promise<number> => Group.destroy({ where: { id: id } });

const addUsers = async (groupId: string, userIds: string[]): Promise<IGroupEntity | null> => {
  const t = await sequelize.transaction();

  try {
    const group = await Group.findByPk(groupId);
    if (group) {
      await Promise.all(
        userIds.map(async (userId) => {
          const user = await User.findByPk(userId);
          await group.addUser(user, { transaction: t });
        }),
      );
      await t.commit();
      return await Group.findByPk(groupId);
    }
  } catch (error) {
    console.log('error', error);

    await t.rollback();
    return null;
  }
};

export default { getAll, getItemById, create, update, remove, addUsers };
