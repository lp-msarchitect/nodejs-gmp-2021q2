import { methodLog } from '../../common/decorators';
import { Request } from 'express';
import { IUserAttributes } from 'types/user';
import { LoggingResponse } from '../../types/server';
import UserService from './user.service';

export class UserController {
  private service: UserService;
  constructor(service: UserService) {
    this.service = service;
  }
  @methodLog
  async addUser(req: Request, res: LoggingResponse): Promise<void> {
    const userDTO: IUserAttributes = req.body;
    res.serviceLogger.log('createUser', {
      userDTO,
    });
    const user = await this.service.createUser(userDTO);
    res.status(201).json(user);
  }
  @methodLog
  async updateUser(req: Request, res: LoggingResponse): Promise<void> {
    const userDTO: IUserAttributes = req.body;
    const { id } = req.params;
    userDTO.id = id;
    res.serviceLogger.log('updateUser', {
      userDTO,
    });
    const user = await this.service.updateUser(userDTO);
    user ? res.status(201).json(user) : res.status(404).send(`user ${userDTO.id} not found`);
  }
  @methodLog
  async deleteUser(req: Request, res: LoggingResponse): Promise<void> {
    const { id } = req.params;
    res.serviceLogger.log('deleteUser', {
      id,
    });
    const result = await this.service.deleteUser(id);
    result ? res.send(`User ${id} was deleted`) : res.status(404).send(`user ${id} not found`);
  }
  @methodLog
  async getUsers(req: Request, res: LoggingResponse): Promise<void> {
    const { loginSubstring = '', limit = 10 } = req.query;
    res.serviceLogger.log('getUsersList', {
      loginSubstring,
      limit,
    });
    const userList = await this.service.getUsersList(String(loginSubstring), Number(limit));
    res.json(userList);
  }
  @methodLog
  async getOneUser(req: Request, res: LoggingResponse): Promise<void> {
    const { id } = req.params;
    res.serviceLogger.log('getUserById', {
      id,
    });
    const user = await this.service.getUserById(id);
    user ? res.json(user) : res.status(404).send(`user ${id} not found`);
  }
}
