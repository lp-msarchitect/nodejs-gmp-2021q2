import { methodLog } from '../../common/decorators';
import { Request } from 'express';
import { IGroupAttributes } from 'types/group';
import { LoggingResponse } from 'types/server';
import GroupService from './group.service';

export class GroupController {
  private service: GroupService;
  constructor(service: GroupService) {
    this.service = service;
  }

  @methodLog
  async addGroup(req: Request, res: LoggingResponse): Promise<void> {
    const groupDTO: IGroupAttributes = req.body;
    res.serviceLogger.log('create', { groupDTO });
    const group = await this.service.create(groupDTO);
    res.status(201).json(group);
  }

  @methodLog
  async updateGroup(req: Request, res: LoggingResponse): Promise<void> {
    const groupDTO: IGroupAttributes = req.body;
    const { id } = req.params;
    res.serviceLogger.log('update', { groupDTO: { ...groupDTO, id } });
    const group = await this.service.update({ ...groupDTO, id });
    group ? res.json(group) : res.status(404).send(`group ${id} not found`);
  }

  @methodLog
  async getGroups(req: Request, res: LoggingResponse): Promise<void> {
    res.serviceLogger.log('getAll');
    const groupsList = await this.service.getAll();
    res.json(groupsList);
  }

  @methodLog
  async getOneGroup(req: Request, res: LoggingResponse): Promise<void> {
    const { id } = req.params;
    res.serviceLogger.log('getItemById', { id });
    const group = await this.service.getItemById(id);
    group ? res.json(group) : res.status(404).send(`group ${id} not found`);
  }

  @methodLog
  async deleteGroup(req: Request, res: LoggingResponse): Promise<void> {
    const { id } = req.params;
    res.serviceLogger.log('remove', { id });
    const isDeleted = await this.service.remove(id);
    isDeleted ? res.send(`group ${id} was deleted`) : res.status(404).send(`group ${id} not found`);
  }

  @methodLog
  async addUsersToGroup(req: Request, res: LoggingResponse): Promise<void> {
    try {
      const { users } = req.body;
      const { id } = req.params;
      res.serviceLogger.log('addUsersToGroup', { id, users });
      const group = await this.service.addUsersToGroup(id, users);
      group ? res.json(group) : res.status(404).send(`group ${id} not found`);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
}
