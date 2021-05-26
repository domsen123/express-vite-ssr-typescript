import { AppSignInModel, AppUser } from '@/core/models/domain';

export interface AppAuthService {
  getCurrentUser(): AppUser | undefined;
  isLoggedIn(): boolean;
  signIn(signInModel: AppSignInModel): Promise<AppUser>;
  checkAuth(): Promise<AppUser>;
  signOut(): Promise<void>;
}
