import { NextFunction, Request, Response } from 'express';

type TRouter = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const wrapRoute = (router: TRouter) => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await router(req, res, next);
    next();
  } catch (error) {
    next(error);
  }
};
