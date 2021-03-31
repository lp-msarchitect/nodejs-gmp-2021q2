import { UserRequest, UserResponse } from '../../types/user';

export const getUserById = (id: string): UserResponse => {
  return {
    id: 'sdf',
    login: 'asdf',
    age: 33,
  };
};

export const getUsersList = (): UserResponse[] => {
  return [];
};

export const createUser = ({ login, password, age }: UserRequest): UserResponse => {
  return {
    id: 'id',
    login,
    age,
  };
};

export const updateUser = (user: UserRequest): UserResponse => {
  const { id, login, age } = user;
  return {
    id,
    login,
    age,
  };
};

export const deleteUser = (id: string): string => {
  return `delete user ${id}`;
};
