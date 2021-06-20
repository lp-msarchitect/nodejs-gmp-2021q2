import { methodLog } from '../../common/decorators';
import { IGroupAttributes, TGroupCreationAttributes, TGroupResponse } from 'types/group';
import groupsRepo from './group.repo.db';

export default class GroupService {
  private repo: typeof groupsRepo;
  constructor(repo: typeof groupsRepo) {
    this.repo = repo;
  }

  @methodLog
  async getAll(): Promise<TGroupResponse[]> {
    const groups = await this.repo.getAll();
    console.log(groups);
    return groups;
  }

  @methodLog
  async getItemById(id: string): Promise<TGroupResponse> {
    return this.repo.getItemById(id);
  }

  @methodLog
  async create(group: IGroupAttributes): Promise<TGroupResponse> {
    return this.repo.create(group);
  }

  @methodLog
  async update(group: TGroupCreationAttributes): Promise<TGroupResponse | null> {
    const [count, updatedGroups] = await this.repo.update(group);
    if (count !== 0) {
      return updatedGroups.pop();
    }
    return null;
  }

  @methodLog
  async remove(id: string): Promise<number> {
    return this.repo.remove(id);
  }

  @methodLog
  async addUsersToGroup(groupId: string, userIds: string[]): Promise<TGroupResponse> {
    return this.repo.addUsers(groupId, userIds);
  }
}
