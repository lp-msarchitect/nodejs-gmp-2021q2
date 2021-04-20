import { isDate } from 'node:util';
import { UserRequest, UserResponse, UserUpdateRequest } from '../../types/user';
import userRepo from './user.repo.db';

export const getUserById = async (id: string) => {
  const user = await userRepo.getUserById(id);
  if (user !== null) {
    return {
      id: user.id,
      login: user.login,
      age: user.age,
    };
  }
  return null;
};

export const getUsersList = async (loginSubstr = '', limit?: number) => {
  const users = await userRepo.getUsersLoginSubstring(loginSubstr, limit || null);
  return users
    .sort((a, b) => {
      const x = a.login ? a.login.toLowerCase() : '';
      const y = b.login ? b.login.toLowerCase() : '';
      return x.localeCompare(y, 'base', { ignorePunctuation: true });
    })
    .map(({ id, login, age }) => ({ id, login, age }));
};

export const createUser = async (user: UserRequest) => {
  const newUser = await userRepo.createUser(user);
  const { id, login, age } = newUser;
  return { id, login, age };
};

export const updateUser = async (user: UserUpdateRequest) => {
  const { id } = user;
  const newUser = userRepo.updateUser(user);
  return newUser ? await getUserById(id) : null;
};

export const deleteUser = async (id: string) => (await userRepo.deleteUser(id)) > 0;

export default {
  getUserById,
  getUsersList,
  createUser,
  updateUser,
  deleteUser,
};
