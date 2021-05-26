import { AppAuthRepository } from '../contracts/repositories';
import { AppAuthService, AppLoggingService } from '../contracts/services';
import { AppUser, AppSignInModel } from '../models/domain';

export class AuthService implements AppAuthService {
  constructor(
    private authRepo: AppAuthRepository,
    private loggingService: AppLoggingService
  ) {}

  public getCurrentUser(): AppUser | undefined {
    throw new Error('Method not implemented.');
  }
  public isLoggedIn(): boolean {
    throw new Error('Method not implemented.');
  }
  public signIn(signInModel: AppSignInModel): Promise<AppUser> {
    throw new Error('Method not implemented.');
  }
  public signOut(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
