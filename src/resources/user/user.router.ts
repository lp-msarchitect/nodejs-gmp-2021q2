import { Request, Response, Router } from 'express';
import userService from './user.service';
export const usersRouter = Router();

usersRouter.get('/', (req, res, next) => {
  const { loginSubstring = '', limit = 10 } = req.query;

  res.send({ loginSubstring, limit });
});

usersRouter.post('/', (req, res, next) => {
  res.send('Create new user');
});

usersRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const user = userService.getUserById(id);
  res.status(200).json(user);
});

usersRouter.post('/:id', (req, res, next) => {
  const { id } = req.params;
  res.send(`Update user by id ${id}`);
});

usersRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  res.send(`Delete user by id ${id}`);
});
