import { Router } from 'express';
import { isAuthenticated } from '../middlewares';
import { NextFunction, Request, Response } from 'express';

export default function (router: Router): Router {
  router.get('/test', (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        success: true,
      });
    } catch (e) {
      next(e);
    }
  });
  router.get(
    '/test_error',
    (req: Request, res: Response, next: NextFunction) => {
      try {
        throw { status: 400, message: 'Raise error test' };
      } catch (e) {
        next(e);
      }
    }
  );
  router.get(
    '/test_isauth',
    isAuthenticated,
    (req: Request, res: Response, next: NextFunction) => {
      try {
        res.status(200).json(req.user);
      } catch (e) {
        next(e);
      }
    }
  );
  return router;
}
