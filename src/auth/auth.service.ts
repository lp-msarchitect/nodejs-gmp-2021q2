import jwt from 'jsonwebtoken';
import { User } from '../db/models/user';
import { IAuthService } from '../types/auth';
import { methodLog } from '../common/decorators';
import db from '../db/models';

const UserModel: typeof User = db.User;

export class AuthService implements IAuthService {
  @methodLog
  public async login(username: string, password: string): Promise<string | null> {
    const user = await UserModel.findOne({
      where: {
        login: username,
        password,
      },
    });
    if (!user) {
      return null;
    }
    return this.generateToken(user);
  }
  private generateToken(user: User): string {
    const { id, login } = user;
    return jwt.sign({ id, login }, process.env.TOKEN_SECRET, { expiresIn: '10m' });
  }
}
