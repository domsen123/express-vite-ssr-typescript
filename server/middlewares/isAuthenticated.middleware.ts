import { NextFunction, Request, Response } from 'express';
import cookies from 'isomorphic-cookie';
import { JWT_TOKEN_SECRET, USER_TOKEN } from '@/core/constants';
import { decode } from 'jwt-simple';

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = cookies.load(USER_TOKEN, req);
    if (!token || token === 'undefined')
      throw { status: 401, message: 'Unauthenticated [NO COOKIE]' };
    const user = decode(token, JWT_TOKEN_SECRET);
    if (!user) throw { status: 401, message: 'Unauthenticated [NO USER]' };
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
