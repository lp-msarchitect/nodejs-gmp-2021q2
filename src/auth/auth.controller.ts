import { Request, Response } from 'express';
import { IAuthService } from 'types/auth';
import { methodLog } from '../common/decorators';

export class AuthController {
  private service: IAuthService;
  constructor(service: IAuthService) {
    this.service = service;
  }
  @methodLog
  async signIn(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body;
    const token = await this.service.login(login, password);
    if (token) {
      res.send({ token });
    }
    res.status(401).send('Bad credentials');
  }
}
