import { AppSignInModel, AppUser } from '@/core/models/domain';

export interface AppAuthRepository {
  signIn(signInModel: AppSignInModel): Promise<AppUser>;
  signOut(): Promise<void>;
  checkAuth(): Promise<AppUser>;
}
