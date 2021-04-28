import { IGroupAttributes, TGroupCreationAttributes } from 'types/group';
import { Group } from './group.model.db';

const getAll = () => Group.findAll();

const getItemById = (id: string) => Group.findByPk(id);

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
