import * as Joi from 'joi';
import { Router } from 'express';
import {
  ContainerTypes,
  createValidator,
  ValidatedRequest,
  ValidatedRequestSchema,
} from 'express-joi-validation';
import { AppSignInModel } from '@/core/models/domain';
import { SignInService } from '../services';
import cookies from 'isomorphic-cookie';

const USER_TOKEN = 'USER_TOKEN';

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
