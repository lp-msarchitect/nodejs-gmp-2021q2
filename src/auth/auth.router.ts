import { validate, signInScheme } from '../common/validate';
import { NextFunction, Request, Router } from 'express';
import { LoggingResponse } from '../types/server';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

export const authRouter = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

authRouter.post(
  '/login',
  validate(signInScheme),
  async (req: Request, res: LoggingResponse, next: NextFunction) => {
    await authController.signIn(req, res);
    next();
  },
);
