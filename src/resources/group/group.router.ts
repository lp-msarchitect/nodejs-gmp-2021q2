import { Request, Response, NextFunction, Router } from 'express';
import groupService from './group.service';
import { validate, groupScheme } from '../../common/validate';
import { IGroupAttributes } from 'types/group';

export const groupsRouter = Router();

groupsRouter.get('/', async (req: Request, res: Response) => {
  const groupsList = await groupService.getAll();
  res.json(groupsList);
});

groupsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const group = await groupService.getItemById(id);
  group ? res.json(group) : res.status(404).send(`group ${id} not found`);
});

groupsRouter.post(
  '/',
  validate(groupScheme),
  async (req: Request, res: Response, next: NextFunction) => {
    const groupDTO: IGroupAttributes = req.body;
    const group = await groupService.create(groupDTO);
    res.status(201).json(group);
  },
);

groupsRouter.put(
  '/:id',
  validate(groupScheme),
  async (req: Request, res: Response, next: NextFunction) => {
    const groupDTO: IGroupAttributes = req.body;
    const { id } = req.params;
    const group = await groupService.update({ ...groupDTO, id });
    group ? res.json(group) : res.status(404).send(`group ${id} not found`);
  },
);

groupsRouter.put('/:id/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { users } = req.body;
    const { id } = req.params;
    const group = await groupService.addUsersToGroup(id, users);
    group ? res.json(group) : res.status(404).send(`group ${id} not found`);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

groupsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const isDeleted = await groupService.remove(id);
  isDeleted ? res.send(`group ${id} was deleted`) : res.status(404).send(`group ${id} not found`);
});
