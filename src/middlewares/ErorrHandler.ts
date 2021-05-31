import { NextFunction, Request, Response } from 'express';

interface HttpError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }

  res.status(error.statusCode).json({
    status: false,
    error: error.message,
  });
};
