import { NextFunction, Request, Response, Errback } from 'express';

export const errorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  res.status(error.status || 500).send({
    message: error.message || 'Unknown Error',
    stack: error,
  });
};
