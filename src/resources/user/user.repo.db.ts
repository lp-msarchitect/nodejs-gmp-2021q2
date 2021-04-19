import { v4 as uuidv4 } from 'uuid';
import { User, UserRequest, UserUpdateRequest } from 'types/user';

const users: User[] = [];

const getUserById = (id: string): User | null =>
  users.find((user) => user.id === id && !user.isDeleted) || null;

const getUsersLoginSubstring = (subStr: string): User[] =>
  users.filter((user) => user.login.includes(subStr) && !user.isDeleted);

const updateUser = (options: UserUpdateRequest): User | null => {
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

const createUser = (user: UserRequest): User => {
  const { login, password, age } = user;
  const newUser = {
    id: uuidv4(),
    login,
    password,
    age,
    isDeleted: false,
  };
  users.push(newUser);
  return newUser;
};

const deleteUser = (id: string): boolean => {
  const user = users.find((user) => user.id === id && !user.isDeleted);
  if (user) user.isDeleted = true;
  return Boolean(user);
};

export default { getUserById, getUsersLoginSubstring, updateUser, deleteUser, createUser };
