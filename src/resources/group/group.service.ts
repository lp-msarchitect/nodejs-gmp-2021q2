import { IGroupAttributes, TGroupCreationAttributes } from 'types/group';
import groupsRepo from './group.repo.db';

const getAll = () => groupsRepo.getAll();

const getItemById = (id: string) => groupsRepo.getItemById(id);

const create = (group: IGroupAttributes) => groupsRepo.create(group);

const update = async (group: TGroupCreationAttributes) => {
  const [count, updatedGroups] = await groupsRepo.update(group);
  if (count !== 0) {
    return updatedGroups.pop();
  }
  return null;
};

const remove = (id: string) => groupsRepo.remove(id);

export default { getAll, getItemById, create, update, remove };
