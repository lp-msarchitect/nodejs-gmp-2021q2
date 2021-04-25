import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validate = (scheme: Joi.Schema) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { error } = scheme.validate(req.body);
  if (error) {
    res.status(400).send(error);
    console.log('Validation error', error);
  }
  next();
};

export const userScheme = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/)
    .required(),
  age: Joi.number().integer().min(4).max(130).required(),
});
