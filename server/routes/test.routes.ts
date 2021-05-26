import { Router } from 'express';

export default function (router: Router): Router {
  router.get('/test', (req, res, next) => {
    try {
      res.status(200).json({
        success: true,
      });
    } catch (e) {
      next(e);
    }
  });
  router.get('/test_error', (req, res, next) => {
    try {
      throw { status: 400, message: 'Error Test' };
    } catch (e) {
      next(e);
    }
  });
  return router;
}
