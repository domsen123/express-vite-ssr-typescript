import { NextFunction, Request, Response, Errback } from 'express';

export const errorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status || 500).send({
    status: error.status,
    message: error.message || 'Unknown Error',
    stack: error,
  });
};
