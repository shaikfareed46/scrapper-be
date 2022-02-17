import { NextFunction, Response, Request } from 'express';
import config from '../../config';

export const basicAuthHandler = (req: Request, res: Response, next: NextFunction) => {
  // make tracker path public
  if (req.path === '/tracker') {
    return next();
  }

  // check for basic auth header
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }

  // verify auth credentials
  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (!(username === config.basicAuthUsername && password === config.basicAuthPassword)) {
    return res.status(401).json({ message: 'Invalid Authentication Credentials' });
  }

  next();
};
