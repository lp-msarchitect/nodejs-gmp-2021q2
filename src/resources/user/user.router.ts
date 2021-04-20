import { Request, Response, NextFunction, Router } from 'express';
import userService from './user.service';
import { validate, userScheme } from '../../common/validate';

export const usersRouter = Router();

usersRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  const { loginSubstring = '', limit = 10 } = req.query;
  const userList = userService.getUsersList(String(loginSubstring), Number(limit));
  res.json(userList);
});

usersRouter.post(
  '/',
  validate(userScheme),
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, login, age } = req.body;
    const user = await userService.createUser({ password, login, age });
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
    const { id } = req.params;
    const { login, age, password } = req.body;
    const user = await userService.updateUser({ id, login, age, password });
    user ? res.json(user) : res.status(404).send(`user ${id} not found`);
  },
);

usersRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  userService.deleteUser(id)
    ? res.send(`User ${id} was deleted`)
    : res.status(404).send(`user ${id} not found`);
});
