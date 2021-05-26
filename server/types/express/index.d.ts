import { AppUser } from '@/core/models/domain';

declare module 'express' {
  export interface Request {
    user?: AppUser;
  }
}
