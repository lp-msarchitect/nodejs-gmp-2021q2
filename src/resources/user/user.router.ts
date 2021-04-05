import { Request, Response, NextFunction, Router } from 'express';
import userService from './user.service';
import { validate, userScheme } from '../../common/validate';

export const usersRouter = Router();

usersRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  const { loginSubstring = '', limit = 10 } = req.query;
  const userList = userService.getUsersList(String(loginSubstring), Number(limit));
  res.json(userList);
});

usersRouter.post('/', validate(userScheme), (req: Request, res: Response, next: NextFunction) => {
  const { password, login, age } = req.body;
  const { id } = userService.createUser({ password, login, age });
  const user = userService.getUserById(id);
  res.status(201).json(user);
});

usersRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const user = userService.getUserById(id);
  user ? res.json(user) : res.status(404).send(`user ${id} not found`);
});

usersRouter.put('/:id', validate(userScheme), (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { login, age, password } = req.body;
  userService.updateUser({ id, login, age, password });
  const user = userService.getUserById(id);
  user ? res.json(user) : res.status(404).send(`user ${id} not found`);
});

usersRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  userService.deleteUser(id)
    ? res.send(`User ${id} was deleted`)
    : res.status(404).send(`user ${id} not found`);
});
