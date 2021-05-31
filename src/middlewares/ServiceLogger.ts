import { Request, Response, NextFunction } from 'express';
import { ServiceLogger, LoggingResponse } from 'types/express';

const createServiceLogger = (): ServiceLogger => {
  return {
    log(method: string, args: Record<string, unknown>): void {
      console.log(`Call method: ${method}\nWith args: ${JSON.stringify(args, null, 2)}\n`);
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
