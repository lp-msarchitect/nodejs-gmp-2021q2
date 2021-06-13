import { User } from 'db/models/user';
import { IUserAttributes, IUserEntity } from './user';

export interface IAuthService {
  login(username: string, password: string): Promise<string | null>;
}
