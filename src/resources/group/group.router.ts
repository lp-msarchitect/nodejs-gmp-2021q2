import { Request, NextFunction, Router } from 'express';
import groupService from './group.service';
import { validate, groupScheme } from '../../common/validate';
import { LoggingResponse } from 'types/server';
import { GroupController } from './group.controller';

export const groupsRouter = Router();
const groupController = new GroupController(groupService);

groupsRouter.get('/', async (req: Request, res: LoggingResponse, next: NextFunction) => {
  await groupController.getGroups(req, res);
  next();
});

groupsRouter.get('/:id', async (req: Request, res: LoggingResponse, next: NextFunction) => {
  await groupController.getOneGroup(req, res);
  next();
});

groupsRouter.post(
  '/',
  validate(groupScheme),
  async (req: Request, res: LoggingResponse, next: NextFunction) => {
    await groupController.addGroup(req, res);
    next();
  },
);

groupsRouter.put(
  '/:id',
  validate(groupScheme),
  async (req: Request, res: LoggingResponse, next: NextFunction) => {
    await groupController.updateGroup(req, res);
    next();
  },
);

groupsRouter.put('/:id/users', async (req: Request, res: LoggingResponse, next: NextFunction) => {
  await groupController.addUsersToGroup(req, res);
  next();
});

groupsRouter.delete('/:id', async (req: Request, res: LoggingResponse, next: NextFunction) => {
  await groupController.deleteGroup(req, res);
  next();
});
