import logger from '../common/logger';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authToken = (req: Request, res: Response, next: NextFunction): void => {
  if (req.url.includes('/login')) {
    next();
  } else {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
        if (err) {
          res.status(403).send('Invalid JWT');
          logger.error('Auth error:', err);
        } else {
          next();
        }
      });
    } else {
      res.status(401).send('Unauthorized Error');
    }
  }
};
