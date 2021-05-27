import * as Joi from 'joi';
import cookies from 'isomorphic-cookie';
import { SignInService } from '../services';
import { USER_TOKEN } from '@/core/constants';
import { isAuthenticated } from '../middlewares';
import { AppSignInModel } from '@/core/models/domain';
import { NextFunction, Request, Response, Router } from 'express';
import {
  ContainerTypes,
  createValidator,
  ValidatedRequest,
  ValidatedRequestSchema,
} from 'express-joi-validation';

interface SignInRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: AppSignInModel;
}

export default function (router: Router): Router {
  const validator = createValidator();

  const signInSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  router.post(
    '/signIn',
    validator.body(signInSchema),
    async (req: ValidatedRequest<SignInRequestSchema>, res, next) => {
      try {
        const signInModel = req.body;
        const { user, token } = await SignInService(signInModel);
        cookies.save(
          USER_TOKEN,
          token,
          {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 24h
          },
          res
        );
        res.status(200).json(user);
      } catch (e) {
        next(e);
      }
    }
  );

  router.post(
    '/checkAuth',
    isAuthenticated,
    (req: Request, res: Response, next: NextFunction) => {
      try {
        if (req.user) {
          res.status(200).json(req.user);
        } else {
          throw { status: 401, message: 'Not authenticated' };
        }
      } catch (e) {
        next(e);
      }
    }
  );

  router.post('/signOut', async (req, res, next) => {
    cookies.save(
      USER_TOKEN,
      '',
      {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 0, // 24h
      },
      res
    );
    res.status(200).json({});
  });
  return router;
}
