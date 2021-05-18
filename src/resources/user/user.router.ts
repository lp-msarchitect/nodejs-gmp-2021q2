import { Request, Response, NextFunction, Router } from 'express';
import userService from './user.service';
import { validate, userScheme } from '../../common/validate';
import { IUserAttributes } from 'types/user';

export const usersRouter = Router();

usersRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { loginSubstring = '', limit = 10 } = req.query;
  const userList = await userService.getUsersList(String(loginSubstring), Number(limit));
  res.json(userList);
});

usersRouter.post(
  '/',
  validate(userScheme),
  async (req: Request, res: Response, next: NextFunction) => {
    const userDTO: IUserAttributes = req.body;
    const user = await userService.createUser(userDTO);
    res.status(201).json(user);
  },
);

usersRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  user ? res.json(user) : res.status(404).send(`user ${id} not found`);
});

usersRouter.put(
  '/:id',
  validate(userScheme),
  async (req: Request, res: Response, next: NextFunction) => {
    const userDTO: IUserAttributes = req.body;
    const { id } = req.params;
    const user = await userService.updateUser({ ...userDTO, id });
    user ? res.json(user) : res.status(404).send(`user ${id} not found`);
  },
);

usersRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  (await userService.deleteUser(id))
    ? res.send(`User ${id} was deleted`)
    : res.status(404).send(`user ${id} not found`);
});
