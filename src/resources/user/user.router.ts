import { Request, NextFunction, Router } from 'express';
import userService from './user.service';
import { validate, userScheme } from '../../common/validate';
import { LoggingResponse } from 'types/server';
import { UserController } from './user.controller';

export const usersRouter = Router();
const userController = new UserController(userService);

usersRouter.get('/', async (req: Request, res: LoggingResponse, next: NextFunction) => {
  await userController.getUsers(req, res);
  next();
});

usersRouter.post(
  '/',
  validate(userScheme),
  async (req: Request, res: LoggingResponse, next: NextFunction) => {
    await userController.addUser(req, res);
    next();
  },
);

usersRouter.get('/:id', async (req: Request, res: LoggingResponse, next: NextFunction) => {
  await userController.getOneUser(req, res);
  next();
});

usersRouter.put(
  '/:id',
  validate(userScheme),
  async (req: Request, res: LoggingResponse, next: NextFunction) => {
    await userController.updateUser(req, res);
    next();
  },
);

usersRouter.delete('/:id', async (req: Request, res: LoggingResponse, next: NextFunction) => {
  await userController.deleteUser(req, res);
  next();
});
