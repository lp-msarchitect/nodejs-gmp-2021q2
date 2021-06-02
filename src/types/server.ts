import { NextFunction, Request, Response } from 'express';

export interface ServiceLogger {
  log: (method: string, args?: Record<string, unknown>) => void;
}

export interface LoggingResponse extends Response {
  serviceLogger: ServiceLogger;
}
