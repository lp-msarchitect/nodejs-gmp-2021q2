import { TUserRequest, TUserResponse, TUserUpdateRequest } from 'types/user';
import userRepo from './user.repo.db';

export const getUserById = async (id: string): Promise<TUserResponse> => {
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

export const getUsersList = async (loginSubstr = '', limit?: number): Promise<TUserResponse[]> => {
  const users = await userRepo.getUsersLoginSubstring(loginSubstr, limit || null);
  console.log('users', users);

  return users
    .sort((a, b) => {
      const x = a.login ? a.login.toLowerCase() : '';
      const y = b.login ? b.login.toLowerCase() : '';
      return x.localeCompare(y);
    })
    .map(({ id, login, age }) => ({ id, login, age }));
};

export const createUser = async (user: TUserRequest): Promise<TUserResponse> => {
  const newUser = await userRepo.createUser(user);
  const { id, login, age } = newUser;
  return { id, login, age };
};

export const updateUser = async (user: TUserUpdateRequest): Promise<TUserResponse> => {
  try {
    const [count, updatedUser] = await userRepo.updateUser(user);
    if (count > 0) {
      const { id, login, age } = updatedUser[0];
      return { id, login, age };
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
