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

const addUsersToGroup = (groupId: any, userIds: any) => {
  return groupsRepo.addUsers(groupId, userIds);
};

export default { getAll, getItemById, create, update, remove, addUsersToGroup };
