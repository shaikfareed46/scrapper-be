/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response, NextFunction } from 'express';
import { ConnectionError } from 'mssql';
import loggerFactory from '../logging';
const logger = loggerFactory.getLogger('respondeWithError');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err) return next();
  const _err = <ConnectionError>err;
  const message = _err.message.includes('operation timed out')
    ? 'Database is not reachable!'
    : ['EREQUEST', 'ENOTBEGUN', 'ETIMEOUT'].includes(_err.code) // change deadlock message
      ? "We're facing issue while accessing database, please try after sometime!"
      : _err.message;
  const errorResponse = {
    error: err.data || message || err || 'Somthing went Wrong!',
    type: err.type,
    statusCode: err.statusCode,
    validations: err.validations,
  };
  logger.error(err);
  logger.error('[ERROR]: ', JSON.stringify(errorResponse));
  return res.status(400).json(errorResponse);
};
