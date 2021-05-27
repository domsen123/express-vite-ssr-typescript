import { AppSignInModel, AppUser } from '@/core/models/domain';
import { AxiosInstance } from 'axios';

export interface AppAuthRepository {
  signIn(signInModel: AppSignInModel): Promise<AppUser>;
  signOut(): Promise<void>;
  checkAuth(): Promise<AppUser>;
}
