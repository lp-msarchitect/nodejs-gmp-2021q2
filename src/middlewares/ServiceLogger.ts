import { Request, Response, NextFunction } from 'express';
import { ServiceLogger, LoggingResponse } from 'types/server';

const createServiceLogger = (): ServiceLogger => {
  return {
    log(method: string, args: Record<string, unknown>): void {
      console.log(`Call service method: ${method}\nWith args: ${JSON.stringify(args, null, 2)}\n`);
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
