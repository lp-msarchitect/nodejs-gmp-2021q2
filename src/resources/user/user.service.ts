import { TUserCreationAttributes, TUserUpdateRequest, TUserResponse } from 'types/user';
import userRepo from './user.repo.db';

export const getUserById = async (id: string): Promise<TUserResponse> => {
  const user = await userRepo.getUserById(id);
  if (user !== null) {
    return {
      id: user.id,
      login: user.login,
      age: user.age,
      groups: user.groups,
    };
  }
  return null;
};

export const getUsersList = async (loginSubstr = '', limit?: number): Promise<TUserResponse[]> => {
  const users = await userRepo.getUsersLoginSubstring(loginSubstr, limit || null);

  return users
    .sort((a, b) => {
      const x = a.login ? a.login.toLowerCase() : '';
      const y = b.login ? b.login.toLowerCase() : '';
      return x.localeCompare(y);
    })
    .map(({ id, login, age, groups }) => ({ id, login, age, groups }));
};

export const createUser = async (user: TUserCreationAttributes): Promise<TUserResponse> => {
  const newUser = await userRepo.createUser(user);
  const { id, login, age, groups } = newUser;
  return { id, login, age, groups };
};

export const updateUser = async (user: TUserUpdateRequest): Promise<TUserResponse> => {
  try {
    const [count, updatedUser] = await userRepo.updateUser(user);
    if (count > 0) {
      const { id, login, age, groups } = updatedUser.pop();
      return { id, login, age, groups };
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const count = await userRepo.deleteUser(id);
  return count > 0;
};

export default {
  getUserById,
  getUsersList,
  createUser,
  updateUser,
  deleteUser,
};
