import { TUserCreationAttributes, TUserUpdateRequest, TUserResponse } from 'types/user';
import userRepo from './user.repo.db';

export default class UserService {
  private repo: typeof userRepo;
  constructor(repo: typeof userRepo) {
    this.repo = repo;
  }
  async getUserById(id: string): Promise<TUserResponse> {
    const user = await this.repo.getUserById(id);
    if (user !== null) {
      return {
        id: user.id,
        login: user.login,
        age: user.age,
        groups: user.groups,
      };
    }
    return null;
  }
  async getUsersList(loginSubstr = '', limit?: number): Promise<TUserResponse[]> {
    const users = await this.repo.getUsersLoginSubstring(loginSubstr, limit || null);

    return users
      .sort((a, b) => {
        const x = a.login ? a.login.toLowerCase() : '';
        const y = b.login ? b.login.toLowerCase() : '';
        return x.localeCompare(y);
      })
      .map(({ id, login, age, groups }) => ({ id, login, age, groups }));
  }
  async createUser(user: TUserCreationAttributes): Promise<TUserResponse> {
    const newUser = await this.repo.createUser(user);
    const { id, login, age, groups } = newUser;
    return { id, login, age, groups };
  }
  async updateUser(user: TUserUpdateRequest): Promise<TUserResponse> {
    try {
      const [count, updatedUser] = await this.repo.updateUser(user);
      if (count > 0) {
        const { id, login, age, groups } = updatedUser.pop();
        return { id, login, age, groups };
      }
      return null;
    } catch (error) {
      return null;
    }
  }
  async deleteUser(id: string): Promise<boolean> {
    const count = await this.repo.deleteUser(id);
    return count > 0;
  }
}
