import { users } from '../../db/users';
import { User, UserUpdateRequest } from 'types/user';

export const getUserById = (id: string): User | null =>
  users.find((user) => user.id === id && !user.isDeleted) || null;

export const getUsersLoginSubstring = (subStr: string): User[] =>
  users.filter((user) => user.login.includes(subStr) && !user.isDeleted);

export const updateUser = (options: UserUpdateRequest): User | null => {
  const index = users.findIndex((user) => user.id === options.id && !user.isDeleted);
  if (index !== -1) {
    const newUser = {
      ...users[index],
      ...options,
    };

    users.splice(index, 1, newUser);
    return newUser;
  }
  return null;
};

export const deleteUser = (id: string): boolean => {
  const user = users.find((user) => user.id === id);
  if (user) user.isDeleted = true;
  return Boolean(user);
};
