import { NextFunction, Request, Response } from 'express';
import config from '../../config';

export const protectedRouteHandler = (req: Request, res: Response, next: NextFunction) => {
  const reject = () => {
    res.setHeader('www-authenticate', 'Basic');
    res.sendStatus(401);
  };

  const authorization = req.headers.authorization;
  if (!authorization) return reject();

  const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64')
    .toString()
    .split(':');

  if (!(username === config.basicAuthUsername && password === config.basicAuthPassword)) {
    return reject();
  }

  return next();
};
