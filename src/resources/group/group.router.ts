import { Request, Response, NextFunction, Router } from 'express';
import groupService from './group.service';
import { validate, groupScheme } from '../../common/validate';
import { GroupDTO } from 'types/group';

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
    const groupDTO: GroupDTO = req.body;
    const group = await groupService.create(groupDTO);
    res.status(201).json(group);
  },
);

groupsRouter.put(
  '/:id',
  validate(groupScheme),
  async (req: Request, res: Response, next: NextFunction) => {
    const groupDTO: GroupDTO = req.body;
    const { id } = req.params;
    const group = await groupService.update({ ...groupDTO, id: Number(id) });
    group ? res.json(group) : res.status(404).send(`group ${id} not found`);
  },
);

groupsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const isDeleted = await groupService.remove(id);
  isDeleted ? res.send(`group ${id} was deleted`) : res.status(404).send(`group ${id} not found`);
});
