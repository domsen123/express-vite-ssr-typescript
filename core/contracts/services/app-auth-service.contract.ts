import { ComputedRef } from 'vue';
import { AppSignInModel, AppUser } from '@/core/models/domain';

export interface AppAuthService {
  getCurrentUser(): AppUser | undefined;
  isLoggedIn(): ComputedRef<boolean>;
  signIn(signInModel: AppSignInModel): Promise<AppUser>;
  checkAuth(): Promise<AppUser>;
  signOut(): Promise<void>;
}
