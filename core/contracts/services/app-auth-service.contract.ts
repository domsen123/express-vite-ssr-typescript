import { AppSignInModel, AppUser } from '@/core/models/domain';
import { ComputedRef } from 'vue';

export interface AppAuthService {
  getCurrentUser(): AppUser | undefined;
  isLoggedIn(): ComputedRef<boolean>;
  signIn(signInModel: AppSignInModel): Promise<AppUser>;
  checkAuth(): Promise<AppUser>;
  signOut(): Promise<void>;
}
