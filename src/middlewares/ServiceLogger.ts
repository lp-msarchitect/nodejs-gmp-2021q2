import { Request, NextFunction } from 'express';
import { ServiceLogger, LoggingResponse } from 'types/server';
import logger from '../common/logger';

const createServiceLogger = (): ServiceLogger => {
  return {
    log(method: string, args: Record<string, unknown>): void {
      logger.info(
        `\nCall service method: ${method}\nWith args: ${JSON.stringify(args, null, 2)}\n`,
      );
    },
  };
};

export const attachServiceLogger = (
  req: Request,
  res: LoggingResponse,
  next: NextFunction,
): void => {
  res.serviceLogger = createServiceLogger();
  next();
};

export const requestLogger = (req: Request, res: LoggingResponse, next: NextFunction): void => {
  logger.info(`[${req.method}] - ${req.url}`);
  next();
};
