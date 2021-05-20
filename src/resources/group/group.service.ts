import { IGroupAttributes, TGroupCreationAttributes, TGroupResponse } from 'types/group';
import groupsRepo from './group.repo.db';

const getAll = async (): Promise<TGroupResponse[]> => {
  const groups = await groupsRepo.getAll();
  console.log(groups);
  return groups;
};

const getItemById = (id: string): Promise<TGroupResponse> => groupsRepo.getItemById(id);

const create = (group: IGroupAttributes): Promise<TGroupResponse> => groupsRepo.create(group);

const update = async (group: TGroupCreationAttributes): Promise<TGroupResponse> => {
  const [count, updatedGroups] = await groupsRepo.update(group);
  if (count !== 0) {
    return updatedGroups.pop();
  }
  return null;
};

const remove = (id: string): Promise<number> => groupsRepo.remove(id);

const addUsersToGroup = (groupId: string, userIds: string[]): Promise<TGroupResponse> => {
  return groupsRepo.addUsers(groupId, userIds);
};

export default { getAll, getItemById, create, update, remove, addUsersToGroup };
