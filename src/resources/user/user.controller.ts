import { Request } from 'express';
import { IUserAttributes } from 'types/user';
import { LoggingResponse } from '../../types/server';
import userService from './user.service';

export class UserController {
  private service: typeof userService;
  constructor(service: typeof userService) {
    this.service = service;
  }
  async addUser(req: Request, res: LoggingResponse): Promise<void> {
    const userDTO: IUserAttributes = req.body;
    res.serviceLogger.log('createUser', {
      userDTO,
    });
    const user = await this.service.createUser(userDTO);
    res.status(201).json(user);
  }
  async updateUser(req: Request, res: LoggingResponse): Promise<void> {
    const userDTO: IUserAttributes = req.body;
    res.serviceLogger.log('createUser', {
      userDTO,
    });
    const user = await this.service.createUser(userDTO);
    res.status(201).json(user);
  }
  async deleteUser(req: Request, res: LoggingResponse): Promise<void> {
    const { id } = req.params;
    res.serviceLogger.log('deleteUser', {
      id,
    });
    const result = await this.service.deleteUser(id);
    result ? res.send(`User ${id} was deleted`) : res.status(404).send(`user ${id} not found`);
  }
  async getUsers(req: Request, res: LoggingResponse): Promise<void> {
    const { loginSubstring = '', limit = 10 } = req.query;
    res.serviceLogger.log('getUsersList', {
      loginSubstring,
      limit,
    });
    const userList = await this.service.getUsersList(String(loginSubstring), Number(limit));
    res.json(userList);
  }
  async getOneUser(req: Request, res: LoggingResponse): Promise<void> {
    const { id } = req.params;
    res.serviceLogger.log('getUserById', {
      id,
    });
    const user = await this.service.getUserById(id);
    user ? res.json(user) : res.status(404).send(`user ${id} not found`);
  }
}
