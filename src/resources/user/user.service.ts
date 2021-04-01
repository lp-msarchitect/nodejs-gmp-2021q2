import { UserRequest, UserResponse, UserUpdateRequest } from '../../types/user';
import userRepo from './user.repo.db';

export const getUserById = (id: string): UserResponse | null => {
  const user = userRepo.getUserById(id);
  if (user) {
    return {
      id: user.id,
      login: user.login,
      age: user.age,
    };
  }
  return null;
};

export const getUsersList = (loginSubstr = '', limit?: number): UserResponse[] =>
  userRepo
    .getUsersLoginSubstring(loginSubstr)
    .slice(0, limit)
    .map(({ id, login, age }) => ({ id, login, age }));

export const createUser = (user: UserRequest): UserResponse => {
  const { id } = userRepo.createUser(user);
  return getUserById(id);
};

export const updateUser = (user: UserUpdateRequest): UserResponse => {
  const { id } = user;
  userRepo.updateUser(user);
  return getUserById(id);
};

export const deleteUser = (id: string): string => {
  return `delete user ${id}`;
};

export default {
  getUserById,
  getUsersList,
  createUser,
  updateUser,
  deleteUser,
};
