export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export type UserResponse = {
  id: string;
  login: string;
  age: number;
};

export type UserRequest = {
  id?: string;
  login: string;
  password: string;
  age: number;
};
