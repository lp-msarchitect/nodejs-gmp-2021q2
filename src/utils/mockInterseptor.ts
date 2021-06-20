import { Request } from 'express';
import { createServiceLogger } from '../middlewares/ServiceLogger';
import { LoggingResponse } from 'types/server';

export const mockRequest = ({
  params = {},
  body = {},
  query = {},
}: {
  params?: Record<string, string>;
  body?: Record<string, unknown>;
  query?: Record<string, string>;
}): Partial<Request> => {
  return {
    params,
    body,
    query,
  };
};

export const mockResponse = (): Partial<LoggingResponse> => {
  return {
    serviceLogger: createServiceLogger(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };
};
